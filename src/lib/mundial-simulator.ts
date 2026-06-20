/**
 * Motor de simulación de partidos — Mundial 2026 (versión web, SIN apuestas).
 *
 * Portado desde la app local de Python pero reemplazando el muestreo Monte Carlo
 * por el cálculo EXACTO de la distribución de marcadores con un modelo
 * Poisson + corrección Dixon-Coles. Ventajas frente al MC:
 *   - determinista (mismas entradas → mismo resultado, ideal para SSR y repro),
 *   - instantáneo (no hay miles de iteraciones), sin error de muestreo,
 *   - corrige la correlación en marcadores bajos (0-0, 1-1) que el Poisson
 *     independiente subestima.
 *
 * Es un modelo estadístico con fines de entretenimiento, NO una predicción ni
 * una herramienta de apuestas. No contiene momios ni recomendaciones de apuesta.
 */

export interface SimTeam {
  id: string;
  name: { es: string; en: string };
  flag: string;
  code: string; // ISO 3166-1 alpha-2 para imágenes de bandera (flagcdn)
  group: string;
  fifaRank: number;
  attack: number;
  defense: number;
  possession: number;
  cornersAvg: number; // promedio de tiros de esquina por partido
  colors: [string, string]; // [camiseta, detalle] para el portero del minijuego
  host: boolean;
  wc2026: { played: number; goals: number; conceded: number };
}

/** Quién juega de local (ventaja de afición). "neutral" = sede neutral. */
export type HomeSide = "neutral" | "a" | "b";

const HOME_BOOST = 1.06; // ventaja de localía sobre ataque y defensa
const DC_RHO = -0.1; // parámetro Dixon-Coles (negativo → más empates bajos)
const MAX_GOALS = 8; // techo de goles por equipo para la matriz de marcadores

// Calibración del rate de goles. Modelo multiplicativo anclado al promedio de
// goles por equipo de un partido de fútbol (~1.35) y a las medias del dataset
// (ataque/defensa promedio ≈ 77). Un equipo con ataque > media o que enfrenta
// una defensa < media anota por encima de 1.35, y viceversa. Reemplaza la
// fórmula (100-defensa)/100 original, que subestimaba los goles (~1 por partido).
const LEAGUE_AVG_GOALS = 1.35;
const ATTACK_MEAN = 77.1;
const DEFENSE_MEAN = 77.2;

/** Factor de forma a partir de los partidos ya jugados en el Mundial. */
function formFactor(t: SimTeam): number {
  const { played, goals, conceded } = t.wc2026;
  if (!played) return 1;
  return 1 + (goals / played - conceded / played) * 0.08;
}

function attackOf(t: SimTeam, isHome: boolean): number {
  return t.attack * (isHome ? HOME_BOOST : 1) * formFactor(t);
}

function defenseOf(t: SimTeam, isHome: boolean): number {
  return t.defense * (isHome ? HOME_BOOST : 1);
}

/**
 * Goles esperados (λ de Poisson) según ataque propio y defensa rival.
 * λ = promedio_liga × (ataque / media_ataque) / (defensa_rival / media_defensa).
 */
function goalLambda(attack: number, defenseOpp: number): number {
  const lambda =
    (LEAGUE_AVG_GOALS * (attack / ATTACK_MEAN)) / (defenseOpp / DEFENSE_MEAN);
  return Math.min(6, Math.max(0.25, lambda));
}

/** P(X = k) para una Poisson(λ). Iterativo para no usar factoriales grandes. */
function poissonPmf(k: number, lambda: number): number {
  let p = Math.exp(-lambda);
  for (let i = 1; i <= k; i++) p *= lambda / i;
  return p;
}

/** Factor de corrección Dixon-Coles para los cuatro marcadores bajos. */
function dcTau(h: number, a: number, lh: number, la: number, rho: number): number {
  if (h === 0 && a === 0) return 1 - lh * la * rho;
  if (h === 0 && a === 1) return 1 + lh * rho;
  if (h === 1 && a === 0) return 1 + la * rho;
  if (h === 1 && a === 1) return 1 - rho;
  return 1;
}

export interface ScoreCell {
  home: number;
  away: number;
  prob: number; // 0..1
}

export interface MatchProjection {
  /** Probabilidades en % (0..100). */
  homeWin: number;
  draw: number;
  awayWin: number;
  btts: number; // ambos anotan
  over25: number; // más de 2.5 goles
  /** Goles esperados. */
  expHomeGoals: number;
  expAwayGoals: number;
  expTotal: number;
  /** Tiros de esquina esperados. */
  expCornersHome: number;
  expCornersAway: number;
  expCornersTotal: number;
  /** Marcadores más probables (orden descendente), prob en %. */
  topScores: Array<{ home: number; away: number; pct: number }>;
  /** Matriz P(home,away) normalizada — para muestrear un marcador puntual. */
  matrix: number[][];
}

/**
 * Proyección exacta de un partido A vs B.
 * `home` indica ventaja de localía: "a", "b" o "neutral" (por defecto).
 */
export function projectMatch(
  teamA: SimTeam,
  teamB: SimTeam,
  home: HomeSide = "neutral"
): MatchProjection {
  const aHome = home === "a";
  const bHome = home === "b";
  const lh = goalLambda(attackOf(teamA, aHome), defenseOf(teamB, bHome));
  const la = goalLambda(attackOf(teamB, bHome), defenseOf(teamA, aHome));

  // Matriz sin normalizar.
  const matrix: number[][] = [];
  let total = 0;
  for (let h = 0; h <= MAX_GOALS; h++) {
    matrix[h] = [];
    for (let a = 0; a <= MAX_GOALS; a++) {
      const p = poissonPmf(h, lh) * poissonPmf(a, la) * dcTau(h, a, lh, la, DC_RHO);
      const pp = p > 0 ? p : 0; // la corrección DC puede dar negativos diminutos
      matrix[h][a] = pp;
      total += pp;
    }
  }

  let homeWin = 0,
    draw = 0,
    awayWin = 0,
    btts = 0,
    over25 = 0,
    expH = 0,
    expA = 0;
  const cells: ScoreCell[] = [];

  for (let h = 0; h <= MAX_GOALS; h++) {
    for (let a = 0; a <= MAX_GOALS; a++) {
      const prob = matrix[h][a] / total;
      matrix[h][a] = prob; // normalizar in-place
      cells.push({ home: h, away: a, prob });
      if (h > a) homeWin += prob;
      else if (h < a) awayWin += prob;
      else draw += prob;
      if (h >= 1 && a >= 1) btts += prob;
      if (h + a >= 3) over25 += prob;
      expH += h * prob;
      expA += a * prob;
    }
  }

  cells.sort((x, y) => y.prob - x.prob);
  const pct = (x: number) => Math.round(x * 1000) / 10;
  const r2 = (x: number) => Math.round(x * 100) / 100;
  const r1 = (x: number) => Math.round(x * 10) / 10;

  // Tiros de esquina: promedio del equipo, inclinado por su dominio ofensivo
  // (cuota de goles esperados) y la ventaja de localía. Domina ⇒ más córners.
  const domHome = lh / (lh + la);
  const cornersHome = teamA.cornersAvg * (0.7 + 0.6 * domHome) * (aHome ? 1.05 : 1);
  const cornersAway = teamB.cornersAvg * (0.7 + 0.6 * (1 - domHome)) * (bHome ? 1.05 : 1);

  return {
    homeWin: pct(homeWin),
    draw: pct(draw),
    awayWin: pct(awayWin),
    btts: pct(btts),
    over25: pct(over25),
    expHomeGoals: r2(expH),
    expAwayGoals: r2(expA),
    expTotal: r2(expH + expA),
    expCornersHome: r1(cornersHome),
    expCornersAway: r1(cornersAway),
    expCornersTotal: r1(cornersHome + cornersAway),
    topScores: cells.slice(0, 6).map((c) => ({ home: c.home, away: c.away, pct: pct(c.prob) })),
    matrix,
  };
}

/**
 * Muestrea UN marcador puntual desde la distribución (para el botón
 * "jugar un marcador"). Acepta un generador para poder fijar la semilla.
 */
export function sampleScore(
  proj: MatchProjection,
  rng: () => number = Math.random
): { home: number; away: number } {
  let r = rng();
  for (let h = 0; h < proj.matrix.length; h++) {
    for (let a = 0; a < proj.matrix[h].length; a++) {
      r -= proj.matrix[h][a];
      if (r <= 0) return { home: h, away: a };
    }
  }
  return { home: 0, away: 0 };
}

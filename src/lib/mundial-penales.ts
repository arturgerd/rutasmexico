/**
 * Lógica del minijuego de penales (sin dependencias de React).
 *
 * Rejilla de la portería: 3 columnas (0=izquierda, 1=centro, 2=derecha) ×
 * 3 filas (0=alta, 1=media, 2=baja). El tirador elige una celda y la potencia;
 * el portero "adivina" según su habilidad. Bosnia es, a propósito, el más difícil.
 */

import type { SimTeam } from "@/lib/mundial-simulator";

export interface KeeperDifficulty {
  stars: number; // 1..5 (para la UI)
  skill: number; // 0..1 (probabilidad de adivinar/alcance)
}

/**
 * Dificultad del portero. Bosnia se fuerza como el más difícil (decisión de
 * diseño pedida); el resto se deriva de su valor defensivo, siempre por debajo.
 */
export function keeperDifficulty(team: SimTeam): KeeperDifficulty {
  if (team.id === "bosnia") return { stars: 5, skill: 0.95 };
  const norm = Math.max(0, Math.min(1, (team.defense - 58) / (94 - 58)));
  const skill = 0.3 + norm * 0.52; // tope ~0.82, siempre < Bosnia
  const stars = Math.max(1, Math.min(4, Math.round(1 + norm * 3)));
  return { stars, skill };
}

export type ShotOutcome = "goal" | "save" | "miss";

export interface ShotResult {
  outcome: ShotOutcome;
  keeperCol: number;
  keeperRow: number;
}

function pickOther(rng: () => number, exclude: number): number {
  const opts = [0, 1, 2].filter((x) => x !== exclude);
  return opts[Math.floor(rng() * opts.length)];
}

/**
 * Resuelve un tiro. `power` 0..100. `skill` 0..1.
 * - Potencia muy alta → riesgo de tiro fuera.
 * - El portero adivina lado y altura con probabilidad ligada a su habilidad.
 * - Atajada según la distancia (en celdas) entre el portero y el balón.
 */
export function resolveShot(
  ballCol: number,
  ballRow: number,
  power: number,
  skill: number,
  rng: () => number = Math.random
): ShotResult {
  if (power > 88 && rng() < ((power - 88) / 12) * 0.55) {
    return { outcome: "miss", keeperCol: 1, keeperRow: 1 };
  }

  const keeperCol = rng() < 0.3 + 0.55 * skill ? ballCol : pickOther(rng, ballCol);
  const keeperRow = rng() < 0.25 + 0.55 * skill ? ballRow : pickOther(rng, ballRow);
  const dist = Math.max(Math.abs(keeperCol - ballCol), Math.abs(keeperRow - ballRow));

  let saveChance: number;
  if (dist === 0) saveChance = 0.8 + 0.18 * skill;
  else if (dist === 1) saveChance = 0.18 + 0.45 * skill;
  else saveChance = 0.03 + 0.12 * skill;

  // Un tiro demasiado suave es más fácil de atajar.
  if (power < 30) saveChance += 0.12;

  const saved = rng() < saveChance;
  return { outcome: saved ? "save" : "goal", keeperCol, keeperRow };
}

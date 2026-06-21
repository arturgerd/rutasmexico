"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { SimTeam } from "@/lib/mundial-simulator";
import { keeperDifficulty, resolveShot, type ShotResult } from "@/lib/mundial-penales";
import { t3 } from "@/lib/utils";
import Flag from "./Flag";
import GoalkeeperKit from "./GoalkeeperKit";

const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

// Caja de la portería como % de la escena, y centro de cada celda 3×3.
const GX0 = 19, GX1 = 81, GY0 = 27, GY1 = 66;
const cellX = (c: number) => GX0 + ((c + 0.5) / 3) * (GX1 - GX0);
const cellY = (r: number) => GY0 + ((r + 0.5) / 3) * (GY1 - GY0);

const BALL_START = { x: 50, y: 88 };

type Phase = "aim" | "power" | "shooting" | "result";
type Pos = { x: number; y: number; scale: number };

function teamName(t: SimTeam, locale: string) {
  return locale === "es" ? t.name.es : t.name.en;
}

function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`Dificultad ${n}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < n ? "text-oro-500" : "text-arena-300"}>★</span>
      ))}
    </span>
  );
}

function BallSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="#ffffff" stroke="#cfcfcf" strokeWidth="1.5" />
      <path d="M20 9 l6 4 -2 7 -8 0 -2 -7 z" fill="#222" />
      <path d="M9 18 l4 6 M31 18 l-4 6 M14 31 l3 -4 M26 31 l-3 -4" stroke="#222" strokeWidth="2" fill="none" />
    </svg>
  );
}

export default function PenalesClient({
  teams,
  locale,
  defaultKeeper = "bosnia",
}: {
  teams: SimTeam[];
  locale: string;
  defaultKeeper?: string;
}) {
  const byId = useMemo(() => {
    const m = new Map<string, SimTeam>();
    teams.forEach((t) => m.set(t.id, t));
    return m;
  }, [teams]);

  const [keeperId, setKeeperId] = useState(byId.has(defaultKeeper) ? defaultKeeper : teams[0].id);
  const [phase, setPhase] = useState<Phase>("aim");
  const [target, setTarget] = useState<{ col: number; row: number } | null>(null);
  const [power, setPower] = useState(50);
  const [result, setResult] = useState<ShotResult | null>(null);
  const [score, setScore] = useState({ goals: 0, shots: 0, streak: 0, best: 0 });
  const [ball, setBall] = useState<Pos>({ ...BALL_START, scale: 1 });
  const [trail, setTrail] = useState<Pos[]>([]);

  const keeper = byId.get(keeperId)!;
  const diff = useMemo(() => keeperDifficulty(keeper), [keeper]);
  const kName = teamName(keeper, locale);

  const dirRef = useRef(1);
  const rafRef = useRef<number | null>(null);
  const resolveTimerRef = useRef<number | null>(null);

  // Oscilador de potencia mientras se apunta la fuerza.
  useEffect(() => {
    if (phase !== "power") return;
    const id = setInterval(() => {
      setPower((p) => {
        let next = p + dirRef.current * 4;
        if (next >= 100) { next = 100; dirRef.current = -1; }
        else if (next <= 5) { next = 5; dirRef.current = 1; }
        return next;
      });
    }, 30);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (resolveTimerRef.current) clearTimeout(resolveTimerRef.current);
  }, []);

  const pickCell = (col: number, row: number) => {
    if (phase !== "aim") return;
    setTarget({ col, row });
    setPower(50);
    dirRef.current = 1;
    setPhase("power");
  };

  const shoot = useCallback(() => {
    if (phase !== "power" || !target) return;
    const r = resolveShot(target.col, target.row, power, diff.skill);
    setResult(r);
    setPhase("shooting");
    setScore((s) => {
      const goal = r.outcome === "goal";
      const streak = goal ? s.streak + 1 : 0;
      return { goals: s.goals + (goal ? 1 : 0), shots: s.shots + 1, streak, best: Math.max(s.best, streak) };
    });

    // Trayectoria curva (Bézier cuadrática) hacia la celda objetivo + estela.
    const end = { x: cellX(target.col), y: cellY(target.row) };
    const ctrl = { x: (BALL_START.x + end.x) / 2, y: Math.min(BALL_START.y, end.y) - 26 };
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const dur = reduce ? 1 : 600;
    const t0 = performance.now();
    const buf: Pos[] = [];
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / dur);
      const mt = 1 - t;
      const x = mt * mt * BALL_START.x + 2 * mt * t * ctrl.x + t * t * end.x;
      const y = mt * mt * BALL_START.y + 2 * mt * t * ctrl.y + t * t * end.y;
      const scale = 1 - 0.45 * t;
      setBall({ x, y, scale });
      buf.push({ x, y, scale: scale * 0.85 });
      if (buf.length > 7) buf.shift();
      setTrail([...buf]);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(step);
    // Transición autoritativa por temporizador (robusta aunque rAF no corra).
    if (resolveTimerRef.current) clearTimeout(resolveTimerRef.current);
    resolveTimerRef.current = window.setTimeout(() => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setBall({ x: end.x, y: end.y, scale: 0.55 });
      setTrail([]);
      setPhase("result");
    }, dur + 140);
  }, [phase, target, power, diff.skill]);

  const again = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (resolveTimerRef.current) clearTimeout(resolveTimerRef.current);
    setTarget(null);
    setResult(null);
    setPower(50);
    setBall({ ...BALL_START, scale: 1 });
    setTrail([]);
    setPhase("aim");
  };

  const changeKeeper = (id: string) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (resolveTimerRef.current) clearTimeout(resolveTimerRef.current);
    setKeeperId(id);
    setTarget(null);
    setResult(null);
    setBall({ ...BALL_START, scale: 1 });
    setTrail([]);
    setPhase("aim");
  };

  // Portero: posición y rotación (pose de atajada) cuando se lanza.
  const animating = phase === "shooting" || phase === "result";
  const gk = animating && result
    ? { left: cellX(result.keeperCol), top: cellY(result.keeperRow), rot: (result.keeperCol - 1) * 68 }
    : { left: 50, top: 50, rot: 0 };

  const colLabel = [t3(locale, "izquierda", "left"), t3(locale, "centro", "center"), t3(locale, "derecha", "right")];
  const rowLabel = [t3(locale, "alta", "high"), t3(locale, "media", "mid"), t3(locale, "baja", "low")];

  const isGoal = phase === "result" && result?.outcome === "goal";
  const isSave = phase === "result" && result?.outcome === "save";
  const outcomeBanner =
    phase === "result" && result
      ? result.outcome === "goal"
        ? { txt: t3(locale, "¡GOOOL!", "GOAL!"), cls: "bg-jade-600" }
        : result.outcome === "save"
        ? { txt: t3(locale, "¡ATAJADA!", "SAVE!"), cls: "bg-terracotta-600" }
        : { txt: t3(locale, "¡FUERA!", "OFF TARGET!"), cls: "bg-arena-700" }
      : null;

  // Confeti determinista por tiro (varía por índice; sin Math.random en SSR).
  const confetti = useMemo(() => {
    const palette = [keeper.colors[0], keeper.colors[1], "#f6c500", "#ffffff", "#1d9e75", "#d85a30"];
    return Array.from({ length: 16 }).map((_, i) => ({
      left: 12 + (i * 37) % 76,
      dur: 700 + ((i * 53) % 500),
      delay: (i * 29) % 180,
      rot: (i * 47) % 360,
      color: palette[i % palette.length],
      drift: ((i % 5) - 2) * 14,
    }));
  }, [keeper]);

  return (
    <div className="max-w-2xl mx-auto">
      <style>{`
        @keyframes penConfetti { 0%{opacity:1;transform:translate(0,0) rotate(0)} 100%{opacity:0;transform:translate(var(--dx),130px) rotate(560deg)} }
        @keyframes penRipple { 0%{transform:scaleY(1)} 35%{transform:scaleY(1.08)} 100%{transform:scaleY(1)} }
        @keyframes penFlash { 0%{opacity:.55} 100%{opacity:0} }
        @keyframes penPop { 0%{transform:translate(-50%,-50%) scale(.6)} 60%{transform:translate(-50%,-50%) scale(1.12)} 100%{transform:translate(-50%,-50%) scale(1)} }
      `}</style>

      {/* Portero actual + marcador */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Flag code={keeper.code} alt={kName} className="h-5 w-7" />
          <span className="font-bold text-arena-900">{kName}</span>
          <Stars n={diff.stars} />
          {keeper.id === "bosnia" && (
            <span className="text-[11px] font-bold text-terracotta-700">🧱 {t3(locale, "El muro", "The wall")}</span>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="font-bold text-arena-900 tabular-nums">⚽ {score.goals}/{score.shots}</span>
          <span className="text-arena-700 tabular-nums">{t3(locale, "Racha", "Streak")}: {score.streak}</span>
          <span className="text-arena-700 tabular-nums">{t3(locale, "Mejor", "Best")}: {score.best}</span>
        </div>
      </div>

      {/* Escena */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-arena-200 shadow-sm select-none">
        <svg viewBox="0 0 400 225" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {/* Cielo */}
          <rect x="0" y="0" width="400" height="150" fill="#cfe9f7" />
          {/* Gradas */}
          <rect x="0" y="0" width="400" height="40" fill="#3a4a63" />
          <rect x="0" y="40" width="400" height="14" fill="#2c3a50" />
          {Array.from({ length: 60 }).map((_, i) => {
            const cols = ["#e6e9ef", "#c7ccd8", "#f0d9b8", "#b9c0cf"];
            const x = (i * 17 + (i % 3) * 5) % 392;
            const y = 6 + (i % 5) * 7;
            return <rect key={i} x={x} y={y} width="5" height="5" rx="1" fill={cols[i % cols.length]} opacity="0.85" />;
          })}
          {/* Postes de luz */}
          <g stroke="#9aa4b2" strokeWidth="2"><line x1="40" y1="2" x2="40" y2="14" /><line x1="360" y1="2" x2="360" y2="14" /></g>
          <rect x="28" y="0" width="24" height="5" rx="2" fill="#fff8d6" />
          <rect x="348" y="0" width="24" height="5" rx="2" fill="#fff8d6" />
          {/* Césped */}
          <rect x="0" y="150" width="400" height="75" fill="#4f9a43" />
          <rect x="0" y="150" width="400" height="6" fill="#5fae52" />
          <rect x="0" y="168" width="400" height="10" fill="#56a149" opacity="0.5" />
          <rect x="0" y="192" width="400" height="10" fill="#56a149" opacity="0.5" />
          {/* Red (con ondeo al gol) */}
          <g
            key={`net-${score.shots}`}
            style={{ transformOrigin: "200px 150px", animation: isGoal ? "penRipple 600ms ease-out" : undefined }}
          >
            <g stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1">
              {[90, 110, 130, 150, 170, 190, 210, 230, 250, 270, 290, 310].map((x) => (
                <line key={x} x1={x} y1="57" x2={x} y2="150" />
              ))}
              {[70, 90, 110, 130].map((y) => (
                <line key={y} x1="73" y1={y} x2="327" y2={y} />
              ))}
            </g>
          </g>
          {/* Postes */}
          <g stroke="#ffffff" strokeWidth="7" strokeLinecap="round" fill="none">
            <line x1="70" y1="53" x2="330" y2="53" />
            <line x1="70" y1="53" x2="70" y2="152" />
            <line x1="330" y1="53" x2="330" y2="152" />
          </g>
          <ellipse cx="200" cy="200" rx="5" ry="2.5" fill="#ffffff" />
        </svg>

        {/* Sombra del portero */}
        <div
          className="absolute rounded-[50%] bg-black/25 blur-[2px] transition-all duration-500"
          style={{ left: `${gk.left}%`, top: "63%", width: "13%", height: "5%", transform: "translate(-50%,-50%)" }}
        />

        {/* Portero */}
        <div
          className="absolute transition-all duration-500 ease-out"
          style={{ left: `${gk.left}%`, top: `${gk.top}%`, width: "17%", transform: `translate(-50%,-50%) rotate(${gk.rot}deg)` }}
        >
          <GoalkeeperKit primary={keeper.colors[0]} secondary={keeper.colors[1]} className="w-full h-auto drop-shadow" />
        </div>

        {/* Estela del balón */}
        {trail.map((p, i) => (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{ left: `${p.x}%`, top: `${p.y}%`, transform: `translate(-50%,-50%) scale(${p.scale})`, opacity: (i + 1) / (trail.length + 2) * 0.5 }}
          >
            <BallSvg className="w-7 h-7" />
          </div>
        ))}

        {/* Balón */}
        <div
          className="absolute"
          style={{ left: `${ball.x}%`, top: `${ball.y}%`, transform: `translate(-50%,-50%) scale(${ball.scale})` }}
        >
          <BallSvg className="w-8 h-8 drop-shadow" />
        </div>

        {/* Rejilla para apuntar */}
        {phase === "aim" && (
          <div
            className="absolute grid grid-cols-3 grid-rows-3"
            style={{ left: `${GX0}%`, top: `${GY0}%`, width: `${GX1 - GX0}%`, height: `${GY1 - GY0}%` }}
          >
            {Array.from({ length: 9 }).map((_, i) => {
              const col = i % 3, row = Math.floor(i / 3);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => pickCell(col, row)}
                  aria-label={t3(locale, `Tirar ${colLabel[col]} ${rowLabel[row]}`, `Shoot ${colLabel[col]} ${rowLabel[row]}`)}
                  className="border border-white/30 hover:bg-jade-400/40 active:bg-jade-500/50 transition-colors flex items-center justify-center group"
                >
                  <span className="opacity-0 group-hover:opacity-100 text-white text-lg font-bold transition-opacity">◎</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Destello de atajada */}
        {isSave && (
          <div
            key={`flash-${score.shots}`}
            className="absolute inset-0 bg-terracotta-400 pointer-events-none"
            style={{ animation: "penFlash 500ms ease-out forwards" }}
          />
        )}

        {/* Confeti de gol */}
        {isGoal && (
          <div key={`conf-${score.shots}`} className="absolute inset-0 overflow-hidden pointer-events-none">
            {confetti.map((c, i) => (
              <span
                key={i}
                className="absolute top-[35%] w-1.5 h-2.5 rounded-[1px]"
                style={{
                  left: `${c.left}%`,
                  backgroundColor: c.color,
                  ["--dx" as string]: `${c.drift}px`,
                  animation: `penConfetti ${c.dur}ms ease-out ${c.delay}ms forwards`,
                  transform: `rotate(${c.rot}deg)`,
                }}
              />
            ))}
          </div>
        )}

        {/* Banner de resultado */}
        {outcomeBanner && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className={`${outcomeBanner.cls} text-white font-display font-bold text-2xl md:text-4xl px-6 py-2 rounded-xl shadow-lg`}
              style={{ animation: "penPop 360ms ease-out", transformOrigin: "center" }}
            >
              {outcomeBanner.txt}
            </span>
          </div>
        )}

        {/* Instrucción */}
        {phase === "aim" && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white/90 rounded-lg px-3 py-1 text-xs font-bold text-arena-900">
            {t3(locale, "Toca dónde quieres tirar", "Tap where to shoot")}
          </div>
        )}
      </div>

      {/* Controles */}
      <div className="mt-4 min-h-[52px]">
        {phase === "power" && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-arena-700 w-16">{t3(locale, "Potencia", "Power")}</span>
            <div className="flex-1 h-3 rounded-full bg-arena-200 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-jade-500 via-oro-400 to-terracotta-600 transition-[width] duration-75" style={{ width: `${power}%` }} />
            </div>
            <button
              type="button"
              onClick={shoot}
              className="bg-jade-600 text-white font-bold py-2 px-5 rounded-xl text-sm hover:bg-jade-700 transition-colors"
            >
              {t3(locale, "¡Patear!", "Shoot!")}
            </button>
          </div>
        )}
        {phase === "result" && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={again}
              className="bg-jade-600 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-jade-700 hover:-translate-y-0.5 transition-all"
            >
              🔁 {t3(locale, "Tirar otra vez", "Shoot again")}
            </button>
          </div>
        )}
        {phase === "aim" && (
          <p className="text-center text-xs text-arena-700">
            {t3(locale, "Elige una de las 9 zonas de la portería.", "Pick one of the goal's 9 zones.")}
          </p>
        )}
        {phase === "shooting" && (
          <p className="text-center text-xs text-arena-700">{t3(locale, "¡Tiro en camino…!", "Shot on its way…")}</p>
        )}
      </div>

      {/* Elegir portero */}
      <div className="mt-6 bg-arena-50 border border-arena-200 rounded-xl p-4">
        <label className="block">
          <span className="text-sm font-bold text-arena-800">{t3(locale, "Cambia de portero rival", "Change rival keeper")}</span>
          <select
            value={keeperId}
            onChange={(e) => changeKeeper(e.target.value)}
            className="mt-2 w-full rounded-xl border border-arena-300 bg-white px-3 py-2.5 text-arena-900 font-medium focus:outline-none focus:ring-2 focus:ring-jade-500"
          >
            {GROUPS.map((g) => {
              const inGroup = teams.filter((t) => t.group === g);
              if (!inGroup.length) return null;
              return (
                <optgroup key={g} label={t3(locale, `Grupo ${g}`, `Group ${g}`)}>
                  {inGroup.map((t) => (
                    <option key={t.id} value={t.id}>
                      {teamName(t, locale)} {"★".repeat(keeperDifficulty(t).stars)}
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>
        </label>
        <p className="text-xs text-arena-700 mt-2">
          {t3(locale,
            "Más estrellas = portero más difícil. Bosnia es el más complicado de todo el torneo.",
            "More stars = tougher keeper. Bosnia is the toughest in the whole tournament."
          )}
        </p>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState, useCallback } from "react";
import {
  projectMatch,
  sampleScore,
  type SimTeam,
  type HomeSide,
} from "@/lib/mundial-simulator";
import { t3 } from "@/lib/utils";
import Flag from "./Flag";

const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

function teamName(t: SimTeam, locale: string): string {
  return locale === "es" ? t.name.es : t.name.en;
}

/** <select> with teams grouped by tournament group. */
function TeamSelect({
  teams,
  value,
  exclude,
  locale,
  label,
  onChange,
}: {
  teams: SimTeam[];
  value: string;
  exclude: string;
  locale: string;
  label: string;
  onChange: (id: string) => void;
}) {
  return (
    <label className="block w-full">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-arena-300 bg-white px-3 py-2.5 text-arena-900 font-medium focus:outline-none focus:ring-2 focus:ring-jade-500"
      >
        {GROUPS.map((g) => {
          const inGroup = teams.filter((t) => t.group === g);
          if (!inGroup.length) return null;
          return (
            <optgroup key={g} label={t3(locale, `Grupo ${g}`, `Group ${g}`)}>
              {inGroup.map((t) => (
                <option key={t.id} value={t.id} disabled={t.id === exclude}>
                  {teamName(t, locale)}
                </option>
              ))}
            </optgroup>
          );
        })}
      </select>
    </label>
  );
}

export default function SimulatorClient({
  teams,
  locale,
  defaultA = "mexico",
  defaultB = "czechia",
}: {
  teams: SimTeam[];
  locale: string;
  defaultA?: string;
  defaultB?: string;
}) {
  const byId = useMemo(() => {
    const m = new Map<string, SimTeam>();
    teams.forEach((t) => m.set(t.id, t));
    return m;
  }, [teams]);

  const firstTwo = teams.slice(0, 2).map((t) => t.id);
  const [aId, setAId] = useState(byId.has(defaultA) ? defaultA : firstTwo[0]);
  const [bId, setBId] = useState(byId.has(defaultB) ? defaultB : firstTwo[1]);
  const [home, setHome] = useState<HomeSide>("neutral");
  const [played, setPlayed] = useState<{ home: number; away: number } | null>(null);

  const teamA = byId.get(aId)!;
  const teamB = byId.get(bId)!;

  const proj = useMemo(() => projectMatch(teamA, teamB, home), [teamA, teamB, home]);

  const nameA = teamName(teamA, locale);
  const nameB = teamName(teamB, locale);

  const verdict = useMemo(() => {
    const { homeWin, draw, awayWin } = proj;
    const max = Math.max(homeWin, draw, awayWin);
    if (max === draw) return t3(locale, "Partido muy parejo", "Very even match");
    if (max === homeWin)
      return t3(locale, `${nameA} es favorito`, `${nameA} are favorites`);
    return t3(locale, `${nameB} es favorito`, `${nameB} are favorites`);
  }, [proj, nameA, nameB, locale]);

  const playOne = useCallback(() => {
    setPlayed(sampleScore(proj));
  }, [proj]);

  const randomMatch = useCallback(() => {
    const i = Math.floor(Math.random() * teams.length);
    let j = Math.floor(Math.random() * teams.length);
    if (j === i) j = (j + 1) % teams.length;
    setAId(teams[i].id);
    setBId(teams[j].id);
    setPlayed(null);
  }, [teams]);

  const swap = useCallback(() => {
    setAId(bId);
    setBId(aId);
    setPlayed(null);
  }, [aId, bId]);

  // Reset the sampled scoreline whenever the matchup changes.
  const onChangeA = (id: string) => {
    setAId(id);
    setPlayed(null);
  };
  const onChangeB = (id: string) => {
    setBId(id);
    setPlayed(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-arena-200 shadow-sm p-5 md:p-8 max-w-3xl mx-auto">
      {/* Selectores */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 sm:gap-2 items-center">
        <div className="flex items-center gap-2">
          <Flag code={teamA.code} alt={nameA} className="h-6 w-9 shrink-0" />
          <TeamSelect
            teams={teams}
            value={aId}
            exclude={bId}
            locale={locale}
            label={t3(locale, "Equipo local / A", "Home / Team A")}
            onChange={onChangeA}
          />
        </div>
        <button
          type="button"
          onClick={swap}
          aria-label={t3(locale, "Intercambiar equipos", "Swap teams")}
          className="mx-auto rounded-full border border-arena-300 bg-arena-50 w-10 h-10 flex items-center justify-center text-arena-700 hover:bg-arena-100 transition-colors"
        >
          ⇄
        </button>
        <div className="flex items-center gap-2">
          <Flag code={teamB.code} alt={nameB} className="h-6 w-9 shrink-0" />
          <TeamSelect
            teams={teams}
            value={bId}
            exclude={aId}
            locale={locale}
            label={t3(locale, "Equipo visitante / B", "Away / Team B")}
            onChange={onChangeB}
          />
        </div>
      </div>

      {/* Localía */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
        <span className="text-arena-700">{t3(locale, "Localía:", "Home advantage:")}</span>
        {(
          [
            { val: "neutral", code: undefined, label: t3(locale, "Neutral", "Neutral") },
            { val: "a", code: teamA.code, label: nameA },
            { val: "b", code: teamB.code, label: nameB },
          ] as { val: HomeSide; code?: string; label: string }[]
        ).map(({ val, code, label }) => (
          <button
            key={val}
            type="button"
            onClick={() => setHome(val)}
            aria-pressed={home === val}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 border transition-colors ${
              home === val
                ? "bg-jade-600 text-white border-jade-600"
                : "bg-white text-arena-800 border-arena-300 hover:bg-arena-50"
            }`}
          >
            {code && <Flag code={code} alt="" className="h-3.5 w-5" />}
            {label}
          </button>
        ))}
      </div>

      {/* Marcador / encabezado del partido */}
      <div className="mt-6 flex items-center justify-center gap-4 md:gap-8">
        <div className="text-center flex-1">
          <Flag code={teamA.code} alt={nameA} className="h-10 w-14 md:h-12 md:w-[68px] mx-auto" />
          <div className="font-display font-bold text-arena-900 mt-1.5 text-sm md:text-base">{nameA}</div>
        </div>
        <div className="text-center">
          {played ? (
            <div className="font-display font-bold text-3xl md:text-4xl text-arena-900 tabular-nums">
              {played.home} <span className="text-arena-400">-</span> {played.away}
            </div>
          ) : (
            <div className="font-display font-bold text-2xl text-arena-300">VS</div>
          )}
          <div className="text-xs text-arena-700 mt-1">
            {played
              ? t3(locale, "marcador simulado", "simulated score")
              : t3(locale, "esperado", "expected") + `: ${proj.expHomeGoals} - ${proj.expAwayGoals}`}
          </div>
        </div>
        <div className="text-center flex-1">
          <Flag code={teamB.code} alt={nameB} className="h-10 w-14 md:h-12 md:w-[68px] mx-auto" />
          <div className="font-display font-bold text-arena-900 mt-1.5 text-sm md:text-base">{nameB}</div>
        </div>
      </div>

      {/* Barra 1X2 */}
      <div className="mt-6">
        <div className="flex h-9 w-full overflow-hidden rounded-xl border border-arena-200" role="img"
          aria-label={t3(
            locale,
            `${nameA} ${proj.homeWin}%, empate ${proj.draw}%, ${nameB} ${proj.awayWin}%`,
            `${nameA} ${proj.homeWin}%, draw ${proj.draw}%, ${nameB} ${proj.awayWin}%`
          )}
        >
          <div className="bg-jade-600 flex items-center justify-center text-white text-xs font-bold transition-all duration-500"
            style={{ width: `${proj.homeWin}%` }}>
            {proj.homeWin >= 9 ? `${proj.homeWin}%` : ""}
          </div>
          <div className="bg-arena-400 flex items-center justify-center text-white text-xs font-bold transition-all duration-500"
            style={{ width: `${proj.draw}%` }}>
            {proj.draw >= 9 ? `${proj.draw}%` : ""}
          </div>
          <div className="bg-terracotta-600 flex items-center justify-center text-white text-xs font-bold transition-all duration-500"
            style={{ width: `${proj.awayWin}%` }}>
            {proj.awayWin >= 9 ? `${proj.awayWin}%` : ""}
          </div>
        </div>
        <div className="flex justify-between text-xs mt-2 font-semibold">
          <span className="text-jade-700">{t3(locale, "Gana", "Win")} {nameA} · {proj.homeWin}%</span>
          <span className="text-arena-700">{t3(locale, "Empate", "Draw")} · {proj.draw}%</span>
          <span className="text-terracotta-700">{t3(locale, "Gana", "Win")} {nameB} · {proj.awayWin}%</span>
        </div>
        <p className="text-center text-sm font-bold text-arena-800 mt-3">⚽ {verdict}</p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        <div className="bg-arena-50 rounded-xl p-3 text-center border border-arena-200">
          <div className="text-xl font-bold text-oro-600 tabular-nums">{proj.expTotal}</div>
          <div className="text-xs text-arena-700 mt-1">{t3(locale, "Goles esperados", "Expected goals")}</div>
        </div>
        <div className="bg-arena-50 rounded-xl p-3 text-center border border-arena-200">
          <div className="text-xl font-bold text-jade-700 tabular-nums">{proj.btts}%</div>
          <div className="text-xs text-arena-700 mt-1">{t3(locale, "Ambos anotan", "Both teams score")}</div>
        </div>
        <div className="bg-arena-50 rounded-xl p-3 text-center border border-arena-200">
          <div className="text-xl font-bold text-terracotta-600 tabular-nums">{proj.over25}%</div>
          <div className="text-xs text-arena-700 mt-1">{t3(locale, "Más de 2.5 goles", "Over 2.5 goals")}</div>
        </div>
        <div className="bg-arena-50 rounded-xl p-3 text-center border border-arena-200">
          <div className="text-xl font-bold text-jade-600 tabular-nums">{proj.expCornersTotal}</div>
          <div className="text-xs text-arena-700 mt-1">{t3(locale, "Tiros de esquina", "Corner kicks")}</div>
          <div className="text-[11px] text-arena-600 mt-0.5 tabular-nums">
            {proj.expCornersHome} · {proj.expCornersAway}
          </div>
        </div>
      </div>

      {/* Marcadores más probables */}
      <div className="mt-6">
        <h3 className="font-display font-bold text-arena-800 mb-2 text-sm">
          {t3(locale, "Marcadores más probables", "Most likely scorelines")}
        </h3>
        <div className="flex flex-wrap gap-2">
          {proj.topScores.map((s) => (
            <span
              key={`${s.home}-${s.away}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-arena-200 bg-white px-2.5 py-1.5 text-sm"
            >
              <Flag code={teamA.code} alt={nameA} className="h-3.5 w-5" />
              <span className="font-bold tabular-nums text-arena-900">{s.home}-{s.away}</span>
              <Flag code={teamB.code} alt={nameB} className="h-3.5 w-5" />
              <span className="text-arena-700 text-xs">· {s.pct}%</span>
            </span>
          ))}
        </div>
      </div>

      {/* Acciones */}
      <div className="mt-7 flex flex-wrap gap-3 justify-center">
        <button
          type="button"
          onClick={playOne}
          className="bg-jade-600 text-white font-bold py-2.5 px-5 rounded-xl shadow-sm hover:bg-jade-700 hover:-translate-y-0.5 transition-all"
        >
          🎲 {t3(locale, "Jugar un marcador", "Play out a score")}
        </button>
        <button
          type="button"
          onClick={randomMatch}
          className="bg-arena-800 text-white font-semibold py-2.5 px-5 rounded-xl hover:bg-arena-700 transition-colors"
        >
          🔀 {t3(locale, "Partido aleatorio", "Random match")}
        </button>
      </div>

      <p className="text-xs text-arena-700 text-center mt-6 max-w-xl mx-auto">
        {t3(
          locale,
          "Modelo estadístico (Poisson–Dixon-Coles) con fines de entretenimiento, basado en el ranking FIFA y la forma reciente. No es una predicción ni una herramienta de apuestas.",
          "Statistical model (Poisson–Dixon-Coles) for entertainment, based on FIFA ranking and recent form. Not a prediction nor a betting tool."
        )}
      </p>
    </div>
  );
}

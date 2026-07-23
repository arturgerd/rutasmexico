import resultsData from "@/data/mundial-results.json";
import venuesData from "@/data/mundial-venues.json";
import { MundialVenue } from "@/types/mundial";
import { mundialResultSchema, validateData } from "./schemas";
import { z } from "zod";

export type LocalizedText = { es: string; en: string; fr?: string };

export interface MundialResult {
  id: string;
  group: string;
  date: string;
  time: string;
  teamA: LocalizedText;
  teamB: LocalizedText;
  scoreA: number | null;
  scoreB: number | null;
  isMexicoGame?: boolean;
  venue?: LocalizedText;
  venueSlug?: string | null;
}

// Validate at module load (build time) — fail loudly on malformed result data.
const results = validateData(
  z.array(mundialResultSchema),
  resultsData as MundialResult[],
  "mundial-results.json"
);

/** A match counts as played only when both scores are present. */
export function isPlayed(m: MundialResult): boolean {
  return m.scoreA !== null && m.scoreB !== null;
}

export function getResultsByGroup(group: string): MundialResult[] {
  return results
    .filter((m) => m.group === group)
    .sort((a, b) => (a.date !== b.date ? a.date.localeCompare(b.date) : a.time.localeCompare(b.time)));
}

export function getMexicoResults(): MundialResult[] {
  return results
    .filter((m) => m.isMexicoGame)
    .sort((a, b) => a.date.localeCompare(b.date));
}

const byDateTime = (a: MundialResult, b: MundialResult) =>
  a.date !== b.date ? a.date.localeCompare(b.date) : a.time.localeCompare(b.time);

/** Group-stage results only (the tracked 72 matches). */
export function getAllResults(): MundialResult[] {
  return [...results].sort(byDateTime);
}

// Short round tags shown where a group letter would go (badge in result lists).
const ROUND_TAG: Record<string, string> = {
  "round-of-32": "R32",
  "round-of-16": "R16",
  quarter: "QF",
  semi: "SF",
  "third-place": "3°",
  final: "🏆",
};

/**
 * The 32 knockout matches live on each venue's match list (they were tracked
 * per stadium), not in mundial-results.json. Projected here into MundialResult
 * shape so the tournament-wide scoreboard can show the bracket through the
 * final instead of stopping at the group stage.
 */
const knockoutResults: MundialResult[] = (venuesData as MundialVenue[]).flatMap(
  (v) =>
    v.matches
      .filter(
        (m) =>
          m.round !== "group" &&
          m.scoreA != null &&
          m.scoreB != null &&
          !/^(por definir|tbd|à définir)/i.test(m.teamA.es)
      )
      .map((m) => ({
        id: `${m.round}-${m.date}-${v.slug}-${m.time}`,
        group: ROUND_TAG[m.round] ?? m.round,
        date: m.date,
        time: m.time,
        teamA: m.teamA,
        teamB: m.teamB,
        scoreA: m.scoreA ?? null,
        scoreB: m.scoreB ?? null,
        isMexicoGame: m.isMexicoGame,
        venue: {
          es: `${v.stadium.name}, ${v.name.es.split(" - ")[0]}`,
          en: `${v.stadium.name}, ${v.name.en.split(" - ")[0]}`,
        },
        venueSlug: v.slug,
      }))
);

/**
 * Every match played on or before `todayISO` (server-render date), grouped by
 * day — the tournament-wide scoreboard. Includes the group stage from
 * mundial-results.json plus the knockout rounds tracked on the venue lists,
 * so the list runs through the July 19 final.
 */
export function getResultsUpToToday(todayISO: string): Array<[string, MundialResult[]]> {
  const map = new Map<string, MundialResult[]>();
  const all = [...results, ...knockoutResults].sort(byDateTime);
  for (const m of all) {
    if (m.date > todayISO) continue;
    if (!map.has(m.date)) map.set(m.date, []);
    map.get(m.date)!.push(m);
  }
  return Array.from(map.entries());
}

export interface StandingRow {
  team: LocalizedText;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
}

/**
 * Build the group table from played results. Order: points, then goal
 * difference, then goals scored, then alphabetical (es) as a stable tiebreak.
 * FIFA's real tiebreakers add head-to-head and fair play; for a fan-facing
 * provisional table the standard three are enough and stay deterministic.
 */
export function computeStandings(group: string): StandingRow[] {
  const rows = new Map<string, StandingRow>();

  const ensure = (team: LocalizedText): StandingRow => {
    const key = team.es;
    if (!rows.has(key)) {
      rows.set(key, {
        team,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDiff: 0,
        points: 0,
      });
    }
    return rows.get(key)!;
  };

  for (const m of getResultsByGroup(group)) {
    // Register every team so the table shows all four even before kickoff.
    const a = ensure(m.teamA);
    const b = ensure(m.teamB);
    if (!isPlayed(m)) continue;

    const sa = m.scoreA as number;
    const sb = m.scoreB as number;
    a.played++; b.played++;
    a.goalsFor += sa; a.goalsAgainst += sb;
    b.goalsFor += sb; b.goalsAgainst += sa;
    if (sa > sb) { a.won++; a.points += 3; b.lost++; }
    else if (sa < sb) { b.won++; b.points += 3; a.lost++; }
    else { a.drawn++; b.drawn++; a.points++; b.points++; }
  }

  return Array.from(rows.values())
    .map((r) => ({ ...r, goalDiff: r.goalsFor - r.goalsAgainst }))
    .sort(
      (x, y) =>
        y.points - x.points ||
        y.goalDiff - x.goalDiff ||
        y.goalsFor - x.goalsFor ||
        x.team.es.localeCompare(y.team.es, "es")
    );
}

export interface GroupStats {
  matchesPlayed: number;
  matchesTotal: number;
  goalsScored: number;
  goalsPerMatch: number;
}

export function getGroupStats(group: string): GroupStats {
  const all = getResultsByGroup(group);
  const played = all.filter(isPlayed);
  const goals = played.reduce((s, m) => s + (m.scoreA as number) + (m.scoreB as number), 0);
  return {
    matchesPlayed: played.length,
    matchesTotal: all.length,
    goalsScored: goals,
    goalsPerMatch: played.length ? Math.round((goals / played.length) * 10) / 10 : 0,
  };
}

import futbolData from "@/data/futbol-mx.json";

export interface FutbolMatch {
  date: string; // YYYY-MM-DD
  time: string | null; // HH:MM hora CDMX, null si no confirmado
  teamA: string;
  teamB: string;
  scoreA: number | null;
  scoreB: number | null;
  penalties?: string; // p.ej. "6-5 Tigres" — Leagues Cup no admite empates
  stadium: string;
  city: string;
  round: string; // "Jornada 4", "Cuartos de final", etc.
  status: "played" | "scheduled";
}

export interface FutbolCompetition {
  tournament: { es: string; en: string };
  note?: { es: string; en: string };
  matches: FutbolMatch[];
}

export interface FutbolData {
  updated: string; // YYYY-MM-DD de la última actualización manual
  ligaMX: FutbolCompetition;
  leaguesCup: FutbolCompetition;
}

const data = futbolData as FutbolData;

export function getFutbolData(): FutbolData {
  return data;
}

// Clave ordenable fecha+hora; los partidos sin hora van al final de su día.
const sortKey = (m: FutbolMatch) => `${m.date} ${m.time ?? "99:99"}`;

/** Partidos jugados, del más reciente al más antiguo. */
export function getPlayedMatches(comp: FutbolCompetition): FutbolMatch[] {
  return comp.matches
    .filter((m) => m.status === "played")
    .sort((a, b) => sortKey(b).localeCompare(sortKey(a)));
}

/** Partidos programados, del más próximo al más lejano. */
export function getUpcomingMatches(comp: FutbolCompetition): FutbolMatch[] {
  return comp.matches
    .filter((m) => m.status === "scheduled")
    .sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
}

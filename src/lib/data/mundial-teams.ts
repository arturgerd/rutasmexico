import teamsData from "@/data/mundial-teams.json";
import { mundialTeamSchema, validateData } from "./schemas";
import { z } from "zod";
import type { SimTeam } from "@/lib/mundial-simulator";

// Validate at module load (build time) — fail loudly on malformed team data.
const teams = validateData(
  z.array(mundialTeamSchema),
  teamsData as SimTeam[],
  "mundial-teams.json"
);

/** All 48 teams, sorted by FIFA rank (best first). */
export function getSimTeams(): SimTeam[] {
  return teams;
}

export function getSimTeam(id: string): SimTeam | undefined {
  return teams.find((t) => t.id === id);
}

/** ISO flag code (flagcdn) for a team's Spanish name — for the results/standings UI. */
export function flagCodeByName(es: string): string | undefined {
  return teams.find((t) => t.name.es === es)?.code;
}

/** Teams of a given group, in FIFA-rank order. */
export function getGroupTeams(group: string): SimTeam[] {
  return teams.filter((t) => t.group === group);
}

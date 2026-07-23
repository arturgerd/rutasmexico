import { getAllMundialVenues } from "./mundial";
import { getAllResults } from "./mundial-results";
import { MundialMatch, MundialVenue } from "@/types/mundial";

export interface CalendarMatch extends MundialMatch {
  /** Venue info is present when the match is anchored to a venue page;
   *  group-stage results tracked without a stadium omit it. */
  venueId?: string;
  venueSlug?: string;
  venueName?: MundialVenue["name"];
  stadiumName?: string;
  country?: "MX" | "US" | "CA";
}

const TBD_RE = /^(por definir|tbd|à définir)/i;

/**
 * The calendar unions the two authoritative sources the site maintains:
 *  - group stage: mundial-results.json (all 72 matches, teams + scores;
 *    venue attached when it was recorded, e.g. the Mexico games);
 *  - knockouts: the per-venue match lists in mundial-venues.json
 *    (all 32 bracket matches with scores, venue always known).
 * The venue file's pre-draw group-stage placeholder slots ("Por definir")
 * are dropped — their dates predate the draw and contradict the tracked
 * results, so they carry no information the results don't.
 */
export async function getAllMundialMatches(): Promise<CalendarMatch[]> {
  const venues = await getAllMundialVenues();
  const bySlug = new Map(venues.map((v) => [v.slug, v]));

  const withVenue = (v: MundialVenue | undefined) =>
    v
      ? {
          venueId: v.id,
          venueSlug: v.slug,
          venueName: v.name,
          stadiumName: v.stadium.name,
          country: (v.country ?? "MX") as "MX" | "US" | "CA",
        }
      : {};

  const knockouts: CalendarMatch[] = venues.flatMap((v) =>
    v.matches
      .filter(
        (m) =>
          m.round !== "group" &&
          !TBD_RE.test(m.teamA.es) &&
          !TBD_RE.test(m.teamB.es)
      )
      .map((m) => ({ ...m, ...withVenue(v) }))
  );

  const groupStage: CalendarMatch[] = getAllResults().map((r) => ({
    date: r.date,
    time: r.time || "",
    teamA: { fr: r.teamA.es, ...r.teamA },
    teamB: { fr: r.teamB.es, ...r.teamB },
    round: "group",
    group: r.group,
    isMexicoGame: !!r.isMexicoGame,
    scoreA: r.scoreA,
    scoreB: r.scoreB,
    ...withVenue(r.venueSlug ? bySlug.get(r.venueSlug) : undefined),
  }));

  return [...groupStage, ...knockouts].sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    // Untimed matches sink below timed ones within the same day.
    if (!a.time !== !b.time) return a.time ? -1 : 1;
    return a.time.localeCompare(b.time);
  });
}

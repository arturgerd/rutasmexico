import { getAllMundialVenues } from "./mundial";
import { MundialMatch, MundialVenue } from "@/types/mundial";

export interface CalendarMatch extends MundialMatch {
  venueId: string;
  venueSlug: string;
  venueName: MundialVenue["name"];
  stadiumName: string;
  country: "MX" | "US" | "CA";
}

export async function getAllMundialMatches(): Promise<CalendarMatch[]> {
  const venues = await getAllMundialVenues();
  const flat: CalendarMatch[] = venues.flatMap((v) =>
    v.matches.map((m) => ({
      ...m,
      venueId: v.id,
      venueSlug: v.slug,
      venueName: v.name,
      stadiumName: v.stadium.name,
      country: (v.country ?? "MX") as "MX" | "US" | "CA",
    }))
  );
  return flat.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.time.localeCompare(b.time);
  });
}

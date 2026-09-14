import mundialData from "@/data/mundial-venues.json";
import { MundialVenue, MundialVenueCard } from "@/types/mundial";

const venues = (mundialData as MundialVenue[]).sort((a, b) =>
  a.name.es.localeCompare(b.name.es, "es")
);

export async function getAllMundialVenues(): Promise<MundialVenue[]> {
  return venues;
}

export async function getMundialVenueBySlug(slug: string): Promise<MundialVenue | null> {
  return venues.find((v) => v.slug === slug) ?? null;
}

export async function getMundialVenueById(id: string): Promise<MundialVenue | null> {
  return venues.find((v) => v.id === id) ?? null;
}

/** Recorte de una sede a lo que pinta la tarjeta del grid (ver MundialVenueCard). */
export function toVenueCard(v: MundialVenue): MundialVenueCard {
  return {
    id: v.id,
    slug: v.slug,
    name: v.name,
    stadium: { name: v.stadium.name, capacity: v.stadium.capacity },
    matches: v.matches.map((m) => ({
      date: m.date,
      teamA: m.teamA,
      teamB: m.teamB,
      isMexicoGame: m.isMexicoGame,
    })),
    avgMatchDayBudget: v.avgMatchDayBudget,
  };
}

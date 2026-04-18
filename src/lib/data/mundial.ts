import mundialData from "@/data/mundial-venues.json";
import { MundialVenue } from "@/types/mundial";

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

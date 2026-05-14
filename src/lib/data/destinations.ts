import destinationsData from "@/data/destinations.json";
import { Destination } from "@/types/destination";

const destinations = destinationsData as Destination[];

export async function getAllDestinations(): Promise<Destination[]> {
  return destinations;
}

export async function getDestinationById(id: string): Promise<Destination | null> {
  return destinations.find((d) => d.id === id) ?? null;
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  return destinations.find((d) => d.slug === slug) ?? null;
}

export async function getDestinationsByRegion(region: string): Promise<Destination[]> {
  return destinations.filter((d) => d.region === region);
}

// Haversine great-circle distance between two coordinates, in kilometers.
// Used to surface geographically nearby destinations as related links from
// individual destination pages — a region filter alone is too sparse here
// (most regions have 1–3 destinations) and travelers searching for one
// beach destination are usually open to neighboring beaches too.
function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export async function getNearbyDestinations(
  currentId: string,
  count = 4,
): Promise<Array<Destination & { distanceKm: number }>> {
  const current = destinations.find((d) => d.id === currentId);
  if (!current) return [];
  return destinations
    .filter((d) => d.id !== currentId)
    .map((d) => ({ ...d, distanceKm: haversineKm(current.coordinates, d.coordinates) }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, count);
}

import destinationsData from "@/data/destinations.json";
import { Destination } from "@/types/destination";
import { destinationSchema, validateData } from "./schemas";

const destinations = validateData(
  destinationSchema.array(),
  destinationsData as Destination[],
  "destinations.json"
);

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

// Distancia de círculo máximo entre dos coordenadas, en kilómetros.
// Sirve para enlazar destinos geográficamente cercanos desde la ficha de cada
// uno: filtrar sólo por región queda demasiado escaso (la mayoría tiene entre
// una y tres) y quien busca una playa suele estar abierto a la de al lado.
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

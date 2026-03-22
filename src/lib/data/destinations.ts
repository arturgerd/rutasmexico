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

import { WeddingDestination } from "@/types/boda";
import bodasData from "@/data/bodas.json";

const destinations = bodasData as WeddingDestination[];

export async function getAllWeddingDestinations(): Promise<WeddingDestination[]> {
  return destinations;
}

export async function getWeddingDestinationBySlug(slug: string): Promise<WeddingDestination | undefined> {
  return destinations.find((d) => d.slug === slug);
}

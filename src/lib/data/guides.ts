import guidesData from "@/data/guides.json";
import { Guide } from "@/types/guide";

const guides = guidesData as Guide[];

export async function getGuideById(id: string): Promise<Guide | null> {
  return guides.find((g) => g.id === id) ?? null;
}

export async function getGuideByRouteOptionId(routeOptionId: string): Promise<Guide | null> {
  return guides.find((g) => g.routeOptionId === routeOptionId) ?? null;
}

export async function getAllGuides(): Promise<Guide[]> {
  return guides;
}

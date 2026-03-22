import routesData from "@/data/routes.json";
import { Route } from "@/types/route";

const routes = routesData as Route[];

export async function getAllRoutes(): Promise<Route[]> {
  return routes;
}

export async function getRouteBySlug(slug: string): Promise<Route | null> {
  return routes.find((r) => r.slug === slug) ?? null;
}

export async function getRoutesByOrigin(originId: string): Promise<Route[]> {
  return routes.filter((r) => r.originId === originId);
}

export async function getRoutesByDestination(destinationId: string): Promise<Route[]> {
  return routes.filter((r) => r.destinationId === destinationId);
}

export async function searchRoute(originId: string, destinationId: string): Promise<Route | null> {
  return routes.find((r) => r.originId === originId && r.destinationId === destinationId) ?? null;
}

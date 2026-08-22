import catalog from "@/data/camiones-cancun.json";
import { CamionRoute, CamionSummary } from "@/types/camion";

/**
 * Catálogo de camiones y combis urbanos de Cancún.
 *
 * IMPORTANTE: este módulo importa un JSON de ~470 KB. Úsalo sólo desde
 * componentes de servidor. Para el mapa y el planificador del navegador existe
 * /data/camiones-cancun-lineas.json, que baja los mismos trazos simplificados.
 * Regenerar ambos con `node scripts/build-camiones-cancun.mjs`.
 */
interface CamionCatalog {
  lastReviewed: string;
  attribution: string;
  generatedAt: string;
  routes: CamionRoute[];
}

const data = catalog as unknown as CamionCatalog;

export const CAMIONES_LAST_REVIEWED = data.lastReviewed;
export const CAMIONES_ATTRIBUTION = data.attribution;

/**
 * Fecha en que se comprobó en campo la tarifa del corredor de la Zona Hotelera.
 * Se lee del catálogo en vez de escribirla aquí para que no se desincronice con
 * lo que dicen las páginas de cada ruta.
 */
export const CAMIONES_FARE_VERIFIED_ON =
  data.routes.find((r) => r.fareConfidence === "verified")?.fareCheckedOn ?? data.lastReviewed;

export function getAllCamionRoutes(): CamionRoute[] {
  return data.routes;
}

export function getCamionRouteBySlug(slug: string): CamionRoute | undefined {
  return data.routes.find((r) => r.slug === slug);
}

/** Rutas que entran al bulevar Kukulcán, ordenadas con las de 24 h primero. */
export function getHotelZoneRoutes(): CamionRoute[] {
  return data.routes
    .filter((r) => r.coverage === "hotelera")
    .sort((a, b) => Number(b.allDay) - Number(a.allDay));
}

/**
 * Otras rutas que comparten al menos una parada con ésta. Sirve para enlazar
 * entre páginas de rutas sin escribir a mano 31 listas de relacionadas.
 */
export function getRelatedCamionRoutes(route: CamionRoute, limit = 4): CamionRoute[] {
  const own = new Set(route.stops.map((s) => s.name));
  return data.routes
    .filter((r) => r.id !== route.id)
    .map((r) => ({ route: r, shared: r.stops.filter((s) => own.has(s.name)).length }))
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map((x) => x.route);
}

/**
 * Reduce una ruta a lo que la interfaz necesita en el idioma activo.
 *
 * El explorador es un componente de cliente: todo lo que reciba por props viaja
 * en la carga de la página. Sin los trazos y con un solo idioma resuelto son
 * ~8 KB en vez de los ~470 KB del catálogo entero.
 */
export function toCamionSummary(route: CamionRoute, locale: string): CamionSummary {
  const pick = (text: { es: string; en: string }) => (locale === "es" ? text.es : text.en);
  return {
    slug: route.slug,
    code: route.code,
    name: pick(route.name),
    sign: route.sign,
    operator: route.operator,
    vehicleType: route.vehicleType,
    coverage: route.coverage,
    fareMxn: route.fareMxn,
    allDay: route.allDay,
    schedule: pick(route.schedule),
    color: route.color,
    notes: pick(route.notes),
    stops: route.stops.map((s) => s.name),
  };
}

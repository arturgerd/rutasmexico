import { LngLat, PlannableRoute } from "@/types/camion";

const EARTH_RADIUS_M = 6371000;

/** Distancia en metros entre dos coordenadas. */
export function haversine(a: LngLat, b: LngLat): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h));
}

/** Proyección de un punto sobre un segmento, en grados. A escala de ciudad basta. */
function pointOnSegment(p: LngLat, a: LngLat, b: LngLat): LngLat {
  const dx = b.lng - a.lng;
  const dy = b.lat - a.lat;
  const len2 = dx * dx + dy * dy;
  const t =
    len2 === 0
      ? 0
      : Math.max(0, Math.min(1, ((p.lng - a.lng) * dx + (p.lat - a.lat) * dy) / len2));
  return { lng: a.lng + t * dx, lat: a.lat + t * dy };
}

/**
 * Punto del trazo más cercano a `p`, y a cuántos metros queda.
 *
 * Es la operación central del planificador: "¿me sirve esta ruta desde donde
 * estoy?" se responde midiendo esta distancia contra el umbral de caminata.
 */
export function nearestOnRoute(
  route: PlannableRoute,
  p: LngLat
): { point: LngLat; meters: number; index: number } {
  let best = {
    point: { lng: route.polyline[0][0], lat: route.polyline[0][1] },
    meters: Infinity,
    index: 0,
  };
  for (let i = 0; i < route.polyline.length - 1; i++) {
    const a = { lng: route.polyline[i][0], lat: route.polyline[i][1] };
    const b = { lng: route.polyline[i + 1][0], lat: route.polyline[i + 1][1] };
    const point = pointOnSegment(p, a, b);
    const meters = haversine(p, point);
    if (meters < best.meters) best = { point, meters, index: i };
  }
  return best;
}

export function formatMeters(meters: number, locale: string): string {
  if (meters < 950) return `${Math.round(meters / 10) * 10} m`;
  const km = (meters / 1000).toFixed(1);
  return locale === "es" ? `${km.replace(".", ",")} km` : `${km} km`;
}

/** "45 min", "1 h 20 min". Igual en los dos idiomas, como formatDuration en lib/utils. */
export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!m) return `${h} h`;
  return `${h} h ${m} min`;
}

/** ~4.5 km/h, que es lo que camina alguien con calor y sin prisa. */
export function walkMinutes(meters: number): number {
  return Math.max(1, Math.round(meters / 75));
}

/**
 * ~21 km/h de velocidad comercial: incluye paradas y semáforos, no la velocidad
 * punta del camión. En Kukulcán es optimista a media tarde.
 */
export function busMinutes(meters: number): number {
  return Math.max(3, Math.round(meters / 350));
}

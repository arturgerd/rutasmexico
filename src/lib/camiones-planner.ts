import { CamionPlan, LngLat, PlanLeg, PlannableRoute } from "@/types/camion";
import { busMinutes, haversine, nearestOnRoute, walkMinutes } from "./camiones-geo";

/** Hasta dónde damos por razonable caminar a la parada. Cancún tiene 33 °C de media. */
const WALK_MAX_M = 900;
/** Distancia máxima entre dos trazos para considerarlos un trasbordo a pie. */
const TRANSFER_MAX_M = 380;
/** Por encima de esto ya no ofrecemos la opción de ir andando. */
const WALK_ONLY_MAX_M = 1400;
/**
 * Por debajo de esto, ir a pie encabeza la lista aunque el camión sea más
 * rápido. Pagar doce pesos por tres paradas es la respuesta equivocada a
 * "¿cómo llego?", y sin esto el plan a pie se cae del corte de cuatro.
 */
const WALK_BEATS_BUS_M = 1000;
/** Penalización en minutos por cada trasbordo al ordenar. Cambiar de camión cansa más que esperar. */
const TRANSFER_PENALTY_MIN = 8;

function walkLeg(from: LngLat, to: LngLat, fromLabel: string, toLabel: string): PlanLeg {
  const meters = haversine(from, to);
  return { kind: "walk", from, to, fromLabel, toLabel, meters, minutes: walkMinutes(meters) };
}

function busLeg(
  route: PlannableRoute,
  from: LngLat,
  to: LngLat,
  fromLabel: string,
  toLabel: string
): PlanLeg {
  const a = nearestOnRoute(route, from);
  const b = nearestOnRoute(route, to);
  // 1.15× la distancia en línea recta: el camión no va derecho, da vueltas por
  // avenidas. Es una aproximación, no el largo real del trazo entre los dos puntos.
  const meters = Math.max(400, haversine(a.point, b.point) * 1.15);
  return {
    kind: "bus",
    routeId: route.id,
    routeCode: route.code,
    routeColor: route.color,
    fareMxn: route.fareMxn,
    from: a.point,
    to: b.point,
    fromLabel,
    toLabel,
    meters,
    minutes: busMinutes(meters),
  };
}

/**
 * Tramos a pie tan cortos que no son un paso del viaje.
 *
 * Si eliges la terminal del ADO como origen, la parada del R1 está literalmente
 * ahí: "camina hasta ADO Centro, 1 min" no le dice nada a nadie. Se descartan
 * cuando el plan ya tiene un camión (un viaje entero a pie sí es un plan).
 */
const NEGLIGIBLE_WALK_M = 150;

function pack(rawLegs: PlanLeg[]): CamionPlan {
  const hasBus = rawLegs.some((l) => l.kind === "bus");
  const legs = hasBus
    ? rawLegs.filter((l) => l.kind !== "walk" || l.meters >= NEGLIGIBLE_WALK_M)
    : rawLegs;
  const buses = legs.filter((l) => l.kind === "bus");
  const minutes = legs.reduce((sum, l) => sum + l.minutes, 0);
  return {
    id: legs.map((l) => l.routeCode ?? "pie").join("-") + "-" + Math.round(minutes),
    // Se suman las tarifas de cada camión: un plan puede mezclar rutas de $10 y de $12.
    fareMxn: buses.reduce((sum, l) => sum + (l.fareMxn ?? 0), 0),
    minutes,
    meters: legs.reduce((sum, l) => sum + l.meters, 0),
    transfers: Math.max(0, buses.length - 1),
    legs,
  };
}

/** Nombre de la parada con nombre más cercana, o una etiqueta genérica si no hay ninguna. */
function nearestStopName(route: PlannableRoute, point: LngLat, fallback: string): string {
  const hit = route.stops.find(
    (s) => haversine({ lng: s.lng, lat: s.lat }, point) < 350
  );
  return hit?.name ?? fallback;
}

/**
 * Arma hasta cuatro maneras de ir de A a B en camión urbano.
 *
 * Es un planificador geométrico, no un motor de horarios: no sabe cuándo pasa
 * el camión, sólo por dónde pasa. Los tiempos son estimaciones de velocidad
 * comercial y el resultado se presenta como aproximado en la interfaz.
 */
export function planTrip(
  routes: PlannableRoute[],
  origin: LngLat,
  dest: LngLat,
  originLabel: string,
  destLabel: string,
  locale: string = "es"
): CamionPlan[] {
  const t = (es: string, en: string) => (locale === "es" ? es : en);
  const plans: CamionPlan[] = [];

  const straightLine = haversine(origin, dest);
  const onFoot =
    straightLine < WALK_ONLY_MAX_M
      ? pack([walkLeg(origin, dest, originLabel, destLabel)])
      : null;
  // Sólo entra a competir por tiempo si el trayecto es largo; si es corto se
  // añade al final, ya encabezando la lista.
  if (onFoot && straightLine >= WALK_BEATS_BUS_M) plans.push(onFoot);

  const nearOrigin = routes
    .map((route) => ({ route, hit: nearestOnRoute(route, origin) }))
    .filter((x) => x.hit.meters < WALK_MAX_M);
  const nearDest = routes
    .map((route) => ({ route, hit: nearestOnRoute(route, dest) }))
    .filter((x) => x.hit.meters < WALK_MAX_M);

  // Un solo camión.
  for (const a of nearOrigin) {
    const same = nearDest.find((d) => d.route.id === a.route.id);
    if (!same) continue;
    // Sube y baja casi en el mismo punto: la ruta roza el origen y el destino
    // pero no te lleva de uno a otro.
    if (haversine(a.hit.point, same.hit.point) < 250) continue;

    const board = nearestStopName(a.route, a.hit.point, `${t("Parada", "Stop")} ${a.route.code}`);
    const alight = nearestStopName(a.route, same.hit.point, destLabel);
    plans.push(
      pack([
        walkLeg(origin, a.hit.point, originLabel, board),
        busLeg(a.route, a.hit.point, same.hit.point, board, alight),
        walkLeg(same.hit.point, dest, alight, destLabel),
      ])
    );
  }

  // Dos camiones con trasbordo a pie.
  for (const a of nearOrigin) {
    for (const b of nearDest) {
      if (a.route.id === b.route.id) continue;

      // Muestreamos ~28 puntos del primer trazo buscando dónde se acerca al
      // segundo. Comparar todos contra todos serían millones de haversines.
      let best = { meters: Infinity, atA: a.hit.point, atB: b.hit.point };
      const step = Math.max(1, Math.floor(a.route.polyline.length / 28));
      for (let i = 0; i < a.route.polyline.length; i += step) {
        const p = { lng: a.route.polyline[i][0], lat: a.route.polyline[i][1] };
        const n = nearestOnRoute(b.route, p);
        if (n.meters < best.meters) best = { meters: n.meters, atA: p, atB: n.point };
      }
      if (best.meters > TRANSFER_MAX_M) continue;

      const board = nearestStopName(a.route, a.hit.point, `${t("Parada", "Stop")} ${a.route.code}`);
      const xfer = nearestStopName(a.route, best.atA, t("el trasbordo", "the transfer point"));
      const alight = nearestStopName(b.route, b.hit.point, destLabel);
      // Etiqueta de un LUGAR, no una instrucción: la interfaz la incrusta en
      // "Sube en …" y "Camina hasta …", y el código de la ruta ya va en su
      // propia insignia al lado.
      const boardB = nearestStopName(b.route, best.atB, xfer);

      plans.push(
        pack([
          walkLeg(origin, a.hit.point, originLabel, board),
          busLeg(a.route, a.hit.point, best.atA, board, xfer),
          walkLeg(best.atA, best.atB, xfer, boardB),
          busLeg(b.route, best.atB, b.hit.point, boardB, alight),
          walkLeg(b.hit.point, dest, alight, destLabel),
        ])
      );
    }
  }

  const seen = new Set<string>();
  const ranked = plans
    .sort(
      (a, b) =>
        a.minutes +
          a.transfers * TRANSFER_PENALTY_MIN -
          (b.minutes + b.transfers * TRANSFER_PENALTY_MIN) || a.fareMxn - b.fareMxn
    )
    .filter((plan) => {
      // La identidad de un plan son los camiones que tomas, en orden. Se ignoran
      // los tramos a pie y se usa el CÓDIGO, no el id: el R2 tiene cinco
      // variantes que salen de colonias distintas pero comparten el tramo largo,
      // y ofrecerlas como cuatro opciones con el mismo tiempo y la misma parada
      // no le da al usuario nada que decidir. Como el orden ya está resuelto
      // arriba, de cada código sobrevive su mejor plan.
      const key =
        plan.legs
          .filter((l) => l.kind === "bus")
          .map((l) => l.routeCode)
          .join(">") || "a-pie";
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 4);

  if (onFoot && straightLine < WALK_BEATS_BUS_M) return [onFoot, ...ranked.slice(0, 3)];
  return ranked;
}

import { LocalizedString } from "./common";

/** Rutas que pasan por el bulevar Kukulcán vs. las que sólo sirven la ciudad. */
export type CamionCoverage = "hotelera" | "urbana";

/** Camión grande o combi (van de ~14 plazas). Cambia si te deja subir con maletas. */
export type CamionVehicle = "autobus" | "combi";

export type CamionFilter = "todas" | "hotelera" | "urbana" | "24h" | "combi";

export interface CamionStop {
  name: string;
  lng: number;
  lat: number;
}

/**
 * Ruta completa. Vive en src/data/camiones-cancun.json y se importa SÓLO en el
 * servidor: con los trazos a resolución completa el archivo pesa ~470 KB.
 *
 * Coordenadas en orden [lng, lat] (convención GeoJSON). Leaflet espera
 * [lat, lng], así que los componentes de mapa las invierten al pintar.
 */
export interface CamionRoute {
  id: string;
  slug: string;
  code: string;
  name: LocalizedString;
  /** Letrero del parabrisas. Sin traducir: es lo que hay que reconocer en el cristal. */
  sign: string;
  operator: string;
  vehicleType: CamionVehicle;
  coverage: CamionCoverage;
  fareMxn: number;
  /**
   * Confianza de la tarifa, por ruta. El corredor de la Zona Hotelera está
   * comprobado pagando el pasaje; el urbano sigue siendo referencia pública.
   */
  fareConfidence: "verified" | "approx";
  fareCheckedOn: string;
  allDay: boolean;
  schedule: LocalizedString;
  color: string;
  notes: LocalizedString;
  bounds: [number, number, number, number];
  stops: CamionStop[];
  polyline: [number, number][];
}

/**
 * Versión ligera que baja el navegador desde /data/camiones-cancun-lineas.json
 * para el mapa del hub y el planificador. Mismo catálogo, trazo simplificado a
 * ~15 m y sin los campos que sólo se usan para renderizar texto en servidor.
 */
export interface CamionLine {
  id: string;
  code: string;
  color: string;
  coverage: CamionCoverage;
  vehicleType: CamionVehicle;
  fareMxn: number;
  fareConfidence: "verified" | "approx";
  allDay: boolean;
  name: LocalizedString;
  stops: CamionStop[];
  polyline: [number, number][];
}

/**
 * Ruta aplanada a un solo idioma y sin geometría. Es lo que el servidor pasa
 * como props al explorador: 31 de éstas pesan ~8 KB en la carga de la página,
 * frente a los ~470 KB del catálogo completo.
 */
export interface CamionSummary {
  slug: string;
  code: string;
  name: string;
  sign: string;
  operator: string;
  vehicleType: CamionVehicle;
  coverage: CamionCoverage;
  fareMxn: number;
  allDay: boolean;
  schedule: string;
  color: string;
  notes: string;
  /** Sólo los nombres: alimentan la búsqueda por parada. */
  stops: string[];
}

/** Lo mínimo que necesita el planificador; lo cumplen tanto CamionRoute como CamionLine. */
export interface PlannableRoute {
  id: string;
  code: string;
  name: LocalizedString;
  color: string;
  fareMxn: number;
  stops: CamionStop[];
  polyline: [number, number][];
}

export interface LngLat {
  lng: number;
  lat: number;
}

/** Punto de referencia que la gente sí sabe nombrar (ADO, Playa Delfines, La Isla...). */
export interface CamionPlace {
  id: string;
  name: string;
  hint: LocalizedString;
  lng: number;
  lat: number;
}

export interface PlanLeg {
  kind: "walk" | "bus";
  routeId?: string;
  routeCode?: string;
  routeColor?: string;
  /** Tarifa de este tramo. En Cancún no hay transbordo gratuito: cada camión se paga aparte. */
  fareMxn?: number;
  from: LngLat;
  to: LngLat;
  fromLabel: string;
  toLabel: string;
  meters: number;
  minutes: number;
}

export interface CamionPlan {
  id: string;
  fareMxn: number;
  minutes: number;
  meters: number;
  transfers: number;
  legs: PlanLeg[];
}

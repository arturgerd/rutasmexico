import type { LocalizedString } from "@/types/common";

/**
 * Temas sobre los que se puede opinar.
 *
 * La lista es cerrada a propósito: un campo libre acaba lleno de opiniones
 * sobre cosas que el sitio no cubre, y entonces no hay dónde publicarlas. Cada
 * tema corresponde a una página que existe.
 */
export interface TemaOpinion {
  id: string;
  label: LocalizedString;
  /** Ruta donde se muestran las opiniones aprobadas de este tema. */
  path?: string;
}

export const TEMAS_OPINION: TemaOpinion[] = [
  {
    id: "aeropuerto-cancun",
    label: { es: "Llegar del aeropuerto de Cancún", en: "Getting in from Cancún airport" },
    path: "/aeropuerto-cancun",
  },
  {
    id: "camiones-cancun",
    label: { es: "Camiones urbanos de Cancún", en: "Cancún city buses" },
    path: "/camiones-cancun",
  },
  {
    id: "zona-hotelera",
    label: { es: "Zona Hotelera de Cancún", en: "Cancún Hotel Zone" },
    path: "/aeropuerto-cancun",
  },
  {
    id: "cancun-centro",
    label: { es: "Centro de Cancún", en: "Downtown Cancún" },
    path: "/destinos/cancun",
  },
  {
    id: "mercado-28",
    label: { es: "Mercado 28", en: "Mercado 28" },
    path: "/aeropuerto-cancun",
  },
  {
    id: "coco-bongo",
    label: { es: "Coco Bongo", en: "Coco Bongo" },
    path: "/aeropuerto-cancun",
  },
  {
    id: "isla-mujeres",
    label: { es: "Isla Mujeres", en: "Isla Mujeres" },
    path: "/destinos/isla-mujeres",
  },
  {
    id: "playa-del-carmen",
    label: { es: "Playa del Carmen", en: "Playa del Carmen" },
    path: "/destinos/playa-del-carmen",
  },
  { id: "tulum", label: { es: "Tulum", en: "Tulum" }, path: "/destinos/tulum" },
  { id: "bacalar", label: { es: "Bacalar", en: "Bacalar" }, path: "/destinos/bacalar" },
  { id: "otro", label: { es: "Otro lugar de México", en: "Somewhere else in Mexico" } },
];

export function temaLabel(id: string, locale: string): string {
  const tema = TEMAS_OPINION.find((t) => t.id === id);
  if (!tema) return id;
  return locale === "es" ? tema.label.es : tema.label.en;
}

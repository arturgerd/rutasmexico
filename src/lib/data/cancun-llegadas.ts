import { getCancunAirportGuide } from "./aeropuerto-cun";
import type { LocalizedString } from "@/types/common";

/**
 * "Voy a X, ¿cuánto y cómo?" — la pregunta que el lector trae en la cabeza al
 * aterrizar, respondida antes de las fichas largas de cada opción.
 *
 * Los precios de ADO NO se escriben aquí: se leen de aeropuerto-cun.json, que
 * es donde viven con su fuente y su fecha de revisión. Este módulo sólo compone
 * los trayectos que necesitan más de un boleto, que son justo los que ninguna
 * guía suma bien.
 */

/**
 * Tarifa del camión urbano que entra a Kukulcán, comprobada en campo pagando el
 * pasaje. Coincide con el catálogo de camiones, donde va etiquetada como
 * verificada ruta por ruta.
 */
const CAMION_HOTELERA_MXN = 12;
/** Ferry Puerto Juárez → Isla Mujeres, sencillo. El redondo ronda los $320. */
const FERRY_ISLA_SENCILLO_MXN = 160;
/** Colectivo del centro a Puerto Morelos. Se paga en efectivo al subir. */
const COLECTIVO_MORELOS_MXN = 80;

export interface ArrivalStep {
  label: LocalizedString;
  priceMxn: number;
}

export interface ArrivalRow {
  id: string;
  destination: LocalizedString;
  /** Desglose del camino más barato. Más de un paso = más de un boleto. */
  steps: ArrivalStep[];
  totalMxn: number;
  minutes: { min: number; max: number };
  /** La advertencia que cambia la decisión, no un adorno. */
  note: LocalizedString;
  /** Ruta de camión que remata el trayecto, si la hay. Enlaza a su página. */
  camionSlug?: string;
}

function priceOf(id: string): number {
  const option = getCancunAirportGuide().options.find((o) => o.id === id);
  return option?.price.amount ?? 0;
}

function durationOf(id: string): { min: number; max: number } {
  const option = getCancunAirportGuide().options.find((o) => o.id === id);
  return {
    min: option?.duration.minMinutes ?? 0,
    max: option?.duration.maxMinutes ?? 0,
  };
}

export function getArrivalRows(): ArrivalRow[] {
  const adoCentro = priceOf("ado-centro");
  const centroDuration = durationOf("ado-centro");

  return [
    {
      id: "zona-hotelera",
      destination: { es: "Zona Hotelera de Cancún", en: "Cancún Hotel Zone" },
      steps: [
        { label: { es: "ADO al centro", en: "ADO downtown" }, priceMxn: adoCentro },
        { label: { es: "Camión R1 o R2", en: "R1 or R2 bus" }, priceMxn: CAMION_HOTELERA_MXN },
      ],
      totalMxn: adoCentro + CAMION_HOTELERA_MXN,
      minutes: { min: centroDuration.min + 30, max: centroDuration.max + 40 },
      note: {
        es: "No hay ADO directo a Kukulcán: éste es el error más caro que se comete al aterrizar. Con maletas grandes o de madrugada, el traslado reservado gana.",
        en: "There's no direct ADO to Kukulcán: this is the costliest mistake people make on landing. With big suitcases or a late arrival, a booked transfer wins.",
      },
      camionSlug: "r1",
    },
    {
      id: "centro",
      destination: { es: "Centro de Cancún", en: "Downtown Cancún" },
      steps: [{ label: { es: "ADO al centro", en: "ADO downtown" }, priceMxn: adoCentro }],
      totalMxn: adoCentro,
      minutes: centroDuration,
      note: {
        es: "Te deja en Av. Tulum esquina con Uxmal, a una cuadra del Parque de las Palapas. Es el trayecto con mejor relación precio-comodidad de toda la lista.",
        en: "Drops you at Av. Tulum and Uxmal, a block from Parque de las Palapas. It's the best value-for-comfort trip on the whole list.",
      },
    },
    {
      id: "playa-del-carmen",
      destination: { es: "Playa del Carmen", en: "Playa del Carmen" },
      steps: [
        { label: { es: "ADO directo", en: "Direct ADO" }, priceMxn: priceOf("ado-playa-del-carmen") },
      ],
      totalMxn: priceOf("ado-playa-del-carmen"),
      minutes: durationOf("ado-playa-del-carmen"),
      note: {
        es: "Directo desde la terminal del aeropuerto, sin pasar por Cancún, y te deja a pasos de la Quinta Avenida. No hay salidas de madrugada.",
        en: "Direct from the airport terminal without going through Cancún, dropping you steps from Quinta Avenida. No overnight departures.",
      },
    },
    {
      id: "tulum",
      destination: { es: "Tulum", en: "Tulum" },
      steps: [{ label: { es: "ADO directo", en: "Direct ADO" }, priceMxn: priceOf("ado-tulum") }],
      totalMxn: priceOf("ado-tulum"),
      minutes: durationOf("ado-tulum"),
      note: {
        es: "Llega al centro del pueblo. La zona de hoteles de playa está a varios kilómetros de ahí: cuenta un taxi o una bici más.",
        en: "Arrives in the town centre. The beach hotel strip is several kilometres away: budget a taxi or a bike on top.",
      },
    },
    {
      id: "isla-mujeres",
      destination: { es: "Isla Mujeres", en: "Isla Mujeres" },
      steps: [
        { label: { es: "ADO al centro", en: "ADO downtown" }, priceMxn: adoCentro },
        { label: { es: "Camión R10 al muelle", en: "R10 bus to the pier" }, priceMxn: CAMION_HOTELERA_MXN },
        { label: { es: "Ferry sencillo", en: "One-way ferry" }, priceMxn: FERRY_ISLA_SENCILLO_MXN },
      ],
      totalMxn: adoCentro + CAMION_HOTELERA_MXN + FERRY_ISLA_SENCILLO_MXN,
      minutes: { min: centroDuration.min + 55, max: centroDuration.max + 70 },
      note: {
        es: "El ferry sale de Puerto Juárez cada media hora y tarda veinte minutos. Los que salen de la Zona Hotelera cuestan bastante más.",
        en: "The ferry leaves Puerto Juárez every half hour and takes twenty minutes. The ones from the Hotel Zone cost considerably more.",
      },
      camionSlug: "r10",
    },
    {
      id: "puerto-morelos",
      destination: { es: "Puerto Morelos", en: "Puerto Morelos" },
      steps: [
        { label: { es: "ADO al centro", en: "ADO downtown" }, priceMxn: adoCentro },
        { label: { es: "Colectivo", en: "Colectivo van" }, priceMxn: COLECTIVO_MORELOS_MXN },
      ],
      totalMxn: adoCentro + COLECTIVO_MORELOS_MXN,
      minutes: { min: centroDuration.min + 40, max: centroDuration.max + 50 },
      note: {
        es: "Queda a medio camino del aeropuerto, así que dar la vuelta por Cancún es un rodeo. Si vas directo, un traslado reservado sale a cuenta.",
        en: "It sits halfway back towards the airport, so looping through Cancún is a detour. Going straight there, a booked transfer pays off.",
      },
    },
  ];
}

import data from "@/data/aeropuerto-cun.json";
import type { LocalizedString } from "@/types/common";
import type { ConfidenceLevel } from "@/components/ui/DataConfidence";

export type TransportMode = "bus" | "taxi" | "transfer" | "car";

export interface OptionPrice {
  /** Ausente cuando confidence es "unconfirmed" o "live": ahí no tenemos un número que defender. */
  amount?: number;
  currency: "MXN" | "USD";
  unit: "person" | "vehicle" | "day";
  confidence: ConfidenceLevel;
  checkedOn: string;
  source: string;
  sourceUrl?: string;
  note?: LocalizedString;
}

export interface TransportOption {
  id: string;
  mode: TransportMode;
  /** ADO se llama igual en los dos idiomas; los operadores genéricos sí se traducen. */
  operator: string | LocalizedString;
  recommended: boolean;
  name: LocalizedString;
  destination: LocalizedString;
  price: OptionPrice;
  duration: { minMinutes: number; maxMinutes: number };
  frequency: LocalizedString;
  hours: LocalizedString;
  terminals: string[];
  pros: LocalizedString[];
  cons: LocalizedString[];
}

export interface RideshareNote {
  status: string;
  checkedOn: string;
  title: LocalizedString;
  body: LocalizedString;
  sources: { label: string; url: string }[];
}

export interface AirportWarning {
  id: string;
  title: LocalizedString;
  body: LocalizedString;
}

export interface AirportGuide {
  iata: string;
  lastReviewed: string;
  terminalNote: LocalizedString;
  options: TransportOption[];
  rideshare: RideshareNote;
  warnings: AirportWarning[];
}

export function getCancunAirportGuide(): AirportGuide {
  return data as AirportGuide;
}

/** Nombre del operador, que puede venir como string plano (ADO) o localizado. */
export function operatorName(operator: string | LocalizedString, locale: string): string {
  if (typeof operator === "string") return operator;
  return locale === "es" ? operator.es : operator.en;
}

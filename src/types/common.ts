export type Locale = "es" | "en";
export type ContentLocale = "es" | "en" | "fr";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LocalizedString {
  es: string;
  en: string;
}

export interface PriceRange {
  min: number;
  max: number;
  currency: "MXN";
}

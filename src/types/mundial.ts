import { LocalizedString, PriceRange } from "./common";

export interface MundialMatch {
  date: string;
  time: string;
  teamA: LocalizedString;
  teamB: LocalizedString;
  round: "group" | "round-of-32" | "round-of-16" | "quarter" | "semi" | "final";
  group?: string;
  isMexicoGame: boolean;
}

export type SafetyLevel = "green" | "yellow" | "red";

export interface TransportOption {
  type: "metro" | "metrobus" | "tren-ligero" | "uber" | "airport-taxi" | "taxi" | "bus" | "walk" | "shuttle" | "cablebus";
  icon: string;
  name: LocalizedString;
  cost: LocalizedString;
  duration: LocalizedString;
  safetyLevel: SafetyLevel;
  safetyNote: LocalizedString;
  tips: LocalizedString;
}

export interface AirportArrival {
  code: string;
  name: LocalizedString;
  distance: string;
  description: LocalizedString;
  options: TransportOption[];
}

export interface SafetyZone {
  level: SafetyLevel;
  name: LocalizedString;
  description: LocalizedString;
  tip?: LocalizedString;
}

export interface CurrencyPlace {
  type: "casa-cambio" | "bank" | "atm" | "airport";
  name: string;
  area: LocalizedString;
  hours?: string;
  note: LocalizedString;
  rateQuality: "best" | "good" | "fair" | "worst";
}

export interface NearbyAttraction {
  emoji: string;
  name: LocalizedString;
  category: LocalizedString;
  distance: string;
  timeFromStadium: LocalizedString;
  description: LocalizedString;
  mapsQuery?: string;
}

export interface FromMexicoFlight {
  fromCity: "CDMX" | "MTY" | "GDL";
  airlines: string;
  duration: LocalizedString;
  priceRangeMxn: LocalizedString;
  direct: boolean;
  note?: LocalizedString;
}

export interface FromMexico {
  description: LocalizedString;
  flights: FromMexicoFlight[];
  tip?: LocalizedString;
}

export interface MundialVenue {
  id: string;
  slug: string;
  destinationId?: string;
  country?: "MX" | "US" | "CA";
  name: LocalizedString;
  stadium: {
    name: string;
    capacity: number;
    address: LocalizedString;
    yearBuilt: number;
    description: LocalizedString;
  };
  matches: MundialMatch[];
  howToGetThere: LocalizedString;
  nearbyHotels: LocalizedString;
  fanZones: LocalizedString;
  tips: { title: LocalizedString; content: LocalizedString }[];
  heroImage: string;
  avgMatchDayBudget: PriceRange;

  airports?: AirportArrival[];
  localTransport?: TransportOption[];
  safetyZones?: SafetyZone[];
  currency?: {
    tip: LocalizedString;
    places: CurrencyPlace[];
  };
  nearbyAttractions?: NearbyAttraction[];
  mapsEmbedSrc?: string;
  fromMexico?: FromMexico;
}

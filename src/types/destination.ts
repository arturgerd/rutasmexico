import { Coordinates, LocalizedString, PriceRange } from "./common";

export interface Destination {
  id: string;
  slug: string;
  name: LocalizedString;
  shortName: string;
  airportIATA: string; // IATA code of nearest airport (e.g. "MEX", "CUN")
  coordinates: Coordinates;
  state: LocalizedString;
  region: "centro" | "norte" | "sur" | "peninsula" | "pacifico" | "golfo" | "bajio";
  description: LocalizedString;
  longDescription: LocalizedString;
  heroImage: string;
  highlights: LocalizedString[];
  gettingAround: LocalizedString;
  safetyTips: LocalizedString[];
  foodRecommendations: {
    name: string;
    description: LocalizedString;
    priceRange: PriceRange;
    whereToTry: LocalizedString;
  }[];
  averageDailyBudget: PriceRange;
  bestTimeToVisit: LocalizedString;
  reviews?: {
    author: string;
    rating: number; // 1-5
    date: string;   // ISO 8601
    text: LocalizedString;
  }[];
}

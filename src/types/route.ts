import { LocalizedString, PriceRange } from "./common";

export type TravelMode = "flight" | "bus" | "car";

export interface Route {
  id: string;
  slug: string;
  originId: string;
  destinationId: string;
  options: RouteOption[];
}

export interface RouteOption {
  id: string;
  mode: TravelMode;
  provider: LocalizedString;
  duration: {
    minMinutes: number;
    maxMinutes: number;
    label: LocalizedString;
  };
  priceRange: PriceRange;
  guideId: string;
  frequency: LocalizedString;
  recommended: boolean;
}

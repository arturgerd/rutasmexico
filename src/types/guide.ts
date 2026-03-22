import { Coordinates, LocalizedString, PriceRange } from "./common";

export type StepType =
  | "departure_preparation"
  | "transit_segment"
  | "layover"
  | "arrival_navigation"
  | "local_transport";

export interface Guide {
  id: string;
  routeOptionId: string;
  title: LocalizedString;
  overview: LocalizedString;
  steps: GuideStep[];
  tips: LocalizedString[];
}

export interface GuideStep {
  order: number;
  type: StepType;
  title: LocalizedString;
  description: LocalizedString;
  location?: {
    name: LocalizedString;
    address: LocalizedString;
    coordinates: Coordinates;
  };
  duration?: {
    minutes: number;
    label: LocalizedString;
  };
  cost?: PriceRange;
  tips?: LocalizedString[];
}

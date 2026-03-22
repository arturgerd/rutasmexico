import { Coordinates, LocalizedString, PriceRange } from "./common";

export type TerminalType = "airport" | "bus_terminal";

export interface Terminal {
  id: string;
  type: TerminalType;
  name: LocalizedString;
  shortCode?: string;
  cityId: string;
  address: LocalizedString;
  coordinates: Coordinates;
  howToGetThere: LocalizedString;
  transportOptions: {
    mode: string;
    description: LocalizedString;
    cost: PriceRange;
    duration: { minutes: number; label: LocalizedString };
  }[];
  tips: LocalizedString[];
  facilities: string[];
}

import { LocalizedString } from "./common";

export interface Airport {
  iata: string;
  name: string;
  city: LocalizedString;
  state: LocalizedString;
  lat: number;
  lng: number;
}

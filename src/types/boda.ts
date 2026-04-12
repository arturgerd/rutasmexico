import { LocalizedString, PriceRange } from "./common";

export interface WeddingVenue {
  id: string;
  name: string;
  type: "hotel" | "playa" | "hacienda" | "parque" | "restaurante";
  description: LocalizedString;
  capacity: { min: number; max: number };
  priceRange: PriceRange;
  highlights: LocalizedString[];
  image: string;
  lgbtqFriendly: boolean;
  accessibilityFeatures: string[]; // wheelchair, hearing, visual, beach-wheelchair, etc.
}

export interface CelebrationIdea {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  priceRange: PriceRange;
  duration: LocalizedString;
  icon: string;
}

export interface AccessibleBeach {
  name: string;
  description: LocalizedString;
  features: string[];
}

export interface WeddingDestination {
  id: string;
  slug: string;
  name: LocalizedString;
  intro: LocalizedString;
  venues: WeddingVenue[];
  bacheloretteIdeas: CelebrationIdea[];
  bachelorIdeas: CelebrationIdea[];
  lgbtq: {
    legalStatus: LocalizedString;
    tips: LocalizedString[];
    friendlyVenueIds: string[];
    prideInfo: LocalizedString;
  };
  accessibility: {
    overview: LocalizedString;
    accessibleVenueIds: string[];
    tips: LocalizedString[];
    accessibleTransport: LocalizedString;
    accessibleBeaches: AccessibleBeach[];
  };
  legal: {
    documents: LocalizedString[];
    process: LocalizedString;
    foreigners: LocalizedString;
  };
  budget: {
    economy: PriceRange;
    mid: PriceRange;
    luxury: PriceRange;
    tips: LocalizedString[];
  };
  bestSeason: LocalizedString;
  faqs: { question: LocalizedString; answer: LocalizedString }[];
}

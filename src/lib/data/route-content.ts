import contentData from "@/data/routes-content.json";

export interface LocalizedText {
  es: string;
  en: string;
  fr: string;
}

export interface RouteFaq {
  question: LocalizedText;
  answer: LocalizedText;
}

export interface RouteContent {
  overview: LocalizedText;
  flightDetails?: LocalizedText;
  busDetails?: LocalizedText;
  carDetails?: LocalizedText;
  bestTime: LocalizedText;
  tips: LocalizedText;
  faqs: RouteFaq[];
}

const content = contentData as Record<string, RouteContent>;

export function getRouteContent(slug: string): RouteContent | null {
  return content[slug] ?? null;
}

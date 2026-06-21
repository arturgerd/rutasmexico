import contentData from "@/data/destinations-content.json";

export interface ExpandedSection {
  es: string;
  en: string;
  // French is deprecated (Locale is es/en; /fr redirects to /es) but legacy
  // content entries still carry it, so keep it optional rather than required.
  fr?: string;
}

export interface ExpandedFaq {
  question: ExpandedSection;
  answer: ExpandedSection;
}

export interface ExpandedContent {
  howToGetThere: ExpandedSection;
  whereToStay: ExpandedSection;
  gettingAround: ExpandedSection;
  foodScene: ExpandedSection;
  bestTime: ExpandedSection;
  dailyCost: ExpandedSection;
  faqs: ExpandedFaq[];
}

const content = contentData as Record<string, ExpandedContent>;

export function getExpandedContent(slug: string): ExpandedContent | null {
  return content[slug] ?? null;
}

export function hasExpandedContent(slug: string): boolean {
  return slug in content;
}

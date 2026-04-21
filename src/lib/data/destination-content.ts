import contentData from "@/data/destinations-content.json";

export interface ExpandedSection {
  es: string;
  en: string;
  fr: string;
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

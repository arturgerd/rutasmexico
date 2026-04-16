import { LocalizedString } from "./common";

export type BlogCategory = "guia-destino" | "tips-viaje" | "transporte" | "gastronomia" | "cultura";

export interface BlogPost {
  id: string;
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString; // HTML content
  author: string;
  category: BlogCategory;
  publishedDate: string; // YYYY-MM-DD
  updatedDate?: string;
  featuredImage: string; // Unsplash URL
  tags: string[];
  readingTime: number; // minutes
}

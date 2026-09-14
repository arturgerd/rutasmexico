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

/**
 * Lo que necesita una tarjeta de blog. Es lo que cruza a los componentes
 * cliente (BlogFilter, BlogCard): sin `content`, que pesa el 95 % del JSON y
 * que ninguna tarjeta lee. Pasar BlogPost entero metía ~900 KB de HTML de
 * artículos en el payload de /blog.
 */
export type BlogPostSummary = Omit<BlogPost, "content">;

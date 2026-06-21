import { BlogCategory } from "@/types/blog";

// Blog category labels + badge colors. Kept in a plain (non-"use client") module
// so BOTH server and client components can import the real functions. Importing
// these from a "use client" component turns them into client references that
// can't be called during server rendering.
const CATEGORY_LABELS: Record<BlogCategory, { es: string; en: string; color: string }> = {
  "guia-destino": { es: "Guía de destino", en: "Destination Guide", color: "bg-azul-100 text-azul-700 border-azul-200" },
  "tips-viaje": { es: "Tips de viaje", en: "Travel Tips", color: "bg-jade-100 text-jade-700 border-jade-200" },
  "transporte": { es: "Transporte", en: "Transportation", color: "bg-oro-100 text-oro-700 border-oro-200" },
  "gastronomia": { es: "Gastronomía", en: "Food & Drink", color: "bg-terracotta-100 text-terracotta-700 border-terracotta-200" },
  "cultura": { es: "Cultura", en: "Culture", color: "bg-arena-200 text-arena-800 border-arena-300" },
};

export function getCategoryLabel(category: BlogCategory, locale: string): string {
  const labels = CATEGORY_LABELS[category];
  return locale === "es" ? labels.es : labels.en;
}

export function getCategoryColor(category: BlogCategory): string {
  return CATEGORY_LABELS[category].color;
}

import { LocalizedString, Locale } from "@/types/common";

export function localize(text: LocalizedString, locale: Locale): string {
  if (locale === "fr") {
    return text.fr || text.en || text.es;
  }
  return text[locale] || text.es;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
}

/**
 * Inline translation helper for 3 locales (es/en/fr).
 * Usage: t3(locale, "Hola", "Hello", "Bonjour")
 */
export function t3(locale: string, es: string, en: string, fr: string): string {
  if (locale === "fr") return fr;
  if (locale === "es") return es;
  return en;
}

/**
 * Safe locale accessor for inline data objects that may not have 'fr'.
 * Falls back: fr → en → es → ""
 * Usage: l({ es: "Hola", en: "Hello" }, locale)
 */
export function l(obj: Record<string, string> | LocalizedString, locale: string): string {
  const record = obj as Record<string, string>;
  return record[locale] || record.en || record.es || "";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

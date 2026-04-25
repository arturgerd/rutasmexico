import { LocalizedString, Locale } from "@/types/common";

export function localize(text: LocalizedString, locale: Locale | string): string {
  if (locale === "fr") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (text as any).fr || text.en || text.es;
  }
  return text[locale as Locale] || text.es;
}

export function formatCurrency(amount: number, currency: "MXN" | "USD" | "CAD" = "MXN"): string {
  const locale = currency === "USD" ? "en-US" : currency === "CAD" ? "en-CA" : "es-MX";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
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

const BASE_URL = "https://rutasmexico.com.mx";

export function seoAlternates(locale: string, path: string = "") {
  // FR intentionally omitted from hreflang map until translations reach parity —
  // emitting hreflang to thin/Spanish FR pages causes duplicate-content signals.
  return {
    canonical: `${BASE_URL}/${locale}${path}`,
    languages: {
      es: `${BASE_URL}/es${path}`,
      en: `${BASE_URL}/en${path}`,
      "x-default": `${BASE_URL}/es${path}`,
    },
  };
}

export function seoOpenGraph(locale: string, title: string, description: string, path: string = "", image?: string) {
  return {
    title,
    description,
    url: `${BASE_URL}/${locale}${path}`,
    siteName: "RutasMéxico",
    locale: locale === "es" ? "es_MX" : locale === "fr" ? "fr_FR" : "en_US",
    type: "website" as const,
    ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
  };
}

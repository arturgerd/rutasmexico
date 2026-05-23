import { LocalizedString, Locale } from "@/types/common";

export function localize(text: LocalizedString, locale: Locale | string): string {
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
  if (hours > 0 && mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
}

/**
 * Inline translation helper for the supported locales (es/en).
 * Usage: t3(locale, "Hola", "Hello")
 *
 * The trailing `_fr` parameter is accepted but ignored — it remains in the
 * signature so legacy callers still type-check without a sweeping refactor.
 * French was removed as a supported locale (see /fr/* → /es/* redirect in
 * next.config.mjs); any callsite still passing a third string is dead code.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function t3(locale: string, es: string, en: string, _fr?: string): string {
  if (locale === "es") return es;
  return en;
}

/**
 * Safe locale accessor for inline data objects. Falls back: locale → en → es → "".
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
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const BASE_URL = "https://rutasmexico.com.mx";

export function seoAlternates(locale: string, path: string = "") {
  return {
    canonical: `${BASE_URL}/${locale}${path}`,
    languages: {
      es: `${BASE_URL}/es${path}`,
      en: `${BASE_URL}/en${path}`,
      "x-default": `${BASE_URL}/es${path}`,
    },
  };
}

const OG_LOCALES_INDEX: Record<string, string> = { es: "es_MX", en: "en_US" };
const OG_LOCALE_VALUES = Object.values(OG_LOCALES_INDEX);

export function seoOpenGraph(locale: string, title: string, description: string, path: string = "", image?: string) {
  const ogLocale = OG_LOCALES_INDEX[locale] || "es_MX";
  const alternateLocale = OG_LOCALE_VALUES.filter((l) => l !== ogLocale);
  return {
    title,
    description,
    url: `${BASE_URL}/${locale}${path}`,
    siteName: "RutasMéxico",
    locale: ogLocale,
    alternateLocale,
    type: "website" as const,
    ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
  };
}

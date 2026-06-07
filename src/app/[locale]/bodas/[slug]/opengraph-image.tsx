import { buildLandingOg, ogSize, ogContentType, ogText } from "@/lib/og-builder";
import { getWeddingDestinationBySlug } from "@/lib/data/bodas";
import { localize } from "@/lib/utils";
import { Locale } from "@/types/common";

export const runtime = "edge";
export const revalidate = 3600;
export const contentType = ogContentType;
export const size = ogSize;
export const alt = "RutasMéxico — Bodas en México";

export default async function Image({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const dest = await getWeddingDestinationBySlug(slug);
  const name = dest ? localize(dest.name, locale as Locale) : "México";
  const venueCount = dest?.venues.length ?? 0;

  return buildLandingOg({
    emoji: "💍",
    title: ogText(locale,
      `Bodas en ${name}`,
      `Weddings in ${name}`,
      `Mariages à ${name}`
    ),
    subtitle: ogText(locale,
      `${venueCount} venues · Despedidas · Bodas LGBTIQ+ · Guía inclusiva`,
      `${venueCount} venues · Parties · LGBTIQ+ weddings · Inclusive guide`,
      `${venueCount} lieux · Enterrements · Mariages LGBTIQ+ · Guide inclusif`
    ),
    background: "linear-gradient(135deg, #da4b1a 0%, #902e1a 100%)",
    badgeText: ogText(locale, "Guía 2026", "2026 Guide", "Guide 2026"),
  });
}

import { buildLandingOg, ogSize, ogContentType, ogText } from "@/lib/og-builder";

export const runtime = "edge";
export const revalidate = 3600;
export const contentType = ogContentType;
export const size = ogSize;
export const alt = "RutasMéxico — Bodas en México";

export default async function Image({ params: { locale } }: { params: { locale: string } }) {
  return buildLandingOg({
    emoji: "💍",
    title: ogText(locale,
      "Bodas en México",
      "Weddings in Mexico",
      "Mariages au Mexique"
    ),
    subtitle: ogText(locale,
      "Venues inclusivos · Despedidas · Bodas LGBTIQ+ · Guía completa",
      "Inclusive venues · Bachelorette parties · LGBTIQ+ weddings · Complete guide",
      "Lieux inclusifs · Enterrements · Mariages LGBTIQ+ · Guide complet"
    ),
    background: "linear-gradient(135deg, #da4b1a 0%, #902e1a 100%)",
    badgeText: ogText(locale, "Guía 2026", "2026 Guide", "Guide 2026"),
  });
}

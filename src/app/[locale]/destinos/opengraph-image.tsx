import { buildLandingOg, ogSize, ogContentType, ogText } from "@/lib/og-builder";

export const runtime = "edge";
export const contentType = ogContentType;
export const size = ogSize;
export const alt = "RutasMéxico — Destinos en México";

export default async function Image({ params: { locale } }: { params: { locale: string } }) {
  return buildLandingOg({
    emoji: "🌎",
    title: ogText(locale,
      "Destinos imperdibles de México",
      "Must-visit destinations in Mexico",
      "Destinations incontournables au Mexique"
    ),
    subtitle: ogText(locale,
      "Playas, pueblos mágicos, ciudades coloniales y zonas arqueológicas",
      "Beaches, magical towns, colonial cities and archaeological sites",
      "Plages, villages magiques, villes coloniales et sites archéologiques"
    ),
    background: "linear-gradient(135deg, #e96424 0%, #b53717 100%)",
    badgeText: ogText(locale, "Guías completas", "Complete guides", "Guides complets"),
  });
}

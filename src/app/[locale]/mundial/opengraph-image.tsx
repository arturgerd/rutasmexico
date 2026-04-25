import { buildLandingOg, ogSize, ogContentType, ogText } from "@/lib/og-builder";

export const runtime = "edge";
export const contentType = ogContentType;
export const size = ogSize;
export const alt = "RutasMéxico — Mundial 2026";

export default async function Image({ params: { locale } }: { params: { locale: string } }) {
  return buildLandingOg({
    emoji: "⚽",
    title: ogText(locale,
      "Mundial FIFA 2026",
      "FIFA World Cup 2026",
      "Coupe du Monde FIFA 2026"
    ),
    subtitle: ogText(locale,
      "16 sedes · 104 partidos · Inicio 11 jun en el Estadio Azteca",
      "16 venues · 104 matches · Opens June 11 at Estadio Azteca",
      "16 stades · 104 matchs · Ouverture 11 juin au Estadio Azteca"
    ),
    background: "linear-gradient(135deg, #C8553D 0%, #1d3ad7 100%)",
    badgeText: ogText(locale, "Guía completa", "Complete guide", "Guide complet"),
  });
}

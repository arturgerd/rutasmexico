import { buildLandingOg, ogSize, ogContentType, ogText } from "@/lib/og-builder";

export const runtime = "edge";
export const revalidate = 3600;
export const contentType = ogContentType;
export const size = ogSize;
export const alt = "RutasMéxico — Guía de viaje por México";

export default async function Image({ params: { locale } }: { params: { locale: string } }) {
  return buildLandingOg({
    emoji: "🇲🇽",
    title: ogText(locale,
      "RutasMéxico",
      "RutasMéxico",
      "RutasMéxico"
    ),
    subtitle: ogText(locale,
      "Vuelos · Autobuses · Hoteles · Guías de viaje",
      "Flights · Buses · Hotels · Travel guides",
      "Vols · Bus · Hôtels · Guides de voyage"
    ),
    background: "linear-gradient(135deg, #da4b1a 0%, #742918 50%, #1e2d89 100%)",
    badgeText: ogText(locale, "La mejor guía de viaje", "The best travel guide", "Le meilleur guide de voyage"),
  });
}

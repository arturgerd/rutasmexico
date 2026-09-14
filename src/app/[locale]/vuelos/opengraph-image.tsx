import { buildLandingOg, ogSize, ogContentType, ogText } from "@/lib/og-builder";

export const runtime = "edge";
export const revalidate = 3600;
export const contentType = ogContentType;
export const size = ogSize;
export const alt = "RutasMéxico — Vuelos baratos en México";

export default async function Image({ params: { locale } }: { params: { locale: string } }) {
  return buildLandingOg({
    emoji: "✈️",
    title: ogText(locale,
      "Vuelos baratos en México",
      "Cheap flights in Mexico"
    ),
    subtitle: ogText(locale,
      "Volaris · VivaAerobus · Aeroméxico · TAR · 700+ aerolíneas",
      "Volaris · VivaAerobus · Aeromexico · TAR · 700+ airlines"
    ),
    background: "linear-gradient(135deg, #1d3ad7 0%, #1e2d89 100%)",
    badgeText: ogText(locale, "Compara precios", "Compare prices"),
  });
}

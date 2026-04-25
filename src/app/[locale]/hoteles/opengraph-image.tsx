import { buildLandingOg, ogSize, ogContentType, ogText } from "@/lib/og-builder";

export const runtime = "edge";
export const contentType = ogContentType;
export const size = ogSize;
export const alt = "RutasMéxico — Hoteles en México";

export default async function Image({ params: { locale } }: { params: { locale: string } }) {
  return buildLandingOg({
    emoji: "🏨",
    title: ogText(locale,
      "Hoteles baratos en México",
      "Cheap hotels in Mexico",
      "Hôtels pas chers au Mexique"
    ),
    subtitle: ogText(locale,
      "Cancún · CDMX · Playa del Carmen · Puerto Vallarta · Los Cabos",
      "Cancun · Mexico City · Playa del Carmen · Puerto Vallarta · Los Cabos",
      "Cancun · Mexico · Playa del Carmen · Puerto Vallarta · Los Cabos"
    ),
    background: "linear-gradient(135deg, #087f57 0%, #0d9668 100%)",
    badgeText: ogText(locale, "Compara hoteles", "Compare hotels", "Comparez les hôtels"),
  });
}

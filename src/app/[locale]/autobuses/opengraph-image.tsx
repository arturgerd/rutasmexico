import { buildLandingOg, ogSize, ogContentType, ogText } from "@/lib/og-builder";

export const runtime = "edge";
export const contentType = ogContentType;
export const size = ogSize;
export const alt = "RutasMéxico — Autobuses en México";

export default async function Image({ params: { locale } }: { params: { locale: string } }) {
  return buildLandingOg({
    emoji: "🚌",
    title: ogText(locale,
      "Autobuses baratos en México",
      "Cheap bus tickets in Mexico",
      "Billets de bus pas chers"
    ),
    subtitle: ogText(locale,
      "ADO · ETN · Primera Plus · Estrella Roja · Pullman",
      "ADO · ETN · Primera Plus · Estrella Roja · Pullman",
      "ADO · ETN · Primera Plus · Estrella Roja · Pullman"
    ),
    background: "linear-gradient(135deg, #cc8a01 0%, #864d0c 100%)",
    badgeText: ogText(locale, "30+ líneas", "30+ companies", "30+ compagnies"),
  });
}

import { buildLandingOg, ogSize, ogContentType, ogText } from "@/lib/og-builder";

export const runtime = "edge";
export const revalidate = 3600;
export const contentType = ogContentType;
export const size = ogSize;
export const alt = "RutasMéxico — Del aeropuerto de Cancún a tu hotel";

export default async function Image({ params: { locale } }: { params: { locale: string } }) {
  return buildLandingOg({
    emoji: "✈️",
    title: ogText(
      locale,
      "Del aeropuerto de Cancún a tu hotel",
      "From Cancún airport to your hotel",
      "De l'aéroport de Cancún à votre hôtel"
    ),
    subtitle: ogText(
      locale,
      "ADO · Taxi · Traslado privado · Renta de auto",
      "ADO bus · Taxi · Private transfer · Car rental",
      "Bus ADO · Taxi · Transfert privé · Location"
    ),
    background: "linear-gradient(135deg, #066948 0%, #03442e 100%)",
    badgeText: ogText(locale, "Precios verificados", "Verified prices", "Prix vérifiés"),
  });
}

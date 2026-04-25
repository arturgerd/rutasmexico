import { buildLandingOg, ogSize, ogContentType, ogText } from "@/lib/og-builder";

export const runtime = "edge";
export const contentType = ogContentType;
export const size = ogSize;
export const alt = "RutasMéxico — Rutas entre ciudades";

export default async function Image({ params: { locale } }: { params: { locale: string } }) {
  return buildLandingOg({
    emoji: "🗺️",
    title: ogText(locale,
      "Rutas entre ciudades de México",
      "Routes between Mexican cities",
      "Itinéraires entre les villes mexicaines"
    ),
    subtitle: ogText(locale,
      "Vuelos vs autobús · Tiempos · Distancias · Precios · 50+ rutas",
      "Flights vs bus · Times · Distances · Prices · 50+ routes",
      "Vols vs bus · Temps · Distances · Prix · 50+ itinéraires"
    ),
    background: "linear-gradient(135deg, #3b6cf5 0%, #1e2d89 100%)",
    badgeText: ogText(locale, "Compara opciones", "Compare options", "Comparez les options"),
  });
}

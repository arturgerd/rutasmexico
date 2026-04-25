import { ImageResponse } from "next/og";
import { getRouteBySlug } from "@/lib/data/routes";
import { getDestinationById } from "@/lib/data/destinations";
import { localize } from "@/lib/utils";
import { Locale } from "@/types/common";

export const runtime = "edge";
export const revalidate = 3600;
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = "RutasMéxico — Route card";

const MODE_LABEL: Record<string, { es: string; en: string; fr: string; icon: string }> = {
  flight: { es: "Vuelo", en: "Flight", fr: "Avion", icon: "✈" },
  bus: { es: "Autobús", en: "Bus", fr: "Bus", icon: "🚌" },
  car: { es: "Auto", en: "Car", fr: "Voiture", icon: "🚗" },
};

export default async function Image({ params }: { params: { locale: string; routeSlug: string } }) {
  const route = await getRouteBySlug(params.routeSlug);
  if (!route) return new ImageResponse(<div>Not found</div>, size);

  const [origin, dest] = await Promise.all([
    getDestinationById(route.originId),
    getDestinationById(route.destinationId),
  ]);
  if (!origin || !dest) return new ImageResponse(<div>Not found</div>, size);

  const locale = params.locale as Locale;
  const originName = localize(origin.name, locale);
  const destName = localize(dest.name, locale);

  const cheapest = [...route.options].sort((a, b) => a.priceRange.min - b.priceRange.min)[0];
  const minPrice = cheapest ? `$${cheapest.priceRange.min.toLocaleString()} ${cheapest.priceRange.currency}` : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 70,
          background: "linear-gradient(135deg, #1E3A5F 0%, #2C5784 60%, #C8553D 100%)",
          color: "white",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 600 }}>
          <span>MX</span>
          <span style={{ opacity: 0.9 }}>RutasMéxico</span>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: 30, opacity: 0.85, fontWeight: 500, display: "flex" }}>
            {params.locale === "es" ? "Cómo viajar de" : params.locale === "fr" ? "Comment voyager de" : "How to travel from"}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
              marginTop: 12,
              fontSize: 88,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            <span>{originName}</span>
            <span style={{ color: "#F4A261", fontSize: 100 }}>→</span>
            <span>{destName}</span>
          </div>

          <div style={{ display: "flex", gap: 16, marginTop: 40, fontSize: 30, fontWeight: 600 }}>
            {route.options.slice(0, 3).map((opt) => {
              const label = MODE_LABEL[opt.mode];
              const txt = label ? label[locale] || label.en : opt.mode;
              return (
                <div
                  key={opt.id}
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    padding: "14px 28px",
                    borderRadius: 999,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span>{label?.icon}</span>
                  <span>{txt}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 24, opacity: 0.8 }}>
              {params.locale === "es" ? "Desde" : params.locale === "fr" ? "Dès" : "From"}
            </div>
            <div style={{ fontSize: 56, fontWeight: 800, color: "#F4A261" }}>{minPrice}</div>
          </div>
          <div style={{ fontSize: 26, fontWeight: 600, opacity: 0.85, display: "flex" }}>rutasmexico.com.mx</div>
        </div>
      </div>
    ),
    size
  );
}

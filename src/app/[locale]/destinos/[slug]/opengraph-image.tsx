import { ImageResponse } from "next/og";
import { getDestinationBySlug } from "@/lib/data/destinations";
import { localize } from "@/lib/utils";
import { Locale } from "@/types/common";

export const runtime = "edge";
export const revalidate = 3600;
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = "RutasMéxico — Destination card";

export default async function Image({ params }: { params: { locale: string; slug: string } }) {
  const destination = await getDestinationBySlug(params.slug);
  if (!destination) {
    return new ImageResponse(<div>Not found</div>, size);
  }
  const name = localize(destination.name, params.locale as Locale);
  const state = localize(destination.state, params.locale as Locale);
  const hero = destination.heroImage;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#1E3A5F",
        }}
      >
        {hero && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero}
            alt=""
            width={1200}
            height={630}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 70,
            width: "100%",
            color: "white",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 600 }}>
            <span>MX</span>
            <span style={{ opacity: 0.9 }}>RutasMéxico</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 32, opacity: 0.85, fontWeight: 500 }}>{state}</div>
            <div
              style={{
                fontSize: 110,
                fontWeight: 800,
                lineHeight: 1.05,
                marginTop: 12,
                letterSpacing: -2,
              }}
            >
              {name}
            </div>
            <div
              style={{
                marginTop: 24,
                display: "flex",
                gap: 16,
                fontSize: 26,
                fontWeight: 600,
              }}
            >
              <div style={{ background: "#C8553D", padding: "10px 24px", borderRadius: 999, display: "flex" }}>
                Guía de viaje
              </div>
              <div style={{ background: "rgba(255,255,255,0.18)", padding: "10px 24px", borderRadius: 999, display: "flex" }}>
                rutasmexico.com.mx
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}

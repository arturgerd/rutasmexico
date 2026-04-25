import { ImageResponse } from "next/og";
import { getMundialVenueBySlug } from "@/lib/data/mundial";
import { localize, t3 } from "@/lib/utils";
import { Locale } from "@/types/common";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = "RutasMéxico — World Cup 2026 venue";

export default async function Image({ params }: { params: { locale: string; slug: string } }) {
  const venue = await getMundialVenueBySlug(params.slug);
  if (!venue) {
    return new ImageResponse(<div>Not found</div>, size);
  }
  const fullName = localize(venue.name, params.locale as Locale);
  const cityOnly = fullName.split(/\s*-\s*/)[0].trim();
  const stadiumName = venue.stadium.name;
  const hero = venue.heroImage;
  const tagline = t3(
    params.locale as Locale,
    "Mundial 2026",
    "World Cup 2026",
    "Coupe du Monde 2026"
  );
  const cta = t3(
    params.locale as Locale,
    "Guía oficial de la sede",
    "Official venue guide",
    "Guide officiel du stade"
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0B1F3A",
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
            background: "linear-gradient(180deg, rgba(11,31,58,0.45) 0%, rgba(11,31,58,0.92) 100%)",
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
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, fontWeight: 600 }}>
            <div
              style={{
                background: "#C8553D",
                padding: "8px 20px",
                borderRadius: 999,
                display: "flex",
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              {tagline}
            </div>
            <span style={{ opacity: 0.9 }}>RutasMéxico</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 36, opacity: 0.85, fontWeight: 500 }}>{stadiumName}</div>
            <div
              style={{
                fontSize: 108,
                fontWeight: 800,
                lineHeight: 1.05,
                marginTop: 12,
                letterSpacing: -2,
              }}
            >
              {cityOnly}
            </div>
            <div
              style={{
                marginTop: 28,
                display: "flex",
                gap: 16,
                fontSize: 26,
                fontWeight: 600,
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.18)",
                  padding: "10px 24px",
                  borderRadius: 999,
                  display: "flex",
                }}
              >
                {cta}
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.12)",
                  padding: "10px 24px",
                  borderRadius: 999,
                  display: "flex",
                }}
              >
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

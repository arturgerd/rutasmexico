import { ImageResponse } from "next/og";

export const runtime = "edge";

const SIZE = { width: 1200, height: 630 };

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #C8553D 0%, #E8744F 50%, #F4A261 100%)",
          padding: 80,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 80,
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "rgba(255,255,255,0.85)",
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          <span style={{ fontSize: 36 }}>MX</span>
          <span>rutasmexico.com.mx</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            color: "white",
          }}
        >
          <div
            style={{
              fontSize: 110,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              display: "flex",
            }}
          >
            <span style={{ color: "#FFFFFF" }}>Rutas</span>
            <span style={{ color: "#1E3A5F" }}>México</span>
          </div>

          <div
            style={{
              fontSize: 48,
              fontWeight: 500,
              marginTop: 28,
              maxWidth: 900,
              lineHeight: 1.2,
              color: "rgba(255,255,255,0.95)",
            }}
          >
            Tu guía para viajar por México
          </div>

          <div
            style={{
              display: "flex",
              gap: 24,
              marginTop: 48,
              fontSize: 32,
              fontWeight: 600,
              color: "white",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.18)",
                padding: "16px 32px",
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
              }}
            >
              ✈️ Vuelos
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.18)",
                padding: "16px 32px",
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
              }}
            >
              🚌 Autobuses
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.18)",
                padding: "16px 32px",
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
              }}
            >
              🏨 Hoteles
            </div>
          </div>
        </div>
      </div>
    ),
    { ...SIZE }
  );
}

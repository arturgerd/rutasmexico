import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

interface OgParams {
  emoji: string;
  title: string;
  subtitle: string;
  background: string;
  badgeBg?: string;
  badgeText?: string;
}

export function buildLandingOg({
  emoji,
  title,
  subtitle,
  background,
  badgeBg = "rgba(255,255,255,0.18)",
  badgeText,
}: OgParams) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 70,
          background,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 600 }}>
          <span style={{ fontSize: 36 }}>🇲🇽</span>
          <span style={{ opacity: 0.95 }}>RutasMéxico</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 110, lineHeight: 1, marginBottom: 14 }}>{emoji}</div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 30,
              fontWeight: 500,
              opacity: 0.9,
              maxWidth: 1000,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 26, fontWeight: 600 }}>
          {badgeText && (
            <div
              style={{
                background: badgeBg,
                padding: "10px 24px",
                borderRadius: 999,
                display: "flex",
              }}
            >
              {badgeText}
            </div>
          )}
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
    ),
    ogSize
  );
}

export function ogText(locale: string, es: string, en: string, fr: string): string {
  if (locale === "fr") return fr;
  if (locale === "en") return en;
  return es;
}

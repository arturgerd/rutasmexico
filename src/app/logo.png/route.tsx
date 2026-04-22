import { ImageResponse } from "next/og";

export const runtime = "edge";

const SIZE = { width: 512, height: 512 };

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #C8553D 0%, #E8744F 50%, #F4A261 100%)",
        }}
      >
        <div
          style={{
            fontSize: 130,
            fontWeight: 800,
            letterSpacing: -4,
            lineHeight: 1,
            display: "flex",
            color: "white",
          }}
        >
          Rutas
        </div>
        <div
          style={{
            fontSize: 130,
            fontWeight: 800,
            letterSpacing: -4,
            lineHeight: 1,
            display: "flex",
            color: "#1E3A5F",
            marginTop: 8,
          }}
        >
          México
        </div>
      </div>
    ),
    { ...SIZE }
  );
}

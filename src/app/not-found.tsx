import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: 0 }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <p style={{ fontSize: 14, letterSpacing: 2, color: "#C8553D", textTransform: "uppercase", marginBottom: 8 }}>
            404
          </p>
          <h1 style={{ fontSize: 40, marginBottom: 16 }}>Página no encontrada — Page not found</h1>
          <p style={{ fontSize: 18, color: "#555", marginBottom: 32 }}>
            La página que buscas no existe. Elige tu idioma para volver al inicio.
            <br />
            The page you are looking for does not exist. Choose your language to go home.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link href="/es" style={btn}>Español</Link>
            <Link href="/en" style={btn}>English</Link>
            <Link href="/fr" style={btn}>Français</Link>
          </div>
        </div>
      </body>
    </html>
  );
}

const btn: React.CSSProperties = {
  display: "inline-block",
  padding: "12px 24px",
  background: "#C8553D",
  color: "#fff",
  textDecoration: "none",
  borderRadius: 8,
  fontWeight: 500,
};

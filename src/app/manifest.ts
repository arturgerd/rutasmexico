import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RutasMéxico — Tu guía para viajar por México",
    short_name: "RutasMéxico",
    description:
      "Guía completa para viajar por México: vuelos, autobuses, hoteles, destinos y rutas paso a paso.",
    start_url: "/es",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#FFFFFF",
    theme_color: "#C8553D",
    lang: "es-MX",
    categories: ["travel", "navigation", "lifestyle"],
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/og-image.png", sizes: "1200x630", type: "image/png", purpose: "any" },
    ],
    shortcuts: [
      {
        name: "Destinos",
        short_name: "Destinos",
        description: "Explora destinos en México",
        url: "/es/destinos",
      },
      {
        name: "Rutas",
        short_name: "Rutas",
        description: "Guías de rutas entre ciudades",
        url: "/es/rutas",
      },
      {
        name: "Mundial 2026",
        short_name: "Mundial",
        description: "Sedes del Mundial 2026",
        url: "/es/mundial",
      },
    ],
  };
}

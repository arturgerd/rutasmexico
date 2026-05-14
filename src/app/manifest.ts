import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RutasMexico — Mexico Travel Guide",
    short_name: "RutasMexico",
    description:
      "Complete guide to travel in Mexico: flights, buses, hotels, destinations and step-by-step routes.",
    start_url: "/es",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#faf6ee",
    theme_color: "#da4b1a",
    categories: ["travel", "navigation", "lifestyle"],
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
    shortcuts: [
      {
        name: "Destinations",
        short_name: "Destinations",
        description: "Explore destinations in Mexico",
        url: "/es/destinos",
      },
      {
        name: "Routes",
        short_name: "Routes",
        description: "City-to-city route guides",
        url: "/es/rutas",
      },
      {
        name: "World Cup 2026",
        short_name: "World Cup",
        description: "2026 World Cup host cities",
        url: "/es/mundial",
      },
    ],
  };
}

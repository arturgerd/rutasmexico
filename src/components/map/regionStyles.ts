// Region visual identity — kept in a pure module (no Leaflet/browser imports)
// so it's safe to import from server components and client components that render during SSR.

export type Region = "centro" | "norte" | "sur" | "peninsula" | "pacifico" | "golfo" | "bajio";

export const REGION_STYLE: Record<Region, { emoji: string; color: string; label: { es: string; en: string } }> = {
  peninsula: { emoji: "🏖️", color: "#06b6d4", label: { es: "Península / Caribe", en: "Peninsula / Caribbean" } },
  pacifico: { emoji: "🌊", color: "#3b82f6", label: { es: "Pacífico", en: "Pacific" } },
  centro: { emoji: "🏛️", color: "#e96424", label: { es: "Centro", en: "Central" } },
  bajio: { emoji: "⛪", color: "#d97706", label: { es: "Bajío", en: "Bajío" } },
  norte: { emoji: "🌵", color: "#78716c", label: { es: "Norte", en: "North" } },
  sur: { emoji: "🌿", color: "#059669", label: { es: "Sur", en: "South" } },
  golfo: { emoji: "🐚", color: "#0891b2", label: { es: "Golfo", en: "Gulf" } },
};

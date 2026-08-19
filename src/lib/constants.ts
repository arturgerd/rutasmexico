export const MEXICO_CENTER = { lat: 23.6345, lng: -102.5528 };
export const MEXICO_ZOOM = 5;

// Encuadre por defecto del mapa de camiones urbanos: desde aquí caben a la vez
// la ciudad y los 22 km de la Zona Hotelera.
export const CANCUN_CENTER = { lat: 21.135, lng: -86.815 };
export const CANCUN_ZOOM = 12;
export const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
export const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

export const TRAVEL_MODE_ICONS: Record<string, string> = {
  flight: "✈️",
  bus: "🚌",
  car: "🚗",
};

export const TRAVEL_MODE_COLORS: Record<string, string> = {
  flight: "bg-azul-100 text-azul-700 border-azul-200",
  bus: "bg-terracotta-100 text-terracotta-700 border-terracotta-200",
  car: "bg-jade-500/10 text-jade-600 border-jade-500/20",
};

// High-quality Unsplash images for Mexican destinations
// All images are free to use (Unsplash license)

export interface DestinationImage {
  url: string;
  alt: { es: string; en: string };
  credit: string; // Unsplash photographer
}

// Main destination images mapped by destination ID
export const DESTINATION_IMAGES: Record<string, DestinationImage> = {
  cdmx: {
    url: "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=800&h=500&fit=crop&q=80",
    alt: { es: "Palacio de Bellas Artes, Ciudad de México", en: "Palace of Fine Arts, Mexico City" },
    credit: "Unsplash",
  },
  cancun: {
    url: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=800&h=500&fit=crop&q=80",
    alt: { es: "Playa de Cancún, Mar Caribe", en: "Cancun Beach, Caribbean Sea" },
    credit: "Unsplash",
  },
  oaxaca: {
    url: "https://images.unsplash.com/photo-1601282370707-5e8e5e4fba8c?w=800&h=500&fit=crop&q=80",
    alt: { es: "Centro histórico de Oaxaca", en: "Historic center of Oaxaca" },
    credit: "Unsplash",
  },
  guadalajara: {
    url: "https://images.unsplash.com/photo-1569236898747-e196507e3325?w=800&h=500&fit=crop&q=80",
    alt: { es: "Catedral de Guadalajara", en: "Guadalajara Cathedral" },
    credit: "Unsplash",
  },
  "puerto-vallarta": {
    url: "https://images.unsplash.com/photo-1580217593608-61931cebc631?w=800&h=500&fit=crop&q=80",
    alt: { es: "Malecón de Puerto Vallarta", en: "Puerto Vallarta Boardwalk" },
    credit: "Unsplash",
  },
  "los-cabos": {
    url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=500&fit=crop&q=80",
    alt: { es: "El Arco de Cabo San Lucas", en: "The Arch of Cabo San Lucas" },
    credit: "Unsplash",
  },
  merida: {
    url: "https://images.unsplash.com/photo-1600107363560-a2123cc2e662?w=800&h=500&fit=crop&q=80",
    alt: { es: "Calle colonial de Mérida", en: "Colonial street in Merida" },
    credit: "Unsplash",
  },
  "san-miguel": {
    url: "https://images.unsplash.com/photo-1610470081790-fa46df6c0927?w=800&h=500&fit=crop&q=80",
    alt: { es: "Parroquia de San Miguel de Allende", en: "San Miguel de Allende Parish" },
    credit: "Unsplash",
  },
  guanajuato: {
    url: "https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=800&h=500&fit=crop&q=80",
    alt: { es: "Casas coloridas de Guanajuato", en: "Colorful houses of Guanajuato" },
    credit: "Unsplash",
  },
  monterrey: {
    url: "https://images.unsplash.com/photo-1622752015450-48e2fc014b8a?w=800&h=500&fit=crop&q=80",
    alt: { es: "Cerro de la Silla, Monterrey", en: "Cerro de la Silla, Monterrey" },
    credit: "Unsplash",
  },
};

// Hero/background images for pages
export const PAGE_HERO_IMAGES = {
  home: "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=1920&h=800&fit=crop&q=80", // Chichen Itza
  flights: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1920&h=600&fit=crop&q=80", // Airplane view
  hotels: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920&h=600&fit=crop&q=80", // Hotel resort
  buses: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&h=600&fit=crop&q=80", // Bus travel
  destinations: "https://images.unsplash.com/photo-1547995886-6dc09384c6e6?w=1920&h=600&fit=crop&q=80", // Mexico landscape
};

// Popular destination images for hotel/flight/bus search cards
export const POPULAR_DESTINATION_IMAGES: Record<string, string> = {
  cancun: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=400&h=300&fit=crop&q=75",
  cdmx: "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=400&h=300&fit=crop&q=75",
  "playa-del-carmen": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&q=75",
  "cabo-san-lucas": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=300&fit=crop&q=75",
  "puerto-vallarta": "https://images.unsplash.com/photo-1580217593608-61931cebc631?w=400&h=300&fit=crop&q=75",
  tulum: "https://images.unsplash.com/photo-1682553064566-b2288c3e14e5?w=400&h=300&fit=crop&q=75",
  guadalajara: "https://images.unsplash.com/photo-1569236898747-e196507e3325?w=400&h=300&fit=crop&q=75",
  merida: "https://images.unsplash.com/photo-1600107363560-a2123cc2e662?w=400&h=300&fit=crop&q=75",
  oaxaca: "https://images.unsplash.com/photo-1601282370707-5e8e5e4fba8c?w=400&h=300&fit=crop&q=75",
  monterrey: "https://images.unsplash.com/photo-1622752015450-48e2fc014b8a?w=400&h=300&fit=crop&q=75",
  "san-miguel-de-allende": "https://images.unsplash.com/photo-1610470081790-fa46df6c0927?w=400&h=300&fit=crop&q=75",
  queretaro: "https://images.unsplash.com/photo-1595875708571-854a3492c245?w=400&h=300&fit=crop&q=75",
  cozumel: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&q=75",
  acapulco: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop&q=75",
  guanajuato: "https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=400&h=300&fit=crop&q=75",
  puebla: "https://images.unsplash.com/photo-1587389178902-08aff4b8e413?w=400&h=300&fit=crop&q=75",
  "riviera-maya": "https://images.unsplash.com/photo-1505881502353-a1986add3762?w=400&h=300&fit=crop&q=75",
  huatulco: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=400&h=300&fit=crop&q=75",
  "isla-mujeres": "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400&h=300&fit=crop&q=75",
  zihuatanejo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&q=75",
};

// Get destination image by ID with fallback
export function getDestinationImage(id: string): DestinationImage {
  return DESTINATION_IMAGES[id] || {
    url: "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=800&h=500&fit=crop&q=80",
    alt: { es: "Destino en México", en: "Destination in Mexico" },
    credit: "Unsplash",
  };
}

export function getPopularDestinationImage(id: string): string {
  return POPULAR_DESTINATION_IMAGES[id] ||
    "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=400&h=300&fit=crop&q=75";
}

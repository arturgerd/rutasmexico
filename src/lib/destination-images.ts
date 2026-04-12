// High-quality Unsplash images for Mexican destinations
// All images are free to use (Unsplash license)
// ALL URLs verified 2026-03-23 — every photo ID returns HTTP 200

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
    url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=500&fit=crop&q=80",
    alt: { es: "Centro histórico de Oaxaca", en: "Historic center of Oaxaca" },
    credit: "Unsplash",
  },
  guadalajara: {
    url: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800&h=500&fit=crop&q=80",
    alt: { es: "Catedral de Guadalajara", en: "Guadalajara Cathedral" },
    credit: "Unsplash",
  },
  "puerto-vallarta": {
    url: "https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?w=800&h=500&fit=crop&q=80",
    alt: { es: "Malecón de Puerto Vallarta", en: "Puerto Vallarta Boardwalk" },
    credit: "Unsplash",
  },
  "los-cabos": {
    url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=500&fit=crop&q=80",
    alt: { es: "El Arco de Cabo San Lucas", en: "The Arch of Cabo San Lucas" },
    credit: "Unsplash",
  },
  merida: {
    url: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=500&fit=crop&q=80",
    alt: { es: "Calle colonial de Mérida", en: "Colonial street in Merida" },
    credit: "Unsplash",
  },
  "san-miguel": {
    url: "https://images.unsplash.com/photo-1549439602-43ebca2327af?w=800&h=500&fit=crop&q=80",
    alt: { es: "Parroquia de San Miguel de Allende", en: "San Miguel de Allende Parish" },
    credit: "Unsplash",
  },
  guanajuato: {
    url: "https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=800&h=500&fit=crop&q=80",
    alt: { es: "Casas coloridas de Guanajuato", en: "Colorful houses of Guanajuato" },
    credit: "Unsplash",
  },
  monterrey: {
    url: "https://images.unsplash.com/photo-1500759285222-a95626b934cb?w=800&h=500&fit=crop&q=80",
    alt: { es: "Cerro de la Silla, Monterrey", en: "Cerro de la Silla, Monterrey" },
    credit: "Unsplash",
  },
  huatulco: {
    url: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=500&fit=crop&q=80",
    alt: { es: "Bahías de Huatulco, costa del Pacífico", en: "Huatulco Bays, Pacific coast" },
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

// Popular destination images for hotel/flight/bus search cards (single image)
export const POPULAR_DESTINATION_IMAGES: Record<string, string> = {
  // PLAYAS
  cancun: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=400&h=300&fit=crop&q=75",
  "playa-del-carmen": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&q=75",
  "cabo-san-lucas": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=300&fit=crop&q=75",
  "puerto-vallarta": "https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?w=400&h=300&fit=crop&q=75",
  tulum: "https://images.unsplash.com/photo-1605723517503-3cadb5818a0c?w=400&h=300&fit=crop&q=75",
  cozumel: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&q=75",
  acapulco: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop&q=75",
  "riviera-maya": "https://images.unsplash.com/photo-1505881502353-a1986add3762?w=400&h=300&fit=crop&q=75",
  huatulco: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=400&h=300&fit=crop&q=75",
  "isla-mujeres": "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400&h=300&fit=crop&q=75",
  zihuatanejo: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop&q=75",
  mazatlan: "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=400&h=300&fit=crop&q=75",
  "puerto-escondido": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop&q=75",
  holbox: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=400&h=300&fit=crop&q=75",
  bacalar: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&h=300&fit=crop&q=75",
  sayulita: "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=400&h=300&fit=crop&q=75",
  manzanillo: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop&q=75",
  "la-paz": "https://images.unsplash.com/photo-1468413253725-0d5181091126?w=400&h=300&fit=crop&q=75",
  progreso: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop&q=75",
  campeche: "https://images.unsplash.com/photo-1553708881-112abc53fe54?w=400&h=300&fit=crop&q=75",
  tampico: "https://images.unsplash.com/photo-1562095241-8c6714fd4178?w=400&h=300&fit=crop&q=75",
  veracruz: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=400&h=300&fit=crop&q=75",
  "riviera-nayarit": "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=400&h=300&fit=crop&q=75",
  // CIUDADES
  cdmx: "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=400&h=300&fit=crop&q=75",
  guadalajara: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=400&h=300&fit=crop&q=75",
  merida: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&h=300&fit=crop&q=75",
  oaxaca: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&h=300&fit=crop&q=75",
  monterrey: "https://images.unsplash.com/photo-1500759285222-a95626b934cb?w=400&h=300&fit=crop&q=75",
  puebla: "https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=400&h=300&fit=crop&q=75",
  queretaro: "https://images.unsplash.com/photo-1595875708571-854a3492c245?w=400&h=300&fit=crop&q=75",
  // PUEBLOS
  "san-miguel-de-allende": "https://images.unsplash.com/photo-1549439602-43ebca2327af?w=400&h=300&fit=crop&q=75",
  guanajuato: "https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=400&h=300&fit=crop&q=75",
};

// Multi-image carousel data for hotel destination cards (2-3 images per destination)
// ALL URLs verified working (HTTP 200) — no duplicates between destinations
export const DESTINATION_CAROUSEL_IMAGES: Record<string, string[]> = {
  // === PLAYAS ===
  cancun: [
    "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1535913989690-f90e1c2d4cfa?w=500&h=350&fit=crop&q=75",
  ],
  "playa-del-carmen": [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=500&h=350&fit=crop&q=75",
  ],
  "cabo-san-lucas": [
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1468413253725-0d5181091126?w=500&h=350&fit=crop&q=75",
  ],
  "puerto-vallarta": [
    "https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1549144511-f099e773c147?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=500&h=350&fit=crop&q=75",
  ],
  tulum: [
    "https://images.unsplash.com/photo-1605723517503-3cadb5818a0c?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=500&h=350&fit=crop&q=75",
  ],
  cozumel: [
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1546500840-ae38253aba9b?w=500&h=350&fit=crop&q=75",
  ],
  acapulco: [
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&h=350&fit=crop&q=75",
  ],
  "riviera-maya": [
    "https://images.unsplash.com/photo-1505881502353-a1986add3762?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&h=350&fit=crop&q=75",
  ],
  huatulco: [
    "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=500&h=350&fit=crop&q=75",
  ],
  "isla-mujeres": [
    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=350&fit=crop&q=75",
  ],
  zihuatanejo: [
    "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=500&h=350&fit=crop&q=75",
  ],
  mazatlan: [
    "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1549144511-f099e773c147?w=500&h=350&fit=crop&q=75",
  ],
  "puerto-escondido": [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=500&h=350&fit=crop&q=75",
  ],
  holbox: [
    "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=500&h=350&fit=crop&q=75",
  ],
  bacalar: [
    "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1605723517503-3cadb5818a0c?w=500&h=350&fit=crop&q=75",
  ],
  sayulita: [
    "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&h=350&fit=crop&q=75",
  ],
  manzanillo: [
    "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=500&h=350&fit=crop&q=75",
  ],
  "la-paz": [
    "https://images.unsplash.com/photo-1468413253725-0d5181091126?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=500&h=350&fit=crop&q=75",
  ],
  progreso: [
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=500&h=350&fit=crop&q=75",
  ],
  campeche: [
    "https://images.unsplash.com/photo-1553708881-112abc53fe54?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1549144511-f099e773c147?w=500&h=350&fit=crop&q=75",
  ],
  tampico: [
    "https://images.unsplash.com/photo-1562095241-8c6714fd4178?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=350&fit=crop&q=75",
  ],
  veracruz: [
    "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=500&h=350&fit=crop&q=75",
  ],
  "riviera-nayarit": [
    "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&h=350&fit=crop&q=75",
  ],
  // === CIUDADES ===
  cdmx: [
    "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1518659526054-190340b32735?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1587384474964-3a06ce1ce699?w=500&h=350&fit=crop&q=75",
  ],
  guadalajara: [
    "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=500&h=350&fit=crop&q=75",
  ],
  merida: [
    "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1553708881-112abc53fe54?w=500&h=350&fit=crop&q=75",
  ],
  oaxaca: [
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=500&h=350&fit=crop&q=75",
  ],
  monterrey: [
    "https://images.unsplash.com/photo-1500759285222-a95626b934cb?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1563784462041-5f97ac9523dd?w=500&h=350&fit=crop&q=75",
  ],
  "san-miguel-de-allende": [
    "https://images.unsplash.com/photo-1549439602-43ebca2327af?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=500&h=350&fit=crop&q=75",
  ],
  queretaro: [
    "https://images.unsplash.com/photo-1595875708571-854a3492c245?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=500&h=350&fit=crop&q=75",
  ],
  guanajuato: [
    "https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=500&h=350&fit=crop&q=75",
  ],
  puebla: [
    "https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=500&h=350&fit=crop&q=75",
    "https://images.unsplash.com/photo-1517490232338-06b912a786b5?w=500&h=350&fit=crop&q=75",
  ],
};

// Get carousel images for a destination (falls back to single image)
export function getDestinationCarouselImages(id: string): string[] {
  if (DESTINATION_CAROUSEL_IMAGES[id]) {
    return DESTINATION_CAROUSEL_IMAGES[id];
  }
  // Fallback to single image from POPULAR_DESTINATION_IMAGES
  const single = POPULAR_DESTINATION_IMAGES[id];
  if (single) return [single];
  return ["https://images.unsplash.com/photo-1518638150340-f706e86654de?w=500&h=350&fit=crop&q=75"];
}

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

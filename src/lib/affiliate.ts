// ============================================================
// CONFIGURACIÓN DE AFILIADOS - RutasMéxico
// ============================================================
// INSTRUCCIONES: Reemplaza los valores "TU_ID_AQUI" con tus IDs
// reales después de registrarte en cada plataforma.
// ============================================================

export const AFFILIATE_CONFIG = {
  // 1. TRAVELPAYOUTS (Vuelos + Hoteles)
  // Regístrate en: https://www.travelpayouts.com
  // Tu marker aparece en: Dashboard → Profile → Partner ID
  travelpayouts: {
    marker: "510654",
    enabled: true,
  },

  // 2. GETYOURGUIDE (Tours y actividades)
  // Regístrate en: https://partner.getyourguide.com/en-us/signup
  // 16% comisión los primeros 2 meses, luego 8%
  getYourGuide: {
    partnerId: "TU_ID_GETYOURGUIDE",
    enabled: false,
  },

  // 3. DISCOVERCARS (Renta de autos)
  // Regístrate en: https://www.discovercars.com/affiliate
  // 70% de ganancia por reserva
  discoverCars: {
    affiliateCode: "TU_ID_DISCOVERCARS",
    enabled: false,
  },

  // 4. VIATOR (Tours - Tripadvisor)
  // Regístrate en: https://partnerresources.viator.com/
  // 8% comisión
  viator: {
    partnerId: "TU_ID_VIATOR",
    enabled: false,
  },

  // 5. BOOKING.COM (Hoteles)
  // Regístrate en: https://www.booking.com/affiliate-program/v2/index.html
  // 25-40% comisión
  booking: {
    aid: "TU_AID_BOOKING",
    enabled: false,
  },

  // 6. BUSBUD (Autobuses - ADO, ETN, Primera Plus, etc.)
  // Regístrate en: https://www.busbud.com/affiliates
  // O por Impact: https://app.impact.com → busca "Busbud"
  // Comisión: hasta 5% por cada reserva de boleto de autobús
  // Cubre TODAS las líneas mexicanas: ADO, ETN, Primera Plus, etc.
  busbud: {
    affiliateId: "TU_ID_BUSBUD",
    enabled: true, // Funciona sin ID (tracking se activa al agregar ID)
  },
};

// ============================================================
// GENERADORES DE LINKS DE AFILIADO
// ============================================================

/**
 * Genera link de búsqueda de vuelos en Aviasales (Travelpayouts)
 * El usuario busca vuelos reales y tú ganas comisión por cada venta
 */
export function getFlightSearchUrl(params: {
  originIATA: string;
  destIATA: string;
  departDate: string; // YYYY-MM-DD
  returnDate?: string; // YYYY-MM-DD (opcional, solo ida si no se pone)
  passengers?: number;
  locale?: "es" | "en" | "fr";
}): string {
  const { originIATA, destIATA, departDate, returnDate, passengers = 1 } = params;
  const marker = AFFILIATE_CONFIG.travelpayouts.marker;

  // Formato de fecha para Aviasales: DDMM
  const formatDate = (d: string) => {
    const parts = d.split("-");
    return `${parts[2]}${parts[1]}`; // DD + MM
  };

  const depart = formatDate(departDate);
  const ret = returnDate ? formatDate(returnDate) : "";

  // URL de Aviasales con marker de afiliado (sin locale prefix ni currency — Aviasales redirige currency=mxn)
  const searchPath = `${originIATA}${depart}${destIATA}${ret}${passengers}`;
  return `https://www.aviasales.com/search/${searchPath}?marker=${marker}`;
}

/**
 * Genera link de búsqueda de vuelos genérico (sin fechas específicas)
 * Para mostrar el buscador general de vuelos dentro de México
 */
export function getFlightSearchGenericUrl(params: {
  originIATA?: string;
  destIATA?: string;
  locale?: "es" | "en" | "fr";
}): string {
  const { originIATA, destIATA } = params;
  const marker = AFFILIATE_CONFIG.travelpayouts.marker;

  if (originIATA && destIATA) {
    return `https://www.aviasales.com/flights/${originIATA}${destIATA}?marker=${marker}`;
  }

  return `https://www.aviasales.com/?marker=${marker}`;
}

/**
 * Genera link de búsqueda de hoteles en Hotellook (Travelpayouts)
 */
export function getHotelSearchUrl(params: {
  cityName: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  adults?: number;
  locale?: "es" | "en" | "fr";
}): string {
  const { cityName, checkIn, checkOut, adults = 2, locale = "es" } = params;
  const marker = AFFILIATE_CONFIG.travelpayouts.marker;

  return `https://search.hotellook.com/hotels?destination=${encodeURIComponent(cityName)}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&locale=${locale}&currency=MXN&marker=${marker}`;
}

/**
 * Genera link de renta de autos en DiscoverCars
 */
export function getCarRentalUrl(params: {
  pickupIATA: string;
  pickupDate: string; // YYYY-MM-DD
  returnDate: string; // YYYY-MM-DD
  locale?: "es" | "en" | "fr";
}): string {
  const { pickupIATA, pickupDate, returnDate, locale = "es" } = params;
  const code = AFFILIATE_CONFIG.discoverCars.affiliateCode;

  return `https://www.discovercars.com/mexico/search?pos=MX&lng=${locale}&loc=${pickupIATA}&doff=${pickupDate}T10:00&don=${returnDate}T10:00&currency=MXN&drv_age=30&rff=${code}`;
}

/**
 * Genera link de búsqueda de tours en GetYourGuide
 */
export function getTourSearchUrl(params: {
  cityName: string;
  locale?: "es" | "en" | "fr";
}): string {
  const { cityName, locale = "es" } = params;
  const partnerId = AFFILIATE_CONFIG.getYourGuide.partnerId;

  return `https://www.getyourguide.${locale === "es" ? "es" : locale === "fr" ? "fr" : "com"}/s/?q=${encodeURIComponent(cityName + " Mexico")}&partner_id=${partnerId}`;
}

/**
 * Genera link de hotel en Booking.com
 */
export function getBookingUrl(params: {
  cityName: string;
  checkIn: string;
  checkOut: string;
  locale?: "es" | "en" | "fr";
}): string {
  const { cityName, checkIn, checkOut, locale = "es" } = params;
  const aid = AFFILIATE_CONFIG.booking.aid;

  return `https://www.booking.com/searchresults.${locale === "es" ? "es" : locale === "fr" ? "fr" : "en-gb"}.html?ss=${encodeURIComponent(cityName + ", Mexico")}&checkin=${checkIn}&checkout=${checkOut}&aid=${aid}&no_rooms=1&group_adults=2`;
}

// ============================================================
// AUTOBUSES EN MÉXICO - LINKS DE BÚSQUEDA
// ============================================================
// Busbud compara TODAS las líneas de autobús mexicanas:
// ADO, ETN, Primera Plus, Estrella Roja, Omnibus de México, etc.
// Cuando el usuario compra un boleto, tú ganas comisión.
// ============================================================

export interface BusCompanyInfo {
  id: string;
  name: string;
  color: string;
  logo: string;
  type: "premium" | "primera" | "ejecutivo" | "económico";
  regions: string[];
  website: string;
  tagline: { es: string; en: string };
}

/**
 * Líneas de autobús mexicanas incluidas en la comparación
 */
export const MEXICAN_BUS_COMPANIES: BusCompanyInfo[] = [
  // === GRUPO ADO (Sureste) ===
  {
    id: "ado",
    name: "ADO",
    color: "#1E3A5F",
    logo: "🔵",
    type: "primera",
    regions: ["CDMX", "Cancún", "Oaxaca", "Veracruz", "Puebla", "Mérida", "Villahermosa", "Tuxtla"],
    website: "ado.com.mx",
    tagline: { es: "Sureste de México - Primera clase y GL", en: "Southeast Mexico - First class & GL" },
  },
  {
    id: "occ",
    name: "OCC",
    color: "#003366",
    logo: "🔷",
    type: "primera",
    regions: ["CDMX", "Oaxaca", "Chiapas", "Tuxtla", "Huatulco", "Puerto Escondido"],
    website: "ado.com.mx",
    tagline: { es: "Oaxaca y Chiapas - Grupo ADO", en: "Oaxaca & Chiapas - ADO Group" },
  },
  {
    id: "au",
    name: "AU (Autobuses Unidos)",
    color: "#2E8B57",
    logo: "🟩",
    type: "ejecutivo",
    regions: ["CDMX", "Puebla", "Veracruz", "Tampico", "Tuxpan", "Poza Rica"],
    website: "ado.com.mx",
    tagline: { es: "Golfo de México - Grupo ADO", en: "Gulf of Mexico - ADO Group" },
  },
  // === GRUPO ESTRELLA BLANCA (Norte/Noroeste) ===
  {
    id: "estrella-blanca",
    name: "Estrella Blanca",
    color: "#1C1C1C",
    logo: "⚪",
    type: "primera",
    regions: ["CDMX", "Monterrey", "Chihuahua", "Durango", "Mazatlán", "Cd. Juárez", "Tijuana"],
    website: "estrellablanca.com.mx",
    tagline: { es: "Norte y noroeste de México", en: "North & northwest Mexico" },
  },
  {
    id: "chihuahuenses",
    name: "Chihuahuenses",
    color: "#B22222",
    logo: "🦅",
    type: "primera",
    regions: ["CDMX", "Chihuahua", "Cd. Juárez", "Delicias", "Cuauhtémoc", "Parral"],
    website: "estrellablanca.com.mx",
    tagline: { es: "Chihuahua y norte - Grupo Estrella Blanca", en: "Chihuahua & north - Estrella Blanca Group" },
  },
  {
    id: "futura",
    name: "Futura / Futura Select",
    color: "#FF6600",
    logo: "🟠",
    type: "primera",
    regions: ["CDMX", "Monterrey", "Saltillo", "Tampico", "Nuevo Laredo", "Reynosa"],
    website: "futura.com.mx",
    tagline: { es: "Noreste - Grupo Estrella Blanca", en: "Northeast - Estrella Blanca Group" },
  },
  {
    id: "transportes-del-norte",
    name: "Transportes del Norte",
    color: "#0047AB",
    logo: "🔹",
    type: "primera",
    regions: ["CDMX", "Monterrey", "Nuevo Laredo", "Reynosa", "Matamoros", "Laredo"],
    website: "estrellablanca.com.mx",
    tagline: { es: "Frontera norte - Grupo Estrella Blanca", en: "Northern border - Estrella Blanca Group" },
  },
  {
    id: "elite",
    name: "Elite",
    color: "#4B0082",
    logo: "💎",
    type: "premium",
    regions: ["CDMX", "Tijuana", "Mexicali", "Hermosillo", "Los Mochis", "Mazatlán"],
    website: "estrellablanca.com.mx",
    tagline: { es: "Noroeste premium - Grupo Estrella Blanca", en: "Premium northwest - Estrella Blanca Group" },
  },
  // === ETN / PRIMERA PLUS (Centro/Bajío) ===
  {
    id: "etn",
    name: "ETN Turistar",
    color: "#8B0000",
    logo: "🔴",
    type: "premium",
    regions: ["CDMX", "Guadalajara", "León", "Morelia", "Aguascalientes", "SLP", "Querétaro"],
    website: "etn.com.mx",
    tagline: { es: "Servicio premium - Asientos reclinables 180°", en: "Premium service - 180° reclining seats" },
  },
  {
    id: "primera-plus",
    name: "Primera Plus",
    color: "#FFD700",
    logo: "🟡",
    type: "primera",
    regions: ["CDMX", "Guadalajara", "León", "Guanajuato", "Querétaro", "Irapuato"],
    website: "primeraplus.com.mx",
    tagline: { es: "Bajío y centro de México - Primera clase", en: "Bajio & central Mexico - First class" },
  },
  // === LÍNEAS INDEPENDIENTES ===
  {
    id: "estrella-roja",
    name: "Estrella Roja",
    color: "#CC0000",
    logo: "⭐",
    type: "ejecutivo",
    regions: ["CDMX", "Puebla", "Oaxaca", "Aeropuerto CDMX"],
    website: "estrellaroja.com.mx",
    tagline: { es: "CDMX-Puebla directo + shuttle al aeropuerto", en: "CDMX-Puebla direct + airport shuttle" },
  },
  {
    id: "pullman",
    name: "Pullman de Morelos",
    color: "#006400",
    logo: "🟢",
    type: "ejecutivo",
    regions: ["CDMX", "Cuernavaca", "Acapulco", "Taxco", "Cuautla"],
    website: "pullman.mx",
    tagline: { es: "Ruta del sol - CDMX a Acapulco", en: "Sun route - CDMX to Acapulco" },
  },
  {
    id: "odm",
    name: "Ómnibus de México",
    color: "#4169E1",
    logo: "🚌",
    type: "primera",
    regions: ["CDMX", "Chihuahua", "Durango", "Zacatecas", "Aguascalientes", "Torreón"],
    website: "odm.com.mx",
    tagline: { es: "Norte de México - Rutas largas", en: "Northern Mexico - Long routes" },
  },
  {
    id: "flecha-amarilla",
    name: "Flecha Amarilla",
    color: "#FFC300",
    logo: "➡️",
    type: "económico",
    regions: ["CDMX", "Guanajuato", "León", "Querétaro", "SLP", "Celaya"],
    website: "flechaamarilla.com.mx",
    tagline: { es: "Centro de México - Económico y frecuente", en: "Central Mexico - Affordable & frequent" },
  },
  {
    id: "estrella-de-oro",
    name: "Estrella de Oro",
    color: "#DAA520",
    logo: "🌟",
    type: "ejecutivo",
    regions: ["CDMX", "Acapulco", "Taxco", "Ixtapa", "Chilpancingo", "Zihuatanejo"],
    website: "autolineasunidas.com",
    tagline: { es: "Costa del Pacífico - Guerrero", en: "Pacific coast - Guerrero" },
  },
  {
    id: "tufesa",
    name: "Tufesa",
    color: "#E85D04",
    logo: "🧡",
    type: "primera",
    regions: ["Hermosillo", "Guadalajara", "Tijuana", "Mazatlán", "Los Mochis", "Culiacán", "Phoenix"],
    website: "tufesa.com.mx",
    tagline: { es: "Noroeste de México + rutas a USA", en: "Northwest Mexico + routes to USA" },
  },
  {
    id: "tap",
    name: "TAP (Transportes del Pacífico)",
    color: "#228B22",
    logo: "🌴",
    type: "primera",
    regions: ["Guadalajara", "Mazatlán", "Culiacán", "Los Mochis", "Tepic", "Puerto Vallarta"],
    website: "tap.com.mx",
    tagline: { es: "Costa del Pacífico - Sinaloa y Nayarit", en: "Pacific coast - Sinaloa & Nayarit" },
  },
  {
    id: "costa-line",
    name: "Costa Line",
    color: "#00CED1",
    logo: "🌊",
    type: "ejecutivo",
    regions: ["CDMX", "Acapulco", "Zihuatanejo", "Lázaro Cárdenas", "Manzanillo"],
    website: "costaline.com.mx",
    tagline: { es: "Costa del Pacífico sur", en: "South Pacific coast" },
  },
  {
    id: "transpais",
    name: "Transpais",
    color: "#FF4500",
    logo: "🔶",
    type: "primera",
    regions: ["Tampico", "Cd. Victoria", "Monterrey", "Reynosa", "Matamoros", "Veracruz"],
    website: "transpais.com.mx",
    tagline: { es: "Tamaulipas y Golfo de México", en: "Tamaulipas & Gulf of Mexico" },
  },
  {
    id: "caminante",
    name: "Caminante",
    color: "#8FBC8F",
    logo: "🚶",
    type: "económico",
    regions: ["CDMX", "Querétaro", "SLP", "Aguascalientes", "Zacatecas"],
    website: "caminante.com.mx",
    tagline: { es: "Centro-norte - Económico", en: "Central-north - Budget" },
  },
];

/**
 * Genera link de búsqueda de autobuses en Busbud
 * Busbud compara TODAS las líneas mexicanas y genera comisión por reserva.
 */
export function getBusSearchUrl(params: {
  originCity: string; // nombre de la ciudad en inglés (slug-friendly)
  destCity: string;
  departDate?: string; // YYYY-MM-DD
  locale?: "es" | "en" | "fr";
}): string {
  const { originCity, destCity, departDate, locale = "es" } = params;
  const affId = AFFILIATE_CONFIG.busbud.affiliateId;

  // Busbud URL slug format
  const slugify = (city: string) =>
    city.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  const lang = locale === "es" ? "es-mx" : locale === "fr" ? "fr" : "en";
  const originSlug = slugify(originCity);
  const destSlug = slugify(destCity);

  let url = `https://www.busbud.com/${lang}/bus-${originSlug}-${destSlug}`;

  if (departDate) {
    url += `?outbound_date=${departDate}`;
  }

  // Add affiliate tracking
  if (affId && affId !== "TU_ID_BUSBUD") {
    url += `${departDate ? "&" : "?"}aff_id=${affId}`;
  }

  return url;
}

/**
 * Genera link genérico de búsqueda de autobuses en Busbud México
 */
export function getBusSearchGenericUrl(params: {
  locale?: "es" | "en" | "fr";
}): string {
  const { locale = "es" } = params;
  const lang = locale === "es" ? "es-mx" : locale === "fr" ? "fr" : "en";
  return `https://www.busbud.com/${lang}/d/bus-tickets/mexico`;
}

// ============================================================
// AEROLÍNEAS MEXICANAS - LINKS DE COMPARACIÓN
// ============================================================
// Todas las búsquedas pasan por Aviasales/Travelpayouts.
// Cuando el usuario compra un vuelo de CUALQUIER aerolínea
// (Volaris, VivaAerobus, Aeroméxico, TAR, etc.), tú ganas comisión.
// ============================================================

export interface AirlineInfo {
  id: string;
  name: string;
  iataCode: string;
  color: string;
  logo: string;
  baseCity: string;
  type: "low-cost" | "flag-carrier" | "regional" | "charter";
}

/**
 * Aerolíneas mexicanas soportadas en la comparación
 */
export const MEXICAN_AIRLINES: AirlineInfo[] = [
  { id: "volaris", name: "Volaris", iataCode: "Y4", color: "#6B21A8", logo: "🟣", baseCity: "GDL", type: "low-cost" },
  { id: "vivaaerobus", name: "VivaAerobus", iataCode: "VB", color: "#EAB308", logo: "🟡", baseCity: "MTY", type: "low-cost" },
  { id: "aeromexico", name: "Aeroméxico", iataCode: "AM", color: "#1D4ED8", logo: "🔵", baseCity: "MEX", type: "flag-carrier" },
  { id: "aeroconnect", name: "Aeroméxico Connect", iataCode: "5D", color: "#2563EB", logo: "🔵", baseCity: "MEX", type: "regional" },
  { id: "tar", name: "TAR Aerolíneas", iataCode: "YQ", color: "#16A34A", logo: "🟢", baseCity: "QRO", type: "regional" },
  { id: "magnicharters", name: "MagniCharters", iataCode: "GMT", color: "#DC2626", logo: "🔴", baseCity: "MEX", type: "charter" },
];

/**
 * Genera link de comparación de vuelos con filtro por aerolínea.
 * Aviasales/Travelpayouts compara TODAS las aerolíneas automáticamente.
 * La comisión se gana sin importar cuál aerolínea elija el usuario.
 */
export function getAirlineComparisonUrl(params: {
  originIATA: string;
  destIATA: string;
  departDate?: string;
  returnDate?: string;
  passengers?: number;
  locale?: "es" | "en" | "fr";
}): string {
  const { originIATA, destIATA, departDate, returnDate, passengers = 1 } = params;
  const marker = AFFILIATE_CONFIG.travelpayouts.marker;

  if (departDate) {
    return getFlightSearchUrl({
      originIATA,
      destIATA,
      departDate,
      returnDate,
      passengers,
    });
  }

  // Generic comparison URL without dates
  return `https://www.aviasales.com/flights/${originIATA}${destIATA}?marker=${marker}`;
}

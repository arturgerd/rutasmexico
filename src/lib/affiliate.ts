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
    marker: "TU_MARKER_TRAVELPAYOUTS",
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
  locale?: "es" | "en";
}): string {
  const { originIATA, destIATA, departDate, returnDate, passengers = 1, locale = "es" } = params;
  const marker = AFFILIATE_CONFIG.travelpayouts.marker;

  // Formato de fecha para Aviasales: DDMM
  const formatDate = (d: string) => {
    const parts = d.split("-");
    return `${parts[2]}${parts[1]}`; // DD + MM
  };

  const depart = formatDate(departDate);
  const ret = returnDate ? formatDate(returnDate) : "";

  // URL de Aviasales con marker de afiliado
  const searchPath = `${originIATA}${depart}${destIATA}${ret}${passengers}`;
  return `https://www.aviasales.com/search/${searchPath}?marker=${marker}&locale=${locale}&currency=MXN`;
}

/**
 * Genera link de búsqueda de vuelos genérico (sin fechas específicas)
 * Para mostrar el buscador general de vuelos dentro de México
 */
export function getFlightSearchGenericUrl(params: {
  originIATA?: string;
  destIATA?: string;
  locale?: "es" | "en";
}): string {
  const { originIATA, destIATA, locale = "es" } = params;
  const marker = AFFILIATE_CONFIG.travelpayouts.marker;

  if (originIATA && destIATA) {
    return `https://www.aviasales.com/${locale === "es" ? "es" : "en"}/flights/${originIATA}${destIATA}?marker=${marker}&currency=MXN`;
  }

  return `https://www.aviasales.com/?marker=${marker}&locale=${locale}&currency=MXN`;
}

/**
 * Genera link de búsqueda de hoteles en Hotellook (Travelpayouts)
 */
export function getHotelSearchUrl(params: {
  cityName: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  adults?: number;
  locale?: "es" | "en";
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
  locale?: "es" | "en";
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
  locale?: "es" | "en";
}): string {
  const { cityName, locale = "es" } = params;
  const partnerId = AFFILIATE_CONFIG.getYourGuide.partnerId;

  return `https://www.getyourguide.${locale === "es" ? "es" : "com"}/s/?q=${encodeURIComponent(cityName + " Mexico")}&partner_id=${partnerId}`;
}

/**
 * Genera link de hotel en Booking.com
 */
export function getBookingUrl(params: {
  cityName: string;
  checkIn: string;
  checkOut: string;
  locale?: "es" | "en";
}): string {
  const { cityName, checkIn, checkOut, locale = "es" } = params;
  const aid = AFFILIATE_CONFIG.booking.aid;

  return `https://www.booking.com/searchresults.${locale === "es" ? "es" : "en-gb"}.html?ss=${encodeURIComponent(cityName + ", Mexico")}&checkin=${checkIn}&checkout=${checkOut}&aid=${aid}&no_rooms=1&group_adults=2`;
}

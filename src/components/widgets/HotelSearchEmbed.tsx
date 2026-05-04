"use client";

import { useState, useMemo, useId } from "react";
import { useLocale } from "next-intl";
import { Locale } from "@/types/common";
import { getHotelSearchUrl } from "@/lib/affiliate";
import { trackAffiliateClick } from "@/lib/analytics";
import { getDestinationCarouselImages } from "@/lib/destination-images";
import { t3, l } from "@/lib/utils";
import ImageCarousel from "@/components/ui/ImageCarousel";

interface HotelCity {
  id: string;
  name: { es: string; en: string };
  state: { es: string; en: string };
  emoji: string;
  type: "playa" | "ciudad" | "pueblo";
  priceFrom: number; // MXN per night approx
}

// Popular hotel destinations in Mexico — sorted alphabetically, with state info
const HOTEL_CITIES: HotelCity[] = [
  // === PLAYAS ===
  { id: "acapulco", name: { es: "Acapulco", en: "Acapulco" }, state: { es: "Guerrero", en: "Guerrero" }, emoji: "🌊", type: "playa", priceFrom: 700 },
  { id: "bacalar", name: { es: "Bacalar", en: "Bacalar" }, state: { es: "Quintana Roo", en: "Quintana Roo" }, emoji: "💎", type: "playa", priceFrom: 900 },
  { id: "cabo-san-lucas", name: { es: "Los Cabos", en: "Los Cabos" }, state: { es: "Baja California Sur", en: "Baja California Sur" }, emoji: "🐋", type: "playa", priceFrom: 1500 },
  { id: "campeche", name: { es: "Campeche", en: "Campeche" }, state: { es: "Campeche", en: "Campeche" }, emoji: "🏰", type: "playa", priceFrom: 600 },
  { id: "cancun", name: { es: "Cancún", en: "Cancun" }, state: { es: "Quintana Roo", en: "Quintana Roo" }, emoji: "🏖️", type: "playa", priceFrom: 1000 },
  { id: "cozumel", name: { es: "Cozumel", en: "Cozumel" }, state: { es: "Quintana Roo", en: "Quintana Roo" }, emoji: "🤿", type: "playa", priceFrom: 900 },
  { id: "holbox", name: { es: "Isla Holbox", en: "Holbox Island" }, state: { es: "Quintana Roo", en: "Quintana Roo" }, emoji: "🦩", type: "playa", priceFrom: 1200 },
  { id: "huatulco", name: { es: "Huatulco", en: "Huatulco" }, state: { es: "Oaxaca", en: "Oaxaca" }, emoji: "🏖️", type: "playa", priceFrom: 800 },
  { id: "isla-mujeres", name: { es: "Isla Mujeres", en: "Isla Mujeres" }, state: { es: "Quintana Roo", en: "Quintana Roo" }, emoji: "🏝️", type: "playa", priceFrom: 1000 },
  { id: "la-paz", name: { es: "La Paz", en: "La Paz" }, state: { es: "Baja California Sur", en: "Baja California Sur" }, emoji: "🦈", type: "playa", priceFrom: 800 },
  { id: "manzanillo", name: { es: "Manzanillo", en: "Manzanillo" }, state: { es: "Colima", en: "Colima" }, emoji: "🌅", type: "playa", priceFrom: 700 },
  { id: "mazatlan", name: { es: "Mazatlán", en: "Mazatlan" }, state: { es: "Sinaloa", en: "Sinaloa" }, emoji: "🎣", type: "playa", priceFrom: 800 },
  { id: "playa-del-carmen", name: { es: "Playa del Carmen", en: "Playa del Carmen" }, state: { es: "Quintana Roo", en: "Quintana Roo" }, emoji: "🏝️", type: "playa", priceFrom: 1000 },
  { id: "progreso", name: { es: "Progreso", en: "Progreso" }, state: { es: "Yucatán", en: "Yucatan" }, emoji: "⛵", type: "playa", priceFrom: 500 },
  { id: "puerto-escondido", name: { es: "Puerto Escondido", en: "Puerto Escondido" }, state: { es: "Oaxaca", en: "Oaxaca" }, emoji: "🏄", type: "playa", priceFrom: 600 },
  { id: "puerto-vallarta", name: { es: "Puerto Vallarta", en: "Puerto Vallarta" }, state: { es: "Jalisco", en: "Jalisco" }, emoji: "🌅", type: "playa", priceFrom: 900 },
  { id: "riviera-maya", name: { es: "Riviera Maya", en: "Riviera Maya" }, state: { es: "Quintana Roo", en: "Quintana Roo" }, emoji: "🌴", type: "playa", priceFrom: 1200 },
  { id: "riviera-nayarit", name: { es: "Riviera Nayarit", en: "Riviera Nayarit" }, state: { es: "Nayarit", en: "Nayarit" }, emoji: "🌴", type: "playa", priceFrom: 1100 },
  { id: "sayulita", name: { es: "Sayulita", en: "Sayulita" }, state: { es: "Nayarit", en: "Nayarit" }, emoji: "🏄", type: "playa", priceFrom: 800 },
  { id: "tampico", name: { es: "Tampico", en: "Tampico" }, state: { es: "Tamaulipas", en: "Tamaulipas" }, emoji: "🌊", type: "playa", priceFrom: 500 },
  { id: "tulum", name: { es: "Tulum", en: "Tulum" }, state: { es: "Quintana Roo", en: "Quintana Roo" }, emoji: "🏯", type: "playa", priceFrom: 1200 },
  { id: "veracruz", name: { es: "Veracruz", en: "Veracruz" }, state: { es: "Veracruz", en: "Veracruz" }, emoji: "⚓", type: "playa", priceFrom: 500 },
  { id: "zihuatanejo", name: { es: "Ixtapa-Zihuatanejo", en: "Ixtapa-Zihuatanejo" }, state: { es: "Guerrero", en: "Guerrero" }, emoji: "🌅", type: "playa", priceFrom: 900 },
  // === CIUDADES ===
  { id: "cdmx", name: { es: "Ciudad de México", en: "Mexico City" }, state: { es: "CDMX", en: "CDMX" }, emoji: "🏛️", type: "ciudad", priceFrom: 600 },
  { id: "guadalajara", name: { es: "Guadalajara", en: "Guadalajara" }, state: { es: "Jalisco", en: "Jalisco" }, emoji: "🌮", type: "ciudad", priceFrom: 600 },
  { id: "merida", name: { es: "Mérida", en: "Merida" }, state: { es: "Yucatán", en: "Yucatan" }, emoji: "🏛️", type: "ciudad", priceFrom: 600 },
  { id: "monterrey", name: { es: "Monterrey", en: "Monterrey" }, state: { es: "Nuevo León", en: "Nuevo Leon" }, emoji: "🏔️", type: "ciudad", priceFrom: 700 },
  { id: "oaxaca", name: { es: "Oaxaca", en: "Oaxaca" }, state: { es: "Oaxaca", en: "Oaxaca" }, emoji: "🌶️", type: "ciudad", priceFrom: 500 },
  { id: "puebla", name: { es: "Puebla", en: "Puebla" }, state: { es: "Puebla", en: "Puebla" }, emoji: "🏺", type: "ciudad", priceFrom: 500 },
  { id: "queretaro", name: { es: "Querétaro", en: "Queretaro" }, state: { es: "Querétaro", en: "Queretaro" }, emoji: "🏰", type: "ciudad", priceFrom: 600 },
  // === PUEBLOS MÁGICOS ===
  { id: "guanajuato", name: { es: "Guanajuato", en: "Guanajuato" }, state: { es: "Guanajuato", en: "Guanajuato" }, emoji: "🎨", type: "pueblo", priceFrom: 500 },
  { id: "san-miguel-de-allende", name: { es: "San Miguel de Allende", en: "San Miguel de Allende" }, state: { es: "Guanajuato", en: "Guanajuato" }, emoji: "⛪", type: "pueblo", priceFrom: 800 },
];

export default function HotelSearchEmbed() {
  const locale = useLocale() as Locale;
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [searchDone, setSearchDone] = useState(false);
  const [lastSearchUrl, setLastSearchUrl] = useState("");
  const idPrefix = useId();
  const cityId = `${idPrefix}city`;
  const inId = `${idPrefix}in`;
  const outId = `${idPrefix}out`;
  const roomsId = `${idPrefix}rooms`;

  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  const threeDaysLater = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().split("T")[0];
  }, []);

  const sortedCities = useMemo(() => {
    return [...HOTEL_CITIES].sort((a, b) =>
      l(a.name, locale).localeCompare(l(b.name, locale))
    );
  }, [locale]);

  const handleSearch = () => {
    if (!city) {
      alert(t3(locale, "Selecciona un destino", "Select a destination", "Sélectionnez une destination"));
      return;
    }

    const selectedCity = HOTEL_CITIES.find(c => c.id === city);
    if (!selectedCity) return;

    const cityName = selectedCity.name.en;
    const ci = checkIn || tomorrow;
    const co = checkOut || threeDaysLater;

    const url = getHotelSearchUrl({
      cityName,
      checkIn: ci,
      checkOut: co,
      adults: guests,
      locale,
    });

    trackAffiliateClick({ product: "hotel", network: "travelpayouts", destination: cityName });
    window.open(url, "_blank", "noopener,noreferrer");
    setLastSearchUrl(url);
    setSearchDone(true);
  };

  const handlePopularCity = (cityId: string) => {
    const selectedCity = HOTEL_CITIES.find(c => c.id === cityId);
    if (!selectedCity) return;

    const cityName = selectedCity.name.en;
    const url = getHotelSearchUrl({
      cityName,
      checkIn: checkIn || tomorrow,
      checkOut: checkOut || threeDaysLater,
      adults: guests,
      locale,
    });

    trackAffiliateClick({ product: "hotel", network: "travelpayouts", destination: cityName, partner: "popular" });
    window.open(url, "_blank", "noopener,noreferrer");
    setLastSearchUrl(url);
    setSearchDone(true);
  };

  // All beach destinations
  const beachCities = HOTEL_CITIES.filter(c => c.type === "playa");
  const cultureCities = HOTEL_CITIES.filter(c => c.type === "ciudad" || c.type === "pueblo");

  const formatPrice = (price: number) => `$${price.toLocaleString("es-MX")}`;

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <div className="bg-white rounded-2xl shadow-xl border border-arena-100 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-600 to-orange-500 px-6 py-4">
          <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
            🏨 {t3(locale, "Busca hoteles baratos en México", "Search cheap hotels in Mexico", "Recherchez des hôtels pas chers au Mexique")}
          </h2>
          <p className="text-white/80 text-sm mt-1">
            {t3(locale, "Compara precios de Booking.com, Expedia, Hotels.com, Hoteles.com y más", "Compare prices from Booking.com, Expedia, Hotels.com, Hoteles.com and more", "Comparez Booking.com, Expedia, Hotels.com, Hoteles.com et plus")}
          </p>
        </div>

        <div className="p-5 space-y-4">
          {/* City selector with optgroups */}
          <div>
            <label htmlFor={cityId} className="block text-xs font-semibold text-arena-500 mb-1">
              {t3(locale, "Destino", "Destination", "Destination")}
            </label>
            <select
              id={cityId}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
            >
              <option value="">{t3(locale, "🏨 Selecciona destino", "🏨 Select destination", "🏨 Sélectionnez une destination")}</option>
              <optgroup label={t3(locale, "🏖️ Playas", "🏖️ Beaches", "🏖️ Plages")}>
                {sortedCities.filter(c => c.type === "playa").map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.emoji} {l(c.name, locale)} — {l(c.state, locale)}
                  </option>
                ))}
              </optgroup>
              <optgroup label={t3(locale, "🏛️ Ciudades", "🏛️ Cities", "🏛️ Villes")}>
                {sortedCities.filter(c => c.type === "ciudad").map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.emoji} {l(c.name, locale)} — {l(c.state, locale)}
                  </option>
                ))}
              </optgroup>
              <optgroup label={t3(locale, "⛪ Pueblos Mágicos", "⛪ Magical Towns", "⛪ Villages magiques")}>
                {sortedCities.filter(c => c.type === "pueblo").map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.emoji} {l(c.name, locale)} — {l(c.state, locale)}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Dates and guests */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor={inId} className="block text-xs font-semibold text-arena-500 mb-1">
                {t3(locale, "Fecha de entrada", "Check-in", "Date d'arrivée")}
              </label>
              <input
                id={inId}
                type="date"
                value={checkIn || tomorrow}
                onChange={(e) => setCheckIn(e.target.value)}
                min={tomorrow}
                className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
            <div>
              <label htmlFor={outId} className="block text-xs font-semibold text-arena-500 mb-1">
                {t3(locale, "Fecha de salida", "Check-out", "Date de départ")}
              </label>
              <input
                id={outId}
                type="date"
                value={checkOut || threeDaysLater}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || tomorrow}
                className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
            <div>
              <label htmlFor={roomsId} className="block text-xs font-semibold text-arena-500 mb-1">
                {t3(locale, "Habitaciones", "Rooms", "Chambres")}
              </label>
              <select
                id={roomsId}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n} {t3(locale, n === 1 ? "habitación" : "habitaciones", n === 1 ? "room" : "rooms", n === 1 ? "chambre" : "chambres")}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl text-base font-bold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            🔍 {t3(locale, "Encuentra el hotel más barato", "Find the cheapest hotel", "Trouver l'hôtel le moins cher")}
          </button>

          {/* Comparison badge */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-arena-400 font-medium">
              {t3(locale, "Comparamos:", "We compare:", "Nous comparons :")}
            </span>
            {["Booking.com", "Expedia", "Hotels.com", "Agoda", "Hoteles.com"].map((site) => (
              <span key={site} className="px-2 py-0.5 bg-amber-50 rounded-full border border-amber-200 text-amber-700 font-medium">
                {site}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Search confirmation */}
      {searchDone && lastSearchUrl && (
        <div className="bg-white rounded-2xl shadow-xl border border-green-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <h3 className="font-display font-bold text-green-800">
                  {t3(locale, "¡Búsqueda de hoteles abierta!", "Hotel search opened!", "Recherche d'hôtels ouverte !")}
                </h3>
                <p className="text-sm text-green-600">
                  {t3(locale, "Comparando precios de hoteles en nueva pestaña", "Comparing hotel prices in new tab", "Comparaison des prix d'hôtels dans un nouvel onglet")}
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <a href={lastSearchUrl} target="_blank" rel="sponsored noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors">
                {t3(locale, "Ver resultados →", "View results →", "Voir les résultats →")}
              </a>
              <button onClick={() => setSearchDone(false)}
                className="inline-flex items-center gap-2 bg-arena-100 text-arena-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-arena-200 transition-colors">
                {t3(locale, "Nueva búsqueda", "New search", "Nouvelle recherche")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popular destinations with carousel images */}
      {!searchDone && (
        <>
          {/* Beach destinations */}
          <div>
            <h3 className="font-display font-bold text-arena-900 text-lg mb-4">
              {t3(locale, "🏖️ Hoteles en la playa", "🏖️ Beach hotels", "🏖️ Hôtels de plage")}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {beachCities.map((c) => {
                const images = getDestinationCarouselImages(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => handlePopularCity(c.id)}
                    className="relative rounded-2xl overflow-hidden group shadow-lg text-left hover:shadow-xl transition-shadow"
                  >
                    <ImageCarousel
                      images={images}
                      alt={l(c.name, locale)}
                      height="h-40 sm:h-48"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                      <p className="font-display font-bold text-white text-sm sm:text-base drop-shadow-lg group-hover:text-amber-300 transition-colors">
                        {l(c.name, locale)}
                      </p>
                      <p className="text-white/70 text-[10px] sm:text-xs">
                        {l(c.state, locale)}
                      </p>
                      <p className="text-amber-300 text-xs font-semibold mt-0.5">
                        {t3(locale, `Desde ${formatPrice(c.priceFrom)}/noche`, `From ${formatPrice(c.priceFrom)}/night`, `À partir de ${formatPrice(c.priceFrom)}/nuit`)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* City & culture destinations */}
          <div>
            <h3 className="font-display font-bold text-arena-900 text-lg mb-4">
              {t3(locale, "🏛️ Hoteles en ciudades y pueblos mágicos", "🏛️ City & magical town hotels", "🏛️ Hôtels en villes et villages magiques")}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {cultureCities.map((c) => {
                const images = getDestinationCarouselImages(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => handlePopularCity(c.id)}
                    className="relative rounded-2xl overflow-hidden group shadow-lg text-left hover:shadow-xl transition-shadow"
                  >
                    <ImageCarousel
                      images={images}
                      alt={l(c.name, locale)}
                      height="h-40 sm:h-48"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                      <p className="font-display font-bold text-white text-sm sm:text-base drop-shadow-lg group-hover:text-amber-300 transition-colors">
                        {l(c.name, locale)}
                      </p>
                      <p className="text-white/70 text-[10px] sm:text-xs">
                        {l(c.state, locale)}
                      </p>
                      <p className="text-amber-300 text-xs font-semibold mt-0.5">
                        {t3(locale, `Desde ${formatPrice(c.priceFrom)}/noche`, `From ${formatPrice(c.priceFrom)}/night`, `À partir de ${formatPrice(c.priceFrom)}/nuit`)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Locale } from "@/types/common";
import { getHotelSearchUrl } from "@/lib/affiliate";

// Popular hotel destinations in Mexico
const HOTEL_CITIES = [
  { id: "cancun", name: { es: "Cancún", en: "Cancun" }, emoji: "🏖️", type: "playa" },
  { id: "cdmx", name: { es: "Ciudad de México", en: "Mexico City" }, emoji: "🏛️", type: "ciudad" },
  { id: "playa-del-carmen", name: { es: "Playa del Carmen", en: "Playa del Carmen" }, emoji: "🏝️", type: "playa" },
  { id: "cabo-san-lucas", name: { es: "Los Cabos", en: "Los Cabos" }, emoji: "🐋", type: "playa" },
  { id: "puerto-vallarta", name: { es: "Puerto Vallarta", en: "Puerto Vallarta" }, emoji: "🌅", type: "playa" },
  { id: "tulum", name: { es: "Tulum", en: "Tulum" }, emoji: "🏯", type: "playa" },
  { id: "guadalajara", name: { es: "Guadalajara", en: "Guadalajara" }, emoji: "🌮", type: "ciudad" },
  { id: "merida", name: { es: "Mérida", en: "Merida" }, emoji: "🏛️", type: "ciudad" },
  { id: "oaxaca", name: { es: "Oaxaca", en: "Oaxaca" }, emoji: "🌶️", type: "ciudad" },
  { id: "monterrey", name: { es: "Monterrey", en: "Monterrey" }, emoji: "🏔️", type: "ciudad" },
  { id: "san-miguel-de-allende", name: { es: "San Miguel de Allende", en: "San Miguel de Allende" }, emoji: "⛪", type: "pueblo" },
  { id: "queretaro", name: { es: "Querétaro", en: "Queretaro" }, emoji: "🏰", type: "ciudad" },
  { id: "cozumel", name: { es: "Cozumel", en: "Cozumel" }, emoji: "🤿", type: "playa" },
  { id: "acapulco", name: { es: "Acapulco", en: "Acapulco" }, emoji: "🌊", type: "playa" },
  { id: "guanajuato", name: { es: "Guanajuato", en: "Guanajuato" }, emoji: "🎨", type: "pueblo" },
  { id: "puebla", name: { es: "Puebla", en: "Puebla" }, emoji: "🏺", type: "ciudad" },
  { id: "riviera-maya", name: { es: "Riviera Maya", en: "Riviera Maya" }, emoji: "🌴", type: "playa" },
  { id: "huatulco", name: { es: "Huatulco", en: "Huatulco" }, emoji: "🏖️", type: "playa" },
  { id: "isla-mujeres", name: { es: "Isla Mujeres", en: "Isla Mujeres" }, emoji: "🏝️", type: "playa" },
  { id: "zihuatanejo", name: { es: "Ixtapa-Zihuatanejo", en: "Ixtapa-Zihuatanejo" }, emoji: "🌅", type: "playa" },
];

export default function HotelSearchEmbed() {
  const locale = useLocale() as Locale;
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [searchDone, setSearchDone] = useState(false);
  const [lastSearchUrl, setLastSearchUrl] = useState("");

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
      a.name[locale].localeCompare(b.name[locale])
    );
  }, [locale]);

  const handleSearch = () => {
    if (!city) {
      alert(locale === "es" ? "Selecciona un destino" : "Select a destination");
      return;
    }

    const selectedCity = HOTEL_CITIES.find(c => c.id === city);
    if (!selectedCity) return;

    const cityName = selectedCity.name.en;
    const ci = checkIn || tomorrow;
    const co = checkOut || threeDaysLater;

    // Use Hotellook (Travelpayouts) as primary
    const url = getHotelSearchUrl({
      cityName,
      checkIn: ci,
      checkOut: co,
      adults: guests,
      locale,
    });

    window.open(url, "_blank", "noopener,noreferrer");
    setLastSearchUrl(url);
    setSearchDone(true);
  };

  const handlePopularCity = (cityId: string) => {
    const selectedCity = HOTEL_CITIES.find(c => c.id === cityId);
    if (!selectedCity) return;

    const url = getHotelSearchUrl({
      cityName: selectedCity.name.en,
      checkIn: checkIn || tomorrow,
      checkOut: checkOut || threeDaysLater,
      adults: guests,
      locale,
    });

    window.open(url, "_blank", "noopener,noreferrer");
    setLastSearchUrl(url);
    setSearchDone(true);
  };

  // Popular beach and city destinations
  const beachCities = HOTEL_CITIES.filter(c => c.type === "playa").slice(0, 6);
  const cultureCities = HOTEL_CITIES.filter(c => c.type === "ciudad" || c.type === "pueblo").slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <div className="bg-white rounded-2xl shadow-xl border border-arena-100 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-600 to-orange-500 px-6 py-4">
          <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
            🏨 {locale === "es"
              ? "Busca hoteles baratos en México"
              : "Search cheap hotels in Mexico"}
          </h2>
          <p className="text-white/80 text-sm mt-1">
            {locale === "es"
              ? "Compara precios de Booking.com, Expedia, Hotels.com, Hoteles.com y más"
              : "Compare prices from Booking.com, Expedia, Hotels.com, Hoteles.com and more"}
          </p>
        </div>

        <div className="p-5 space-y-4">
          {/* City selector */}
          <div>
            <label className="block text-xs font-semibold text-arena-500 mb-1">
              {locale === "es" ? "Destino" : "Destination"}
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
            >
              <option value="">{locale === "es" ? "🏨 Selecciona destino" : "🏨 Select destination"}</option>
              {sortedCities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.emoji} {c.name[locale]}
                </option>
              ))}
            </select>
          </div>

          {/* Dates and guests */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-arena-500 mb-1">
                {locale === "es" ? "Check-in" : "Check-in"}
              </label>
              <input
                type="date"
                value={checkIn || tomorrow}
                onChange={(e) => setCheckIn(e.target.value)}
                min={tomorrow}
                className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-arena-500 mb-1">
                {locale === "es" ? "Check-out" : "Check-out"}
              </label>
              <input
                type="date"
                value={checkOut || threeDaysLater}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || tomorrow}
                className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-arena-500 mb-1">
                {locale === "es" ? "Huéspedes" : "Guests"}
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n} {locale === "es" ? (n === 1 ? "huésped" : "huéspedes") : (n === 1 ? "guest" : "guests")}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl text-base font-bold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            🔍 {locale === "es" ? "Buscar hoteles" : "Search hotels"}
          </button>

          {/* Comparison badge */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-arena-400 font-medium">
              {locale === "es" ? "Comparamos:" : "We compare:"}
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
                  {locale === "es" ? "¡Búsqueda de hoteles abierta!" : "Hotel search opened!"}
                </h3>
                <p className="text-sm text-green-600">
                  {locale === "es"
                    ? "Comparando precios de hoteles en nueva pestaña"
                    : "Comparing hotel prices in new tab"}
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <a href={lastSearchUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors">
                {locale === "es" ? "Ver resultados →" : "View results →"}
              </a>
              <button onClick={() => setSearchDone(false)}
                className="inline-flex items-center gap-2 bg-arena-100 text-arena-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-arena-200 transition-colors">
                {locale === "es" ? "Nueva búsqueda" : "New search"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popular destinations */}
      {!searchDone && (
        <>
          {/* Beach destinations */}
          <div className="bg-white rounded-2xl shadow-lg border border-arena-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-arena-200">
              <h3 className="font-display font-bold text-arena-900">
                {locale === "es" ? "🏖️ Hoteles en la playa" : "🏖️ Beach hotels"}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
              {beachCities.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handlePopularCity(c.id)}
                  className="flex items-center gap-3 p-4 hover:bg-amber-50 transition-colors border-b border-r border-arena-100 group text-left"
                >
                  <span className="text-2xl">{c.emoji}</span>
                  <div>
                    <p className="font-semibold text-arena-900 text-sm group-hover:text-amber-700 transition-colors">
                      {c.name[locale]}
                    </p>
                    <p className="text-xs text-arena-400">
                      {locale === "es" ? "Hoteles desde $800/noche" : "Hotels from $800/night"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* City & culture destinations */}
          <div className="bg-white rounded-2xl shadow-lg border border-arena-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-arena-200">
              <h3 className="font-display font-bold text-arena-900">
                {locale === "es" ? "🏛️ Hoteles en ciudades y pueblos mágicos" : "🏛️ City & magical town hotels"}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
              {cultureCities.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handlePopularCity(c.id)}
                  className="flex items-center gap-3 p-4 hover:bg-amber-50 transition-colors border-b border-r border-arena-100 group text-left"
                >
                  <span className="text-2xl">{c.emoji}</span>
                  <div>
                    <p className="font-semibold text-arena-900 text-sm group-hover:text-amber-700 transition-colors">
                      {c.name[locale]}
                    </p>
                    <p className="text-xs text-arena-400">
                      {locale === "es" ? "Hoteles desde $600/noche" : "Hotels from $600/night"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

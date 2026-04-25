"use client";

import { useState, useMemo, useCallback, useId } from "react";
import { useLocale } from "next-intl";
import { Airport } from "@/types/airport";
import { localize, t3, l } from "@/lib/utils";
import { AFFILIATE_CONFIG } from "@/lib/affiliate";
import { trackAffiliateClick } from "@/lib/analytics";

interface AviasalesEmbedProps {
  airports: Airport[];
  defaultOrigin?: string;
  defaultDest?: string;
}

/**
 * Full embedded Aviasales flight search with results iframe.
 * Shows results from ALL airlines (Volaris, VivaAerobus, Aeroméxico, TAR, etc.)
 * Commission is earned on every booking through marker 510654.
 */
export default function AviasalesEmbed({ airports, defaultOrigin = "", defaultDest = "" }: AviasalesEmbedProps) {
  const locale = useLocale();
  const marker = AFFILIATE_CONFIG.travelpayouts.marker;

  const [origin, setOrigin] = useState(defaultOrigin);
  const [destination, setDestination] = useState(defaultDest);
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [isOneWay, setIsOneWay] = useState(false);
  const [searchUrl, setSearchUrl] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const idPrefix = useId();
  const originId = `${idPrefix}origin`;
  const destId = `${idPrefix}dest`;
  const departId = `${idPrefix}depart`;
  const returnId = `${idPrefix}return`;
  const paxId = `${idPrefix}pax`;

  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  const weekLater = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 8);
    return d.toISOString().split("T")[0];
  }, []);

  // Sort airports: popular first
  const popularCodes = ["MEX", "CUN", "GDL", "MTY", "TIJ", "SJD", "PVR", "MID"];
  const sortedAirports = useMemo(() => {
    return [...airports].sort((a, b) => {
      const aP = popularCodes.indexOf(a.iata);
      const bP = popularCodes.indexOf(b.iata);
      if (aP >= 0 && bP >= 0) return aP - bP;
      if (aP >= 0) return -1;
      if (bP >= 0) return 1;
      return localize(a.city, locale).localeCompare(localize(b.city, locale));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [airports, locale]);

  const swapAirports = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleSearch = useCallback(() => {
    if (!origin || !destination) {
      alert(t3(locale, "Selecciona origen y destino", "Select origin and destination", "Sélectionnez départ et destination"));
      return;
    }
    if (origin === destination) {
      alert(t3(locale, "Origen y destino deben ser diferentes", "Origin and destination must be different", "Le départ et la destination doivent être différents"));
      return;
    }

    // Build Aviasales search URL with marker
    const dep = departDate || tomorrow;
    const ret = isOneWay ? "" : (returnDate || weekLater);
    const formatDate = (d: string) => {
      const parts = d.split("-");
      return `${parts[2]}${parts[1]}`;
    };

    const searchPath = `${origin}${formatDate(dep)}${destination}${ret ? formatDate(ret) : ""}${passengers}`;
    const url = `https://www.aviasales.com/search/${searchPath}?marker=${marker}`;

    trackAffiliateClick({
      product: "flight",
      network: "aviasales",
      origin,
      destination,
    });

    // Open in new tab (Aviasales blocks iframes)
    window.open(url, "_blank", "noopener,noreferrer");
    setSearchUrl(url);
    setIsSearching(true);
  }, [origin, destination, departDate, returnDate, isOneWay, passengers, locale, marker, tomorrow, weekLater]);

  const originAirport = airports.find(a => a.iata === origin);
  const destAirport = airports.find(a => a.iata === destination);

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <div className="bg-white rounded-2xl shadow-xl border border-arena-100 overflow-hidden">
        <div className="bg-gradient-to-r from-azul-700 to-terracotta-500 px-6 py-4">
          <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
            ✈️ {t3(locale, "Busca vuelos baratos en todas las aerolíneas", "Search cheap flights across all airlines", "Recherchez des vols pas chers sur toutes les compagnies")}
          </h2>
          <p className="text-white/80 text-sm mt-1">
            {t3(locale, "Volaris • VivaAerobus • Aeroméxico • TAR • MagniCharters • y más", "Volaris • VivaAerobus • Aeromexico • TAR • MagniCharters • and more", "Volaris • VivaAerobus • Aeroméxico • TAR • MagniCharters • et plus")}
          </p>
        </div>

        <div className="p-5 space-y-4">
          {/* Trip type */}
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={!isOneWay}
                onChange={() => setIsOneWay(false)}
                className="text-terracotta-500 focus:ring-terracotta-500"
              />
              <span className="text-sm text-arena-700">{t3(locale, "Ida y vuelta", "Round trip", "Aller-retour")}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={isOneWay}
                onChange={() => setIsOneWay(true)}
                className="text-terracotta-500 focus:ring-terracotta-500"
              />
              <span className="text-sm text-arena-700">{t3(locale, "Solo ida", "One way", "Aller simple")}</span>
            </label>
          </div>

          {/* Airports */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-end">
            <div>
              <label htmlFor={originId} className="block text-xs font-semibold text-arena-500 mb-1">
                {t3(locale, "Origen", "Origin", "Origine")}
              </label>
              <select
                id={originId}
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50 focus:border-terracotta-500"
              >
                <option value="">{t3(locale, "✈️ Selecciona aeropuerto", "✈️ Select airport", "✈️ Sélectionnez un aéroport")}</option>
                {sortedAirports.map((a) => (
                  <option key={a.iata} value={a.iata}>
                    {a.iata} - {localize(a.city, locale)} ({localize(a.state, locale)})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={swapAirports}
              aria-label={t3(locale, "Intercambiar origen y destino", "Swap origin and destination", "Échanger origine et destination")}
              className="hidden md:flex w-10 h-10 rounded-full bg-arena-100 hover:bg-terracotta-100 items-center justify-center transition-colors mb-0.5"
              title={t3(locale, "Intercambiar", "Swap", "Échanger")}
            >
              <svg className="w-5 h-5 text-arena-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>

            <div>
              <label htmlFor={destId} className="block text-xs font-semibold text-arena-500 mb-1">
                {t3(locale, "Destino", "Destination", "Destination")}
              </label>
              <select
                id={destId}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50 focus:border-terracotta-500"
              >
                <option value="">{t3(locale, "🛬 Selecciona aeropuerto", "🛬 Select airport", "🛬 Sélectionnez un aéroport")}</option>
                {sortedAirports.map((a) => (
                  <option key={a.iata} value={a.iata}>
                    {a.iata} - {localize(a.city, locale)} ({localize(a.state, locale)})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dates and passengers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label htmlFor={departId} className="block text-xs font-semibold text-arena-500 mb-1">
                {t3(locale, "Fecha de ida", "Departure date", "Date de départ")}
              </label>
              <input
                id={departId}
                type="date"
                value={departDate || tomorrow}
                onChange={(e) => setDepartDate(e.target.value)}
                min={tomorrow}
                className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50"
              />
            </div>

            {!isOneWay && (
              <div>
                <label htmlFor={returnId} className="block text-xs font-semibold text-arena-500 mb-1">
                  {t3(locale, "Fecha de regreso", "Return date", "Date de retour")}
                </label>
                <input
                  id={returnId}
                  type="date"
                  value={returnDate || weekLater}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={departDate || tomorrow}
                  className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50"
                />
              </div>
            )}

            <div>
              <label htmlFor={paxId} className="block text-xs font-semibold text-arena-500 mb-1">
                {t3(locale, "Pasajeros", "Passengers", "Passagers")}
              </label>
              <select
                id={paxId}
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} {locale === "es" ? (n === 1 ? "pasajero" : "pasajeros") : locale === "fr" ? (n === 1 ? "passager" : "passagers") : (n === 1 ? "passenger" : "passengers")}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white py-3 rounded-xl text-base font-bold hover:from-terracotta-600 hover:to-terracotta-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                🔍 {t3(locale, "Buscar vuelos", "Search flights", "Rechercher des vols")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search confirmation - after search opens in new tab */}
      {isSearching && searchUrl && (
        <div className="bg-white rounded-2xl shadow-xl border border-green-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                ✅
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-green-800 text-lg">
                  {t3(locale, "¡Búsqueda abierta!", "Search opened!", "Recherche lancée !")}
                </h3>
                <p className="text-sm text-green-700 mt-1">
                  {originAirport && destAirport
                    ? t3(locale,
                      `Comparando vuelos ${localize(originAirport.city, locale)} → ${localize(destAirport.city, locale)} en una nueva pestaña`,
                      `Comparing flights ${localize(originAirport.city, locale)} → ${localize(destAirport.city, locale)} in a new tab`,
                      `Comparaison des vols ${localize(originAirport.city, locale)} → ${localize(destAirport.city, locale)} dans un nouvel onglet`)
                    : `${origin} → ${destination}`}
                </p>

                {/* Airlines being compared */}
                <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                  <span className="text-green-600 font-medium">
                    {t3(locale, "Comparando:", "Comparing:", "Nous comparons :")}
                  </span>
                  {["Volaris", "VivaAerobus", "Aeroméxico", "TAR", "MagniCharters"].map((airline) => (
                    <span key={airline} className="px-2 py-0.5 bg-white rounded-full border border-green-200 text-green-700 font-medium">
                      {airline}
                    </span>
                  ))}
                  <span className="text-green-500">
                    {t3(locale, "+700 aerolíneas", "+700 airlines", "+700 compagnies")}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 mt-4">
                  <a
                    href={searchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors"
                  >
                    {t3(locale, "Ver resultados →", "View results →", "Voir les résultats →")}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <button
                    onClick={() => setIsSearching(false)}
                    className="inline-flex items-center gap-2 bg-arena-100 text-arena-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-arena-200 transition-colors"
                  >
                    {t3(locale, "Nueva búsqueda", "New search", "Nouvelle recherche")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popular Routes Quick Search */}
      {!isSearching && (
        <div className="bg-white rounded-2xl shadow-lg border border-arena-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-arena-200">
            <h3 className="font-display font-bold text-arena-900">
              {t3(locale, "🔥 Rutas populares", "🔥 Popular routes", "🔥 Itinéraires populaires")}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {POPULAR_ROUTES.map((route, i) => (
              <button
                key={i}
                onClick={() => {
                  setOrigin(route.origin);
                  setDestination(route.dest);
                  // Trigger search immediately
                  const dep = departDate || tomorrow;
                  const ret = isOneWay ? "" : (returnDate || weekLater);
                  const formatDate = (d: string) => {
                    const parts = d.split("-");
                    return `${parts[2]}${parts[1]}`;
                  };
                  const searchPath = `${route.origin}${formatDate(dep)}${route.dest}${ret ? formatDate(ret) : ""}${passengers}`;
                  const url = `https://www.aviasales.com/search/${searchPath}?marker=${marker}`;
                  trackAffiliateClick({
                    product: "flight",
                    network: "aviasales",
                    origin: route.origin,
                    destination: route.dest,
                    partner: "popular",
                  });
                  window.open(url, "_blank", "noopener,noreferrer");
                  setSearchUrl(url);
                  setIsSearching(true);
                }}
                className="flex items-center justify-between p-4 hover:bg-terracotta-50 transition-colors border-b border-r border-arena-100 group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{route.emoji}</span>
                  <div className="text-left">
                    <p className="font-semibold text-arena-900 text-sm group-hover:text-terracotta-600 transition-colors">
                      {route.origin} → {route.dest}
                    </p>
                    <p className="text-xs text-arena-400">{l(route.label, locale)}</p>
                  </div>
                </div>
                <span className="text-xs text-terracotta-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  {t3(locale, "Buscar →", "Search →", "Rechercher →")}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const POPULAR_ROUTES = [
  { origin: "MEX", dest: "CUN", emoji: "🏖️", label: { es: "CDMX → Cancún", en: "Mexico City → Cancun" } },
  { origin: "MEX", dest: "GDL", emoji: "🌮", label: { es: "CDMX → Guadalajara", en: "Mexico City → Guadalajara" } },
  { origin: "MEX", dest: "MTY", emoji: "🏔️", label: { es: "CDMX → Monterrey", en: "Mexico City → Monterrey" } },
  { origin: "GDL", dest: "CUN", emoji: "✈️", label: { es: "Guadalajara → Cancún", en: "Guadalajara → Cancun" } },
  { origin: "MEX", dest: "TIJ", emoji: "🌉", label: { es: "CDMX → Tijuana", en: "Mexico City → Tijuana" } },
  { origin: "MEX", dest: "SJD", emoji: "🐋", label: { es: "CDMX → Los Cabos", en: "Mexico City → Los Cabos" } },
  { origin: "MTY", dest: "CUN", emoji: "🌴", label: { es: "Monterrey → Cancún", en: "Monterrey → Cancun" } },
  { origin: "MEX", dest: "MID", emoji: "🏛️", label: { es: "CDMX → Mérida", en: "Mexico City → Merida" } },
  { origin: "MEX", dest: "PVR", emoji: "🌅", label: { es: "CDMX → Puerto Vallarta", en: "Mexico City → Puerto Vallarta" } },
];

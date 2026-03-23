"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Locale } from "@/types/common";
import { getBusSearchUrl } from "@/lib/affiliate";

// Mexican cities with bus terminals
const BUS_CITIES = [
  { id: "cdmx", slug: "ciudad-de-mexico", name: { es: "Ciudad de México", en: "Mexico City" }, terminals: ["TAPO", "Norte", "Sur", "Poniente"] },
  { id: "cancun", slug: "cancun", name: { es: "Cancún", en: "Cancun" }, terminals: ["ADO Cancún"] },
  { id: "guadalajara", slug: "guadalajara", name: { es: "Guadalajara", en: "Guadalajara" }, terminals: ["Nueva Central", "Antigua Central"] },
  { id: "monterrey", slug: "monterrey", name: { es: "Monterrey", en: "Monterrey" }, terminals: ["Central Monterrey"] },
  { id: "puebla", slug: "puebla", name: { es: "Puebla", en: "Puebla" }, terminals: ["CAPU"] },
  { id: "oaxaca", slug: "oaxaca", name: { es: "Oaxaca", en: "Oaxaca" }, terminals: ["Central de Oaxaca", "ADO Oaxaca"] },
  { id: "merida", slug: "merida", name: { es: "Mérida", en: "Merida" }, terminals: ["CAME", "Terminal Noreste"] },
  { id: "veracruz", slug: "veracruz", name: { es: "Veracruz", en: "Veracruz" }, terminals: ["ADO Veracruz"] },
  { id: "queretaro", slug: "queretaro", name: { es: "Querétaro", en: "Queretaro" }, terminals: ["Central Querétaro"] },
  { id: "slp", slug: "san-luis-potosi", name: { es: "San Luis Potosí", en: "San Luis Potosi" }, terminals: ["Central SLP"] },
  { id: "morelia", slug: "morelia", name: { es: "Morelia", en: "Morelia" }, terminals: ["Central Morelia"] },
  { id: "leon", slug: "leon", name: { es: "León", en: "Leon" }, terminals: ["Central León"] },
  { id: "guanajuato", slug: "guanajuato", name: { es: "Guanajuato", en: "Guanajuato" }, terminals: ["Central Guanajuato"] },
  { id: "aguascalientes", slug: "aguascalientes", name: { es: "Aguascalientes", en: "Aguascalientes" }, terminals: ["Central Aguascalientes"] },
  { id: "cuernavaca", slug: "cuernavaca", name: { es: "Cuernavaca", en: "Cuernavaca" }, terminals: ["Casino de la Selva", "Pullman"] },
  { id: "acapulco", slug: "acapulco", name: { es: "Acapulco", en: "Acapulco" }, terminals: ["Central Ejido", "Estrella de Oro"] },
  { id: "playa-del-carmen", slug: "playa-del-carmen", name: { es: "Playa del Carmen", en: "Playa del Carmen" }, terminals: ["ADO Playa"] },
  { id: "villahermosa", slug: "villahermosa", name: { es: "Villahermosa", en: "Villahermosa" }, terminals: ["ADO Villahermosa"] },
  { id: "chihuahua", slug: "chihuahua", name: { es: "Chihuahua", en: "Chihuahua" }, terminals: ["Central Chihuahua"] },
  { id: "tijuana", slug: "tijuana", name: { es: "Tijuana", en: "Tijuana" }, terminals: ["Central Tijuana"] },
  { id: "tuxtla", slug: "tuxtla-gutierrez", name: { es: "Tuxtla Gutiérrez", en: "Tuxtla Gutierrez" }, terminals: ["ADO Tuxtla"] },
  { id: "san-cristobal", slug: "san-cristobal-de-las-casas", name: { es: "San Cristóbal de las Casas", en: "San Cristobal de las Casas" }, terminals: ["OCC San Cristóbal"] },
  { id: "puerto-vallarta", slug: "puerto-vallarta", name: { es: "Puerto Vallarta", en: "Puerto Vallarta" }, terminals: ["Central PV"] },
  { id: "zacatecas", slug: "zacatecas", name: { es: "Zacatecas", en: "Zacatecas" }, terminals: ["Central Zacatecas"] },
];

// Popular bus routes
const POPULAR_BUS_ROUTES = [
  { origin: "cdmx", dest: "puebla", emoji: "🏛️", duration: "2h", price: "$200-350" },
  { origin: "cdmx", dest: "queretaro", emoji: "⛪", duration: "3h", price: "$350-550" },
  { origin: "cdmx", dest: "oaxaca", emoji: "🌶️", duration: "6h", price: "$500-800" },
  { origin: "cdmx", dest: "guadalajara", emoji: "🌮", duration: "7h", price: "$600-1000" },
  { origin: "cdmx", dest: "cancun", emoji: "🏖️", duration: "20-24h", price: "$1200-1800" },
  { origin: "cdmx", dest: "cuernavaca", emoji: "🌺", duration: "1.5h", price: "$150-250" },
  { origin: "cdmx", dest: "veracruz", emoji: "⚓", duration: "5h", price: "$400-650" },
  { origin: "cdmx", dest: "merida", emoji: "🏯", duration: "18-20h", price: "$1000-1500" },
  { origin: "cancun", dest: "playa-del-carmen", emoji: "🏝️", duration: "1h", price: "$80-150" },
  { origin: "guadalajara", dest: "puerto-vallarta", emoji: "🌅", duration: "5h", price: "$400-600" },
  { origin: "cdmx", dest: "acapulco", emoji: "🏖️", duration: "5h", price: "$400-650" },
  { origin: "cdmx", dest: "monterrey", emoji: "🏔️", duration: "12h", price: "$800-1300" },
];

export default function BusSearchEmbed() {
  const locale = useLocale() as Locale;
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departDate, setDepartDate] = useState("");

  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  const sortedCities = useMemo(() => {
    return [...BUS_CITIES].sort((a, b) =>
      a.name[locale].localeCompare(b.name[locale])
    );
  }, [locale]);

  const handleSearch = () => {
    if (!origin || !destination) {
      alert(locale === "es" ? "Selecciona origen y destino" : "Select origin and destination");
      return;
    }
    if (origin === destination) {
      alert(locale === "es" ? "Origen y destino deben ser diferentes" : "Origin and destination must be different");
      return;
    }

    const originCity = BUS_CITIES.find(c => c.id === origin);
    const destCity = BUS_CITIES.find(c => c.id === destination);
    if (!originCity || !destCity) return;

    const url = getBusSearchUrl({
      originCity: originCity.name.en,
      destCity: destCity.name.en,
      departDate: departDate || tomorrow,
      locale,
    });

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handlePopularRoute = (originId: string, destId: string) => {
    const originCity = BUS_CITIES.find(c => c.id === originId);
    const destCity = BUS_CITIES.find(c => c.id === destId);
    if (!originCity || !destCity) return;

    const url = getBusSearchUrl({
      originCity: originCity.name.en,
      destCity: destCity.name.en,
      departDate: departDate || tomorrow,
      locale,
    });

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const swapCities = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <div className="bg-white rounded-2xl shadow-xl border border-arena-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 px-6 py-4">
          <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
            🚌 {locale === "es"
              ? "Busca boletos de autobús baratos"
              : "Search cheap bus tickets"}
          </h2>
          <p className="text-white/80 text-sm mt-1">
            {locale === "es"
              ? "ADO • ETN • Primera Plus • Estrella Roja • Pullman • Ómnibus de México • y más"
              : "ADO • ETN • Primera Plus • Estrella Roja • Pullman • Omnibus de Mexico • and more"}
          </p>
        </div>

        <div className="p-5 space-y-4">
          {/* Cities */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-end">
            <div>
              <label className="block text-xs font-semibold text-arena-500 mb-1">
                {locale === "es" ? "Ciudad de origen" : "Origin city"}
              </label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
              >
                <option value="">{locale === "es" ? "🚌 Selecciona ciudad" : "🚌 Select city"}</option>
                {sortedCities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name[locale]}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={swapCities}
              className="hidden md:flex w-10 h-10 rounded-full bg-arena-100 hover:bg-blue-100 items-center justify-center transition-colors mb-0.5"
              title={locale === "es" ? "Intercambiar" : "Swap"}
            >
              <svg className="w-5 h-5 text-arena-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>

            <div>
              <label className="block text-xs font-semibold text-arena-500 mb-1">
                {locale === "es" ? "Ciudad de destino" : "Destination city"}
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
              >
                <option value="">{locale === "es" ? "🛬 Selecciona ciudad" : "🛬 Select city"}</option>
                {sortedCities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name[locale]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date and Search */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-arena-500 mb-1">
                {locale === "es" ? "Fecha de salida" : "Departure date"}
              </label>
              <input
                type="date"
                value={departDate || tomorrow}
                onChange={(e) => setDepartDate(e.target.value)}
                min={tomorrow}
                className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-blue-700 to-blue-600 text-white py-3 rounded-xl text-base font-bold hover:from-blue-800 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                🚌 {locale === "es" ? "Buscar autobuses" : "Search buses"}
              </button>
            </div>
          </div>

          {/* Bus lines badge */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-arena-400 font-medium">
              {locale === "es" ? "Comparamos:" : "We compare:"}
            </span>
            {["ADO", "ETN", "Primera Plus", "Estrella Roja", "Pullman", "Ómnibus"].map((line) => (
              <span key={line} className="px-2 py-0.5 bg-blue-50 rounded-full border border-blue-200 text-blue-700 font-medium">
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Popular bus routes */}
      <div className="bg-white rounded-2xl shadow-lg border border-arena-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-arena-200">
          <h3 className="font-display font-bold text-arena-900">
            {locale === "es" ? "🔥 Rutas de autobús populares" : "🔥 Popular bus routes"}
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
          {POPULAR_BUS_ROUTES.map((route, i) => {
            const originCity = BUS_CITIES.find(c => c.id === route.origin);
            const destCity = BUS_CITIES.find(c => c.id === route.dest);
            return (
              <button
                key={i}
                onClick={() => handlePopularRoute(route.origin, route.dest)}
                className="flex items-center justify-between p-4 hover:bg-blue-50 transition-colors border-b border-r border-arena-100 group text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{route.emoji}</span>
                  <div>
                    <p className="font-semibold text-arena-900 text-sm group-hover:text-blue-700 transition-colors">
                      {originCity?.name[locale]} → {destCity?.name[locale]}
                    </p>
                    <p className="text-xs text-arena-400">
                      ~{route.duration} • {route.price} MXN
                    </p>
                  </div>
                </div>
                <span className="text-xs text-blue-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {locale === "es" ? "Buscar →" : "Search →"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useLocale } from "next-intl";
import { Locale } from "@/types/common";
import { getFlightSearchUrl, getFlightSearchGenericUrl } from "@/lib/affiliate";
import { trackAffiliateClick } from "@/lib/analytics";

// Mexican airlines data with brand colors
const MEXICAN_AIRLINES = [
  {
    id: "volaris",
    name: "Volaris",
    logo: "🟣",
    color: "from-purple-600 to-purple-700",
    bgLight: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700",
    tagline: { es: "Ultra bajo costo", en: "Ultra low cost" },
    hubs: ["MEX", "GDL", "TIJ"],
    website: "volaris.com",
  },
  {
    id: "vivaaerobus",
    name: "VivaAerobus",
    logo: "🟡",
    color: "from-yellow-500 to-yellow-600",
    bgLight: "bg-yellow-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-700",
    tagline: { es: "Bajo costo mexicana", en: "Mexican low cost" },
    hubs: ["MTY", "MEX", "CUN"],
    website: "vivaaerobus.com",
  },
  {
    id: "aeromexico",
    name: "Aeroméxico",
    logo: "🔵",
    color: "from-blue-700 to-blue-800",
    bgLight: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    tagline: { es: "Aerolínea bandera de México", en: "Mexico's flag carrier" },
    hubs: ["MEX", "GDL", "MTY"],
    website: "aeromexico.com",
  },
  {
    id: "tar",
    name: "TAR Aerolíneas",
    logo: "🟢",
    color: "from-green-600 to-green-700",
    bgLight: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    tagline: { es: "Conectando ciudades medianas", en: "Connecting mid-size cities" },
    hubs: ["QRO", "AGU", "GDL"],
    website: "tarmexico.com",
  },
  {
    id: "magnicharters",
    name: "MagniCharters",
    logo: "🔴",
    color: "from-red-600 to-red-700",
    bgLight: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    tagline: { es: "Vuelos chárter nacionales", en: "National charter flights" },
    hubs: ["MEX", "GDL"],
    website: "magnicharters.com",
  },
  {
    id: "aeromar",
    name: "Aeromar / Aerus",
    logo: "🟠",
    color: "from-orange-500 to-orange-600",
    bgLight: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
    tagline: { es: "Rutas regionales", en: "Regional routes" },
    hubs: ["MEX", "OAX", "MID"],
    website: "aerus.mx",
  },
];

interface AirlineGridProps {
  originIATA?: string;
  destIATA?: string;
  compact?: boolean;
  showTitle?: boolean;
}

export default function AirlineGrid({ originIATA, destIATA, compact = false, showTitle = true }: AirlineGridProps) {
  const locale = useLocale() as Locale;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleAirlineSearch = (airlineId?: string) => {
    // All searches go through Aviasales/Travelpayouts which compares all airlines
    // The user earns commission regardless of which airline they book
    let url: string;

    if (originIATA && destIATA) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split("T")[0];
      const weekLater = new Date();
      weekLater.setDate(weekLater.getDate() + 8);
      const weekStr = weekLater.toISOString().split("T")[0];

      url = getFlightSearchUrl({
        originIATA,
        destIATA,
        departDate: tomorrowStr,
        returnDate: weekStr,
        locale,
      });
    } else {
      url = getFlightSearchGenericUrl({ locale });
    }

    trackAffiliateClick({
      product: "flight",
      network: "travelpayouts",
      partner: airlineId,
      origin: originIATA,
      destination: destIATA,
    });

    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (compact) {
    return (
      <div className="space-y-3">
        {showTitle && (
          <h3 className="font-display font-bold text-arena-900 text-sm">
            {locale === "es" ? "Aerolíneas que comparamos:" : "Airlines we compare:"}
          </h3>
        )}
        <div className="flex flex-wrap gap-2">
          {MEXICAN_AIRLINES.map((airline) => (
            <button
              key={airline.id}
              onClick={() => handleAirlineSearch(airline.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all hover:shadow-md hover:scale-105 ${airline.bgLight} ${airline.borderColor} ${airline.textColor}`}
            >
              <span>{airline.logo}</span>
              <span>{airline.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showTitle && (
        <div className="text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-arena-900 mb-2">
            {locale === "es"
              ? "Compara todas las aerolíneas mexicanas"
              : "Compare all Mexican airlines"}
          </h2>
          <p className="text-arena-500 text-sm md:text-base max-w-2xl mx-auto">
            {locale === "es"
              ? "Encuentra el vuelo más barato comparando precios de Volaris, VivaAerobus, Aeroméxico, TAR y más aerolíneas en un solo lugar"
              : "Find the cheapest flight comparing prices from Volaris, VivaAerobus, Aeromexico, TAR and more airlines in one place"}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MEXICAN_AIRLINES.map((airline) => (
          <button
            key={airline.id}
            onClick={() => handleAirlineSearch(airline.id)}
            className="group relative bg-white rounded-2xl border-2 border-arena-100 p-5 text-left transition-all hover:border-terracotta-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Airline header */}
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${airline.color} flex items-center justify-center text-2xl shadow-lg`}>
                {airline.logo}
              </div>
              <div>
                <h3 className="font-display font-bold text-arena-900 group-hover:text-terracotta-600 transition-colors">
                  {airline.name}
                </h3>
                <p className="text-xs text-arena-400">
                  {airline.tagline[locale]}
                </p>
              </div>
            </div>

            {/* Hubs */}
            <div className="flex items-center gap-1 mb-3">
              <span className="text-xs text-arena-400">
                {locale === "es" ? "Hubs:" : "Hubs:"}
              </span>
              <div className="flex gap-1">
                {airline.hubs.map((hub) => (
                  <span key={hub} className={`text-xs px-1.5 py-0.5 rounded ${airline.bgLight} ${airline.textColor} font-mono font-semibold`}>
                    {hub}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className={`text-center py-2.5 rounded-xl text-sm font-semibold transition-all bg-gradient-to-r ${airline.color} text-white opacity-80 group-hover:opacity-100 shadow-md`}>
              {locale === "es" ? "Comparar precios →" : "Compare prices →"}
            </div>
          </button>
        ))}
      </div>

      {/* Trust badge */}
      <div className="flex items-center justify-center gap-2 text-sm text-arena-400 bg-arena-50 rounded-xl py-3 px-4">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        {locale === "es"
          ? "Búsqueda segura y gratuita • Compara +700 aerolíneas en tiempo real"
          : "Safe and free search • Compare 700+ airlines in real time"}
      </div>
    </div>
  );
}

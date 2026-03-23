"use client";

import { useLocale } from "next-intl";
import { Locale } from "@/types/common";
import { MEXICAN_BUS_COMPANIES, getBusSearchGenericUrl } from "@/lib/affiliate";

interface BusCompanyGridProps {
  compact?: boolean;
}

export default function BusCompanyGrid({ compact = false }: BusCompanyGridProps) {
  const locale = useLocale() as Locale;

  const handleBusSearch = () => {
    const url = getBusSearchGenericUrl({ locale });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (compact) {
    return (
      <div className="space-y-3">
        <h3 className="font-display font-bold text-arena-900 text-sm">
          {locale === "es" ? "Líneas de autobús que comparamos:" : "Bus lines we compare:"}
        </h3>
        <div className="flex flex-wrap gap-2">
          {MEXICAN_BUS_COMPANIES.map((company) => (
            <span
              key={company.id}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border bg-blue-50 border-blue-200 text-blue-700"
            >
              <span>{company.logo}</span>
              <span>{company.name}</span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-arena-900 mb-2">
          {locale === "es"
            ? "Compara todas las líneas de autobús"
            : "Compare all bus lines"}
        </h2>
        <p className="text-arena-500 text-sm md:text-base max-w-2xl mx-auto">
          {locale === "es"
            ? "Encuentra el mejor precio comparando ADO, ETN, Primera Plus, Estrella Roja y más líneas en un solo lugar"
            : "Find the best price comparing ADO, ETN, Primera Plus, Estrella Roja and more lines in one place"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MEXICAN_BUS_COMPANIES.map((company) => (
          <button
            key={company.id}
            onClick={handleBusSearch}
            className="group relative bg-white rounded-2xl border-2 border-arena-100 p-4 text-left transition-all hover:border-blue-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-md"
                style={{ backgroundColor: company.color + "20", color: company.color }}
              >
                {company.logo}
              </div>
              <div>
                <h3 className="font-display font-bold text-arena-900 text-sm group-hover:text-blue-700 transition-colors">
                  {company.name}
                </h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-arena-100 text-arena-500 font-medium uppercase">
                  {company.type}
                </span>
              </div>
            </div>
            <p className="text-xs text-arena-400 mb-2">{company.tagline[locale]}</p>
            <div className="flex flex-wrap gap-1">
              {company.regions.slice(0, 4).map((region) => (
                <span key={region} className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-medium">
                  {region}
                </span>
              ))}
              {company.regions.length > 4 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-arena-50 text-arena-400">
                  +{company.regions.length - 4}
                </span>
              )}
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
          ? "Búsqueda segura • Compara precios de todas las líneas de autobús en México"
          : "Safe search • Compare prices from all bus lines in Mexico"}
      </div>
    </div>
  );
}

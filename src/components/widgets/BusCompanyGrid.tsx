"use client";

import { useLocale } from "next-intl";
import { Locale } from "@/types/common";
import { MEXICAN_BUS_COMPANIES, getBusSearchGenericUrl } from "@/lib/affiliate";
import { trackAffiliateClick } from "@/lib/analytics";

interface BusCompanyGridProps {
  compact?: boolean;
}

export default function BusCompanyGrid({ compact = false }: BusCompanyGridProps) {
  const locale = useLocale() as Locale;

  const handleBusSearch = (companyId?: string) => {
    const url = getBusSearchGenericUrl({ locale });
    trackAffiliateClick({ product: "bus", network: "travelpayouts", partner: companyId });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (compact) {
    return (
      <div className="space-y-3">
        <h3 className="font-display font-bold text-arena-900 text-sm">
          {locale === "es" ? "Lineas de autobus que comparamos:" : "Bus lines we compare:"}
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

  // Group companies by type/group
  const groups = [
    {
      title: { es: "Grupo ADO (Sureste y Golfo)", en: "ADO Group (Southeast & Gulf)" },
      emoji: "🔵",
      companies: MEXICAN_BUS_COMPANIES.filter(c => ["ado", "occ", "au"].includes(c.id)),
    },
    {
      title: { es: "Grupo Estrella Blanca (Norte y Noroeste)", en: "Estrella Blanca Group (North & Northwest)" },
      emoji: "⚪",
      companies: MEXICAN_BUS_COMPANIES.filter(c => ["estrella-blanca", "chihuahuenses", "futura", "transportes-del-norte", "elite"].includes(c.id)),
    },
    {
      title: { es: "ETN / Primera Plus (Centro y Bajio)", en: "ETN / Primera Plus (Central & Bajio)" },
      emoji: "🔴",
      companies: MEXICAN_BUS_COMPANIES.filter(c => ["etn", "primera-plus"].includes(c.id)),
    },
    {
      title: { es: "Lineas independientes", en: "Independent lines" },
      emoji: "🚌",
      companies: MEXICAN_BUS_COMPANIES.filter(c =>
        !["ado", "occ", "au", "estrella-blanca", "chihuahuenses", "futura", "transportes-del-norte", "elite", "etn", "primera-plus"].includes(c.id)
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-arena-900 mb-2">
          {locale === "es"
            ? "Compara +20 lineas de autobus"
            : "Compare 20+ bus lines"}
        </h2>
        <p className="text-arena-500 text-sm md:text-base max-w-2xl mx-auto">
          {locale === "es"
            ? "Todas las lineas de Mexico en un solo lugar: ADO, ETN, Estrella Blanca, Chihuahuenses, OCC, Primera Plus y mas"
            : "All Mexico bus lines in one place: ADO, ETN, Estrella Blanca, Chihuahuenses, OCC, Primera Plus and more"}
        </p>
      </div>

      {groups.map((group) => (
        <div key={group.title.es}>
          <h3 className="font-display font-bold text-arena-800 text-sm mb-3 flex items-center gap-2">
            <span>{group.emoji}</span>
            {group.title[locale]}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {group.companies.map((company) => (
              <button
                key={company.id}
                onClick={() => handleBusSearch(company.id)}
                className="group relative bg-white rounded-xl border border-arena-100 p-3.5 text-left transition-all hover:border-blue-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shadow-sm flex-shrink-0"
                    style={{ backgroundColor: company.color + "15", color: company.color }}
                  >
                    {company.logo}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-display font-bold text-arena-900 text-sm group-hover:text-blue-700 transition-colors truncate">
                      {company.name}
                    </h4>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium uppercase ${
                      company.type === "premium" ? "bg-purple-100 text-purple-700" :
                      company.type === "primera" ? "bg-blue-100 text-blue-700" :
                      company.type === "ejecutivo" ? "bg-amber-100 text-amber-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {company.type}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-arena-400 mb-2 line-clamp-1">{company.tagline[locale]}</p>
                <div className="flex flex-wrap gap-1">
                  {company.regions.slice(0, 3).map((region) => (
                    <span key={region} className="text-[10px] px-1.5 py-0.5 rounded bg-arena-50 text-arena-500 font-medium">
                      {region}
                    </span>
                  ))}
                  {company.regions.length > 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-arena-50 text-arena-400">
                      +{company.regions.length - 3}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Total count badge */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-arena-400 bg-white rounded-xl py-4 px-6 border border-arena-100 shadow-sm">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="font-semibold text-arena-700">{MEXICAN_BUS_COMPANIES.length} {locale === "es" ? "lineas" : "lines"}</span>
        </div>
        <span className="text-arena-300">•</span>
        <span>{locale === "es" ? "Busqueda segura y gratuita" : "Safe & free search"}</span>
        <span className="text-arena-300">•</span>
        <span>{locale === "es" ? "Compara precios al instante" : "Compare prices instantly"}</span>
      </div>
    </div>
  );
}

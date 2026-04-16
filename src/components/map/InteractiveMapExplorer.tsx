"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { localize, t3, formatCurrency } from "@/lib/utils";
import { Destination } from "@/types/destination";
import { Locale } from "@/types/common";
import MapLoader from "./MapLoader";
import { REGION_STYLE, Region } from "./regionStyles";

interface InteractiveMapExplorerProps {
  destinations: Destination[];
}

type FilterRegion = "all" | Region;

export default function InteractiveMapExplorer({ destinations }: InteractiveMapExplorerProps) {
  const locale = useLocale() as Locale;
  const [activeRegion, setActiveRegion] = useState<FilterRegion>("all");
  const [focusedId, setFocusedId] = useState<string | undefined>();

  // Regions that actually have destinations, sorted by number of destinations desc
  const regionsPresent = useMemo(() => {
    const counts = new Map<Region, number>();
    for (const d of destinations) {
      const r = d.region as Region;
      counts.set(r, (counts.get(r) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([region]) => region);
  }, [destinations]);

  // Filtered destinations for the map and the list
  const filtered = useMemo(() => {
    if (activeRegion === "all") return destinations;
    return destinations.filter((d) => d.region === activeRegion);
  }, [destinations, activeRegion]);

  const handleSelect = (id: string) => {
    // Toggle: clicking the same item twice re-triggers the flyTo
    setFocusedId(undefined);
    // Use a small timeout so React commits the reset before setting the new id
    setTimeout(() => setFocusedId(id), 10);
  };

  return (
    <div>
      {/* Region filter pills */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <button
          onClick={() => setActiveRegion("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
            activeRegion === "all"
              ? "bg-arena-900 text-white border-arena-900 shadow-lg"
              : "bg-white text-arena-600 border-arena-200 hover:border-arena-400 hover:shadow-md"
          }`}
        >
          🗺️ {t3(locale, "Todos", "All", "Tous")}
          <span className={`ml-1.5 text-xs ${activeRegion === "all" ? "text-white/80" : "text-arena-400"}`}>
            ({destinations.length})
          </span>
        </button>
        {regionsPresent.map((region) => {
          const style = REGION_STYLE[region];
          if (!style) return null;
          const isActive = activeRegion === region;
          const count = destinations.filter((d) => d.region === region).length;
          return (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                isActive ? "text-white shadow-lg" : "bg-white text-arena-600 border-arena-200 hover:shadow-md"
              }`}
              style={
                isActive
                  ? { backgroundColor: style.color, borderColor: style.color }
                  : undefined
              }
            >
              <span className="mr-1">{style.emoji}</span>
              {locale === "es" ? style.label.es : style.label.en}
              <span className={`ml-1.5 text-xs ${isActive ? "text-white/80" : "text-arena-400"}`}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid: map + destination list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map - takes 2/3 on desktop */}
        <div className="lg:col-span-2 order-1">
          <MapLoader
            destinations={filtered}
            height="560px"
            focusedDestinationId={focusedId}
            hideLegend
          />
        </div>

        {/* Destination list - takes 1/3 on desktop */}
        <div className="lg:col-span-1 order-2">
          <div className="bg-white rounded-2xl border border-arena-100 shadow-sm overflow-hidden lg:h-[560px] flex flex-col">
            <div className="px-4 py-3 bg-arena-50 border-b border-arena-100">
              <p className="text-xs font-semibold text-arena-500 uppercase tracking-wide">
                {activeRegion === "all"
                  ? t3(locale, "Todos los destinos", "All destinations", "Toutes les destinations")
                  : locale === "es"
                  ? REGION_STYLE[activeRegion].label.es
                  : REGION_STYLE[activeRegion].label.en}
              </p>
              <p className="text-sm text-arena-700 font-medium mt-0.5">
                {filtered.length}{" "}
                {filtered.length === 1
                  ? t3(locale, "destino", "destination", "destination")
                  : t3(locale, "destinos", "destinations", "destinations")}
              </p>
            </div>

            <div className="overflow-y-auto flex-1 divide-y divide-arena-100">
              {filtered.length === 0 ? (
                <div className="p-6 text-center text-sm text-arena-400">
                  {t3(locale,
                    "No hay destinos en esta región todavía.",
                    "No destinations in this region yet.",
                    "Pas de destinations dans cette région."
                  )}
                </div>
              ) : (
                filtered.map((dest) => {
                  const style = REGION_STYLE[dest.region as Region];
                  const isFocused = focusedId === dest.id;
                  return (
                    <button
                      key={dest.id}
                      onClick={() => handleSelect(dest.id)}
                      className={`w-full text-left p-3 hover:bg-arena-50 transition-colors flex gap-3 ${
                        isFocused ? "bg-arena-50" : ""
                      }`}
                    >
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-arena-100">
                        <Image
                          src={dest.heroImage}
                          alt={localize(dest.name, locale)}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                        {style && (
                          <div
                            className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs shadow"
                            style={{ backgroundColor: style.color }}
                            title={locale === "es" ? style.label.es : style.label.en}
                          >
                            {style.emoji}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-arena-900 text-sm leading-tight">
                          {localize(dest.name, locale)}
                        </h3>
                        <p className="text-xs text-arena-500 mt-0.5 truncate">
                          {localize(dest.state, locale)}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5 text-[11px] text-arena-600">
                          <span className="inline-flex items-center gap-1">
                            💰 {formatCurrency(dest.averageDailyBudget.min)}-
                            {formatCurrency(dest.averageDailyBudget.max)}
                          </span>
                        </div>
                        <Link
                          href={`/${locale}/destinos/${dest.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-block mt-1.5 text-[11px] text-terracotta-600 hover:text-terracotta-700 font-medium"
                        >
                          {t3(locale, "Ver guía →", "View guide →", "Voir le guide →")}
                        </Link>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hint */}
      <p className="text-xs text-arena-400 text-center mt-4">
        {t3(locale,
          "💡 Haz clic en un destino de la lista para verlo en el mapa",
          "💡 Click a destination from the list to see it on the map",
          "💡 Cliquez sur une destination pour la voir sur la carte"
        )}
      </p>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Destination } from "@/types/destination";
import { Route } from "@/types/route";
import { Locale } from "@/types/common";
import { localize, formatCurrency, formatDuration } from "@/lib/utils";
import { TRAVEL_MODE_ICONS, TRAVEL_MODE_COLORS } from "@/lib/constants";

interface RouteSearchProps {
  destinations: Destination[];
  routes: Route[];
}

export default function RouteSearch({ destinations, routes }: RouteSearchProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations("routes");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const filteredRoutes = routes.filter((r) => {
    if (origin && r.originId !== origin) return false;
    if (destination && r.destinationId !== destination) return false;
    return true;
  });

  const getDestName = (id: string) => {
    const dest = destinations.find((d) => d.id === id);
    return dest ? localize(dest.name, locale) : id;
  };

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-arena-900 mb-3">
          {t("title")}
        </h1>
        <p className="text-arena-500 text-lg">{t("subtitle")}</p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-2xl p-6 shadow-md max-w-3xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-arena-600 mb-2">{t("selectOrigin")}</label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50"
            >
              <option value="">{locale === "es" ? "Todas las ciudades" : "All cities"}</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>{localize(d.name, locale)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-arena-600 mb-2">{t("selectDestination")}</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50"
            >
              <option value="">{locale === "es" ? "Todas las ciudades" : "All cities"}</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>{localize(d.name, locale)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Route Results */}
      {filteredRoutes.length === 0 ? (
        <p className="text-center text-arena-400 py-8">{t("noResults")}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRoutes.map((route) => {
            const cheapest = route.options.reduce((min, opt) =>
              opt.priceRange.min < min.priceRange.min ? opt : min
            );
            const fastest = route.options.reduce((min, opt) =>
              opt.duration.minMinutes < min.duration.minMinutes ? opt : min
            );
            return (
              <Link
                key={route.id}
                href={`/${locale}/rutas/${route.slug}`}
                className="card p-6 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-display font-bold text-lg text-arena-900 group-hover:text-terracotta-500 transition-colors">
                    {getDestName(route.originId)}
                  </span>
                  <span className="text-terracotta-400">→</span>
                  <span className="font-display font-bold text-lg text-arena-900 group-hover:text-terracotta-500 transition-colors">
                    {getDestName(route.destinationId)}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {route.options.map((opt) => (
                    <span
                      key={opt.id}
                      className={`badge border ${TRAVEL_MODE_COLORS[opt.mode]}`}
                    >
                      {TRAVEL_MODE_ICONS[opt.mode]} {localize(opt.duration.label, locale)}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-arena-400">
                    {locale === "es" ? "Desde" : "From"}{" "}
                    <span className="text-terracotta-600 font-bold text-base">
                      {formatCurrency(cheapest.priceRange.min)}
                    </span>
                  </span>
                  <span className="text-arena-400">
                    {locale === "es" ? "Más rápido" : "Fastest"}:{" "}
                    <span className="font-semibold text-arena-700">
                      {formatDuration(fastest.duration.minMinutes)}
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

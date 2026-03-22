"use client";

import { useState } from "react";
import Link from "next/link";
import { Destination } from "@/types/destination";
import { Route } from "@/types/route";
import { Terminal } from "@/types/terminal";
import { Locale } from "@/types/common";
import { localize, formatCurrency } from "@/lib/utils";
import { TRAVEL_MODE_ICONS } from "@/lib/constants";
import LocationPin from "@/components/map/LocationPin";

interface DestinationDetailProps {
  destination: Destination;
  routes: Route[];
  terminals: Terminal[];
  locale: Locale;
}

export default function DestinationDetail({ destination, routes, terminals, locale }: DestinationDetailProps) {
  const [activeTab, setActiveTab] = useState<"highlights" | "transport" | "safety" | "food">("highlights");

  const tabs = [
    { id: "highlights" as const, label: locale === "es" ? "Qué ver y hacer" : "What to see & do", icon: "🏛️" },
    { id: "transport" as const, label: locale === "es" ? "Cómo moverse" : "Getting around", icon: "🚌" },
    { id: "safety" as const, label: locale === "es" ? "Seguridad" : "Safety", icon: "🛡️" },
    { id: "food" as const, label: locale === "es" ? "Comida local" : "Local food", icon: "🍽️" },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="gradient-hero relative">
        <div className="gradient-hero-overlay absolute inset-0" />
        <div className="container-custom relative z-10 py-16 md:py-24">
          <Link href={`/${locale}/destinos`} className="text-white/70 hover:text-white text-sm mb-4 inline-block">
            ← {locale === "es" ? "Todos los destinos" : "All destinations"}
          </Link>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-3">
            {localize(destination.name, locale)}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            {localize(destination.longDescription, locale)}
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-white text-sm">
              📍 {localize(destination.state, locale)}
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-white text-sm">
              💰 {formatCurrency(destination.averageDailyBudget.min)}-{formatCurrency(destination.averageDailyBudget.max)}/{locale === "es" ? "día" : "day"}
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-white text-sm">
              🌤️ {localize(destination.bestTimeToVisit, locale)}
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-terracotta-500 text-white shadow-lg"
                      : "bg-white text-arena-600 hover:bg-arena-100"
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              {activeTab === "highlights" && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-arena-900 mb-4">
                    {locale === "es" ? "Qué ver y hacer" : "What to see & do"}
                  </h2>
                  <ul className="space-y-3">
                    {destination.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-terracotta-500 mt-0.5">✦</span>
                        <span className="text-arena-700">{localize(h, locale)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "transport" && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-arena-900 mb-4">
                    {locale === "es" ? "Cómo moverse" : "Getting around"}
                  </h2>
                  <p className="text-arena-700 leading-relaxed">{localize(destination.gettingAround, locale)}</p>

                  {terminals.length > 0 && (
                    <div className="mt-6">
                      <h3 className="font-display font-bold text-lg text-arena-900 mb-3">
                        {locale === "es" ? "Terminales y aeropuertos" : "Terminals & airports"}
                      </h3>
                      <div className="space-y-4">
                        {terminals.map((terminal) => (
                          <div key={terminal.id} className="border border-arena-200 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span>{terminal.type === "airport" ? "✈️" : "🚌"}</span>
                              <h4 className="font-semibold text-arena-900">{localize(terminal.name, locale)}</h4>
                              {terminal.shortCode && (
                                <span className="badge bg-arena-100 text-arena-600">{terminal.shortCode}</span>
                              )}
                            </div>
                            <p className="text-sm text-arena-500 mb-2">📍 {localize(terminal.address, locale)}</p>
                            <p className="text-sm text-arena-600">{localize(terminal.howToGetThere, locale)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "safety" && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-arena-900 mb-4">
                    {locale === "es" ? "Consejos de seguridad" : "Safety tips"}
                  </h2>
                  <ul className="space-y-3">
                    {destination.safetyTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 bg-oro-50 rounded-xl p-4">
                        <span className="text-oro-500">⚠️</span>
                        <span className="text-arena-700">{localize(tip, locale)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "food" && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-arena-900 mb-4">
                    {locale === "es" ? "Comida local" : "Local food"}
                  </h2>
                  <div className="space-y-4">
                    {destination.foodRecommendations.map((food, i) => (
                      <div key={i} className="border border-arena-200 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-display font-bold text-arena-900">{food.name}</h4>
                          <span className="text-sm text-terracotta-600 font-semibold">
                            {formatCurrency(food.priceRange.min)}-{formatCurrency(food.priceRange.max)}
                          </span>
                        </div>
                        <p className="text-sm text-arena-600 mb-2">{localize(food.description, locale)}</p>
                        <p className="text-xs text-arena-400">
                          📍 {localize(food.whereToTry, locale)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Map */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-display font-bold text-arena-900 mb-3">
                {locale === "es" ? "Ubicación" : "Location"}
              </h3>
              <LocationPin
                lat={destination.coordinates.lat}
                lng={destination.coordinates.lng}
                name={destination.name}
                address={destination.state}
              />
            </div>

            {/* Routes to this destination */}
            {routes.length > 0 && (
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-display font-bold text-arena-900 mb-3">
                  {locale === "es" ? "Cómo llegar" : "How to get here"}
                </h3>
                <div className="space-y-2">
                  {routes.map((route) => {
                    const cheapest = route.options.reduce((min, opt) =>
                      opt.priceRange.min < min.priceRange.min ? opt : min
                    );
                    return (
                      <Link
                        key={route.id}
                        href={`/${locale}/rutas/${route.slug}`}
                        className="block p-3 rounded-xl border border-arena-200 hover:border-terracotta-300 hover:bg-terracotta-50 transition-all"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-arena-800">
                            {locale === "es" ? "Desde" : "From"} {route.originId.toUpperCase()}
                          </span>
                          <span className="text-xs text-terracotta-600 font-semibold">
                            {locale === "es" ? "desde" : "from"} {formatCurrency(cheapest.priceRange.min)}
                          </span>
                        </div>
                        <div className="flex gap-1 mt-1">
                          {route.options.map((opt) => (
                            <span key={opt.id} className="text-xs">{TRAVEL_MODE_ICONS[opt.mode]}</span>
                          ))}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Destination } from "@/types/destination";
import { Route } from "@/types/route";
import { Terminal } from "@/types/terminal";
import { Locale } from "@/types/common";
import { ExpandedContent } from "@/lib/data/destination-content";
import { localize, formatCurrency, t3 } from "@/lib/utils";
import { TRAVEL_MODE_ICONS } from "@/lib/constants";
import LocationPin from "@/components/map/LocationPin";
import { getDestinationImage, getDestinationCarouselImages } from "@/lib/destination-images";

interface DestinationDetailProps {
  destination: Destination;
  routes: Route[];
  terminals: Terminal[];
  locale: Locale;
  expandedContent?: ExpandedContent | null;
}

export default function DestinationDetail({ destination, routes, terminals, locale, expandedContent }: DestinationDetailProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"highlights" | "transport" | "safety" | "food">("highlights");
  const image = getDestinationImage(destination.id);
  const galleryImages = getDestinationCarouselImages(destination.id);
  const hasGallery = galleryImages.length > 1;

  const tabs = [
    { id: "highlights" as const, label: locale === "es" ? "Que ver y hacer" : "What to see & do", icon: "🏛️" },
    { id: "transport" as const, label: locale === "es" ? "Como moverse" : "Getting around", icon: "🚌" },
    { id: "safety" as const, label: locale === "es" ? "Seguridad" : "Safety", icon: "🛡️" },
    { id: "food" as const, label: locale === "es" ? "Comida local" : "Local food", icon: "🍽️" },
  ];

  return (
    <div>
      {/* Hero with real image */}
      <div className="relative min-h-[400px] md:min-h-[500px] flex items-end">
        <Image
          src={image.url}
          alt={image.alt[locale]}
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="container-custom relative z-10 pb-10 pt-20 md:pb-16">
          <Link href={`/${locale}/destinos`} className="text-white/70 hover:text-white text-sm mb-4 inline-flex items-center gap-1 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {locale === "es" ? "Todos los destinos" : "All destinations"}
          </Link>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-3 drop-shadow-lg">
            {localize(destination.name, locale)}
          </h1>
          <p className="text-white/90 text-lg max-w-2xl drop-shadow">
            {localize(destination.longDescription, locale)}
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-2 text-white text-sm border border-white/10">
              📍 {localize(destination.state, locale)}
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-2 text-white text-sm border border-white/10">
              💰 {formatCurrency(destination.averageDailyBudget.min)}-{formatCurrency(destination.averageDailyBudget.max)}/{locale === "es" ? "dia" : "day"}
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-2 text-white text-sm border border-white/10">
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
                    {locale === "es" ? "Que ver y hacer" : "What to see & do"}
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
                    {locale === "es" ? "Como moverse" : "Getting around"}
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

            {/* Gallery */}
            {hasGallery && (
              <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
                <h3 className="font-display text-xl font-bold text-arena-900 mb-4">
                  📸 {(locale as string) === "fr" ? "Galerie" : locale === "es" ? "Galería" : "Gallery"}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {galleryImages.map((src, i) => (
                    <a
                      key={i}
                      href={src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-arena-100 block"
                    >
                      <Image
                        src={src}
                        alt={`${localize(destination.name, locale)} ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </a>
                  ))}
                </div>
                <p className="text-xs text-arena-400 mt-3 text-center">
                  {(locale as string) === "fr"
                    ? "Clique sur une image pour la voir en grand"
                    : locale === "es"
                    ? "Haz clic en cualquier imagen para verla en tamaño completo"
                    : "Click any photo to open full size"}
                </p>
              </div>
            )}

            {/* Expanded SEO content — only renders when destinations-content.json has this slug */}
            {expandedContent && (
              <div className="mt-6 space-y-6">
                <article className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-display text-2xl font-bold text-arena-900 mb-4">
                    {t3(locale, `Cómo llegar a ${localize(destination.name, locale)}`, `How to get to ${localize(destination.name, locale)}`, `Comment se rendre à ${localize(destination.name, locale)}`)}
                  </h2>
                  <p className="text-arena-700 leading-relaxed whitespace-pre-line">{localize(expandedContent.howToGetThere, locale)}</p>
                </article>

                <article className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-display text-2xl font-bold text-arena-900 mb-4">
                    {t3(locale, "Dónde hospedarse", "Where to stay", "Où loger")}
                  </h2>
                  <p className="text-arena-700 leading-relaxed whitespace-pre-line">{localize(expandedContent.whereToStay, locale)}</p>
                </article>

                <article className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-display text-2xl font-bold text-arena-900 mb-4">
                    {t3(locale, "Cómo moverte en la ciudad", "Getting around", "Se déplacer dans la ville")}
                  </h2>
                  <p className="text-arena-700 leading-relaxed whitespace-pre-line">{localize(expandedContent.gettingAround, locale)}</p>
                </article>

                <article className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-display text-2xl font-bold text-arena-900 mb-4">
                    {t3(locale, "Escena gastronómica", "Food scene", "Scène gastronomique")}
                  </h2>
                  <p className="text-arena-700 leading-relaxed whitespace-pre-line">{localize(expandedContent.foodScene, locale)}</p>
                </article>

                <article className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-display text-2xl font-bold text-arena-900 mb-4">
                    {t3(locale, "Mejor época para visitar", "Best time to visit", "Meilleure période pour visiter")}
                  </h2>
                  <p className="text-arena-700 leading-relaxed whitespace-pre-line">{localize(expandedContent.bestTime, locale)}</p>
                </article>

                <article className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-display text-2xl font-bold text-arena-900 mb-4">
                    {t3(locale, "Costos diarios estimados", "Estimated daily costs", "Coûts journaliers estimés")}
                  </h2>
                  <p className="text-arena-700 leading-relaxed whitespace-pre-line">{localize(expandedContent.dailyCost, locale)}</p>
                </article>

                {expandedContent.faqs.length > 0 && (
                  <article className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="font-display text-2xl font-bold text-arena-900 mb-4">
                      {t3(locale, "Preguntas frecuentes", "Frequently asked questions", "Questions fréquentes")}
                    </h2>
                    <div className="divide-y divide-arena-200">
                      {expandedContent.faqs.map((faq, i) => {
                        const isOpen = openFaq === i;
                        return (
                          <div key={i} className="py-3">
                            <button
                              onClick={() => setOpenFaq(isOpen ? null : i)}
                              className="w-full flex justify-between items-start text-left gap-4 group"
                              aria-expanded={isOpen}
                            >
                              <span className="font-semibold text-arena-900 group-hover:text-terracotta-600 transition-colors">
                                {localize(faq.question, locale)}
                              </span>
                              <span className={`text-terracotta-500 text-xl transition-transform flex-shrink-0 ${isOpen ? "rotate-45" : ""}`}>+</span>
                            </button>
                            {isOpen && (
                              <p className="mt-3 text-arena-700 leading-relaxed">{localize(faq.answer, locale)}</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </article>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Map */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-display font-bold text-arena-900 mb-3">
                {locale === "es" ? "Ubicacion" : "Location"}
              </h3>
              <LocationPin
                lat={destination.coordinates.lat}
                lng={destination.coordinates.lng}
                name={destination.name}
                address={destination.state}
              />
            </div>

            {/* Quick action buttons */}
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
              <h3 className="font-display font-bold text-arena-900 mb-3">
                {locale === "es" ? "Reserva ahora" : "Book now"}
              </h3>
              <Link
                href={`/${locale}/vuelos`}
                className="flex items-center gap-3 p-3 rounded-xl bg-terracotta-50 hover:bg-terracotta-100 transition-colors group"
              >
                <span className="text-xl">✈️</span>
                <div>
                  <p className="font-semibold text-sm text-arena-900 group-hover:text-terracotta-600">{locale === "es" ? "Buscar vuelos" : "Search flights"}</p>
                  <p className="text-xs text-arena-400">{locale === "es" ? "Compara aerolíneas" : "Compare airlines"}</p>
                </div>
              </Link>
              <Link
                href={`/${locale}/hoteles`}
                className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors group"
              >
                <span className="text-xl">🏨</span>
                <div>
                  <p className="font-semibold text-sm text-arena-900 group-hover:text-amber-600">{locale === "es" ? "Buscar hoteles" : "Search hotels"}</p>
                  <p className="text-xs text-arena-400">{locale === "es" ? "Mejores precios" : "Best prices"}</p>
                </div>
              </Link>
              <Link
                href={`/${locale}/autobuses`}
                className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group"
              >
                <span className="text-xl">🚌</span>
                <div>
                  <p className="font-semibold text-sm text-arena-900 group-hover:text-blue-600">{locale === "es" ? "Buscar autobuses" : "Search buses"}</p>
                  <p className="text-xs text-arena-400">{locale === "es" ? "ADO, ETN, Primera Plus" : "ADO, ETN, Primera Plus"}</p>
                </div>
              </Link>
            </div>

            {/* Routes to this destination */}
            {routes.length > 0 && (
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-display font-bold text-arena-900 mb-3">
                  {locale === "es" ? "Como llegar" : "How to get here"}
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

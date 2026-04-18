"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { MundialVenue, SafetyLevel, CurrencyPlace } from "@/types/mundial";
import { Destination } from "@/types/destination";
import { localize, formatCurrency, t3 } from "@/lib/utils";
import { Locale } from "@/types/common";
import MercadoLibreBanner from "@/components/widgets/MercadoLibreBanner";

interface MundialVenueDetailProps {
  venue: MundialVenue;
  destination: Destination | null;
}

const fromCityLabels: Record<string, string> = { CDMX: "CDMX", MTY: "Monterrey", GDL: "Guadalajara" };

const roundLabels: Record<string, Record<string, string>> = {
  group: { es: "Fase de Grupos", en: "Group Stage", fr: "Phase de Groupes", zh: "小组赛" },
  "round-of-32": { es: "Ronda de 32", en: "Round of 32", fr: "32es de finale", zh: "32强" },
  "round-of-16": { es: "Octavos de Final", en: "Round of 16", fr: "Huitièmes de finale", zh: "16强" },
  quarter: { es: "Cuartos de Final", en: "Quarter Finals", fr: "Quarts de finale", zh: "四分之一决赛" },
  semi: { es: "Semifinal", en: "Semi Final", fr: "Demi-finale", zh: "半决赛" },
  final: { es: "Final", en: "Final", fr: "Finale", zh: "决赛" },
};

const safetyStyles: Record<
  SafetyLevel,
  { card: string; dot: string; badge: string; icon: string; label: { es: string; en: string; fr: string } }
> = {
  green: {
    card: "bg-emerald-50 border-emerald-300",
    dot: "bg-emerald-500",
    badge: "bg-emerald-500 text-white",
    icon: "✅",
    label: { es: "Seguro", en: "Safe", fr: "Sûr" },
  },
  yellow: {
    card: "bg-amber-50 border-amber-300",
    dot: "bg-amber-500",
    badge: "bg-amber-500 text-white",
    icon: "⚠️",
    label: { es: "Precaución", en: "Caution", fr: "Prudence" },
  },
  red: {
    card: "bg-red-50 border-red-300",
    dot: "bg-red-500",
    badge: "bg-red-500 text-white",
    icon: "⛔",
    label: { es: "Evitar", en: "Avoid", fr: "Éviter" },
  },
};

const rateQualityStyles: Record<
  CurrencyPlace["rateQuality"],
  { badge: string; label: { es: string; en: string; fr: string } }
> = {
  best: { badge: "bg-emerald-500 text-white", label: { es: "Mejor tasa", en: "Best rate", fr: "Meilleur taux" } },
  good: { badge: "bg-emerald-400 text-white", label: { es: "Buena tasa", en: "Good rate", fr: "Bon taux" } },
  fair: { badge: "bg-amber-500 text-white", label: { es: "Tasa regular", en: "Fair rate", fr: "Taux moyen" } },
  worst: { badge: "bg-red-500 text-white", label: { es: "Peor tasa", en: "Worst rate", fr: "Mauvais taux" } },
};

const placeTypeIcons: Record<CurrencyPlace["type"], string> = {
  "casa-cambio": "💱",
  bank: "🏦",
  atm: "🏧",
  airport: "✈️",
};

export default function MundialVenueDetail({ venue, destination }: MundialVenueDetailProps) {
  const locale = useLocale() as Locale;
  const [airportTab, setAirportTab] = useState(0);

  const firstMatch = venue.matches[0];
  const matchDate = new Date(`${firstMatch.date}T${firstMatch.time}:00`);
  const now = new Date();
  const daysUntil = Math.max(0, Math.ceil((matchDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  const hasAirports = !!venue.airports?.length;
  const hasLocalTransport = !!venue.localTransport?.length;
  const hasSafetyZones = !!venue.safetyZones?.length;
  const hasCurrency = !!venue.currency?.places?.length;
  const hasAttractions = !!venue.nearbyAttractions?.length;
  const hasMap = !!venue.mapsEmbedSrc;
  const hasFromMexico = !!venue.fromMexico?.flights?.length;
  const budgetCurrency = venue.avgMatchDayBudget.currency;
  const isUS = venue.country === "US";

  const sections: { id: string; emoji: string; label: { es: string; en: string; fr: string } }[] = [
    { id: "partidos", emoji: "⚽", label: { es: "Partidos", en: "Matches", fr: "Matchs" } },
    ...(hasFromMexico ? [{ id: "desde-mexico", emoji: "🇲🇽", label: { es: "Desde México", en: "From Mexico", fr: "Depuis le Mexique" } }] : []),
    ...(hasAirports ? [{ id: "llegada", emoji: "🛬", label: { es: "Llegada", en: "Arrival", fr: "Arrivée" } }] : []),
    ...(hasLocalTransport ? [{ id: "transporte", emoji: "🚗", label: { es: "Transporte", en: "Transport", fr: "Transport" } }] : []),
    ...(hasSafetyZones ? [{ id: "seguridad", emoji: "🗺️", label: { es: "Zonas", en: "Zones", fr: "Zones" } }] : []),
    ...(hasCurrency ? [{ id: "cambio", emoji: "💱", label: { es: "Cambio", en: "Exchange", fr: "Change" } }] : []),
    ...(hasAttractions || hasMap ? [{ id: "cerca", emoji: "📍", label: { es: "Cerca", en: "Nearby", fr: "À proximité" } }] : []),
    { id: "hoteles", emoji: "🏨", label: { es: "Hoteles", en: "Hotels", fr: "Hôtels" } },
    { id: "fanzones", emoji: "🎉", label: { es: "Fan Zones", en: "Fan Zones", fr: "Fan Zones" } },
    { id: "tips", emoji: "💡", label: { es: "Tips", en: "Tips", fr: "Conseils" } },
    { id: "presupuesto", emoji: "💰", label: { es: "Presupuesto", en: "Budget", fr: "Budget" } },
  ];

  const activeAirport = venue.airports?.[airportTab];

  return (
    <div className="scroll-smooth">
      {/* Hero */}
      <div className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-jade-600 via-arena-900 to-terracotta-700">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.06),transparent_40%)]" />
        <div className="container-custom relative z-10">
          <nav className="text-white/70 text-sm mb-4">
            <Link href={`/${locale}/mundial`} className="hover:text-white transition-colors">
              {t3(locale, "Mundial 2026", "World Cup 2026", "Coupe du Monde 2026")}
            </Link>
            {" / "}
            <span className="text-white">{localize(venue.name, locale)}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-white/20">
                <span>🏟️</span>
                <span className="text-white text-sm font-medium">{venue.stadium.name}</span>
                <span className="text-white/50 text-xs">•</span>
                <span className="text-white/80 text-xs">{venue.stadium.capacity.toLocaleString()} {t3(locale, "asientos", "seats", "places")}</span>
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                ⚽ {localize(venue.name, locale)}
              </h1>
              <p className="text-white/85 text-lg max-w-3xl leading-relaxed">
                {localize(venue.stadium.description, locale)}
              </p>
            </div>

            {daysUntil > 0 && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 min-w-[180px] shadow-xl">
                <div className="text-5xl font-bold text-oro-300 drop-shadow-lg">{daysUntil}</div>
                <div className="text-white/80 text-sm mt-1">
                  {t3(locale, "días al 1er partido", "days to 1st match", "jours avant le 1er match")}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky section nav */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-arena-200 shadow-sm">
        <div className="container-custom">
          <div className="flex gap-1 py-2 overflow-x-auto scrollbar-hide">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-arena-700 hover:bg-jade-600 hover:text-white transition-all duration-200 whitespace-nowrap"
              >
                <span>{s.emoji}</span>
                <span>{t3(locale, s.label.es, s.label.en, s.label.fr)}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="container-custom py-10">
        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {[
            { icon: "🏟️", value: venue.stadium.capacity.toLocaleString(), label: t3(locale, "Capacidad", "Capacity", "Capacité") },
            { icon: "⚽", value: venue.matches.length, label: t3(locale, "Partidos", "Matches", "Matchs") },
            { icon: "🇲🇽", value: venue.matches.filter((m) => m.isMexicoGame).length, label: t3(locale, "De México", "Mexico", "Mexique") },
            { icon: "📅", value: venue.stadium.yearBuilt, label: t3(locale, "Inaugurado", "Year built", "Année") },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 text-center border border-arena-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="font-bold text-arena-800 text-lg">{s.value}</div>
              <div className="text-xs text-arena-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Matches */}
        <section id="partidos" className="mb-14 scroll-mt-20">
          <SectionHeader emoji="⚽" title={t3(locale, "Calendario de partidos", "Match schedule", "Calendrier des matchs")} />
          <div className="grid gap-3">
            {venue.matches.map((match, i) => (
              <div
                key={i}
                className={`rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 border transition-all hover:shadow-md ${
                  match.isMexicoGame ? "bg-jade-50 border-emerald-300" : "bg-white border-arena-200"
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  {match.isMexicoGame && <span className="text-2xl">🇲🇽</span>}
                  <div>
                    <p className="font-bold text-arena-800">
                      {localize(match.teamA, locale)} <span className="text-arena-400">vs</span> {localize(match.teamB, locale)}
                    </p>
                    <p className="text-xs text-arena-500 mt-0.5">
                      {roundLabels[match.round]?.[locale] || match.round}
                      {match.group && ` • ${t3(locale, "Grupo", "Group", "Groupe")} ${match.group}`}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-arena-700 font-semibold bg-arena-100 rounded-lg px-3 py-1.5 whitespace-nowrap">
                  📅 {match.date} • ⏰ {match.time}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* From Mexico (US venues) */}
        {hasFromMexico && venue.fromMexico && (
          <section id="desde-mexico" className="mb-14 scroll-mt-20">
            <SectionHeader
              emoji="🇲🇽"
              title={t3(locale, "Cómo llegar desde México", "How to get there from Mexico", "Depuis le Mexique")}
              subtitle={t3(
                locale,
                "Opciones de vuelo desde las ciudades más grandes de México a la sede",
                "Flight options from Mexico's biggest cities to the venue",
                "Options de vol depuis les grandes villes du Mexique vers le stade"
              )}
            />
            <div className="bg-jade-50 border border-jade-200 rounded-xl p-5 mb-5">
              <p className="text-sm text-arena-700 leading-relaxed">{localize(venue.fromMexico.description, locale)}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {venue.fromMexico.flights.map((f, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border-2 border-arena-200 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">✈️</span>
                      <div>
                        <div className="font-bold text-arena-800 text-sm">{fromCityLabels[f.fromCity]} → {venue.stadium.name.split(" ")[0]}</div>
                        <div className="text-xs text-arena-500">{f.airlines}</div>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 whitespace-nowrap ${f.direct ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"}`}>
                      {f.direct
                        ? t3(locale, "Directo", "Direct", "Direct")
                        : t3(locale, "Con escala", "Connecting", "Avec escale")}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-arena-700">
                      <span>⏱️</span>
                      <span>{localize(f.duration, locale)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-arena-700 font-semibold">
                      <span>💵</span>
                      <span>{localize(f.priceRangeMxn, locale)}</span>
                    </div>
                  </div>
                  {f.note && (
                    <p className="text-xs text-arena-600 bg-arena-50 rounded-lg p-2 mt-3 leading-relaxed">
                      💡 {localize(f.note, locale)}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {venue.fromMexico.tip && (
              <div className="bg-gradient-to-r from-oro-50 to-amber-50 border border-oro-200 rounded-xl p-4 mt-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <p className="text-sm text-arena-700 leading-relaxed">{localize(venue.fromMexico.tip, locale)}</p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Arrival by air */}
        {hasAirports && venue.airports && (
          <section id="llegada" className="mb-14 scroll-mt-20">
            <SectionHeader
              emoji="🛬"
              title={t3(locale, "Cómo llegar desde el aeropuerto", "How to get there from the airport", "Depuis l'aéroport")}
              subtitle={t3(
                locale,
                "Compara opciones de transporte desde cada aeropuerto hasta el estadio",
                "Compare transport options from each airport to the stadium",
                "Comparez les options depuis chaque aéroport"
              )}
            />

            {/* Airport tabs */}
            <div className="flex gap-2 mb-5 flex-wrap">
              {venue.airports.map((airport, i) => (
                <button
                  key={airport.code}
                  onClick={() => setAirportTab(i)}
                  className={`px-5 py-3 rounded-xl font-semibold transition-all duration-200 border-2 ${
                    airportTab === i
                      ? "bg-jade-600 text-white border-jade-600 shadow-md"
                      : "bg-white text-arena-700 border-arena-200 hover:border-jade-600"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">✈️</span>
                    <div className="text-left">
                      <div className="text-sm font-bold">{airport.code}</div>
                      <div className="text-xs opacity-75">{airport.distance}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {activeAirport && (
              <>
                <div className="bg-azul-50 border border-azul-200 rounded-xl p-5 mb-5">
                  <h3 className="font-display font-bold text-arena-800 mb-1">{localize(activeAirport.name, locale)}</h3>
                  <p className="text-sm text-arena-600 leading-relaxed">{localize(activeAirport.description, locale)}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {activeAirport.options.map((opt, i) => {
                    const style = safetyStyles[opt.safetyLevel];
                    return (
                      <div
                        key={i}
                        className={`rounded-2xl border-2 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${style.card}`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-4xl">{opt.icon}</span>
                            <div>
                              <h4 className="font-bold text-arena-800">{localize(opt.name, locale)}</h4>
                              <div className="flex gap-2 mt-1 flex-wrap">
                                <span className="text-xs font-semibold bg-white rounded-full px-2 py-0.5 text-arena-700 border border-arena-200">
                                  💵 {localize(opt.cost, locale)}
                                </span>
                                <span className="text-xs font-semibold bg-white rounded-full px-2 py-0.5 text-arena-700 border border-arena-200">
                                  ⏱️ {localize(opt.duration, locale)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <span className={`${style.badge} text-xs font-bold rounded-full px-2.5 py-1 whitespace-nowrap`}>
                            {style.icon} {t3(locale, style.label.es, style.label.en, style.label.fr)}
                          </span>
                        </div>
                        <p className="text-sm text-arena-700 leading-relaxed mb-2">{localize(opt.safetyNote, locale)}</p>
                        <p className="text-xs text-arena-600 bg-white/60 rounded-lg p-2 leading-relaxed">
                          💡 {localize(opt.tips, locale)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </section>
        )}

        {/* Local transport */}
        {hasLocalTransport && venue.localTransport && (
          <section id="transporte" className="mb-14 scroll-mt-20">
            <SectionHeader
              emoji="🚗"
              title={t3(locale, "Transporte en la ciudad", "Getting around the city", "Transport en ville")}
              subtitle={t3(
                locale,
                "Opciones para moverte, con nivel de seguridad por color",
                "Options to get around, color-coded by safety level",
                "Options de transport, code couleur par sécurité"
              )}
            />
            <div className="grid md:grid-cols-2 gap-4">
              {venue.localTransport.map((opt, i) => {
                const style = safetyStyles[opt.safetyLevel];
                return (
                  <div
                    key={i}
                    className={`rounded-2xl border-2 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${style.card}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{opt.icon}</span>
                        <div>
                          <h4 className="font-bold text-arena-800">{localize(opt.name, locale)}</h4>
                          <div className="flex gap-2 mt-1 flex-wrap">
                            <span className="text-xs font-semibold bg-white rounded-full px-2 py-0.5 text-arena-700 border border-arena-200">
                              💵 {localize(opt.cost, locale)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className={`${style.badge} text-xs font-bold rounded-full px-2.5 py-1 whitespace-nowrap`}>
                        {style.icon} {t3(locale, style.label.es, style.label.en, style.label.fr)}
                      </span>
                    </div>
                    <p className="text-sm text-arena-700 leading-relaxed mb-2">{localize(opt.safetyNote, locale)}</p>
                    <p className="text-xs text-arena-600 bg-white/60 rounded-lg p-2 leading-relaxed">
                      💡 {localize(opt.tips, locale)}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Safety zones */}
        {hasSafetyZones && venue.safetyZones && (
          <section id="seguridad" className="mb-14 scroll-mt-20">
            <SectionHeader
              emoji="🗺️"
              title={t3(locale, "Zonas: dónde caminar y qué evitar", "Zones: where to walk, what to avoid", "Zones : où marcher, quoi éviter")}
              subtitle={t3(
                locale,
                "Recomendaciones por colonia según horario. Verde = seguro, amarillo = precaución, rojo = evitar",
                "Neighborhood-by-neighborhood advice. Green = safe, yellow = caution, red = avoid",
                "Guide par quartier. Vert = sûr, jaune = prudence, rouge = éviter"
              )}
            />
            <div className="grid md:grid-cols-2 gap-4">
              {[...venue.safetyZones]
                .sort((a, b) => ["green", "yellow", "red"].indexOf(a.level) - ["green", "yellow", "red"].indexOf(b.level))
                .map((zone, i) => {
                  const style = safetyStyles[zone.level];
                  return (
                    <div
                      key={i}
                      className={`rounded-2xl border-2 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${style.card}`}
                    >
                      <div className="flex items-start justify-between mb-3 gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${style.dot}`} />
                          <h4 className="font-bold text-arena-800">{localize(zone.name, locale)}</h4>
                        </div>
                        <span className={`${style.badge} text-xs font-bold rounded-full px-2.5 py-1 whitespace-nowrap`}>
                          {style.icon} {t3(locale, style.label.es, style.label.en, style.label.fr)}
                        </span>
                      </div>
                      <p className="text-sm text-arena-700 leading-relaxed">{localize(zone.description, locale)}</p>
                      {zone.tip && (
                        <p className="text-xs text-arena-600 bg-white/60 rounded-lg p-2 leading-relaxed mt-3">
                          💡 {localize(zone.tip, locale)}
                        </p>
                      )}
                    </div>
                  );
                })}
            </div>
          </section>
        )}

        {/* Currency exchange */}
        {hasCurrency && venue.currency && (
          <section id="cambio" className="mb-14 scroll-mt-20">
            <SectionHeader
              emoji="💱"
              title={t3(locale, "Cambio de moneda (USD, EUR y más)", "Currency exchange (USD, EUR and more)", "Change de devises (USD, EUR)")}
              subtitle={t3(
                locale,
                "Dónde cambiar tu dinero extranjero con buena tasa y seguridad",
                "Where to exchange your foreign money with good rates and safety",
                "Où changer votre argent avec bon taux"
              )}
            />

            <div className="bg-gradient-to-r from-oro-50 to-amber-50 border border-oro-200 rounded-2xl p-5 mb-5">
              <div className="flex items-start gap-3">
                <span className="text-3xl">💡</span>
                <p className="text-sm text-arena-700 leading-relaxed">{localize(venue.currency.tip, locale)}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {venue.currency.places.map((p, i) => {
                const rate = rateQualityStyles[p.rateQuality];
                return (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border-2 border-arena-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-jade-600"
                  >
                    <div className="flex items-start justify-between mb-3 gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{placeTypeIcons[p.type]}</span>
                        <div>
                          <h4 className="font-bold text-arena-800">{p.name}</h4>
                          <p className="text-xs text-arena-500 mt-0.5">{localize(p.area, locale)}</p>
                        </div>
                      </div>
                      <span className={`${rate.badge} text-xs font-bold rounded-full px-2.5 py-1 whitespace-nowrap`}>
                        {t3(locale, rate.label.es, rate.label.en, rate.label.fr)}
                      </span>
                    </div>
                    {p.hours && (
                      <p className="text-xs text-arena-500 mb-2">
                        🕒 {p.hours}
                      </p>
                    )}
                    <p className="text-sm text-arena-700 leading-relaxed">{localize(p.note, locale)}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Nearby + map */}
        {(hasAttractions || hasMap) && (
          <section id="cerca" className="mb-14 scroll-mt-20">
            <SectionHeader
              emoji="📍"
              title={t3(locale, "Qué hay cerca del estadio", "What's nearby the stadium", "À proximité du stade")}
              subtitle={t3(
                locale,
                "Aprovecha los días entre partidos para visitar estos lugares",
                "Make the most of days between matches",
                "Profitez des jours entre les matchs"
              )}
            />

            {hasMap && (
              <div className="rounded-2xl overflow-hidden border border-arena-200 mb-6 shadow-sm">
                <iframe
                  src={venue.mapsEmbedSrc!}
                  width="100%"
                  height="380"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${venue.stadium.name}`}
                />
              </div>
            )}

            {hasAttractions && venue.nearbyAttractions && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {venue.nearbyAttractions.map((a, i) => (
                  <a
                    key={i}
                    href={a.mapsQuery ? `https://www.google.com/maps/search/?api=1&query=${a.mapsQuery}` : undefined}
                    target={a.mapsQuery ? "_blank" : undefined}
                    rel={a.mapsQuery ? "noopener noreferrer" : undefined}
                    className="group block bg-white rounded-2xl border-2 border-arena-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-jade-600"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-4xl">{a.emoji}</span>
                      <div className="text-right">
                        <div className="text-xs font-bold text-terracotta-600">{a.distance}</div>
                        <div className="text-xs text-arena-500">{localize(a.timeFromStadium, locale)}</div>
                      </div>
                    </div>
                    <h4 className="font-bold text-arena-800 group-hover:text-jade-600 transition-colors">{localize(a.name, locale)}</h4>
                    <p className="text-xs font-semibold text-jade-600 uppercase tracking-wide mb-2">
                      {localize(a.category, locale)}
                    </p>
                    <p className="text-sm text-arena-600 leading-relaxed">{localize(a.description, locale)}</p>
                    {a.mapsQuery && (
                      <p className="text-xs text-azul-600 mt-3 group-hover:underline">
                        🗺️ {t3(locale, "Ver en Google Maps", "View on Google Maps", "Voir sur Google Maps")} →
                      </p>
                    )}
                  </a>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Legacy: how to get there (if no rich data) */}
        {!hasAirports && (
          <section className="mb-14">
            <SectionHeader emoji="🚗" title={t3(locale, "Cómo llegar al estadio", "How to get to the stadium", "Comment arriver au stade")} />
            <div className="bg-azul-50 border border-azul-200 rounded-xl p-6">
              <p className="text-arena-600 leading-relaxed">{localize(venue.howToGetThere, locale)}</p>
            </div>
          </section>
        )}

        {/* Hotels */}
        <section id="hoteles" className="mb-14 scroll-mt-20">
          <SectionHeader emoji="🏨" title={t3(locale, "Dónde hospedarse", "Where to stay", "Où se loger")} />
          <div className="bg-oro-50 border border-oro-200 rounded-2xl p-6">
            <p className="text-arena-700 leading-relaxed mb-4">{localize(venue.nearbyHotels, locale)}</p>
            <Link href={`/${locale}/hoteles`} className="btn-primary inline-block">
              {t3(locale, "Buscar hoteles", "Search hotels", "Chercher des hôtels")}
            </Link>
          </div>
        </section>

        {/* Fan Zones */}
        <section id="fanzones" className="mb-14 scroll-mt-20">
          <SectionHeader emoji="🎉" title={t3(locale, "Fan Zones y ambiente", "Fan Zones & atmosphere", "Fan Zones et ambiance")} />
          <div className="bg-terracotta-50 border border-terracotta-200 rounded-2xl p-6">
            <p className="text-arena-700 leading-relaxed">{localize(venue.fanZones, locale)}</p>
          </div>
        </section>

        {/* Tips */}
        <section id="tips" className="mb-14 scroll-mt-20">
          <SectionHeader emoji="💡" title={t3(locale, "Tips para el día del partido", "Match day tips", "Conseils jour du match")} />
          <div className="grid md:grid-cols-2 gap-4">
            {venue.tips.map((tip, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-arena-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <h4 className="font-display font-bold text-arena-800 mb-2 flex items-center gap-2">
                  <span className="bg-jade-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  {localize(tip.title, locale)}
                </h4>
                <p className="text-arena-600 text-sm leading-relaxed">{localize(tip.content, locale)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Budget */}
        <section id="presupuesto" className="mb-14 scroll-mt-20">
          <div className="bg-gradient-to-r from-jade-50 via-white to-oro-50 border border-arena-200 rounded-2xl p-8 text-center">
            <span className="text-4xl">💰</span>
            <h3 className="font-display font-bold text-arena-800 text-xl mt-2 mb-2">
              {t3(locale, "Presupuesto por día de partido", "Match day budget", "Budget par jour")}
            </h3>
            <p className="text-3xl font-bold text-terracotta-600">
              {formatCurrency(venue.avgMatchDayBudget.min, budgetCurrency)} — {formatCurrency(venue.avgMatchDayBudget.max, budgetCurrency)}
            </p>
            <p className="text-xs text-arena-500 mt-2">
              {t3(locale, "Incluye transporte, comida y entrada", "Includes transport, food and ticket", "Transport, nourriture et billet inclus")}
            </p>
          </div>
        </section>

        <MercadoLibreBanner context="travel" />

        {/* Link to destination */}
        <div className="bg-gradient-to-r from-jade-500 to-azul-500 rounded-2xl p-8 text-center mt-8 shadow-lg">
          <p className="text-white text-lg mb-4">
            {destination
              ? t3(
                  locale,
                  `¿Quieres explorar más sobre ${localize(destination.name, locale)}?`,
                  `Want to explore more about ${localize(destination.name, locale)}?`,
                  `Vous voulez explorer ${localize(destination.name, locale)} ?`
                )
              : isUS
              ? t3(
                  locale,
                  `¿Vas a ${localize(venue.name, locale).split(" - ")[0]}? Planea tu viaje:`,
                  `Heading to ${localize(venue.name, locale).split(" - ")[0]}? Plan your trip:`,
                  `Tu vas à ${localize(venue.name, locale).split(" - ")[0]} ? Planifie ton voyage :`
                )
              : t3(locale, "Planea tu viaje a la sede", "Plan your trip to the venue", "Planifie ton voyage vers le stade")}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {destination && (
              <Link href={`/${locale}/destinos/${destination.slug}`} className="bg-white text-arena-800 font-semibold py-3 px-6 rounded-xl hover:bg-arena-100 transition-colors">
                {t3(locale, "Guía del destino", "Destination guide", "Guide destination")}
              </Link>
            )}
            <Link href={`/${locale}/vuelos`} className="bg-white text-arena-800 font-semibold py-3 px-6 rounded-xl hover:bg-arena-100 transition-colors">
              ✈️ {t3(locale, "Buscar vuelos", "Search flights", "Chercher des vols")}
            </Link>
            <Link href={`/${locale}/hoteles`} className="bg-white/15 backdrop-blur border border-white/30 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/25 transition-colors">
              🏨 {t3(locale, "Buscar hoteles", "Search hotels", "Chercher des hôtels")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ emoji, title, subtitle }: { emoji: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-arena-800 flex items-center gap-3">
        <span className="text-3xl">{emoji}</span>
        {title}
      </h2>
      {subtitle && <p className="text-arena-500 text-sm mt-2 md:ml-12">{subtitle}</p>}
    </div>
  );
}

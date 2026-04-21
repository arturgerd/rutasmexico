"use client";

import { useState } from "react";
import Link from "next/link";
import { Route } from "@/types/route";
import { Destination } from "@/types/destination";
import { Guide } from "@/types/guide";
import { Airport } from "@/types/airport";
import { Locale } from "@/types/common";
import { localize, formatCurrency, t3 } from "@/lib/utils";
import { TRAVEL_MODE_ICONS } from "@/lib/constants";
import { getFlightSearchGenericUrl, getCarRentalUrl } from "@/lib/affiliate";
import MapLoader from "@/components/map/MapLoader";
import StepByStepGuide from "./StepByStepGuide";
import FlightSearch from "@/components/widgets/FlightSearch";
import AirlineGrid from "@/components/widgets/AirlineGrid";
import TravelpayoutsWidget from "@/components/widgets/TravelpayoutsWidget";

interface RelatedRoute {
  slug: string;
  originName: string;
  destName: string;
}

interface RouteDetailProps {
  route: Route;
  origin: Destination;
  destination: Destination;
  guidesMap: Record<string, Guide>;
  airports: Airport[];
  locale: Locale;
  relatedRoutes?: RelatedRoute[];
  destinationSlug?: string;
}

export default function RouteDetail({ route, origin, destination, guidesMap, airports, locale, relatedRoutes = [], destinationSlug }: RouteDetailProps) {
  const [selectedOption, setSelectedOption] = useState<string>(
    route.options.find((o) => o.recommended)?.id || route.options[0]?.id || ""
  );

  const currentOption = route.options.find((o) => o.id === selectedOption);
  const currentGuide = currentOption ? guidesMap[currentOption.id] : null;

  const routePoints: [number, number][] = [
    [origin.coordinates.lat, origin.coordinates.lng],
    [destination.coordinates.lat, destination.coordinates.lng],
  ];

  const handleBooking = (mode: string) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];
    const weekLater = new Date();
    weekLater.setDate(weekLater.getDate() + 8);
    const weekStr = weekLater.toISOString().split("T")[0];

    let url = "";

    if (mode === "flight") {
      url = getFlightSearchGenericUrl({
        originIATA: origin.airportIATA,
        destIATA: destination.airportIATA,
        locale,
      });
    } else if (mode === "car") {
      url = getCarRentalUrl({
        pickupIATA: origin.airportIATA,
        pickupDate: tomorrowStr,
        returnDate: weekStr,
        locale,
      });
    } else {
      // Bus - redirect to a bus search (ADO or Busbud)
      url = `https://www.busbud.com/${locale === "es" ? "es" : "en"}/bus-${localize(origin.name, "en").toLowerCase().replace(/\s+/g, "-")}-${localize(destination.name, "en").toLowerCase().replace(/\s+/g, "-")}`;
    }

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-white border-b border-arena-200">
        <div className="container-custom py-6">
          <Link href={`/${locale}/rutas`} className="text-arena-400 hover:text-terracotta-500 text-sm mb-3 inline-block">
            ← {locale === "es" ? "Todas las rutas" : "All routes"}
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-arena-900">
              {t3(
                locale,
                `Cómo viajar de ${localize(origin.name, locale)} a ${localize(destination.name, locale)}: vuelo, autobús y auto`,
                `How to travel from ${localize(origin.name, locale)} to ${localize(destination.name, locale)}: flight, bus & car`,
                `Comment voyager de ${localize(origin.name, locale)} à ${localize(destination.name, locale)} : avion, bus et voiture`
              )}
            </h1>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Map */}
        <div className="mb-8">
          <MapLoader
            destinations={[origin, destination]}
            routePoints={routePoints}
            center={{
              lat: (origin.coordinates.lat + destination.coordinates.lat) / 2,
              lng: (origin.coordinates.lng + destination.coordinates.lng) / 2,
            }}
            zoom={6}
            height="350px"
          />
        </div>

        {/* Quick Flight Search for this route */}
        {origin.airportIATA && destination.airportIATA && (
          <div className="mb-8 bg-gradient-to-r from-azul-50 to-terracotta-50 rounded-2xl p-5 border border-arena-200">
            <h2 className="font-display text-lg font-bold text-arena-900 mb-3">
              ✈️ {locale === "es"
                ? `Buscar vuelos ${localize(origin.name, locale)} → ${localize(destination.name, locale)}`
                : `Search flights ${localize(origin.name, locale)} → ${localize(destination.name, locale)}`}
            </h2>
            <FlightSearch
              airports={airports}
              defaultOrigin={origin.airportIATA}
              defaultDest={destination.airportIATA}
              compact
            />
          </div>
        )}

        {/* Airline Price Comparison Widget */}
        {origin.airportIATA && destination.airportIATA && (
          <div className="mb-8">
            <TravelpayoutsWidget
              originIATA={origin.airportIATA}
              destIATA={destination.airportIATA}
              type="prices"
            />
          </div>
        )}

        {/* Airlines we compare (compact view) */}
        {origin.airportIATA && destination.airportIATA && (
          <div className="mb-8 bg-arena-50 rounded-2xl p-5 border border-arena-100">
            <AirlineGrid
              originIATA={origin.airportIATA}
              destIATA={destination.airportIATA}
              compact
            />
          </div>
        )}

        {/* Travel Options */}
        <h2 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {locale === "es" ? "Opciones de viaje" : "Travel options"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {route.options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`p-5 rounded-2xl border-2 text-left transition-all ${
                selectedOption === option.id
                  ? "border-terracotta-500 bg-terracotta-50 shadow-lg"
                  : "border-arena-200 bg-white hover:border-arena-300"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{TRAVEL_MODE_ICONS[option.mode]}</span>
                {option.recommended && (
                  <span className="badge bg-oro-100 text-oro-700 border border-oro-200">
                    {locale === "es" ? "Recomendado" : "Recommended"}
                  </span>
                )}
              </div>
              <h3 className="font-display font-bold text-lg text-arena-900 mb-1">
                {locale === "es"
                  ? option.mode === "flight" ? "Vuelo" : option.mode === "bus" ? "Autobús" : "Auto"
                  : option.mode === "flight" ? "Flight" : option.mode === "bus" ? "Bus" : "Car"}
              </h3>
              <p className="text-sm text-arena-500 mb-3">{localize(option.provider, locale)}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-arena-400">{locale === "es" ? "Precio" : "Price"}</p>
                  <p className="font-bold text-terracotta-600">
                    {formatCurrency(option.priceRange.min)}-{formatCurrency(option.priceRange.max)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-arena-400">{locale === "es" ? "Duración" : "Duration"}</p>
                  <p className="font-semibold text-arena-800">{localize(option.duration.label, locale)}</p>
                </div>
              </div>
              <p className="text-xs text-arena-400 mt-2">{localize(option.frequency, locale)}</p>

              {/* Real affiliate booking button */}
              <div
                className="mt-4 text-center"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBooking(option.mode);
                }}
              >
                <span className={`inline-block w-full py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all ${
                  selectedOption === option.id
                    ? "bg-terracotta-500 text-white hover:bg-terracotta-600"
                    : "bg-arena-100 text-arena-600 hover:bg-terracotta-500 hover:text-white"
                }`}>
                  {locale === "es"
                    ? option.mode === "flight" ? "✈️ Buscar vuelos" : option.mode === "bus" ? "🚌 Ver horarios" : "🚗 Rentar auto"
                    : option.mode === "flight" ? "✈️ Search flights" : option.mode === "bus" ? "🚌 View schedules" : "🚗 Rent a car"}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Step by Step Guide */}
        {currentGuide ? (
          <StepByStepGuide guide={currentGuide} locale={locale} />
        ) : (
          <div className="bg-arena-100 rounded-2xl p-8 text-center">
            <p className="text-arena-400">
              {locale === "es"
                ? "La guía paso a paso para esta opción estará disponible pronto."
                : "The step-by-step guide for this option will be available soon."}
            </p>
          </div>
        )}

        {/* Internal links — destinations and related routes */}
        {(relatedRoutes.length > 0 || destinationSlug) && (
          <section className="mt-12 pt-8 border-t border-arena-200">
            <h2 className="font-display text-2xl font-bold text-arena-900 mb-4">
              {t3(locale, "Continúa explorando", "Keep exploring", "Continuez à explorer")}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {destinationSlug && (
                <li>
                  <Link
                    href={`/${locale}/destinos/${destinationSlug}`}
                    className="block p-4 rounded-xl border border-arena-200 bg-white hover:border-terracotta-400 hover:shadow-md transition-all"
                  >
                    <span className="text-xs uppercase tracking-wide text-terracotta-500 font-semibold">
                      {t3(locale, "Guía del destino", "Destination guide", "Guide de la destination")}
                    </span>
                    <p className="mt-1 font-semibold text-arena-900">
                      {t3(
                        locale,
                        `Guía completa de ${localize(destination.name, locale)}`,
                        `Complete guide to ${localize(destination.name, locale)}`,
                        `Guide complet de ${localize(destination.name, locale)}`
                      )}
                    </p>
                  </Link>
                </li>
              )}
              {relatedRoutes.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/${locale}/rutas/${r.slug}`}
                    className="block p-4 rounded-xl border border-arena-200 bg-white hover:border-terracotta-400 hover:shadow-md transition-all"
                  >
                    <span className="text-xs uppercase tracking-wide text-azul-500 font-semibold">
                      {t3(locale, "Ruta relacionada", "Related route", "Itinéraire associé")}
                    </span>
                    <p className="mt-1 font-semibold text-arena-900">
                      {r.originName} → {r.destName}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

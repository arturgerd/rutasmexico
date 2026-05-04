"use client";

import { useState, useMemo, useId } from "react";
import { useLocale } from "next-intl";
import { Airport } from "@/types/airport";
import { Locale } from "@/types/common";
import { localize } from "@/lib/utils";
import { getFlightSearchUrl } from "@/lib/affiliate";
import { trackAffiliateClick } from "@/lib/analytics";

interface FlightSearchProps {
  airports: Airport[];
  defaultOrigin?: string; // IATA code
  defaultDest?: string; // IATA code
  compact?: boolean;
}

export default function FlightSearch({ airports, defaultOrigin = "", defaultDest = "", compact = false }: FlightSearchProps) {
  const locale = useLocale() as Locale;
  const [origin, setOrigin] = useState(defaultOrigin);
  const [destination, setDestination] = useState(defaultDest);
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [isOneWay, setIsOneWay] = useState(false);
  const idPrefix = useId();
  const originId = `${idPrefix}origin`;
  const destId = `${idPrefix}dest`;
  const departId = `${idPrefix}depart`;
  const returnId = `${idPrefix}return`;
  const paxId = `${idPrefix}pax`;

  // Default dates: tomorrow + 7 days later
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  const weekLater = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 8);
    return d.toISOString().split("T")[0];
  }, []);

  const handleSearch = () => {
    if (!origin || !destination) {
      alert(locale === "es" ? "Selecciona origen y destino" : "Select origin and destination");
      return;
    }
    if (origin === destination) {
      alert(locale === "es" ? "Origen y destino deben ser diferentes" : "Origin and destination must be different");
      return;
    }

    const url = getFlightSearchUrl({
      originIATA: origin,
      destIATA: destination,
      departDate: departDate || tomorrow,
      returnDate: isOneWay ? undefined : (returnDate || weekLater),
      passengers,
      locale,
    });

    trackAffiliateClick({
      product: "flight",
      network: "travelpayouts",
      origin,
      destination,
    });

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const swapAirports = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  // Sort airports: popular first, then alphabetical
  const popularCodes = ["MEX", "CUN", "GDL", "MTY", "TIJ", "SJD", "PVR", "MID"];
  const sortedAirports = useMemo(() => {
    return [...airports].sort((a, b) => {
      const aPopular = popularCodes.indexOf(a.iata);
      const bPopular = popularCodes.indexOf(b.iata);
      if (aPopular >= 0 && bPopular >= 0) return aPopular - bPopular;
      if (aPopular >= 0) return -1;
      if (bPopular >= 0) return 1;
      return localize(a.city, locale).localeCompare(localize(b.city, locale));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [airports, locale]);

  if (compact) {
    return (
      <div className="flex flex-col sm:flex-row gap-2">
        <label htmlFor={originId} className="sr-only">{locale === "es" ? "Origen" : "Origin"}</label>
        <select
          id={originId}
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="flex-1 p-2 bg-white border border-arena-200 rounded-lg text-sm text-arena-800 focus:ring-2 focus:ring-terracotta-500/50"
        >
          <option value="">{locale === "es" ? "✈️ Origen" : "✈️ Origin"}</option>
          {sortedAirports.map((a) => (
            <option key={a.iata} value={a.iata}>
              {a.iata} - {localize(a.city, locale)}
            </option>
          ))}
        </select>
        <label htmlFor={destId} className="sr-only">{locale === "es" ? "Destino" : "Destination"}</label>
        <select
          id={destId}
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="flex-1 p-2 bg-white border border-arena-200 rounded-lg text-sm text-arena-800 focus:ring-2 focus:ring-terracotta-500/50"
        >
          <option value="">{locale === "es" ? "🛬 Destino" : "🛬 Destination"}</option>
          {sortedAirports.map((a) => (
            <option key={a.iata} value={a.iata}>
              {a.iata} - {localize(a.city, locale)}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="bg-terracotta-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-terracotta-600 transition-colors whitespace-nowrap"
        >
          {locale === "es" ? "Encuentra vuelo barato" : "Find cheapest flight"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Trip type toggle */}
      <div className="flex gap-4 items-center">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={!isOneWay}
            onChange={() => setIsOneWay(false)}
            className="text-terracotta-500 focus:ring-terracotta-500"
          />
          <span className="text-sm text-arena-700">{locale === "es" ? "Ida y vuelta" : "Round trip"}</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={isOneWay}
            onChange={() => setIsOneWay(true)}
            className="text-terracotta-500 focus:ring-terracotta-500"
          />
          <span className="text-sm text-arena-700">{locale === "es" ? "Solo ida" : "One way"}</span>
        </label>
      </div>

      {/* Airport selectors */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-end">
        <div>
          <label htmlFor={originId} className="block text-xs font-semibold text-arena-500 mb-1">
            {locale === "es" ? "Origen" : "Origin"}
          </label>
          <select
            id={originId}
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50 focus:border-terracotta-500"
          >
            <option value="">{locale === "es" ? "✈️ Selecciona aeropuerto" : "✈️ Select airport"}</option>
            {sortedAirports.map((a) => (
              <option key={a.iata} value={a.iata}>
                {a.iata} - {localize(a.city, locale)} ({localize(a.state, locale)})
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={swapAirports}
          aria-label={locale === "es" ? "Intercambiar origen y destino" : "Swap origin and destination"}
          className="hidden md:flex w-10 h-10 rounded-full bg-arena-100 hover:bg-terracotta-100 items-center justify-center transition-colors mb-0.5"
          title={locale === "es" ? "Intercambiar" : "Swap"}
        >
          <svg className="w-5 h-5 text-arena-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>

        <div>
          <label htmlFor={destId} className="block text-xs font-semibold text-arena-500 mb-1">
            {locale === "es" ? "Destino" : "Destination"}
          </label>
          <select
            id={destId}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50 focus:border-terracotta-500"
          >
            <option value="">{locale === "es" ? "🛬 Selecciona aeropuerto" : "🛬 Select airport"}</option>
            {sortedAirports.map((a) => (
              <option key={a.iata} value={a.iata}>
                {a.iata} - {localize(a.city, locale)} ({localize(a.state, locale)})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dates and passengers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <label htmlFor={departId} className="block text-xs font-semibold text-arena-500 mb-1">
            {locale === "es" ? "Fecha de ida" : "Departure date"}
          </label>
          <input
            id={departId}
            type="date"
            value={departDate || tomorrow}
            onChange={(e) => setDepartDate(e.target.value)}
            min={tomorrow}
            className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50 focus:border-terracotta-500"
          />
        </div>

        {!isOneWay && (
          <div>
            <label htmlFor={returnId} className="block text-xs font-semibold text-arena-500 mb-1">
              {locale === "es" ? "Fecha de regreso" : "Return date"}
            </label>
            <input
              id={returnId}
              type="date"
              value={returnDate || weekLater}
              onChange={(e) => setReturnDate(e.target.value)}
              min={departDate || tomorrow}
              className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50 focus:border-terracotta-500"
            />
          </div>
        )}

        <div>
          <label htmlFor={paxId} className="block text-xs font-semibold text-arena-500 mb-1">
            {locale === "es" ? "Pasajeros" : "Passengers"}
          </label>
          <select
            id={paxId}
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50 focus:border-terracotta-500"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {locale === "es" ? (n === 1 ? "pasajero" : "pasajeros") : (n === 1 ? "passenger" : "passengers")}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleSearch}
            className="w-full btn-primary py-3 text-base"
          >
            ✈️ {locale === "es" ? "Encuentra el vuelo más barato" : "Find the cheapest flight"}
          </button>
        </div>
      </div>

      {/* Airlines info */}
      <p className="text-xs text-arena-400 text-center">
        {locale === "es"
          ? "Compara precios de Volaris, VivaAerobus, Aeroméxico y más aerolíneas"
          : "Compare prices from Volaris, VivaAerobus, Aeromexico and more airlines"}
      </p>
    </div>
  );
}

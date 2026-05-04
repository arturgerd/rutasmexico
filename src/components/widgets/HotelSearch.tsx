"use client";

import { useState, useMemo, useId } from "react";
import { useLocale } from "next-intl";
import { Airport } from "@/types/airport";
import { Locale } from "@/types/common";
import { localize } from "@/lib/utils";
import { getHotelSearchUrl } from "@/lib/affiliate";
import { trackAffiliateClick } from "@/lib/analytics";

interface HotelSearchProps {
  airports: Airport[]; // Usamos aeropuertos como lista de ciudades
  defaultCity?: string;
  compact?: boolean;
}

export default function HotelSearch({ airports, defaultCity = "", compact = false }: HotelSearchProps) {
  const locale = useLocale() as Locale;
  const [city, setCity] = useState(defaultCity);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const idPrefix = useId();
  const cityId = `${idPrefix}city`;
  const inId = `${idPrefix}in`;
  const outId = `${idPrefix}out`;
  const guestsId = `${idPrefix}guests`;

  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  const threeDaysLater = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().split("T")[0];
  }, []);

  // Deduplicate cities (some cities have multiple airports)
  const cities = useMemo(() => {
    const seen = new Set<string>();
    return airports.filter((a) => {
      const cityName = localize(a.city, locale);
      if (seen.has(cityName)) return false;
      seen.add(cityName);
      return true;
    });
  }, [airports, locale]);

  const handleSearch = () => {
    if (!city) {
      alert(locale === "es" ? "Selecciona una ciudad" : "Select a city");
      return;
    }

    const selectedAirport = airports.find((a) => a.iata === city);
    if (!selectedAirport) return;

    const cityNameEn = localize(selectedAirport.city, "en");
    const url = getHotelSearchUrl({
      cityName: cityNameEn,
      checkIn: checkIn || tomorrow,
      checkOut: checkOut || threeDaysLater,
      adults,
      locale,
    });

    trackAffiliateClick({
      product: "hotel",
      network: "travelpayouts",
      destination: cityNameEn,
    });

    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (compact) {
    return (
      <div className="flex flex-col sm:flex-row gap-2">
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 p-2 bg-white border border-arena-200 rounded-lg text-sm text-arena-800 focus:ring-2 focus:ring-terracotta-500/50"
        >
          <option value="">{locale === "es" ? "🏨 Ciudad" : "🏨 City"}</option>
          {cities.map((a) => (
            <option key={a.iata} value={a.iata}>
              {localize(a.city, locale)}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="bg-terracotta-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-terracotta-600 transition-colors whitespace-nowrap"
        >
          {locale === "es" ? "Encuentra hotel barato" : "Find cheapest hotel"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <label htmlFor={cityId} className="block text-xs font-semibold text-arena-500 mb-1">
            {locale === "es" ? "Ciudad" : "City"}
          </label>
          <select
            id={cityId}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50 focus:border-terracotta-500"
          >
            <option value="">{locale === "es" ? "🏨 Selecciona ciudad" : "🏨 Select city"}</option>
            {cities.map((a) => (
              <option key={a.iata} value={a.iata}>
                {localize(a.city, locale)}, {localize(a.state, locale)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={inId} className="block text-xs font-semibold text-arena-500 mb-1">
            {locale === "es" ? "Llegada" : "Check-in"}
          </label>
          <input
            id={inId}
            type="date"
            value={checkIn || tomorrow}
            onChange={(e) => setCheckIn(e.target.value)}
            min={tomorrow}
            className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50 focus:border-terracotta-500"
          />
        </div>

        <div>
          <label htmlFor={outId} className="block text-xs font-semibold text-arena-500 mb-1">
            {locale === "es" ? "Salida" : "Check-out"}
          </label>
          <input
            id={outId}
            type="date"
            value={checkOut || threeDaysLater}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn || tomorrow}
            className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50 focus:border-terracotta-500"
          />
        </div>

        <div>
          <label htmlFor={guestsId} className="block text-xs font-semibold text-arena-500 mb-1">
            {locale === "es" ? "Huéspedes" : "Guests"}
          </label>
          <select
            id={guestsId}
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50 focus:border-terracotta-500"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} {locale === "es" ? (n === 1 ? "huésped" : "huéspedes") : (n === 1 ? "guest" : "guests")}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3">
        <button
          onClick={handleSearch}
          className="w-full btn-primary py-3 text-base"
        >
          🏨 {locale === "es" ? "Encuentra el hotel más barato" : "Find the cheapest hotel"}
        </button>
      </div>

      <p className="text-xs text-arena-400 text-center">
        {locale === "es"
          ? "Compara precios de Booking.com, Expedia, Hotels.com y más"
          : "Compare prices from Booking.com, Expedia, Hotels.com and more"}
      </p>
    </div>
  );
}

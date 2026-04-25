"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Airport } from "@/types/airport";
import { Locale } from "@/types/common";
import { localize } from "@/lib/utils";
import { getCarRentalUrl } from "@/lib/affiliate";
import { trackAffiliateClick } from "@/lib/analytics";

interface CarRentalSearchProps {
  airports: Airport[];
  defaultPickup?: string; // IATA code
  compact?: boolean;
}

export default function CarRentalSearch({ airports, defaultPickup = "", compact = false }: CarRentalSearchProps) {
  const locale = useLocale() as Locale;
  const [pickup, setPickup] = useState(defaultPickup);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

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

  // Major rental cities (airports with car rental availability)
  const rentalCities = useMemo(() => {
    const seen = new Set<string>();
    return airports.filter((a) => {
      const cityName = localize(a.city, locale);
      if (seen.has(cityName)) return false;
      seen.add(cityName);
      return true;
    });
  }, [airports, locale]);

  const handleSearch = () => {
    if (!pickup) {
      alert(locale === "es" ? "Selecciona lugar de recogida" : "Select pickup location");
      return;
    }

    const url = getCarRentalUrl({
      pickupIATA: pickup,
      pickupDate: pickupDate || tomorrow,
      returnDate: returnDate || weekLater,
      locale,
    });

    trackAffiliateClick({ product: "car", network: "travelpayouts", origin: pickup });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (compact) {
    return (
      <div className="flex flex-col sm:flex-row gap-2">
        <select
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className="flex-1 p-2 bg-white border border-arena-200 rounded-lg text-sm text-arena-800 focus:ring-2 focus:ring-terracotta-500/50"
        >
          <option value="">{locale === "es" ? "🚗 Recoger en" : "🚗 Pick up at"}</option>
          {rentalCities.map((a) => (
            <option key={a.iata} value={a.iata}>
              {localize(a.city, locale)}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="bg-terracotta-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-terracotta-600 transition-colors whitespace-nowrap"
        >
          {locale === "es" ? "Buscar autos" : "Search cars"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-semibold text-arena-500 mb-1">
            {locale === "es" ? "Lugar de recogida" : "Pick-up location"}
          </label>
          <select
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50 focus:border-terracotta-500"
          >
            <option value="">{locale === "es" ? "🚗 Selecciona aeropuerto" : "🚗 Select airport"}</option>
            {rentalCities.map((a) => (
              <option key={a.iata} value={a.iata}>
                {a.iata} - {localize(a.city, locale)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-arena-500 mb-1">
            {locale === "es" ? "Fecha de recogida" : "Pick-up date"}
          </label>
          <input
            type="date"
            value={pickupDate || tomorrow}
            onChange={(e) => setPickupDate(e.target.value)}
            min={tomorrow}
            className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50 focus:border-terracotta-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-arena-500 mb-1">
            {locale === "es" ? "Fecha de devolución" : "Return date"}
          </label>
          <input
            type="date"
            value={returnDate || weekLater}
            onChange={(e) => setReturnDate(e.target.value)}
            min={pickupDate || tomorrow}
            className="w-full p-3 bg-arena-50 rounded-xl border border-arena-200 text-arena-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50 focus:border-terracotta-500"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={handleSearch}
            className="w-full btn-primary py-3 text-base"
          >
            🚗 {locale === "es" ? "Buscar autos" : "Search cars"}
          </button>
        </div>
      </div>

      <p className="text-xs text-arena-400 text-center">
        {locale === "es"
          ? "Compara 500+ empresas: Hertz, Avis, National, Budget y más. 70% descuentos"
          : "Compare 500+ companies: Hertz, Avis, National, Budget and more. Up to 70% off"}
      </p>
    </div>
  );
}

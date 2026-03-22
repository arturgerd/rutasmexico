"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Airport } from "@/types/airport";
import { Locale } from "@/types/common";
import FlightSearch from "./FlightSearch";
import HotelSearch from "./HotelSearch";
import CarRentalSearch from "./CarRentalSearch";

interface TravelSearchTabsProps {
  airports: Airport[];
}

type Tab = "flights" | "hotels" | "cars";

export default function TravelSearchTabs({ airports }: TravelSearchTabsProps) {
  const locale = useLocale() as Locale;
  const [activeTab, setActiveTab] = useState<Tab>("flights");

  const tabs: { id: Tab; icon: string; label: { es: string; en: string } }[] = [
    { id: "flights", icon: "✈️", label: { es: "Vuelos", en: "Flights" } },
    { id: "hotels", icon: "🏨", label: { es: "Hoteles", en: "Hotels" } },
    { id: "cars", icon: "🚗", label: { es: "Renta de Autos", en: "Car Rental" } },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl mx-auto overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-arena-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 font-semibold text-sm transition-all ${
              activeTab === tab.id
                ? "text-terracotta-600 border-b-2 border-terracotta-500 bg-terracotta-50/50"
                : "text-arena-500 hover:text-arena-700 hover:bg-arena-50"
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span>{tab.label[locale]}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        {activeTab === "flights" && <FlightSearch airports={airports} />}
        {activeTab === "hotels" && <HotelSearch airports={airports} />}
        {activeTab === "cars" && <CarRentalSearch airports={airports} />}
      </div>
    </div>
  );
}

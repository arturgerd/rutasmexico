"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { useLocale } from "next-intl";
import { Airport } from "@/types/airport";
import { Locale } from "@/types/common";
import FlightSearch from "./FlightSearch";
import HotelSearch from "./HotelSearch";
import CarRentalSearch from "./CarRentalSearch";
import Icon from "@/components/ui/Icon";

interface TravelSearchTabsProps {
  airports: Airport[];
}

type Tab = "flights" | "hotels" | "cars";

export default function TravelSearchTabs({ airports }: TravelSearchTabsProps) {
  const locale = useLocale() as Locale;
  const [activeTab, setActiveTab] = useState<Tab>("flights");
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({ flights: null, hotels: null, cars: null });

  const tabs: { id: Tab; icon: "plane" | "hotel" | "car"; label: { es: string; en: string }; shortLabel: { es: string; en: string } }[] = [
    { id: "flights", icon: "plane", label: { es: "Vuelos", en: "Flights" }, shortLabel: { es: "Vuelos", en: "Flights" } },
    { id: "hotels", icon: "hotel", label: { es: "Hoteles", en: "Hotels" }, shortLabel: { es: "Hoteles", en: "Hotels" } },
    { id: "cars", icon: "car", label: { es: "Renta de Autos", en: "Car Rental" }, shortLabel: { es: "Autos", en: "Cars" } },
  ];

  const tablistLabel = locale === "es" ? "Tipo de búsqueda" : "Search type";

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    let nextIdx = idx;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % tabs.length;
    if (e.key === "ArrowLeft") nextIdx = (idx - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") nextIdx = 0;
    if (e.key === "End") nextIdx = tabs.length - 1;
    const nextTab = tabs[nextIdx].id;
    setActiveTab(nextTab);
    tabRefs.current[nextTab]?.focus();
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl mx-auto overflow-hidden">
      {/* Tabs */}
      <div role="tablist" aria-label={tablistLabel} className="flex border-b border-arena-200">
        {tabs.map((tab, idx) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[tab.id] = el; }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-2 sm:px-4 font-semibold text-sm transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-terracotta-500 ${
                isActive
                  ? "text-terracotta-600 border-b-2 border-terracotta-500 bg-terracotta-50/50"
                  : "text-arena-700 hover:text-terracotta-600 hover:bg-arena-50"
              }`}
            >
              <Icon name={tab.icon} className="w-5 h-5" />
              <span className="sm:hidden">{tab.shortLabel[locale]}</span>
              <span className="hidden sm:inline">{tab.label[locale]}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="p-4 md:p-6"
      >
        {activeTab === "flights" && <FlightSearch airports={airports} />}
        {activeTab === "hotels" && <HotelSearch airports={airports} />}
        {activeTab === "cars" && <CarRentalSearch airports={airports} />}
      </div>
    </div>
  );
}

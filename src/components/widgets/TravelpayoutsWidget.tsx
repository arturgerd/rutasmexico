"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Locale } from "@/types/common";
import { AFFILIATE_CONFIG, getFlightSearchUrl } from "@/lib/affiliate";

interface TravelpayoutsWidgetProps {
  originIATA: string;
  destIATA: string;
  type?: "calendar" | "prices" | "search";
}

/**
 * Embeds Travelpayouts widgets for real-time flight price comparison.
 * Shows prices from ALL airlines including Volaris, VivaAerobus, Aeroméxico, TAR, etc.
 * Commission is earned when users book through these widgets.
 */
export default function TravelpayoutsWidget({ originIATA, destIATA, type = "calendar" }: TravelpayoutsWidgetProps) {
  const locale = useLocale() as Locale;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const marker = AFFILIATE_CONFIG.travelpayouts.marker;
  const isConfigured = marker !== "TU_MARKER_TRAVELPAYOUTS";

  useEffect(() => {
    if (!containerRef.current || !isConfigured) {
      setIsLoading(false);
      return;
    }

    const container = containerRef.current;
    container.innerHTML = "";

    // Create the widget container
    const widgetDiv = document.createElement("div");
    widgetDiv.id = `tp-widget-${type}-${originIATA}-${destIATA}`;
    container.appendChild(widgetDiv);

    // Load the Travelpayouts widget script
    const script = document.createElement("script");
    script.async = true;
    script.charset = "UTF-8";

    if (type === "calendar") {
      // Price calendar widget - shows cheapest prices per day
      script.src = `https://tp.media/content?promo_id=4023&shmarker=${marker}&campaign_id=100&trs=258809&search_hotel=&hotel_id=0&origin=${originIATA}&destination=${destIATA}&locale=${locale}&currency=mxn&powered_by=true`;
    } else if (type === "prices") {
      // Cheapest flights table widget - shows prices by airline
      script.src = `https://tp.media/content?promo_id=3986&shmarker=${marker}&campaign_id=100&trs=258809&origin=${originIATA}&destination=${destIATA}&locale=${locale}&currency=mxn&direct=false&stops=0&limit=10&powered_by=true`;
    } else {
      // Search form widget
      script.src = `https://tp.media/content?promo_id=4132&shmarker=${marker}&campaign_id=100&trs=258809&origin=${originIATA}&destination=${destIATA}&locale=${locale}&currency=mxn&powered_by=true`;
    }

    script.onload = () => setIsLoading(false);
    script.onerror = () => setIsLoading(false);
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [originIATA, destIATA, type, locale, marker, isConfigured]);

  // If Travelpayouts marker is not configured, show a beautiful fallback
  if (!isConfigured) {
    return <FallbackPriceComparison originIATA={originIATA} destIATA={destIATA} locale={locale} />;
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-arena-200 bg-white">
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta-500" />
          <span className="ml-3 text-arena-400 text-sm">
            {locale === "es" ? "Cargando precios en tiempo real..." : "Loading real-time prices..."}
          </span>
        </div>
      )}
      <div ref={containerRef} className="min-h-[200px]" />
    </div>
  );
}

/**
 * Beautiful fallback when Travelpayouts marker is not yet configured.
 * Shows airline comparison cards with "search" buttons that redirect to Aviasales.
 */
function FallbackPriceComparison({ originIATA, destIATA, locale }: { originIATA: string; destIATA: string; locale: Locale }) {
  const airlines = [
    { name: "Volaris", color: "bg-purple-500", icon: "🟣", estimate: { min: 800, max: 2500 } },
    { name: "VivaAerobus", color: "bg-yellow-500", icon: "🟡", estimate: { min: 700, max: 2200 } },
    { name: "Aeroméxico", color: "bg-blue-700", icon: "🔵", estimate: { min: 1200, max: 4500 } },
    { name: "TAR", color: "bg-green-600", icon: "🟢", estimate: { min: 1500, max: 3500 } },
  ];

  const handleSearch = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];
    const weekLater = new Date();
    weekLater.setDate(weekLater.getDate() + 8);
    const weekStr = weekLater.toISOString().split("T")[0];

    const url = getFlightSearchUrl({
      originIATA,
      destIATA,
      departDate: tomorrowStr,
      returnDate: weekStr,
      locale,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-white rounded-2xl border border-arena-200 overflow-hidden">
      <div className="bg-gradient-to-r from-azul-600 to-terracotta-500 px-5 py-3">
        <h3 className="font-display font-bold text-white text-sm flex items-center gap-2">
          ✈️ {locale === "es"
            ? `Comparar vuelos ${originIATA} → ${destIATA}`
            : `Compare flights ${originIATA} → ${destIATA}`}
        </h3>
      </div>

      <div className="p-4 space-y-2">
        {airlines.map((airline) => (
          <div
            key={airline.name}
            className="flex items-center justify-between p-3 rounded-xl bg-arena-50 hover:bg-arena-100 transition-colors group cursor-pointer"
            onClick={handleSearch}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{airline.icon}</span>
              <div>
                <p className="font-semibold text-arena-900 text-sm">{airline.name}</p>
                <p className="text-xs text-arena-400">
                  {locale === "es" ? "Precio estimado" : "Estimated price"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-terracotta-600 text-sm">
                ${airline.estimate.min.toLocaleString()}-${airline.estimate.max.toLocaleString()} MXN
              </p>
              <p className="text-xs text-terracotta-400 group-hover:text-terracotta-600 transition-colors">
                {locale === "es" ? "Ver precio real →" : "See real price →"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 pt-0">
        <button
          onClick={handleSearch}
          className="w-full btn-primary py-3 text-sm font-bold"
        >
          ✈️ {locale === "es"
            ? "Comparar TODAS las aerolíneas"
            : "Compare ALL airlines"}
        </button>
        <p className="text-center text-xs text-arena-400 mt-2">
          {locale === "es"
            ? "Precios actualizados en tiempo real • Volaris, VivaAerobus, Aeroméxico, TAR y +10 aerolíneas"
            : "Real-time updated prices • Volaris, VivaAerobus, Aeromexico, TAR and 10+ airlines"}
        </p>
      </div>
    </div>
  );
}

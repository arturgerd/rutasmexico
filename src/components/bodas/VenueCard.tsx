"use client";

import Image from "next/image";
import { WeddingVenue } from "@/types/boda";
import { Locale } from "@/types/common";
import { localize, formatCurrency } from "@/lib/utils";

const typeLabels: Record<string, { es: string; en: string }> = {
  hotel: { es: "Hotel / Resort", en: "Hotel / Resort" },
  playa: { es: "Playa", en: "Beach" },
  hacienda: { es: "Hacienda", en: "Hacienda" },
  parque: { es: "Parque", en: "Park" },
  restaurante: { es: "Restaurante", en: "Restaurant" },
};

interface VenueCardProps {
  venue: WeddingVenue;
  locale: Locale;
}

export default function VenueCard({ venue, locale }: VenueCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-arena-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={venue.image}
          alt={venue.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          <span className="bg-white/90 text-arena-700 text-xs font-medium px-2 py-0.5 rounded-full">
            {typeLabels[venue.type]?.[locale] || venue.type}
          </span>
          {venue.lgbtqFriendly && (
            <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              LGBTIQ+
            </span>
          )}
          {venue.accessibilityFeatures.length > 0 && (
            <span className="bg-azul-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
              {locale === "es" ? "Accesible" : "Accessible"}
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-arena-900 text-lg">{venue.name}</h3>
        <p className="text-arena-600 text-sm mt-1 line-clamp-3">
          {localize(venue.description, locale)}
        </p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-arena-100">
          <div>
            <p className="text-xs text-arena-400">
              {locale === "es" ? "Capacidad" : "Capacity"}
            </p>
            <p className="text-sm font-semibold text-arena-700">
              {venue.capacity.min}-{venue.capacity.max} {locale === "es" ? "personas" : "guests"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-arena-400">
              {locale === "es" ? "Desde" : "From"}
            </p>
            <p className="text-sm font-bold text-terracotta-600">
              {formatCurrency(venue.priceRange.min)}
            </p>
          </div>
        </div>
        {venue.highlights.length > 0 && (
          <ul className="mt-3 space-y-1">
            {venue.highlights.slice(0, 3).map((h, i) => (
              <li key={i} className="text-xs text-arena-500 flex items-start gap-1">
                <span className="text-terracotta-400 mt-0.5">&#10003;</span>
                {localize(h, locale)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

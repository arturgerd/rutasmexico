"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { Destination } from "@/types/destination";
import { localize, formatCurrency } from "@/lib/utils";
import { Locale } from "@/types/common";

interface DestinationGridProps {
  destinations: Destination[];
}

export default function DestinationGrid({ destinations }: DestinationGridProps) {
  const locale = useLocale() as Locale;

  const regionColors: Record<string, string> = {
    centro: "bg-azul-100 text-azul-700",
    norte: "bg-arena-200 text-arena-700",
    sur: "bg-jade-500/10 text-jade-600",
    peninsula: "bg-terracotta-100 text-terracotta-700",
    pacifico: "bg-oro-100 text-oro-700",
    golfo: "bg-azul-100 text-azul-600",
    bajio: "bg-terracotta-100 text-terracotta-600",
  };

  const regionEmojis: Record<string, string> = {
    centro: "🏛️",
    norte: "🏜️",
    sur: "🌿",
    peninsula: "🏖️",
    pacifico: "🌊",
    golfo: "⛵",
    bajio: "⛪",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {destinations.map((dest) => (
        <Link
          key={dest.id}
          href={`/${locale}/destinos/${dest.slug}`}
          className="card group"
        >
          <div className="h-44 bg-gradient-to-br from-terracotta-400 to-azul-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl opacity-30">
              {regionEmojis[dest.region] || "🗺️"}
            </div>
            <div className="absolute bottom-3 left-3">
              <span className={`badge ${regionColors[dest.region] || "bg-arena-100 text-arena-600"}`}>
                {localize(dest.state, locale)}
              </span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-display font-bold text-arena-900 group-hover:text-terracotta-500 transition-colors">
              {localize(dest.name, locale)}
            </h3>
            <p className="text-arena-500 text-sm mt-1 line-clamp-2">
              {localize(dest.description, locale)}
            </p>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-arena-400">{dest.shortName}</span>
              <span className="font-semibold text-terracotta-600">
                {formatCurrency(dest.averageDailyBudget.min)}/{locale === "es" ? "día" : "day"}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

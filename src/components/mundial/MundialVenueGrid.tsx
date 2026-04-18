"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { MundialVenue } from "@/types/mundial";
import { localize, formatCurrency, t3 } from "@/lib/utils";
import { Locale } from "@/types/common";

interface MundialVenueGridProps {
  venues: MundialVenue[];
}

export default function MundialVenueGrid({ venues }: MundialVenueGridProps) {
  const locale = useLocale() as Locale;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {venues.map((venue) => {
        const mexicoGames = venue.matches.filter((m) => m.isMexicoGame);
        const totalMatches = venue.matches.length;

        return (
          <Link
            key={venue.id}
            href={`/${locale}/mundial/${venue.slug}`}
            className="card group transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Stadium color bar */}
            <div className="h-3 bg-gradient-to-r from-jade-500 via-white to-terracotta-500" />

            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🏟️</span>
                <div>
                  <h3 className="font-display font-bold text-arena-800 text-lg">
                    {localize(venue.name, locale)}
                  </h3>
                  <p className="text-sm text-arena-500">{venue.stadium.name} • {venue.stadium.capacity.toLocaleString()} {t3(locale, "asientos", "seats", "places")}</p>
                </div>
              </div>

              {/* Mexico games highlight */}
              {mexicoGames.length > 0 && (
                <div className="bg-jade-50 border border-jade-200 rounded-lg p-3 mb-4">
                  <p className="text-xs font-bold text-jade-700 uppercase mb-2">🇲🇽 {t3(locale, "Partidos de México", "Mexico matches", "Matchs du Mexique")}</p>
                  {mexicoGames.map((match, i) => (
                    <p key={i} className="text-sm text-jade-600">
                      {match.date.slice(5)} • {localize(match.teamA, locale)} vs {localize(match.teamB, locale)}
                    </p>
                  ))}
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-arena-400 mt-3">
                <span>⚽ {totalMatches} {t3(locale, "partidos", "matches", "matchs")}</span>
                <span className="font-semibold text-terracotta-600 bg-terracotta-50 px-2 py-0.5 rounded-full">
                  {t3(locale, "Desde", "From", "Dès")} {formatCurrency(venue.avgMatchDayBudget.min)}/{t3(locale, "día", "day", "jour")}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

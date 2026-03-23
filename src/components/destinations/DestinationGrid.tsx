"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Destination } from "@/types/destination";
import { localize, formatCurrency } from "@/lib/utils";
import { Locale } from "@/types/common";
import { getDestinationImage } from "@/lib/destination-images";

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {destinations.map((dest) => {
        const image = getDestinationImage(dest.id);
        return (
          <Link
            key={dest.id}
            href={`/${locale}/destinos/${dest.slug}`}
            className="card group transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="h-52 relative overflow-hidden">
              <Image
                src={image.url}
                alt={image.alt[locale]}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute top-3 right-3">
                <span className={`badge ${regionColors[dest.region] || "bg-arena-100 text-arena-600"} backdrop-blur-sm`}>
                  {localize(dest.state, locale)}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="font-display font-bold text-white text-lg drop-shadow-lg">
                  {localize(dest.name, locale)}
                </h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-arena-500 text-sm line-clamp-2">
                {localize(dest.description, locale)}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-arena-400 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {dest.shortName}
                </span>
                <span className="font-semibold text-terracotta-600 bg-terracotta-50 px-2 py-0.5 rounded-full">
                  {formatCurrency(dest.averageDailyBudget.min)}/{locale === "es" ? "día" : "day"}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

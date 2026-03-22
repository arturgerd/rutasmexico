"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Destination } from "@/types/destination";
import { localize, formatCurrency } from "@/lib/utils";
import { Locale } from "@/types/common";

interface FeaturedDestinationsProps {
  destinations: Destination[];
}

export default function FeaturedDestinations({ destinations }: FeaturedDestinationsProps) {
  const t = useTranslations("home");
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
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-arena-900 mb-3">
            {t("featuredTitle")}
          </h2>
          <p className="text-arena-500 text-lg">{t("featuredSubtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/${locale}/destinos/${dest.slug}`}
              className="card group"
            >
              {/* Image placeholder */}
              <div className="h-48 bg-gradient-to-br from-terracotta-400 to-azul-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-3 left-3">
                  <span className={`badge ${regionColors[dest.region] || "bg-arena-100 text-arena-600"}`}>
                    {localize(dest.state, locale)}
                  </span>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl opacity-30">
                  🏛️
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-lg text-arena-900 group-hover:text-terracotta-500 transition-colors">
                  {localize(dest.name, locale)}
                </h3>
                <p className="text-arena-500 text-sm mt-2 line-clamp-2">
                  {localize(dest.description, locale)}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-arena-400">
                    {locale === "es" ? "Presupuesto diario" : "Daily budget"}
                  </span>
                  <span className="text-sm font-semibold text-terracotta-600">
                    {formatCurrency(dest.averageDailyBudget.min)} - {formatCurrency(dest.averageDailyBudget.max)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

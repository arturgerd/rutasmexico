"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Destination } from "@/types/destination";
import { localize, formatCurrency } from "@/lib/utils";
import { Locale } from "@/types/common";
import { getDestinationImage } from "@/lib/destination-images";

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
    <section className="py-16 bg-gradient-to-b from-arena-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-terracotta-100 text-terracotta-700 rounded-full text-sm font-semibold mb-4">
            {locale === "es" ? "Destinos populares" : "Popular destinations"}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-arena-900 mb-3">
            {t("featuredTitle")}
          </h2>
          <p className="text-arena-500 text-lg max-w-2xl mx-auto">{t("featuredSubtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, index) => {
            const image = getDestinationImage(dest.id);
            const isLarge = index === 0;
            return (
              <Link
                key={dest.id}
                href={`/${locale}/destinos/${dest.slug}`}
                className={`card group transform hover:-translate-y-1 transition-all duration-300 ${isLarge ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className={`${isLarge ? "h-64" : "h-52"} relative overflow-hidden`}>
                  <Image
                    src={image.url}
                    alt={image.alt[locale]}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className={`badge ${regionColors[dest.region] || "bg-arena-100 text-arena-600"} backdrop-blur-sm`}>
                      {localize(dest.state, locale)}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display font-bold text-xl text-white drop-shadow-lg group-hover:text-oro-300 transition-colors">
                      {localize(dest.name, locale)}
                    </h3>
                    <p className="text-white/80 text-sm mt-1 line-clamp-2 drop-shadow">
                      {localize(dest.description, locale)}
                    </p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-xs text-arena-400 flex items-center gap-1">
                    💰 {locale === "es" ? "Presupuesto diario" : "Daily budget"}
                  </span>
                  <span className="text-sm font-bold text-terracotta-600 bg-terracotta-50 px-3 py-1 rounded-full">
                    {formatCurrency(dest.averageDailyBudget.min)} - {formatCurrency(dest.averageDailyBudget.max)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View all button */}
        <div className="text-center mt-10">
          <Link
            href={`/${locale}/destinos`}
            className="btn-primary inline-flex items-center gap-2"
          >
            {locale === "es" ? "Ver todos los destinos" : "View all destinations"}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

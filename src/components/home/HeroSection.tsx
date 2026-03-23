"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Airport } from "@/types/airport";
import TravelSearchTabs from "@/components/widgets/TravelSearchTabs";
import { PAGE_HERO_IMAGES } from "@/lib/destination-images";

interface HeroSectionProps {
  airports: Airport[];
}

export default function HeroSection({ airports }: HeroSectionProps) {
  const t = useTranslations("home");

  return (
    <section className="relative overflow-hidden min-h-[600px] md:min-h-[650px] flex items-center">
      {/* Background image */}
      <Image
        src={PAGE_HERO_IMAGES.home}
        alt="Mexico travel destinations"
        fill
        className="object-cover"
        priority
        quality={85}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      {/* Color overlay for brand feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-terracotta-600/30 to-azul-900/40" />

      {/* Decorative blur elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-oro-400/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
            <span className="text-lg">🇲🇽</span>
            <span className="text-white text-sm font-medium">
              {t("heroTitle").includes("México") ? "La mejor guía de viaje por México" : "The best travel guide for Mexico"}
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            {t("heroTitle")}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed drop-shadow">
            {t("heroSubtitle")}
          </p>

          {/* Real search with tabs */}
          <TravelSearchTabs airports={airports} />

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { icon: "✈️", text: "700+ aerolíneas", textEn: "700+ airlines" },
              { icon: "🏨", text: "2M+ hoteles", textEn: "2M+ hotels" },
              { icon: "🚌", text: "30+ líneas de autobús", textEn: "30+ bus lines" },
            ].map((badge) => (
              <div key={badge.icon} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                <span>{badge.icon}</span>
                <span className="text-white/90 text-xs font-medium">
                  {t("heroTitle").includes("México") ? badge.text : badge.textEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

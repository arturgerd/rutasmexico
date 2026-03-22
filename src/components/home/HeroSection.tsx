"use client";

import { useTranslations } from "next-intl";
import { Airport } from "@/types/airport";
import TravelSearchTabs from "@/components/widgets/TravelSearchTabs";

interface HeroSectionProps {
  airports: Airport[];
}

export default function HeroSection({ airports }: HeroSectionProps) {
  const t = useTranslations("home");

  return (
    <section className="gradient-hero relative overflow-hidden">
      <div className="gradient-hero-overlay absolute inset-0" />
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-oro-400/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {t("heroTitle")}
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
            {t("heroSubtitle")}
          </p>

          {/* Real search with tabs */}
          <TravelSearchTabs airports={airports} />
        </div>
      </div>
    </section>
  );
}

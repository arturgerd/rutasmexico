"use client";

import { useTranslations } from "next-intl";
import MapLoader from "@/components/map/MapLoader";
import { Destination } from "@/types/destination";

interface MapSectionProps {
  destinations: Destination[];
}

export default function MapSection({ destinations }: MapSectionProps) {
  const t = useTranslations("home");

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-arena-900 mb-3">
            {t("exploreMap")}
          </h2>
          <p className="text-arena-500 text-lg">
            {t("mapSubtitle")}
          </p>
        </div>
        <MapLoader destinations={destinations} height="500px" />
      </div>
    </section>
  );
}

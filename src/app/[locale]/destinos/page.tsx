import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllDestinations } from "@/lib/data/destinations";
import DestinationGrid from "@/components/destinations/DestinationGrid";
import DestinationsGuide from "@/components/editorial/DestinationsGuide";
import AffiliateDisclosure from "@/components/editorial/AffiliateDisclosure";
import { PAGE_HERO_IMAGES } from "@/lib/destination-images";
import { seoAlternates, seoOpenGraph } from "@/lib/utils";

export const revalidate = 86400;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "destinations" });
  const title = t("title");
  const description = t("subtitle");
  return {
    title,
    description,
    alternates: seoAlternates(locale, "/destinos"),
    openGraph: seoOpenGraph(locale, title, description, "/destinos"),
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
  };
}

export default async function DestinosPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const destinations = await getAllDestinations();
  const t = await getTranslations({ locale, namespace: "destinations" });

  return (
    <div className="min-h-screen">
      {/* Hero with background image */}
      <div className="relative py-16 md:py-20 overflow-hidden">
        <Image
          src={PAGE_HERO_IMAGES.destinations}
          alt={locale === "es" ? "Destinos en Mexico" : "Destinations in Mexico"}
          fill
          className="object-cover"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-arena-50" />
        <div className="container-custom relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-white/20">
              <span>🇲🇽</span>
              <span className="text-white text-sm font-medium">
                {locale === "es" ? "10+ destinos increibles" : "10+ amazing destinations"}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
              {t("title")}
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto drop-shadow">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </div>

      <AffiliateDisclosure locale={locale} />
      <div className="bg-arena-50 pb-12">
        <div className="container-custom -mt-4 relative z-20">
          <DestinationGrid destinations={destinations} />
          <DestinationsGuide locale={locale} />
        </div>
      </div>
    </div>
  );
}

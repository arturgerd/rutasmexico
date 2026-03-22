import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllDestinations } from "@/lib/data/destinations";
import DestinationGrid from "@/components/destinations/DestinationGrid";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "destinations" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function DestinosPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const destinations = await getAllDestinations();
  const t = await getTranslations({ locale, namespace: "destinations" });

  return (
    <div className="py-8">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-arena-900 mb-3">
            {t("title")}
          </h1>
          <p className="text-arena-500 text-lg">{t("subtitle")}</p>
        </div>
        <DestinationGrid destinations={destinations} />
      </div>
    </div>
  );
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllDestinations } from "@/lib/data/destinations";
import { getAllRoutes } from "@/lib/data/routes";
import RouteSearch from "@/components/routes/RouteSearch";
import RoutesGuide from "@/components/editorial/RoutesGuide";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "routes" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function RutasPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const destinations = await getAllDestinations();
  const routes = await getAllRoutes();

  return (
    <div className="py-8 bg-arena-50">
      <div className="container-custom">
        <RouteSearch destinations={destinations} routes={routes} />
        <RoutesGuide locale={locale} />
      </div>
    </div>
  );
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllDestinations } from "@/lib/data/destinations";
import { getAllRoutes } from "@/lib/data/routes";
import RouteSearch from "@/components/routes/RouteSearch";
import RoutesGuide from "@/components/editorial/RoutesGuide";
import { seoAlternates } from "@/lib/utils";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "routes" });
  return {
    title: locale === "es"
      ? "Rutas entre ciudades de Mexico - Vuelos, autobuses y distancias"
      : locale === "fr"
        ? "Itineraires entre villes du Mexique - Vols, bus et distances"
        : "Routes between Mexican cities - Flights, buses and distances",
    description: locale === "es"
      ? "Compara como viajar entre ciudades de Mexico: vuelos, autobuses, tiempos, distancias y precios. CDMX, Cancun, Guadalajara, Monterrey y mas de 50 rutas."
      : locale === "fr"
        ? "Comparez comment voyager entre les villes du Mexique: vols, bus, temps, distances et prix. Mexico, Cancun, Guadalajara, Monterrey et plus de 50 itineraires."
        : "Compare how to travel between Mexican cities: flights, buses, travel times, distances and prices. Mexico City, Cancun, Guadalajara, Monterrey and 50+ routes.",
    alternates: seoAlternates(locale, "/rutas"),
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

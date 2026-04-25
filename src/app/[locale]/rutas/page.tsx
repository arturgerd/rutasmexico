import { setRequestLocale } from "next-intl/server";
import { getAllDestinations, getDestinationById } from "@/lib/data/destinations";
import { getAllRoutes } from "@/lib/data/routes";
import RouteSearch from "@/components/routes/RouteSearch";
import RoutesGuide from "@/components/editorial/RoutesGuide";
import { seoAlternates, seoOpenGraph, localize } from "@/lib/utils";
import { Locale } from "@/types/common";

export const revalidate = 86400;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const title = locale === "es"
    ? "Rutas entre ciudades de México | Vuelos y bus"
    : locale === "fr"
      ? "Itinéraires au Mexique | Vols et bus"
      : "Routes in Mexico | Flights and buses";
  const description = locale === "es"
    ? "Compara como viajar entre ciudades de Mexico: vuelos, autobuses, tiempos, distancias y precios. CDMX, Cancun, Guadalajara, Monterrey y mas de 50 rutas."
    : locale === "fr"
      ? "Comparez comment voyager entre les villes du Mexique: vols, bus, temps, distances et prix. Mexico, Cancun, Guadalajara, Monterrey et plus de 50 itineraires."
      : "Compare how to travel between Mexican cities: flights, buses, travel times, distances and prices. Mexico City, Cancun, Guadalajara, Monterrey and 50+ routes.";
  return {
    title,
    description,
    alternates: seoAlternates(locale, "/rutas"),
    openGraph: seoOpenGraph(locale, title, description, "/rutas"),
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
  };
}

export default async function RutasPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const destinations = await getAllDestinations();
  const routes = await getAllRoutes();

  const baseUrl = "https://rutasmexico.com.mx";
  const routeItems = await Promise.all(
    routes.map(async (r, i) => {
      const origin = await getDestinationById(r.originId);
      const dest = await getDestinationById(r.destinationId);
      const name = origin && dest
        ? `${localize(origin.name, locale as Locale)} → ${localize(dest.name, locale as Locale)}`
        : r.slug;
      return {
        "@type": "ListItem",
        position: i + 1,
        name,
        url: `${baseUrl}/${locale}/rutas/${r.slug}`,
      };
    })
  );

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "es"
      ? "Rutas entre ciudades de México"
      : locale === "fr" ? "Itinéraires au Mexique" : "Routes between Mexican cities",
    itemListElement: routeItems,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : "Home", item: `${baseUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: locale === "es" ? "Rutas" : "Routes" },
    ],
  };

  return (
    <div className="py-8 bg-arena-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="container-custom">
        <RouteSearch destinations={destinations} routes={routes} />
        <RoutesGuide locale={locale} />
      </div>
    </div>
  );
}

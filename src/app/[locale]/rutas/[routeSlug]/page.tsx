import { notFound } from "next/navigation";
import { getAllRoutes, getRouteBySlug } from "@/lib/data/routes";
import { getDestinationById } from "@/lib/data/destinations";
import { getAllAirports } from "@/lib/data/airports";
import { getGuideById } from "@/lib/data/guides";
import { Guide } from "@/types/guide";
import { localize } from "@/lib/utils";
import { Locale } from "@/types/common";
import { setRequestLocale } from "next-intl/server";
import RouteDetail from "@/components/routes/RouteDetail";

export async function generateStaticParams() {
  const routes = await getAllRoutes();
  return routes.flatMap((r) => [
    { locale: "es", routeSlug: r.slug },
    { locale: "en", routeSlug: r.slug },
  ]);
}

export async function generateMetadata({ params: { locale, routeSlug } }: { params: { locale: string; routeSlug: string } }) {
  const route = await getRouteBySlug(routeSlug);
  if (!route) return {};
  const origin = await getDestinationById(route.originId);
  const dest = await getDestinationById(route.destinationId);
  if (!origin || !dest) return {};
  const originName = localize(origin.name, locale as Locale);
  const destName = localize(dest.name, locale as Locale);
  return {
    title: locale === "es" ? `${originName} a ${destName} - Cómo llegar` : `${originName} to ${destName} - How to get there`,
    description: locale === "es"
      ? `Guía completa para viajar de ${originName} a ${destName}. Vuelos, autobuses y autos con precios y guías paso a paso.`
      : `Complete guide to travel from ${originName} to ${destName}. Flights, buses and cars with prices and step-by-step guides.`,
  };
}

export default async function RouteDetailPage({
  params: { locale, routeSlug },
}: {
  params: { locale: string; routeSlug: string };
}) {
  setRequestLocale(locale);
  const route = await getRouteBySlug(routeSlug);
  if (!route) notFound();

  const [origin, dest] = await Promise.all([
    getDestinationById(route.originId),
    getDestinationById(route.destinationId),
  ]);
  if (!origin || !dest) notFound();

  // Load guides and airports
  const guidesMap: Record<string, Guide> = {};
  for (const option of route.options) {
    const guide = await getGuideById(option.guideId);
    if (guide) {
      guidesMap[option.id] = guide;
    }
  }

  const airports = await getAllAirports();

  return (
    <RouteDetail
      route={route}
      origin={origin}
      destination={dest}
      guidesMap={guidesMap}
      airports={airports}
      locale={locale as Locale}
    />
  );
}

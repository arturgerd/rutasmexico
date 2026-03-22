import { notFound } from "next/navigation";
import { getAllDestinations, getDestinationBySlug } from "@/lib/data/destinations";
import { getRoutesByDestination } from "@/lib/data/routes";
import { getTerminalsByCity } from "@/lib/data/terminals";
import { localize } from "@/lib/utils";
import { Locale } from "@/types/common";
import { setRequestLocale } from "next-intl/server";
import DestinationDetail from "@/components/destinations/DestinationDetail";

export async function generateStaticParams() {
  const destinations = await getAllDestinations();
  return destinations.flatMap((d) => [
    { locale: "es", slug: d.slug },
    { locale: "en", slug: d.slug },
  ]);
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const destination = await getDestinationBySlug(slug);
  if (!destination) return {};
  return {
    title: localize(destination.name, locale as Locale),
    description: localize(destination.description, locale as Locale),
  };
}

export default async function DestinationPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);
  const destination = await getDestinationBySlug(slug);
  if (!destination) notFound();

  const routes = await getRoutesByDestination(destination.id);
  const terminals = await getTerminalsByCity(destination.id);

  return <DestinationDetail destination={destination} routes={routes} terminals={terminals} locale={locale as Locale} />;
}

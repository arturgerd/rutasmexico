import { notFound } from "next/navigation";
import { getAllMundialVenues, getMundialVenueBySlug } from "@/lib/data/mundial";
import { getDestinationById } from "@/lib/data/destinations";
import { localize, t3, seoAlternates, seoOpenGraph } from "@/lib/utils";
import { Locale } from "@/types/common";
import { setRequestLocale } from "next-intl/server";
import MundialVenueDetail from "@/components/mundial/MundialVenueDetail";

export async function generateStaticParams() {
  const venues = await getAllMundialVenues();
  return venues.flatMap((v) => [
    { locale: "es", slug: v.slug },
    { locale: "en", slug: v.slug },
    { locale: "fr", slug: v.slug },
  ]);
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const venue = await getMundialVenueBySlug(slug);
  if (!venue) return {};
  const name = localize(venue.name, locale as Locale);
  const title = t3(locale as Locale,
    `Mundial 2026 en ${name} - ${venue.stadium.name}`,
    `World Cup 2026 in ${name} - ${venue.stadium.name}`,
    `Coupe du Monde 2026 à ${name} - ${venue.stadium.name}`
  );
  const description = localize(venue.stadium.description, locale as Locale);
  return {
    title,
    description,
    alternates: seoAlternates(locale, `/mundial/${slug}`),
    openGraph: seoOpenGraph(locale, title, description, `/mundial/${slug}`),
  };
}

export default async function MundialVenuePage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);
  const venue = await getMundialVenueBySlug(slug);
  if (!venue) notFound();

  const destination = await getDestinationById(venue.destinationId);
  if (!destination) notFound();

  return <MundialVenueDetail venue={venue} destination={destination} />;
}

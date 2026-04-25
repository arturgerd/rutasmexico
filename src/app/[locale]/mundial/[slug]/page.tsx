import { notFound } from "next/navigation";
import { getAllMundialVenues, getMundialVenueBySlug } from "@/lib/data/mundial";
import { getDestinationById } from "@/lib/data/destinations";
import { localize, t3, seoAlternates, seoOpenGraph } from "@/lib/utils";
import { Locale } from "@/types/common";
import { setRequestLocale } from "next-intl/server";
import MundialVenueDetail from "@/components/mundial/MundialVenueDetail";
import { buildVenueMatchesSchema, buildBreadcrumbList, buildStadiumPlaceSchema } from "@/lib/mundial-schema";

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
  const fullName = localize(venue.name, locale as Locale);
  // venue.name frequently already contains the stadium ("Ciudad de México - Estadio Azteca"); strip it so we don't duplicate.
  const cityOnly = fullName.split(/\s*-\s*/)[0].trim();
  const title = t3(locale as Locale,
    `Mundial 2026 en ${cityOnly} - ${venue.stadium.name}`,
    `World Cup 2026 in ${cityOnly} - ${venue.stadium.name}`,
    `Coupe du Monde 2026 à ${cityOnly} - ${venue.stadium.name}`
  );
  const description = localize(venue.stadium.description, locale as Locale);
  return {
    title,
    description,
    alternates: seoAlternates(locale, `/mundial/${slug}`),
    openGraph: seoOpenGraph(locale, title, description, `/mundial/${slug}`, "https://rutasmexico.com.mx/og-image.png"),
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

  const destination = venue.destinationId ? await getDestinationById(venue.destinationId) : null;

  const matchEvents = buildVenueMatchesSchema(venue, locale);
  const stadiumPlace = buildStadiumPlaceSchema(venue, locale, destination?.coordinates);
  const venueName = localize(venue.name, locale as Locale);
  const breadcrumbs = buildBreadcrumbList(locale, [
    {
      name: t3(locale as Locale, "Inicio", "Home", "Accueil"),
      url: `https://rutasmexico.com.mx/${locale}`,
    },
    {
      name: t3(locale as Locale, "Mundial 2026", "World Cup 2026", "Coupe du Monde 2026"),
      url: `https://rutasmexico.com.mx/${locale}/mundial`,
    },
    { name: venueName },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stadiumPlace) }}
      />
      {matchEvents.map((evt, i) => (
        <script
          key={`match-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(evt) }}
        />
      ))}
      <MundialVenueDetail venue={venue} destination={destination} />
    </>
  );
}

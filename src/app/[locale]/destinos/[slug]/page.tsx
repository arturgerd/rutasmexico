import { notFound } from "next/navigation";
import { getAllDestinations, getDestinationBySlug } from "@/lib/data/destinations";
import { getRoutesByDestination } from "@/lib/data/routes";
import { getTerminalsByCity } from "@/lib/data/terminals";
import { localize, seoAlternates } from "@/lib/utils";
import { Locale } from "@/types/common";
import { setRequestLocale } from "next-intl/server";
import DestinationDetail from "@/components/destinations/DestinationDetail";

export async function generateStaticParams() {
  const destinations = await getAllDestinations();
  return destinations.flatMap((d) => [
    { locale: "es", slug: d.slug },
    { locale: "en", slug: d.slug },
    { locale: "fr", slug: d.slug },
  ]);
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const destination = await getDestinationBySlug(slug);
  if (!destination) return {};
  const name = localize(destination.name, locale as Locale);
  const state = localize(destination.state, locale as Locale);
  const year = new Date().getFullYear();
  const baseUrl = "https://rutasmexico.com.mx";
  const canonicalPath = `/${locale}/destinos/${slug}`;

  if (locale === "es") {
    return {
      title: `${name}, ${state}: Guía de viaje y cómo llegar ${year}`,
      description: `Guía completa de ${name}: qué hacer, cómo llegar, dónde comer y mejores épocas para visitar. ${localize(destination.description, locale as Locale)}`,
      alternates: seoAlternates(locale, `/destinos/${slug}`),
      openGraph: {
        title: `${name}: Guía de viaje ${year}`,
        description: localize(destination.description, locale as Locale),
        url: `${baseUrl}${canonicalPath}`,
        type: "article",
      },
    };
  }
  return {
    title: `${name}, ${state}: Travel guide & how to get there ${year}`,
    description: `Complete guide to ${name}: things to do, how to get there, where to eat and best times to visit. ${localize(destination.description, locale as Locale)}`,
    alternates: seoAlternates(locale, `/destinos/${slug}`),
    openGraph: {
      title: `${name}: Travel guide ${year}`,
      description: localize(destination.description, locale as Locale),
      url: `${baseUrl}${canonicalPath}`,
      type: "article",
    },
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

  const baseUrl = "https://rutasmexico.com.mx";
  const name = localize(destination.name, locale as Locale);
  const state = localize(destination.state, locale as Locale);
  const description = localize(destination.description, locale as Locale);
  const canonicalUrl = `${baseUrl}/${locale}/destinos/${slug}`;
  const imageUrl = destination.heroImage?.startsWith("/")
    ? `${baseUrl}${destination.heroImage}`
    : destination.heroImage;

  // TouristAttraction / Place schema — helps Google understand this page is about a destination
  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name,
    description,
    url: canonicalUrl,
    image: imageUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: name,
      addressRegion: state,
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: destination.coordinates.lat,
      longitude: destination.coordinates.lng,
    },
    touristType: locale === "es"
      ? ["Turismo cultural", "Turismo gastronomico", "Turismo de playa"]
      : ["Cultural tourism", "Food tourism", "Beach tourism"],
    ...(destination.reviews && destination.reviews.length > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: (
          destination.reviews.reduce((s, r) => s + r.rating, 0) / destination.reviews.length
        ).toFixed(1),
        reviewCount: destination.reviews.length,
        bestRating: 5,
        worstRating: 1,
      },
      review: destination.reviews.map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.author },
        datePublished: r.date,
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody: localize(r.text, locale as Locale),
      })),
    }),
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "es" ? "Inicio" : "Home",
        item: `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "es" ? "Destinos" : "Destinations",
        item: `${baseUrl}/${locale}/destinos`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <DestinationDetail destination={destination} routes={routes} terminals={terminals} locale={locale as Locale} />
    </>
  );
}

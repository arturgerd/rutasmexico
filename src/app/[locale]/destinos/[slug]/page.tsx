import { notFound } from "next/navigation";
import { getAllDestinations, getDestinationBySlug } from "@/lib/data/destinations";
import { getRoutesByDestination } from "@/lib/data/routes";
import { getTerminalsByCity } from "@/lib/data/terminals";
import { getExpandedContent } from "@/lib/data/destination-content";
import { localize, seoAlternates } from "@/lib/utils";
import { Locale } from "@/types/common";
import { setRequestLocale } from "next-intl/server";
import DestinationDetail from "@/components/destinations/DestinationDetail";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

// Tourist types tailored per Mexican region — Google uses these to match queries
// like "what to do in Yucatán" or "beach destinations in Mexico" against pages.
// A generic ["Turismo cultural"] (the previous hardcoded value) doesn't help
// because every destination read the same, so Google had no signal that Cancún
// is a beach destination vs CDMX which is urban.
const TOURIST_TYPES_BY_REGION: Record<string, { es: string[]; en: string[] }> = {
  peninsula: {
    es: ["Turismo de playa", "Turismo arqueológico", "Cenotes y buceo", "Gastronomía yucateca"],
    en: ["Beach tourism", "Archaeological tourism", "Cenotes and diving", "Yucatecan cuisine"],
  },
  pacifico: {
    es: ["Turismo de playa", "Surf", "Avistamiento de ballenas", "Gastronomía costera"],
    en: ["Beach tourism", "Surfing", "Whale watching", "Coastal cuisine"],
  },
  centro: {
    es: ["Turismo urbano", "Turismo cultural", "Museos y arte", "Gastronomía mexicana"],
    en: ["Urban tourism", "Cultural tourism", "Museums and art", "Mexican cuisine"],
  },
  bajio: {
    es: ["Pueblos Mágicos", "Patrimonio colonial", "Ruta del vino", "Turismo cultural"],
    en: ["Magical Towns", "Colonial heritage", "Wine route", "Cultural tourism"],
  },
  norte: {
    es: ["Aventura y desierto", "Turismo de playa", "Naturaleza", "Vida nocturna"],
    en: ["Adventure and desert", "Beach tourism", "Nature", "Nightlife"],
  },
  sur: {
    es: ["Turismo cultural", "Gastronomía oaxaqueña", "Patrimonio indígena", "Mezcal"],
    en: ["Cultural tourism", "Oaxacan cuisine", "Indigenous heritage", "Mezcal"],
  },
  occidente: {
    es: ["Turismo de playa", "Ruta del tequila", "Mariachi", "Gastronomía jalisciense"],
    en: ["Beach tourism", "Tequila route", "Mariachi", "Jalisco cuisine"],
  },
  golfo: {
    es: ["Turismo de playa", "Música tropical", "Historia colonial", "Gastronomía veracruzana"],
    en: ["Beach tourism", "Tropical music", "Colonial history", "Veracruz cuisine"],
  },
};

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
  const name = localize(destination.name, locale as Locale);
  const state = localize(destination.state, locale as Locale);
  const year = new Date().getFullYear();
  const baseUrl = "https://rutasmexico.com.mx";
  const canonicalPath = `/${locale}/destinos/${slug}`;
  const ogImage = destination.heroImage?.startsWith("/")
    ? `${baseUrl}${destination.heroImage}`
    : destination.heroImage;

  if (locale === "es") {
    const title = `${name}, ${state}: Guía de viaje y cómo llegar ${year}`;
    const description = `Guía completa de ${name}: qué hacer, cómo llegar, dónde comer y mejores épocas para visitar. ${localize(destination.description, locale as Locale)}`;
    return {
      title,
      description,
      alternates: seoAlternates(locale, `/destinos/${slug}`),
      openGraph: {
        title: `${name}: Guía de viaje ${year}`,
        description: localize(destination.description, locale as Locale),
        url: `${baseUrl}${canonicalPath}`,
        type: "article",
        ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: name }] } : {}),
      },
      twitter: {
        card: "summary_large_image" as const,
        title,
        description,
        ...(ogImage ? { images: [ogImage] } : {}),
      },
    };
  }
  const title = `${name}, ${state}: Travel guide & how to get there ${year}`;
  const description = `Complete guide to ${name}: things to do, how to get there, where to eat and best times to visit. ${localize(destination.description, locale as Locale)}`;
  return {
    title,
    description,
    alternates: seoAlternates(locale, `/destinos/${slug}`),
    openGraph: {
      title: `${name}: Travel guide ${year}`,
      description: localize(destination.description, locale as Locale),
      url: `${baseUrl}${canonicalPath}`,
      type: "article",
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: name }] } : {}),
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
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
  const expandedContent = getExpandedContent(slug);

  const baseUrl = "https://rutasmexico.com.mx";
  const name = localize(destination.name, locale as Locale);
  const state = localize(destination.state, locale as Locale);
  const description = localize(destination.description, locale as Locale);
  const canonicalUrl = `${baseUrl}/${locale}/destinos/${slug}`;
  const imageUrl = destination.heroImage?.startsWith("/")
    ? `${baseUrl}${destination.heroImage}`
    : destination.heroImage;

  // TouristAttraction / Place schema — helps Google understand this page is about a destination
  const touristTypes =
    TOURIST_TYPES_BY_REGION[destination.region]?.[locale === "es" ? "es" : "en"]
    ?? (locale === "es"
      ? ["Turismo cultural", "Gastronomía mexicana"]
      : ["Cultural tourism", "Mexican cuisine"]);

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "@id": `${canonicalUrl}#destination`,
    name,
    description,
    url: canonicalUrl,
    image: imageUrl,
    isPartOf: { "@id": `${baseUrl}/#website` },
    containedInPlace: {
      "@type": "Country",
      name: locale === "es" ? "México" : "Mexico",
      sameAs: "https://www.wikidata.org/wiki/Q96",
    },
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
    touristType: touristTypes,
    // Top 5 highlights as proper TouristAttraction entities — Google uses nested
    // attractions for "things to do in X" rich results.
    includesAttraction: destination.highlights.slice(0, 5).map((h) => ({
      "@type": "TouristAttraction",
      name: localize(h, locale as Locale),
    })),
    publicAccess: true,
    isAccessibleForFree: true,
    currenciesAccepted: "MXN",
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

  // FAQ schema from expanded content for SERP rich results
  const faqSchema = expandedContent && expandedContent.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: expandedContent.faqs.map((faq) => ({
      "@type": "Question",
      name: localize(faq.question, locale as Locale),
      acceptedAnswer: {
        "@type": "Answer",
        text: localize(faq.answer, locale as Locale),
      },
    })),
  } : null;

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
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="container-custom pt-4">
        <Breadcrumbs
          items={[
            { name: locale === "es" ? "Inicio" : locale === "fr" ? "Accueil" : "Home", href: `/${locale}` },
            { name: locale === "es" ? "Destinos" : locale === "fr" ? "Destinations" : "Destinations", href: `/${locale}/destinos` },
            { name },
          ]}
        />
      </div>
      <DestinationDetail
        destination={destination}
        routes={routes}
        terminals={terminals}
        locale={locale as Locale}
        expandedContent={expandedContent}
      />
    </>
  );
}

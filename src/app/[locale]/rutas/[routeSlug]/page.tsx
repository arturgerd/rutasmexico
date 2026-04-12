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
  const year = new Date().getFullYear();

  // Build price/duration summary from route options for rich description
  const priceSummaries = route.options.map((opt) => {
    const modeLabel =
      locale === "es"
        ? opt.mode === "flight" ? "Vuelo" : opt.mode === "bus" ? "Autobús" : "Auto"
        : opt.mode === "flight" ? "Flight" : opt.mode === "bus" ? "Bus" : "Car";
    const duration = localize(opt.duration.label, locale as Locale);
    return `${modeLabel} ${duration} $${opt.priceRange.min.toLocaleString()}-$${opt.priceRange.max.toLocaleString()} ${opt.priceRange.currency}`;
  });

  const baseUrl = "https://rutasmexico.com.mx";
  const canonicalPath = `/${locale}/rutas/${routeSlug}`;

  if (locale === "es") {
    return {
      title: `Cómo llegar a ${destName} desde ${originName} ${year} | Vuelos, Autobús y Auto`,
      description: `Cómo llegar a ${destName} desde ${originName}: ${priceSummaries.join(". ")}. Guía paso a paso con precios actualizados ${year}.`,
      alternates: {
        canonical: `${baseUrl}${canonicalPath}`,
        languages: {
          es: `${baseUrl}/es/rutas/${routeSlug}`,
          en: `${baseUrl}/en/rutas/${routeSlug}`,
        },
      },
      openGraph: {
        title: `Cómo llegar a ${destName} desde ${originName} | Guía ${year}`,
        description: `Guía completa para viajar de ${originName} a ${destName}. ${priceSummaries.join(". ")}.`,
        url: `${baseUrl}${canonicalPath}`,
        type: "article",
      },
    };
  }
  return {
    title: `How to get to ${destName} from ${originName} ${year} | Flights, Bus & Car`,
    description: `How to get to ${destName} from ${originName}: ${priceSummaries.join(". ")}. Step-by-step guide with updated prices ${year}.`,
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
      languages: {
        es: `${baseUrl}/es/rutas/${routeSlug}`,
        en: `${baseUrl}/en/rutas/${routeSlug}`,
      },
    },
    openGraph: {
      title: `How to get to ${destName} from ${originName} | Guide ${year}`,
      description: `Complete guide to travel from ${originName} to ${destName}. ${priceSummaries.join(". ")}.`,
      url: `${baseUrl}${canonicalPath}`,
      type: "article",
    },
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

  const originName = localize(origin.name, locale as Locale);
  const destName = localize(dest.name, locale as Locale);

  // Build FAQ structured data for rich results
  const faqItems = route.options.map((opt) => {
    const modeLabel =
      locale === "es"
        ? opt.mode === "flight" ? "avión" : opt.mode === "bus" ? "autobús" : "auto"
        : opt.mode === "flight" ? "plane" : opt.mode === "bus" ? "bus" : "car";
    const duration = localize(opt.duration.label, locale as Locale);
    const provider = localize(opt.provider, locale as Locale);
    const question =
      locale === "es"
        ? `¿Cómo llegar de ${originName} a ${destName} en ${modeLabel}?`
        : `How to get from ${originName} to ${destName} by ${modeLabel}?`;
    const answer =
      locale === "es"
        ? `El viaje de ${originName} a ${destName} en ${modeLabel} toma ${duration} y cuesta entre $${opt.priceRange.min.toLocaleString()} y $${opt.priceRange.max.toLocaleString()} ${opt.priceRange.currency}. Proveedores: ${provider}.`
        : `The trip from ${originName} to ${destName} by ${modeLabel} takes ${duration} and costs $${opt.priceRange.min.toLocaleString()}-$${opt.priceRange.max.toLocaleString()} ${opt.priceRange.currency}. Providers: ${provider}.`;
    return { "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } };
  });

  // Add common time/distance questions
  const recommendedOpt = route.options.find((o) => o.recommended) || route.options[0];
  const recDuration = localize(recommendedOpt.duration.label, locale as Locale);
  const timeQuestion =
    locale === "es"
      ? `¿Cuánto tiempo se hace de ${originName} a ${destName}?`
      : `How long does it take from ${originName} to ${destName}?`;
  const timeAnswer =
    locale === "es"
      ? `El tiempo de viaje de ${originName} a ${destName} varía según el transporte: ${route.options.map((o) => `${o.mode === "flight" ? "avión" : o.mode === "bus" ? "autobús" : "auto"} ${localize(o.duration.label, locale as Locale)}`).join(", ")}. La opción más popular toma ${recDuration}.`
      : `Travel time from ${originName} to ${destName} varies by transport: ${route.options.map((o) => `${o.mode === "flight" ? "flight" : o.mode === "bus" ? "bus" : "car"} ${localize(o.duration.label, locale as Locale)}`).join(", ")}. The most popular option takes ${recDuration}.`;
  faqItems.push({ "@type": "Question", name: timeQuestion, acceptedAnswer: { "@type": "Answer", text: timeAnswer } });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : "Home", item: `https://rutasmexico.com.mx/${locale}` },
      { "@type": "ListItem", position: 2, name: locale === "es" ? "Rutas" : "Routes", item: `https://rutasmexico.com.mx/${locale}/rutas` },
      { "@type": "ListItem", position: 3, name: `${originName} → ${destName}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <RouteDetail
        route={route}
        origin={origin}
        destination={dest}
        guidesMap={guidesMap}
        airports={airports}
        locale={locale as Locale}
      />
    </>
  );
}

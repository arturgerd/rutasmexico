import { notFound } from "next/navigation";
import { getAllRoutes, getRouteBySlug, getRoutesByOrigin, getRoutesByDestination } from "@/lib/data/routes";
import { getDestinationById } from "@/lib/data/destinations";
import { getAllAirports } from "@/lib/data/airports";
import { getGuideById } from "@/lib/data/guides";
import { getRouteContent } from "@/lib/data/route-content";
import { Guide } from "@/types/guide";
import { localize, seoAlternates } from "@/lib/utils";
import { Locale } from "@/types/common";
import { setRequestLocale } from "next-intl/server";
import RouteDetail from "@/components/routes/RouteDetail";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

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

  // Cheapest option (used for compact meta description ≤155 chars)
  const cheapest = [...route.options].sort((a, b) => a.priceRange.min - b.priceRange.min)[0];
  const currency = cheapest?.priceRange.currency ?? "MXN";
  const minPrice = cheapest ? `$${cheapest.priceRange.min.toLocaleString()}` : "";

  const baseUrl = "https://rutasmexico.com.mx";
  const canonicalPath = `/${locale}/rutas/${routeSlug}`;

  const titleEs = `${originName} a ${destName} ${year}: vuelo, bus o auto`;
  const titleEn = `${originName} to ${destName} ${year}: flight, bus or car`;
  const titleFr = `${originName} à ${destName} ${year} : avion, bus, voiture`;

  const descEs = `Vuelo, autobús o auto de ${originName} a ${destName} desde ${minPrice} ${currency}. Guía con precios reales y rutas paso a paso ${year}.`;
  const descEn = `Flight, bus or car from ${originName} to ${destName} from ${minPrice} ${currency}. Real prices and step-by-step routes ${year}.`;
  const descFr = `Avion, bus ou voiture de ${originName} à ${destName} dès ${minPrice} ${currency}. Tarifs réels et itinéraires pas à pas ${year}.`;

  const title = locale === "en" ? titleEn : locale === "fr" ? titleFr : titleEs;
  const description = locale === "en" ? descEn : locale === "fr" ? descFr : descEs;

  return {
    title,
    description,
    alternates: seoAlternates(locale, `/rutas/${routeSlug}`),
    openGraph: {
      title,
      description,
      url: `${baseUrl}${canonicalPath}`,
      type: "article",
    },
    twitter: { card: "summary_large_image" as const, title, description },
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

  // Related routes: same origin or same destination, excluding the current one (max 4)
  const [sameOrigin, sameDest] = await Promise.all([
    getRoutesByOrigin(route.originId),
    getRoutesByDestination(route.destinationId),
  ]);
  const relatedRouteList = [...sameOrigin, ...sameDest]
    .filter((r) => r.slug !== route.slug)
    .filter((r, i, arr) => arr.findIndex((x) => x.slug === r.slug) === i)
    .slice(0, 4);
  const relatedRoutes = await Promise.all(
    relatedRouteList.map(async (r) => {
      const o = await getDestinationById(r.originId);
      const d = await getDestinationById(r.destinationId);
      if (!o || !d) return null;
      return {
        slug: r.slug,
        originName: localize(o.name, locale as Locale),
        destName: localize(d.name, locale as Locale),
      };
    })
  );
  const relatedRoutesFiltered = relatedRoutes.filter((r): r is { slug: string; originName: string; destName: string } => r !== null);

  const originName = localize(origin.name, locale as Locale);
  const destName = localize(dest.name, locale as Locale);

  const editorialContent = getRouteContent(routeSlug);

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

  // Merge editorial FAQs (hand-written, higher quality) into the schema
  if (editorialContent?.faqs?.length) {
    const pickLocale = (t: { es: string; en: string; fr: string }) =>
      locale === "fr" ? t.fr || t.en || t.es : locale === "en" ? t.en || t.es : t.es;
    for (const faq of editorialContent.faqs) {
      faqItems.push({
        "@type": "Question",
        name: pickLocale(faq.question),
        acceptedAnswer: { "@type": "Answer", text: pickLocale(faq.answer) },
      });
    }
  }

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
      <div className="container-custom pt-4">
        <Breadcrumbs
          items={[
            { name: locale === "es" ? "Inicio" : locale === "fr" ? "Accueil" : "Home", href: `/${locale}` },
            { name: locale === "es" ? "Rutas" : locale === "fr" ? "Itinéraires" : "Routes", href: `/${locale}/rutas` },
            { name: `${originName} → ${destName}` },
          ]}
        />
      </div>
      <RouteDetail
        route={route}
        origin={origin}
        destination={dest}
        guidesMap={guidesMap}
        airports={airports}
        locale={locale as Locale}
        relatedRoutes={relatedRoutesFiltered}
        destinationSlug={dest.slug}
        editorialContent={editorialContent}
        faqs={faqItems.map((f) => ({ q: f.name, a: f.acceptedAnswer.text }))}
      />
    </>
  );
}

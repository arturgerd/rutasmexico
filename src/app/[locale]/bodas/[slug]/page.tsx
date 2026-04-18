import { notFound } from "next/navigation";
import { getAllWeddingDestinations, getWeddingDestinationBySlug } from "@/lib/data/bodas";
import { localize } from "@/lib/utils";
import { Locale } from "@/types/common";
import { setRequestLocale } from "next-intl/server";
import WeddingDestinationDetail from "@/components/bodas/WeddingDestinationDetail";

export async function generateStaticParams() {
  const destinations = await getAllWeddingDestinations();
  return destinations.flatMap((d) => [
    { locale: "es", slug: d.slug },
    { locale: "en", slug: d.slug },
    { locale: "fr", slug: d.slug },
  ]);
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const dest = await getWeddingDestinationBySlug(slug);
  if (!dest) return {};
  const name = localize(dest.name, locale as Locale);
  const year = new Date().getFullYear();
  const baseUrl = "https://rutasmexico.com.mx";
  const canonicalPath = `/${locale}/bodas/${slug}`;

  if (locale === "es") {
    return {
      title: `Bodas en ${name} ${year} | Venues inclusivos, despedidas y guía LGBTIQ+`,
      description: `Planifica tu boda en ${name}: ${dest.venues.length} venues con precios, despedidas de soltera y soltero, bodas LGBTIQ+ legales, venues accesibles para personas con discapacidad. Guía completa ${year}.`,
      alternates: {
        canonical: `${baseUrl}${canonicalPath}`,
        languages: { es: `${baseUrl}/es/bodas/${slug}`, en: `${baseUrl}/en/bodas/${slug}` },
      },
      openGraph: {
        title: `Bodas en ${name} ${year} | Guía completa inclusiva`,
        description: `${dest.venues.length} venues, despedidas, bodas LGBTIQ+ y celebraciones accesibles en ${name}.`,
        url: `${baseUrl}${canonicalPath}`,
        type: "article",
      },
    };
  }
  return {
    title: `Weddings in ${name} ${year} | Inclusive venues, parties & LGBTIQ+ guide`,
    description: `Plan your wedding in ${name}: ${dest.venues.length} venues with prices, bachelor & bachelorette parties, legal LGBTIQ+ weddings, accessible venues for guests with disabilities. Complete guide ${year}.`,
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
      languages: { es: `${baseUrl}/es/bodas/${slug}`, en: `${baseUrl}/en/bodas/${slug}` },
    },
    openGraph: {
      title: `Weddings in ${name} ${year} | Complete inclusive guide`,
      description: `${dest.venues.length} venues, parties, LGBTIQ+ weddings & accessible celebrations in ${name}.`,
      url: `${baseUrl}${canonicalPath}`,
      type: "article",
    },
  };
}

export default async function WeddingDestinationPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);
  const destination = await getWeddingDestinationBySlug(slug);
  if (!destination) notFound();

  const name = localize(destination.name, locale as Locale);

  // FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: destination.faqs.map((faq) => ({
      "@type": "Question",
      name: localize(faq.question, locale as Locale),
      acceptedAnswer: {
        "@type": "Answer",
        text: localize(faq.answer, locale as Locale),
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : "Home", item: `https://rutasmexico.com.mx/${locale}` },
      { "@type": "ListItem", position: 2, name: locale === "es" ? "Bodas" : "Weddings", item: `https://rutasmexico.com.mx/${locale}/bodas` },
      { "@type": "ListItem", position: 3, name: name },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <WeddingDestinationDetail destination={destination} locale={locale as Locale} />
    </>
  );
}

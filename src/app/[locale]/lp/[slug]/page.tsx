import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getDestinationBySlug, getAllDestinations } from "@/lib/data/destinations";
import { getAllAirports } from "@/lib/data/airports";
import { localize, t3, seoAlternates } from "@/lib/utils";
import { Locale } from "@/types/common";
import { setRequestLocale } from "next-intl/server";
import FlightSearch from "@/components/widgets/FlightSearch";
import TravelpayoutsWidget from "@/components/widgets/TravelpayoutsWidget";

// Landing pages for Google Ads campaigns. Single intent, single CTA, no navigation.
// URL pattern: /[locale]/lp/[destinationSlug]  → e.g. /es/lp/cancun

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
  const title = t3(
    locale,
    `Vuelos baratos a ${name} desde $1,200 MXN | Compara y reserva`,
    `Cheap flights to ${name} from $1,200 MXN | Compare & book`,
    `Vols pas chers vers ${name} dès 1 200 MXN | Comparez et réservez`
  );
  const description = t3(
    locale,
    `Encuentra vuelos baratos a ${name}. Compara precios de 700+ aerolíneas en segundos. Reserva sin comisiones.`,
    `Find cheap flights to ${name}. Compare 700+ airlines in seconds. Book with no fees.`,
    `Trouvez des vols pas chers vers ${name}. Comparez 700+ compagnies en quelques secondes. Sans frais.`
  );
  return {
    title,
    description,
    alternates: seoAlternates(locale, `/lp/${slug}`),
    robots: { index: false, follow: false }, // landing pages should not compete with main destination pages in SERPs
  };
}

export default async function LandingPage({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  setRequestLocale(locale);
  const destination = await getDestinationBySlug(slug);
  if (!destination) notFound();

  const airports = await getAllAirports();
  const name = localize(destination.name, locale as Locale);
  const description = localize(destination.description, locale as Locale);

  return (
    <>
      {/* Hero with single CTA above the fold */}
      <section className="relative min-h-[600px] flex items-center">
        <Image
          src={destination.heroImage}
          alt={name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />

        <div className="relative container-custom text-white py-16">
          <div className="max-w-3xl">
            <span className="inline-block bg-terracotta-500 text-white text-sm font-bold uppercase tracking-wide px-4 py-1.5 rounded-full mb-4">
              {t3(locale, "Oferta exclusiva", "Exclusive deal", "Offre exclusive")}
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold leading-tight mb-4">
              {t3(
                locale,
                `Vuelos a ${name} desde $1,200`,
                `Flights to ${name} from $1,200`,
                `Vols vers ${name} dès 1 200 $`
              )}
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl">
              {t3(
                locale,
                "Compara 700+ aerolíneas en segundos. Sin comisiones, sin sorpresas.",
                "Compare 700+ airlines in seconds. No fees, no surprises.",
                "Comparez 700+ compagnies aériennes en quelques secondes. Sans frais, sans surprises."
              )}
            </p>

            {/* Single CTA — flight search */}
            {destination.airportIATA && (
              <div className="bg-white rounded-2xl p-5 shadow-2xl">
                <FlightSearch
                  airports={airports}
                  defaultDest={destination.airportIATA}
                  compact
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="bg-arena-50 py-10 border-y border-arena-200">
        <div className="container-custom grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-terracotta-500">700+</div>
            <div className="text-sm text-arena-600 mt-1">
              {t3(locale, "Aerolíneas comparadas", "Airlines compared", "Compagnies comparées")}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-terracotta-500">0%</div>
            <div className="text-sm text-arena-600 mt-1">
              {t3(locale, "Comisión adicional", "Extra fees", "Frais supplémentaires")}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-terracotta-500">⚡</div>
            <div className="text-sm text-arena-600 mt-1">
              {t3(locale, "Resultados en segundos", "Results in seconds", "Résultats en secondes")}
            </div>
          </div>
        </div>
      </section>

      {/* Why this destination — short, scannable */}
      <section className="container-custom py-12">
        <h2 className="font-display text-3xl font-bold text-arena-900 mb-4">
          {t3(locale, `¿Por qué ${name}?`, `Why ${name}?`, `Pourquoi ${name} ?`)}
        </h2>
        <p className="text-lg text-arena-600 leading-relaxed max-w-3xl">{description}</p>
      </section>

      {/* Live price comparison widget */}
      {destination.airportIATA && (
        <section className="container-custom pb-12">
          <TravelpayoutsWidget originIATA="MEX" destIATA={destination.airportIATA} type="prices" />
        </section>
      )}

      {/* Final CTA */}
      <section className="bg-terracotta-500 text-white py-12 text-center">
        <div className="container-custom">
          <h2 className="font-display text-3xl font-bold mb-3">
            {t3(
              locale,
              `Empieza tu viaje a ${name} hoy`,
              `Start your trip to ${name} today`,
              `Commencez votre voyage vers ${name} aujourd'hui`
            )}
          </h2>
          <Link
            href={`/${locale}/destinos/${slug}`}
            className="inline-block mt-4 bg-white text-terracotta-600 font-bold px-8 py-4 rounded-full hover:bg-arena-50 transition-colors text-lg"
          >
            {t3(locale, "Ver guía completa →", "See full guide →", "Voir le guide complet →")}
          </Link>
        </div>
      </section>
    </>
  );
}

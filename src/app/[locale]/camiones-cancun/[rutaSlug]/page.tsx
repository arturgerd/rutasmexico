import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import DataConfidence from "@/components/ui/DataConfidence";
import RutaMapLoader from "@/components/camiones/RutaMapLoader";
import {
  CAMIONES_ATTRIBUTION,
  CAMIONES_LAST_REVIEWED,
  getAllCamionRoutes,
  getCamionRouteBySlug,
  getRelatedCamionRoutes,
} from "@/lib/data/camiones-cancun";
import { l, seoAlternates, seoOpenGraph } from "@/lib/utils";

export const revalidate = 86400;

const BASE_URL = "https://rutasmexico.com.mx";

export async function generateStaticParams() {
  return getAllCamionRoutes().flatMap((route) => [
    { locale: "es", rutaSlug: route.slug },
    { locale: "en", rutaSlug: route.slug },
  ]);
}

export async function generateMetadata({
  params: { locale, rutaSlug },
}: {
  params: { locale: string; rutaSlug: string };
}) {
  const route = getCamionRouteBySlug(rutaSlug);
  if (!route) return {};

  const name = l(route.name, locale);
  const isEs = locale === "es";
  const path = `/camiones-cancun/${route.slug}`;

  const title = isEs
    ? `Camión ${route.code} Cancún: ${name} — recorrido y tarifa`
    : `${route.code} bus Cancún: ${name} — route and fare`;
  const description = isEs
    ? `Por dónde pasa el ${route.code} de Cancún, sus ${route.stops.length} paradas principales, el letrero que debes buscar y la tarifa de $${route.fareMxn} MXN.`
    : `Where the ${route.code} bus runs in Cancún, its ${route.stops.length} main stops, the windshield sign to look for and the MX$${route.fareMxn} fare.`;

  return {
    title,
    description,
    alternates: seoAlternates(locale, path),
    openGraph: seoOpenGraph(locale, title, description, path),
    twitter: { card: "summary_large_image" as const, title, description },
  };
}

export default async function CamionRutaPage({
  params: { locale, rutaSlug },
}: {
  params: { locale: string; rutaSlug: string };
}) {
  setRequestLocale(locale);

  const route = getCamionRouteBySlug(rutaSlug);
  if (!route) notFound();

  const isEs = locale === "es";
  const name = l(route.name, locale);
  const related = getRelatedCamionRoutes(route);
  const first = route.stops[0];
  const last = route.stops[route.stops.length - 1];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEs ? "Inicio" : "Home", item: `${BASE_URL}/${locale}` },
      {
        "@type": "ListItem",
        position: 2,
        name: isEs ? "Camiones de Cancún" : "Cancún city buses",
        item: `${BASE_URL}/${locale}/camiones-cancun`,
      },
      { "@type": "ListItem", position: 3, name: `${route.code} — ${name}` },
    ],
  };

  const tripSchema = {
    "@context": "https://schema.org",
    "@type": "BusTrip",
    name: `${route.code} — ${name}`,
    description: l(route.notes, locale),
    provider: { "@type": "Organization", name: route.operator },
    ...(first
      ? { departureBusStop: { "@type": "BusStop", name: first.name, address: { "@type": "PostalAddress", addressLocality: "Cancún", addressRegion: "Quintana Roo", addressCountry: "MX" } } }
      : {}),
    ...(last
      ? { arrivalBusStop: { "@type": "BusStop", name: last.name, address: { "@type": "PostalAddress", addressLocality: "Cancún", addressRegion: "Quintana Roo", addressCountry: "MX" } } }
      : {}),
    offers: { "@type": "Offer", price: route.fareMxn, priceCurrency: "MXN" },
  };

  const facts = [
    { label: isEs ? "Tarifa" : "Fare", value: `$${route.fareMxn} MXN` },
    { label: isEs ? "Letrero" : "Windshield sign", value: route.sign },
    { label: isEs ? "Horario" : "Hours", value: l(route.schedule, locale) },
    { label: isEs ? "Operador" : "Operator", value: route.operator },
    {
      label: isEs ? "Vehículo" : "Vehicle",
      value:
        route.vehicleType === "combi"
          ? isEs
            ? "Combi de ~14 plazas"
            : "Shared van, ~14 seats"
          : isEs
            ? "Autobús urbano"
            : "City bus",
    },
    {
      label: isEs ? "Zona Hotelera" : "Hotel Zone",
      value:
        route.coverage === "hotelera"
          ? isEs
            ? "Sí, entra a Kukulcán"
            : "Yes, enters Kukulcán"
          : isEs
            ? "No, sólo ciudad"
            : "No, city only",
    },
  ];

  return (
    <div className="min-h-screen bg-arena-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }} />

      <div className="container-custom py-10 md:py-14">
        <Breadcrumbs
          className="mb-6"
          items={[
            { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
            { name: isEs ? "Camiones de Cancún" : "Cancún city buses", href: `/${locale}/camiones-cancun` },
            { name: route.code },
          ]}
        />

        <header className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex h-11 min-w-[3.25rem] items-center justify-center rounded-xl px-2 font-display text-lg font-bold text-white"
              style={{ backgroundColor: route.color }}
            >
              {route.code}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {route.allDay && (
                <span className="rounded-full bg-jade-50 px-2.5 py-1 text-xs font-medium text-jade-800">
                  {isEs ? "24 horas" : "24 hours"}
                </span>
              )}
              {route.coverage === "hotelera" && (
                <span className="rounded-full bg-azul-50 px-2.5 py-1 text-xs font-medium text-azul-800">
                  {isEs ? "Zona Hotelera" : "Hotel Zone"}
                </span>
              )}
              {route.vehicleType === "combi" && (
                <span className="rounded-full bg-oro-50 px-2.5 py-1 text-xs font-medium text-oro-800">
                  {isEs ? "Combi" : "Shared van"}
                </span>
              )}
            </div>
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-arena-900 md:text-4xl">
            {isEs ? `Camión ${route.code} de Cancún: ${name}` : `Cancún ${route.code} bus: ${name}`}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-arena-700">{l(route.notes, locale)}</p>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <RutaMapLoader
              polyline={route.polyline}
              stops={route.stops}
              color={route.color}
              code={route.code}
            />
            <p className="mt-2 text-xs text-arena-500">
              {isEs
                ? "El trazo sigue las calles por las que circula la ruta. Los puntos son las paradas de referencia con nombre, no todas las paradas posibles."
                : "The line follows the streets the route runs along. The dots are named reference stops, not every possible stop."}
            </p>
          </div>

          <aside>
            <dl className="rounded-2xl border border-arena-200 bg-white p-5">
              {facts.map((fact, i) => (
                <div key={fact.label} className={i > 0 ? "mt-4 border-t border-arena-100 pt-4" : ""}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-arena-500">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-arena-900">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <DataConfidence
              className="mt-4"
              level="approx"
              checkedOn={CAMIONES_LAST_REVIEWED}
              locale={locale}
              note={
                isEs
                  ? "Tarifa y letrero de referencia pública. No hay horarios oficiales publicados para esta ruta."
                  : "Fare and sign from public reference data. No official timetable is published for this route."
              }
            />
          </aside>
        </div>

        {/* Paradas */}
        <section className="mt-14 max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-arena-900">
            {isEs ? "Por dónde pasa" : "Where it goes"}
          </h2>
          <p className="mt-2 text-arena-700">
            {isEs
              ? `Paradas de referencia del ${route.code}, en el orden del recorrido. El camión se detiene también entre ellas: basta con levantar la mano.`
              : `Reference stops on the ${route.code}, in running order. The bus also stops between them: just raise your hand.`}
          </p>

          <ol className="mt-5 space-y-0">
            {route.stops.map((stop, i) => (
              <li key={`${stop.name}-${i}`} className="flex gap-4">
                {/* Línea vertical con el color de la ruta: el recorrido se lee de un vistazo. */}
                <div className="flex flex-col items-center">
                  <span
                    className="mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-white shadow"
                    style={{ backgroundColor: route.color }}
                  />
                  {i < route.stops.length - 1 && (
                    <span className="w-0.5 flex-1" style={{ backgroundColor: `${route.color}44` }} />
                  )}
                </div>
                <p className="pb-5 text-sm font-medium text-arena-800">{stop.name}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Cómo se toma */}
        <section className="mt-10 max-w-3xl rounded-2xl border border-arena-200 bg-white p-6">
          <h2 className="font-display text-xl font-bold text-arena-900">
            {isEs ? `Cómo se toma el ${route.code}` : `How to take the ${route.code}`}
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-arena-700">
            <li>
              {isEs
                ? `Busca el letrero “${route.sign}” en el parabrisas. El número por sí solo no basta: varias rutas comparten código.`
                : `Look for the sign “${route.sign}” in the windshield. The number alone isn't enough: several routes share a code.`}
            </li>
            <li>
              {isEs
                ? `Paga $${route.fareMxn} en efectivo al chofer cuando subas. No hay boleto de vuelta ni trasbordo gratuito.`
                : `Pay MX$${route.fareMxn} in cash to the driver as you board. There's no return ticket and no free transfer.`}
            </li>
            <li>
              {route.allDay
                ? isEs
                  ? "Esta ruta circula las 24 horas, así que también funciona de madrugada."
                  : "This route runs around the clock, so it works in the small hours too."
                : isEs
                  ? "Esta ruta no es de 24 horas: al caer la noche deja de circular y la alternativa es taxi."
                  : "This is not a 24 h route: it stops running at nightfall and a taxi is the alternative."}
            </li>
            <li>
              {isEs
                ? "Para bajar, avisa con el timbre o de viva voz un poco antes de tu esquina."
                : "To get off, ring the bell or call out a little before your corner."}
            </li>
          </ul>
        </section>

        {/* Rutas relacionadas */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold text-arena-900">
              {isEs ? "Rutas que comparten paradas con ésta" : "Routes sharing stops with this one"}
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((other) => (
                <Link
                  key={other.slug}
                  href={`/${locale}/camiones-cancun/${other.slug}`}
                  className="group rounded-2xl border border-arena-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-terracotta-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500"
                >
                  <span
                    className="inline-flex h-7 min-w-[2.5rem] items-center justify-center rounded px-1.5 text-xs font-bold text-white"
                    style={{ backgroundColor: other.color }}
                  >
                    {other.code}
                  </span>
                  <h3 className="mt-2 font-display text-sm font-bold text-arena-900 transition-colors group-hover:text-terracotta-600">
                    {l(other.name, locale)}
                  </h3>
                  <p className="mt-1 text-xs text-arena-600">${other.fareMxn} MXN</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href={`/${locale}/camiones-cancun`}
            className="rounded-xl bg-arena-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-arena-800"
          >
            {isEs ? "Ver las 31 rutas en el mapa" : "See all 31 routes on the map"}
          </Link>
          <Link
            href={`/${locale}/aeropuerto-cancun`}
            className="rounded-xl border border-arena-200 bg-white px-5 py-2.5 text-sm font-medium text-arena-700 transition-colors hover:border-arena-400"
          >
            {isEs ? "Llegar desde el aeropuerto" : "Getting in from the airport"}
          </Link>
        </div>

        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-arena-500">{CAMIONES_ATTRIBUTION}</p>
      </div>
    </div>
  );
}

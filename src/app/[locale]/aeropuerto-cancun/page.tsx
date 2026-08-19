import Image from "next/image";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import AirportOptions from "@/components/airport/AirportOptions";
import AffiliateDisclosure from "@/components/editorial/AffiliateDisclosure";
import ZonaHoteleraGuide from "@/components/airport/ZonaHoteleraGuide";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { formatCheckedOn } from "@/components/ui/DataConfidence";
import { getCancunAirportGuide } from "@/lib/data/aeropuerto-cun";
import { POPULAR_DESTINATION_IMAGES } from "@/lib/destination-images";
import { l, seoAlternates, seoOpenGraph } from "@/lib/utils";

export const revalidate = 3600;

const PATH = "/aeropuerto-cancun";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const title =
    locale === "es"
      ? "Del aeropuerto de Cancún a tu hotel: precios reales 2026"
      : "Cancún airport to your hotel: real 2026 prices";
  const description =
    locale === "es"
      ? "ADO, taxi, traslado privado o renta de auto desde el aeropuerto de Cancún (CUN), con precios verificados. Más qué pasa con Uber y en qué kilómetro de la Zona Hotelera conviene dormir."
      : "ADO bus, taxi, private transfer or car rental from Cancún airport (CUN), with verified prices. Plus what happens with Uber and which Hotel Zone kilometre to sleep in.";
  return {
    title,
    description,
    alternates: seoAlternates(locale, PATH),
    openGraph: seoOpenGraph(locale, title, description, PATH),
    twitter: { card: "summary_large_image" as const, title, description },
  };
}

export default async function AeropuertoCancunPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  const guide = getCancunAirportGuide();
  const isEs = locale === "es";
  const baseUrl = "https://rutasmexico.com.mx";
  const reviewed = formatCheckedOn(guide.lastReviewed, locale);

  const faqs = [
    {
      q: isEs
        ? "¿Cuál es la forma más barata de salir del aeropuerto de Cancún?"
        : "What's the cheapest way out of Cancún airport?",
      a: isEs
        ? "El autobús ADO. Al centro de Cancún cuesta desde $145 MXN por persona y a Playa del Carmen desde $270 MXN, con 25 kg de equipaje documentado incluido. Compras el boleto en los mostradores dentro de las terminales 2, 3 y 4, y el autobús sale justo afuera. No necesitas reservar con anticipación salvo en temporada alta."
        : "The ADO bus. Downtown Cancún costs from MX$145 per person and Playa del Carmen from MX$270, with 25 kg of checked luggage included. You buy at the counters inside terminals 2, 3 and 4, and the bus leaves right outside. No advance booking needed except in high season.",
    },
    {
      q: isEs
        ? "¿El autobús ADO llega a la Zona Hotelera de Cancún?"
        : "Does the ADO bus reach the Cancún Hotel Zone?",
      a: isEs
        ? "No, y es el error más común. El ADO del aeropuerto te deja en la terminal del centro, sobre Av. Tulum esquina con Av. Uxmal. Desde ahí, para llegar al bulevar Kukulcán tienes que tomar un camión urbano R-1 o R-2, que cuesta unos pocos pesos y pasa constantemente. Funciona bien de día y con equipaje ligero; con maletas grandes o llegando de madrugada, conviene más un traslado reservado."
        : "No, and it's the most common mistake. The airport ADO drops you at the downtown terminal on Av. Tulum at Av. Uxmal. From there, to reach Kukulcán Boulevard you take an R-1 or R-2 city bus — a few pesos, running constantly. It works well by day with light luggage; with big suitcases or a late-night arrival, a pre-booked transfer makes more sense.",
    },
    {
      q: isEs ? "¿Puedo pedir un Uber en el aeropuerto de Cancún?" : "Can I get an Uber at Cancún airport?",
      a: isEs
        ? "Legalmente sí: desde 2025 hay un amparo con suspensión definitiva que impide a las autoridades sancionar a conductores de plataforma que suban o bajen pasajeros en aeropuertos mexicanos. En la práctica es incómodo: el operador del aeropuerto declaró en marzo de 2026 que no tiene proyecto para abrir espacios a estas plataformas, no hay zona designada de recogida y el conflicto con el sindicato de taxistas sigue abierto. Ten un plan B antes de aterrizar."
        : "Legally yes: since 2025 a court order bars authorities from sanctioning platform drivers who pick up or drop off passengers at Mexican airports. In practice it's awkward: the airport operator said in March 2026 it has no plan to open designated space to these platforms, there's no marked pickup area, and the dispute with the taxi union is still live. Have a backup plan before you land.",
    },
    {
      q: isEs
        ? "¿Cuánto cuesta un taxi del aeropuerto de Cancún a la Zona Hotelera?"
        : "How much is a taxi from Cancún airport to the Hotel Zone?",
      a: isEs
        ? "La tarifa de mostrador ronda los 45 USD por vehículo, no por persona. Reservando en línea con anticipación suele bajar cerca de la mitad. Ojo con dos cosas: no puedes tomar un taxi de calle dentro del aeropuerto, y el viaje de regreso desde tu hotel al aeropuerto se consigue mucho más barato, entre 400 y 600 pesos."
        : "The counter rate runs around US$45 per vehicle, not per person. Booking online in advance usually cuts it roughly in half. Two things to watch: you can't hail a street taxi inside the airport, and the return leg from your hotel to the airport is far cheaper, around 400 to 600 pesos.",
    },
    {
      q: isEs
        ? "¿En qué parte de la Zona Hotelera de Cancún conviene hospedarse?"
        : "Where in the Cancún Hotel Zone should I stay?",
      a: isEs
        ? "Depende del kilómetro, y la diferencia es grande. La Zona Hotelera tiene forma de 7: del kilómetro 1 al 9 mira al norte, hacia la Bahía de Mujeres, con agua casi sin olas y mucho menos sargazo — es lo mejor para familias con niños pequeños. Del 9 al 15 está Punta Cancún, donde se concentran antros, plazas y restaurantes, con el ruido nocturno que eso implica. Del 15 al 20 el mar es abierto: playas anchas y resorts todo incluido, pero más oleaje y es el tramo que más sargazo recibe en temporada. Dato útil: el aeropuerto está al sur, así que el kilómetro 20 es el más cercano y el 1 el más lejano."
        : "It depends on the kilometre, and the difference is big. The Hotel Zone is shaped like a 7: kilometres 1 to 9 face north toward Bahía de Mujeres, with nearly waveless water and far less sargassum — best for families with small children. Kilometres 9 to 15 are Punta Cancún, where the clubs, malls and restaurants cluster, with the night noise that implies. From 15 to 20 the sea is open: wide beaches and all-inclusive resorts, but heavier surf and the stretch that takes the most sargassum in season. Useful detail: the airport is to the south, so kilometre 20 is the closest and kilometre 1 the farthest.",
    },
    {
      q: isEs
        ? "¿Cuándo hay sargazo en Cancún y qué playas se salvan?"
        : "When is there sargassum in Cancún and which beaches escape it?",
      a: isEs
        ? "La temporada va aproximadamente de abril a octubre, con el pico entre mayo y agosto, pero varía mucho de un año a otro y hasta de una semana a otra según el viento. Nadie puede prometerte una playa limpia en una fecha concreta. Lo que sí es consistente es la geografía: las playas orientadas al norte dentro de la Bahía de Mujeres —Las Perlas, Playa del Niño, Tortugas, Langosta y Caracol— reciben una fracción de lo que recibe el lado este del kilómetro 9 en adelante."
        : "The season runs roughly April to October, peaking between May and August, but it swings a lot year to year and even week to week with the wind. Nobody can promise you a clean beach on a specific date. What is consistent is the geography: north-facing beaches inside Bahía de Mujeres — Las Perlas, Playa del Niño, Tortugas, Langosta and Caracol — get a fraction of what the east side from kilometre 9 onward receives.",
    },
    {
      q: isEs
        ? "¿Conviene rentar un auto en el aeropuerto de Cancún?"
        : "Is renting a car at Cancún airport worth it?",
      a: isEs
        ? "Conviene si vas a moverte varios días por la Riviera Maya, cenotes o Valladolid. Pero cuidado con el precio anunciado: en Cancún el seguro obligatorio de responsabilidad civil casi nunca viene incluido en la tarifa de gancho y se cobra en el mostrador, lo que puede duplicar el costo real. Compara siempre el precio con seguro incluido y considera el estacionamiento, que en la Zona Hotelera es caro."
        : "Worth it if you're moving around the Riviera Maya, cenotes or Valladolid for several days. But watch the headline price: in Cancún the mandatory third-party insurance is almost never in the teaser rate and gets charged at the counter, which can double the real cost. Always compare with insurance included, and factor in parking, which is expensive in the Hotel Zone.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEs ? "Inicio" : "Home", item: `${baseUrl}/${locale}` },
      {
        "@type": "ListItem",
        position: 2,
        name: isEs ? "Destinos" : "Destinations",
        item: `${baseUrl}/${locale}/destinos`,
      },
      { "@type": "ListItem", position: 3, name: isEs ? "Aeropuerto de Cancún" : "Cancún airport" },
    ],
  };

  // El dato duro del artículo son los precios: los exponemos también como
  // ItemList para que Google pueda leerlos sin depender del render.
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isEs
      ? "Formas de salir del aeropuerto de Cancún"
      : "Ways to get out of Cancún airport",
    itemListElement: guide.options.map((option, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: l(option.name, locale),
      ...(option.price.amount !== undefined
        ? {
            item: {
              "@type": "Service",
              name: l(option.name, locale),
              areaServed: { "@type": "City", name: "Cancún" },
              offers: {
                "@type": "Offer",
                price: option.price.amount,
                priceCurrency: option.price.currency,
              },
            },
          }
        : {}),
    })),
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      {/* Hero */}
      <div className="relative overflow-hidden py-16 md:py-20">
        <Image
          src={POPULAR_DESTINATION_IMAGES.cancun}
          alt={isEs ? "Llegada al aeropuerto de Cancún" : "Arriving at Cancún airport"}
          fill
          className="object-cover"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-arena-50" />
        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 backdrop-blur-sm">
              <span aria-hidden="true">✈️</span>
              <span className="text-sm font-medium text-white">
                {isEs ? "Aeropuerto de Cancún (CUN)" : "Cancún airport (CUN)"}
              </span>
            </div>
            <h1 className="font-display mb-3 text-3xl font-bold text-white drop-shadow-lg md:text-5xl">
              {isEs ? "Del aeropuerto de Cancún a tu hotel" : "From Cancún airport to your hotel"}
            </h1>
            <p className="text-lg text-white/90 drop-shadow">
              {isEs
                ? "Cuánto cuesta de verdad cada opción, de dónde sacamos el precio y cuándo lo revisamos."
                : "What each option really costs, where the price comes from, and when we last checked it."}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-arena-50 pb-12">
        <div className="container-custom relative z-20 -mt-8">
          {/* Lead editorial */}
          <div className="mb-6 rounded-2xl border border-arena-100 bg-white p-6 shadow-lg md:p-8">
            <Breadcrumbs
              className="mb-4"
              items={[
                { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
                { name: isEs ? "Destinos" : "Destinations", href: `/${locale}/destinos` },
                { name: isEs ? "Aeropuerto de Cancún" : "Cancún airport" },
              ]}
            />
            <p className="leading-relaxed text-arena-700">
              {isEs
                ? "Salir del aeropuerto de Cancún es la parte del viaje donde más gente paga de más, y casi siempre por lo mismo: llega cansada, no sabe cuánto debería costar y acepta lo primero que le ofrecen en la puerta. La diferencia entre el autobús ADO y un taxi de mostrador para el mismo trayecto puede ser de más de diez veces. Abajo están las cuatro formas reales de salir, con el precio que encontramos, de dónde lo sacamos y la fecha en que lo revisamos, para que puedas juzgar tú mismo qué tan fresco es el dato."
                : "Leaving Cancún airport is the part of the trip where most people overpay, almost always for the same reason: they land tired, don't know what it should cost, and take the first offer at the door. The gap between the ADO bus and a counter taxi for the same trip can be more than tenfold. Below are the four real ways out, with the price we found, where we found it, and the date we checked — so you can judge for yourself how fresh the number is."}
            </p>
            <p className="mt-4 rounded-xl border border-arena-200 bg-arena-50 p-4 text-sm leading-relaxed text-arena-700">
              <strong className="text-arena-900">
                {isEs ? "Sobre las terminales: " : "About the terminals: "}
              </strong>
              {l(guide.terminalNote, locale)}
            </p>
            <p className="mt-4 text-xs text-arena-500">
              {isEs ? "Página revisada por última vez el " : "Page last reviewed on "}
              <strong className="text-arena-700">{reviewed}</strong>.{" "}
              <Link href={`/${locale}/metodologia`} className="underline hover:text-terracotta-600">
                {isEs ? "Cómo verificamos los datos" : "How we verify our data"}
              </Link>
            </p>
          </div>

          {/* Opciones */}
          <h2 className="font-display mb-4 text-2xl font-bold text-arena-900">
            {isEs ? "Las formas de salir, comparadas" : "The ways out, compared"}
          </h2>
          <AirportOptions options={guide.options} locale={locale} />

          <AffiliateDisclosure locale={locale} variant="inline" />

          {/* Dónde dormir: el lector que acaba de resolver cómo salir del
              aeropuerto todavía tiene el hotel por elegir, o quiere confirmar
              que eligió bien. Es el punto natural de la página para esto. */}
          <ZonaHoteleraGuide locale={locale} />

          {/* El ADO del aeropuerto deja en el centro, no en Kukulcán. Este es el
              punto donde el lector necesita el camión urbano, así que aquí va
              el enlace al catálogo de rutas. */}
          <section className="mt-8 rounded-2xl border border-terracotta-200 bg-terracotta-50 p-6 md:p-8">
            <h2 className="font-display mb-3 text-xl font-bold text-arena-900">
              {isEs
                ? "Del centro a tu hotel: el camión urbano"
                : "Downtown to your hotel: the city bus"}
            </h2>
            <p className="leading-relaxed text-arena-800">
              {isEs
                ? "Si llegaste en ADO, estás en la terminal del centro y todavía te falta el último tramo. Lo hace el camión urbano: diez pesos por la ciudad, doce si entra a Kukulcán, en efectivo al chofer. El R1 y el R2 pasan las 24 horas y son los que usa casi todo el mundo."
                : "If you came by ADO you are at the downtown terminal with one leg still to go. The city bus covers it: ten pesos around town, twelve if it enters Kukulcán, cash to the driver. The R1 and R2 run around the clock and are what almost everyone takes."}
            </p>
            <Link
              href={`/${locale}/camiones-cancun`}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-terracotta-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-terracotta-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500"
            >
              {isEs ? "Ver las 31 rutas en el mapa" : "See all 31 routes on the map"}
            </Link>
          </section>

          {/* Uber / DiDi */}
          <section className="mt-8 rounded-2xl border border-azul-200 bg-azul-50 p-6 md:p-8">
            <h2 className="font-display mb-3 text-xl font-bold text-arena-900">
              {l(guide.rideshare.title, locale)}
            </h2>
            <p className="leading-relaxed text-arena-800">{l(guide.rideshare.body, locale)}</p>
            <p className="mt-4 text-xs text-arena-600">
              {isEs ? "Situación al " : "Situation as of "}
              {formatCheckedOn(guide.rideshare.checkedOn, locale)}.{" "}
              {isEs ? "Fuentes: " : "Sources: "}
              {guide.rideshare.sources.map((source, i) => (
                <span key={source.url}>
                  {i > 0 && " · "}
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="underline hover:text-terracotta-600"
                  >
                    {source.label}
                  </a>
                </span>
              ))}
            </p>
          </section>

          {/* Advertencias */}
          <section className="mt-8 rounded-2xl border border-arena-100 bg-white p-6 shadow-lg md:p-8">
            <h2 className="font-display mb-5 text-xl font-bold text-arena-900">
              {isEs ? "Tres cosas que conviene saber antes de aterrizar" : "Three things worth knowing before you land"}
            </h2>
            <div className="space-y-5">
              {guide.warnings.map((warning) => (
                <div key={warning.id} className="border-l-4 border-oro-300 pl-4">
                  <h3 className="font-display font-bold text-arena-900">{l(warning.title, locale)}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-arena-700">{l(warning.body, locale)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-8 rounded-2xl border border-arena-100 bg-white p-6 shadow-lg md:p-8">
            <h2 className="font-display mb-4 text-xl font-bold text-arena-900">
              {isEs ? "Preguntas frecuentes" : "FAQ"}
            </h2>
            <div className="divide-y divide-arena-100">
              {faqs.map((f, i) => (
                <details key={i} className="group py-3" {...(i === 0 ? { open: true } : {})}>
                  <summary className="flex list-none cursor-pointer items-center justify-between gap-3 rounded text-sm font-semibold text-arena-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 md:text-base">
                    <span>{f.q}</span>
                    <svg
                      className="h-4 w-4 flex-shrink-0 text-arena-500 transition-transform group-open:rotate-180"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.24 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-arena-700">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Siguientes pasos */}
          <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: `/${locale}/camiones-cancun`,
                title: isEs ? "Camiones de Cancún" : "Cancún city buses",
                desc: isEs ? "Las 31 rutas urbanas, tarifas y mapa" : "All 31 city routes, fares and map",
              },
              {
                href: `/${locale}/destinos/cancun`,
                title: isEs ? "Guía de Cancún" : "Cancún guide",
                desc: isEs ? "Qué hacer, dónde quedarse y cuándo ir" : "What to do, where to stay, when to go",
              },
              {
                href: `/${locale}/autobuses`,
                title: isEs ? "Autobuses en México" : "Buses in Mexico",
                desc: isEs ? "ADO, ETN y 30+ líneas comparadas" : "ADO, ETN and 30+ lines compared",
              },
              {
                href: `/${locale}/hoteles`,
                title: isEs ? "Hoteles en Cancún" : "Hotels in Cancún",
                desc: isEs ? "Compara Zona Hotelera y centro" : "Compare Hotel Zone and downtown",
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-2xl border border-arena-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-terracotta-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500"
              >
                <h3 className="font-display font-bold text-arena-900 transition-colors group-hover:text-terracotta-600">
                  {card.title}
                </h3>
                <p className="mt-1 text-sm text-arena-700">{card.desc}</p>
              </Link>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

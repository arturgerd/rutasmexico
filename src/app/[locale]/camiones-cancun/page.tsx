import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import DataConfidence from "@/components/ui/DataConfidence";
import CamionesExplorer from "@/components/camiones/CamionesExplorer";
import Opiniones from "@/components/opiniones/Opiniones";
import {
  CAMIONES_ATTRIBUTION,
  CAMIONES_FARE_VERIFIED_ON,
  CAMIONES_LAST_REVIEWED,
  getAllCamionRoutes,
  getHotelZoneRoutes,
  toCamionSummary,
} from "@/lib/data/camiones-cancun";
import { seoAlternates, seoOpenGraph } from "@/lib/utils";

export const revalidate = 86400;

const PATH = "/camiones-cancun";
const BASE_URL = "https://rutasmexico.com.mx";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const title =
    locale === "es"
      ? "Camiones de Cancún: rutas, tarifas y mapa 2026"
      : "Cancún city buses: routes, fares and map 2026";
  const description =
    locale === "es"
      ? "Las 31 rutas de camión y combi de Cancún en un mapa: cuánto cuestan, cuáles entran a la Zona Hotelera, cuáles son de 24 horas y qué letrero buscar antes de subir."
      : "All 31 city bus and shared-van routes in Cancún on one map: what they cost, which ones reach the Hotel Zone, which run 24 hours and what sign to look for before boarding.";

  return {
    title,
    description,
    alternates: seoAlternates(locale, PATH),
    openGraph: seoOpenGraph(locale, title, description, PATH),
    twitter: { card: "summary_large_image" as const, title, description },
  };
}

export default async function CamionesCancunPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  const isEs = locale === "es";
  const routes = getAllCamionRoutes();
  const summaries = routes.map((route) => toCamionSummary(route, locale));
  const hotelZone = getHotelZoneRoutes();
  const allDayCount = routes.filter((r) => r.allDay).length;

  const faqs = [
    {
      q: isEs
        ? "¿Cuánto cuesta el camión en Cancún?"
        : "How much is the bus in Cancún?",
      a: isEs
        ? "Diez pesos dentro de la ciudad y doce pesos si la ruta entra al bulevar Kukulcán, en la Zona Hotelera. Se paga en efectivo al subir, directo al chofer, y conviene llevar monedas o billetes chicos: no siempre hay cambio de doscientos. No hay boleto de ida y vuelta ni transbordo gratuito, cada camión que tomas se paga aparte."
        : "Ten pesos within the city and twelve pesos if the route enters Kukulcán Boulevard in the Hotel Zone. You pay cash on boarding, straight to the driver, and small notes or coins help: change for a 200 isn't guaranteed. There are no return tickets and no free transfers — every bus you board is paid separately.",
    },
    {
      q: isEs
        ? "¿Qué camión va del centro a la Zona Hotelera?"
        : "Which bus goes from downtown to the Hotel Zone?",
      a: isEs
        ? `El R1 y el R2 son los dos habituales y circulan las 24 horas. También entran a Kukulcán el R10, el R15, el R27 y varias variantes del R2. En total hay ${hotelZone.length} rutas que llegan a la Zona Hotelera. Una vez sobre el bulevar da bastante igual cuál tomes: todas recorren el mismo eje, sólo cambia por dónde vienen antes.`
        : `The R1 and R2 are the usual pair and both run around the clock. The R10, R15, R27 and several R2 variants also enter Kukulcán. In total ${hotelZone.length} routes reach the Hotel Zone. Once you're on the boulevard it barely matters which one you take: they all run the same axis, they only differ in how they got there.`,
    },
    {
      q: isEs
        ? "¿Hay camiones de noche en Cancún?"
        : "Do buses run at night in Cancún?",
      a: isEs
        ? `Sí, pero sólo en el corredor de la Zona Hotelera: ${allDayCount} rutas de las 31 operan de forma continua las 24 horas, encabezadas por el R1 y el R2. Las rutas puramente urbanas dejan de circular al caer la noche y a partir de ahí la alternativa es taxi. El R27 se acerca pero no es de 24 h: sus últimas corridas rondan las 23:30.`
        : `Yes, but only along the Hotel Zone corridor: ${allDayCount} of the 31 routes run continuously around the clock, led by the R1 and R2. Purely city routes stop at nightfall and from then on a taxi is the alternative. The R27 comes close but is not a 24 h route: its last runs are around 23:30.`,
    },
    {
      q: isEs
        ? "¿Cómo sé qué camión tomar si todos dicen R2?"
        : "How do I know which bus to take if they all say R2?",
      a: isEs
        ? "Por el letrero del parabrisas, no por el número. El R2 tiene cinco variantes que salen de colonias distintas —La Joya, Lakin, El Torito, Villas Otoch— y todas se anuncian como R2. El cartón de cartón o el rótulo pintado dice a dónde va de verdad: Hoteles, Kabah, Walmart, Puerto Juárez. Si vas a la Zona Hotelera, basta con que diga Hoteles."
        : "By the windshield sign, not the number. The R2 has five variants leaving from different neighbourhoods — La Joya, Lakin, El Torito, Villas Otoch — and all of them advertise as R2. The cardboard or painted sign is what tells you where it actually goes: Hoteles, Kabah, Walmart, Puerto Juárez. If you're heading to the Hotel Zone, Hoteles is enough.",
    },
    {
      q: isEs
        ? "¿El camión sirve para llegar desde el aeropuerto?"
        : "Can I take a city bus from the airport?",
      a: isEs
        ? "No directamente. El transporte urbano no entra a las terminales del aeropuerto de Cancún: ahí operan el ADO, los taxis autorizados y los traslados reservados. El ADO te deja en la terminal del centro, sobre Av. Tulum, y es justo ahí donde se toma el R1 o el R2 hacia Kukulcán. Con maletas grandes o de madrugada, un traslado sale mejor."
        : "Not directly. City transport doesn't enter the Cancún airport terminals: those are served by ADO, authorised taxis and pre-booked transfers. The ADO drops you at the downtown terminal on Av. Tulum, and that's exactly where you catch the R1 or R2 towards Kukulcán. With big suitcases or a late arrival, a transfer works out better.",
    },
    {
      q: isEs
        ? "¿Se puede pagar el camión con tarjeta?"
        : "Can I pay the bus by card?",
      a: isEs
        ? "No. Es efectivo al chofer, en pesos mexicanos. Algunas unidades tienen validador pero en la práctica el pago sigue siendo en mano. Ten cambio antes de subir: si sólo traes billetes grandes es probable que el chofer no pueda cobrarte."
        : "No. It's cash to the driver, in Mexican pesos. Some vehicles have a validator but in practice payment is still by hand. Have change before boarding: with only large notes the driver likely can't take your fare.",
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
      { "@type": "ListItem", position: 1, name: isEs ? "Inicio" : "Home", item: `${BASE_URL}/${locale}` },
      {
        "@type": "ListItem",
        position: 2,
        name: isEs ? "Aeropuerto de Cancún" : "Cancún airport",
        item: `${BASE_URL}/${locale}/aeropuerto-cancun`,
      },
      { "@type": "ListItem", position: 3, name: isEs ? "Camiones de Cancún" : "Cancún city buses" },
    ],
  };

  // El catálogo es el dato duro de la página: se expone también como ItemList
  // para que Google lo lea sin depender de que ejecute el mapa.
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isEs ? "Rutas de camión urbano de Cancún" : "Cancún city bus routes",
    numberOfItems: summaries.length,
    itemListElement: summaries.map((route, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${route.code} — ${route.name}`,
      url: `${BASE_URL}/${locale}/camiones-cancun/${route.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-arena-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <div className="container-custom py-10 md:py-14">
        <Breadcrumbs
          className="mb-6"
          items={[
            { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
            { name: isEs ? "Aeropuerto de Cancún" : "Cancún airport", href: `/${locale}/aeropuerto-cancun` },
            { name: isEs ? "Camiones de Cancún" : "Cancún city buses" },
          ]}
        />

        <header className="max-w-3xl">
          <h1 className="font-display text-3xl font-bold leading-tight text-arena-900 md:text-4xl">
            {isEs
              ? "Camiones de Cancún: las 31 rutas, sus tarifas y por dónde pasan"
              : "Cancún city buses: all 31 routes, their fares and where they go"}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-arena-700">
            {isEs
              ? "El transporte urbano de Cancún no tiene mapa oficial, ni horarios publicados, ni app de rastreo. Lo que sí tiene es una lógica sencilla: diez pesos por la ciudad, doce si el camión entra a Kukulcán, y un letrero en el parabrisas que vale más que el número de la ruta. Aquí están las 31 rutas dibujadas sobre las calles reales."
              : "Cancún city transport has no official map, no published timetable and no tracking app. What it does have is a simple logic: ten pesos around town, twelve if the bus enters Kukulcán, and a windshield sign that matters more than the route number. Here are all 31 routes drawn over the real streets."}
          </p>

          {/* Dos etiquetas y no una: la tarifa del corredor de Kukulcán está
              comprobada pagándola y la urbana no. Fundirlas en un solo
              "aproximado" tira la comprobación; fundirlas en un solo
              "verificado" afirma de más sobre 22 rutas. */}
          <div className="mt-5 space-y-3">
            <DataConfidence
              level="verified"
              checkedOn={CAMIONES_FARE_VERIFIED_ON}
              locale={locale}
              source={isEs ? "Comprobación propia a bordo" : "Our own check on board"}
              note={
                isEs
                  ? `Los $12 de las ${hotelZone.length} rutas que entran a la Zona Hotelera están comprobados pagando el pasaje.`
                  : `The $12 fare on the ${hotelZone.length} routes that enter the Hotel Zone was checked by paying it.`
              }
            />
            <DataConfidence
              level="approx"
              checkedOn={CAMIONES_LAST_REVIEWED}
              locale={locale}
              source={isEs ? "Referencia pública del transporte urbano de Cancún" : "Public reference for Cancún city transport"}
              note={
                isEs
                  ? "Los $10 de las rutas urbanas y los letreros son de referencia pública, sin comprobación propia. Los trazos siguen calles de OpenStreetMap: muestran por dónde va cada ruta, no la posición de las unidades."
                  : "The $10 city-route fare and the windshield signs come from public reference data, not checked by us. The lines follow OpenStreetMap streets: they show where each route runs, not where the vehicles are."
              }
            />
          </div>
        </header>

        {/* Cifras de cabecera */}
        <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { value: String(routes.length), label: isEs ? "rutas en el catálogo" : "routes catalogued" },
            { value: String(hotelZone.length), label: isEs ? "llegan a la Zona Hotelera" : "reach the Hotel Zone" },
            { value: String(allDayCount), label: isEs ? "operan 24 horas" : "run 24 hours" },
            { value: "$10–$12", label: isEs ? "pesos por viaje" : "pesos per ride" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-arena-200 bg-white p-4">
              <dt className="font-display text-2xl font-bold text-terracotta-600">{stat.value}</dt>
              <dd className="mt-1 text-xs leading-snug text-arena-600">{stat.label}</dd>
            </div>
          ))}
        </dl>

        {/* Mapa, buscador y planificador */}
        <section className="mt-10" aria-label={isEs ? "Mapa de rutas" : "Route map"}>
          <CamionesExplorer routes={summaries} locale={locale} />
        </section>

        {/* Lo que hay que saber */}
        <section className="mt-14 max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-arena-900">
            {isEs ? "Cinco cosas antes de subirte" : "Five things before you board"}
          </h2>
          <div className="mt-5 space-y-5">
            {[
              {
                title: isEs ? "El letrero manda sobre el número" : "The sign beats the number",
                body: isEs
                  ? "Cinco rutas distintas se anuncian como R2 y salen de colonias diferentes. Lo que te dice a dónde va el camión es el rótulo del parabrisas: Hoteles, Kabah, Walmart, Puerto Juárez. Si dice Hoteles, entra a la Zona Hotelera."
                  : "Five different routes advertise as R2 and leave from different neighbourhoods. What tells you where the bus is going is the windshield sign: Hoteles, Kabah, Walmart, Puerto Juárez. If it says Hoteles, it enters the Hotel Zone.",
              },
              {
                title: isEs ? "Se paga en efectivo, al subir" : "Cash, as you board",
                body: isEs
                  ? "Diez pesos por la ciudad, doce hacia la Zona Hotelera. Directo al chofer y sin boleto de vuelta. Cada trasbordo se paga otra vez, así que un viaje con cambio de camión te sale al doble."
                  : "Ten pesos around town, twelve towards the Hotel Zone. Straight to the driver, no return ticket. Every transfer is paid again, so a trip with a change of bus costs double.",
              },
              {
                title: isEs ? "En Kukulcán no esperes un número concreto" : "On Kukulcán, don't wait for a specific number",
                body: isEs
                  ? "Dentro de la Zona Hotelera todas las rutas recorren el mismo bulevar. Cualquier unidad que vaya en tu sentido te sirve, y pasan cada pocos minutos a cualquier hora."
                  : "Inside the Hotel Zone every route runs the same boulevard. Any bus heading your way will do, and they come every few minutes at any hour.",
              },
              {
                title: isEs ? "La parada es donde levantes la mano" : "The stop is wherever you raise your hand",
                body: isEs
                  ? "Hay paradas marcadas, pero en la práctica el camión se detiene donde le hagas la señal, siempre que sea seguro. Para bajar, se avisa con un timbre o de viva voz."
                  : "There are marked stops, but in practice the bus pulls over wherever you flag it down, as long as it's safe. To get off, you ring the bell or just say so.",
              },
              {
                title: isEs ? "Las combis son otra cosa" : "Shared vans are a different animal",
                body: isEs
                  ? "Las rutas de combi —como la de Bonfil o la 259— usan camionetas de unas catorce plazas. Misma tarifa, pero si van llenas no paran, y con maletas grandes no es la mejor idea."
                  : "Shared-van routes — like the Bonfil or the 259 — use fourteen-seat vans. Same fare, but if they're full they won't stop, and with big suitcases they're not the best idea.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-arena-200 bg-white p-5">
                <h3 className="font-display font-bold text-arena-900">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-arena-700">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Rutas a la Zona Hotelera */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-arena-900">
            {isEs ? "Las rutas que entran a la Zona Hotelera" : "The routes that enter the Hotel Zone"}
          </h2>
          <p className="mt-2 max-w-3xl text-arena-700">
            {isEs
              ? "Son las que cobran doce pesos y recorren el bulevar Kukulcán. Si tu hotel está en la hotelera, éstas son las únicas que te sirven sin trasbordo."
              : "These are the twelve-peso ones that run Kukulcán Boulevard. If your hotel is in the Hotel Zone, these are the only ones that get you there without a transfer."}
          </p>

          <div className="mt-5 overflow-x-auto rounded-2xl border border-arena-200 bg-white">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="border-b border-arena-200 bg-arena-50 text-left">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold text-arena-700">{isEs ? "Ruta" : "Route"}</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-arena-700">{isEs ? "Letrero" : "Sign"}</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-arena-700">{isEs ? "Horario" : "Hours"}</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-arena-700">{isEs ? "Tarifa" : "Fare"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-arena-100">
                {hotelZone.map((route) => (
                  <tr key={route.slug} className="hover:bg-arena-50">
                    <td className="px-4 py-3">
                      <Link
                        href={`/${locale}/camiones-cancun/${route.slug}`}
                        className="inline-flex items-center gap-2 font-medium text-arena-900 hover:text-terracotta-600"
                      >
                        <span
                          className="inline-flex h-6 min-w-[2.25rem] items-center justify-center rounded px-1 text-[11px] font-bold text-white"
                          style={{ backgroundColor: route.color }}
                        >
                          {route.code}
                        </span>
                        {isEs ? route.name.es : route.name.en}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-arena-700">{route.sign}</td>
                    <td className="px-4 py-3 text-arena-700">
                      {route.allDay ? (
                        <span className="rounded-full bg-jade-50 px-2 py-0.5 text-xs font-medium text-jade-800">
                          {isEs ? "24 horas" : "24 hours"}
                        </span>
                      ) : (
                        <span className="text-xs">{isEs ? "Diurno" : "Daytime"}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-arena-900">${route.fareMxn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Preguntas */}
        <section className="mt-14 max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-arena-900">
            {isEs ? "Preguntas frecuentes" : "Frequently asked questions"}
          </h2>
          <div className="mt-5 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-arena-200 bg-white p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-display font-bold text-arena-900 marker:content-none">
                  {f.q}
                  <svg
                    className="h-5 w-5 shrink-0 text-arena-400 transition-transform group-open:rotate-180"
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

        {/* Nadie conoce mejor una ruta que quien la toma a diario. */}
        <Opiniones
          locale={locale}
          tema="camiones-cancun"
          titulo={isEs ? "Lo que cuenta quien se sube" : "What the people who ride say"}
        />

        {/* Siguientes pasos */}
        <section className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              href: `/${locale}/aeropuerto-cancun`,
              title: isEs ? "Del aeropuerto a tu hotel" : "Airport to your hotel",
              desc: isEs ? "ADO, taxi y traslados con precios verificados" : "ADO, taxi and transfers with verified prices",
            },
            {
              href: `/${locale}/destinos/cancun`,
              title: isEs ? "Guía de Cancún" : "Cancún guide",
              desc: isEs ? "Qué hacer, dónde quedarse y cuándo ir" : "What to do, where to stay, when to go",
            },
            {
              href: `/${locale}/autobuses`,
              title: isEs ? "Autobuses foráneos" : "Intercity buses",
              desc: isEs ? "ADO, ETN y 30+ líneas comparadas" : "ADO, ETN and 30+ lines compared",
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

        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-arena-500">
          {CAMIONES_ATTRIBUTION}{" "}
          {isEs
            ? "No somos un servicio oficial del transporte urbano de Cancún ni tenemos relación con las empresas operadoras."
            : "We are not an official Cancún city transport service and have no relationship with the operating companies."}
        </p>
      </div>
    </div>
  );
}

import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getAllAirports } from "@/lib/data/airports";
import AviasalesEmbed from "@/components/widgets/AviasalesEmbed";
import AirlineGrid from "@/components/widgets/AirlineGrid";
import FlightsGuide from "@/components/editorial/FlightsGuide";
import { PAGE_HERO_IMAGES } from "@/lib/destination-images";
import { seoAlternates, seoOpenGraph } from "@/lib/utils";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const title = locale === "es"
    ? "Vuelos baratos en México 2026 | Volaris y más"
    : "Cheap flights to Mexico 2026 | Volaris, Viva & more";
  const description = locale === "es"
    ? "Compara precios de vuelos de todas las aerolineas mexicanas: Volaris, VivaAerobus, Aeromexico, TAR y mas. Encuentra el vuelo mas barato."
    : "Compare flight prices from all Mexican airlines: Volaris, VivaAerobus, Aeromexico, TAR and more. Find the cheapest flight.";
  const ogImage = "https://rutasmexico.com.mx/og-image.png";
  return {
    title,
    description,
    alternates: seoAlternates(locale, "/vuelos"),
    openGraph: seoOpenGraph(locale, title, description, "/vuelos", ogImage),
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function VuelosPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const airports = await getAllAirports();

  const isEs = locale === "es";

  const faqs = [
    {
      q: isEs ? "¿Cuál es la aerolínea más barata de México?" : "Which is the cheapest airline in Mexico?",
      a: isEs
        ? "Volaris y VivaAerobus son las aerolíneas de bajo costo más baratas en México, con tarifas básicas desde $600-900 MXN una vía en rutas domésticas. Aeroméxico es más cara pero incluye maleta documentada de 25 kg. Para vuelos con equipaje, compara el total: un low-cost con maleta extra pagada suele empatar o superar el precio de Aeroméxico."
        : "Volaris and VivaAerobus are the cheapest low-cost airlines in Mexico, with basic fares from $600-900 MXN one way on domestic routes. Aeromexico is more expensive but includes a 25 kg checked bag. For trips with luggage, compare the total: a low-cost with extra baggage often ties or exceeds Aeromexico's price.",
    },
    {
      q: isEs ? "¿Cuándo son los vuelos más baratos?" : "When are flights cheapest?",
      a: isEs
        ? "Las tarifas más bajas se consiguen reservando con 3 a 8 semanas de anticipación, evitando viernes, domingos y festivos. Septiembre, segunda mitad de octubre y primera mitad de noviembre son los meses más baratos. Los más caros: diciembre (Navidad), Semana Santa, julio-agosto y puentes largos. Activa alertas de precio en Google Flights para rutas específicas."
        : "The lowest fares come from booking 3 to 8 weeks ahead and avoiding Fridays, Sundays and holidays. September, late October, and early November are the cheapest months. Most expensive: December (Christmas), Holy Week, July-August and Mexican long weekends. Set price alerts on Google Flights for specific routes.",
    },
    {
      q: isEs ? "¿Qué diferencia hay entre MEX y AIFA en CDMX?" : "What's the difference between MEX and AIFA in Mexico City?",
      a: isEs
        ? "El Aeropuerto Benito Juárez (MEX) está a 13 km del Centro y concentra la mayoría de vuelos domésticos e internacionales. Felipe Ángeles (AIFA) está a 50 km en Santa Lucía y tiene vuelos más baratos de Volaris y VivaAerobus pero suma 1 hora extra de traslado. Si vives al norte de CDMX o Estado de México, AIFA conviene; desde el sur o centro, MEX casi siempre gana."
        : "Benito Juárez International (MEX) is 13 km from downtown and handles most domestic and international flights. Felipe Ángeles (AIFA) is 50 km away in Santa Lucía with cheaper Volaris and VivaAerobus fares but adds an extra hour of transfer time. If you live north of CDMX, AIFA works; from south or central, MEX almost always wins.",
    },
    {
      q: isEs ? "¿Qué aerolíneas comparan?" : "What airlines do you compare?",
      a: isEs
        ? "Comparamos todas las aerolíneas mexicanas (Volaris, VivaAerobus, Aeroméxico, TAR, Magnicharters, Aeromar) además de aerolíneas internacionales como American Airlines, United, Delta, JetBlue y más de 700 aerolíneas en total."
        : "We compare all Mexican airlines (Volaris, VivaAerobus, Aeromexico, TAR, Magnicharters, Aeromar) plus international airlines like American Airlines, United, Delta, JetBlue and over 700 airlines total.",
    },
    {
      q: isEs ? "¿Es gratis usar el buscador?" : "Is the search free?",
      a: isEs
        ? "Sí, buscar y comparar vuelos es completamente gratis. No cobramos ninguna comisión adicional; reservas directamente con la aerolínea al mismo precio."
        : "Yes, searching and comparing flights is completely free. We don't charge any additional fees; you book directly with the airline at the same price.",
    },
    {
      q: isEs ? "¿Los precios son en tiempo real?" : "Are prices in real time?",
      a: isEs
        ? "Sí, los precios se actualizan en tiempo real directamente desde los sistemas de las aerolíneas y agencias de viaje al momento de tu búsqueda."
        : "Yes, prices are updated in real time directly from airline and travel agency systems at the moment of your search.",
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
      { "@type": "ListItem", position: 1, name: isEs ? "Inicio" : "Home", item: `https://rutasmexico.com.mx/${locale}` },
      { "@type": "ListItem", position: 2, name: isEs ? "Vuelos" : "Flights" },
    ],
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero with background image */}
      <div className="relative py-16 md:py-20 overflow-hidden">
        <Image
          src={PAGE_HERO_IMAGES.flights}
          alt={locale === "es" ? "Vuelos baratos en Mexico" : "Cheap flights in Mexico"}
          fill
          className="object-cover"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-arena-50" />
        <div className="container-custom relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-white/20">
              <span>✈️</span>
              <span className="text-white text-sm font-medium">
                {locale === "es" ? "Compara 700+ aerolineas" : "Compare 700+ airlines"}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
              {locale === "es"
                ? "Vuelos baratos en Mexico"
                : "Cheap flights in Mexico"}
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto drop-shadow">
              {locale === "es"
                ? "Compara precios en tiempo real de Volaris, VivaAerobus, Aeromexico y todas las aerolineas"
                : "Compare real-time prices from Volaris, VivaAerobus, Aeromexico and all airlines"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-arena-50 pb-12">
        <div className="container-custom -mt-8 relative z-20">
          {/* Main search embed */}
          <AviasalesEmbed airports={airports} />

          {/* Editorial guide - main content for AdSense compliance */}
          <FlightsGuide locale={locale} />

          {/* Airline grid section */}
          <div className="mt-12">
            <AirlineGrid showTitle />
          </div>

          {/* How it works */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg border border-arena-100 p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-arena-900 mb-6 text-center">
              {locale === "es" ? "Como funciona?" : "How does it work?"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-terracotta-400 to-terracotta-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg shadow-terracotta-500/25">
                  🔍
                </div>
                <h3 className="font-display font-bold text-arena-900 mb-2">
                  {locale === "es" ? "1. Busca tu vuelo" : "1. Search your flight"}
                </h3>
                <p className="text-sm text-arena-500">
                  {locale === "es"
                    ? "Elige origen, destino y fechas. Nuestro buscador compara mas de 700 aerolineas."
                    : "Choose origin, destination and dates. Our search compares over 700 airlines."}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-azul-500 to-azul-700 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg shadow-azul-500/25">
                  📊
                </div>
                <h3 className="font-display font-bold text-arena-900 mb-2">
                  {locale === "es" ? "2. Compara precios" : "2. Compare prices"}
                </h3>
                <p className="text-sm text-arena-500">
                  {locale === "es"
                    ? "Ve precios de Volaris, VivaAerobus, Aeromexico, TAR y todas las aerolineas lado a lado."
                    : "See prices from Volaris, VivaAerobus, Aeromexico, TAR and all airlines side by side."}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-jade-500 to-jade-700 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg shadow-jade-500/25">
                  💰
                </div>
                <h3 className="font-display font-bold text-arena-900 mb-2">
                  {locale === "es" ? "3. Reserva y ahorra" : "3. Book and save"}
                </h3>
                <p className="text-sm text-arena-500">
                  {locale === "es"
                    ? "Elige el vuelo mas barato y reserva directamente con la aerolinea. Sin comisiones extra."
                    : "Pick the cheapest flight and book directly with the airline. No extra fees."}
                </p>
              </div>
            </div>
          </div>

          {/* FAQ / Trust signals */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-arena-100 p-6 md:p-8">
            <h2 className="font-display text-xl font-bold text-arena-900 mb-4">
              {locale === "es" ? "Preguntas frecuentes" : "FAQ"}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-arena-900 text-sm">
                  {locale === "es" ? "Que aerolineas comparan?" : "What airlines do you compare?"}
                </h3>
                <p className="text-sm text-arena-500 mt-1">
                  {locale === "es"
                    ? "Comparamos todas las aerolineas mexicanas (Volaris, VivaAerobus, Aeromexico, TAR, MagniCharters, Aeromar) ademas de aerolineas internacionales como American Airlines, United, Delta, JetBlue y mas de 700 aerolineas en total."
                    : "We compare all Mexican airlines (Volaris, VivaAerobus, Aeromexico, TAR, MagniCharters, Aeromar) plus international airlines like American Airlines, United, Delta, JetBlue and over 700 airlines total."}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-arena-900 text-sm">
                  {locale === "es" ? "Es gratis usar el buscador?" : "Is the search free?"}
                </h3>
                <p className="text-sm text-arena-500 mt-1">
                  {locale === "es"
                    ? "Si, buscar y comparar vuelos es completamente gratis. No cobramos ninguna comision adicional."
                    : "Yes, searching and comparing flights is completely free. We don't charge any additional fees."}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-arena-900 text-sm">
                  {locale === "es" ? "Los precios son en tiempo real?" : "Are prices in real time?"}
                </h3>
                <p className="text-sm text-arena-500 mt-1">
                  {locale === "es"
                    ? "Si, los precios se actualizan en tiempo real directamente desde los sistemas de las aerolineas y agencias de viaje."
                    : "Yes, prices are updated in real time directly from airline and travel agency systems."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

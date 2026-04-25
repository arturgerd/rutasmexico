import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import BusSearchEmbed from "@/components/widgets/BusSearchEmbed";
import BusCompanyGrid from "@/components/widgets/BusCompanyGrid";
import BusesGuide from "@/components/editorial/BusesGuide";
import { PAGE_HERO_IMAGES } from "@/lib/destination-images";
import { seoAlternates, seoOpenGraph } from "@/lib/utils";

export const revalidate = 3600;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const title = locale === "es"
    ? "Boletos de autobús baratos 2026 | ADO, ETN y más"
    : "Cheap bus tickets in Mexico 2026 | ADO, ETN & more";
  const description = locale === "es"
    ? "Compara precios de boletos de autobus de ADO, ETN, Primera Plus, Estrella Roja, Pullman y mas lineas en Mexico. Encuentra el autobus mas barato."
    : "Compare bus ticket prices from ADO, ETN, Primera Plus, Estrella Roja, Pullman and more lines in Mexico. Find the cheapest bus.";
  return {
    title,
    description,
    alternates: seoAlternates(locale, "/autobuses"),
    openGraph: seoOpenGraph(locale, title, description, "/autobuses"),
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
  };
}

export default async function AutobusesPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  const isEs = locale === "es";

  const faqs = [
    {
      q: isEs ? "¿Cuáles son las mejores líneas de autobuses en México?" : "What are the best bus lines in Mexico?",
      a: isEs
        ? "ADO (Grupo ADO) domina el sur y sureste; ETN y Primera Plus dominan el Bajío y occidente; Omnibus de México cubre el norte. En clases premium: ADO Platino, ETN Turistar Lujo y Primera Plus Select ofrecen asientos reclinables casi 180°, WiFi, pantallas individuales y sanitarios. Para viajes largos (más de 8 horas) siempre elige clase premium."
        : "ADO (Grupo ADO) dominates the south and southeast; ETN and Primera Plus dominate the Bajío and west; Omnibus de México covers the north. In premium classes: ADO Platino, ETN Turistar Lujo and Primera Plus Select offer seats reclining nearly 180°, WiFi, individual screens and restrooms. For long trips (8+ hours) always choose premium class.",
    },
    {
      q: isEs ? "¿Qué diferencia hay entre ADO, ETN y Primera Plus?" : "What's the difference between ADO, ETN and Primera Plus?",
      a: isEs
        ? "ADO opera rutas desde la Terminal TAPO (oriente de CDMX) principalmente al sureste (Puebla, Veracruz, Tabasco, Campeche, Yucatán). ETN y Primera Plus salen de Terminal Norte y cubren Bajío y occidente (Querétaro, Guanajuato, Guadalajara, Morelia). Los precios en clases equivalentes son muy similares entre ellas."
        : "ADO operates from TAPO Terminal (east of CDMX) mainly to the southeast (Puebla, Veracruz, Tabasco, Campeche, Yucatán). ETN and Primera Plus depart from Terminal Norte and cover the Bajío and western Mexico (Querétaro, Guanajuato, Guadalajara, Morelia). Prices in equivalent classes are very similar between them.",
    },
    {
      q: isEs ? "¿Es seguro viajar de noche en autobús?" : "Is it safe to travel by bus overnight?",
      a: isEs
        ? "Sí, los autobuses de clases premium (ADO Platino, ETN Turistar, Primera Plus Select) viajan por autopistas de cuota, son considerados seguros y llegan a terminales vigiladas. Evita líneas económicas en rutas muy largas de noche. Tips: mantén objetos de valor contigo en el porta-bulto superior, no en la bodega; lleva una sudadera porque el aire acondicionado es agresivo."
        : "Yes, premium-class buses (ADO Platino, ETN Turistar, Primera Plus Select) travel on toll highways, are considered safe, and arrive at guarded terminals. Avoid economy lines on very long overnight routes. Tips: keep valuables with you in the overhead rack, not in the cargo hold; bring a hoodie because the AC runs aggressive.",
    },
    {
      q: isEs ? "¿Desde qué terminal salen los autobuses en CDMX?" : "Which terminal in CDMX do buses leave from?",
      a: isEs
        ? "CDMX tiene cuatro terminales: Norte (al Bajío, occidente y frontera), Sur/Taxqueña (a Acapulco, Cuernavaca, Morelos), Oriente/TAPO (a Puebla, Veracruz, sureste) y Poniente (a Toluca y estado de México). Revisa siempre desde cuál sale tu corrida antes de salir porque están en puntos opuestos de la ciudad."
        : "CDMX has four terminals: Norte (to the Bajío, west and border), Sur/Taxqueña (to Acapulco, Cuernavaca, Morelos), Oriente/TAPO (to Puebla, Veracruz, southeast) and Poniente (to Toluca and State of Mexico). Always check which terminal your bus leaves from before traveling — they're at opposite ends of the city.",
    },
    {
      q: isEs ? "¿Cómo comprar boletos de autobús en línea?" : "How do I buy bus tickets online?",
      a: isEs
        ? "Los sitios oficiales de cada línea (ado.com.mx, etn.com.mx, primeraplus.com.mx) son los más confiables. También puedes usar agregadores como BusBud o ClickBus. Paga con tarjeta o Mercado Pago. Descarga el boleto en PDF o úsalo desde la app. Para viajar, lleva identificación oficial vigente; algunas líneas piden el mismo método de pago en mostrador."
        : "Each line's official site (ado.com.mx, etn.com.mx, primeraplus.com.mx) is most reliable. You can also use aggregators like BusBud or ClickBus. Pay by card or Mercado Pago. Download the ticket as PDF or use it from the app. To travel, bring valid photo ID; some lines require the same payment card at the counter.",
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
      { "@type": "ListItem", position: 2, name: isEs ? "Autobuses" : "Buses" },
    ],
  };

  const reservationServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ReservationService",
    name: isEs ? "Búsqueda de boletos de autobús" : "Bus ticket search",
    description: isEs
      ? "Busca y compara boletos de autobús de ADO, ETN, Primera Plus, Estrella Roja y más líneas mexicanas."
      : "Search and compare bus tickets from ADO, ETN, Primera Plus, Estrella Roja and more Mexican lines.",
    url: `https://rutasmexico.com.mx/${locale}/autobuses`,
    provider: { "@type": "Organization", name: "RutasMéxico", url: "https://rutasmexico.com.mx" },
    areaServed: { "@type": "Country", name: "Mexico" },
    serviceOutput: {
      "@type": "BusReservation",
      reservationFor: { "@type": "BusTrip" },
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isEs ? "Comparador de boletos de autobús en México" : "Mexico bus ticket comparison",
    serviceType: isEs ? "Búsqueda y comparación de autobuses" : "Bus search and comparison",
    provider: {
      "@type": "Organization",
      name: "RutasMéxico",
      url: "https://rutasmexico.com.mx",
    },
    areaServed: { "@type": "Country", name: "Mexico" },
    url: `https://rutasmexico.com.mx/${locale}/autobuses`,
    description: isEs
      ? "Compara precios de boletos de autobús de ADO, ETN, Primera Plus, Estrella Roja y más líneas en México."
      : "Compare bus ticket prices from ADO, ETN, Primera Plus, Estrella Roja and more Mexican bus lines.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "MXN", availability: "https://schema.org/InStock" },
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reservationServiceSchema) }} />
      {/* Hero with background image */}
      <div className="relative py-16 md:py-20 overflow-hidden">
        <Image
          src={PAGE_HERO_IMAGES.buses}
          alt={locale === "es" ? "Boletos de autobus en Mexico" : "Bus tickets in Mexico"}
          fill
          className="object-cover"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-arena-50" />
        <div className="container-custom relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-white/20">
              <span>🚌</span>
              <span className="text-white text-sm font-medium">
                {locale === "es" ? "Compara 30+ lineas de autobus" : "Compare 30+ bus lines"}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
              {locale === "es"
                ? "Boletos de autobus baratos en Mexico"
                : "Cheap bus tickets in Mexico"}
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto drop-shadow">
              {locale === "es"
                ? "Compara precios de ADO, ETN, Primera Plus, Estrella Roja y todas las lineas de autobus"
                : "Compare prices from ADO, ETN, Primera Plus, Estrella Roja and all bus lines"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-arena-50 pb-12">
        <div className="container-custom -mt-8 relative z-20">
          {/* Bus search */}
          <BusSearchEmbed />

          {/* Editorial guide - main content for AdSense compliance */}
          <BusesGuide locale={locale} />

          {/* Bus company grid */}
          <div className="mt-12">
            <BusCompanyGrid />
          </div>

          {/* How it works */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg border border-arena-100 p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-arena-900 mb-6 text-center">
              {locale === "es" ? "Como funciona?" : "How does it work?"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg shadow-blue-500/25">
                  🔍
                </div>
                <h3 className="font-display font-bold text-arena-900 mb-2">
                  {locale === "es" ? "1. Busca tu ruta" : "1. Search your route"}
                </h3>
                <p className="text-sm text-arena-500">
                  {locale === "es"
                    ? "Elige ciudad de origen, destino y fecha. Comparamos mas de 30 lineas de autobus."
                    : "Choose origin city, destination and date. We compare over 30 bus lines."}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg shadow-indigo-500/25">
                  📊
                </div>
                <h3 className="font-display font-bold text-arena-900 mb-2">
                  {locale === "es" ? "2. Compara precios" : "2. Compare prices"}
                </h3>
                <p className="text-sm text-arena-500">
                  {locale === "es"
                    ? "Ve precios de ADO, ETN, Primera Plus, Pullman y todas las lineas de autobus lado a lado."
                    : "See prices from ADO, ETN, Primera Plus, Pullman and all bus lines side by side."}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg shadow-emerald-500/25">
                  🎫
                </div>
                <h3 className="font-display font-bold text-arena-900 mb-2">
                  {locale === "es" ? "3. Compra tu boleto" : "3. Buy your ticket"}
                </h3>
                <p className="text-sm text-arena-500">
                  {locale === "es"
                    ? "Reserva en linea y recibe tu boleto electronico. Sin filas en la terminal."
                    : "Book online and receive your e-ticket. No lines at the terminal."}
                </p>
              </div>
            </div>
          </div>

          {/* Tips section */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-arena-100 p-6 md:p-8">
            <h2 className="font-display text-xl font-bold text-arena-900 mb-4">
              {locale === "es" ? "💡 Tips para viajar en autobus por Mexico" : "💡 Tips for bus travel in Mexico"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <span className="text-lg">🎫</span>
                <div>
                  <h3 className="font-semibold text-arena-900 text-sm">
                    {locale === "es" ? "Compra con anticipacion" : "Buy in advance"}
                  </h3>
                  <p className="text-xs text-arena-500">
                    {locale === "es"
                      ? "Los precios suben los fines de semana y festivos. Compra 1-2 semanas antes para mejores precios."
                      : "Prices go up on weekends and holidays. Buy 1-2 weeks ahead for better prices."}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-lg">🌙</span>
                <div>
                  <h3 className="font-semibold text-arena-900 text-sm">
                    {locale === "es" ? "Viajes nocturnos" : "Overnight trips"}
                  </h3>
                  <p className="text-xs text-arena-500">
                    {locale === "es"
                      ? "Para rutas largas (+6 horas), los autobuses nocturnos te ahorran una noche de hotel."
                      : "For long routes (6+ hours), overnight buses save you a hotel night."}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-lg">👑</span>
                <div>
                  <h3 className="font-semibold text-arena-900 text-sm">
                    {locale === "es" ? "Clases de servicio" : "Service classes"}
                  </h3>
                  <p className="text-xs text-arena-500">
                    {locale === "es"
                      ? "ETN Turistar y ADO GL/Platino ofrecen asientos tipo cama. Vale la pena para rutas largas."
                      : "ETN Turistar and ADO GL/Platino offer bed-like seats. Worth it for long routes."}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-lg">📱</span>
                <div>
                  <h3 className="font-semibold text-arena-900 text-sm">
                    {locale === "es" ? "Boleto electronico" : "E-ticket"}
                  </h3>
                  <p className="text-xs text-arena-500">
                    {locale === "es"
                      ? "La mayoria acepta boleto en el celular. Llega 30 min antes para abordar."
                      : "Most accept mobile tickets. Arrive 30 min early to board."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-arena-100 p-6 md:p-8">
            <h2 className="font-display text-xl font-bold text-arena-900 mb-4">
              {locale === "es" ? "Preguntas frecuentes" : "FAQ"}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-arena-900 text-sm">
                  {locale === "es" ? "Que lineas de autobus comparan?" : "What bus lines do you compare?"}
                </h3>
                <p className="text-sm text-arena-500 mt-1">
                  {locale === "es"
                    ? "Comparamos ADO (y ADO GL, ADO Platino), ETN Turistar, Primera Plus, Estrella Roja, Pullman de Morelos, Omnibus de Mexico, Futura, Estrella de Oro, OCC, AU, Flecha Amarilla, Caminante y muchas mas."
                    : "We compare ADO (and ADO GL, ADO Platino), ETN Turistar, Primera Plus, Estrella Roja, Pullman de Morelos, Omnibus de Mexico, Futura, Estrella de Oro, OCC, AU, Flecha Amarilla, Caminante and many more."}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-arena-900 text-sm">
                  {locale === "es" ? "Cuanto cuesta un boleto de autobus en Mexico?" : "How much does a bus ticket cost in Mexico?"}
                </h3>
                <p className="text-sm text-arena-500 mt-1">
                  {locale === "es"
                    ? "Los precios varian segun la ruta y la clase. Rutas cortas (2-3 horas): $150-400 MXN. Rutas medias (5-7 horas): $400-800 MXN. Rutas largas (+10 horas): $800-1,800 MXN."
                    : "Prices vary by route and class. Short routes (2-3 hours): $150-400 MXN. Medium routes (5-7 hours): $400-800 MXN. Long routes (10+ hours): $800-1,800 MXN."}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-arena-900 text-sm">
                  {locale === "es" ? "Es seguro viajar en autobus en Mexico?" : "Is it safe to travel by bus in Mexico?"}
                </h3>
                <p className="text-sm text-arena-500 mt-1">
                  {locale === "es"
                    ? "Si, las lineas de primera clase y ejecutivo (ADO, ETN, Primera Plus) son muy seguras. Viajan por autopistas de cuota y ofrecen WiFi, enchufes y bano."
                    : "Yes, first class and executive lines (ADO, ETN, Primera Plus) are very safe. They travel on toll highways and offer WiFi, power outlets and restroom."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

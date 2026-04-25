import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import HotelSearchEmbed from "@/components/widgets/HotelSearchEmbed";
import HotelsGuide from "@/components/editorial/HotelsGuide";
import { PAGE_HERO_IMAGES } from "@/lib/destination-images";
import { seoAlternates, seoOpenGraph } from "@/lib/utils";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const title = locale === "es"
    ? "Hoteles baratos en México 2026 | Booking y más"
    : "Cheap hotels in Mexico 2026 | Booking & more";
  const description = locale === "es"
    ? "Compara precios de hoteles en Cancun, CDMX, Playa del Carmen, Puerto Vallarta, Los Cabos y mas destinos en Mexico."
    : "Compare hotel prices in Cancun, Mexico City, Playa del Carmen, Puerto Vallarta, Los Cabos and more destinations in Mexico.";
  const ogImage = "https://rutasmexico.com.mx/og-image.png";
  return {
    title,
    description,
    alternates: seoAlternates(locale, "/hoteles"),
    openGraph: seoOpenGraph(locale, title, description, "/hoteles", ogImage),
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function HotelesPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  const isEs = locale === "es";

  const faqs = [
    {
      q: isEs ? "¿Cuál es la mejor página para comparar hoteles en México?" : "What's the best site to compare hotels in Mexico?",
      a: isEs
        ? "Los tres agregadores con más inventario en México son Booking.com, Expedia y Hotels.com. Cada uno tiene rotación de ofertas distintas, así que conviene comparar los tres para un mismo destino y fechas. También revisa el sitio oficial del hotel — a veces es más barato reservar directo porque evita la comisión del OTA. Nosotros comparamos los tres en un solo lugar."
        : "The three aggregators with most inventory in Mexico are Booking.com, Expedia and Hotels.com. Each has different deal rotations, so compare all three for the same destination and dates. Also check the hotel's official site — sometimes booking direct is cheaper because it avoids the OTA commission. We compare all three in one place.",
    },
    {
      q: isEs ? "¿Cuándo hay mejores ofertas en hoteles?" : "When are the best hotel deals?",
      a: isEs
        ? "En destinos de playa (Cancún, Cabos, Vallarta): temporada baja es mayo a octubre con descuentos de 30-50% (acepta lluvias y humedad). En ciudades (CDMX, Guadalajara, Monterrey): los precios bajan fines de semana (menos negocios). Reservar con 4-8 semanas de anticipación suele dar las mejores tarifas. En Black Friday y Cyber Monday hay descuentos agresivos para reservas flexibles."
        : "For beach destinations (Cancún, Cabos, Vallarta): low season is May to October with 30-50% discounts (accepting rain and humidity). In cities (CDMX, Guadalajara, Monterrey): prices drop on weekends (fewer business travelers). Booking 4-8 weeks ahead typically gets the best rates. Black Friday and Cyber Monday have aggressive deals for flexible bookings.",
    },
    {
      q: isEs ? "¿All-inclusive o hotel regular en México?" : "All-inclusive or regular hotel in Mexico?",
      a: isEs
        ? "All-inclusive conviene en Cancún, Riviera Maya, Los Cabos y Puerto Vallarta si quieres no preocuparte por comida/bebidas y no salir del resort. En destinos urbanos (CDMX, Oaxaca, Mérida) o para foodies que buscan restaurantes locales, el hotel regular gana: pagas solo la habitación y exploras la gastronomía. Calcula el costo total por día por persona y compara contra lo que consumirías."
        : "All-inclusive works in Cancún, Riviera Maya, Los Cabos and Puerto Vallarta if you don't want to worry about food/drinks and plan to stay at the resort. In urban destinations (CDMX, Oaxaca, Mérida) or for foodies seeking local restaurants, regular hotels win: pay only for the room and explore the gastronomy. Calculate total daily per-person cost against what you'd actually consume.",
    },
    {
      q: isEs ? "¿Cuál es la mejor zona para hospedarse en Cancún?" : "What's the best area to stay in Cancún?",
      a: isEs
        ? "Zona Hotelera: resorts todo-incluido, playa directa, ideal para relajarse sin salir. Centro (El Centro): hoteles boutique y económicos, gastronomía local, 20 min de playa en bus. Puerto Juárez: punto de salida al ferry de Isla Mujeres. Riviera Maya (Playa del Carmen, Tulum): alternativa con más cultura maya. Para primera visita, Zona Hotelera es la apuesta más cómoda; para viaje cultural, El Centro o Playa del Carmen."
        : "Hotel Zone: all-inclusive resorts, direct beach access, ideal for relaxing without leaving. Downtown (El Centro): boutique and budget hotels, local gastronomy, 20 min from the beach by bus. Puerto Juárez: ferry point to Isla Mujeres. Riviera Maya (Playa del Carmen, Tulum): alternative with more Mayan culture. First visit: Hotel Zone is the easiest pick; for a cultural trip, Downtown or Playa del Carmen.",
    },
    {
      q: isEs ? "¿Se puede reservar hotel sin tarjeta de crédito?" : "Can I book a hotel without a credit card?",
      a: isEs
        ? "Booking.com y Expedia aceptan tarjeta de débito en la mayoría de hoteles, pero algunos exigen crédito como garantía. Opción sin tarjeta: Mercado Pago o PayPal como método de pago en algunas plataformas. Para reservar sin pagar por anticipado, busca tarifas 'Reembolsable' o 'Paga al llegar al hotel'. Los hosteles y Airbnb típicamente son más flexibles con métodos de pago que los hoteles de cadena."
        : "Booking.com and Expedia accept debit cards at most hotels, but some require credit as a guarantee. No-card option: Mercado Pago or PayPal as payment method on some platforms. To book without prepaying, look for 'Refundable' or 'Pay at the property' rates. Hostels and Airbnb are typically more flexible with payment methods than chain hotels.",
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
      { "@type": "ListItem", position: 2, name: isEs ? "Hoteles" : "Hotels" },
    ],
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero with background image */}
      <div className="relative py-16 md:py-20 overflow-hidden">
        <Image
          src={PAGE_HERO_IMAGES.hotels}
          alt={locale === "es" ? "Hoteles baratos en Mexico" : "Cheap hotels in Mexico"}
          fill
          className="object-cover"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-arena-50" />
        <div className="container-custom relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-white/20">
              <span>🏨</span>
              <span className="text-white text-sm font-medium">
                {locale === "es" ? "Compara 2M+ hoteles" : "Compare 2M+ hotels"}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
              {locale === "es"
                ? "Hoteles baratos en Mexico"
                : "Cheap hotels in Mexico"}
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto drop-shadow">
              {locale === "es"
                ? "Compara precios de Booking.com, Expedia, Hotels.com y mas sitios para encontrar la mejor oferta"
                : "Compare prices from Booking.com, Expedia, Hotels.com and more sites to find the best deal"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-arena-50 pb-12">
        <div className="container-custom -mt-8 relative z-20">
          {/* Hotel search */}
          <HotelSearchEmbed />

          {/* Editorial guide - main content for AdSense compliance */}
          <HotelsGuide locale={locale} />

          {/* How it works */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg border border-arena-100 p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-arena-900 mb-6 text-center">
              {locale === "es" ? "Como funciona?" : "How does it work?"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg shadow-amber-500/25">
                  🔍
                </div>
                <h3 className="font-display font-bold text-arena-900 mb-2">
                  {locale === "es" ? "1. Elige tu destino" : "1. Choose your destination"}
                </h3>
                <p className="text-sm text-arena-500">
                  {locale === "es"
                    ? "Selecciona la ciudad y fechas. Comparamos mas de 2 millones de hoteles."
                    : "Select city and dates. We compare over 2 million hotels."}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg shadow-orange-500/25">
                  📊
                </div>
                <h3 className="font-display font-bold text-arena-900 mb-2">
                  {locale === "es" ? "2. Compara precios" : "2. Compare prices"}
                </h3>
                <p className="text-sm text-arena-500">
                  {locale === "es"
                    ? "Ve el mismo hotel en Booking, Expedia y mas sitios. El precio puede variar hasta 40%."
                    : "See the same hotel on Booking, Expedia and more. Price can vary up to 40%."}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg shadow-green-500/25">
                  💰
                </div>
                <h3 className="font-display font-bold text-arena-900 mb-2">
                  {locale === "es" ? "3. Reserva al mejor precio" : "3. Book at the best price"}
                </h3>
                <p className="text-sm text-arena-500">
                  {locale === "es"
                    ? "Reserva directamente con el sitio que tenga el mejor precio. Sin cargos extra."
                    : "Book directly on the site with the best price. No extra charges."}
                </p>
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
                  {locale === "es" ? "Que sitios comparan?" : "What sites do you compare?"}
                </h3>
                <p className="text-sm text-arena-500 mt-1">
                  {locale === "es"
                    ? "Comparamos Booking.com, Expedia, Hotels.com, Agoda, Hoteles.com, Trip.com y mas de 70 sitios de reserva de hoteles."
                    : "We compare Booking.com, Expedia, Hotels.com, Agoda, Hoteles.com, Trip.com and over 70 hotel booking sites."}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-arena-900 text-sm">
                  {locale === "es" ? "Cuanto cuesta un hotel en Mexico?" : "How much does a hotel cost in Mexico?"}
                </h3>
                <p className="text-sm text-arena-500 mt-1">
                  {locale === "es"
                    ? "Varia por destino. Ciudades: $600-2,000 MXN/noche. Playas: $1,000-5,000 MXN/noche. All-inclusive: $2,500-8,000 MXN/noche por persona."
                    : "Varies by destination. Cities: $600-2,000 MXN/night. Beaches: $1,000-5,000 MXN/night. All-inclusive: $2,500-8,000 MXN/night per person."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

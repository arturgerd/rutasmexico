import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import HotelSearchEmbed from "@/components/widgets/HotelSearchEmbed";
import HotelsGuide from "@/components/editorial/HotelsGuide";
import { PAGE_HERO_IMAGES } from "@/lib/destination-images";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return {
    title: locale === "es"
      ? "Hoteles baratos en Mexico - Compara Booking, Expedia, Hotels.com"
      : "Cheap hotels in Mexico - Compare Booking, Expedia, Hotels.com",
    description: locale === "es"
      ? "Compara precios de hoteles en Cancun, CDMX, Playa del Carmen, Puerto Vallarta, Los Cabos y mas destinos en Mexico."
      : "Compare hotel prices in Cancun, Mexico City, Playa del Carmen, Puerto Vallarta, Los Cabos and more destinations in Mexico.",
  };
}

export default async function HotelesPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  return (
    <div className="min-h-screen">
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

import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getAllAirports } from "@/lib/data/airports";
import AviasalesEmbed from "@/components/widgets/AviasalesEmbed";
import AirlineGrid from "@/components/widgets/AirlineGrid";
import FlightsGuide from "@/components/editorial/FlightsGuide";
import { PAGE_HERO_IMAGES } from "@/lib/destination-images";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return {
    title: locale === "es"
      ? "Vuelos baratos en Mexico - Compara Volaris, VivaAerobus, Aeromexico"
      : "Cheap flights in Mexico - Compare Volaris, VivaAerobus, Aeromexico",
    description: locale === "es"
      ? "Compara precios de vuelos de todas las aerolineas mexicanas: Volaris, VivaAerobus, Aeromexico, TAR y mas. Encuentra el vuelo mas barato."
      : "Compare flight prices from all Mexican airlines: Volaris, VivaAerobus, Aeromexico, TAR and more. Find the cheapest flight.",
  };
}

export default async function VuelosPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const airports = await getAllAirports();

  return (
    <div className="min-h-screen">
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

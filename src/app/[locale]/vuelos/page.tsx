import { setRequestLocale } from "next-intl/server";
import { getAllAirports } from "@/lib/data/airports";
import AviasalesEmbed from "@/components/widgets/AviasalesEmbed";
import AirlineGrid from "@/components/widgets/AirlineGrid";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return {
    title: locale === "es"
      ? "Vuelos baratos en México - Compara Volaris, VivaAerobus, Aeroméxico"
      : "Cheap flights in Mexico - Compare Volaris, VivaAerobus, Aeromexico",
    description: locale === "es"
      ? "Compara precios de vuelos de todas las aerolíneas mexicanas: Volaris, VivaAerobus, Aeroméxico, TAR y más. Encuentra el vuelo más barato."
      : "Compare flight prices from all Mexican airlines: Volaris, VivaAerobus, Aeromexico, TAR and more. Find the cheapest flight.",
  };
}

export default async function VuelosPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const airports = await getAllAirports();

  return (
    <div className="py-8 bg-arena-50 min-h-screen">
      <div className="container-custom">
        {/* Page header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-arena-900 mb-3">
            {locale === "es"
              ? "✈️ Vuelos baratos en México"
              : "✈️ Cheap flights in Mexico"}
          </h1>
          <p className="text-arena-500 text-lg max-w-2xl mx-auto">
            {locale === "es"
              ? "Compara precios en tiempo real de todas las aerolíneas mexicanas y encuentra el vuelo más barato"
              : "Compare real-time prices from all Mexican airlines and find the cheapest flight"}
          </p>
        </div>

        {/* Main search embed */}
        <AviasalesEmbed airports={airports} />

        {/* Airline grid section */}
        <div className="mt-12">
          <AirlineGrid showTitle />
        </div>

        {/* How it works */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg border border-arena-100 p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold text-arena-900 mb-6 text-center">
            {locale === "es" ? "¿Cómo funciona?" : "How does it work?"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-terracotta-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3">
                🔍
              </div>
              <h3 className="font-display font-bold text-arena-900 mb-2">
                {locale === "es" ? "1. Busca tu vuelo" : "1. Search your flight"}
              </h3>
              <p className="text-sm text-arena-500">
                {locale === "es"
                  ? "Elige origen, destino y fechas. Nuestro buscador compara más de 700 aerolíneas."
                  : "Choose origin, destination and dates. Our search compares over 700 airlines."}
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-azul-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3">
                📊
              </div>
              <h3 className="font-display font-bold text-arena-900 mb-2">
                {locale === "es" ? "2. Compara precios" : "2. Compare prices"}
              </h3>
              <p className="text-sm text-arena-500">
                {locale === "es"
                  ? "Ve precios de Volaris, VivaAerobus, Aeroméxico, TAR y todas las aerolíneas lado a lado."
                  : "See prices from Volaris, VivaAerobus, Aeromexico, TAR and all airlines side by side."}
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-jade-500/10 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3">
                💰
              </div>
              <h3 className="font-display font-bold text-arena-900 mb-2">
                {locale === "es" ? "3. Reserva y ahorra" : "3. Book and save"}
              </h3>
              <p className="text-sm text-arena-500">
                {locale === "es"
                  ? "Elige el vuelo más barato y reserva directamente con la aerolínea. Sin comisiones extra."
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
                {locale === "es" ? "¿Qué aerolíneas comparan?" : "What airlines do you compare?"}
              </h3>
              <p className="text-sm text-arena-500 mt-1">
                {locale === "es"
                  ? "Comparamos todas las aerolíneas mexicanas (Volaris, VivaAerobus, Aeroméxico, TAR, MagniCharters, Aeromar) además de aerolíneas internacionales como American Airlines, United, Delta, JetBlue y más de 700 aerolíneas en total."
                  : "We compare all Mexican airlines (Volaris, VivaAerobus, Aeromexico, TAR, MagniCharters, Aeromar) plus international airlines like American Airlines, United, Delta, JetBlue and over 700 airlines total."}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-arena-900 text-sm">
                {locale === "es" ? "¿Es gratis usar el buscador?" : "Is the search free?"}
              </h3>
              <p className="text-sm text-arena-500 mt-1">
                {locale === "es"
                  ? "Sí, buscar y comparar vuelos es completamente gratis. No cobramos ninguna comisión adicional."
                  : "Yes, searching and comparing flights is completely free. We don't charge any additional fees."}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-arena-900 text-sm">
                {locale === "es" ? "¿Los precios son en tiempo real?" : "Are prices in real time?"}
              </h3>
              <p className="text-sm text-arena-500 mt-1">
                {locale === "es"
                  ? "Sí, los precios se actualizan en tiempo real directamente desde los sistemas de las aerolíneas y agencias de viaje."
                  : "Yes, prices are updated in real time directly from airline and travel agency systems."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

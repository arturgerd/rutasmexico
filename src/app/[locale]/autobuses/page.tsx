import { setRequestLocale } from "next-intl/server";
import BusSearchEmbed from "@/components/widgets/BusSearchEmbed";
import BusCompanyGrid from "@/components/widgets/BusCompanyGrid";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return {
    title: locale === "es"
      ? "Boletos de autobús baratos - ADO, ETN, Primera Plus, Estrella Roja"
      : "Cheap bus tickets - ADO, ETN, Primera Plus, Estrella Roja",
    description: locale === "es"
      ? "Compara precios de boletos de autobús de ADO, ETN, Primera Plus, Estrella Roja, Pullman y más líneas en México. Encuentra el autobús más barato."
      : "Compare bus ticket prices from ADO, ETN, Primera Plus, Estrella Roja, Pullman and more lines in Mexico. Find the cheapest bus.",
  };
}

export default async function AutobusesPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  return (
    <div className="py-8 bg-arena-50 min-h-screen">
      <div className="container-custom">
        {/* Page header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-arena-900 mb-3">
            {locale === "es"
              ? "🚌 Boletos de autobús baratos en México"
              : "🚌 Cheap bus tickets in Mexico"}
          </h1>
          <p className="text-arena-500 text-lg max-w-2xl mx-auto">
            {locale === "es"
              ? "Compara precios de ADO, ETN, Primera Plus, Estrella Roja y todas las líneas de autobús"
              : "Compare prices from ADO, ETN, Primera Plus, Estrella Roja and all bus lines"}
          </p>
        </div>

        {/* Bus search */}
        <BusSearchEmbed />

        {/* Bus company grid */}
        <div className="mt-12">
          <BusCompanyGrid />
        </div>

        {/* How it works */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg border border-arena-100 p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold text-arena-900 mb-6 text-center">
            {locale === "es" ? "¿Cómo funciona?" : "How does it work?"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3">
                🔍
              </div>
              <h3 className="font-display font-bold text-arena-900 mb-2">
                {locale === "es" ? "1. Busca tu ruta" : "1. Search your route"}
              </h3>
              <p className="text-sm text-arena-500">
                {locale === "es"
                  ? "Elige ciudad de origen, destino y fecha. Comparamos más de 30 líneas de autobús."
                  : "Choose origin city, destination and date. We compare over 30 bus lines."}
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3">
                📊
              </div>
              <h3 className="font-display font-bold text-arena-900 mb-2">
                {locale === "es" ? "2. Compara precios" : "2. Compare prices"}
              </h3>
              <p className="text-sm text-arena-500">
                {locale === "es"
                  ? "Ve precios de ADO, ETN, Primera Plus, Pullman y todas las líneas de autobús lado a lado."
                  : "See prices from ADO, ETN, Primera Plus, Pullman and all bus lines side by side."}
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3">
                🎫
              </div>
              <h3 className="font-display font-bold text-arena-900 mb-2">
                {locale === "es" ? "3. Compra tu boleto" : "3. Buy your ticket"}
              </h3>
              <p className="text-sm text-arena-500">
                {locale === "es"
                  ? "Reserva en línea y recibe tu boleto electrónico. Sin filas en la terminal."
                  : "Book online and receive your e-ticket. No lines at the terminal."}
              </p>
            </div>
          </div>
        </div>

        {/* Tips section */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-arena-100 p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-arena-900 mb-4">
            {locale === "es" ? "💡 Tips para viajar en autobús por México" : "💡 Tips for bus travel in Mexico"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <span className="text-lg">🎫</span>
              <div>
                <h3 className="font-semibold text-arena-900 text-sm">
                  {locale === "es" ? "Compra con anticipación" : "Buy in advance"}
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
                  {locale === "es" ? "Boleto electrónico" : "E-ticket"}
                </h3>
                <p className="text-xs text-arena-500">
                  {locale === "es"
                    ? "La mayoría acepta boleto en el celular. Llega 30 min antes para abordar."
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
                {locale === "es" ? "¿Qué líneas de autobús comparan?" : "What bus lines do you compare?"}
              </h3>
              <p className="text-sm text-arena-500 mt-1">
                {locale === "es"
                  ? "Comparamos ADO (y ADO GL, ADO Platino), ETN Turistar, Primera Plus, Estrella Roja, Pullman de Morelos, Ómnibus de México, Futura, Estrella de Oro, OCC, AU, Flecha Amarilla, Caminante y muchas más."
                  : "We compare ADO (and ADO GL, ADO Platino), ETN Turistar, Primera Plus, Estrella Roja, Pullman de Morelos, Omnibus de Mexico, Futura, Estrella de Oro, OCC, AU, Flecha Amarilla, Caminante and many more."}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-arena-900 text-sm">
                {locale === "es" ? "¿Cuánto cuesta un boleto de autobús en México?" : "How much does a bus ticket cost in Mexico?"}
              </h3>
              <p className="text-sm text-arena-500 mt-1">
                {locale === "es"
                  ? "Los precios varían según la ruta y la clase. Rutas cortas (2-3 horas): $150-400 MXN. Rutas medias (5-7 horas): $400-800 MXN. Rutas largas (+10 horas): $800-1,800 MXN."
                  : "Prices vary by route and class. Short routes (2-3 hours): $150-400 MXN. Medium routes (5-7 hours): $400-800 MXN. Long routes (10+ hours): $800-1,800 MXN."}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-arena-900 text-sm">
                {locale === "es" ? "¿Es seguro viajar en autobús en México?" : "Is it safe to travel by bus in Mexico?"}
              </h3>
              <p className="text-sm text-arena-500 mt-1">
                {locale === "es"
                  ? "Sí, las líneas de primera clase y ejecutivo (ADO, ETN, Primera Plus) son muy seguras. Viajan por autopistas de cuota y ofrecen WiFi, enchufes y baño."
                  : "Yes, first class and executive lines (ADO, ETN, Primera Plus) are very safe. They travel on toll highways and offer WiFi, power outlets and restroom."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

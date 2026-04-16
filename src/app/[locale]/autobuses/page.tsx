import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import BusSearchEmbed from "@/components/widgets/BusSearchEmbed";
import BusCompanyGrid from "@/components/widgets/BusCompanyGrid";
import BusesGuide from "@/components/editorial/BusesGuide";
import { PAGE_HERO_IMAGES } from "@/lib/destination-images";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return {
    title: locale === "es"
      ? "Boletos de autobus baratos - ADO, ETN, Primera Plus, Estrella Roja"
      : "Cheap bus tickets - ADO, ETN, Primera Plus, Estrella Roja",
    description: locale === "es"
      ? "Compara precios de boletos de autobus de ADO, ETN, Primera Plus, Estrella Roja, Pullman y mas lineas en Mexico. Encuentra el autobus mas barato."
      : "Compare bus ticket prices from ADO, ETN, Primera Plus, Estrella Roja, Pullman and more lines in Mexico. Find the cheapest bus.",
  };
}

export default async function AutobusesPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  return (
    <div className="min-h-screen">
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

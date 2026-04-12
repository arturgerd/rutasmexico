"use client";

import { WeddingDestination } from "@/types/boda";
import { Locale } from "@/types/common";
import { localize, formatCurrency } from "@/lib/utils";
import VenueCard from "./VenueCard";
import CelebrationCard from "./CelebrationCard";

interface Props {
  destination: WeddingDestination;
  locale: Locale;
}

export default function WeddingDestinationDetail({ destination, locale }: Props) {
  const t = (es: string, en: string) => (locale === "es" ? es : en);

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-terracotta-500 via-terracotta-600 to-terracotta-700 text-white py-16 px-4">
        <div className="container-custom max-w-4xl text-center">
          <p className="text-terracotta-200 text-sm font-medium mb-2">
            {t("Bodas y celebraciones", "Weddings & celebrations")}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            {t(`Bodas en ${localize(destination.name, locale)}`, `Weddings in ${localize(destination.name, locale)}`)}
          </h1>
          <p className="text-terracotta-100 text-lg max-w-2xl mx-auto">
            {localize(destination.intro, locale)}
          </p>
        </div>
      </div>

      <div className="container-custom max-w-5xl py-12 space-y-16">
        {/* Venues */}
        <section>
          <h2 className="font-display text-2xl font-bold text-arena-900 mb-2">
            {t("Venues para tu boda", "Wedding venues")}
          </h2>
          <p className="text-arena-600 mb-6">
            {t(
              "Los mejores lugares para celebrar tu boda en Cancún y Riviera Maya. Filtra por accesibilidad e inclusión LGBTIQ+.",
              "The best places to celebrate your wedding in Cancún and Riviera Maya. Filter by accessibility and LGBTIQ+ inclusion."
            )}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} locale={locale} />
            ))}
          </div>
        </section>

        {/* Despedida de soltera */}
        <section>
          <h2 className="font-display text-2xl font-bold text-arena-900 mb-2">
            {t("Despedida de soltera", "Bachelorette party")} 💃
          </h2>
          <p className="text-arena-600 mb-6">
            {t(
              "Ideas para una despedida de soltera inolvidable en el Caribe mexicano.",
              "Ideas for an unforgettable bachelorette party in the Mexican Caribbean."
            )}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {destination.bacheloretteIdeas.map((idea) => (
              <CelebrationCard key={idea.id} idea={idea} locale={locale} />
            ))}
          </div>
        </section>

        {/* Despedida de soltero */}
        <section>
          <h2 className="font-display text-2xl font-bold text-arena-900 mb-2">
            {t("Despedida de soltero", "Bachelor party")} 🎉
          </h2>
          <p className="text-arena-600 mb-6">
            {t(
              "Actividades de aventura y diversión para la despedida de soltero perfecta.",
              "Adventure and fun activities for the perfect bachelor party."
            )}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {destination.bachelorIdeas.map((idea) => (
              <CelebrationCard key={idea.id} idea={idea} locale={locale} />
            ))}
          </div>
        </section>

        {/* LGBTIQ+ */}
        <section className="bg-gradient-to-r from-red-50 via-yellow-50 to-blue-50 rounded-2xl p-8">
          <h2 className="font-display text-2xl font-bold text-arena-900 mb-2">
            {t("Bodas y celebraciones LGBTIQ+", "LGBTIQ+ weddings & celebrations")} 🏳️‍🌈
          </h2>
          <div className="space-y-4 mt-4">
            <div>
              <h3 className="font-semibold text-arena-800 mb-1">
                {t("Estado legal", "Legal status")}
              </h3>
              <p className="text-arena-600 text-sm">
                {localize(destination.lgbtq.legalStatus, locale)}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-arena-800 mb-1">
                {t("Cancún Pride", "Cancún Pride")}
              </h3>
              <p className="text-arena-600 text-sm">
                {localize(destination.lgbtq.prideInfo, locale)}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-arena-800 mb-2">
                {t("Consejos para parejas LGBTIQ+", "Tips for LGBTIQ+ couples")}
              </h3>
              <ul className="space-y-2">
                {destination.lgbtq.tips.map((tip, i) => (
                  <li key={i} className="text-arena-600 text-sm flex items-start gap-2">
                    <span className="text-terracotta-400 mt-0.5">&#10003;</span>
                    {localize(tip, locale)}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-arena-500 italic">
              {t(
                `Todos los venues listados (${destination.lgbtq.friendlyVenueIds.length} de ${destination.venues.length}) son LGBTIQ+ friendly.`,
                `All listed venues (${destination.lgbtq.friendlyVenueIds.length} of ${destination.venues.length}) are LGBTIQ+ friendly.`
              )}
            </p>
          </div>
        </section>

        {/* Accessibility */}
        <section className="bg-azul-50 rounded-2xl p-8">
          <h2 className="font-display text-2xl font-bold text-arena-900 mb-2">
            {t("Celebraciones accesibles e inclusivas", "Accessible & inclusive celebrations")} ♿
          </h2>
          <p className="text-arena-600 text-sm mb-6">
            {localize(destination.accessibility.overview, locale)}
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-arena-800 mb-2">
                {t("Consejos de accesibilidad", "Accessibility tips")}
              </h3>
              <ul className="space-y-2">
                {destination.accessibility.tips.map((tip, i) => (
                  <li key={i} className="text-arena-600 text-sm flex items-start gap-2">
                    <span className="text-azul-500 mt-0.5">&#10003;</span>
                    {localize(tip, locale)}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-arena-800 mb-2">
                {t("Transporte accesible", "Accessible transport")}
              </h3>
              <p className="text-arena-600 text-sm">
                {localize(destination.accessibility.accessibleTransport, locale)}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-arena-800 mb-3">
                {t("Playas accesibles", "Accessible beaches")}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {destination.accessibility.accessibleBeaches.map((beach) => (
                  <div key={beach.name} className="bg-white rounded-xl p-4 border border-azul-100">
                    <h4 className="font-bold text-arena-900 text-sm">{beach.name}</h4>
                    <p className="text-arena-600 text-xs mt-1">
                      {localize(beach.description, locale)}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {beach.features.map((f) => (
                        <span key={f} className="bg-azul-100 text-azul-700 text-[10px] px-1.5 py-0.5 rounded-full">
                          {f.replace(/-/g, " ")}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Legal & practical */}
        <section>
          <h2 className="font-display text-2xl font-bold text-arena-900 mb-6">
            {t("Información práctica", "Practical information")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Legal */}
            <div className="bg-arena-50 rounded-xl p-6">
              <h3 className="font-display font-bold text-arena-900 mb-3">
                {t("Requisitos legales", "Legal requirements")} 📋
              </h3>
              <p className="text-arena-600 text-sm mb-3">
                {localize(destination.legal.process, locale)}
              </p>
              <h4 className="font-semibold text-arena-800 text-sm mb-2">
                {t("Documentos necesarios:", "Required documents:")}
              </h4>
              <ul className="space-y-1">
                {destination.legal.documents.map((doc, i) => (
                  <li key={i} className="text-arena-600 text-xs flex items-start gap-1.5">
                    <span className="text-arena-400">•</span>
                    {localize(doc, locale)}
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-t border-arena-200">
                <h4 className="font-semibold text-arena-800 text-sm mb-1">
                  {t("Parejas extranjeras", "Foreign couples")}
                </h4>
                <p className="text-arena-600 text-xs">
                  {localize(destination.legal.foreigners, locale)}
                </p>
              </div>
            </div>

            {/* Budget & Season */}
            <div className="space-y-6">
              <div className="bg-oro-50 rounded-xl p-6">
                <h3 className="font-display font-bold text-arena-900 mb-3">
                  {t("Presupuesto estimado", "Estimated budget")} 💰
                </h3>
                <div className="space-y-2">
                  {[
                    { label: t("Económico", "Economy"), range: destination.budget.economy },
                    { label: t("Intermedio", "Mid-range"), range: destination.budget.mid },
                    { label: t("Lujo", "Luxury"), range: destination.budget.luxury },
                  ].map(({ label, range }) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-arena-600">{label}</span>
                      <span className="font-semibold text-arena-800">
                        {formatCurrency(range.min)} - {formatCurrency(range.max)}
                      </span>
                    </div>
                  ))}
                </div>
                <ul className="mt-3 pt-3 border-t border-oro-200 space-y-1">
                  {destination.budget.tips.map((tip, i) => (
                    <li key={i} className="text-arena-600 text-xs flex items-start gap-1.5">
                      <span className="text-oro-500">💡</span>
                      {localize(tip, locale)}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-jade-50 rounded-xl p-6">
                <h3 className="font-display font-bold text-arena-900 mb-2">
                  {t("Mejor temporada", "Best season")} 🌤️
                </h3>
                <p className="text-arena-600 text-sm">
                  {localize(destination.bestSeason, locale)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="font-display text-2xl font-bold text-arena-900 mb-6">
            {t("Preguntas frecuentes", "Frequently asked questions")}
          </h2>
          <div className="space-y-4">
            {destination.faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-arena-200 overflow-hidden group">
                <summary className="px-6 py-4 cursor-pointer font-semibold text-arena-800 hover:text-terracotta-600 transition-colors list-none flex justify-between items-center">
                  {localize(faq.question, locale)}
                  <span className="text-arena-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-4 text-arena-600 text-sm">
                  {localize(faq.answer, locale)}
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

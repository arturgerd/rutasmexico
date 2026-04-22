import { RouteContent } from "@/lib/data/route-content";
import { Locale } from "@/types/common";

interface Props {
  content: RouteContent;
  locale: Locale;
  originName: string;
  destName: string;
}

function t(obj: { es: string; en: string; fr: string }, locale: string): string {
  if (locale === "fr") return obj.fr || obj.en || obj.es;
  if (locale === "en") return obj.en || obj.es;
  return obj.es;
}

export default function RouteEditorial({ content, locale, originName, destName }: Props) {
  const headings = {
    overview: {
      es: `Cómo elegir la mejor forma de viajar de ${originName} a ${destName}`,
      en: `How to choose the best way to travel from ${originName} to ${destName}`,
      fr: `Comment choisir le meilleur moyen pour aller de ${originName} à ${destName}`,
    },
    flightDetails: {
      es: `Volar de ${originName} a ${destName}: aerolíneas, aeropuertos y precios`,
      en: `Flying from ${originName} to ${destName}: airlines, airports and prices`,
      fr: `Vols ${originName} - ${destName} : compagnies, aéroports et tarifs`,
    },
    busDetails: {
      es: `Autobús de ${originName} a ${destName}: ADO, clases y horarios`,
      en: `Bus from ${originName} to ${destName}: ADO, classes and schedules`,
      fr: `Bus ${originName} - ${destName} : ADO, classes et horaires`,
    },
    carDetails: {
      es: `Manejar de ${originName} a ${destName}: ruta, casetas y gasolina`,
      en: `Driving from ${originName} to ${destName}: route, tolls and gas`,
      fr: `Conduire de ${originName} à ${destName} : itinéraire, péages et essence`,
    },
    bestTime: {
      es: "Cuándo viajar para ahorrar",
      en: "When to travel to save money",
      fr: "Quand voyager pour économiser",
    },
    tips: {
      es: "Tips que debes conocer antes de reservar",
      en: "Tips to know before you book",
      fr: "Conseils à connaître avant de réserver",
    },
    faqs: {
      es: "Preguntas frecuentes",
      en: "Frequently asked questions",
      fr: "Questions fréquentes",
    },
  };

  const h = (key: keyof typeof headings) => t(headings[key], locale);

  return (
    <section className="mt-12 pt-8 border-t border-arena-200 max-w-3xl">
      <article className="prose prose-arena max-w-none">
        <h2 className="font-display text-2xl font-bold text-arena-900 mb-3">
          {h("overview")}
        </h2>
        <p className="text-arena-700 leading-relaxed mb-6">{t(content.overview, locale)}</p>

        {content.flightDetails && (
          <>
            <h2 className="font-display text-2xl font-bold text-arena-900 mb-3 mt-8">
              ✈️ {h("flightDetails")}
            </h2>
            <p className="text-arena-700 leading-relaxed mb-6">{t(content.flightDetails, locale)}</p>
          </>
        )}

        {content.busDetails && (
          <>
            <h2 className="font-display text-2xl font-bold text-arena-900 mb-3 mt-8">
              🚌 {h("busDetails")}
            </h2>
            <p className="text-arena-700 leading-relaxed mb-6">{t(content.busDetails, locale)}</p>
          </>
        )}

        {content.carDetails && (
          <>
            <h2 className="font-display text-2xl font-bold text-arena-900 mb-3 mt-8">
              🚗 {h("carDetails")}
            </h2>
            <p className="text-arena-700 leading-relaxed mb-6">{t(content.carDetails, locale)}</p>
          </>
        )}

        <h2 className="font-display text-2xl font-bold text-arena-900 mb-3 mt-8">
          📅 {h("bestTime")}
        </h2>
        <p className="text-arena-700 leading-relaxed mb-6">{t(content.bestTime, locale)}</p>

        <h2 className="font-display text-2xl font-bold text-arena-900 mb-3 mt-8">
          💡 {h("tips")}
        </h2>
        <p className="text-arena-700 leading-relaxed mb-6">{t(content.tips, locale)}</p>

        {content.faqs.length > 0 && (
          <>
            <h2 className="font-display text-2xl font-bold text-arena-900 mb-4 mt-8">
              ❓ {h("faqs")}
            </h2>
            <div className="space-y-5">
              {content.faqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-arena-900 mb-2">
                    {t(faq.question, locale)}
                  </h3>
                  <p className="text-arena-700 leading-relaxed">{t(faq.answer, locale)}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </article>
    </section>
  );
}

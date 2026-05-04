import { Locale } from "@/types/common";
import { t3 } from "@/lib/utils";
import { getKlookAffiliateUrl, getTiqetsAffiliateUrl } from "@/lib/affiliate";

interface TourPartnerLinks {
  klook?: string;
  tiqets?: string;
}

const PARTNER_LINKS: Record<string, TourPartnerLinks> = {
  cancun: {
    klook: "https://www.klook.com/en-US/coureg/89-cancun-things-to-do/",
    tiqets: "https://www.tiqets.com/en/cancun-c81012/",
  },
  "ciudad-de-mexico": {
    klook: "https://www.klook.com/en-US/coureg/85-mexico-city-things-to-do/",
    tiqets: "https://www.tiqets.com/en/mexico-city-c75647/",
  },
};

interface Props {
  destinationSlug: string;
  cityName: string;
  locale: Locale;
}

export default function ToursAndActivities({ destinationSlug, cityName, locale }: Props) {
  const links = PARTNER_LINKS[destinationSlug];
  if (!links) return null;

  const klookHref = links.klook ? getKlookAffiliateUrl(links.klook) : undefined;
  const tiqetsHref = links.tiqets ? getTiqetsAffiliateUrl(links.tiqets) : undefined;

  return (
    <article className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-arena-900 mb-2">
        {t3(locale,
          `Tours y actividades en ${cityName}`,
          `Tours and activities in ${cityName}`,
          `Activités à ${cityName}`
        )}
      </h2>
      <p className="text-arena-600 text-sm mb-5 leading-relaxed">
        {t3(locale,
          `Compara opciones en dos plataformas con cancelación gratuita y reseñas verificadas. Reservar por estos enlaces no te cuesta nada extra y nos ayuda a mantener las guías actualizadas.`,
          `Compare options on two platforms with free cancellation and verified reviews. Booking through these links costs you nothing extra and helps us keep the guides updated.`,
          `Comparez les options sur deux plateformes avec annulation gratuite et avis vérifiés.`
        )}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {klookHref && (
          <a
            href={klookHref}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="group flex flex-col gap-3 p-5 rounded-xl border border-arena-200 hover:border-terracotta-400 hover:shadow-md transition-all bg-gradient-to-br from-white to-arena-50"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎟️</span>
              <span className="font-display font-bold text-arena-900 text-lg">Klook</span>
            </div>
            <p className="text-sm text-arena-600 leading-snug">
              {t3(locale,
                `Tours guiados, traslados y experiencias en ${cityName}.`,
                `Guided tours, transfers and experiences in ${cityName}.`,
                `Visites guidées, transferts et expériences à ${cityName}.`
              )}
            </p>
            <span className="text-sm font-semibold text-terracotta-600 group-hover:text-terracotta-700 mt-auto">
              {t3(locale, "Ver tours →", "See tours →", "Voir les tours →")}
            </span>
          </a>
        )}

        {tiqetsHref && (
          <a
            href={tiqetsHref}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="group flex flex-col gap-3 p-5 rounded-xl border border-arena-200 hover:border-terracotta-400 hover:shadow-md transition-all bg-gradient-to-br from-white to-arena-50"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏛️</span>
              <span className="font-display font-bold text-arena-900 text-lg">Tiqets</span>
            </div>
            <p className="text-sm text-arena-600 leading-snug">
              {t3(locale,
                `Entradas a museos, sitios arqueológicos y atracciones en ${cityName}.`,
                `Tickets to museums, archaeological sites and attractions in ${cityName}.`,
                `Billets pour musées, sites archéologiques et attractions à ${cityName}.`
              )}
            </p>
            <span className="text-sm font-semibold text-terracotta-600 group-hover:text-terracotta-700 mt-auto">
              {t3(locale, "Ver entradas →", "See tickets →", "Voir les billets →")}
            </span>
          </a>
        )}
      </div>

      <p className="text-[11px] text-arena-500 mt-4 leading-relaxed">
        {t3(locale,
          "Enlaces patrocinados (rel=\"sponsored\"). RutasMéxico recibe una comisión si reservas, sin costo extra para ti.",
          "Sponsored links (rel=\"sponsored\"). RutasMéxico earns a commission if you book, at no extra cost to you.",
          "Liens sponsorisés. RutasMéxico reçoit une commission si vous réservez, sans frais supplémentaires pour vous."
        )}
      </p>
    </article>
  );
}

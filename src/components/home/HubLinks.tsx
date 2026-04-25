import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { t3 } from "@/lib/utils";

interface HubLinksProps {
  locale: string;
}

export default function HubLinks({ locale }: HubLinksProps) {
  const hubs = [
    {
      href: `/${locale}/destinos`,
      icon: "compass" as const,
      title: t3(locale, "Todos los destinos", "All destinations", "Toutes les destinations"),
      desc: t3(locale,
        "13 ciudades con guías completas de qué hacer y cómo llegar",
        "13 cities with complete guides on what to do and how to get there",
        "13 villes avec guides complets"
      ),
    },
    {
      href: `/${locale}/rutas`,
      icon: "globe" as const,
      title: t3(locale, "Rutas populares", "Popular routes", "Itinéraires populaires"),
      desc: t3(locale,
        "Vuelo, autobús o auto: compara opciones entre ciudades",
        "Flight, bus or car: compare options between cities",
        "Avion, bus ou voiture : comparez les options"
      ),
    },
    {
      href: `/${locale}/blog`,
      icon: "pen" as const,
      title: t3(locale, "Blog de viajes", "Travel blog", "Blog de voyage"),
      desc: t3(locale,
        "Tips, comparativas y guías actualizadas para 2026",
        "Tips, comparisons and updated 2026 travel guides",
        "Conseils et guides de voyage 2026"
      ),
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-arena-50">
      <div className="container-custom">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-arena-900 text-center mb-2">
          {t3(locale, "Explora la guía", "Explore the guide", "Explorez le guide")}
        </h2>
        <p className="text-arena-700 text-center mb-8 max-w-2xl mx-auto">
          {t3(locale,
            "Tres formas de planear tu viaje por México",
            "Three ways to plan your trip across Mexico",
            "Trois façons de planifier votre voyage"
          )}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {hubs.map((hub) => (
            <Link
              key={hub.href}
              href={hub.href}
              className="group bg-white rounded-2xl border border-arena-200 p-6 transition-all hover:border-terracotta-300 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-terracotta-50 text-terracotta-600 mb-4 group-hover:bg-terracotta-100 transition-colors">
                <Icon name={hub.icon} className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-arena-900 text-lg mb-2 group-hover:text-terracotta-600 transition-colors">
                {hub.title}
              </h3>
              <p className="text-sm text-arena-700 leading-relaxed mb-3">{hub.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-terracotta-600">
                {t3(locale, "Ver todos", "View all", "Voir tout")}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

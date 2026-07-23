import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { getSimTeams } from "@/lib/data/mundial-teams";
import SimulatorClient from "@/components/mundial/SimulatorClient";
import { t3, seoAlternates, seoOpenGraph } from "@/lib/utils";
import { buildBreadcrumbList } from "@/lib/mundial-schema";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const title = t3(locale,
    "Simulador de Partidos Mundial 2026 — Probabilidades y Marcadores",
    "World Cup 2026 Match Simulator — Probabilities & Scorelines"
  );
  const description = t3(locale,
    "Simula cualquier partido del Mundial FIFA 2026 y descubre las probabilidades de victoria, los marcadores más probables y los goles esperados. Modelo estadístico gratuito.",
    "Simulate any FIFA World Cup 2026 match and see win probabilities, the most likely scorelines and expected goals. Free statistical model."
  );
  return {
    title,
    description,
    alternates: seoAlternates(locale, "/mundial/simulador"),
    openGraph: seoOpenGraph(locale, title, description, "/mundial/simulador"),
    twitter: { card: "summary_large_image" as const, title, description },
  };
}

export const revalidate = 3600;

export default async function MundialSimuladorPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const teams = getSimTeams();

  const breadcrumbs = buildBreadcrumbList(locale, [
    { name: t3(locale, "Inicio", "Home", "Accueil"), url: `https://rutasmexico.com.mx/${locale}` },
    { name: t3(locale, "Mundial 2026", "World Cup 2026", "Coupe du Monde 2026"), url: `https://rutasmexico.com.mx/${locale}/mundial` },
    { name: t3(locale, "Simulador", "Simulator", "Simulateur") },
  ]);

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      {/* Hero */}
      <div className="bg-arena-900 py-12 md:py-16">
        <div className="container-custom">
          <nav className="text-xs text-arena-300 mb-4">
            <Link href={`/${locale}`} className="hover:text-white">{t3(locale, "Inicio", "Home", "Accueil")}</Link>
            {" / "}
            <Link href={`/${locale}/mundial`} className="hover:text-white">{t3(locale, "Mundial 2026", "World Cup 2026", "Coupe du Monde 2026")}</Link>
            {" / "}
            <span className="text-white">{t3(locale, "Simulador", "Simulator", "Simulateur")}</span>
          </nav>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-jade-600 rounded-full px-5 py-2 mb-4">
              <span className="text-lg">🎮</span>
              <span className="text-white text-sm font-bold tracking-wide">FIFA WORLD CUP 2026™</span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-3">
              {t3(locale,
                "Simulador de partidos del Mundial 2026",
                "World Cup 2026 match simulator"
              )}
            </h1>
            <p className="text-arena-300 text-base md:text-lg max-w-2xl mx-auto">
              {t3(locale,
                "Elige dos selecciones y descubre quién tiene más probabilidad de ganar, los marcadores más probables y los goles esperados. Basado en el ranking FIFA y la forma del torneo.",
                "Pick two teams and see who's more likely to win, the most likely scorelines and expected goals. Based on FIFA ranking and tournament form."
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Simulador */}
      <div className="bg-arena-50 py-10">
        <div className="container-custom">
          <SimulatorClient teams={teams} locale={locale} defaultA="mexico" defaultB="czechia" />
        </div>
      </div>

      {/* Cómo funciona + CTA */}
      <div className="bg-white py-10 border-t border-arena-200">
        <div className="container-custom max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-arena-800 mb-4 text-center">
            {t3(locale, "¿Cómo funciona?", "How does it work?")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-sm">
            <div className="bg-arena-50 border border-arena-200 rounded-xl p-4">
              <div className="text-2xl mb-2">📊</div>
              <p className="text-arena-700">
                {t3(locale,
                  "Cada selección tiene una fuerza de ataque y defensa según su ranking FIFA y su forma reciente en el Mundial.",
                  "Each team has an attack and defense strength based on its FIFA ranking and recent World Cup form."
                )}
              </p>
            </div>
            <div className="bg-arena-50 border border-arena-200 rounded-xl p-4">
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-arena-700">
                {t3(locale,
                  "Calculamos la distribución exacta de marcadores con un modelo Poisson con corrección Dixon-Coles para los resultados bajos.",
                  "We compute the exact scoreline distribution with a Poisson model plus Dixon-Coles correction for low scores."
                )}
              </p>
            </div>
            <div className="bg-arena-50 border border-arena-200 rounded-xl p-4">
              <div className="text-2xl mb-2">⚽</div>
              <p className="text-arena-700">
                {t3(locale,
                  "Obtienes probabilidades de victoria, empate, ambos anotan y los marcadores más probables al instante.",
                  "You get win, draw and both-teams-score probabilities plus the most likely scorelines instantly."
                )}
              </p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-arena-800 mb-3">
              🏆 {t3(locale, "¿Quieres revivir el Mundial?", "Want to relive the World Cup?")}
            </h2>
            <p className="text-arena-700 mb-5">
              {t3(locale,
                "Compara tus simulaciones contra lo que pasó de verdad: revisa los 104 resultados en el calendario y las guías de cada sede.",
                "Compare your simulations against what actually happened: check all 104 results in the calendar and each venue guide."
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href={`/${locale}/mundial`} className="btn-primary">
                🏟️ {t3(locale, "Ver sedes y guía", "See venues & guide")}
              </Link>
              <Link href={`/${locale}/mundial/calendario`} className="bg-arena-800 text-white font-semibold py-3 px-6 rounded-xl hover:bg-arena-700 transition-colors">
                📅 {t3(locale, "Ver calendario", "See calendar")}
              </Link>
              <Link href={`/${locale}/vuelos`} className="btn-outline">
                ✈️ {t3(locale, "Buscar vuelos", "Search flights")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

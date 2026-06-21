import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { getSimTeams } from "@/lib/data/mundial-teams";
import PenalesClient from "@/components/mundial/PenalesClient";
import { t3, seoAlternates, seoOpenGraph } from "@/lib/utils";
import { buildBreadcrumbList } from "@/lib/mundial-schema";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const title = t3(locale,
    "Penales del Mundial 2026 — Métele gol a tu portero favorito",
    "World Cup 2026 Penalties — Score on your favorite keeper"
  );
  const description = t3(locale,
    "Minijuego gratis: elige una selección, apunta y patea penales. El portero ataja según su dificultad y Bosnia es el más difícil de batir. Juega en el móvil.",
    "Free minigame: pick a team, aim and shoot penalties. The keeper saves based on difficulty and Bosnia is the hardest to beat. Play on mobile."
  );
  return {
    title,
    description,
    alternates: seoAlternates(locale, "/mundial/penales"),
    openGraph: seoOpenGraph(locale, title, description, "/mundial/penales"),
    twitter: { card: "summary_large_image" as const, title, description },
  };
}

export const revalidate = 3600;

export default async function MundialPenalesPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const teams = getSimTeams();

  const breadcrumbs = buildBreadcrumbList(locale, [
    { name: t3(locale, "Inicio", "Home", "Accueil"), url: `https://rutasmexico.com.mx/${locale}` },
    { name: t3(locale, "Mundial 2026", "World Cup 2026", "Coupe du Monde 2026"), url: `https://rutasmexico.com.mx/${locale}/mundial` },
    { name: t3(locale, "Penales", "Penalties") },
  ]);

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      {/* Hero */}
      <div className="bg-arena-900 py-10 md:py-14">
        <div className="container-custom">
          <nav className="text-xs text-arena-300 mb-4">
            <Link href={`/${locale}`} className="hover:text-white">{t3(locale, "Inicio", "Home")}</Link>
            {" / "}
            <Link href={`/${locale}/mundial`} className="hover:text-white">{t3(locale, "Mundial 2026", "World Cup 2026")}</Link>
            {" / "}
            <span className="text-white">{t3(locale, "Penales", "Penalties")}</span>
          </nav>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-oro-400 rounded-full px-4 py-1.5 mb-4">
              <span className="text-sm font-bold tracking-wide text-arena-900">⚽ FIFA WORLD CUP 2026™</span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-3">
              {t3(locale, "Métele gol a tu portero favorito", "Score on your favorite keeper")}
            </h1>
            <p className="text-arena-300 text-base md:text-lg max-w-2xl mx-auto">
              {t3(locale,
                "Elige una selección, apunta a una de las 9 zonas y ajusta la potencia. El portero se lanza según su dificultad. ¿Podrás batir a Bosnia, el más difícil?",
                "Pick a team, aim at one of the 9 zones and set the power. The keeper dives based on difficulty. Can you beat Bosnia, the hardest?"
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Juego */}
      <div className="bg-arena-50 py-10">
        <div className="container-custom">
          <PenalesClient teams={teams} locale={locale} defaultKeeper="bosnia" />
        </div>
      </div>

      {/* Cómo se juega + CTA */}
      <div className="bg-white py-10 border-t border-arena-200">
        <div className="container-custom max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-arena-800 mb-4 text-center">
            {t3(locale, "¿Cómo se juega?", "How to play?")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-sm">
            <div className="bg-arena-50 border border-arena-200 rounded-xl p-4">
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-arena-700">{t3(locale, "Toca una de las 9 zonas de la portería para apuntar tu tiro.", "Tap one of the goal's 9 zones to aim your shot.")}</p>
            </div>
            <div className="bg-arena-50 border border-arena-200 rounded-xl p-4">
              <div className="text-2xl mb-2">⚡</div>
              <p className="text-arena-700">{t3(locale, "Detén la barra de potencia: ni muy suave ni te pases, o tirarás fuera.", "Stop the power bar: not too soft, and don't overdo it or you'll miss.")}</p>
            </div>
            <div className="bg-arena-50 border border-arena-200 rounded-xl p-4">
              <div className="text-2xl mb-2">🧤</div>
              <p className="text-arena-700">{t3(locale, "Cada portero lleva los colores de su país y ataja según su dificultad.", "Each keeper wears its national colors and saves based on difficulty.")}</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-arena-700 mb-5">
              {t3(locale, "¿Quieres más Mundial?", "Want more World Cup?")}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href={`/${locale}/mundial/simulador`} className="btn-primary">
                🎮 {t3(locale, "Simulador de partidos", "Match simulator")}
              </Link>
              <Link href={`/${locale}/mundial`} className="bg-arena-800 text-white font-semibold py-3 px-6 rounded-xl hover:bg-arena-700 transition-colors">
                🏟️ {t3(locale, "Ver sedes y guía", "See venues & guide")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

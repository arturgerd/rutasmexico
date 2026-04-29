import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { getAllMundialMatches } from "@/lib/data/mundial-calendar";
import { getAllMundialVenues } from "@/lib/data/mundial";
import CalendarClient from "@/components/mundial/CalendarClient";
import { t3, seoAlternates, seoOpenGraph } from "@/lib/utils";
import { buildBreadcrumbList, buildTournamentSchema } from "@/lib/mundial-schema";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const title = t3(locale,
    "Calendario Mundial 2026 — Fechas, Horarios y Sedes Oficiales FIFA",
    "World Cup 2026 Calendar — Official FIFA Dates, Times & Venues",
    "Calendrier Coupe du Monde 2026 — Dates, Horaires et Stades FIFA"
  );
  const description = t3(locale,
    "Calendario completo del Mundial FIFA 2026: fechas, horarios y sedes de cada partido. Filtra por país, ronda o equipo. Partidos de México, EE.UU. y Canadá.",
    "Complete FIFA World Cup 2026 schedule: dates, times and venues for every match. Filter by country, round or team. Matches in Mexico, USA and Canada.",
    "Calendrier complet de la Coupe du Monde FIFA 2026 : dates, horaires et stades de chaque match. Filtrez par pays, tour ou équipe."
  );
  return {
    title,
    description,
    alternates: seoAlternates(locale, "/mundial/calendario"),
    openGraph: seoOpenGraph(locale, title, description, "/mundial/calendario"),
    twitter: { card: "summary_large_image" as const, title, description },
  };
}

export const revalidate = 3600;

export default async function MundialCalendarPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const [matches, venues] = await Promise.all([
    getAllMundialMatches(),
    getAllMundialVenues(),
  ]);

  const tournamentSchema = buildTournamentSchema(venues, locale);
  const breadcrumbs = buildBreadcrumbList(locale, [
    { name: t3(locale, "Inicio", "Home", "Accueil"), url: `https://rutasmexico.com.mx/${locale}` },
    { name: t3(locale, "Mundial 2026", "World Cup 2026", "Coupe du Monde 2026"), url: `https://rutasmexico.com.mx/${locale}/mundial` },
    { name: t3(locale, "Calendario", "Calendar", "Calendrier") },
  ]);

  const total = matches.length;
  const mxMatches = matches.filter((m) => m.country === "MX").length;
  const mexicoGames = matches.filter((m) => m.isMexicoGame).length;

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tournamentSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      {/* Hero */}
      <div className="bg-arena-900 py-12 md:py-16">
        <div className="container-custom">
          <nav className="text-xs text-arena-400 mb-4">
            <Link href={`/${locale}`} className="hover:text-white">{t3(locale, "Inicio", "Home", "Accueil")}</Link>
            {" / "}
            <Link href={`/${locale}/mundial`} className="hover:text-white">{t3(locale, "Mundial 2026", "World Cup 2026", "Coupe du Monde 2026")}</Link>
            {" / "}
            <span className="text-white">{t3(locale, "Calendario", "Calendar", "Calendrier")}</span>
          </nav>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-jade-600 rounded-full px-5 py-2 mb-4">
              <span className="text-lg">📅</span>
              <span className="text-white text-sm font-bold tracking-wide">FIFA WORLD CUP 2026™</span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-3">
              {t3(locale,
                "Calendario del Mundial 2026",
                "World Cup 2026 Calendar",
                "Calendrier de la Coupe du Monde 2026"
              )}
            </h1>
            <p className="text-arena-300 text-base md:text-lg max-w-2xl mx-auto">
              {t3(locale,
                "Todas las fechas, horarios y sedes. Filtra por país, ronda o equipo para encontrar el partido que vas a ver.",
                "All dates, times and venues. Filter by country, round or team to find the match you'll watch.",
                "Toutes les dates, horaires et stades. Filtrez par pays, tour ou équipe."
              )}
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto mt-6">
              <div className="bg-arena-800 rounded-xl p-3 border border-arena-700">
                <div className="text-2xl font-bold text-oro-400">{total}</div>
                <div className="text-xs text-arena-400 mt-1">{t3(locale, "Partidos en agenda", "Scheduled matches", "Matchs programmés")}</div>
              </div>
              <div className="bg-arena-800 rounded-xl p-3 border border-arena-700">
                <div className="text-2xl font-bold text-jade-400">🇲🇽 {mxMatches}</div>
                <div className="text-xs text-arena-400 mt-1">{t3(locale, "En sedes mexicanas", "In Mexican venues", "Stades mexicains")}</div>
              </div>
              <div className="bg-arena-800 rounded-xl p-3 border border-arena-700">
                <div className="text-2xl font-bold text-terracotta-400">⚽ {mexicoGames}</div>
                <div className="text-xs text-arena-400 mt-1">{t3(locale, "Juegos del Tri", "Mexico games", "Matchs du Mexique")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-arena-50 py-10">
        <div className="container-custom">
          <CalendarClient matches={matches} />
        </div>
      </div>

      {/* Disclaimer + CTA */}
      <div className="bg-white py-10 border-t border-arena-200">
        <div className="container-custom max-w-3xl">
          <div className="bg-arena-50 border border-arena-200 rounded-xl p-5 text-sm text-arena-600 mb-8">
            <strong>{t3(locale, "Nota:", "Note:", "Note :")}</strong>{" "}
            {t3(locale,
              "Horarios en hora local del estadio sede. Equipos 'Por definir' en eliminatorias se actualizan al avanzar la fase de grupos. Verifica siempre en FIFA.com antes de tu viaje.",
              "Times shown in the host stadium's local timezone. 'TBD' teams in knockouts fill in as group stage advances. Always verify on FIFA.com before traveling.",
              "Horaires locaux du stade hôte. Les équipes 'À définir' en éliminatoires se complètent à mesure que la phase de groupes avance."
            )}
          </div>
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-arena-800 mb-3">
              ✈️ {t3(locale, "¿Vas a viajar al Mundial?", "Traveling to the World Cup?", "Vous voyagez à la Coupe du Monde ?")}
            </h2>
            <p className="text-arena-600 mb-5">
              {t3(locale,
                "Encuentra vuelos y hoteles cerca de cada sede.",
                "Find flights and hotels near each venue.",
                "Trouvez vols et hôtels près de chaque stade."
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href={`/${locale}/vuelos`} className="btn-primary">
                ✈️ {t3(locale, "Buscar vuelos", "Search flights", "Chercher des vols")}
              </Link>
              <Link href={`/${locale}/hoteles`} className="bg-arena-800 text-white font-semibold py-3 px-6 rounded-xl hover:bg-arena-700 transition-colors">
                🏨 {t3(locale, "Buscar hoteles", "Search hotels", "Chercher des hôtels")}
              </Link>
              <Link href={`/${locale}/mundial`} className="btn-outline">
                🏟️ {t3(locale, "Ver sedes", "See venues", "Voir les stades")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

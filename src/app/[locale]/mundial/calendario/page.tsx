import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { getAllMundialMatches } from "@/lib/data/mundial-calendar";
import { getAllMundialVenues } from "@/lib/data/mundial";
import CalendarClient from "@/components/mundial/CalendarClient";
import { t3, seoAlternates, seoOpenGraph } from "@/lib/utils";
import { buildBreadcrumbList, buildTournamentSchema } from "@/lib/mundial-schema";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const title = t3(locale,
    "Calendario y resultados del Mundial 2026 — Marcadores por sede",
    "World Cup 2026 Schedule & Results — Scores by Venue",
    "Calendrier et résultats de la Coupe du Monde 2026"
  );
  const description = t3(locale,
    "Resultados y calendario del Mundial FIFA 2026: marcadores, fechas y sedes de cada partido, de la inauguración en el Azteca a la final donde España venció 1-0 a Argentina.",
    "FIFA World Cup 2026 results and schedule: scores, dates and venues for every match, from the Azteca opener to the final where Spain beat Argentina 1-0.",
    "Résultats et calendrier de la Coupe du Monde FIFA 2026 : scores, dates et stades de chaque match."
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
          <nav className="text-xs text-arena-700 mb-4">
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
                "Calendario y resultados del Mundial 2026",
                "World Cup 2026 Schedule & Results",
                "Calendrier et résultats de la Coupe du Monde 2026"
              )}
            </h1>
            <p className="text-arena-300 text-base md:text-lg max-w-2xl mx-auto">
              {t3(locale,
                "El torneo se jugó del 11 de junio al 19 de julio de 2026 y España se coronó campeón al vencer 1-0 a Argentina en la final. Filtra por país, ronda o equipo para revivir cada partido.",
                "The tournament ran from June 11 to July 19, 2026, and Spain were crowned champions after beating Argentina 1-0 in the final. Filter by country, round or team to relive every match.",
                "Le tournoi s'est joué du 11 juin au 19 juillet 2026 ; l'Espagne a été sacrée championne en battant l'Argentine 1-0 en finale."
              )}
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto mt-6">
              <div className="bg-arena-800 rounded-xl p-3 border border-arena-700">
                <div className="text-2xl font-bold text-oro-400">{total}</div>
                <div className="text-xs text-arena-700 mt-1">{t3(locale, "Partidos registrados", "Matches on record", "Matchs enregistrés")}</div>
              </div>
              <div className="bg-arena-800 rounded-xl p-3 border border-arena-700">
                <div className="text-2xl font-bold text-jade-400">🇲🇽 {mxMatches}</div>
                <div className="text-xs text-arena-700 mt-1">{t3(locale, "En sedes mexicanas", "In Mexican venues", "Stades mexicains")}</div>
              </div>
              <div className="bg-arena-800 rounded-xl p-3 border border-arena-700">
                <div className="text-2xl font-bold text-terracotta-400">⚽ {mexicoGames}</div>
                <div className="text-xs text-arena-700 mt-1">{t3(locale, "Juegos del Tri", "Mexico games", "Matchs du Mexique")}</div>
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
              "El torneo concluyó el 19 de julio de 2026; los marcadores provienen de nuestro seguimiento partido a partido. El estadio y la hora local aparecen en los partidos cuya sede registramos (todos los de México y toda la fase eliminatoria); en el resto de la fase de grupos indicamos fecha, grupo y marcador. Consulta las tablas por grupo en la página principal del Mundial.",
              "The tournament ended on July 19, 2026; scores come from our match-by-match tracking. Stadium and local kickoff time appear on matches whose venue we recorded (all Mexico games and the entire knockout stage); for the rest of the group stage we list date, group and final score. See the group tables on the World Cup main page.",
              "Le tournoi s'est achevé le 19 juillet 2026 ; les scores proviennent de notre suivi match par match. Le stade apparaît lorsque nous l'avons enregistré."
            )}
          </div>
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-arena-800 mb-3">
              ✈️ {t3(locale, "¿Te quedaste con ganas de conocer las sedes?", "Want to visit the host cities?", "Envie de découvrir les villes hôtes ?")}
            </h2>
            <p className="text-arena-600 mb-5">
              {t3(locale,
                "Los estadios y sus ciudades siguen siendo grandes destinos después del torneo. Encuentra vuelos, hoteles y nuestras guías de cada sede.",
                "The stadiums and their cities remain great destinations after the tournament. Find flights, hotels and our guide to each venue.",
                "Les stades et leurs villes restent de belles destinations après le tournoi. Trouvez vols, hôtels et nos guides."
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

import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { getFutbolData, getPlayedMatches, getUpcomingMatches, FutbolMatch } from "@/lib/data/futbol";
import AffiliateDisclosure from "@/components/editorial/AffiliateDisclosure";
import { t3, seoAlternates, seoOpenGraph } from "@/lib/utils";
import { buildBreadcrumbList } from "@/lib/mundial-schema";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const title = t3(locale,
    "Liga MX y Leagues Cup 2026 — Calendario, horarios y sedes",
    "Liga MX & Leagues Cup 2026 — Schedule, Times & Stadiums",
    "Liga MX et Leagues Cup 2026 — Calendrier, horaires et stades"
  );
  const description = t3(locale,
    "Resultados y próximos partidos de la Liga MX (Apertura 2026) y la Leagues Cup: horarios en hora del centro de México, estadio y ciudad de cada partido, con guías para viajar a verlos.",
    "Liga MX (Apertura 2026) and Leagues Cup results and upcoming fixtures: kickoff times in Mexico City time, stadium and city for every match, plus travel guides to see them live.",
    "Résultats et prochains matchs de la Liga MX et de la Leagues Cup : horaires, stades et villes."
  );
  return {
    title,
    description,
    alternates: seoAlternates(locale, "/futbol"),
    openGraph: seoOpenGraph(locale, title, description, "/futbol"),
    twitter: { card: "summary_large_image" as const, title, description },
  };
}

export const revalidate = 3600;

function formatMatchDate(date: string, locale: string): string {
  const d = new Date(`${date}T12:00:00-06:00`);
  const s = d.toLocaleDateString(locale === "es" ? "es-MX" : "en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "America/Mexico_City",
  });
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function MatchRow({ match, locale }: { match: FutbolMatch; locale: string }) {
  const played = match.status === "played";
  return (
    <div className="rounded-xl p-4 bg-white border border-arena-200 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:shadow-md transition-shadow">
      <div className="text-xs text-arena-500 sm:w-28 shrink-0">
        <div className="font-semibold text-arena-700">{formatMatchDate(match.date, locale)}</div>
        <div>
          {match.time
            ? `${match.time} ${t3(locale, "(centro de MX)", "(CDMX time)", "(heure de Mexico)")}`
            : t3(locale, "Hora por confirmar", "Time TBC", "Heure à confirmer")}
        </div>
      </div>
      <div className="flex-1 flex items-center gap-2 font-medium text-arena-800">
        <span className="flex-1 text-right">{match.teamA}</span>
        {played ? (
          <span className="px-2 py-0.5 rounded-lg bg-arena-900 text-white text-sm font-bold whitespace-nowrap text-center">
            {match.scoreA} - {match.scoreB}
            {match.penalties && (
              <span className="block text-[10px] font-normal text-arena-300">pen. {match.penalties}</span>
            )}
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded-lg bg-arena-100 text-arena-500 text-sm whitespace-nowrap">vs</span>
        )}
        <span className="flex-1">{match.teamB}</span>
      </div>
      <div className="text-xs text-arena-500 sm:w-52 shrink-0 sm:text-right">
        <div className="font-medium text-arena-600">🏟️ {match.stadium}</div>
        <div>
          {match.city} · {match.round}
        </div>
      </div>
    </div>
  );
}

function MatchSection({
  title,
  matches,
  locale,
  emptyText,
}: {
  title: string;
  matches: FutbolMatch[];
  locale: string;
  emptyText: string;
}) {
  return (
    <div className="mb-10">
      <h3 className="font-display text-xl font-bold text-arena-800 mb-4">{title}</h3>
      {matches.length === 0 ? (
        <p className="text-sm text-arena-500 bg-arena-50 border border-arena-200 rounded-xl p-4">{emptyText}</p>
      ) : (
        <div className="grid gap-3">
          {matches.map((m, i) => (
            <MatchRow key={`${m.date}-${m.teamA}-${i}`} match={m} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}

export default async function FutbolPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const data = getFutbolData();

  const breadcrumbs = buildBreadcrumbList(locale, [
    { name: t3(locale, "Inicio", "Home", "Accueil"), url: `https://rutasmexico.com.mx/${locale}` },
    { name: t3(locale, "Fútbol en México", "Football in Mexico", "Football au Mexique") },
  ]);

  const upcomingLabel = t3(locale, "Próximos partidos", "Upcoming matches", "Prochains matchs");
  const resultsLabel = t3(locale, "Resultados recientes", "Recent results", "Résultats récents");
  const emptyUpcoming = t3(locale,
    "Sin partidos programados confirmados por ahora.",
    "No confirmed upcoming matches for now.",
    "Pas de matchs programmés confirmés pour le moment."
  );
  const emptyResults = t3(locale, "Aún no hay resultados.", "No results yet.", "Pas encore de résultats.");

  const competitions = [
    { key: "ligaMX", emoji: "🇲🇽", comp: data.ligaMX },
    { key: "leaguesCup", emoji: "🏆", comp: data.leaguesCup },
  ];

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      {/* Hero */}
      <div className="bg-arena-900 py-12 md:py-16">
        <div className="container-custom">
          <nav className="text-xs text-arena-700 mb-4">
            <Link href={`/${locale}`} className="hover:text-white">{t3(locale, "Inicio", "Home", "Accueil")}</Link>
            {" / "}
            <span className="text-arena-500">{t3(locale, "Fútbol", "Football", "Football")}</span>
          </nav>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
            {t3(locale, "Liga MX y Leagues Cup 2026", "Liga MX & Leagues Cup 2026", "Liga MX et Leagues Cup 2026")}
          </h1>
          <p className="text-arena-300 max-w-3xl leading-relaxed">
            {t3(locale,
              "Horarios, sedes y resultados de la Liga MX (Apertura 2026) y de la Leagues Cup, el torneo entre clubes de la Liga MX y la MLS. Todos los horarios están en hora del centro de México. Si planeas viajar a un partido, revisa nuestras guías de vuelos, autobuses y destinos para armar la ruta.",
              "Kickoff times, stadiums and results for Liga MX (Apertura 2026) and the Leagues Cup, the tournament between Liga MX and MLS clubs. All times are Mexico City time. Planning to travel to a match? Check our flight, bus and destination guides to plan the trip.",
              "Horaires, stades et résultats de la Liga MX et de la Leagues Cup. Tous les horaires sont à l'heure de Mexico."
            )}
          </p>
          <p className="text-arena-500 text-xs mt-4">
            {t3(locale, "Última actualización:", "Last updated:", "Dernière mise à jour :")} {data.updated}
          </p>
        </div>
      </div>

      <div className="container-custom py-10">
        {competitions.map(({ key, emoji, comp }) => (
          <section key={key} className="mb-14">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{emoji}</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-arena-900">
                {locale === "en" ? comp.tournament.en : comp.tournament.es}
              </h2>
            </div>
            {comp.note && (
              <p className="text-sm text-arena-600 mb-6 max-w-3xl">
                {locale === "en" ? comp.note.en : comp.note.es}
              </p>
            )}
            <MatchSection
              title={upcomingLabel}
              matches={getUpcomingMatches(comp)}
              locale={locale}
              emptyText={emptyUpcoming}
            />
            <MatchSection
              title={resultsLabel}
              matches={getPlayedMatches(comp)}
              locale={locale}
              emptyText={emptyResults}
            />
          </section>
        ))}

        {/* Planea tu viaje */}
        <div className="bg-gradient-to-r from-jade-500 to-azul-500 rounded-2xl p-8 text-center shadow-lg">
          <p className="text-white text-lg font-medium mb-4">
            {t3(locale,
              "¿Vas al estadio? Compara vuelos y autobuses a la ciudad del partido.",
              "Going to the stadium? Compare flights and buses to the match city.",
              "Vous allez au stade ? Comparez vols et bus vers la ville du match."
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`/${locale}/vuelos`} className="bg-white text-arena-900 font-bold px-5 py-2.5 rounded-full hover:bg-arena-100 transition-colors">
              ✈️ {t3(locale, "Buscar vuelos", "Search flights", "Chercher des vols")}
            </Link>
            <Link href={`/${locale}/autobuses`} className="bg-white/15 text-white font-bold px-5 py-2.5 rounded-full hover:bg-white/25 transition-colors">
              🚌 {t3(locale, "Buscar autobuses", "Search buses", "Chercher des bus")}
            </Link>
            <Link href={`/${locale}/destinos`} className="bg-white/15 text-white font-bold px-5 py-2.5 rounded-full hover:bg-white/25 transition-colors">
              🗺️ {t3(locale, "Ver destinos", "See destinations", "Voir les destinations")}
            </Link>
          </div>
        </div>

        <AffiliateDisclosure locale={locale} variant="inline" />
      </div>
    </div>
  );
}

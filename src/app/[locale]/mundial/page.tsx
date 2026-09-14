import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { getAllMundialVenues, toVenueCard } from "@/lib/data/mundial";
import { getMexicoResults } from "@/lib/data/mundial-results";
import { getMundialMenu } from "@/lib/data/mundial-menu";
import MundialVenueGrid from "@/components/mundial/MundialVenueGrid";
import MenuBuilder from "@/components/mundial/MenuBuilder";
import TraditionsSection from "@/components/mundial/TraditionsSection";
import CountdownHero from "@/components/mundial/CountdownHero";
import HostCitiesBento from "@/components/mundial/HostCitiesBento";
import GroupStandings from "@/components/mundial/GroupStandings";
import FinalFeature from "@/components/mundial/FinalFeature";
import MercadoLibreBanner from "@/components/widgets/MercadoLibreBanner";
import AffiliateDisclosure from "@/components/editorial/AffiliateDisclosure";
import { t3, seoAlternates, seoOpenGraph } from "@/lib/utils";
import { buildTournamentSchema, buildBreadcrumbList } from "@/lib/mundial-schema";
import { getAllBlogSummaries } from "@/lib/data/blog";
import BlogCard from "@/components/blog/BlogCard";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const title = t3(locale,
    "Mundial 2026 en México - Sedes, Partidos y Cómo Llegar",
    "World Cup 2026 in Mexico - Venues, Matches & How to Get There"
  );
  const description = t3(locale,
    "Guía completa del Mundial FIFA 2026 en México: estadios, calendario de partidos, transporte, hoteles y tips para cada sede",
    "Complete FIFA World Cup 2026 guide for Mexico: stadiums, match schedule, transport, hotels and tips for each venue"
  );
  return {
    title,
    description,
    alternates: seoAlternates(locale, "/mundial"),
    openGraph: seoOpenGraph(locale, title, description, "/mundial"),
    twitter: { card: "summary_large_image" as const, title, description },
  };
}

export const revalidate = 3600;

export default async function MundialPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const venues = await getAllMundialVenues();
  const menu = getMundialMenu();
  const allPosts = await getAllBlogSummaries();
  const mundialPosts = allPosts.filter((p) =>
    p.slug.includes("mundial") || p.slug.includes("estadio-azteca") || p.slug.includes("estadio-bbva")
  ).slice(0, 6);

  // FIFA-official total for the 48-team format (https://www.fifa.com/.../canadamexicousa2026).
  // The matches array in mundial-venues.json only stores a curated subset (≈62 of 104) for the
  // city guides; the hero stat block must show the official count, not what we happen to have
  // authored. If/when we need to expose how many we cover, compute it inline at the use site.
  const TOURNAMENT_TOTAL_MATCHES = 104;
  const mexicoMatches = venues.reduce((sum, v) => sum + v.matches.filter(m => m.isMexicoGame).length, 0);
  // Group-stage scores live in mundial-results.json, not in the venue data —
  // graft them onto the venue matches (matching by date + team order) so the
  // "camino de México" cards show every result, group and knockout alike.
  const mexicoResults = getMexicoResults();
  const allMexicoGames = venues
    .flatMap(v => v.matches.filter(m => m.isMexicoGame))
    .map(m => {
      if (m.scoreA != null || m.round !== "group") return m;
      const r = mexicoResults.find(r => r.date === m.date);
      if (!r || r.scoreA == null || r.scoreB == null) return m;
      const sameOrder = r.teamA.es === m.teamA.es;
      return { ...m, scoreA: sameOrder ? r.scoreA : r.scoreB, scoreB: sameOrder ? r.scoreB : r.scoreA };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
  const mxVenues = venues.filter(v => (v.country ?? "MX") === "MX");
  const usVenues = venues.filter(v => v.country === "US");
  const caVenues = venues.filter(v => v.country === "CA");

  const tournamentSchema = buildTournamentSchema(venues, locale);
  const breadcrumbs = buildBreadcrumbList(locale, [
    {
      name: t3(locale, "Inicio", "Home"),
      url: `https://rutasmexico.com.mx/${locale}`,
    },
    { name: t3(locale, "Mundial 2026", "World Cup 2026") },
  ]);

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tournamentSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {/* Hero - DARK SOLID BACKGROUND */}
      <div className="bg-arena-900 py-16 md:py-20">
        <div className="container-custom">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-jade-600 rounded-full px-5 py-2 mb-6">
              <span className="text-lg">⚽</span>
              <span className="text-white text-sm font-bold tracking-wide">FIFA WORLD CUP 2026™</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
              {t3(locale, "Mundial 2026: 16 sedes en 3 países", "World Cup 2026: 16 venues across 3 countries")}
            </h1>
            <p className="text-arena-300 text-lg max-w-3xl mx-auto mb-8">
              {t3(locale,
                "3 sedes en México 🇲🇽 + 11 en EE.UU. 🇺🇸 + 2 en Canadá 🇨🇦. Partido inaugural en CDMX, final en Nueva York. Tu guía completa para cada ciudad sede: cómo llegar, transporte, zonas seguras, cambio y lugares cerca.",
                "3 venues in Mexico 🇲🇽 + 11 in USA 🇺🇸 + 2 in Canada 🇨🇦. Opening match in Mexico City, final in New York. Your complete guide for every host city: how to get there, transport, safe zones, currency and nearby places."
              )}
            </p>

            {/* Stats cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-arena-800 rounded-xl p-4 border border-arena-700">
                <div className="text-3xl font-bold text-oro-400">{venues.length}</div>
                <div className="text-xs text-arena-700 mt-1">{t3(locale, "Ciudades sede", "Host cities")}</div>
              </div>
              <div className="bg-arena-800 rounded-xl p-4 border border-arena-700">
                <div className="text-3xl font-bold text-oro-400">{TOURNAMENT_TOTAL_MATCHES}</div>
                <div className="text-xs text-arena-700 mt-1">{t3(locale, "Partidos totales", "Total matches")}</div>
              </div>
              <div className="bg-arena-800 rounded-xl p-4 border border-arena-700">
                <div className="text-3xl font-bold text-jade-400">🇲🇽 {mexicoMatches}</div>
                <div className="text-xs text-arena-700 mt-1">{t3(locale, "Juegos de México", "Mexico games")}</div>
              </div>
              <div className="bg-arena-800 rounded-xl p-4 border border-arena-700">
                <div className="text-3xl font-bold text-terracotta-400">Jun 11</div>
                <div className="text-xs text-arena-700 mt-1">{t3(locale, "Inauguración", "Opening day")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown to opening match */}
      <CountdownHero locale={locale} />

      {/* CTA Calendario */}
      <div className="bg-oro-500 py-4 border-b-4 border-oro-600">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div>
            <h2 className="font-display text-lg md:text-xl font-bold text-arena-900">
              📅 {t3(locale, "Calendario completo de los 104 partidos", "Complete calendar of 104 matches")}
            </h2>
            <p className="text-sm text-arena-800">
              {t3(locale, "Filtra por fecha, equipo, ronda o sede", "Filter by date, team, round or venue")}
            </p>
          </div>
          <Link href={`/${locale}/mundial/calendario`} className="bg-arena-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-arena-800 whitespace-nowrap">
            {t3(locale, "Ver calendario →", "See calendar →")}
          </Link>
        </div>
      </div>

      {/* Mexico - El camino en el Mundial (grupo + eliminatorias) */}
      <div className="bg-jade-700 py-8">
        <div className="container-custom">
          <h2 className="font-display text-2xl font-bold text-white mb-2 text-center">
            🇲🇽 {t3(locale, "El camino de México", "Mexico's road")}
          </h2>
          <p className="text-jade-100 text-sm text-center mb-6 max-w-2xl mx-auto">
            {t3(locale,
              "México ganó el Grupo A con paso perfecto (9 pts), venció 2-0 a Ecuador en dieciseisavos y cayó 2-3 ante Inglaterra en octavos de final, en un Estadio Azteca con más de 80 mil aficionados.",
              "Mexico won Group A with a perfect record (9 pts), beat Ecuador 2-0 in the round of 32 and fell 2-3 to England in the round of 16 in front of 80,000+ fans at Estadio Azteca."
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {allMexicoGames.map((match, i) => {
              const flag = (name: string) =>
                name.includes("México") ? "🇲🇽"
                : name.includes("Sudáfrica") ? "🇿🇦"
                : name.includes("Corea") ? "🇰🇷"
                : name.includes("Chequia") ? "🇨🇿"
                : name.includes("Ecuador") ? "🇪🇨"
                : name.includes("Inglaterra") ? "🏴󠁧󠁢󠁥󠁮󠁧󠁿"
                : "🏳️";
              const roundLabel =
                i === 0
                  ? `🎉 ${t3(locale, "PARTIDO INAUGURAL", "OPENING MATCH")}`
                  : match.round === "round-of-32"
                  ? `🏆 ${t3(locale, "DIECISEISAVOS DE FINAL", "ROUND OF 32")}`
                  : match.round === "round-of-16"
                  ? `🏆 ${t3(locale, "OCTAVOS DE FINAL", "ROUND OF 16")}`
                  : t3(locale, "FASE DE GRUPOS", "GROUP STAGE");
              const dt = new Date(`${match.date}T12:00:00Z`);
              const weekday = dt.toLocaleDateString(locale === "en" ? "en-US" : "es-MX", { weekday: "long" });
              const dayMonth = dt.toLocaleDateString(locale === "en" ? "en-US" : "es-MX", { day: "numeric", month: "long" });
              const played = match.scoreA != null && match.scoreB != null;
              const isUpcoming = !played && match.round !== "group";
              const mexIsA = match.teamA.es.includes("México");
              const mexWon = played && (mexIsA ? match.scoreA! > match.scoreB! : match.scoreB! > match.scoreA!);
              const stadium = venues.find(v => v.matches.some(m => m.date === match.date && m.isMexicoGame))?.stadium.name;
              return (
                <div
                  key={i}
                  className={`bg-white rounded-xl p-5 text-center shadow-lg ${isUpcoming ? "ring-2 ring-oro-400" : ""}`}
                >
                  <div className="text-xs font-bold text-jade-600 uppercase mb-2">{roundLabel}</div>
                  {isUpcoming && (
                    <div className="inline-block bg-oro-500 text-arena-900 text-[10px] font-bold uppercase rounded-full px-2 py-0.5 mb-2">
                      {t3(locale, "Próximo partido", "Next match")}
                    </div>
                  )}
                  {played && match.round !== "group" && (
                    <div className={`inline-block text-[10px] font-bold uppercase rounded-full px-2 py-0.5 mb-2 ${mexWon ? "bg-jade-100 text-jade-800" : "bg-terracotta-100 text-terracotta-800"}`}>
                      {mexWon
                        ? t3(locale, "Victoria", "Win")
                        : t3(locale, "Eliminados", "Eliminated")}
                    </div>
                  )}
                  <div className="flex items-center justify-center gap-4 my-3">
                    <div className="text-center">
                      <div className="text-2xl mb-1">{flag(match.teamA.es)}</div>
                      <div className="font-bold text-arena-800 text-sm">{locale === "en" ? match.teamA.en : match.teamA.es}</div>
                    </div>
                    <div className="text-xl font-bold text-arena-700">
                      {played ? `${match.scoreA}–${match.scoreB}` : "VS"}
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">{flag(match.teamB.es)}</div>
                      <div className="font-bold text-arena-800 text-sm">{locale === "en" ? match.teamB.en : match.teamB.es}</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-arena-700 capitalize">
                    📅 {weekday} {dayMonth}
                  </div>
                  <div className="text-sm text-arena-500">⏰ {match.time} hrs</div>
                  {stadium && <div className="text-xs text-arena-700 mt-1">📍 {stadium}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Resultados, tabla de posiciones y estadísticas del Grupo A */}
      <GroupStandings locale={locale} group="A" />

      {/* Juega: simulador + penales */}
      <div className="bg-white py-12 border-t border-arena-200">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-arena-800 mb-2 text-center">
            🎮 {t3(locale, "Juega con el Mundial", "Play the World Cup")}
          </h2>
          <p className="text-arena-700 text-center mb-8 max-w-2xl mx-auto">
            {t3(locale,
              "Simula cualquier partido o métele gol al portero más difícil. Gratis y sin registro.",
              "Simulate any match or score on the toughest keeper. Free, no signup."
            )}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Link
              href={`/${locale}/mundial/simulador`}
              className="group bg-arena-50 border border-arena-200 rounded-2xl p-6 hover:-translate-y-0.5 hover:shadow-md transition-all"
            >
              <div className="text-4xl mb-3">🎮</div>
              <h3 className="font-display text-xl font-bold text-arena-900 mb-1">
                {t3(locale, "Simulador de partidos", "Match simulator")}
              </h3>
              <p className="text-sm text-arena-700 mb-3">
                {t3(locale,
                  "Probabilidades, marcadores más probables, goles esperados y córners de cualquier duelo.",
                  "Win probability, likely scorelines, expected goals and corners for any matchup."
                )}
              </p>
              <span className="text-jade-700 font-semibold text-sm group-hover:underline">
                {t3(locale, "Simular un partido →", "Simulate a match →")}
              </span>
            </Link>
            <Link
              href={`/${locale}/mundial/penales`}
              className="group bg-arena-50 border border-arena-200 rounded-2xl p-6 hover:-translate-y-0.5 hover:shadow-md transition-all"
            >
              <div className="text-4xl mb-3">🧤</div>
              <h3 className="font-display text-xl font-bold text-arena-900 mb-1">
                {t3(locale, "Penales: métele gol al portero", "Penalties: beat the keeper")}
              </h3>
              <p className="text-sm text-arena-700 mb-3">
                {t3(locale,
                  "Apunta, mide la potencia y batea. Bosnia es el portero más difícil del torneo.",
                  "Aim, set the power and shoot. Bosnia is the hardest keeper in the tournament."
                )}
              </p>
              <span className="text-terracotta-700 font-semibold text-sm group-hover:underline">
                {t3(locale, "Jugar penales →", "Play penalties →")}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Host countries bento overview */}
      <HostCitiesBento
        locale={locale}
        mxCount={mxVenues.length}
        usCount={usVenues.length}
        caCount={caVenues.length}
      />

      {/* Sedes en México */}
      <div id="sedes-mexico" className="bg-arena-50 py-12 scroll-mt-20">
        <div className="container-custom">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-arena-800 mb-2 text-center">
            🇲🇽 {t3(locale, "Las 3 sedes en México", "The 3 venues in Mexico")}
          </h2>
          <p className="text-arena-500 text-center mb-8 max-w-xl mx-auto">
            {t3(locale,
              "Fase de grupos + Ronda de 32 + Octavos. Partido inaugural en el Estadio Azteca.",
              "Group stage + Round of 32 + Round of 16. Opening match at Estadio Azteca."
            )}
          </p>
          <MundialVenueGrid venues={mxVenues.map(toVenueCard)} />
        </div>
      </div>

      {/* Sedes en EUA */}
      <div id="sedes-usa" className="bg-white py-12 border-t border-arena-200 scroll-mt-20">
        <div className="container-custom">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-arena-800 mb-2 text-center">
            🇺🇸 {t3(locale, "Las 11 sedes en Estados Unidos", "The 11 venues in the United States")}
          </h2>
          <p className="text-arena-500 text-center mb-8 max-w-2xl mx-auto">
            {t3(locale,
              "España venció 2-0 a Francia en Dallas y ganó la final 1-0 a Argentina en Nueva York (MetLife Stadium, 19 julio). Guía para cada sede: vuelos desde México, transporte local, zonas seguras y cambio USD.",
              "Spain beat France 2-0 in Dallas and won the final 1-0 over Argentina in New York (MetLife Stadium, July 19). Guide for each venue: flights from Mexico, local transport, safe zones and USD exchange."
            )}
          </p>
          <MundialVenueGrid venues={usVenues.map(toVenueCard)} />
        </div>
      </div>

      {/* Sedes en Canadá */}
      {caVenues.length > 0 && (
        <div id="sedes-canada" className="bg-arena-50 py-12 border-t border-arena-200 scroll-mt-20">
          <div className="container-custom">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-arena-800 mb-2 text-center">
              🇨🇦 {t3(locale, "Las 2 sedes en Canadá", "The 2 venues in Canada")}
            </h2>
            <p className="text-arena-500 text-center mb-8 max-w-2xl mx-auto">
              {t3(locale,
                "Toronto (BMO Field) y Vancouver (BC Place). Fase de grupos y octavos en Vancouver. SIN visa física para mexicanos — solo eTA ($7 CAD en línea).",
                "Toronto (BMO Field) and Vancouver (BC Place). Group stage and R16 in Vancouver. NO physical visa for Mexicans — only eTA ($7 CAD online)."
              )}
            </p>
            <MundialVenueGrid venues={caVenues.map(toVenueCard)} />
          </div>
        </div>
      )}

      {/* Featured: the Final at MetLife */}
      <FinalFeature locale={locale} />

      {/* Guia rapida: Como llegar a Mexico */}
      <div className="bg-white py-12">
        <div className="container-custom">
          <h2 className="font-display text-2xl font-bold text-arena-800 mb-8 text-center">
            ✈️ {t3(locale, "Cómo llegar a las sedes", "How to reach the venues")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CDMX */}
            <div className="card p-6">
              <h3 className="font-display font-bold text-arena-800 mb-3">🏙️ Ciudad de México</h3>
              <ul className="space-y-2 text-sm text-arena-600">
                <li>✈️ {t3(locale, "Aeropuerto MEX - vuelos desde todo el mundo", "MEX Airport - flights worldwide")}</li>
                <li>🚇 {t3(locale, "Metro + Metrobús al Estadio Azteca", "Metro + Metrobús to Estadio Azteca")}</li>
                <li>🚗 {t3(locale, "Uber/DiDi $150-250 MXN desde centro", "Uber/DiDi $150-250 MXN from downtown")}</li>
                <li>⚠️ {t3(locale, "Altitud 2,240m - aclimatarse 2 días", "Altitude 2,240m - acclimatize 2 days")}</li>
              </ul>
              <Link href={`/${locale}/mundial/ciudad-de-mexico`} className="btn-primary mt-4 inline-block text-sm">
                {t3(locale, "Ver guía completa", "See full guide")}
              </Link>
            </div>
            {/* Monterrey */}
            <div className="card p-6">
              <h3 className="font-display font-bold text-arena-800 mb-3">🏔️ Monterrey</h3>
              <ul className="space-y-2 text-sm text-arena-600">
                <li>✈️ {t3(locale, "Aeropuerto MTY - vuelos nacionales e internacionales", "MTY Airport - domestic & international flights")}</li>
                <li>🚇 {t3(locale, "Metro a Exposición + shuttle FIFA", "Metro to Exposición + FIFA shuttle")}</li>
                <li>🚗 {t3(locale, "Uber/DiDi $200-350 MXN desde centro", "Uber/DiDi $200-350 MXN from downtown")}</li>
                <li>🌡️ {t3(locale, "CALOR EXTREMO en junio: 35-40°C", "EXTREME HEAT in June: 35-40°C")}</li>
              </ul>
              <Link href={`/${locale}/mundial/monterrey`} className="btn-primary mt-4 inline-block text-sm">
                {t3(locale, "Ver guía completa", "See full guide")}
              </Link>
            </div>
            {/* Guadalajara */}
            <div className="card p-6">
              <h3 className="font-display font-bold text-arena-800 mb-3">🎺 Guadalajara</h3>
              <ul className="space-y-2 text-sm text-arena-600">
                <li>✈️ {t3(locale, "Aeropuerto GDL - vuelos nacionales e internacionales", "GDL Airport - domestic & international flights")}</li>
                <li>🚇 {t3(locale, "Tren Ligero L3 + shuttle FIFA", "Light Rail L3 + FIFA shuttle")}</li>
                <li>🚗 {t3(locale, "Uber/DiDi $250-400 MXN desde centro", "Uber/DiDi $250-400 MXN from downtown")}</li>
                <li>📍 {t3(locale, "Estadio en Zapopan, 30 min del centro", "Stadium in Zapopan, 30 min from downtown")}</li>
              </ul>
              <Link href={`/${locale}/mundial/guadalajara`} className="btn-primary mt-4 inline-block text-sm">
                {t3(locale, "Ver guía completa", "See full guide")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tips generales */}
      <div className="bg-arena-100 py-12">
        <div className="container-custom">
          <h2 className="font-display text-2xl font-bold text-arena-800 mb-2 text-center">
            📋 {t3(locale, "Guía esencial para el aficionado", "Essential fan guide")}
          </h2>
          <p className="text-arena-600 text-sm text-center mb-8 max-w-2xl mx-auto">
            {t3(locale,
              "Con esta guía preparamos a los visitantes durante el torneo (11 de junio – 19 de julio de 2026). Los consejos de pagos, transporte y seguridad siguen aplicando si visitas las ciudades sede.",
              "This is the guide we used to prepare visitors during the tournament (June 11 – July 19, 2026). The payment, transport and safety tips still apply when visiting the host cities."
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-arena-800 mb-2">🎟️ {t3(locale, "Boletos", "Tickets")}</h3>
              <p className="text-sm text-arena-600">
                {t3(locale,
                  "Durante el torneo los boletos oficiales se vendieron solo en FIFA.com/tickets, de $1,800 a $50,000 MXN según fase y ubicación. La regla sigue vigente para cualquier evento en los estadios: compra en canales oficiales, nunca en reventa callejera.",
                  "During the tournament official tickets were sold only at FIFA.com/tickets, from $1,800 to $50,000 MXN depending on round and seat. The rule still holds for any stadium event: buy through official channels, never street resellers."
                )}
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-arena-800 mb-2">💳 {t3(locale, "Pagos", "Payments")}</h3>
              <p className="text-sm text-arena-600">
                {t3(locale,
                  "Los estadios operaron 100% cashless durante el Mundial y mantienen ese esquema en conciertos y liga: lleva tarjeta de crédito/débito o billetera digital. Hay cajeros ATM afuera de los estadios.",
                  "Stadiums ran 100% cashless during the World Cup and keep that setup for concerts and league games: bring credit/debit cards or a digital wallet. ATMs are available outside."
                )}
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-arena-800 mb-2">📱 {t3(locale, "Conectividad", "Connectivity")}</h3>
              <p className="text-sm text-arena-600">
                {t3(locale,
                  "Compra un chip Telcel o AT&T en el aeropuerto ($200-500 MXN con datos). WiFi gratuito en fan zones y muchos restaurantes.",
                  "Buy a Telcel or AT&T SIM at the airport ($200-500 MXN with data). Free WiFi at fan zones and many restaurants."
                )}
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-arena-800 mb-2">👕 {t3(locale, "Jerseys y souvenirs", "Jerseys & souvenirs")}</h3>
              <p className="text-sm text-arena-600">
                {t3(locale,
                  "Compra jerseys oficiales en las tiendas FIFA dentro de fan zones o en línea. Evita falsificaciones callejeras. En Mercado Libre encuentras opciones desde $400 MXN.",
                  "Buy official jerseys at FIFA stores in fan zones or online. Avoid street counterfeits. Mercado Libre has options from $400 MXN."
                )}
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-arena-800 mb-2">🍺 {t3(locale, "Comida y bebida", "Food & drinks")}</h3>
              <p className="text-sm text-arena-600">
                {t3(locale,
                  "Prueba la comida callejera mexicana: tacos, elotes, esquites, aguas frescas. En el estadio los precios son 2-3x más caros. Come antes de entrar.",
                  "Try Mexican street food: tacos, elotes, esquites, aguas frescas. Stadium prices are 2-3x higher. Eat before entering."
                )}
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-arena-800 mb-2">🔒 {t3(locale, "Seguridad", "Safety")}</h3>
              <p className="text-sm text-arena-600">
                {t3(locale,
                  "Las zonas de estadios operan con seguridad reforzada en eventos grandes. No lleves mochilas grandes. Usa Uber/DiDi en lugar de taxis callejeros. Guarda tus pertenencias cerca.",
                  "Stadium areas run enhanced security at major events. Don't bring large backpacks. Use Uber/DiDi instead of street taxis. Keep belongings close."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Experiencia mundialista: cerveza, comida, botana */}
      <div className="bg-gradient-to-br from-oro-50 to-terracotta-50 py-12">
        <div className="container-custom">
          <h2 className="font-display text-2xl font-bold text-arena-800 mb-2 text-center">
            🎊 {t3(locale, "La experiencia mundialista mexicana", "The Mexican World Cup experience")}
          </h2>
          <p className="text-arena-500 text-center mb-8 max-w-xl mx-auto">
            {t3(locale,
              "No solo es fútbol — es una fiesta. Esto es lo que necesitas saber para vivirla como mexicano",
              "It's not just football — it's a party. Here's what you need to know to experience it like a local"
            )}
          </p>

          <MenuBuilder menu={menu} locale={locale} />

          {/* Ambiente y tradiciones */}
          <TraditionsSection locale={locale} />
        </div>
      </div>

      {/* Presupuesto estimado */}
      <div className="bg-white py-12">
        <div className="container-custom">
          <h2 className="font-display text-2xl font-bold text-arena-800 mb-8 text-center">
            💰 {t3(locale, "Presupuesto estimado por día", "Estimated daily budget")}
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🏨", label: t3(locale, "Hotel (por noche)", "Hotel (per night)"), range: "$1,500 - $5,000" },
                { icon: "🍽️", label: t3(locale, "Comida (3 comidas)", "Food (3 meals)"), range: "$500 - $1,500" },
                { icon: "🚗", label: t3(locale, "Transporte", "Transport"), range: "$200 - $800" },
                { icon: "🎟️", label: t3(locale, "Boleto partido", "Match ticket"), range: "$1,800 - $15,000" },
                { icon: "🍺", label: t3(locale, "Entretenimiento", "Entertainment"), range: "$500 - $2,000" },
                { icon: "👕", label: t3(locale, "Souvenirs", "Souvenirs"), range: "$400 - $3,000" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-arena-50 rounded-lg p-3">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <div className="text-xs text-arena-500">{item.label}</div>
                    <div className="font-bold text-arena-800 text-sm">{item.range} MXN</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-terracotta-50 border border-terracotta-200 rounded-xl p-4 mt-6 text-center">
              <p className="text-sm text-arena-600">{t3(locale, "Total estimado por día:", "Estimated daily total:")}</p>
              <p className="text-2xl font-bold text-terracotta-600">$4,900 - $27,300 MXN</p>
              <p className="text-xs text-arena-700">({t3(locale, "~$250 - $1,400 USD", "~$250 - $1,400 USD")})</p>
            </div>
          </div>
        </div>
      </div>

      {/* Guías paso a paso del Mundial 2026 */}
      {mundialPosts.length > 0 && (
        <div className="bg-arena-50 py-12 border-t border-arena-200">
          <div className="container-custom">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-arena-800 mb-2 text-center">
              📖 {t3(locale,
                "Guías paso a paso del Mundial 2026",
                "Step-by-step 2026 World Cup guides"
              )}
            </h2>
            <p className="text-arena-500 text-center mb-8 max-w-2xl mx-auto">
              {t3(locale,
                "Cómo llegar al Estadio Azteca, hoteles cerca de cada sede, vuelos a Guadalajara, presupuesto desde tu país y comparativa entre México, USA y Canadá.",
                "How to reach Estadio Azteca, hotels near each venue, flights to Guadalajara, budget by country, and Mexico vs USA vs Canada breakdown."
              )}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mundialPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mercado Libre - productos mundialistas */}
      <div className="bg-arena-50 py-8">
        <div className="container-custom">
          <MercadoLibreBanner context="travel" />
          <AffiliateDisclosure locale={locale} variant="inline" />
        </div>
      </div>

      {/* Planea tu viaje CTA */}
      <div className="bg-arena-900 py-12">
        <div className="container-custom text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-4">
            🛫 {t3(locale, "Planea tu viaje al Mundial", "Plan your World Cup trip")}
          </h2>
          <p className="text-arena-700 mb-6 max-w-xl mx-auto">
            {t3(locale,
              "Busca vuelos, compara hoteles y encuentra las mejores rutas para llegar a cada sede",
              "Search flights, compare hotels and find the best routes to each venue"
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/vuelos`} className="btn-primary text-lg px-8">
              ✈️ {t3(locale, "Buscar vuelos", "Search flights")}
            </Link>
            <Link href={`/${locale}/hoteles`} className="bg-white text-arena-800 font-semibold py-3 px-8 rounded-xl hover:bg-arena-100 transition-colors text-lg">
              🏨 {t3(locale, "Buscar hoteles", "Search hotels")}
            </Link>
            <Link href={`/${locale}/rutas`} className="btn-outline border-white text-white hover:bg-white hover:text-arena-900 text-lg px-8">
              🗺️ {t3(locale, "Ver rutas", "See routes")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

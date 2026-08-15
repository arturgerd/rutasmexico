import Link from "next/link";
import { t3 } from "@/lib/utils";
import { getFutbolData, getUpcomingMatches } from "@/lib/data/futbol";

export default function FutbolBanner({ locale }: { locale: string }) {
  const data = getFutbolData();

  // Próximos partidos de ambas competiciones, los 3 más cercanos
  const upcoming = [
    ...getUpcomingMatches(data.ligaMX).map((m) => ({ ...m, comp: "Liga MX" })),
    ...getUpcomingMatches(data.leaguesCup).map((m) => ({ ...m, comp: "Leagues Cup" })),
  ]
    .sort((a, b) => `${a.date} ${a.time ?? "99:99"}`.localeCompare(`${b.date} ${b.time ?? "99:99"}`))
    .slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-jade-600 via-jade-700 to-terracotta-900 py-12 md:py-16">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3), transparent 30%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.25), transparent 40%)",
        }}
      />
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-oro-400 rounded-full px-4 py-1.5 mb-4 shadow-lg">
              <span className="text-sm font-bold tracking-wide text-arena-900">
                ⚽ {t3(locale, "FÚTBOL EN MÉXICO", "FOOTBALL IN MEXICO", "FOOTBALL AU MEXIQUE")}
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
              {t3(
                locale,
                "Liga MX y Leagues Cup 2026",
                "Liga MX & Leagues Cup 2026",
                "Liga MX et Leagues Cup 2026"
              )}
            </h2>
            <p className="text-white/85 text-base md:text-lg max-w-2xl leading-relaxed">
              {t3(
                locale,
                "Calendario y resultados del Apertura 2026 y de la Leagues Cup: horarios en hora del centro de México, estadio y ciudad de cada partido. Y si te animas a ir, tenemos las guías de vuelos, autobuses y hoteles para llegar al estadio.",
                "Apertura 2026 and Leagues Cup schedules and results: kickoff times in Mexico City time, stadium and city for every match. And if you feel like going, our flight, bus and hotel guides get you to the stadium.",
                "Calendrier et résultats de l'Apertura 2026 et de la Leagues Cup : horaires, stades et villes de chaque match."
              )}
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-4 w-full lg:w-auto lg:min-w-[280px]">
            <Link
              href={`/${locale}/futbol`}
              className="bg-white text-emerald-700 font-bold py-3.5 px-6 rounded-xl text-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              📅 {t3(locale, "Ver calendario y resultados", "See schedule & results", "Voir le calendrier")}
            </Link>
          </div>
        </div>

        {/* Próximos partidos */}
        {upcoming.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
            {upcoming.map((m, i) => (
              <Link
                key={`${m.date}-${m.teamA}-${i}`}
                href={`/${locale}/futbol`}
                className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="font-bold text-white truncate">
                  {m.teamA} <span className="text-white/60 font-normal">vs</span> {m.teamB}
                </div>
                <div className="text-xs text-white/70 truncate mt-1">
                  🏟️ {m.stadium} · {m.city}
                </div>
                <div className="text-xs text-oro-300 mt-2 font-semibold">
                  {m.date.slice(8, 10)}/{m.date.slice(5, 7)}
                  {m.time ? ` · ${m.time} ${t3(locale, "(centro de MX)", "(CDMX time)", "(heure de Mexico)")}` : ""} · {m.comp}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

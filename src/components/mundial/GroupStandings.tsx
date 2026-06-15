import Link from "next/link";
import {
  computeStandings,
  getResultsByGroup,
  getGroupStats,
  isPlayed,
  type MundialResult,
} from "@/lib/data/mundial-results";
import { t3, localize } from "@/lib/utils";

// Minimal flag map for the Group A teams. Kept local (server component) so we
// don't pull the big client-side teamFlag() switch from CalendarClient.
const FLAG: Record<string, string> = {
  "México": "🇲🇽",
  "Sudáfrica": "🇿🇦",
  "Corea del Sur": "🇰🇷",
  "Chequia": "🇨🇿",
};
const flagFor = (esName: string) => FLAG[esName] ?? "⚽";

function fmtDate(iso: string, locale: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString(locale === "es" ? "es-MX" : "en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function MatchRow({ m, locale }: { m: MundialResult; locale: string }) {
  const teamA = localize(m.teamA, locale);
  const teamB = localize(m.teamB, locale);
  const played = isPlayed(m);
  // A scheduled match whose date has already passed but has no score yet:
  // be honest — "result pending" rather than pretending it hasn't happened.
  const past = new Date(`${m.date}T23:59:59Z`).getTime() < Date.now();
  const aWon = played && (m.scoreA as number) > (m.scoreB as number);
  const bWon = played && (m.scoreB as number) > (m.scoreA as number);

  return (
    <div
      className={`bg-white rounded-xl border ${
        m.isMexicoGame ? "border-jade-400 ring-1 ring-jade-200" : "border-arena-200"
      } p-4`}
    >
      <div className="flex items-center justify-between text-xs text-arena-700 mb-2">
        <span>📅 {fmtDate(m.date, locale)} • {m.time}</span>
        {m.isMexicoGame && <span className="font-bold text-jade-700">🇲🇽 México</span>}
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className={`flex items-center gap-2 flex-1 min-w-0 ${aWon ? "font-bold text-arena-900" : "text-arena-800"}`}>
          <span className="text-2xl" aria-hidden="true">{flagFor(m.teamA.es)}</span>
          <span className="truncate">{teamA}</span>
        </span>
        {played ? (
          <span className="font-display font-bold text-lg text-arena-900 tabular-nums px-3 whitespace-nowrap">
            {m.scoreA} <span className="text-arena-400">-</span> {m.scoreB}
          </span>
        ) : (
          <span className="text-xs font-semibold text-arena-700 bg-arena-100 rounded px-2 py-1 whitespace-nowrap">
            {past
              ? t3(locale, "Resultado pendiente", "Result pending")
              : t3(locale, "Por jugarse", "Upcoming")}
          </span>
        )}
        <span className={`flex items-center gap-2 flex-1 min-w-0 justify-end text-right ${bWon ? "font-bold text-arena-900" : "text-arena-800"}`}>
          <span className="truncate">{teamB}</span>
          <span className="text-2xl" aria-hidden="true">{flagFor(m.teamB.es)}</span>
        </span>
      </div>
      {m.venue && (
        <div className="text-xs text-arena-700 mt-2 text-center">
          {m.venueSlug ? (
            <Link href={`/${locale}/mundial/${m.venueSlug}`} className="hover:text-jade-700 underline-offset-2 hover:underline">
              📍 {localize(m.venue, locale)}
            </Link>
          ) : (
            <span>📍 {localize(m.venue, locale)}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default function GroupStandings({ locale, group = "A" }: { locale: string; group?: string }) {
  const standings = computeStandings(group);
  const matches = getResultsByGroup(group);
  const stats = getGroupStats(group);
  const anyPlayed = stats.matchesPlayed > 0;

  return (
    <div className="bg-white py-12 border-t border-arena-200" id="resultados">
      <div className="container-custom">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-arena-800 mb-2 text-center">
          📊 {t3(locale, `Resultados y posiciones — Grupo ${group}`, `Results & standings — Group ${group}`)}
        </h2>
        <p className="text-arena-700 text-center mb-8 max-w-2xl mx-auto">
          {t3(
            locale,
            "Tabla del grupo de México, marcadores y estadísticas. Se actualiza conforme se juegan los partidos.",
            "Mexico's group table, scores and statistics. Updated as matches are played."
          )}
        </p>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto mb-8">
          <div className="bg-arena-50 rounded-xl p-4 text-center border border-arena-200">
            <div className="text-2xl font-bold text-jade-700">{stats.matchesPlayed}/{stats.matchesTotal}</div>
            <div className="text-xs text-arena-700 mt-1">{t3(locale, "Partidos jugados", "Matches played")}</div>
          </div>
          <div className="bg-arena-50 rounded-xl p-4 text-center border border-arena-200">
            <div className="text-2xl font-bold text-terracotta-600">{stats.goalsScored}</div>
            <div className="text-xs text-arena-700 mt-1">{t3(locale, "Goles totales", "Total goals")}</div>
          </div>
          <div className="bg-arena-50 rounded-xl p-4 text-center border border-arena-200">
            <div className="text-2xl font-bold text-oro-600">{anyPlayed ? stats.goalsPerMatch : "—"}</div>
            <div className="text-xs text-arena-700 mt-1">{t3(locale, "Goles por partido", "Goals per match")}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Standings table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <caption className="text-left font-display font-bold text-arena-800 mb-3">
                {t3(locale, `Tabla de posiciones — Grupo ${group}`, `Standings — Group ${group}`)}
              </caption>
              <thead>
                <tr className="text-xs text-arena-700 border-b-2 border-arena-300">
                  <th scope="col" className="text-left py-2 pr-2">#</th>
                  <th scope="col" className="text-left py-2 pr-2">{t3(locale, "Equipo", "Team")}</th>
                  <th scope="col" className="py-2 px-1" title={t3(locale, "Jugados", "Played")}>PJ</th>
                  <th scope="col" className="py-2 px-1" title={t3(locale, "Ganados", "Won")}>G</th>
                  <th scope="col" className="py-2 px-1" title={t3(locale, "Empatados", "Drawn")}>E</th>
                  <th scope="col" className="py-2 px-1" title={t3(locale, "Perdidos", "Lost")}>P</th>
                  <th scope="col" className="py-2 px-1" title={t3(locale, "Diferencia de goles", "Goal difference")}>DG</th>
                  <th scope="col" className="py-2 pl-1 font-bold" title={t3(locale, "Puntos", "Points")}>Pts</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((row, i) => (
                  <tr
                    key={row.team.es}
                    className={`border-b border-arena-100 ${
                      i < 2 ? "bg-jade-50" : ""
                    } ${row.team.es === "México" ? "font-bold" : ""}`}
                  >
                    <td className="py-2 pr-2 text-arena-700">{i + 1}</td>
                    <th scope="row" className="py-2 pr-2 text-left font-medium text-arena-900">
                      <span className="mr-1.5" aria-hidden="true">{flagFor(row.team.es)}</span>
                      {localize(row.team, locale)}
                    </th>
                    <td className="py-2 px-1 text-center tabular-nums text-arena-800">{row.played}</td>
                    <td className="py-2 px-1 text-center tabular-nums text-arena-800">{row.won}</td>
                    <td className="py-2 px-1 text-center tabular-nums text-arena-800">{row.drawn}</td>
                    <td className="py-2 px-1 text-center tabular-nums text-arena-800">{row.lost}</td>
                    <td className="py-2 px-1 text-center tabular-nums text-arena-800">
                      {row.goalDiff > 0 ? `+${row.goalDiff}` : row.goalDiff}
                    </td>
                    <td className="py-2 pl-1 text-center tabular-nums font-bold text-arena-900">{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-arena-700 mt-3">
              <span className="inline-block w-3 h-3 bg-jade-50 border border-jade-300 rounded-sm align-middle mr-1" />
              {t3(locale, "Clasifican a la siguiente ronda (1° y 2° lugar).", "Advance to the next round (1st & 2nd place).")}
            </p>
          </div>

          {/* Match results */}
          <div>
            <h3 className="font-display font-bold text-arena-800 mb-3">
              {t3(locale, "Partidos del grupo", "Group matches")}
            </h3>
            <div className="space-y-3">
              {matches.map((m) => (
                <MatchRow key={m.id} m={m} locale={locale} />
              ))}
            </div>
          </div>
        </div>

        {!anyPlayed && (
          <p className="text-center text-sm text-arena-700 mt-8 max-w-xl mx-auto">
            {t3(
              locale,
              "Los marcadores aparecerán aquí en cuanto se jueguen los partidos.",
              "Scores will appear here as soon as matches are played."
            )}
          </p>
        )}
      </div>
    </div>
  );
}

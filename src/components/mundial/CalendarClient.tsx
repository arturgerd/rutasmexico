"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { CalendarMatch } from "@/lib/data/mundial-calendar";
import { Locale } from "@/types/common";
import { localize, t3 } from "@/lib/utils";

const ROUND_LABELS: Record<string, { es: string; en: string; fr: string }> = {
  group: { es: "Fase de grupos", en: "Group stage", fr: "Phase de groupes" },
  "round-of-32": { es: "Ronda de 32", en: "Round of 32", fr: "32es" },
  "round-of-16": { es: "Octavos", en: "Round of 16", fr: "8es" },
  quarter: { es: "Cuartos", en: "Quarterfinals", fr: "Quarts" },
  semi: { es: "Semifinal", en: "Semifinal", fr: "Demi-finale" },
  "third-place": { es: "Tercer lugar", en: "Third place", fr: "Troisième place" },
  final: { es: "Final", en: "Final", fr: "Finale" },
};

const COUNTRY_FLAG: Record<string, string> = { MX: "🇲🇽", US: "🇺🇸", CA: "🇨🇦" };

const COUNTRY_STRIPE: Record<string, string> = {
  MX: "from-jade-500 via-white to-terracotta-500",
  US: "from-blue-700 via-white to-red-600",
  CA: "from-red-600 via-white to-red-600",
};

const GROUP_COLOR: Record<string, string> = {
  A: "bg-emerald-100 text-emerald-800",
  B: "bg-sky-100 text-sky-800",
  C: "bg-amber-100 text-amber-800",
  D: "bg-rose-100 text-rose-800",
  E: "bg-violet-100 text-violet-800",
  F: "bg-orange-100 text-orange-800",
  G: "bg-teal-100 text-teal-800",
  H: "bg-indigo-100 text-indigo-800",
  I: "bg-pink-100 text-pink-800",
  J: "bg-lime-100 text-lime-800",
  K: "bg-cyan-100 text-cyan-800",
  L: "bg-fuchsia-100 text-fuchsia-800",
};

function teamFlag(name: string): string {
  const n = name.toLowerCase();
  // TBD placeholders get a soccer ball instead of a white flag — feels less "missing data"
  if (/^(por definir|tbd|à définir)/i.test(name)) return "⚽";
  if (n.includes("méxico") || n.includes("mexico")) return "🇲🇽";
  if (n.includes("argentina")) return "🇦🇷";
  if (n.includes("brasil") || n.includes("brazil")) return "🇧🇷";
  if (n.includes("estados unidos") || n.includes("united states") || n.includes("usa")) return "🇺🇸";
  if (n.includes("canadá") || n.includes("canada")) return "🇨🇦";
  if (n.includes("españa") || n.includes("spain")) return "🇪🇸";
  if (n.includes("francia") || n.includes("france")) return "🇫🇷";
  if (n.includes("alemania") || n.includes("germany")) return "🇩🇪";
  if (n.includes("inglaterra") || n.includes("england")) return "🏴󠁧󠁢󠁥󠁮󠁧󠁿";
  if (n.includes("portugal")) return "🇵🇹";
  if (n.includes("uruguay")) return "🇺🇾";
  if (n.includes("colombia")) return "🇨🇴";
  if (n.includes("paraguay")) return "🇵🇾";
  if (n.includes("japón") || n.includes("japan")) return "🇯🇵";
  if (n.includes("corea") || n.includes("korea")) return "🇰🇷";
  if (n.includes("sudáfrica") || n.includes("south africa")) return "🇿🇦";
  if (n.includes("chequia") || n.includes("czech")) return "🇨🇿";
  if (n.includes("países bajos") || n.includes("netherlands")) return "🇳🇱";
  if (n.includes("bélgica") || n.includes("belgium")) return "🇧🇪";
  if (n.includes("croacia") || n.includes("croatia")) return "🇭🇷";
  if (n.includes("suiza") || n.includes("switzerland")) return "🇨🇭";
  if (n.includes("suecia") || n.includes("sweden")) return "🇸🇪";
  if (n.includes("noruega") || n.includes("norway")) return "🇳🇴";
  if (n.includes("marruecos") || n.includes("morocco")) return "🇲🇦";
  if (n.includes("senegal")) return "🇸🇳";
  if (n.includes("egipto") || n.includes("egypt")) return "🇪🇬";
  if (n.includes("ghana")) return "🇬🇭";
  if (n.includes("túnez") || n.includes("tunisia")) return "🇹🇳";
  if (n.includes("argelia") || n.includes("algeria")) return "🇩🇿";
  if (n.includes("ecuador")) return "🇪🇨";
  if (n.includes("australia")) return "🇦🇺";
  if (n.includes("arabia") || n.includes("saudi")) return "🇸🇦";
  if (n.includes("irán") || n.includes("iran")) return "🇮🇷";
  if (n.includes("irak") || n.includes("iraq")) return "🇮🇶";
  if (n.includes("jordania") || n.includes("jordan")) return "🇯🇴";
  if (n.includes("qatar")) return "🇶🇦";
  if (n.includes("uzbekistán") || n.includes("uzbekistan")) return "🇺🇿";
  if (n.includes("nueva zelanda") || n.includes("new zealand")) return "🇳🇿";
  if (n.includes("escocia") || n.includes("scotland")) return "🏴󠁧󠁢󠁳󠁣󠁴󠁿";
  if (n.includes("turquía") || n.includes("turkey")) return "🇹🇷";
  if (n.includes("austria")) return "🇦🇹";
  if (n.includes("panamá") || n.includes("panama")) return "🇵🇦";
  if (n.includes("haití") || n.includes("haiti")) return "🇭🇹";
  if (n.includes("congo")) return "🇨🇩";
  if (n.includes("costa de marfil") || n.includes("côte d'ivoire") || n.includes("ivoire")) return "🇨🇮";
  if (n.includes("curaçao")) return "🇨🇼";
  if (n.includes("cabo verde") || n.includes("cape verde")) return "🇨🇻";
  if (n.includes("bosnia")) return "🇧🇦";
  return "🏳️";
}

function fmtDate(iso: string, locale: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  const intlLocale = locale === "es" ? "es-MX" : locale === "fr" ? "fr-FR" : "en-US";
  return d.toLocaleDateString(intlLocale, { weekday: "short", day: "numeric", month: "short" });
}

interface Props {
  matches: CalendarMatch[];
}

export default function CalendarClient({ matches }: Props) {
  const locale = useLocale() as Locale;
  const [country, setCountry] = useState<"all" | "MX" | "US" | "CA">("all");
  const [round, setRound] = useState<string>("all");
  const [team, setTeam] = useState<string>("");
  const [mxOnly, setMxOnly] = useState(false);

  const teamOptions = useMemo(() => {
    const set = new Set<string>();
    matches.forEach((m) => {
      const a = m.teamA[locale] || m.teamA.es;
      const b = m.teamB[locale] || m.teamB.es;
      if (!/^(Por definir|TBD|À définir)/i.test(a)) set.add(a);
      if (!/^(Por definir|TBD|À définir)/i.test(b)) set.add(b);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, locale));
  }, [matches, locale]);

  const filtered = useMemo(() => {
    return matches.filter((m) => {
      if (country !== "all" && m.country !== country) return false;
      if (round !== "all" && m.round !== round) return false;
      if (mxOnly && !m.isMexicoGame) return false;
      if (team) {
        const a = m.teamA[locale] || m.teamA.es;
        const b = m.teamB[locale] || m.teamB.es;
        if (a !== team && b !== team) return false;
      }
      return true;
    });
  }, [matches, country, round, team, mxOnly, locale]);

  const grouped = useMemo(() => {
    const map = new Map<string, CalendarMatch[]>();
    filtered.forEach((m) => {
      if (!map.has(m.date)) map.set(m.date, []);
      map.get(m.date)!.push(m);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div>
      {/* Filtros */}
      <div className="bg-white rounded-2xl shadow-sm border border-arena-200 p-4 md:p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-arena-600 uppercase mb-1">
              {t3(locale, "País sede", "Host country", "Pays hôte")}
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value as typeof country)}
              className="w-full rounded-lg border border-arena-300 bg-white px-3 py-2 text-sm"
            >
              <option value="all">{t3(locale, "Todos", "All", "Tous")}</option>
              <option value="MX">🇲🇽 México</option>
              <option value="US">🇺🇸 {t3(locale, "Estados Unidos", "United States", "États-Unis")}</option>
              <option value="CA">🇨🇦 {t3(locale, "Canadá", "Canada", "Canada")}</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-arena-600 uppercase mb-1">
              {t3(locale, "Ronda", "Round", "Tour")}
            </label>
            <select
              value={round}
              onChange={(e) => setRound(e.target.value)}
              className="w-full rounded-lg border border-arena-300 bg-white px-3 py-2 text-sm"
            >
              <option value="all">{t3(locale, "Todas", "All", "Toutes")}</option>
              {Object.entries(ROUND_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label[locale] || label.es}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-arena-600 uppercase mb-1">
              {t3(locale, "Equipo", "Team", "Équipe")}
            </label>
            <select
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="w-full rounded-lg border border-arena-300 bg-white px-3 py-2 text-sm"
            >
              <option value="">{t3(locale, "Todos los equipos", "All teams", "Toutes les équipes")}</option>
              {teamOptions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={mxOnly}
                onChange={(e) => setMxOnly(e.target.checked)}
                className="w-4 h-4 accent-jade-600"
              />
              <span className="text-sm text-arena-700 font-medium">
                🇲🇽 {t3(locale, "Solo partidos de México", "Mexico games only", "Matchs du Mexique seulement")}
              </span>
            </label>
          </div>
        </div>
        <div className="mt-3 text-xs text-arena-500">
          {t3(locale, "Mostrando", "Showing", "Affichage")} <strong>{filtered.length}</strong> {t3(locale, "de", "of", "de")} {matches.length} {t3(locale, "partidos", "matches", "matchs")}
        </div>
      </div>

      {/* Lista por fecha */}
      {grouped.length === 0 && (
        <div className="text-center py-12 text-arena-500">
          {t3(locale, "Sin resultados con esos filtros.", "No matches with those filters.", "Aucun match avec ces filtres.")}
        </div>
      )}
      <div className="space-y-6">
        {grouped.map(([date, dayMatches]) => {
          const dayCountries = Array.from(new Set(dayMatches.map((m) => m.country)));
          return (
          <div key={date}>
            <h3 className="font-display text-lg font-bold text-arena-800 mb-3 sticky top-0 bg-arena-50/95 backdrop-blur py-2 z-10 border-b border-arena-200 flex items-center gap-2 flex-wrap">
              <span>📅 {fmtDate(date, locale)}</span>
              <span className="text-arena-700 text-sm font-normal">({date})</span>
              <span className="ml-auto text-base flex items-center gap-1">
                {dayCountries.map((c) => <span key={c} title={c}>{COUNTRY_FLAG[c]}</span>)}
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dayMatches.map((m, i) => {
                const teamA = m.teamA[locale] || m.teamA.es;
                const teamB = m.teamB[locale] || m.teamB.es;
                const venueLabel = localize(m.venueName, locale);
                const roundLabel = ROUND_LABELS[m.round]?.[locale] || ROUND_LABELS[m.round]?.es || m.round;
                return (
                  <Link
                    key={`${m.venueId}-${date}-${m.time}-${i}`}
                    href={`/${locale}/mundial/${m.venueSlug}`}
                    className={`bg-white rounded-xl border ${m.isMexicoGame ? "border-jade-400 ring-2 ring-jade-200" : "border-arena-200"} overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all`}
                  >
                    <div className={`h-1.5 bg-gradient-to-r ${COUNTRY_STRIPE[m.country]}`} />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2 gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          {m.isMexicoGame && <span className="text-xs">🇲🇽</span>}
                          <span className="text-xs font-bold uppercase text-arena-500 truncate">{roundLabel}</span>
                          {m.group && (
                            <span className={`text-xs font-bold rounded px-1.5 py-0.5 ${GROUP_COLOR[m.group] || "bg-arena-100 text-arena-700"}`}>
                              {m.group}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-arena-700 bg-arena-100 rounded px-2 py-0.5 whitespace-nowrap">
                          ⏰ {m.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3 my-3">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-3xl">{teamFlag(teamA)}</span>
                          <span className="font-bold text-arena-800 truncate">{teamA}</span>
                        </div>
                        {typeof m.scoreA === "number" && typeof m.scoreB === "number" ? (
                          <span className="font-mono text-base font-bold text-arena-900 bg-arena-100 rounded px-2 py-0.5 whitespace-nowrap">
                            {m.scoreA} - {m.scoreB}
                          </span>
                        ) : (
                          <span className="text-arena-700 font-bold text-sm">vs</span>
                        )}
                        <div className="flex items-center gap-2 flex-1 min-w-0 justify-end text-right">
                          <span className="font-bold text-arena-800 truncate">{teamB}</span>
                          <span className="text-3xl">{teamFlag(teamB)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-arena-500 flex items-center justify-between border-t border-arena-100 pt-2">
                        <span className="flex items-center gap-1">
                          <span className="text-base">{COUNTRY_FLAG[m.country]}</span>
                          <span className="truncate">{m.stadiumName}</span>
                        </span>
                        <span className="text-arena-700 truncate ml-2">{venueLabel.split(" - ")[0]}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}

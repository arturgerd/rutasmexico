import { MundialVenue, MundialMatch } from "@/types/mundial";
import { LocalizedString, Locale } from "@/types/common";
import { localize } from "@/lib/utils";

const BASE_URL = "https://rutasmexico.com.mx";
const TOURNAMENT_NAME: Record<string, string> = {
  es: "Copa Mundial de la FIFA 2026",
  en: "FIFA World Cup 2026",
  fr: "Coupe du Monde de la FIFA 2026",
};
const TOURNAMENT_START = "2026-06-11";
const TOURNAMENT_END = "2026-07-19";

function roundLabel(round: MundialMatch["round"], locale: string): string {
  const labels: Record<string, Record<string, string>> = {
    group: { es: "Fase de grupos", en: "Group stage", fr: "Phase de groupes" },
    "round-of-32": { es: "Ronda de 32", en: "Round of 32", fr: "32es de finale" },
    "round-of-16": { es: "Octavos de final", en: "Round of 16", fr: "8es de finale" },
    quarter: { es: "Cuartos de final", en: "Quarterfinals", fr: "Quarts de finale" },
    semi: { es: "Semifinal", en: "Semifinal", fr: "Demi-finale" },
    final: { es: "Final", en: "Final", fr: "Finale" },
  };
  return labels[round]?.[locale] || labels[round]?.es || round;
}

function teamName(team: LocalizedString, locale: string): string {
  const l = locale as Locale;
  return team[l] || team.es;
}

function tournamentSuperEvent(locale: string) {
  return {
    "@type": "SportsEvent",
    name: TOURNAMENT_NAME[locale] || TOURNAMENT_NAME.es,
    startDate: TOURNAMENT_START,
    endDate: TOURNAMENT_END,
    organizer: { "@type": "SportsOrganization", name: "FIFA", url: "https://www.fifa.com" },
  };
}

export function buildMatchSportsEvent(
  venue: MundialVenue,
  match: MundialMatch,
  locale: string,
  venueUrl: string
) {
  const teamA = teamName(match.teamA, locale);
  const teamB = teamName(match.teamB, locale);
  const round = roundLabel(match.round, locale);
  const venueName = localize(venue.name, locale as Locale);
  const name = `${teamA} vs ${teamB} - ${round} - ${TOURNAMENT_NAME[locale] || TOURNAMENT_NAME.es}`;

  const competitors = [teamA, teamB]
    .filter((t) => !/^(Por definir|TBD|À définir)/i.test(t))
    .map((t) => ({ "@type": "SportsTeam", name: t }));

  const address = localize(venue.stadium.address, locale as Locale);

  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name,
    description: `${round} — ${venue.stadium.name}, ${venueName}`,
    startDate: `${match.date}T${match.time}:00`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    sport: "Soccer",
    location: {
      "@type": "StadiumOrArena",
      name: venue.stadium.name,
      address,
      url: venueUrl,
      maximumAttendeeCapacity: venue.stadium.capacity,
    },
    ...(competitors.length > 0 && { competitor: competitors }),
    superEvent: tournamentSuperEvent(locale),
    organizer: { "@type": "SportsOrganization", name: "FIFA", url: "https://www.fifa.com" },
  };
}

export function buildVenueMatchesSchema(venue: MundialVenue, locale: string) {
  const venueUrl = `${BASE_URL}/${locale}/mundial/${venue.slug}`;
  return venue.matches.map((m) => buildMatchSportsEvent(venue, m, locale, venueUrl));
}

export function buildTournamentSchema(venues: MundialVenue[], locale: string) {
  const subEvents = venues.flatMap((v) => {
    const venueUrl = `${BASE_URL}/${locale}/mundial/${v.slug}`;
    return v.matches.map((m) => buildMatchSportsEvent(v, m, locale, venueUrl));
  });

  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: TOURNAMENT_NAME[locale] || TOURNAMENT_NAME.es,
    description:
      locale === "es"
        ? "La Copa Mundial de la FIFA 2026 se disputará en 16 sedes de México, Estados Unidos y Canadá del 11 de junio al 19 de julio de 2026. México albergará el partido inaugural en el Estadio Azteca."
        : locale === "fr"
          ? "La Coupe du Monde de la FIFA 2026 se déroulera dans 16 stades au Mexique, aux États-Unis et au Canada du 11 juin au 19 juillet 2026. Le match d'ouverture aura lieu au Estadio Azteca."
          : "The FIFA World Cup 2026 will be held across 16 venues in Mexico, the United States and Canada from June 11 to July 19, 2026. Mexico will host the opening match at Estadio Azteca.",
    startDate: TOURNAMENT_START,
    endDate: TOURNAMENT_END,
    url: `${BASE_URL}/${locale}/mundial`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    sport: "Soccer",
    organizer: { "@type": "SportsOrganization", name: "FIFA", url: "https://www.fifa.com" },
    location: venues.map((v) => ({
      "@type": "StadiumOrArena",
      name: v.stadium.name,
      address: localize(v.stadium.address, locale as Locale),
      maximumAttendeeCapacity: v.stadium.capacity,
      url: `${BASE_URL}/${locale}/mundial/${v.slug}`,
    })),
    subEvent: subEvents,
  };
}

export function buildBreadcrumbList(
  locale: string,
  trail: Array<{ name: string; url?: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      ...(t.url ? { item: t.url } : {}),
    })),
  };
}

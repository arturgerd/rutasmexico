/**
 * One-shot: fill mundial-venues.json with real teams + scores for confirmed
 * fixtures (cross-referenced against FIFA / Wikipedia / ESPN on 2026-06-28).
 *
 * - Group stage: only the 16 slots whose (date + stadium) actually correspond
 *   to a real FIFA fixture are filled (the file has ~20 phantom slots whose
 *   dates don't match any real match; those stay TBD pending separate audit).
 * - Round of 32: all 16 pairings filled per FIFA bracket template applied to
 *   our simulated group standings (best-3rd qualifiers happen to coincide
 *   with the template's B/D/E/F/I/J/K/L slots — no ambiguity).
 *
 * Scores are pulled from mundial-results.json by matching on
 * (group, unordered team pair) regardless of date / venue — the venues file
 * and results file were built with different schedules and date matching
 * fails for most. Team identity is reliable.
 */
const fs = require("fs");
const path = require("path");

const VENUES = path.join(__dirname, "..", "src", "data", "mundial-venues.json");
const RESULTS = path.join(__dirname, "..", "src", "data", "mundial-results.json");

const T = {
  "Estados Unidos": { es: "Estados Unidos", en: "United States" },
  "Paraguay": { es: "Paraguay", en: "Paraguay" },
  "Haití": { es: "Haití", en: "Haiti" },
  "Escocia": { es: "Escocia", en: "Scotland" },
  "Brasil": { es: "Brasil", en: "Brazil" },
  "Marruecos": { es: "Marruecos", en: "Morocco" },
  "Costa de Marfil": { es: "Costa de Marfil", en: "Ivory Coast" },
  "Ecuador": { es: "Ecuador", en: "Ecuador" },
  "Países Bajos": { es: "Países Bajos", en: "Netherlands" },
  "Japón": { es: "Japón", en: "Japan" },
  "España": { es: "España", en: "Spain" },
  "Cabo Verde": { es: "Cabo Verde", en: "Cape Verde" },
  "Arabia Saudita": { es: "Arabia Saudita", en: "Saudi Arabia" },
  "Uruguay": { es: "Uruguay", en: "Uruguay" },
  "Argentina": { es: "Argentina", en: "Argentina" },
  "Argelia": { es: "Argelia", en: "Algeria" },
  "Canadá": { es: "Canadá", en: "Canada" },
  "Catar": { es: "Catar", en: "Qatar" },
  "Suiza": { es: "Suiza", en: "Switzerland" },
  "Bosnia y Herzegovina": { es: "Bosnia y Herzegovina", en: "Bosnia and Herzegovina" },
  "Túnez": { es: "Túnez", en: "Tunisia" },
  "Austria": { es: "Austria", en: "Austria" },
  "Alemania": { es: "Alemania", en: "Germany" },
  "Senegal": { es: "Senegal", en: "Senegal" },
  "Irak": { es: "Irak", en: "Iraq" },
  "Suecia": { es: "Suecia", en: "Sweden" },
  "México": { es: "México", en: "Mexico" },
  "Sudáfrica": { es: "Sudáfrica", en: "South Africa" },
  "Corea del Sur": { es: "Corea del Sur", en: "South Korea" },
  "Chequia": { es: "Chequia", en: "Czechia" },
  "Francia": { es: "Francia", en: "France" },
  "Noruega": { es: "Noruega", en: "Norway" },
  "Inglaterra": { es: "Inglaterra", en: "England" },
  "RD Congo": { es: "RD Congo", en: "DR Congo" },
  "Bélgica": { es: "Bélgica", en: "Belgium" },
  "Portugal": { es: "Portugal", en: "Portugal" },
  "Croacia": { es: "Croacia", en: "Croatia" },
  "Colombia": { es: "Colombia", en: "Colombia" },
  "Ghana": { es: "Ghana", en: "Ghana" },
  "Australia": { es: "Australia", en: "Australia" },
  "Egipto": { es: "Egipto", en: "Egypt" },
};

// Group-stage fills: (venueSlug, date, time) -> { group, teamA, teamB }
const GROUP_FILLS = [
  { slug: "los-angeles", date: "2026-06-12", time: "13:00", group: "D", a: "Estados Unidos", b: "Paraguay" },
  { slug: "boston", date: "2026-06-13", time: "13:00", group: "C", a: "Haití", b: "Escocia" },
  { slug: "nueva-york-nueva-jersey", date: "2026-06-13", time: "16:00", group: "C", a: "Brasil", b: "Marruecos" },
  { slug: "philadelphia", date: "2026-06-14", time: "16:00", group: "E", a: "Costa de Marfil", b: "Ecuador" },
  { slug: "dallas", date: "2026-06-14", time: "19:00", group: "F", a: "Países Bajos", b: "Japón" },
  { slug: "atlanta", date: "2026-06-15", time: "16:00", group: "H", a: "España", b: "Cabo Verde" },
  { slug: "miami", date: "2026-06-15", time: "19:00", group: "H", a: "Arabia Saudita", b: "Uruguay" },
  { slug: "kansas-city", date: "2026-06-16", time: "16:00", group: "J", a: "Argentina", b: "Argelia" },
  { slug: "vancouver", date: "2026-06-18", time: "15:00", group: "B", a: "Canadá", b: "Catar" },
  { slug: "los-angeles", date: "2026-06-18", time: "16:00", group: "B", a: "Suiza", b: "Bosnia y Herzegovina" },
  { slug: "boston", date: "2026-06-19", time: "16:00", group: "C", a: "Escocia", b: "Marruecos" },
  { slug: "monterrey", date: "2026-06-20", time: "16:00", group: "F", a: "Túnez", b: "Japón" },
  { slug: "miami", date: "2026-06-21", time: "13:00", group: "H", a: "Uruguay", b: "Cabo Verde" },
  { slug: "dallas", date: "2026-06-22", time: "13:00", group: "J", a: "Argentina", b: "Austria" },
  { slug: "nueva-york-nueva-jersey", date: "2026-06-25", time: "19:00", group: "E", a: "Ecuador", b: "Alemania" },
  { slug: "toronto", date: "2026-06-26", time: "15:00", group: "I", a: "Senegal", b: "Irak" },
];

// Round-of-32 bracket: (venueSlug, date) -> teamA, teamB.
// Pairings from FIFA template + simulated standings (M79 México-Ecuador already in file).
const KO_FILLS = [
  { slug: "los-angeles", date: "2026-06-28", round: "round-of-32", a: "Sudáfrica", b: "Canadá" },         // M73 2A vs 2B
  { slug: "boston",      date: "2026-06-29", round: "round-of-32", a: "Alemania", b: "Paraguay" },        // M74 1E vs 3D
  { slug: "monterrey",   date: "2026-06-29", round: "round-of-32", a: "Países Bajos", b: "Marruecos" },   // M75 1F vs 2C
  { slug: "houston",     date: "2026-06-29", round: "round-of-32", a: "Brasil", b: "Japón" },             // M76 1C vs 2F
  { slug: "nueva-york-nueva-jersey", date: "2026-06-30", round: "round-of-32", a: "Francia", b: "Suecia" }, // M77 1I vs 3F  (Suecia from results)
  { slug: "dallas",      date: "2026-06-30", round: "round-of-32", a: "Costa de Marfil", b: "Noruega" },  // M78 2E vs 2I
  // M79: México vs Ecuador — already in file
  { slug: "atlanta",     date: "2026-07-01", round: "round-of-32", a: "Inglaterra", b: "RD Congo" },      // M80 1L vs 3K
  { slug: "san-francisco-bay", date: "2026-07-01", round: "round-of-32", a: "Estados Unidos", b: "Bosnia y Herzegovina" }, // M81 1D vs 3B
  { slug: "seattle",     date: "2026-07-01", round: "round-of-32", a: "Bélgica", b: "Senegal" },          // M82 1G vs 3I
  { slug: "toronto",     date: "2026-07-02", round: "round-of-32", a: "Portugal", b: "Croacia" },         // M83 2K vs 2L
  { slug: "los-angeles", date: "2026-07-02", round: "round-of-32", a: "España", b: "Austria" },           // M84 1H vs 2J
  { slug: "vancouver",   date: "2026-07-02", round: "round-of-32", a: "Suiza", b: "Argelia" },            // M85 1B vs 3J
  { slug: "miami",       date: "2026-07-03", round: "round-of-32", a: "Argentina", b: "Cabo Verde" },     // M86 1J vs 2H
  { slug: "kansas-city", date: "2026-07-03", round: "round-of-32", a: "Colombia", b: "Ghana" },           // M87 1K vs 3L
  { slug: "dallas",      date: "2026-07-03", round: "round-of-32", a: "Australia", b: "Egipto" },         // M88 2D vs 2G
];

// Helper: from team es name, get LocalizedString block (preserving zh when known)
function teamObj(esName) {
  const base = T[esName];
  if (!base) throw new Error("unknown team: " + esName);
  return { ...base };
}

// Build score lookup: results indexed by `${group}|${sortedPairKey}` -> {scoreA, scoreB, teamAEs, teamBEs}
function buildScoreIndex(results) {
  const idx = {};
  for (const r of results) {
    if (r.scoreA == null || r.scoreB == null) continue;
    const key = r.group + "|" + [r.teamA.es, r.teamB.es].sort().join("|");
    idx[key] = { teamAEs: r.teamA.es, scoreA: r.scoreA, teamBEs: r.teamB.es, scoreB: r.scoreB };
  }
  return idx;
}

function scoreFor(group, aEs, bEs, scoreIdx) {
  const key = group + "|" + [aEs, bEs].sort().join("|");
  const hit = scoreIdx[key];
  if (!hit) return null;
  // Reorient score to match the fill's team order
  if (hit.teamAEs === aEs) return { scoreA: hit.scoreA, scoreB: hit.scoreB };
  return { scoreA: hit.scoreB, scoreB: hit.scoreA };
}

// === Apply ===
const venues = JSON.parse(fs.readFileSync(VENUES, "utf8"));
const results = JSON.parse(fs.readFileSync(RESULTS, "utf8"));
const scoreIdx = buildScoreIndex(results);

const venueBySlug = Object.fromEntries(venues.map(v => [v.slug, v]));

let groupApplied = 0, groupMissing = 0;
let scoresAdded = 0, scoresMissing = 0;
for (const f of GROUP_FILLS) {
  const venue = venueBySlug[f.slug];
  if (!venue) { console.error("no venue:", f.slug); groupMissing++; continue; }
  const m = venue.matches.find(x =>
    x.round === "group" && x.date === f.date && x.time === f.time
  );
  if (!m) { console.error("no slot:", f.slug, f.date, f.time); groupMissing++; continue; }
  m.teamA = teamObj(f.a);
  m.teamB = teamObj(f.b);
  m.group = f.group;
  m.isMexicoGame = (f.a === "México" || f.b === "México");
  const sc = scoreFor(f.group, f.a, f.b, scoreIdx);
  if (sc) {
    m.scoreA = sc.scoreA;
    m.scoreB = sc.scoreB;
    scoresAdded++;
  } else {
    scoresMissing++;
    console.log("no score for:", f.group, f.a, "vs", f.b);
  }
  groupApplied++;
}

// Sweep: for ANY group match in venues with real teams + group, attach score from results
let sweepScores = 0;
for (const venue of venues) {
  for (const m of venue.matches) {
    if (m.round !== "group") continue;
    if (!m.group) continue;
    if (m.teamA.es.includes("Por definir") || m.teamB.es.includes("Por definir")) continue;
    if (typeof m.scoreA === "number") continue;
    const sc = scoreFor(m.group, m.teamA.es, m.teamB.es, scoreIdx);
    if (sc) {
      m.scoreA = sc.scoreA;
      m.scoreB = sc.scoreB;
      sweepScores++;
    }
  }
}
console.log(`sweep: ${sweepScores} extra scores added to previously-filled games`);

let koApplied = 0, koMissing = 0;
for (const f of KO_FILLS) {
  const venue = venueBySlug[f.slug];
  if (!venue) { console.error("no venue:", f.slug); koMissing++; continue; }
  const m = venue.matches.find(x =>
    x.round === f.round && x.date === f.date
  );
  if (!m) { console.error("no KO slot:", f.slug, f.date); koMissing++; continue; }
  m.teamA = teamObj(f.a);
  m.teamB = teamObj(f.b);
  m.isMexicoGame = (f.a === "México" || f.b === "México");
  koApplied++;
}

fs.writeFileSync(VENUES, JSON.stringify(venues, null, 2) + "\n", "utf8");
console.log(`group: ${groupApplied} applied, ${groupMissing} missing`);
console.log(`scores: ${scoresAdded} added, ${scoresMissing} no match in results`);
console.log(`KO: ${koApplied} applied, ${koMissing} missing`);

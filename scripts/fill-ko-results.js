// One-shot: fill the knockout results played through 2026-07-07 into
// mundial-venues.json (round of 32 + round of 16), and set the quarterfinal
// matchups (teams known, no scores yet). Every score was verified against at
// least two independent sources (Wikipedia knockout-stage page, ESPN/FIFA
// match reports, CBS/Yahoo/Al Jazeera/Sky live coverage) on 2026-07-08.
// Run via `node scripts/fill-ko-results.js`. Idempotent: matching is by
// venueSlug + date + round, and it overwrites teams/scores on those entries.
const fs = require("fs");
const path = require("path");

const JSON_PATH = path.join(__dirname, "..", "src", "data", "mundial-venues.json");

const T = {
  mex: { es: "México", en: "Mexico", fr: "Mexique" },
  rsa: { es: "Sudáfrica", en: "South Africa", fr: "Afrique du Sud" },
  can: { es: "Canadá", en: "Canada", fr: "Canada" },
  ger: { es: "Alemania", en: "Germany", fr: "Allemagne" },
  par: { es: "Paraguay", en: "Paraguay", fr: "Paraguay" },
  bra: { es: "Brasil", en: "Brazil", fr: "Brésil" },
  jpn: { es: "Japón", en: "Japan", fr: "Japon" },
  ned: { es: "Países Bajos", en: "Netherlands", fr: "Pays-Bas" },
  mar: { es: "Marruecos", en: "Morocco", fr: "Maroc" },
  ecu: { es: "Ecuador", en: "Ecuador", fr: "Équateur" },
  fra: { es: "Francia", en: "France", fr: "France" },
  swe: { es: "Suecia", en: "Sweden", fr: "Suède" },
  civ: { es: "Costa de Marfil", en: "Ivory Coast", fr: "Côte d'Ivoire" },
  nor: { es: "Noruega", en: "Norway", fr: "Norvège" },
  eng: { es: "Inglaterra", en: "England", fr: "Angleterre" },
  cod: { es: "RD del Congo", en: "DR Congo", fr: "RD Congo" },
  bel: { es: "Bélgica", en: "Belgium", fr: "Belgique" },
  sen: { es: "Senegal", en: "Senegal", fr: "Sénégal" },
  usa: { es: "Estados Unidos", en: "United States", fr: "États-Unis" },
  bih: { es: "Bosnia y Herzegovina", en: "Bosnia and Herzegovina", fr: "Bosnie-Herzégovine" },
  esp: { es: "España", en: "Spain", fr: "Espagne" },
  aut: { es: "Austria", en: "Austria", fr: "Autriche" },
  por: { es: "Portugal", en: "Portugal", fr: "Portugal" },
  cro: { es: "Croacia", en: "Croatia", fr: "Croatie" },
  sui: { es: "Suiza", en: "Switzerland", fr: "Suisse" },
  alg: { es: "Argelia", en: "Algeria", fr: "Algérie" },
  aus: { es: "Australia", en: "Australia", fr: "Australie" },
  egy: { es: "Egipto", en: "Egypt", fr: "Égypte" },
  arg: { es: "Argentina", en: "Argentina", fr: "Argentine" },
  cpv: { es: "Cabo Verde", en: "Cape Verde", fr: "Cap-Vert" },
  col: { es: "Colombia", en: "Colombia", fr: "Colombie" },
  gha: { es: "Ghana", en: "Ghana", fr: "Ghana" },
};

// venueSlug | date | round | teamA | teamB | scoreA | scoreB | flags
const RESULTS = [
  // ---- Round of 32 (Jun 28 – Jul 3) ----
  ["los-angeles", "2026-06-28", "round-of-32", T.rsa, T.can, 0, 1],
  ["boston", "2026-06-29", "round-of-32", T.ger, T.par, 1, 1, { aet: true, pensA: 3, pensB: 4 }],
  ["houston", "2026-06-29", "round-of-32", T.bra, T.jpn, 2, 1],
  ["monterrey", "2026-06-29", "round-of-32", T.ned, T.mar, 1, 1, { aet: true, pensA: 2, pensB: 3 }],
  ["ciudad-de-mexico", "2026-06-30", "round-of-32", T.mex, T.ecu, 2, 0, { mx: true }],
  ["nueva-york-nueva-jersey", "2026-06-30", "round-of-32", T.fra, T.swe, 3, 0],
  ["dallas", "2026-06-30", "round-of-32", T.civ, T.nor, 1, 2],
  ["atlanta", "2026-07-01", "round-of-32", T.eng, T.cod, 2, 1],
  ["seattle", "2026-07-01", "round-of-32", T.bel, T.sen, 3, 2, { aet: true }],
  ["san-francisco-bay", "2026-07-01", "round-of-32", T.usa, T.bih, 2, 0],
  ["los-angeles", "2026-07-02", "round-of-32", T.esp, T.aut, 3, 0],
  ["toronto", "2026-07-02", "round-of-32", T.por, T.cro, 2, 1],
  ["vancouver", "2026-07-02", "round-of-32", T.sui, T.alg, 2, 0],
  ["dallas", "2026-07-03", "round-of-32", T.aus, T.egy, 1, 1, { aet: true, pensA: 2, pensB: 4 }],
  ["miami", "2026-07-03", "round-of-32", T.arg, T.cpv, 3, 2, { aet: true }],
  ["kansas-city", "2026-07-03", "round-of-32", T.col, T.gha, 1, 0],

  // ---- Round of 16 (Jul 4 – Jul 7) ----
  ["houston", "2026-07-04", "round-of-16", T.can, T.mar, 0, 3],
  ["philadelphia", "2026-07-04", "round-of-16", T.par, T.fra, 0, 1],
  ["ciudad-de-mexico", "2026-07-05", "round-of-16", T.mex, T.eng, 2, 3, { mx: true }],
  ["nueva-york-nueva-jersey", "2026-07-05", "round-of-16", T.bra, T.nor, 1, 2],
  ["dallas", "2026-07-06", "round-of-16", T.por, T.esp, 0, 1],
  ["seattle", "2026-07-06", "round-of-16", T.usa, T.bel, 1, 4],
  ["atlanta", "2026-07-07", "round-of-16", T.arg, T.egy, 3, 2],
  ["vancouver", "2026-07-07", "round-of-16", T.sui, T.col, 0, 0, { aet: true, pensA: 4, pensB: 3 }],

  // ---- Quarterfinals (Jul 9 – Jul 11): matchups known, not yet played ----
  ["boston", "2026-07-09", "quarter", T.fra, T.mar, null, null],
  ["los-angeles", "2026-07-10", "quarter", T.esp, T.bel, null, null],
  ["miami", "2026-07-11", "quarter", T.eng, T.nor, null, null],
  ["kansas-city", "2026-07-11", "quarter", T.arg, T.sui, null, null],
];

const data = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
let updated = 0;
const misses = [];

for (const [slug, date, round, teamA, teamB, scoreA, scoreB, flags = {}] of RESULTS) {
  const venue = data.find((v) => v.slug === slug);
  const match = venue?.matches.find((m) => m.date === date && m.round === round);
  if (!match) {
    misses.push(`${slug} ${date} ${round}`);
    continue;
  }
  match.teamA = teamA;
  match.teamB = teamB;
  if (scoreA !== null) {
    match.scoreA = scoreA;
    match.scoreB = scoreB;
    if (flags.aet) match.aet = true;
    if (flags.pensA !== undefined) {
      match.penaltiesA = flags.pensA;
      match.penaltiesB = flags.pensB;
    }
  }
  if (flags.mx) match.isMexicoGame = true;
  updated++;
}

if (misses.length) {
  console.error("No slot found for:", misses);
  process.exit(1);
}

fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(`Updated ${updated}/${RESULTS.length} knockout entries.`);

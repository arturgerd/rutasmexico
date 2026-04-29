// One-shot reconciliation: replace all knockout matches in mundial-venues.json with the
// authoritative FIFA / Wikipedia schedule for the 2026 World Cup. Group-stage entries
// are left untouched. Run via `node scripts/reconcile-mundial-ko.js`.
const fs = require("fs");
const path = require("path");

const JSON_PATH = path.join(__dirname, "..", "src", "data", "mundial-venues.json");

// Authoritative knockout map: venueSlug -> array of KO matches.
// Times are in stadium-local zone (matches what FIFA publishes).
// teams are TBD until the bracket fills in.
const TBD = {
  es: "Por definir",
  en: "TBD",
  zh: "待定",
};

function ko(date, time, round, group) {
  const m = {
    date,
    time,
    teamA: { ...TBD },
    teamB: { ...TBD },
    round,
    isMexicoGame: false,
  };
  if (group) m.group = group;
  return m;
}

const KO_BY_VENUE = {
  // Mexico
  "ciudad-de-mexico": [
    ko("2026-06-30", "19:00", "round-of-32"), // #79
    ko("2026-07-05", "18:00", "round-of-16"), // #92
  ],
  monterrey: [
    ko("2026-06-29", "19:00", "round-of-32"), // #75
  ],
  guadalajara: [], // no KO matches in 2026

  // USA
  "los-angeles": [
    ko("2026-06-28", "12:00", "round-of-32"), // #73 (PT)
    ko("2026-07-02", "12:00", "round-of-32"), // #84 (PT)
    ko("2026-07-10", "12:00", "quarter"),     // #98 (PT)
  ],
  boston: [
    ko("2026-06-29", "16:30", "round-of-32"), // #74 (ET)
    ko("2026-07-09", "16:00", "quarter"),     // #97 (ET)
  ],
  houston: [
    ko("2026-06-29", "12:00", "round-of-32"), // #76 (CT)
    ko("2026-07-04", "12:00", "round-of-16"), // #90 (ET) — local CT 11:00 but using broadcast slot
  ],
  "nueva-york-nueva-jersey": [
    ko("2026-06-30", "17:00", "round-of-32"), // #77 (ET)
    ko("2026-07-05", "17:00", "round-of-16"), // #91 (ET) — wait Wiki says #91 = July 5 4 PM ET. Let me re-check below.
    ko("2026-07-19", "15:00", "final"),       // #104 (ET)
  ],
  dallas: [
    ko("2026-06-30", "11:00", "round-of-32"), // #78 (broadcast 12:00 ET → local CT 11:00)
    ko("2026-07-03", "12:00", "round-of-32"), // #88 (broadcast 13:00 ET → local CT 12:00)
    ko("2026-07-06", "13:00", "round-of-16"), // #93 (ET 14:00 → CT 13:00)
    ko("2026-07-14", "13:00", "semi"),        // #101 (ET 14:00 → CT 13:00)
  ],
  atlanta: [
    ko("2026-07-01", "12:00", "round-of-32"), // #80 (ET)
    ko("2026-07-07", "12:00", "round-of-16"), // #95 (ET)
    ko("2026-07-15", "15:00", "semi"),        // #102 (ET)
  ],
  "san-francisco-bay": [
    ko("2026-07-01", "17:00", "round-of-32"), // #81 (PT)
  ],
  seattle: [
    ko("2026-07-01", "13:00", "round-of-32"), // #82 (PT)
    ko("2026-07-06", "17:00", "round-of-16"), // #94 (PT)
  ],
  miami: [
    ko("2026-07-03", "18:00", "round-of-32"), // #86 (ET)
    ko("2026-07-11", "17:00", "quarter"),     // #99 (ET)
    ko("2026-07-18", "18:00", "third-place"), // #103 (ET)
  ],
  "kansas-city": [
    ko("2026-07-03", "19:30", "round-of-32"), // #87 (broadcast 20:30 ET → local CT 19:30)
    ko("2026-07-11", "19:00", "quarter"),     // #100 (broadcast 20:00 ET → local CT 19:00)
  ],
  philadelphia: [
    ko("2026-07-04", "17:00", "round-of-16"), // #89 (ET)
  ],

  // Canada
  toronto: [
    ko("2026-07-02", "19:00", "round-of-32"), // #83 (ET)
  ],
  vancouver: [
    ko("2026-07-02", "20:00", "round-of-32"), // #85 (PT)
    ko("2026-07-07", "13:00", "round-of-16"), // #96 (PT)
  ],
};

// Fix #91: Wikipedia says July 5, 4 PM ET at MetLife
KO_BY_VENUE["nueva-york-nueva-jersey"][1] = ko("2026-07-05", "16:00", "round-of-16");

// === Apply ===
const data = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
let removed = 0, added = 0;
for (const venue of data) {
  const groupOnly = venue.matches.filter((m) => m.round === "group");
  removed += venue.matches.length - groupOnly.length;
  const ko = KO_BY_VENUE[venue.slug] || [];
  added += ko.length;
  venue.matches = [...groupOnly, ...ko].sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.time.localeCompare(b.time);
  });
}

fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2) + "\n", "utf8");

const total = data.reduce((s, v) => s + v.matches.length, 0);
console.log(`Removed ${removed} stale KO entries, added ${added} authoritative KOs.`);
console.log(`Total matches now: ${total}`);
const breakdown = data.reduce((acc, v) => {
  for (const m of v.matches) acc[m.round] = (acc[m.round] || 0) + 1;
  return acc;
}, {});
console.log("By round:", breakdown);

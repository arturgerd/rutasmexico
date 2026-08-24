/**
 * Genera el catálogo de camiones urbanos de Cancún a partir del proyecto "Alza"
 * (C:/Users/Comisionado/Desktop/rutas cancun).
 *
 * Qué entra y qué NO entra, y por qué:
 *
 *  - Códigos, letreros, tarifas, operadores y paradas son HECHOS de un servicio
 *    público. Se usan citando la fuente. Lo que NO se copia es la prosa del
 *    cliente web de rutascancun.com (el archivo public-copy.json del proyecto
 *    origen sale de descompilar su bundle): esa redacción es suya, no nuestra.
 *    Aquí las descripciones se reescriben y se traducen a EN.
 *  - El simulador de unidades en movimiento del proyecto origen se descarta
 *    entero. Son posiciones inventadas; pintarlas sobre un mapa real las hace
 *    parecer GPS en vivo.
 *  - Los trazos siguen calles reales de OpenStreetMap (ruteo OSRM sobre
 *    waypoints a mano). Obligan a la atribución ODbL, que va en la página.
 *
 * Escribe dos archivos con propósitos distintos:
 *   src/data/camiones-cancun.json           → catálogo completo, se importa en el
 *                                             servidor (páginas por ruta, SEO).
 *   public/data/camiones-cancun-lineas.json → geometría simplificada de las 31
 *                                             rutas, la baja el cliente sólo
 *                                             cuando abre el mapa del hub.
 *
 * Uso:  node scripts/build-camiones-cancun.mjs [ruta/al/routes.json]
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const SRC =
  process.argv[2] ??
  resolve(
    process.env.USERPROFILE ?? process.env.HOME ?? ".",
    "Desktop/rutas cancun/src/data/routes.json"
  );

/** Fecha en que revisamos tarifas y letreros contra la fuente pública. */
const LAST_REVIEWED = "2026-08-18";

/**
 * La tarifa del corredor de la Zona Hotelera está comprobada en campo, pagando
 * el pasaje; la urbana sigue siendo referencia pública.
 *
 * La distinción importa y por eso la confianza viaja POR RUTA y no como una
 * etiqueta global de la página: dar por verificados los $10 urbanos porque
 * comprobamos los $12 de Kukulcán sería exactamente el tipo de salto que la
 * etiqueta existe para impedir.
 */
const FARE_VERIFIED_ON = "2026-08-22";

/**
 * Traducción y reescritura por ruta. El `sign` (letrero de parabrisas) NO se
 * traduce a propósito: es el texto que el pasajero tiene que reconocer pintado
 * en el cristal, traducirlo lo volvería inútil.
 */
const COPY = {
  r1: {
    nameEn: "Rehoyada · Hotel Zone",
    notesEs:
      "La más usada por quien se hospeda en Kukulcán. Junto con el R2 no para en toda la noche. Dentro de la Zona Hotelera cualquier unidad que vaya en tu sentido te sirve: no tienes que esperar un número concreto.",
    notesEn:
      "The one most visitors end up taking. Together with the R2 it runs all night. Inside the Hotel Zone any bus heading your way will do, so there is no need to wait for a specific number.",
  },
  r2: {
    nameEn: "Kabah · Mercado 28 · Hotel Zone",
    notesEs:
      "La que sirve para Mercado 28 y el Walmart de Kabah. Lee el letrero antes de subir: dice Kabah o Walmart según por dónde entre. También opera 24 h en la Zona Hotelera.",
    notesEn:
      "The one for Mercado 28 and the Walmart on Kabah. Read the windshield sign before boarding: it says Kabah or Walmart depending on the approach. Also runs 24 h in the Hotel Zone.",
  },
  "r2-la-joya": {
    nameEn: "La Joya · Hotel Zone",
    notesEs:
      "Variante del R2 que arranca en la colonia La Joya, al poniente, y baja a Kukulcán.",
    notesEn:
      "R2 variant starting in La Joya, on the western edge, running down to Kukulcán.",
  },
  "r2-lakin": {
    nameEn: "Lakin · Hotel Zone",
    notesEs: "Variante del R2 desde Lakin, al norte-poniente, rumbo a Kukulcán.",
    notesEn: "R2 variant from Lakin, in the north-west, heading to Kukulcán.",
  },
  "r2-torito": {
    nameEn: "Torito · Hotel Zone",
    notesEs: "Variante del R2 que sale de El Torito y entra a la Zona Hotelera.",
    notesEn: "R2 variant leaving from El Torito and entering the Hotel Zone.",
  },
  "r2-villas": {
    nameEn: "Villas Otoch · Hotel Zone",
    notesEs:
      "Variante del R2 desde Villas Otoch Paraíso, el fraccionamiento del norte-poniente.",
    notesEn:
      "R2 variant from Villas Otoch Paraíso, the large housing estate in the north-west.",
  },
  "3reyes-3": {
    nameEn: "Tres Reyes",
    notesEs: "Urbana del norte de la ciudad. No entra a la Zona Hotelera.",
    notesEn: "City route in the north. Does not enter the Hotel Zone.",
  },
  r4: {
    nameEn: "Francisco I. Madero",
    notesEs:
      "Recorre el centro por la avenida Madero. Circular urbana, no llega a Kukulcán.",
    notesEn:
      "Runs through downtown along Avenida Madero. A city loop; it never reaches Kukulcán.",
  },
  r4x7: {
    nameEn: "Madero · variant",
    notesEs: "Combinación R4/R7 del catálogo público. Urbana, sin Zona Hotelera.",
    notesEn:
      "R4/R7 combination listed in the public catalogue. City service only, no Hotel Zone.",
  },
  r5: {
    nameEn: "Miguel Hidalgo · Kabah",
    notesEs:
      "Cruza la ciudad de norte a sur por la avenida Kabah sin entrar a la Zona Hotelera.",
    notesEn:
      "Crosses the city north to south along Avenida Kabah, without entering the Hotel Zone.",
  },
  r6: {
    nameEn: "Lombardo · Puerto Juárez",
    notesEs:
      "Conecta el muelle de Ultramar con la avenida Tulum por Bonampak. No recorre la Zona Hotelera completa.",
    notesEn:
      "Links the Ultramar ferry pier with Avenida Tulum via Bonampak. It does not cover the whole Hotel Zone.",
  },
  r10: {
    nameEn: "Puerto Juárez · Downtown · Hotel Zone",
    notesEs:
      "La del muelle de Ultramar si vas o vienes de Isla Mujeres. Baja por Bonampak, cruza Tulum y entra a la Zona Hotelera por Cobá, no por Puerto Cancún.",
    notesEn:
      "The one for the Ultramar pier if you are going to or from Isla Mujeres. It comes down Bonampak, crosses Tulum and enters the Hotel Zone via Cobá, not via Puerto Cancún.",
  },
  r14: {
    nameEn: "Haciendas del Caribe",
    notesEs: "Poniente: Haciendas y Tierra Maya hacia Plaza Las Américas.",
    notesEn: "Western side: Haciendas and Tierra Maya towards Plaza Las Américas.",
  },
  "r15-c": {
    nameEn: "Región 95 · Hotel Zone",
    notesEs:
      "También se anuncia como Hoteles 95-96. El letrero dice Kabah o Walmart.",
    notesEn:
      "Also advertised as Hoteles 95-96. The windshield sign reads Kabah or Walmart.",
  },
  r17: {
    nameEn: "Leona Vicario · Palmas",
    notesEs: "Del Crucero, en Leona Vicario, hacia la zona de Palmas.",
    notesEn: "From El Crucero, on Leona Vicario, towards the Palmas area.",
  },
  "r17-rancho": {
    nameEn: "Rancho Viejo · Palmas",
    notesEs: "Variante del R17 que sube hasta Rancho Viejo.",
    notesEn: "R17 variant that continues up to Rancho Viejo.",
  },
  r18a: {
    nameEn: "Niños Héroes",
    notesEs: "Recorre la avenida Niños Héroes. Urbana.",
    notesEn: "Runs along Avenida Niños Héroes. City service.",
  },
  r21: {
    nameEn: "Kabah · Tecnológico",
    notesEs:
      "Liga la avenida Kabah con el Tecnológico de Cancún. Se llena en horario de clases.",
    notesEn:
      "Links Avenida Kabah with the Tecnológico de Cancún campus. Crowded around class hours.",
  },
  r23: {
    nameEn: "Jacinto Pat · Crucero",
    notesEs: "Sur-poniente: de Jacinto Pat al Crucero.",
    notesEn: "South-west: from Jacinto Pat to El Crucero.",
  },
  r26: {
    nameEn: "Rancho Viejo · Jardines del Sur",
    notesEs:
      "De punta a punta de la ciudad: Rancho Viejo, al norte, hasta Jardines del Sur.",
    notesEn:
      "End to end across the city: Rancho Viejo in the north down to Jardines del Sur.",
  },
  r27: {
    nameEn: "Villas del Caribe · Plaza Las Américas · Hotel Zone",
    notesEs:
      "Entra a la Zona Hotelera por Plaza Las Américas y Cobá. Una vez en Kukulcán sirve igual que el R1 o el R2. Ojo: no es de 24 h, las últimas corridas rondan las 23:30.",
    notesEn:
      "Enters the Hotel Zone via Plaza Las Américas and Cobá. Once on Kukulcán it works just like the R1 or R2. Note it is not a 24 h route: last runs are around 23:30.",
  },
  r28: {
    nameEn: "Villas Otoch · Av. Tulum",
    notesEs:
      "De las villas al centro por la avenida Tulum. No entra a la Zona Hotelera.",
    notesEn:
      "From the housing estates to downtown along Avenida Tulum. Does not enter the Hotel Zone.",
  },
  r29: {
    nameEn: "Corales · Tecnológico",
    notesEs: "Urbana del sur. De Corales al Tecnológico.",
    notesEn: "Southern city route. From Corales to the Tecnológico.",
  },
  r31: {
    nameEn: "Corales · Jacinto Pat",
    notesEs: "Cruza las colonias del sur: Corales y Jacinto Pat.",
    notesEn: "Crosses the southern neighbourhoods: Corales and Jacinto Pat.",
  },
  r44: {
    nameEn: "Prado Norte · Nichupté",
    notesEs: "Liga Prado Norte con la avenida Nichupté.",
    notesEn: "Links Prado Norte with Avenida Nichupté.",
  },
  r68: {
    nameEn: "Tierra Maya · Plaza",
    notesEs: "Del poniente, Tierra Maya, a Plaza Las Américas.",
    notesEn: "From Tierra Maya in the west to Plaza Las Américas.",
  },
  r70: {
    nameEn: "Urbi Villa del Rey · Américas",
    notesEs: "De Urbi Villa del Rey hacia Plaza Las Américas.",
    notesEn: "From Urbi Villa del Rey towards Plaza Las Américas.",
  },
  r237: {
    nameEn: "Domos · Tulum",
    notesEs: "Circular del centro por la avenida Tulum y la zona de Domos.",
    notesEn: "Downtown loop along Avenida Tulum and the Domos area.",
  },
  "r237-c": {
    nameEn: "Domos · variant",
    notesEs: "Variante circular del R237.",
    notesEn: "Loop variant of the R237.",
  },
  r259: {
    nameEn: "Región 259 · Downtown",
    notesEs:
      "Combi de las regiones del poniente al centro. Unidad chica: si va llena, no para.",
    notesEn:
      "Shared van from the western regions into downtown. Small vehicle: if it is full, it will not stop.",
  },
  "r-bonfil": {
    nameEn: "Bonfil · Downtown",
    notesEs:
      "Combi del ejido Alfredo V. Bonfil al centro. Se llena en hora pico y es el único servicio directo de esa zona.",
    notesEn:
      "Shared van from the Alfredo V. Bonfil settlement into downtown. Packed at rush hour and the only direct service from there.",
  },
};

/**
 * Nombre ES del catálogo origen, EN de la tabla de arriba.
 *
 * El origen abrevia "Zona Hotelera" como "Hotelera" en cuatro rutas y no en el
 * resto, lo que en una lista de 31 se lee como si fueran destinos distintos.
 */
function localizedName(route) {
  const es = route.name.replace(/(^|·\s*)Hotelera\b/g, "$1Zona Hotelera");
  return { es, en: COPY[route.id]?.nameEn ?? es };
}

/**
 * Horario reescrito a partir del hecho (`allDay`), no del texto de la fuente.
 * Las rutas urbanas no publican tabla de horarios: decimos lo que sabemos y
 * marcamos el resto como aproximado en la interfaz.
 */
function localizedSchedule(route) {
  if (route.allDay) {
    return { es: "Servicio continuo las 24 horas", en: "Runs around the clock, 24 hours" };
  }
  if (route.id === "r27") {
    return {
      es: "Diurno · últimas corridas cerca de las 23:30",
      en: "Daytime · last runs around 23:30",
    };
  }
  return {
    es: "Diurno · últimas corridas al caer la noche",
    en: "Daytime · last runs around nightfall",
  };
}

/** Distancia perpendicular punto-segmento en grados (suficiente a esta escala). */
function perpendicular(p, a, b) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  if (dx === 0 && dy === 0) return Math.hypot(p[0] - a[0], p[1] - a[1]);
  const t = Math.max(
    0,
    Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy))
  );
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
}

/** Ramer-Douglas-Peucker iterativo (la versión recursiva se pasa de pila con trazos largos). */
function simplify(points, tolerance) {
  if (points.length < 3) return points;
  const keep = new Array(points.length).fill(false);
  keep[0] = true;
  keep[points.length - 1] = true;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [first, last] = stack.pop();
    let maxDist = 0;
    let index = -1;
    for (let i = first + 1; i < last; i++) {
      const d = perpendicular(points[i], points[first], points[last]);
      if (d > maxDist) {
        maxDist = d;
        index = i;
      }
    }
    if (index !== -1 && maxDist > tolerance) {
      keep[index] = true;
      stack.push([first, index], [index, last]);
    }
  }
  return points.filter((_, i) => keep[i]);
}

const round = (n, d) => Number(n.toFixed(d));
const roundPair = (p, d = 5) => [round(p[0], d), round(p[1], d)];

/**
 * Paradas basura del catálogo origen ("Parada", "Bus stop", "R3"...). Sin este
 * filtro las listas se llenan de etiquetas que no le dicen nada a nadie.
 */
const JUNK_STOP = /^(parada|bus stop|r\d|transporte cancun|bus a |bus hacia)/i;

const raw = JSON.parse(readFileSync(SRC, "utf8"));

const routes = raw.routes.map((r) => {
  const stops = r.stops
    .filter((s) => s.name && !JUNK_STOP.test(s.name))
    .map((s) => ({ name: s.name, lng: round(s.lng, 5), lat: round(s.lat, 5) }));

  const polyline = r.polyline.map((p) => roundPair(p));
  // ~15 m de tolerancia: invisible al ojo sobre un mapa de ciudad, pero recorta
  // el archivo que baja el cliente a una fracción.
  const polylineLite = simplify(polyline, 0.00014);

  return {
    id: r.id,
    slug: r.id,
    code: r.code,
    name: localizedName(r),
    sign: r.sign,
    operator: r.operator,
    vehicleType: r.vehicleType,
    coverage: r.coverage,
    fareMxn: r.fareMxn,
    fareConfidence: r.coverage === "hotelera" ? "verified" : "approx",
    fareCheckedOn: r.coverage === "hotelera" ? FARE_VERIFIED_ON : LAST_REVIEWED,
    allDay: r.allDay,
    schedule: localizedSchedule(r),
    color: r.color,
    notes: {
      es: COPY[r.id]?.notesEs ?? r.notes,
      en: COPY[r.id]?.notesEn ?? r.notes,
    },
    bounds: r.bounds.map((n) => round(n, 5)),
    stops,
    polyline,
    polylineLite,
  };
});

const missing = routes.filter((r) => !COPY[r.id]);
if (missing.length) {
  console.warn("Sin traducción EN:", missing.map((r) => r.id).join(", "));
}

const meta = {
  lastReviewed: LAST_REVIEWED,
  attribution:
    "Trazos derivados de OpenStreetMap (ODbL) mediante ruteo OSRM. Códigos, letreros y tarifas de referencia pública del transporte urbano de Cancún.",
  generatedAt: LAST_REVIEWED,
};

mkdirSync("public/data", { recursive: true });

writeFileSync(
  "src/data/camiones-cancun.json",
  JSON.stringify(
    { ...meta, routes: routes.map(({ polylineLite, ...rest }) => rest) },
    null,
    2
  ) + "\n"
);

// El cliente sólo necesita geometría simplificada y lo justo para etiquetar.
writeFileSync(
  "public/data/camiones-cancun-lineas.json",
  JSON.stringify({
    ...meta,
    routes: routes.map((r) => ({
      id: r.id,
      code: r.code,
      color: r.color,
      coverage: r.coverage,
      vehicleType: r.vehicleType,
      fareMxn: r.fareMxn,
      fareConfidence: r.fareConfidence,
      allDay: r.allDay,
      name: r.name,
      stops: r.stops,
      polyline: r.polylineLite,
    })),
  })
);

const pts = routes.reduce((s, r) => s + r.polyline.length, 0);
const lite = routes.reduce((s, r) => s + r.polylineLite.length, 0);
console.log(
  `${routes.length} rutas · ${pts} puntos → ${lite} simplificados (${Math.round((lite / pts) * 100)}%)`
);

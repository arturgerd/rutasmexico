# Workflow para generar destinos con Grok (sin alucinaciones)

Este doc es el complemento de [`writing-brief-thin-destinos.md`](./writing-brief-thin-destinos.md). El brief asume redactor humano; éste asume **tú + Grok**, con guardrails para no romper políticas de AdSense ni inventar datos.

**Regla de oro:** Grok escribe **prosa** a partir de datos que TÚ verificaste. Nunca le pidas hechos. Si tu sheet de investigación tiene celdas vacías, Grok marca `[VERIFICAR]` — no inventa.

---

## Paso 1 — La hoja de investigación (Google Sheets / Notion / CSV)

Crea una hoja con **una fila por destino** y estas columnas. Cada celda debe tener un dato concreto que sacaste de una fuente real (no de tu memoria, no de Grok).

### Columnas obligatorias

| Columna | Tipo | Ejemplo | Fuente de verdad |
|---|---|---|---|
| `slug` | string kebab-case | `holbox` | Tú |
| `name_es` | string | `Holbox` | — |
| `name_en` | string | `Holbox` | — |
| `state_es` | string | `Quintana Roo` | — |
| `state_en` | string | `Quintana Roo` | — |
| `region` | enum | `peninsula` | Uno de: `centro \| norte \| sur \| peninsula \| pacifico \| golfo \| bajio` |
| `lat` | number | `21.5217` | Google Maps |
| `lng` | number | `-87.3789` | Google Maps |
| `airport_iata` | string | `CUN` | aeropuerto más cercano accesible (no necesariamente en el destino) |
| `airport_distance_km` | number | `170` | Google Maps driving |
| `airport_transfer_time` | string | `2h 30min ferry+auto` | Google Maps |
| `airport_transfer_options` | text | `ADO Cancún→Chiquilá (3h, $400 MXN) + ferry Holbox Express (30min, $250 MXN)` | sitio oficial ADO + holboxexpress.com |
| `bus_lines` | text | `ADO, Mayab` | sitios oficiales |
| `bus_from_cdmx_hours` | string | `24h con escala` | sitio oficial |
| `bus_from_cdmx_mxn_min` | number | `1800` | sitio oficial |
| `bus_from_cdmx_mxn_max` | number | `2600` | sitio oficial |
| `daily_budget_low_mxn` | number | `900` | tu cálculo: hostel + comida corrida + 0 actividades pagadas |
| `daily_budget_mid_mxn` | number | `2200` | hotel 3*, restaurante medio, 1 tour |
| `daily_budget_high_mxn` | number | `5500` | boutique/all-incl, fine dining, varios tours |
| `best_months` | text | `Nov-Abr (seco), May-Oct (lluvias)` | — |
| `peak_months` | text | `Dic, Mar (Spring Break), Jul-Ago` | — |
| `safety_level` | enum | `seguro` | Uno de: `seguro \| precaución \| consultar` |
| `safety_notes` | text | `Isla muy tranquila, no hay autos. Mosquitos fuertes en lluvias.` | gob.mx + Reddit r/mexicotravel últimos 6 meses |
| `top5_things_to_do` | text JSON | ver abajo | tú + Wikivoyage + Reddit |
| `food_dishes` | text JSON | ver abajo | tú + bloggers locales |
| `neighborhoods` | text JSON | ver abajo | tú |
| `nearby_destinations` | text | `Isla Mujeres, Tulum, Bacalar` | mapa |
| `keywords_target` | text | `holbox que hacer, holbox precio, holbox vs isla mujeres` | Search Console + Google autocomplete |
| `unique_angle` | text | `Sin autos. Sin cajeros automáticos. Pago en efectivo.` | esto es lo que te diferencia del top 10 de Google |
| `sources` | text | `[ADO link, holboxexpress link, gob.mx link, Reddit thread link]` | trazabilidad |

### Formato JSON para las celdas compuestas

**`top5_things_to_do`** — 5 actividades con datos verificables:
```json
[
  {"name": "Isla Pasión", "type": "playa", "cost_mxn": "1200-1800 por tour lancha", "duration": "medio día"},
  {"name": "Punta Mosquito", "type": "naturaleza", "cost_mxn": "0", "duration": "2h caminata"},
  {"name": "Cenote Yalahau", "type": "cenote", "cost_mxn": "100", "duration": "1h"},
  {"name": "Avistamiento tiburón ballena", "type": "tour", "cost_mxn": "2500-3500", "duration": "día completo", "season": "Jun-Sep"},
  {"name": "Bioluminiscencia", "type": "tour nocturno", "cost_mxn": "500-800", "duration": "2h", "season": "Jul-Ene luna nueva"}
]
```

**`food_dishes`** — 3 platos emblemáticos con dónde probarlos:
```json
[
  {"dish": "Pizza de langosta", "price_range_mxn": "350-600", "where": "Pizzería Edelyn (la original)"},
  {"dish": "Pescado tikinxic", "price_range_mxn": "200-380", "where": "Las Panchas, Tacos Boca de Tutito"},
  {"dish": "Ceviche de caracol", "price_range_mxn": "180-280", "where": "Mandarina Bar"}
]
```

**`neighborhoods`** — zonas con su perfil de viajero:
```json
[
  {"name": "Centro/Pueblo", "vibe": "Económico, vida nocturna, hostales", "price_per_night_mxn": "500-1500"},
  {"name": "Zona hotelera (playa norte)", "vibe": "Hoteles boutique frente al mar", "price_per_night_mxn": "2500-8000"},
  {"name": "Punta Cocos", "vibe": "Alejado, tranquilo, atardeceres", "price_per_night_mxn": "1800-4500"}
]
```

---

## Paso 2 — El master prompt para Grok

Copia este prompt **tal cual**, sustituye `{{...}}` con los datos de tu sheet, y pégalo en Grok:

```
Eres editor senior de RutasMéxico, una guía de viajes mexicana con tono editorial cercano (usa "tú", no "usted"; español de México con acentos completos; nada de español neutro de Madrid).

Tu trabajo es escribir el contenido editorial de un destino para insertarlo en nuestro archivo destinations-content.json. NO eres una fuente de datos: todos los hechos vienen de la investigación verificada abajo. Si un dato falta o es ambiguo, escribe literalmente "[VERIFICAR: qué falta]" — NUNCA inventes precios, nombres de hoteles, restaurantes, horarios, ni distancias.

## Datos verificados del destino

- Slug: {{slug}}
- Nombre ES / EN: {{name_es}} / {{name_en}}
- Estado: {{state_es}}, México
- Región (interna): {{region}}
- Coordenadas: {{lat}}, {{lng}}
- Aeropuerto más cercano: {{airport_iata}} ({{airport_distance_km}} km, traslado típico {{airport_transfer_time}})
- Opciones de traslado desde el aeropuerto: {{airport_transfer_options}}
- Líneas de autobús que llegan: {{bus_lines}}
- Desde CDMX en bus: {{bus_from_cdmx_hours}}, {{bus_from_cdmx_mxn_min}}–{{bus_from_cdmx_mxn_max}} MXN
- Presupuesto diario (low/mid/high MXN): {{daily_budget_low_mxn}} / {{daily_budget_mid_mxn}} / {{daily_budget_high_mxn}}
- Mejores meses: {{best_months}}
- Meses pico (más caro/más lleno): {{peak_months}}
- Nivel de seguridad: {{safety_level}} — {{safety_notes}}
- Top 5 actividades (JSON): {{top5_things_to_do}}
- Platos emblemáticos (JSON): {{food_dishes}}
- Barrios/zonas (JSON): {{neighborhoods}}
- Destinos cercanos para combinar: {{nearby_destinations}}
- Ángulo único del destino (diferenciador editorial): {{unique_angle}}
- Keywords objetivo de SEO: {{keywords_target}}

## Salida esperada

Devuelve un objeto JSON con EXACTAMENTE estas claves, en este orden. Cada bloque debe ser `{ "es": "...", "en": "..." }`. Conteo de palabras objetivo entre paréntesis (no obligatorio rígido, ±15% está bien):

{
  "howToGetThere":   { es: "(380-450 palabras)", en: "(380-450 palabras)" },
  "whereToStay":     { es: "(320-400)", en: "(320-400)" },
  "gettingAround":   { es: "(220-300)", en: "(220-300)" },
  "foodScene":       { es: "(280-360)", en: "(280-360)" },
  "bestTime":        { es: "(220-300)", en: "(220-300)" },
  "dailyCost":       { es: "(270-350)", en: "(270-350)" },
  "faqs": [
    { "question": { "es": "...", "en": "..." }, "answer": { "es": "(40-80 palabras)", "en": "(40-80 palabras)" } },
    // 6 FAQs totales
  ]
}

## Reglas de estilo (obligatorias)

1. **Apertura concreta.** Primera oración de cada sección arranca con un dato específico, no con "X es una hermosa ciudad…". Ejemplo malo: "Holbox es un destino paradisíaco." Ejemplo bueno: "Holbox no tiene autos: en cuanto bajas del ferry, te mueves en carritos de golf, bici o caminando descalzo por calles de arena."

2. **Precios siempre en rangos MXN.** Nunca un valor exacto. Formato: "$800–1,400 MXN aprox.". Si el dato de origen es USD, conviértelo y nota "(~$X USD)" entre paréntesis.

3. **Nombres propios > adjetivos.** "Hospédate en Casa Las Tortugas en Punta Cocos" beats "hoteles boutique cerca de la playa". USA SOLO los nombres del JSON `neighborhoods`/`food_dishes` proporcionado. No inventes hoteles ni restaurantes.

4. **Tono mexicano.** "Raite", "chela", "trajinera", "colectivo", "huachicol" donde aplique. Nunca "patata", "coche", "guay", "vale".

5. **Sin frases de marketing vacías.** Prohibidas: "experiencia inolvidable", "joya escondida", "imperdible", "paraíso terrenal", "destino mágico", "auténtica esencia". Si encuentras una de éstas en tu draft, reescribe.

6. **"tú" para el lector, nunca "usted".** Tampoco "vosotros".

7. **FAQs basados en intent real.** Cada FAQ debe responder algo que un viajero busca en Google ANTES de viajar. Ejemplos buenos: "¿Es seguro?", "¿Cuántos días necesito?", "¿Hay sargazo?", "¿Aceptan tarjeta o solo efectivo?", "¿Vale más la pena que [destino alternativo]?". Ejemplos malos: "¿Qué es Holbox?" (eso ya lo respondes en `howToGetThere`).

8. **Versión EN no es traducción literal.** Adapta idiom: "agua de horchata" → "horchata (rice-cinnamon drink)" la primera mención; después solo "horchata". "Sargazo" → "sargassum seaweed" primera vez.

9. **NUNCA primera persona.** No escribas "Cuando visité Holbox…" o "Recomendamos personalmente…". Mantén voz editorial neutra: "Holbox se camina en sandalias, no tenis".

10. **Si no tienes el dato, marca [VERIFICAR].** Ejemplo: "El ferry sale cada [VERIFICAR: frecuencia exacta] desde Chiquilá".

## Estructura por sección

**howToGetThere:**
Aeropuerto principal (con IATA), distancia y opciones de traslado. Si hay aeropuerto secundario más barato o cercano, mencionarlo. Autobús desde CDMX con línea + duración + rango de precio. Auto desde CDMX (horas + casetas aprox.). Si aplica, ferry/transbordador.

**whereToStay:**
Por barrio/zona del JSON. Para cada uno: tipo de viajero que encaja, rango de precio por noche, 1-2 hoteles de referencia del JSON (sin lenguaje promocional).

**gettingAround:**
Transporte interno (caminar, bici, golf cart, taxi, Uber/DiDi disponibilidad). Tiempos típicos entre puntos. Costos en MXN.

**foodScene:**
Plato emblemático con historia mínima (1 oración), dónde probarlo (lugares del JSON), mercados si aplica, presupuesto por comida (desayuno/comida/cena rangos).

**bestTime:**
Mes a mes en bloques (ej. "Nov-Feb", "Mar-May", "Jun-Oct"): clima, oleaje/sargazo/fauna si aplica, festivales, temporada turística. Recomendación final basada en mejor relación clima/precio/menos turistas.

**dailyCost:**
3 perfiles (bajo / medio / alto) con desglose: hospedaje + comida + transporte interno + 1 actividad/día. Totales del JSON.

**faqs:**
Exactamente 6 FAQs respondiendo intent de búsqueda real. Responde con datos del JSON o admite limitación con [VERIFICAR].

## Output: JSON válido, listo para pegar

Devuelve ÚNICAMENTE el objeto JSON, sin markdown wrapping, sin explicación previa. Tiene que ser parseable con JSON.parse() directo.
```

---

## Paso 3 — Sub-prompts (después del master)

Cuando ya tengas el JSON del destino aprobado, corre estos prompts adicionales en sesiones separadas:

### 3a. Generar las entradas para `destinations.json`

```
A partir del contenido editorial que ya validamos para {{slug}}, genera la entrada para nuestro archivo principal destinations.json siguiendo el schema TypeScript:

interface Destination {
  id: string; slug: string;
  name: LocalizedString; shortName: string;
  airportIATA: string; coordinates: Coordinates;
  state: LocalizedString; region: "centro" | "norte" | "sur" | "peninsula" | "pacifico" | "golfo" | "bajio";
  description: LocalizedString;       // 30-50 palabras
  longDescription: LocalizedString;   // 90-130 palabras
  heroImage: string;                  // déjalo como "TODO_UPLOAD"
  highlights: LocalizedString[];      // 5 highlights, 15-25 palabras c/u
  gettingAround: LocalizedString;     // 60-90 palabras
  safetyTips: LocalizedString[];      // 3-5 tips
  foodRecommendations: { name: string; description: LocalizedString; priceRange: {min,max,currency:"MXN"}; whereToTry: LocalizedString }[];
  averageDailyBudget: { min, max, currency: "MXN" };
  bestTimeToVisit: LocalizedString;   // 50-80 palabras
}

Usa los datos del JSON original ({{paste research sheet row}}) y el contenido editorial. NO inventes datos nuevos. Output: solo el objeto JSON, parseable.
```

### 3b. Verificación de alucinaciones (CRÍTICO)

```
Te paso el JSON editorial de {{slug}} que generaste antes. Tu tarea ahora es REVISAR cada nombre propio (hotel, restaurante, calle, parque, tour operator, línea de autobús, aerolínea) y marcar cada uno con uno de estos tags:

- [✓ VENÍA EN INPUT] — el nombre estaba en el JSON de investigación que te pasé
- [⚠ INVENTADO] — el nombre NO estaba en el input; lo agregaste tú
- [? AMBIGUO] — el nombre es genérico (ej. "el malecón", "el mercado central") y necesita verificación

Devuelve el mismo JSON pero con estos tags inline después de cada nombre propio. Sé estricto: si tengo duda, márcalo ⚠.
```

→ **Tú revisas el output:** todo lo que tenga `⚠ INVENTADO` lo borras o lo reemplazas con un nombre real que verifiques.

### 3c. FAQPage JSON-LD

```
A partir de las 6 FAQs del JSON editorial de {{slug}}, genera un schema FAQPage de schema.org en formato JSON-LD listo para inyectar con dangerouslySetInnerHTML. Versión ES y EN separadas. Output: 2 objetos JSON-LD.
```

### 3d. Alt text masivo de imágenes

```
Tengo {{N}} imágenes para la guía de {{name_es}}. Te paso una descripción factual de cada una. Genera alt text en español Y en inglés, máximo 125 caracteres, sin "imagen de" ni "foto de" al inicio.

1. {{descripción factual 1}}
2. {{descripción factual 2}}
...

Output: tabla markdown con 3 columnas: número, alt_es, alt_en.
```

### 3e. Internal linking

```
Acabo de publicar la guía de {{slug}}. Aquí está el texto completo. Aquí está mi lista de slugs disponibles para enlace interno:

Destinos: {{lista de slugs de destinations.json}}
Posts: {{lista de slugs de blog-posts.json}}
Rutas: {{lista de slugs de routes.json}}

Identifica 5-8 oportunidades de link interno en el texto. Para cada una, devuelve:
- Frase exacta donde insertarlo
- Slug destino
- Razón de relevancia (1 línea)

NO sugieras enlaces forzados. Si una sección no tiene oportunidad natural, no inventes una.
```

### 3f. Meta description + título

```
Para {{name_es}}, genera 4 variantes de meta description (150-158 caracteres, ES) y 4 de title tag (50-58 caracteres, ES). Cada variante con ángulo distinto:
- v1: Práctico (cómo llegar / cuánto cuesta)
- v2: Aspiracional (qué experiencia ofrece)
- v3: Comparativo (vs otro destino conocido)
- v4: Pregunta (hook tipo "¿Vale la pena Holbox?")

Repite para EN. Output: tabla.
```

---

## Paso 4 — Checklist de verificación pre-commit

Antes de añadir el destino al JSON y commitear, verifica:

- [ ] Todos los `[VERIFICAR]` resueltos
- [ ] Sub-prompt 3b corrido — cero `⚠ INVENTADO` quedan en el texto
- [ ] Precios todos en MXN como rangos (`$800–1,400 MXN aprox.`)
- [ ] Nombres propios coinciden con tu sheet de investigación
- [ ] Sin frases prohibidas (búsqueda regex: `experiencia inolvidable|joya escondida|imperdible|paraíso terrenal|destino mágico`)
- [ ] EN no es traducción literal del ES (idioms adaptados)
- [ ] 6 FAQs presentes, cada uno responde intent real
- [ ] Slug nuevo añadido a `src/data/destinations.json` (schema completo) Y a `src/data/destinations-content.json` (bloques editoriales)
- [ ] `heroImage` apunta a una URL real (no `TODO_UPLOAD`)
- [ ] `npm run build` pasa sin errores
- [ ] Slug del destino aparece automáticamente en `sitemap.xml` (lo genera `src/app/sitemap.ts`)
- [ ] Commit message: `Content: <slug> editorial guide (~3.6k words)`
- [ ] Submit URL en Google Search Console (ambas, /es/destinos/<slug> y /en/destinos/<slug>)

---

## Paso 5 — Tiempos reales esperados

Por destino, asumiendo que ya tienes la plantilla del sheet:

| Fase | Tiempo | Quién |
|---|---|---|
| Investigación + llenar sheet | 45-60 min | Tú |
| Master prompt → JSON editorial | 5 min | Grok |
| Sub-prompt 3b (verificar alucinaciones) | 5 min | Grok |
| Revisión humana del output | 20-30 min | Tú |
| Sub-prompts 3a, 3c, 3d, 3e, 3f | 15 min | Grok en paralelo |
| Integrar al JSON + build + commit | 15 min | Tú |
| **Total** | **~2 horas** | — |

A 2-3 destinos por día son ~25 destinos en 2 semanas. De 13 → 38 destinos antes de reaplicar a AdSense.

---

## Paso 6 — Prioridad de destinos a producir

Orden recomendado (combina volumen de búsqueda + facilidad de investigación):

**Tier 1 (búsquedas altas, audiencia EN y ES):**
1. Holbox
2. Bacalar
3. Sayulita
4. Tulum (si no existe ya)
5. Puerto Escondido

**Tier 2 (búsquedas medias, audiencia ES principalmente):**
6. Tepoztlán
7. Valle de Bravo
8. Real de Catorce
9. Bernal
10. Tequisquiapan

**Tier 3 (long tail, Pueblos Mágicos y costa Oaxaca):**
11. Mazunte
12. Zipolite
13. San Cristóbal de las Casas (si no existe)
14. Palenque
15. Loreto / La Paz / Todos Santos (BCS cluster)

Los 6 del brief original (San Miguel, Guanajuato, Monterrey, Huatulco, Riviera Nayarit, Mazatlán) son **Tier 1.5** — ya tienes investigación parcial en `writing-brief-thin-destinos.md`, úsala directo como input del master prompt.

---

## Anti-patrones a evitar

- ❌ **Pedirle a Grok "investiga Holbox y escribe la guía"** — alucinará todo. Tú investigas; Grok solo redacta.
- ❌ **Aceptar el primer output sin sub-prompt 3b** — siempre hay nombres inventados en el primer pass.
- ❌ **Generar 10 destinos seguidos sin revisar el primero** — si tu master prompt tiene un bug, lo replicas 10x.
- ❌ **Saltarte la verificación humana porque "se ve bien"** — un revisor de AdSense que checa 3 datos y encuentra 1 erróneo = otro rechazo.
- ❌ **Mezclar traducción y redacción en el mismo prompt** — el EN debe pensarse como adaptación, no como traducción literal. Si Grok hace los dos a la vez, la versión EN sale como traducción mecánica.

---

## Referencias internas

- Schema TypeScript: [`src/types/destination.ts`](../src/types/destination.ts)
- Data principal: [`src/data/destinations.json`](../src/data/destinations.json)
- Contenido editorial: [`src/data/destinations-content.json`](../src/data/destinations-content.json)
- Componente que renderiza: [`src/components/destinations/DestinationDetail.tsx`](../src/components/destinations/DestinationDetail.tsx)
- Sitemap auto-generado: [`src/app/sitemap.ts`](../src/app/sitemap.ts) — incluye nuevos slugs automáticamente
- Brief original (humano): [`docs/writing-brief-thin-destinos.md`](./writing-brief-thin-destinos.md)

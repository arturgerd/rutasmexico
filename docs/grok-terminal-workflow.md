# Workflow para llenar terminales camioneras con Grok (sin alucinaciones)

Complementa a [`grok-destination-workflow.md`](./grok-destination-workflow.md). Mismo principio: **tú investigas, Grok redacta**. Los terminales son más logísticos y menos editoriales que un destino, así que el sheet es más simple pero los datos deben ser más exactos (una dirección equivocada o un costo de Uber mal puesto es error verificable en 10 segundos por cualquier visitante).

**Estado actual:** `src/data/terminals.json` tiene 14 entradas (6 son aeropuertos + 8 centrales). Faltan ~30 centrales relevantes para que las guías de destinos enlacen sin links rotos editoriales.

---

## Paso 1 — La hoja de investigación

Crea una hoja con **una fila por terminal**. Columnas:

| Columna | Tipo | Ejemplo | Fuente de verdad |
|---|---|---|---|
| `id` | kebab-case único | `ado-playa-del-carmen` | Tú |
| `type` | enum | `bus_terminal` | Casi siempre `bus_terminal` |
| `name_es` | string | `Terminal ADO Playa del Carmen` | Sitio oficial ADO / placa frontal |
| `name_en` | string | `ADO Playa del Carmen Bus Terminal` | — |
| `shortCode` | string mayúsculas | `ADO PDC` | — |
| `cityId` | string | `playa-del-carmen` | **DEBE existir en `destinations.json`** o registrar primero el destino |
| `address_es` | text | `Av. Juárez s/n entre 5ª y 10ª Avenida, Centro, 77710 Playa del Carmen, Q.R.` | Google Maps + sitio oficial |
| `address_en` | text | mismo address sin traducir nombres de calle | — |
| `lat` | number 6 decimales | `20.6286` | Google Maps |
| `lng` | number 6 decimales | `-87.0739` | Google Maps |
| `main_lines` | text | `ADO, ADO GL, ADO Platino, OCC, Mayab` | Sitios oficiales de cada línea |
| `destinations_served` | text | `Cancún (1h, $90-150 MXN), Tulum (1h, $80-120 MXN), Mérida (4h, $450-680 MXN), CDMX TAPO (22h, $1,400-2,200 MXN)` | ado.com.mx (precios en pesos del momento de tu investigación) |
| `transport_to_center` | JSON | ver abajo | Tú (verificar con un test real de Uber) |
| `tips` | JSON | ver abajo | Tú + reviews de Google Maps últimos 6 meses |
| `facilities` | array enum | `["guardaequipaje","cajeros_automaticos","wifi_gratuito","baños","tiendas","sala_de_espera"]` | Lista controlada — ver abajo |
| `sources` | text | URLs verificables | Trazabilidad |

### Formato JSON de celdas compuestas

**`transport_to_center`** (3-5 opciones reales):
```json
[
  {
    "mode": "uber_didi",
    "description_es": "Uber y DiDi están permitidos en Playa del Carmen y tienen punto de recolección en el estacionamiento sur de la terminal.",
    "description_en": "Uber and DiDi operate in Playa del Carmen with a pickup point in the south parking lot of the terminal.",
    "cost_min_mxn": 60,
    "cost_max_mxn": 120,
    "minutes": 10,
    "duration_label_es": "5-15 min al hotel típico de zona centro",
    "duration_label_en": "5-15 min to typical downtown hotel"
  },
  {
    "mode": "taxi",
    "description_es": "Taxis del sitio oficial en la salida principal con tarifa fija por zona.",
    "description_en": "Official taxi stand at the main exit with flat zone-based fares.",
    "cost_min_mxn": 80,
    "cost_max_mxn": 200,
    "minutes": 10,
    "duration_label_es": "5-15 min según zona",
    "duration_label_en": "5-15 min depending on zone"
  },
  {
    "mode": "caminando",
    "description_es": "La terminal está a 2 cuadras de la 5ª Avenida y el muelle del ferry a Cozumel. Si tu hotel está en el centro, caminar es lo más rápido.",
    "description_en": "The terminal is 2 blocks from 5th Avenue and the Cozumel ferry pier. If your hotel is downtown, walking is fastest.",
    "cost_min_mxn": 0,
    "cost_max_mxn": 0,
    "minutes": 8,
    "duration_label_es": "5-15 min a pie",
    "duration_label_en": "5-15 min on foot"
  }
]
```

**Modos válidos** (mantén consistencia con datos existentes):
`metro`, `metrobus`, `tren_ligero`, `uber_didi`, `taxi`, `caminando`, `bici`, `combi_colectivo`, `shuttle`, `auto_rentado`

**`tips`** (3-5 tips prácticos, no marketing):
```json
[
  {
    "es": "ADO opera servicios de primera clase (asiento amplio, aire, baño) y económicos (Mayab). La diferencia de precio entre primera y económico ronda 25%, pero el confort en trayectos de 4h+ vale el sobreprecio.",
    "en": "ADO runs first-class service (wide seats, AC, restroom) and economy (Mayab). The price difference is around 25%, but the comfort upgrade is worth it on 4h+ trips."
  },
  {
    "es": "Compra en línea en ado.com.mx con 1-3 días de anticipación para asegurar asiento en temporada alta (dic-mar, jul-ago). Día del viaje suele tener tarifa más alta.",
    "en": "Buy online at ado.com.mx 1-3 days ahead to secure a seat in high season (Dec-Mar, Jul-Aug). Same-day fares are usually higher."
  },
  {
    "es": "Hay guardaequipaje pero llena rápido los fines de semana; alternativa cercana en hoteles del centro por $50-100 MXN/día.",
    "en": "Luggage storage exists but fills up on weekends; nearby hotels in downtown store bags for $50-100 MXN/day as an alternative."
  }
]
```

**`facilities`** (vocabulario controlado, usa SOLO estos slugs):
- `guardaequipaje`
- `cajeros_automaticos`
- `restaurantes`
- `tiendas`
- `farmacia`
- `wifi_gratuito`
- `sala_de_espera`
- `baños`
- `estacionamiento`
- `counter_taxi_oficial`
- `info_turistica`
- `accesibilidad`
- `area_lactancia`
- `gasolinera`
- `hospedaje_anexo`

Si un facility no está en la lista, propónmelo antes de inventarlo — añadirlo requiere editar componentes que renderizan facilities.

---

## Paso 2 — Master prompt para terminal

```
Eres editor logístico de RutasMéxico, una guía de viajes mexicana. Tu tarea es producir la entrada JSON de un terminal de autobuses para nuestro archivo terminals.json. NO eres una fuente de datos: todo viene de la investigación verificada abajo. Si un dato falta, escribe "[VERIFICAR]" — nunca inventes direcciones, precios, líneas que operan, horarios ni distancias.

## Datos verificados del terminal

- ID interno: {{id}}
- Tipo: {{type}}
- Nombre ES/EN: {{name_es}} / {{name_en}}
- Código corto: {{shortCode}}
- ID de la ciudad asociada (debe coincidir con destinations.json): {{cityId}}
- Dirección completa ES/EN: {{address_es}} / {{address_en}}
- Coordenadas: {{lat}}, {{lng}}
- Líneas principales que operan: {{main_lines}}
- Destinos servidos con duración y rango de precio: {{destinations_served}}
- Opciones de transporte al centro (JSON): {{transport_to_center}}
- Tips (JSON): {{tips}}
- Facilities disponibles: {{facilities}}

## Salida esperada

Devuelve ÚNICAMENTE un objeto JSON parseable que cumpla EXACTAMENTE este shape (TypeScript Terminal de src/types/terminal.ts):

{
  "id": "{{id}}",
  "type": "{{type}}",
  "name": { "es": "{{name_es}}", "en": "{{name_en}}" },
  "shortCode": "{{shortCode}}",
  "cityId": "{{cityId}}",
  "address": { "es": "{{address_es}}", "en": "{{address_en}}" },
  "coordinates": { "lat": {{lat}}, "lng": {{lng}} },
  "howToGetThere": { "es": "(80-130 palabras)", "en": "(80-130 palabras)" },
  "transportOptions": [
    // un objeto por cada item de transport_to_center, con shape:
    // { "mode": "...", "description": {es, en}, "cost": {min, max, currency:"MXN"}, "duration": {minutes, label:{es,en}} }
  ],
  "tips": [ {es, en}, ... ],
  "facilities": [ "facility_slug", ... ]
}

## Reglas

1. **howToGetThere** (80-130 palabras ES + EN): describe ubicación física relativa al centro de la ciudad, calles principales que rodean, transporte público que pasa al lado, accesos para auto. NO inventes calles ni paradas que no estén en address_es. Si no tienes el dato, pon [VERIFICAR].

2. **transportOptions**: convierte literalmente cada entry del JSON transport_to_center a la forma { mode, description: {es, en}, cost: {min, max, currency:"MXN"}, duration: {minutes, label: {es, en}} }. No agregues opciones de transporte que no estén en el input. No cambies costos.

3. **Líneas de autobús**: en howToGetThere o tips puedes mencionar SOLO las líneas listadas en main_lines. NO menciones "Pullman de Morelos" si tu input solo lista "ADO, OCC".

4. **Tono editorial**: español de México, "tú" no "usted", sin "joya", "imperdible", "experiencia inolvidable", sin frases promocionales de la terminal. Es info logística, no publicidad.

5. **Precios siempre en MXN como rangos** (`$80-200 MXN`), nunca exactos.

6. **facilities**: copia tal cual el array del input. No agregues facilities. Si necesitas un tag nuevo, marca [VERIFICAR_FACILITY: nombre_propuesto].

7. **EN no es traducción literal**. Adapta: "Calzada Ignacio Zaragoza" se queda como nombre propio (no traducir), pero "junto a la estación del Metro" → "next to the Metro station" (no "next to the subway station" — en CDMX se llama Metro).

8. Output: ÚNICAMENTE el JSON parseable. Sin markdown wrapping, sin explicación previa.
```

---

## Paso 3 — Sub-prompts

### 3a. Auditoría de alucinaciones (CRÍTICO)

```
Te paso el JSON de terminal {{id}} que generaste. Tu tarea es revisar cada nombre propio (calle, avenida, línea de autobús, estación de Metro, colonia, hotel, restaurante mencionado) y marcar cada uno con uno de:

- [✓ VENÍA EN INPUT] — estaba en el JSON de investigación
- [⚠ INVENTADO] — no estaba en el input
- [? AMBIGUO] — referencia genérica que necesita verificación (ej. "el sitio de taxis", "la avenida principal")

Devuelve el mismo JSON con tags inline. Sé estricto.
```

→ Tú borras o reemplazas todo lo marcado `⚠`.

### 3b. Verificación de costos contra realidad (recomendado para terminales urbanas)

```
Para el terminal {{id}}, te paso los costos de transporte que estoy a punto de publicar. Tu tarea: en cada modo (uber_didi, taxi, etc.), evalúa si el rango es realista comparado con tarifas conocidas de la ciudad. Si un rango parece bajo o alto, márcalo [REVISAR] y sugiere el motivo. No me digas el rango "correcto" — solo si el mío suena fuera de mercado.
```

### 3c. Vincular con destinos (post-integración)

```
Acabo de añadir el terminal {{id}} en {{cityId}}. Aquí está mi destinations-content.json para esa ciudad ({{paste content}}). Identifica en el bloque howToGetThere y gettingAround dónde tiene sentido insertar un enlace al nuevo terminal. Devuelve frase exacta + slug destino. NO sugieras enlaces forzados.
```

---

## Paso 4 — Checklist pre-commit

- [ ] `id` único (no colisiona con `id`s existentes en `terminals.json`)
- [ ] `cityId` existe en `destinations.json` (mismo slug). Si no, registra el destino primero.
- [ ] `shortCode` no duplica otro existente
- [ ] Coordenadas con 4-6 decimales (no `19.42`, sí `19.4226`)
- [ ] Todo `[VERIFICAR]` resuelto
- [ ] Sub-prompt 3a corrido — cero `⚠ INVENTADO` en el output
- [ ] Costos en MXN como rangos
- [ ] Solo facilities del vocabulario controlado
- [ ] Solo líneas reales (las del input) mencionadas en prosa
- [ ] `npm run build` pasa sin errores
- [ ] Si el terminal cambia una guía de destino existente, actualizar `destinations-content.json` correspondiente para enlazarlo
- [ ] Commit message: `Terminals: add <shortcode> (<city>)`

---

## Paso 5 — Tiempos esperados

| Fase | Tiempo |
|---|---|
| Investigación + sheet | 25-35 min/terminal |
| Master prompt → JSON | 3 min |
| Sub-prompt 3a (audit) | 3 min |
| Revisión humana | 10-15 min |
| Integrar al JSON + build + commit | 5 min |
| **Total** | **~50-60 min/terminal** |

A 4-6 terminales por sesión → 30 terminales en una semana.

---

## Paso 6 — Prioridad de terminales

### Tier 1 — Crítico (terminales referenciadas por destinos que ya escribirás)

| Terminal | Ciudad | Líneas principales | Por qué urgente |
|---|---|---|---|
| ADO Playa del Carmen | Playa del Carmen | ADO, ADO GL, OCC, Mayab | Hub del corredor caribe |
| ADO Tulum | Tulum | ADO, ADO GL, Mayab | Aparece en guía Tulum (ya existente) sin link |
| ADO Bacalar | Bacalar | ADO, OCC | Aparece en guía Bacalar (ya existente) sin link |
| ADO Chetumal | Chetumal | ADO, ADO GL, OCC | Frontera Belice |
| CAPU Puebla | Puebla | ADO, Estrella Roja, AU | Segunda ciudad colonial más visitada |
| Central Querétaro | Querétaro | ETN, Primera Plus, Flecha Amarilla | Hub del Bajío |
| CAME Mérida | Mérida | ADO, ADO GL, ADO Platino | Hub Yucatán |

### Tier 2 — Sureste y Chiapas

| Terminal | Ciudad | Líneas |
|---|---|---|
| ADO San Cristóbal | San Cristóbal de las Casas | ADO, OCC |
| ADO Palenque | Palenque | ADO, AU |
| Central Villahermosa | Villahermosa | ADO, OCC |
| Central Tuxtla Gutiérrez | Tuxtla Gutiérrez | OCC, AEXA |
| CAXA Veracruz | Veracruz | ADO, AU |

### Tier 3 — Norte y frontera

Tijuana Central · Hermosillo · Mazatlán · Tampico · Chihuahua · Saltillo · Torreón · Mexicali

### Tier 4 — Centro-bajío + Pacífico completar

SLP Central · Aguascalientes · Zacatecas · Durango · León Central · Morelia · Pátzcuaro · Cuernavaca · Pachuca · Toluca · Acapulco (Costa Line + Estrella de Oro como entradas separadas) · Zihuatanejo · Manzanillo · Los Mochis

**Recomendación de orden:** Tier 1 completo primero (7 terminales × 1h = una tarde), luego Tier 2 (5 × 1h = otra tarde), luego se reparte el resto en sesiones de 4 terminales.

---

## Fuentes de verdad recomendadas

- **Sitios oficiales de líneas** (autoridad alta):
  - ado.com.mx (ADO, ADO GL, ADO Platino, OCC, AU, SUR, Mayab, ATAH)
  - etn.com.mx (ETN, ETN Turistar Lujo)
  - primeraplus.com.mx
  - estrellablanca.com.mx (Estrella Blanca, Futura, Élite, Chihuahuenses)
  - tap.com.mx (TAP, TAP Royal)
  - tufesa.com.mx
  - senda.com.mx
  - estrelladeoro.com.mx
- **Google Maps:** coordenadas, dirección formal, fotos recientes, reseñas con timestamp de los últimos 6 meses para validar facilities y problemas operativos.
- **Wikipedia** (autoridad media): historia y datos básicos solamente; nunca para precios u horarios.
- **Reddit r/mexicotravel + r/MexicoCity:** insights de usuarios sobre seguridad y operación real (NO citar como fuente publicable, solo para tu propia validación).

## Anti-patrones

- ❌ **Pedirle a Grok "investiga el terminal ADO de Tulum y escribe la entrada"** — inventará dirección, líneas y precios.
- ❌ **Usar Google Maps Reviews como fuente de precios** — están desactualizadas.
- ❌ **Listar líneas que "antes operaban"** — solo las que operan hoy.
- ❌ **Inventar facilities porque "todas las ADO tienen X"** — verifica una por una.
- ❌ **Coordenadas con menos de 4 decimales** — el mapa renderiza un marcador a 50m de la terminal real.

---

## Referencias internas

- Schema TypeScript: [`src/types/terminal.ts`](../src/types/terminal.ts)
- Data: [`src/data/terminals.json`](../src/data/terminals.json) (8 terminales + 6 aeropuertos al inicio del workflow)
- Workflow paralelo (destinos): [`docs/grok-destination-workflow.md`](./grok-destination-workflow.md)

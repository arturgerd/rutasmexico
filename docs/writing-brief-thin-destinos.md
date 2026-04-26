# Brief de redacción — 6 destinos thin

**Para:** Arturo García (editor) o redactor freelance
**Objetivo:** llevar 6 destinos de ~50 palabras a ~7,500 palabras en `destinations-content.json` para que dejen de ser thin content y desbloqueen ranking + AdSense.

## ⚠️ Reglas de oro

1. **No usar contenido autogenerado por IA sin verificación humana.** Cada precio y horario tiene que confirmarse al menos contra una fuente oficial (sitio del hotel, ADO, etn, INM, ayuntamiento) antes de publicar.
2. **Tono editorial mexicano**, no español neutro. "Trajinera", "huachicol", "pulque", "raite", "chela" cuando aplique.
3. **Precios siempre en MXN** y como rango (mín-máx). Nunca un valor exacto.
4. **Acentos completos.** México, mañana, día, gastronomía, pirámide. Es un quality signal directo para Google.
5. **No copiar de otros sitios.** Si tomas un dato (ej. tarifa de ADO), parafraseas y agregas contexto propio.

## 📋 Estructura (replicar la de destinos completos como Cancún o CDMX)

Cada destino necesita **7 bloques** en `destinations-content.json` con `{ es, en, fr? }`:

| Sección | Palabras objetivo | Lo que debe contener |
|---|---|---|
| `howToGetThere` | 350-450 ES + 350-450 EN | Aeropuerto si tiene, vuelos desde principales ciudades, autobuses con líneas y duración, llegada en auto, traslados desde aeropuerto a centro |
| `whereToStay` | 300-400 ES + 300-400 EN | Por barrio: qué tipo de viajero encaja en cada uno, rangos de precio por noche, hoteles de referencia (sin recomendación pagada) |
| `gettingAround` | 200-300 ES + 200-300 EN | Transporte público, Uber/DiDi disponibilidad, taxis tarifas, caminar / bici, tiempos típicos centro a barrio principal |
| `foodScene` | 250-350 ES + 250-350 EN | Plato emblemático con historia mínima, 3-5 lugares concretos donde probarlo, mercados, rangos de precio |
| `bestTime` | 200-300 ES + 200-300 EN | Mes a mes: clima, temporada alta/baja, festivales y eventos clave, recomendación final |
| `dailyCost` | 250-350 ES + 250-350 EN | Presupuesto bajo / medio / alto, desglose hospedaje + comida + transporte + actividades |
| `faqs` | 5-7 Q&A con `question`+`answer` en ES y EN | Las preguntas que de verdad busca alguien que va al destino: seguridad, dinero, idioma, pagos, sargazo/clima/etc. |

**Total por destino:** ~1,800 palabras ES + ~1,800 palabras EN ≈ 3,600 palabras por destino × 6 destinos = **~22,000 palabras totales**.

A 1,500 palabras/día (sin freelancer) son 15 días de redacción. Con freelancer ~$300-500 USD por todo.

---

## 🎯 Los 6 destinos con prompts específicos

### 1. San Miguel de Allende (estado: Guanajuato)

**Por qué importa:** UNESCO World Heritage, capital cultural mexicana, mucho tráfico de búsquedas de extranjeros (especialmente estadounidenses). Audiencia con poder adquisitivo alto.

**Ángulos editoriales que funcionan:**
- Sin aeropuerto propio: vuelan a León (BJX, ~1h en taxi/bus) o Querétaro (QRO, ~1h en taxi/bus)
- Es destino #1 de bodas destino en México
- Comunidad expat estadounidense importante (relevante para "moving to Mexico" searches)

**Datos a verificar:**
- Tarifas Primera Plus desde CDMX y Querétaro
- Precios alojamiento por barrio (Centro Histórico vs San Antonio vs Atascadero)
- Festival Internacional de Cine, Día de los Locos (junio), Festival de Música de Cámara
- Ruta de mezcal y vinos del Bajío

**FAQs sugeridas:**
- ¿San Miguel de Allende es caro comparado con otras ciudades coloniales?
- ¿Cómo llego sin auto desde CDMX?
- ¿Es buen destino con niños?
- ¿Hablan inglés en restaurantes y hoteles?
- ¿Qué evento es la mejor época para ir?

---

### 2. Guanajuato (capital del estado)

**Por qué importa:** UNESCO World Heritage, Festival Cervantino (octubre — uno de los eventos culturales más importantes de Latinoamérica), turismo doméstico mexicano altísimo.

**Ángulos editoriales que funcionan:**
- "La ciudad subterránea": túneles que eran ríos, ahora vialidades
- Cuna de la Independencia (Alhóndiga de Granaditas)
- Cercanía a León (BJX) y Querétaro (QRO) sin aeropuerto propio
- Universidad de Guanajuato — vida estudiantil

**Datos a verificar:**
- Tarifas Primera Plus / ETN desde CDMX (~5h, ~$700-900 MXN)
- Hoteles boutique del centro (Edelmira, Boutique 1850) rangos
- Festival Cervantino 2026: fechas, dónde comprar boletos, dónde hospedarse durante festival
- Callejoneadas, Museo de las Momias, Pípila

**FAQs sugeridas:**
- ¿Cuántos días necesito en Guanajuato?
- ¿Vale la pena combinar Guanajuato + San Miguel?
- ¿Es muy caminable o me canso?
- ¿En el Festival Cervantino se duplican los precios?
- ¿Cuál es la mejor manera de llegar desde CDMX?

---

### 3. Monterrey (Nuevo León)

**Por qué importa:** Tercera ciudad más grande de México, sede del Mundial 2026 (Estadio BBVA), centro de negocios con mucho viajero corporativo.

**Ángulos editoriales que funcionan:**
- Mundial 2026: 3-4 partidos, transporte hacia el estadio, dónde hospedarse
- Cabrito al pastor (plato emblemático regio)
- Presa La Boca, Parque Fundidora, Cerro de la Silla
- Cercanía a McAllen/Texas — corredor binacional
- Fuerte para turismo de negocios (Hospital Zambrano Hellion, Parque TEC)

**Datos a verificar:**
- Vuelos Aeroméxico/Volaris/VivaAerobus desde CDMX (1.5h)
- Tarifas Senda y Transpaís (autobuses regionales)
- Hoteles cerca de Estadio BBVA (Holiday Inn, City Express)
- Metro de Monterrey: 3 líneas, $4.50 MXN

**FAQs sugeridas:**
- ¿Cómo llego del aeropuerto al estadio BBVA en día de partido?
- ¿Es caro Monterrey en comparación con CDMX?
- ¿Qué hago en Monterrey si voy 2 días por trabajo?
- ¿Hace mucho calor en julio (Mundial)?
- ¿Cuál es la diferencia entre San Pedro Garza García y Monterrey centro?

---

### 4. Bahías de Huatulco (Oaxaca)

**Por qué importa:** Destino playa del Pacífico, no tan saturado como Cancún, certificado EarthCheck (turismo sostenible). Audiencia mexicana clase media-alta + algunos canadienses.

**Ángulos editoriales que funcionan:**
- 9 bahías y 36 playas — diferente a "una sola playa"
- Aeropuerto pequeño pero con vuelos directos desde CDMX y conexiones desde EE.UU.
- Combinar con Puerto Escondido, Mazunte, San Agustinillo (corredor costa de Oaxaca)
- Comida: tlayudas, mole de Oaxaca, mezcal de la sierra

**Datos a verificar:**
- Vuelos Volaris/Aeroméxico CDMX → HUX (1.5h)
- Autobús OCC desde CDMX (~14h, $1,000-1,400 MXN) o desde Oaxaca capital (~6h)
- Hoteles all-inclusive (Secrets, Dreams) vs boutique (Las Brisas)
- Tour de las 7 bahías en lancha — operadores y precios

**FAQs sugeridas:**
- ¿Huatulco vs Puerto Escondido — cuál elijo?
- ¿Es seguro? (sí, pero los lectores siempre preguntan)
- ¿Hay sargazo en el Pacífico? (mucho menos que en Caribe)
- ¿Cómo llego sin pasar por Oaxaca capital?
- ¿Cuál es la mejor playa para nadar / surfear / con niños?

---

### 5. Riviera Nayarit (Nayarit + parte de Jalisco)

**Por qué importa:** Pacífico mexicano alternativo al Caribe, ya cubierto en blog Riviera Maya vs Riviera Nayarit. Sayulita es punto turístico fuerte para audiencia surfista internacional.

**Ángulos editoriales que funcionan:**
- Sayulita: pueblo bohemio, surf, mercado dominical
- Punta de Mita: lujo, golf, ballenas (dic-mar)
- Bucerías y La Cruz de Huanacaxtle: ambiente más local
- San Pancho: alternativa tranquila a Sayulita
- Aeropuerto Puerto Vallarta (PVR) — Riviera Nayarit empieza 30 min al norte

**Datos a verificar:**
- Vuelos Volaris/VivaAerobus a PVR desde CDMX, GDL, MTY
- Transfers PVR → Sayulita (~45 min, $800-1,500 MXN)
- Hoteles all-inclusive (Iberostar Playa Mita, Marival) vs boutique en Sayulita
- Tour de avistamiento de ballenas jorobadas (dic-mar): precios y operadores

**FAQs sugeridas:**
- ¿Sayulita vs Puerto Vallarta — cuál es más bohemio?
- ¿Cuándo es la temporada de ballenas?
- ¿Es seguro Sayulita? (sí, pero ha tenido issues con drogas en años recientes)
- ¿Hay sargazo? (no — Pacífico)
- ¿Es mejor en pareja o con familia?

---

### 6. Mazatlán (Sinaloa)

**Por qué importa:** Destino playa más barato del Pacífico que Cancún, Carnaval de Mazatlán es uno de los 3 más grandes del mundo. Audiencia mexicana mayoritaria + retirees canadienses.

**Ángulos editoriales que funcionan:**
- Carnaval (febrero) — uno de los eventos turísticos más grandes del país
- Centro Histórico restaurado (Plazuela Machado, Teatro Ángela Peralta)
- Malecón de 21 km — el más largo de México
- Aguachile, pescado zarandeado (gastronomía emblemática)
- Conexión Mazatlán-Durango por la "Carretera del Diablo" (puente Baluarte, el atirantado más alto de América)

**Datos a verificar:**
- Vuelos Volaris desde CDMX (~1.5h, $1,200-2,500 MXN)
- Autobús TAP desde CDMX (~16h) o Tufesa (más rápido al norte)
- Hoteles Zona Dorada vs Centro Histórico
- Carnaval 2026: fechas, alza de tarifas (50-100% en hoteles)

**FAQs sugeridas:**
- ¿Mazatlán vs Puerto Vallarta — cuál es más barato?
- ¿Es seguro Sinaloa? (Mazatlán específicamente sí, las zonas problemáticas están al norte)
- ¿Vale la pena ir solo por el Carnaval?
- ¿Cómo es la playa? (clara pero no turquesa, oleaje fuerte en zona dorada)
- ¿Cuándo es la mejor temporada para ballenas o no hay?

---

## 🔧 Cómo entregar el contenido al sitio

Cuando el redactor termina cada destino:

1. Abre `src/data/destinations-content.json`
2. Agrega una entry con la slug exacta (ej. `"san-miguel-de-allende": { ... }`)
3. Sigue la estructura de keys vista arriba (howToGetThere, whereToStay, etc.)
4. Cada bloque debe ser objeto `{ es: "...", en: "..." }` (FR opcional, no está al par)
5. `faqs` es array de `{ question: { es, en }, answer: { es, en } }`
6. Verifica con `npx next build` antes de commitear (a veces JSON malformado rompe el build)
7. Commit message tipo: `Content: san-miguel-de-allende editorial guide (~3.6k words)`
8. Push y solicitar indexación de la URL específica en Search Console

## 📊 Tracker de progreso (copiar a Sheets)

| Destino | ES escrito | EN traducido | Verificado precios | En JSON | Deployed | Search Console submitted |
|---|---|---|---|---|---|---|
| san-miguel-de-allende | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| guanajuato | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| monterrey | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| huatulco | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| riviera-nayarit | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| mazatlan | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

## 💡 Tips de redacción específicos

- **Empieza siempre con un dato concreto**, no con "Es una hermosa ciudad…". Ejemplo Guanajuato: "Guanajuato no se camina, se trepa: la ciudad colonial está construida sobre una garganta y casi cualquier dirección implica subir o bajar callejones empedrados."
- **Nombres propios > adjetivos.** "Hospédate en Hotel Boutique 1850 cerca de la Plaza de la Paz" beats "Hospédate en hoteles boutique cerca del centro".
- **Usa "tú" no "usted"** — registra hispanohablante mexicano, no formal.
- **Tablas para datos densos**: precios por aerolínea, distancias por carretera, etc. La tabla genera FAQ-like rich snippets más fácil que el párrafo.
- **Fecha de revisión visible.** Cada artículo debe tener "Última revisión: [mes año]" al inicio o pie. Coincide con la metodología publicada en `/metodologia`.

---

**Cuando tengas 1-2 destinos listos, avísame y los integro al JSON + sitemap + commit + push.** Es 30 minutos de mi parte por destino.

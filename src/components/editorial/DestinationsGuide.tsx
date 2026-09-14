import { t3 } from "@/lib/utils";

interface Props {
  locale: string;
}

export default function DestinationsGuide({ locale }: Props) {
  return (
    <article className="mt-12 bg-white rounded-2xl shadow-lg border border-arena-100 p-6 md:p-10 prose prose-arena max-w-none">
      <header className="not-prose mb-8 pb-6 border-b border-arena-100">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-arena-900 mb-3">
          {t3(locale,
            "Destinos de Mexico: guia por region",
            "Mexico destinations: guide by region"
          )}
        </h2>
        <p className="text-arena-500 text-lg">
          {t3(locale,
            "Mexico es un pais de contrastes. Cada region ofrece una experiencia de viaje totalmente distinta. Esta guia te ayuda a decidir cual se adapta mejor a ti.",
            "Mexico is a country of contrasts. Each region offers a completely different travel experience. This guide helps you decide which one fits you best."
          )}
        </p>
      </header>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Las 7 regiones turisticas",
            "The 7 tourist regions"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-6">
          {t3(locale,
            "Oficialmente, Mexico se divide en 32 estados, pero para planear un viaje lo mas practico es pensar en las 7 grandes regiones turisticas. Cada una tiene su propio clima, gastronomia, ritmo y atractivos:",
            "Officially, Mexico is divided into 32 states, but for planning a trip the easiest approach is to think in the 7 major tourist regions. Each has its own climate, cuisine, pace and attractions:"
          )}
        </p>

        <div className="not-prose space-y-4">
          <div className="p-5 bg-cyan-50 rounded-xl border border-cyan-200">
            <h4 className="font-display font-bold text-cyan-800 text-lg mb-2">
              🏖️ {t3(locale, "Peninsula de Yucatan / Caribe", "Yucatan Peninsula / Caribbean")}
            </h4>
            <p className="text-sm text-arena-700 leading-relaxed mb-2">
              {t3(locale,
                "Cancun, Playa del Carmen, Tulum, Bacalar, Merida, Holbox, Cozumel. Aguas turquesa del Caribe, cenotes, ruinas mayas y gastronomia yucateca (cochinita pibil, papadzules, sopa de lima). Es la region de playa mas visitada y la mas turistica.",
                "Cancun, Playa del Carmen, Tulum, Bacalar, Merida, Holbox, Cozumel. Turquoise Caribbean waters, cenotes, Mayan ruins and Yucatecan cuisine (cochinita pibil, papadzules, sopa de lima). Most-visited beach region and the most tourist-oriented."
              )}
            </p>
            <p className="text-xs text-arena-600">
              <strong>{t3(locale, "Ideal para:", "Ideal for:")}</strong>{" "}
              {t3(locale,
                "Primera visita a Mexico, familias, playa + cultura, parejas.",
                "First-time Mexico visit, families, beach + culture, couples."
              )}
            </p>
          </div>

          <div className="p-5 bg-orange-50 rounded-xl border border-orange-200">
            <h4 className="font-display font-bold text-orange-800 text-lg mb-2">
              🏛️ {t3(locale, "Centro de Mexico", "Central Mexico")}
            </h4>
            <p className="text-sm text-arena-700 leading-relaxed mb-2">
              {t3(locale,
                "CDMX, Puebla, Cholula, Teotihuacan, Taxco, Cuernavaca, Tepoztlan. Es el corazon cultural, politico y gastronomico del pais. Aqui estan los mejores museos, las piramides mas importantes, la ciudad mas grande y la mejor oferta gastronomica.",
                "CDMX, Puebla, Cholula, Teotihuacan, Taxco, Cuernavaca, Tepoztlan. The country's cultural, political and gastronomic heart. Here are the best museums, the most important pyramids, the largest city and the best food scene."
              )}
            </p>
            <p className="text-xs text-arena-600">
              <strong>{t3(locale, "Ideal para:", "Ideal for:")}</strong>{" "}
              {t3(locale,
                "Amantes de la historia, foodies, museos, arquitectura colonial.",
                "History lovers, foodies, museums, colonial architecture."
              )}
            </p>
          </div>

          <div className="p-5 bg-amber-50 rounded-xl border border-amber-200">
            <h4 className="font-display font-bold text-amber-800 text-lg mb-2">
              ⛪ {t3(locale, "Bajio", "Bajio")}
            </h4>
            <p className="text-sm text-arena-700 leading-relaxed mb-2">
              {t3(locale,
                "San Miguel de Allende, Guanajuato, Queretaro, Dolores Hidalgo, Morelia. Region colonial de pueblos magicos con arquitectura del siglo XVI-XVIII. Escenario de la Independencia de Mexico, calles empedradas y el mejor clima templado del pais.",
                "San Miguel de Allende, Guanajuato, Queretaro, Dolores Hidalgo, Morelia. Colonial region of Pueblos Magicos with 16th-18th century architecture. Setting of Mexican Independence, cobblestone streets and the country's best temperate climate."
              )}
            </p>
            <p className="text-xs text-arena-600">
              <strong>{t3(locale, "Ideal para:", "Ideal for:")}</strong>{" "}
              {t3(locale,
                "Viajeros culturales, escapadas romanticas, arte, gastronomia local.",
                "Cultural travelers, romantic getaways, art, local cuisine."
              )}
            </p>
          </div>

          <div className="p-5 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="font-display font-bold text-blue-800 text-lg mb-2">
              🌊 {t3(locale, "Pacifico", "Pacific")}
            </h4>
            <p className="text-sm text-arena-700 leading-relaxed mb-2">
              {t3(locale,
                "Puerto Vallarta, Sayulita, Punta Mita, Mazatlan, Puerto Escondido, Zihuatanejo, Acapulco. Atardeceres espectaculares, surf, mariscos frescos y playas mas bravas que el Caribe. Desde resorts de lujo hasta pueblos bohemios de surfistas.",
                "Puerto Vallarta, Sayulita, Punta Mita, Mazatlan, Puerto Escondido, Zihuatanejo, Acapulco. Spectacular sunsets, surf, fresh seafood and wilder waves than the Caribbean. From luxury resorts to bohemian surf towns."
              )}
            </p>
            <p className="text-xs text-arena-600">
              <strong>{t3(locale, "Ideal para:", "Ideal for:")}</strong>{" "}
              {t3(locale,
                "Surfistas, romanticos por los atardeceres, bohemios.",
                "Surfers, sunset romantics, bohemians."
              )}
            </p>
          </div>

          <div className="p-5 bg-gray-100 rounded-xl border border-gray-300">
            <h4 className="font-display font-bold text-gray-800 text-lg mb-2">
              🌵 {t3(locale, "Norte y Baja California", "North and Baja California")}
            </h4>
            <p className="text-sm text-arena-700 leading-relaxed mb-2">
              {t3(locale,
                "Los Cabos, La Paz, Loreto, Ensenada, Valle de Guadalupe, Monterrey, Chihuahua, Real de Catorce. Desiertos, canones (Barrancas del Cobre), vinedos, mar de Cortes (el 'acuario del mundo' segun Cousteau) y arquitectura norteña.",
                "Los Cabos, La Paz, Loreto, Ensenada, Valle de Guadalupe, Monterrey, Chihuahua, Real de Catorce. Deserts, canyons (Copper Canyon), vineyards, Sea of Cortez ('the world's aquarium' per Cousteau) and northern architecture."
              )}
            </p>
            <p className="text-xs text-arena-600">
              <strong>{t3(locale, "Ideal para:", "Ideal for:")}</strong>{" "}
              {t3(locale,
                "Aventureros, amantes del vino y la pesca, viajes de lujo en Los Cabos.",
                "Adventurers, wine and fishing lovers, luxury trips in Los Cabos."
              )}
            </p>
          </div>

          <div className="p-5 bg-green-50 rounded-xl border border-green-200">
            <h4 className="font-display font-bold text-green-800 text-lg mb-2">
              🌿 {t3(locale, "Sur (Oaxaca y Chiapas)", "South (Oaxaca and Chiapas)")}
            </h4>
            <p className="text-sm text-arena-700 leading-relaxed mb-2">
              {t3(locale,
                "Oaxaca, Puerto Escondido, Huatulco, San Cristobal de las Casas, Palenque, Cañon del Sumidero. La region mas indigena y con mayor riqueza cultural. Mezcal, 7 moles oaxaqueños, textiles, ruinas mayas en la selva y playas de surf.",
                "Oaxaca, Puerto Escondido, Huatulco, San Cristobal de las Casas, Palenque, Sumidero Canyon. Most indigenous region with richest cultural heritage. Mezcal, 7 Oaxacan moles, textiles, Mayan jungle ruins and surf beaches."
              )}
            </p>
            <p className="text-xs text-arena-600">
              <strong>{t3(locale, "Ideal para:", "Ideal for:")}</strong>{" "}
              {t3(locale,
                "Viajeros culturales, gastronomicos, buscadores de autenticidad.",
                "Cultural travelers, foodies, authenticity seekers."
              )}
            </p>
          </div>

          <div className="p-5 bg-teal-50 rounded-xl border border-teal-200">
            <h4 className="font-display font-bold text-teal-800 text-lg mb-2">
              🐚 {t3(locale, "Golfo de Mexico", "Gulf of Mexico")}
            </h4>
            <p className="text-sm text-arena-700 leading-relaxed mb-2">
              {t3(locale,
                "Veracruz, Xalapa, Tampico, Coatepec. La region menos turistica pero con gran riqueza: musica jarocha, cafe de altura, ruinas olmecas y totonacas, carnaval de Veracruz. Playas oscuras (arena volcanica) y clima muy humedo.",
                "Veracruz, Xalapa, Tampico, Coatepec. Least touristy region but rich in culture: jarocha music, highland coffee, Olmec and Totonac ruins, Veracruz carnival. Dark sandy beaches (volcanic) and very humid climate."
              )}
            </p>
            <p className="text-xs text-arena-600">
              <strong>{t3(locale, "Ideal para:", "Ideal for:")}</strong>{" "}
              {t3(locale,
                "Viajeros alternativos, musicales, off-the-beaten-path.",
                "Alternative travelers, music lovers, off-the-beaten-path."
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Como elegir tu destino",
            "How to choose your destination"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-4">
          {t3(locale,
            "Con 11+ destinos en el sitio es facil abrumarse. Estas preguntas rapidas te ayudan a reducir la lista:",
            "With 11+ destinations on the site it's easy to feel overwhelmed. These quick questions help you narrow down:"
          )}
        </p>
        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="p-5 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-bold text-arena-900 mb-2">
              {t3(locale, "🕐 ¿Cuantos dias tienes?", "🕐 How many days?")}
            </h4>
            <ul className="text-sm text-arena-700 space-y-1">
              <li><strong>3-4 dias:</strong> {t3(locale, "Una sola ciudad. CDMX, Oaxaca, Cancun o Puerto Vallarta.", "One city only. CDMX, Oaxaca, Cancun or Puerto Vallarta.")}</li>
              <li><strong>5-7 dias:</strong> {t3(locale, "CDMX + una escapada (Puebla, Teotihuacan). O circuito Riviera Maya.", "CDMX + one getaway (Puebla, Teotihuacan). Or Riviera Maya circuit.")}</li>
              <li><strong>10-14 dias:</strong> {t3(locale, "Combinar regiones: CDMX + Oaxaca + playa; o Riviera Maya completa + Holbox.", "Combine regions: CDMX + Oaxaca + beach; or full Riviera Maya + Holbox.")}</li>
              <li><strong>15+ dias:</strong> {t3(locale, "Recorrido largo multi-regional.", "Long multi-region tour.")}</li>
            </ul>
          </div>
          <div className="p-5 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-bold text-arena-900 mb-2">
              {t3(locale, "☀️ ¿En que epoca viajas?", "☀️ When are you traveling?")}
            </h4>
            <ul className="text-sm text-arena-700 space-y-1">
              <li><strong>{t3(locale, "Invierno (dic-mar):", "Winter (Dec-Mar):")}</strong> {t3(locale, "Cualquier destino; epoca ideal pero mas cara.", "Any destination; ideal time but pricier.")}</li>
              <li><strong>{t3(locale, "Primavera (abr-jun):", "Spring (Apr-Jun):")}</strong> {t3(locale, "Bajio e interior (CDMX, Oaxaca). Evita costas por calor extremo.", "Bajio and interior. Avoid coasts due to extreme heat.")}</li>
              <li><strong>{t3(locale, "Verano (jul-sep):", "Summer (Jul-Sep):")}</strong> {t3(locale, "Baja California (ballenas). Evita Caribe por huracanes.", "Baja California (whales). Avoid Caribbean due to hurricanes.")}</li>
              <li><strong>{t3(locale, "Otoño (oct-nov):", "Fall (Oct-Nov):")}</strong> {t3(locale, "Oaxaca (Dia de Muertos), CDMX, Bajio.", "Oaxaca (Day of the Dead), CDMX, Bajio.")}</li>
            </ul>
          </div>
          <div className="p-5 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-bold text-arena-900 mb-2">
              {t3(locale, "💰 ¿Cual es tu presupuesto?", "💰 What's your budget?")}
            </h4>
            <ul className="text-sm text-arena-700 space-y-1">
              <li><strong>{t3(locale, "Economico:", "Budget:")}</strong> {t3(locale, "Oaxaca, Chiapas, Veracruz, Bajio. Puedes viajar con $800-1,500 MXN/dia.", "Oaxaca, Chiapas, Veracruz, Bajio. Travel on $800-1,500 MXN/day.")}</li>
              <li><strong>{t3(locale, "Medio:", "Mid:")}</strong> {t3(locale, "CDMX, Puerto Vallarta, Playa del Carmen. Presupuesto $1,500-3,000 MXN/dia.", "CDMX, Puerto Vallarta, Playa del Carmen. Budget $1,500-3,000 MXN/day.")}</li>
              <li><strong>{t3(locale, "Alto:", "Luxury:")}</strong> {t3(locale, "Los Cabos, Tulum, Punta Mita. Desde $4,000 MXN/dia.", "Los Cabos, Tulum, Punta Mita. From $4,000 MXN/day.")}</li>
            </ul>
          </div>
          <div className="p-5 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-bold text-arena-900 mb-2">
              {t3(locale, "👥 ¿Con quien viajas?", "👥 Who are you with?")}
            </h4>
            <ul className="text-sm text-arena-700 space-y-1">
              <li><strong>{t3(locale, "Familias con ninos:", "Families with kids:")}</strong> {t3(locale, "Riviera Maya (resorts), CDMX (museos), Huatulco.", "Riviera Maya (resorts), CDMX (museums), Huatulco.")}</li>
              <li><strong>{t3(locale, "Parejas:", "Couples:")}</strong> {t3(locale, "San Miguel de Allende, Tulum, Los Cabos.", "San Miguel de Allende, Tulum, Los Cabos.")}</li>
              <li><strong>{t3(locale, "Amigos:", "Friends:")}</strong> {t3(locale, "Cancun, Puerto Vallarta, CDMX.", "Cancun, Puerto Vallarta, CDMX.")}</li>
              <li><strong>{t3(locale, "Solo/viajero:", "Solo:")}</strong> {t3(locale, "Oaxaca, CDMX, Puerto Escondido, San Cristobal.", "Oaxaca, CDMX, Puerto Escondido, San Cristobal.")}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Combinaciones populares",
            "Popular combinations"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-4">
          {t3(locale,
            "Los destinos en Mexico se combinan bien en circuitos. Estas rutas son las mas populares por complementariedad:",
            "Destinations in Mexico combine well in circuits. These routes are the most popular for how they complement each other:"
          )}
        </p>
        <ul className="space-y-3 text-arena-700">
          <li>
            <strong>{t3(locale, "CDMX + Oaxaca (7-10 dias):", "CDMX + Oaxaca (7-10 days):")}</strong>{" "}
            {t3(locale,
              "La combinacion mas recomendada para viajeros culturales. Dos ciudades con gastronomia reconocida UNESCO conectadas por vuelo de 50 minutos.",
              "Most recommended combination for cultural travelers. Two UNESCO-recognized food cities connected by a 50-minute flight."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Riviera Maya completa (7-10 dias):", "Full Riviera Maya (7-10 days):")}</strong>{" "}
            {t3(locale,
              "Cancun → Playa del Carmen → Tulum → Bacalar. Todo por autobus ADO, sin necesidad de auto.",
              "Cancun → Playa del Carmen → Tulum → Bacalar. All by ADO bus, no car needed."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Circuito Bajio (5-7 dias):", "Bajio circuit (5-7 days):")}</strong>{" "}
            {t3(locale,
              "Queretaro → San Miguel de Allende → Guanajuato → Dolores Hidalgo. Pueblos coloniales conectados por autobus de primera clase cada 1-2 horas.",
              "Queretaro → San Miguel de Allende → Guanajuato → Dolores Hidalgo. Colonial towns connected by first-class bus every 1-2 hours."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Pacifico romantico (7 dias):", "Romantic Pacific (7 days):")}</strong>{" "}
            {t3(locale,
              "Puerto Vallarta + Sayulita + Punta Mita. Conectados por autobus publico de 30-60 minutos.",
              "Puerto Vallarta + Sayulita + Punta Mita. Connected by 30-60 minute local buses."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Baja completa (10-14 dias):", "Full Baja (10-14 days):")}</strong>{" "}
            {t3(locale,
              "Los Cabos → Todos Santos → La Paz → Loreto. Renta de auto obligatoria.",
              "Los Cabos → Todos Santos → La Paz → Loreto. Rental car required."
            )}
          </li>
        </ul>
      </section>
    </article>
  );
}

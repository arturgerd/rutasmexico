import { t3 } from "@/lib/utils";

interface Props {
  locale: string;
}

export default function RoutesGuide({ locale }: Props) {
  return (
    <article className="mt-8 bg-white rounded-2xl shadow-lg border border-arena-100 p-6 md:p-10 prose prose-arena max-w-none">
      <header className="not-prose mb-8 pb-6 border-b border-arena-100">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-arena-900 mb-3">
          {t3(locale,
            "Cómo moverse por México: vuelo, autobús o auto",
            "How to get around Mexico: plane, bus or car",
            "Comment se déplacer au Mexique : avion, bus ou voiture"
          )}
        </h2>
        <p className="text-arena-500 text-lg">
          {t3(locale,
            "Guía para elegir el mejor transporte entre ciudades según distancia, presupuesto y experiencia. Comparativa real con tiempos, precios y recomendaciones por ruta.",
            "Guide to picking the best transport between cities by distance, budget and experience. Real comparison with times, prices and per-route recommendations.",
            "Guide pour choisir le meilleur transport entre les villes selon la distance, le budget et l'expérience."
          )}
        </p>
      </header>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Comparativa rápida por distancia",
            "Quick comparison by distance",
            "Comparaison rapide par distance"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-4">
          {t3(locale,
            "México es un país grande (1,964,000 km²). La distancia entre origen y destino es el factor clave para elegir transporte:",
            "Mexico is a large country (1,964,000 km²). Distance between origin and destination is the key factor for choosing transport:",
            "Le Mexique est un grand pays. La distance est le facteur clé pour choisir le transport."
          )}
        </p>
        <div className="not-prose overflow-x-auto my-6">
          <table className="min-w-full text-sm">
            <thead className="bg-arena-100">
              <tr>
                <th className="text-left p-3 font-semibold text-arena-800">{t3(locale, "Distancia", "Distance", "Distance")}</th>
                <th className="text-left p-3 font-semibold text-arena-800">{t3(locale, "Mejor opción", "Best option", "Meilleure option")}</th>
                <th className="text-left p-3 font-semibold text-arena-800">{t3(locale, "Alternativa", "Alternative", "Alternative")}</th>
                <th className="text-left p-3 font-semibold text-arena-800">{t3(locale, "Evitar", "Avoid", "Éviter")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-arena-100 bg-white">
              <tr><td className="p-3 font-medium">&lt; 200 km</td><td className="p-3">🚌 {t3(locale, "Autobús", "Bus", "Bus")}</td><td className="p-3">🚗 {t3(locale, "Auto", "Car", "Voiture")}</td><td className="p-3">✈️ {t3(locale, "Avión (muy caro)", "Plane (too expensive)", "Avion (trop cher)")}</td></tr>
              <tr><td className="p-3 font-medium">200-500 km</td><td className="p-3">🚌 {t3(locale, "Autobús", "Bus", "Bus")}</td><td className="p-3">🚗 {t3(locale, "Auto / Avión", "Car / Plane", "Voiture / Avion")}</td><td className="p-3">—</td></tr>
              <tr><td className="p-3 font-medium">500-900 km</td><td className="p-3">🚌 / ✈️</td><td className="p-3">{t3(locale, "Cualquiera", "Either", "Au choix")}</td><td className="p-3">—</td></tr>
              <tr><td className="p-3 font-medium">900-1,500 km</td><td className="p-3">✈️ {t3(locale, "Avión", "Plane", "Avion")}</td><td className="p-3">🚌 {t3(locale, "Autobús nocturno", "Overnight bus", "Bus de nuit")}</td><td className="p-3">🚗 {t3(locale, "Auto (largo)", "Car (long)", "Voiture (long)")}</td></tr>
              <tr><td className="p-3 font-medium">&gt; 1,500 km</td><td className="p-3">✈️ {t3(locale, "Avión", "Plane", "Avion")}</td><td className="p-3">—</td><td className="p-3">🚗 {t3(locale, "Auto (inseguro)", "Car (unsafe/long)", "Voiture")}</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Cuándo conviene el vuelo",
            "When the plane wins",
            "Quand l'avion l'emporte"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-3">
          {t3(locale,
            "El vuelo es la mejor opción para distancias de más de 900 km o cuando cruzas el país (norte-sur, este-oeste). Rutas donde casi siempre conviene volar:",
            "Flights win for distances over 900 km or when crossing the country (north-south, east-west). Routes where flying is almost always better:",
            "L'avion gagne pour les distances de plus de 900 km ou pour traverser le pays."
          )}
        </p>
        <ul className="space-y-2 text-arena-700 mb-4">
          <li>{t3(locale, "CDMX ↔ Cancún, Los Cabos, Tijuana, Mérida, Villahermosa, Chihuahua.", "Mexico City ↔ Cancun, Los Cabos, Tijuana, Merida, Villahermosa, Chihuahua.", "Mexico ↔ Cancun, Los Cabos, Tijuana, Merida.")}</li>
          <li>{t3(locale, "Guadalajara ↔ Cancún, Mérida, Los Cabos, Monterrey.", "Guadalajara ↔ Cancun, Merida, Los Cabos, Monterrey.", "Guadalajara ↔ Cancun, Merida.")}</li>
          <li>{t3(locale, "Monterrey ↔ Cancún, Los Cabos, Tijuana.", "Monterrey ↔ Cancun, Los Cabos, Tijuana.", "Monterrey ↔ Cancun, Los Cabos.")}</li>
          <li>{t3(locale, "Cualquier ruta que en autobús tarde más de 12 horas.", "Any route over 12 hours by bus.", "Toute route de plus de 12 h en bus.")}</li>
        </ul>
        <p className="text-arena-700 leading-relaxed">
          {t3(locale,
            "Con aerolíneas de bajo costo (Volaris, VivaAerobus) y reserva anticipada, un vuelo doméstico de 1,000 km puede costar 900-1,500 MXN, similar a un autobús de lujo, pero ahorrándote 8-10 horas. El vuelo gana claramente si el tiempo es tan valioso como el dinero.",
            "With low-cost airlines (Volaris, VivaAerobus) and advance booking, a 1,000 km domestic flight can cost 900-1,500 MXN, similar to a luxury bus, but saves 8-10 hours. Flying clearly wins if time is as valuable as money.",
            "Avec les low-cost, un vol de 1 000 km peut coûter 900-1 500 MXN, similaire au bus de luxe, mais économise 8-10 h."
          )}
        </p>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Cuándo conviene el autobús",
            "When the bus wins",
            "Quand le bus l'emporte"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-3">
          {t3(locale,
            "El autobús es rey en distancias cortas y medias (hasta 600 km). Razones por las que a menudo supera al avión:",
            "Bus rules on short and medium distances (up to 600 km). Reasons why it often beats flying:",
            "Le bus domine sur les courtes et moyennes distances (jusqu'à 600 km)."
          )}
        </p>
        <ul className="space-y-2 text-arena-700 mb-4">
          <li>
            <strong>{t3(locale, "Terminales en el centro:", "Terminals downtown:", "Gares en centre-ville :")}</strong>{" "}
            {t3(locale,
              "No pierdes 2+ horas yendo y regresando del aeropuerto. Por ejemplo, CDMX a Puebla: 2 horas en autobús vs. 45 min de vuelo + 2.5 horas de aeropuertos = 3.25 horas en total. El autobús gana.",
              "No 2+ hours going to/from the airport. Mexico City to Puebla: 2 hours by bus vs. 45 min flight + 2.5 hours airports = 3.25 hours total. Bus wins.",
              "Pas de temps perdu vers les aéroports. Mexico-Puebla : bus gagne."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Más económico:", "Cheaper:", "Moins cher :")}</strong>{" "}
            {t3(locale,
              "Hasta 70% más barato. Un CDMX-Querétaro en primera clase cuesta 350 MXN; el vuelo equivalente con extras rara vez baja de 1,500 MXN.",
              "Up to 70% cheaper. Mexico City-Queretaro first class costs 350 MXN; the equivalent flight with extras rarely drops below 1,500 MXN.",
              "Jusqu'à 70% moins cher."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Sin límites de equipaje:", "No baggage limits:", "Pas de limite bagages :")}</strong>{" "}
            {t3(locale,
              "Todas las líneas permiten al menos 25 kg documentados + equipaje de mano, sin cargos extra.",
              "All lines allow at least 25 kg checked + carry-on, no extra fees.",
              "Toutes les compagnies permettent au moins 25 kg enregistrés."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Nocturno = noche de hotel:", "Overnight = hotel night saved:", "Nuit = hôtel économisé :")}</strong>{" "}
            {t3(locale,
              "Los autobuses de lujo con asientos cama (ADO Platino, ETN) en rutas de 8-12 horas te permiten llegar a tu destino al amanecer sin pagar una noche de hotel.",
              "Luxury buses with bed seats (ADO Platino, ETN) on 8-12 hour routes let you arrive at dawn without paying a hotel night.",
              "Les bus lit permettent d'arriver à l'aube sans payer de nuit d'hôtel."
            )}
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Cuando conviene rentar auto",
            "When a rental car wins",
            "Quand louer une voiture"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-3">
          {t3(locale,
            "Rentar auto tiene ventajas claras en ciertas regiones y desventajas en otras. Los casos donde sí conviene:",
            "Renting a car has clear advantages in certain regions and disadvantages in others. Cases where it makes sense:",
            "La location de voiture a des avantages selon la région."
          )}
        </p>
        <ul className="space-y-2 text-arena-700 mb-4">
          <li>
            <strong>{t3(locale, "Riviera Maya y Yucatán:", "Riviera Maya and Yucatan:", "Riviera Maya et Yucatan :")}</strong>{" "}
            {t3(locale,
              "Para visitar cenotes, pueblos mayas, zonas arqueológicas (Chichén Itzá, Ek Balam, Uxmal) y playas fuera del circuito turístico. Las carreteras son excelentes, rectas y muy seguras.",
              "To visit cenotes, Mayan towns, archaeological sites (Chichen Itza, Ek Balam, Uxmal) and off-the-beaten-path beaches. Highways are excellent, straight and very safe.",
              "Pour les cenotes, sites mayas, plages isolées. Routes excellentes."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Baja California Sur:", "Baja California Sur:", "Basse-Californie du Sud :")}</strong>{" "}
            {t3(locale,
              "Para la ruta Los Cabos-Todos Santos-La Paz-Loreto. El transporte público es limitado y las distancias son grandes con paisajes impresionantes.",
              "For the Los Cabos-Todos Santos-La Paz-Loreto route. Public transport is limited and distances are long with stunning landscapes.",
              "Pour la route Los Cabos-La Paz."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Oaxaca (fuera de la capital):", "Oaxaca (outside the capital):", "Oaxaca (hors capitale) :")}</strong>{" "}
            {t3(locale,
              "Para visitar Monte Albán, Hierve el Agua, Mitla, Teotitlán, los pueblos de los Valles Centrales. Los colectivos van pero con horarios limitados.",
              "To visit Monte Alban, Hierve el Agua, Mitla, Teotitlan, the Valles Centrales towns. Collectivos run but with limited schedules.",
              "Pour Monte Alban, Hierve el Agua, Mitla."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Pueblos Mágicos en circuito:", "Pueblos Magicos route:", "Route des Pueblos Magicos :")}</strong>{" "}
            {t3(locale,
              "Tepoztlán, Malinalco, Valle de Bravo, Real del Monte; o la ruta San Miguel-Guanajuato-Dolores Hidalgo.",
              "Tepoztlan, Malinalco, Valle de Bravo, Real del Monte; or San Miguel-Guanajuato-Dolores Hidalgo route.",
              "Pour la route des villages magiques."
            )}
          </li>
        </ul>
        <p className="text-arena-700 leading-relaxed mb-3">
          {t3(locale,
            "Cuando NO rentes auto:",
            "When NOT to rent a car:",
            "Quand ne PAS louer une voiture :"
          )}
        </p>
        <ul className="space-y-2 text-arena-700">
          <li>
            {t3(locale,
              "CDMX: tráfico severo, estacionamiento costoso (150-500 MXN/día), restricciones de circulación (Hoy No Circula). Mejor Uber/DiDi, metro y Metrobús.",
              "Mexico City: severe traffic, expensive parking (150-500 MXN/day), driving restrictions (Hoy No Circula). Better use Uber/DiDi, metro and Metrobus.",
              "Mexico : trafic intense, parking cher. Préférez Uber/métro."
            )}
          </li>
          <li>
            {t3(locale,
              "Zona Hotelera de Cancún: te mueves caminando o con autobús público por 12 MXN. Los estacionamientos son caros y los resorts ya tienen todo.",
              "Cancun Hotel Zone: walk or use local bus (12 MXN). Parking is expensive and resorts have everything.",
              "Zone hôtelière de Cancun : marche ou bus local."
            )}
          </li>
          <li>
            {t3(locale,
              "Centros históricos coloniales (Guanajuato, Oaxaca, Morelia, San Miguel): calles empedradas, estrechas y sin estacionamiento.",
              "Colonial historic centers (Guanajuato, Oaxaca, Morelia, San Miguel): cobblestone streets, narrow, no parking.",
              "Centres historiques coloniaux : rues étroites."
            )}
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Rutas turísticas populares y cómo recorrerlas",
            "Popular tourist routes and how to travel them",
            "Itinéraires touristiques populaires"
          )}
        </h3>
        <div className="not-prose space-y-5 my-6">
          <div className="p-5 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-display font-bold text-arena-900 mb-2">
              🌅 {t3(locale, "Ruta del Tequila (Jalisco)", "Tequila Route (Jalisco)", "Route de la Tequila")}
            </h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "Guadalajara → Tequila → Amatitán. Distancia 60 km. Se hace en un día rentando auto (700 MXN) o con el tour del 'Tequila Express' en tren (1,500-2,500 MXN incluyendo degustación). También hay autobuses económicos cada 30 min de la Central Vieja.",
                "Guadalajara → Tequila → Amatitan. 60 km total. Day trip by rental car (700 MXN) or 'Tequila Express' train tour (1,500-2,500 MXN with tasting). Cheap buses every 30 min from Central Vieja.",
                "Guadalajara → Tequila, 60 km. En voiture, train touristique ou bus."
              )}
            </p>
          </div>
          <div className="p-5 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-display font-bold text-arena-900 mb-2">
              🏛️ {t3(locale, "Ruta Colonial del Bajío", "Colonial Bajio Route", "Route coloniale du Bajio")}
            </h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "Querétaro → San Miguel de Allende → Dolores Hidalgo → Guanajuato → Morelia. 4-7 días. Todo conectado por autobús de primera clase (Primera Plus, ETN) cada pocas horas. Cada tramo entre ciudades toma 1-2 horas. No necesitas auto; los centros son peatonales.",
                "Queretaro → San Miguel de Allende → Dolores Hidalgo → Guanajuato → Morelia. 4-7 days. All connected by first class bus every few hours. Each city-to-city leg is 1-2 hours. No car needed; centers are pedestrian.",
                "Querétaro → San Miguel → Guanajuato → Morelia. 4-7 jours en bus. Pas besoin de voiture."
              )}
            </p>
          </div>
          <div className="p-5 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-display font-bold text-arena-900 mb-2">
              🏖️ {t3(locale, "Ruta Caribeña", "Caribbean Route", "Route des Caraïbes")}
            </h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "Cancún → Playa del Carmen → Tulum → Bacalar. 350 km total. Autobús ADO recorre toda la costa con 10+ corridas diarias. Alternativa: rentar auto para flexibilidad con cenotes y playas intermedias. Extensión popular: ferry a Isla Mujeres, Cozumel o Holbox.",
                "Cancun → Playa del Carmen → Tulum → Bacalar. 350 km total. ADO buses cover the whole coast with 10+ daily runs. Alternative: rent a car for cenote and beach flexibility. Popular extension: ferry to Isla Mujeres, Cozumel or Holbox.",
                "Cancun → Tulum → Bacalar. 350 km. Bus ADO couvre toute la côte."
              )}
            </p>
          </div>
          <div className="p-5 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-display font-bold text-arena-900 mb-2">
              🧉 {t3(locale, "Ruta de Chiapas", "Chiapas Route", "Route du Chiapas")}
            </h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "Tuxtla Gutiérrez → San Cristóbal de las Casas → Palenque → Cascadas de Agua Azul. 7-10 días. Combinar vuelo (Tuxtla) + autobús + colectivo. El tramo San Cristóbal-Palenque de 5 horas suele hacerse en tour por seguridad y logística.",
                "Tuxtla Gutierrez → San Cristobal → Palenque → Agua Azul Falls. 7-10 days. Combine flight (Tuxtla) + bus + colectivo. The San Cristobal-Palenque 5-hour leg is usually done by tour for safety and logistics.",
                "Tuxtla → San Cristobal → Palenque. 7-10 jours. Vol + bus + colectivo."
              )}
            </p>
          </div>
          <div className="p-5 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-display font-bold text-arena-900 mb-2">
              🌊 {t3(locale, "Costa del Pacífico", "Pacific Coast", "Côte Pacifique")}
            </h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "Puerto Vallarta → Sayulita → San Pancho → Punta Mita. 60 km total en la Riviera Nayarit. Hay autobuses públicos económicos cada 30 min. Para Sur: Puerto Vallarta → Manzanillo por carretera costera (5 horas).",
                "Puerto Vallarta → Sayulita → San Pancho → Punta Mita. 60 km total in Riviera Nayarit. Cheap local buses every 30 min. South: Puerto Vallarta → Manzanillo via coastal road (5 hours).",
                "Puerto Vallarta → Sayulita → Punta Mita. Bus locaux fréquents."
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Tips generales para moverse por México",
            "General tips for getting around Mexico",
            "Conseils généraux"
          )}
        </h3>
        <ul className="space-y-2 text-arena-700">
          <li>
            {t3(locale,
              "Google Maps funciona bien en todo el país, incluso offline si descargas las zonas.",
              "Google Maps works well nationwide, even offline if you download areas.",
              "Google Maps fonctionne partout, même hors ligne."
            )}
          </li>
          <li>
            {t3(locale,
              "Uber y DiDi operan en todas las ciudades grandes. En ciudades medianas, DiDi suele tener más cobertura.",
              "Uber and DiDi operate in all large cities. In mid-sized cities, DiDi often has more coverage.",
              "Uber et DiDi dans toutes les grandes villes."
            )}
          </li>
          <li>
            {t3(locale,
              "Las casetas de cuota (peaje) aceptan efectivo y tarjeta, algunas aceptan TAG. Llevar 300-500 MXN en efectivo si vas por carretera.",
              "Toll booths accept cash and card, some accept TAG. Bring 300-500 MXN cash if driving.",
              "Les péages acceptent cash et carte. Prévoir 300-500 MXN."
            )}
          </li>
          <li>
            {t3(locale,
              "Evita manejar de noche en carreteras libres fuera de autopistas principales. Ganado suelto, baches y falta de iluminación.",
              "Avoid driving at night on non-toll roads outside main highways. Loose livestock, potholes, no lighting.",
              "Évitez de conduire la nuit hors des autoroutes principales."
            )}
          </li>
          <li>
            {t3(locale,
              "En zonas turísticas, los taxis autorizados tienen una tarifa fija y son más caros que Uber. En aeropuertos, compra el boleto dentro de la terminal.",
              "In tourist areas, authorized taxis have fixed rates and cost more than Uber. At airports, buy the voucher inside the terminal.",
              "Dans les zones touristiques, les taxis autorisés sont plus chers qu'Uber."
            )}
          </li>
          <li>
            {t3(locale,
              "Compra boletos de autobús al menos con una semana de antelación en temporada alta. En baja puedes comprar el mismo día.",
              "Buy bus tickets at least a week ahead in peak season. Low season you can buy same-day.",
              "Achetez les billets de bus 1 semaine à l'avance en haute saison."
            )}
          </li>
        </ul>
      </section>
    </article>
  );
}

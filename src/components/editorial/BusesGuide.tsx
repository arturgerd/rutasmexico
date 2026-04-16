import { t3 } from "@/lib/utils";

interface Props {
  locale: string;
}

export default function BusesGuide({ locale }: Props) {
  return (
    <article className="mt-12 bg-white rounded-2xl shadow-lg border border-arena-100 p-6 md:p-10 prose prose-arena max-w-none">
      <header className="not-prose mb-8 pb-6 border-b border-arena-100">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-arena-900 mb-3">
          {t3(locale,
            "Viajar en autobus por Mexico: guia completa 2026",
            "Traveling by bus in Mexico: complete 2026 guide",
            "Voyager en bus au Mexique : guide complet 2026"
          )}
        </h2>
        <p className="text-arena-500 text-lg">
          {t3(locale,
            "Lineas, clases de servicio, terminales, precios, seguridad y rutas populares. El sistema de autobuses mexicano es uno de los mejores del mundo: comodo, puntual y economico.",
            "Lines, service classes, terminals, prices, safety and popular routes. Mexico's bus system is one of the best in the world: comfortable, punctual and affordable.",
            "Lignes, classes de service, gares, prix, sécurité et itinéraires populaires. Le système de bus mexicain est parmi les meilleurs au monde."
          )}
        </p>
      </header>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Por que viajar en autobus en Mexico",
            "Why travel by bus in Mexico",
            "Pourquoi voyager en bus au Mexique"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-3">
          {t3(locale,
            "A diferencia de muchos paises donde el autobus es la opcion barata y poco comoda, en Mexico los autobuses de primera clase y ejecutivos compiten directamente con el avion en comodidad y a menudo ganan en precio. Un autobus ejecutivo CDMX-Guadalajara cuesta aproximadamente la mitad de un vuelo y, contando el tiempo de traslado a aeropuertos, la diferencia real de tiempo es minima.",
            "Unlike many countries where buses are cheap but uncomfortable, in Mexico first-class and executive buses compete directly with planes for comfort and often win on price. An executive bus Mexico City-Guadalajara costs about half of a flight and, once you factor airport commute times, the real time difference is minimal.",
            "Au Mexique, les bus première classe et exécutifs rivalisent directement avec l'avion en termes de confort et gagnent souvent sur le prix."
          )}
        </p>
        <p className="text-arena-700 leading-relaxed">
          {t3(locale,
            "Las terminales suelen estar cerca del centro, los autobuses salen con puntualidad, y las carreteras de cuota (pagadas) conectan casi todos los destinos importantes con tramos modernos. Para distancias de hasta 7-8 horas, el autobus es a menudo la mejor opcion calidad-precio.",
            "Terminals are usually near city centers, buses leave on time, and toll highways connect most major destinations with modern roads. For distances up to 7-8 hours, the bus is often the best value.",
            "Les gares routières sont souvent près des centres-villes, les bus partent à l'heure. Pour les distances jusqu'à 7-8 heures, le bus est souvent le meilleur choix."
          )}
        </p>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Principales lineas de autobus en Mexico",
            "Main bus lines in Mexico",
            "Principales compagnies de bus au Mexique"
          )}
        </h3>
        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="p-5 bg-terracotta-50 rounded-xl border border-terracotta-100">
            <h4 className="font-display font-bold text-terracotta-700 mb-2">🚌 ADO</h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "La linea mas grande y conocida del sureste mexicano. Cubre toda la Peninsula de Yucatan, Veracruz, Oaxaca y la costa del Golfo. Ofrece tres niveles: ADO (primera clase), ADO GL (mas comodo, menos paradas) y ADO Platino (lujo con asientos tipo cama, solo 24 pasajeros). Sus terminales son limpias y modernas, con sistemas de abordaje tipo aeropuerto.",
                "The largest and most well-known line in southeastern Mexico. Covers all Yucatan Peninsula, Veracruz, Oaxaca and the Gulf coast. Offers three levels: ADO (first class), ADO GL (more comfortable, fewer stops) and ADO Platino (luxury with bed-like seats, only 24 passengers). Clean, modern terminals with airport-style boarding.",
                "La plus grande compagnie du sud-est mexicain. Trois niveaux : ADO, ADO GL et ADO Platino (luxe)."
              )}
            </p>
          </div>
          <div className="p-5 bg-azul-50 rounded-xl border border-azul-100">
            <h4 className="font-display font-bold text-azul-700 mb-2">🚌 ETN Turistar</h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "Considerada la linea de autobuses mas lujosa de Mexico. Opera en el centro y occidente: CDMX, Guadalajara, Morelia, Leon, Aguascalientes, Puerto Vallarta. Solo tiene servicio de lujo con 24 asientos reclinables 170 grados, pantalla individual, WiFi y servicio de bocadillos. El asiento cuesta casi lo doble que primera clase pero se nota.",
                "Considered Mexico's most luxurious bus line. Operates in central and western Mexico: Mexico City, Guadalajara, Morelia, Leon, Aguascalientes, Puerto Vallarta. Only luxury service with 24 seats reclining 170 degrees, personal screens, WiFi and snack service. Nearly double the price of first class but noticeably better.",
                "Considérée comme la compagnie la plus luxueuse. Sièges inclinables à 170°, écran individuel."
              )}
            </p>
          </div>
          <div className="p-5 bg-jade-50 rounded-xl border border-jade-100">
            <h4 className="font-display font-bold text-jade-700 mb-2">🚌 Primera Plus</h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "Parte del grupo Flecha Amarilla (el mayor de Mexico). Fuerte en el Bajio y centro-occidente: Guanajuato, Queretaro, San Miguel de Allende, Leon, Aguascalientes, Guadalajara. Buena relacion calidad-precio, asientos amplios y servicios basicos (agua, snack, WiFi en algunas unidades).",
                "Part of Flecha Amarilla group (Mexico's largest). Strong in the Bajio and central-west: Guanajuato, Queretaro, San Miguel de Allende, Leon, Aguascalientes, Guadalajara. Good value, roomy seats and basic amenities (water, snack, WiFi on some units).",
                "Du groupe Flecha Amarilla. Fort dans le Bajio. Bon rapport qualité-prix."
              )}
            </p>
          </div>
          <div className="p-5 bg-oro-50 rounded-xl border border-oro-100">
            <h4 className="font-display font-bold text-oro-700 mb-2">🚌 Estrella Roja</h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "Especialista en la ruta CDMX-Puebla y alrededores (Cholula, Tlaxcala). Sale con mucha frecuencia del TAPO y del aeropuerto AICM directo a Puebla. Su servicio Diamante tiene pocos asientos y es muy comodo.",
                "Specialist on the Mexico City-Puebla route and surroundings (Cholula, Tlaxcala). Frequent departures from TAPO and from AICM airport directly to Puebla. Their Diamante service has few seats and is very comfortable.",
                "Spécialiste de la route Mexico-Puebla. Départs fréquents."
              )}
            </p>
          </div>
          <div className="p-5 bg-terracotta-50 rounded-xl border border-terracotta-100">
            <h4 className="font-display font-bold text-terracotta-700 mb-2">🚌 Omnibus de Mexico</h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "Red nacional amplia, especialmente fuerte hacia el norte (Monterrey, Chihuahua, Saltillo) y a la frontera con Estados Unidos. Opera cruces transfronterizos con Greyhound. Clases Plus y Lujo.",
                "Extensive national network, especially strong toward the north (Monterrey, Chihuahua, Saltillo) and US border. Operates cross-border connections with Greyhound. Plus and Luxury classes.",
                "Réseau national étendu, fort vers le nord et la frontière américaine."
              )}
            </p>
          </div>
          <div className="p-5 bg-azul-50 rounded-xl border border-azul-100">
            <h4 className="font-display font-bold text-azul-700 mb-2">🚌 {t3(locale, "Otras importantes", "Other major lines", "Autres importantes")}</h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "Pullman de Morelos (CDMX-Cuernavaca-Acapulco), OCC y AU (sureste), Futura (norte), Estrella de Oro (Costa del Pacifico), Caminante, TAP (Pacifico Norte) y Transpais (Noreste). Cada region tiene lineas con presencia dominante.",
                "Pullman de Morelos (Mexico City-Cuernavaca-Acapulco), OCC and AU (southeast), Futura (north), Estrella de Oro (Pacific coast), Caminante, TAP (north Pacific) and Transpais (northeast). Each region has dominant lines.",
                "Chaque région a ses lignes dominantes : Pullman, OCC, Futura, Estrella de Oro."
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Clases de servicio: que diferencia hay",
            "Service classes: what's the difference",
            "Classes de service : quelle différence"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-4">
          {t3(locale,
            "En Mexico existen basicamente cuatro niveles de servicio. El precio entre uno y otro puede variar hasta el doble, pero la comodidad tambien. Esta es la diferencia practica:",
            "In Mexico there are basically four service levels. Price between them can double, but so does comfort. The practical difference:",
            "Il y a quatre niveaux de service. Le prix peut doubler mais le confort aussi."
          )}
        </p>
        <div className="not-prose space-y-3 my-6">
          <div className="p-5 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-bold text-arena-900 mb-1">
              {t3(locale, "Economico / Segunda clase", "Economy / Second class", "Économique / Deuxième classe")}
            </h4>
            <p className="text-sm text-arena-700">
              {t3(locale,
                "Llamado tambien 'corrida'. Hace muchas paradas en poblados, asientos basicos, sin bano o con bano minimo, generalmente por carreteras libres. Muy barato pero tarda mas. Util solo para rutas cortas de 1-2 horas. Lineas: Estrella Blanca (segunda), Flecha Amarilla en algunas rutas.",
                "Also called 'corrida'. Many small-town stops, basic seats, minimal or no bathroom, usually on non-toll roads. Very cheap but slow. Only useful for short 1-2 hour routes.",
                "Aussi appelé 'corrida'. Nombreux arrêts, sièges basiques, lent mais très bon marché."
              )}
            </p>
          </div>
          <div className="p-5 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-bold text-arena-900 mb-1">
              {t3(locale, "Primera clase", "First class", "Première classe")}
            </h4>
            <p className="text-sm text-arena-700">
              {t3(locale,
                "El servicio mas comun. Autopistas de cuota, asientos reclinables con descansapies, bano a bordo, aire acondicionado, pantallas con peliculas, WiFi. ADO, Primera Plus, Estrella de Oro. Paradas limitadas o sin paradas entre origen y destino. Un viaje tipico de 5 horas cuesta 500-800 MXN.",
                "The most common service. Toll highways, reclining seats with footrest, onboard bathroom, AC, screens with movies, WiFi. ADO, Primera Plus, Estrella de Oro. Limited or no stops between origin and destination. A typical 5-hour trip costs 500-800 MXN.",
                "Service le plus courant. Autoroutes à péage, sièges inclinables, climatisation, toilettes, WiFi."
              )}
            </p>
          </div>
          <div className="p-5 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-bold text-arena-900 mb-1">
              {t3(locale, "Ejecutivo / GL / Plus", "Executive / GL / Plus", "Exécutif / GL / Plus")}
            </h4>
            <p className="text-sm text-arena-700">
              {t3(locale,
                "Gama intermedia-alta. Menos asientos (30-36 por autobus), mayor espacio entre filas, sin paradas intermedias, snack y agua gratis. ADO GL, Primera Plus Premium, ETN en algunas rutas. Cuesta 30-50% mas que primera clase pero vale la pena para rutas largas.",
                "Mid-high tier. Fewer seats (30-36 per bus), more legroom, no intermediate stops, free snack and water. ADO GL, Primera Plus Premium, ETN on some routes. Costs 30-50% more than first class but worth it on long routes.",
                "Gamme intermédiaire. Moins de sièges, plus d'espace, sans arrêts, collation gratuite."
              )}
            </p>
          </div>
          <div className="p-5 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-bold text-arena-900 mb-1">
              {t3(locale, "Lujo / Platino / Diamante", "Luxury / Platino / Diamante", "Luxe / Platino / Diamante")}
            </h4>
            <p className="text-sm text-arena-700">
              {t3(locale,
                "El maximo nivel. Solo 20-24 asientos estilo cama, reclinables 170-180 grados, pantalla individual, audifonos, almohada y cobija, snack gourmet, botellas de agua. ADO Platino, ETN Turistar, Primera Plus Super Lujo. Casi como volar en primera clase. Ideal para viajes nocturnos de 8+ horas.",
                "Top tier. Just 20-24 bed-style seats reclining 170-180 degrees, individual screens, headphones, pillow and blanket, gourmet snack, water bottles. ADO Platino, ETN Turistar, Primera Plus Super Lujo. Almost like flying first class. Ideal for 8+ hour overnight trips.",
                "Niveau maximum. 20-24 sièges lit inclinables à 170-180°. Idéal pour les voyages de nuit de 8h+."
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Terminales principales y como funcionan",
            "Main terminals and how they work",
            "Gares routières principales et fonctionnement"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-3">
          {t3(locale,
            "En la Ciudad de Mexico hay cuatro terminales, cada una con salidas hacia un punto cardinal:",
            "In Mexico City there are four terminals, each serving a cardinal direction:",
            "À Mexico, il y a quatre gares routières, une par point cardinal :"
          )}
        </p>
        <ul className="space-y-2 text-arena-700">
          <li>
            <strong>{t3(locale, "Terminal del Norte:", "Terminal del Norte:", "Terminal Nord :")}</strong>{" "}
            {t3(locale,
              "Destinos al norte: Queretaro, San Miguel de Allende, Guanajuato, Guadalajara, Monterrey, Zacatecas, Chihuahua. Cerca del metro Autobuses del Norte (linea 5).",
              "Northern destinations: Queretaro, San Miguel de Allende, Guanajuato, Guadalajara, Monterrey, Zacatecas, Chihuahua. Near Autobuses del Norte metro (line 5).",
              "Destinations au nord. Près du métro Autobuses del Norte."
            )}
          </li>
          <li>
            <strong>{t3(locale, "TAPO (Terminal del Oriente):", "TAPO (Eastern Terminal):", "TAPO (Terminal Est) :")}</strong>{" "}
            {t3(locale,
              "Destinos al oriente y sureste: Puebla, Veracruz, Oaxaca, Merida, Cancun, Chiapas. La mas grande y concurrida. Conecta con el metro San Lazaro (linea 1).",
              "Eastern and southeastern destinations: Puebla, Veracruz, Oaxaca, Merida, Cancun, Chiapas. The largest and busiest. Connects with San Lazaro metro (line 1).",
              "Destinations à l'est et au sud-est. La plus grande. Connectée au métro San Lazaro."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Terminal del Sur (Taxquena):", "Southern Terminal (Taxquena):", "Terminal Sud (Taxquena) :")}</strong>{" "}
            {t3(locale,
              "Destinos al sur: Cuernavaca, Acapulco, Taxco, Zihuatanejo, Ixtapa. Junto al metro Taxquena (linea 2).",
              "Southern destinations: Cuernavaca, Acapulco, Taxco, Zihuatanejo, Ixtapa. Next to Taxquena metro (line 2).",
              "Destinations au sud. À côté du métro Taxquena."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Terminal Poniente (Observatorio):", "Western Terminal (Observatorio):", "Terminal Ouest (Observatorio) :")}</strong>{" "}
            {t3(locale,
              "Destinos al poniente: Toluca, Valle de Bravo, Morelia, Patzcuaro. Conecta con el metro Observatorio (linea 1).",
              "Western destinations: Toluca, Valle de Bravo, Morelia, Patzcuaro. Connects with Observatorio metro (line 1).",
              "Destinations à l'ouest. Connectée au métro Observatorio."
            )}
          </li>
        </ul>
        <p className="text-arena-700 leading-relaxed mt-4">
          {t3(locale,
            "En otras ciudades: Guadalajara tiene la Nueva Central Camionera (al sureste) y la Antigua (centro), Monterrey tiene una sola central en la colonia Central. Cancun tiene la terminal ADO en pleno centro, a pocas cuadras de la zona hotelera. Siempre confirma tu terminal en el boleto, no todas las salidas son de la misma.",
            "In other cities: Guadalajara has the New Central Terminal (southeast) and Old one (center), Monterrey has one central terminal. Cancun has the ADO terminal downtown, blocks from the hotel zone. Always confirm your terminal on the ticket.",
            "Dans d'autres villes : Guadalajara a deux gares, Monterrey une seule. Cancun a la gare ADO en plein centre."
          )}
        </p>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Rutas populares y precios aproximados",
            "Popular routes and approximate prices",
            "Itinéraires populaires et prix approximatifs"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-4">
          {t3(locale,
            "Precios referencia 2026, primera clase, una direccion. Pueden variar 20-30% segun dia, temporada y clase:",
            "2026 reference prices, first class, one-way. May vary 20-30% by day, season and class:",
            "Prix de référence 2026, première classe, aller simple :"
          )}
        </p>
        <div className="not-prose overflow-x-auto my-4">
          <table className="min-w-full text-sm">
            <thead className="bg-arena-100">
              <tr>
                <th className="text-left p-3 font-semibold text-arena-800">{t3(locale, "Ruta", "Route", "Trajet")}</th>
                <th className="text-left p-3 font-semibold text-arena-800">{t3(locale, "Duracion", "Duration", "Durée")}</th>
                <th className="text-left p-3 font-semibold text-arena-800">{t3(locale, "Precio aprox.", "Approx. price", "Prix approx.")}</th>
                <th className="text-left p-3 font-semibold text-arena-800">{t3(locale, "Lineas", "Lines", "Compagnies")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-arena-100 bg-white">
              <tr><td className="p-3 font-medium">CDMX - Puebla</td><td className="p-3">2h</td><td className="p-3">$220 MXN</td><td className="p-3">ADO, Estrella Roja</td></tr>
              <tr><td className="p-3 font-medium">CDMX - Queretaro</td><td className="p-3">2h 30min</td><td className="p-3">$350 MXN</td><td className="p-3">Primera Plus, ETN</td></tr>
              <tr><td className="p-3 font-medium">CDMX - Cuernavaca</td><td className="p-3">1h 30min</td><td className="p-3">$200 MXN</td><td className="p-3">Pullman de Morelos</td></tr>
              <tr><td className="p-3 font-medium">CDMX - Guadalajara</td><td className="p-3">7h</td><td className="p-3">$800 MXN</td><td className="p-3">ETN, Primera Plus</td></tr>
              <tr><td className="p-3 font-medium">CDMX - Oaxaca</td><td className="p-3">6h 30min</td><td className="p-3">$700 MXN</td><td className="p-3">ADO, ADO GL</td></tr>
              <tr><td className="p-3 font-medium">CDMX - Acapulco</td><td className="p-3">4h 30min</td><td className="p-3">$600 MXN</td><td className="p-3">Estrella de Oro</td></tr>
              <tr><td className="p-3 font-medium">Cancun - Playa del Carmen</td><td className="p-3">1h</td><td className="p-3">$150 MXN</td><td className="p-3">ADO</td></tr>
              <tr><td className="p-3 font-medium">Cancun - Merida</td><td className="p-3">4h</td><td className="p-3">$500 MXN</td><td className="p-3">ADO, ADO GL</td></tr>
              <tr><td className="p-3 font-medium">Cancun - Tulum</td><td className="p-3">2h</td><td className="p-3">$250 MXN</td><td className="p-3">ADO</td></tr>
              <tr><td className="p-3 font-medium">Guadalajara - Puerto Vallarta</td><td className="p-3">5h</td><td className="p-3">$650 MXN</td><td className="p-3">ETN, Primera Plus</td></tr>
              <tr><td className="p-3 font-medium">Monterrey - Saltillo</td><td className="p-3">1h 30min</td><td className="p-3">$200 MXN</td><td className="p-3">Senda, Omnibus</td></tr>
              <tr><td className="p-3 font-medium">CDMX - Monterrey</td><td className="p-3">12h</td><td className="p-3">$1,200 MXN</td><td className="p-3">ETN, Omnibus</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Seguridad: lo que debes saber",
            "Safety: what you need to know",
            "Sécurité : ce qu'il faut savoir"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-3">
          {t3(locale,
            "El autobus en Mexico es generalmente seguro si sigues algunas reglas basicas. Las lineas de primera clase y superior viajan exclusivamente por autopistas de cuota, que son las rutas mas seguras del pais y las mas supervisadas por la Guardia Nacional.",
            "Bus travel in Mexico is generally safe if you follow some basic rules. First class and above travel exclusively on toll highways, which are the safest and most supervised routes by the National Guard.",
            "Les bus première classe et plus voyagent exclusivement sur autoroutes à péage, les routes les plus sûres."
          )}
        </p>
        <ul className="space-y-2 text-arena-700">
          <li>
            {t3(locale,
              "Viaja siempre en primera clase o superior si vas a cruzar estados o viajar de noche.",
              "Always travel first class or higher if crossing states or traveling at night.",
              "Voyagez toujours en première classe ou plus si vous traversez des États ou voyagez de nuit."
            )}
          </li>
          <li>
            {t3(locale,
              "No dejes equipaje visible en el asiento de al lado o en los compartimentos superiores. Guardalo en la bodega (al documentar recibes ticket numerado).",
              "Don't leave luggage visible on the adjacent seat or overhead bins. Stow it in the cargo hold (you'll receive a numbered ticket at check-in).",
              "Ne laissez pas de bagages visibles. Mettez-les en soute, vous recevez un ticket numéroté."
            )}
          </li>
          <li>
            {t3(locale,
              "Evita lineas locales de segunda clase en zonas con historial de inseguridad (partes de Tamaulipas, Guerrero, Michoacan rural).",
              "Avoid second-class local lines in areas with safety concerns (parts of Tamaulipas, Guerrero, rural Michoacan).",
              "Évitez les lignes locales de deuxième classe dans certaines zones."
            )}
          </li>
          <li>
            {t3(locale,
              "Guarda el recibo de tu boleto hasta llegar al destino. En algunas terminales lo piden al salir del anden.",
              "Keep your ticket receipt until you arrive. Some terminals ask for it when exiting the platform.",
              "Gardez votre billet jusqu'à l'arrivée."
            )}
          </li>
          <li>
            {t3(locale,
              "En la terminal, usa taxis oficiales que compras dentro del edificio. Evita aceptar servicios de personas que se te acerquen.",
              "At terminals, use official taxis bought inside the building. Avoid unsolicited offers.",
              "Utilisez les taxis officiels achetés à l'intérieur du bâtiment."
            )}
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Tips practicos para ahorrar",
            "Practical money-saving tips",
            "Conseils pratiques pour économiser"
          )}
        </h3>
        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-bold text-arena-900 text-sm mb-1">
              🗓️ {t3(locale, "Compra 2-4 semanas antes", "Buy 2-4 weeks ahead", "Achetez 2-4 semaines à l'avance")}
            </h4>
            <p className="text-xs text-arena-600">
              {t3(locale,
                "Las lineas aplican tarifas dinamicas. Los primeros asientos vendidos son los mas baratos.",
                "Lines use dynamic pricing. The first seats sold are the cheapest.",
                "Les premières places vendues sont les moins chères."
              )}
            </p>
          </div>
          <div className="p-4 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-bold text-arena-900 text-sm mb-1">
              🎫 {t3(locale, "Descuentos estudiante y maestro", "Student and teacher discounts", "Réductions étudiants et enseignants")}
            </h4>
            <p className="text-xs text-arena-600">
              {t3(locale,
                "ADO y otras lineas dan 25% de descuento con credencial vigente de INE para estudiantes y docentes.",
                "ADO and others give 25% off with a valid student/teacher INE credential.",
                "ADO offre 25% de réduction avec carte étudiant/enseignant valide."
              )}
            </p>
          </div>
          <div className="p-4 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-bold text-arena-900 text-sm mb-1">
              👴 {t3(locale, "INAPAM (adultos mayores)", "INAPAM (seniors)", "INAPAM (seniors)")}
            </h4>
            <p className="text-xs text-arena-600">
              {t3(locale,
                "Las personas de 60+ con credencial INAPAM obtienen 50% de descuento en la mayoria de lineas.",
                "60+ with INAPAM card get 50% off on most lines.",
                "60 ans et + avec carte INAPAM : 50% de réduction."
              )}
            </p>
          </div>
          <div className="p-4 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-bold text-arena-900 text-sm mb-1">
              🌙 {t3(locale, "Autobus nocturno = hotel ahorrado", "Overnight bus = hotel saved", "Bus de nuit = hôtel économisé")}
            </h4>
            <p className="text-xs text-arena-600">
              {t3(locale,
                "En rutas de 8+ horas el autobus nocturno en clase lujo cuesta menos que el avion y un hotel.",
                "On 8+ hour routes, a luxury overnight bus costs less than flight + hotel.",
                "Sur les trajets de 8h+, le bus de nuit est moins cher que l'avion plus l'hôtel."
              )}
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}

import { t3 } from "@/lib/utils";

interface Props {
  locale: string;
}

export default function FlightsGuide({ locale }: Props) {
  return (
    <article className="mt-12 bg-white rounded-2xl shadow-lg border border-arena-100 p-6 md:p-10 prose prose-arena max-w-none">
      <header className="not-prose mb-8 pb-6 border-b border-arena-100">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-arena-900 mb-3">
          {t3(locale,
            "Guia completa: Vuelos baratos en Mexico 2026",
            "Complete guide: Cheap flights in Mexico 2026",
            "Guide complet : Vols pas chers au Mexique 2026"
          )}
        </h2>
        <p className="text-arena-500 text-lg">
          {t3(locale,
            "Todo lo que necesitas saber sobre aerolineas mexicanas, aeropuertos, temporadas, precios y tips para encontrar el vuelo mas economico dentro de Mexico y desde el extranjero.",
            "Everything you need to know about Mexican airlines, airports, seasons, prices and tips to find the cheapest flight within Mexico and from abroad.",
            "Tout ce que vous devez savoir sur les compagnies aériennes mexicaines, aéroports, saisons, prix et conseils pour trouver le vol le moins cher au Mexique et depuis l'étranger."
          )}
        </p>
      </header>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Principales aerolineas mexicanas",
            "Main Mexican airlines",
            "Principales compagnies aériennes mexicaines"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-4">
          {t3(locale,
            "Mexico cuenta con tres aerolineas nacionales principales ademas de varias regionales. Entender las diferencias entre ellas es clave para elegir el vuelo correcto segun tu presupuesto y necesidades.",
            "Mexico has three main national airlines plus several regional ones. Understanding the differences between them is key to picking the right flight for your budget and needs.",
            "Le Mexique compte trois compagnies aériennes nationales principales et plusieurs régionales. Comprendre les différences entre elles est essentiel pour choisir le bon vol selon votre budget et vos besoins."
          )}
        </p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="p-5 bg-terracotta-50 rounded-xl border border-terracotta-100">
            <h4 className="font-display font-bold text-terracotta-700 mb-2">✈️ Volaris</h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "Aerolinea de bajo costo lider en Mexico. Opera mas de 70 destinos domesticos e internacionales (Estados Unidos, Centroamerica). Su modelo es de tarifa base economica con extras por equipaje y asignacion de asiento. Ideal para viajes cortos con poco equipaje. Hub principal en CDMX, Guadalajara, Tijuana y Cancun.",
                "Leading low-cost airline in Mexico. Operates over 70 domestic and international destinations (US, Central America). Uses a low base fare model with extras for baggage and seat selection. Ideal for short trips with light luggage. Main hubs in Mexico City, Guadalajara, Tijuana and Cancun.",
                "Principale compagnie low-cost du Mexique. Plus de 70 destinations nationales et internationales (États-Unis, Amérique centrale). Tarif de base économique avec suppléments pour bagages et sélection de siège. Idéale pour des voyages courts avec peu de bagages."
              )}
            </p>
          </div>
          <div className="p-5 bg-azul-50 rounded-xl border border-azul-100">
            <h4 className="font-display font-bold text-azul-700 mb-2">✈️ VivaAerobus</h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "La segunda aerolinea de bajo costo mexicana. Base en Monterrey. Destaca por ofertas y promociones frecuentes con vuelos desde 199 MXN en ventas especiales. Opera en aeropuertos secundarios (como AIFA en CDMX) donde las tasas son menores. Cobra por todo lo extra, incluyendo escoger asiento o equipaje de mano mayor a 10 kg.",
                "Mexico's second low-cost airline. Based in Monterrey. Known for frequent deals with flights from 199 MXN on flash sales. Uses secondary airports (like AIFA in CDMX) with lower fees. Charges extra for everything, including seat selection or carry-on over 10 kg.",
                "Deuxième compagnie low-cost du Mexique. Basée à Monterrey. Connue pour ses offres fréquentes avec des vols à partir de 199 MXN. Utilise des aéroports secondaires comme AIFA à Mexico."
              )}
            </p>
          </div>
          <div className="p-5 bg-jade-50 rounded-xl border border-jade-100">
            <h4 className="font-display font-bold text-jade-700 mb-2">✈️ Aeromexico</h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "Aerolinea de bandera. Servicio completo con equipaje facturado incluido, alimentos a bordo en rutas largas, y programa de viajero frecuente (Aeromexico Rewards, antes Club Premier). Miembro de SkyTeam: acumula millas con Delta, Air France, KLM. Vuelos internacionales a Europa, Asia y Sudamerica. Hub en el AICM y Monterrey.",
                "Flag carrier. Full service with checked baggage included, onboard meals on long routes, and frequent flyer program (Aeromexico Rewards). SkyTeam member: earn miles with Delta, Air France, KLM. International flights to Europe, Asia and South America. Hub at AICM and Monterrey.",
                "Compagnie nationale. Service complet avec bagages enregistrés inclus, repas à bord sur les vols long-courriers. Membre de SkyTeam. Vols internationaux vers l'Europe, l'Asie et l'Amérique du Sud."
              )}
            </p>
          </div>
          <div className="p-5 bg-oro-50 rounded-xl border border-oro-100">
            <h4 className="font-display font-bold text-oro-700 mb-2">✈️ TAR Aerolineas</h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "Aerolinea regional con base en Queretaro. Conecta ciudades medianas que las grandes aerolineas no cubren (Puebla, Morelia, Durango, Ciudad del Carmen, Villahermosa). Precios competitivos y vuelos sin escalas entre ciudades regionales, evitando tener que conectar por CDMX.",
                "Regional airline based in Querétaro. Connects mid-sized cities the big airlines don't cover (Puebla, Morelia, Durango, Villahermosa). Competitive prices and non-stop flights between regional cities, avoiding connections through CDMX.",
                "Compagnie régionale basée à Querétaro. Connecte les villes moyennes que les grandes compagnies ne desservent pas. Prix compétitifs."
              )}
            </p>
          </div>
        </div>

        <p className="text-arena-700 leading-relaxed">
          {t3(locale,
            "Tambien operan en Mexico aerolineas internacionales como American Airlines, Delta, United, Copa, Iberia, Air France, Lufthansa, KLM y Air Canada, principalmente en rutas internacionales. Para vuelos domesticos, casi todo el mercado lo manejan Volaris, VivaAerobus y Aeromexico.",
            "Also operating in Mexico are international carriers like American Airlines, Delta, United, Copa, Iberia, Air France, Lufthansa, KLM and Air Canada, mostly on international routes. For domestic flights, almost the entire market is handled by Volaris, VivaAerobus and Aeromexico.",
            "Des compagnies internationales comme American Airlines, Delta, Air France, KLM et Lufthansa opèrent également au Mexique, principalement sur les routes internationales."
          )}
        </p>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Aeropuertos principales de Mexico",
            "Mexico's main airports",
            "Principaux aéroports du Mexique"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-4">
          {t3(locale,
            "Mexico tiene mas de 60 aeropuertos comerciales. Para vuelos internacionales y conexiones, estos son los mas relevantes:",
            "Mexico has over 60 commercial airports. For international flights and connections, these are the most relevant:",
            "Le Mexique compte plus de 60 aéroports commerciaux. Voici les plus importants :"
          )}
        </p>
        <ul className="space-y-3 text-arena-700">
          <li>
            <strong>{t3(locale, "AICM (Ciudad de Mexico) - MEX:", "AICM (Mexico City) - MEX:", "AICM (Mexico) - MEX :")}</strong>{" "}
            {t3(locale,
              "El mas grande y concurrido del pais. Hub internacional con vuelos directos a Europa, Asia y America. Dos terminales conectadas por Aerotren. Saturado en horas pico; llega 3 horas antes para internacionales.",
              "The largest and busiest in the country. International hub with direct flights to Europe, Asia and the Americas. Two terminals connected by Aerotren. Crowded at peak hours; arrive 3 hours early for international flights.",
              "Le plus grand et le plus fréquenté du pays. Hub international avec des vols directs vers l'Europe, l'Asie et les Amériques."
            )}
          </li>
          <li>
            <strong>{t3(locale, "AIFA (Santa Lucia) - NLU:", "AIFA (Santa Lucia) - NLU:", "AIFA (Santa Lucia) - NLU :")}</strong>{" "}
            {t3(locale,
              "Aeropuerto alterno al norte de CDMX inaugurado en 2022. Muy usado por VivaAerobus, Volaris y algunas internacionales. Menos congestionado pero lejos del centro (45-90 minutos en taxi). Tarifas aeroportuarias mas bajas, por lo que los vuelos suelen ser mas baratos.",
              "Alternative airport north of Mexico City, opened in 2022. Heavily used by VivaAerobus, Volaris and some international carriers. Less congested but far from downtown (45-90 min by taxi). Lower airport fees, so flights are often cheaper.",
              "Aéroport alternatif au nord de Mexico, inauguré en 2022. Moins encombré mais loin du centre. Frais aéroportuaires plus bas."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Cancun - CUN:", "Cancun - CUN:", "Cancun - CUN :")}</strong>{" "}
            {t3(locale,
              "El segundo aeropuerto mas importante. Puerta de entrada al Caribe Mexicano (Riviera Maya, Tulum, Playa del Carmen, Cozumel, Holbox). Vuelos directos a Europa, America Latina, Estados Unidos y Canada. Cuatro terminales; Volaris y VivaAerobus en Terminal 4.",
              "The second most important airport. Gateway to the Mexican Caribbean (Riviera Maya, Tulum, Playa del Carmen, Cozumel, Holbox). Direct flights to Europe, Latin America, US and Canada. Four terminals; Volaris and VivaAerobus at Terminal 4.",
              "Deuxième aéroport le plus important. Porte d'entrée des Caraïbes mexicaines. Quatre terminaux."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Guadalajara - GDL:", "Guadalajara - GDL:", "Guadalajara - GDL :")}</strong>{" "}
            {t3(locale,
              "Tercer aeropuerto del pais. Hub importante para vuelos a Estados Unidos (California, Texas, Illinois) por la gran comunidad mexicana en esos estados. Base de operaciones de Volaris.",
              "Third busiest airport. Important hub for US flights (California, Texas, Illinois) due to the large Mexican community in those states. Volaris operations base.",
              "Troisième aéroport du pays. Hub important pour les vols vers les États-Unis."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Los Cabos - SJD:", "Los Cabos - SJD:", "Los Cabos - SJD :")}</strong>{" "}
            {t3(locale,
              "Destino premium en Baja California Sur. Vuelos directos desde Estados Unidos (Los Angeles, Dallas, Houston, Denver). Alta demanda de diciembre a abril.",
              "Premium destination in Baja California Sur. Direct flights from the US. High demand December to April.",
              "Destination premium en Basse-Californie du Sud. Vols directs depuis les États-Unis."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Monterrey - MTY, Tijuana - TIJ, Merida - MID, Puerto Vallarta - PVR:", "Monterrey - MTY, Tijuana - TIJ, Merida - MID, Puerto Vallarta - PVR:", "Monterrey - MTY, Tijuana - TIJ, Merida - MID, Puerto Vallarta - PVR :")}</strong>{" "}
            {t3(locale,
              "Otros aeropuertos importantes con vuelos internacionales. Tijuana destaca por el CBX (Cross Border Xpress) que conecta directamente con San Diego caminando.",
              "Other major airports with international flights. Tijuana stands out for the CBX (Cross Border Xpress) connecting directly to San Diego on foot.",
              "Autres aéroports majeurs avec vols internationaux. Tijuana se distingue par le CBX qui relie directement San Diego à pied."
            )}
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Como encontrar vuelos baratos a Mexico",
            "How to find cheap flights to Mexico",
            "Comment trouver des vols pas chers vers le Mexique"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-4">
          {t3(locale,
            "Encontrar tarifas bajas requiere un poco de estrategia. Estos son los principios que mejor funcionan para vuelos dentro de Mexico y desde el extranjero:",
            "Finding low fares takes a bit of strategy. These are the principles that work best for flights within Mexico and from abroad:",
            "Trouver des tarifs bas demande un peu de stratégie. Voici les principes qui fonctionnent le mieux :"
          )}
        </p>

        <div className="not-prose space-y-4 my-6">
          <div className="p-5 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-display font-bold text-arena-900 mb-2">
              📅 {t3(locale, "Reserva con anticipacion, pero no demasiada", "Book ahead, but not too far", "Réservez à l'avance, mais pas trop")}
            </h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "Para vuelos domesticos, la ventana optima es entre 4 y 8 semanas antes del viaje. Para internacionales, entre 2 y 5 meses. Comprar con menos de 2 semanas suele ser mas caro, pero comprar con mas de 6 meses tambien puede serlo porque las aerolineas no han liberado tarifas bajas.",
                "For domestic flights, the sweet spot is 4 to 8 weeks before the trip. For international, 2 to 5 months. Buying less than 2 weeks out is usually pricier, but buying more than 6 months out can also be expensive because airlines haven't released low fares yet.",
                "Pour les vols intérieurs, la fenêtre optimale est de 4 à 8 semaines avant. Pour l'international, 2 à 5 mois."
              )}
            </p>
          </div>
          <div className="p-5 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-display font-bold text-arena-900 mb-2">
              📆 {t3(locale, "Vuela entre semana", "Fly mid-week", "Volez en milieu de semaine")}
            </h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "Los martes, miercoles y sabados son los dias mas baratos para volar en Mexico. Los viernes y domingos son los mas caros porque concentran la demanda de viajes de fin de semana. Una diferencia de un dia puede ahorrarte 500-1,500 MXN.",
                "Tuesdays, Wednesdays and Saturdays are the cheapest days to fly in Mexico. Fridays and Sundays are the most expensive due to weekend demand. A one-day shift can save 500-1,500 MXN.",
                "Mardi, mercredi et samedi sont les jours les moins chers pour voler au Mexique."
              )}
            </p>
          </div>
          <div className="p-5 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-display font-bold text-arena-900 mb-2">
              🛫 {t3(locale, "Compara aeropuertos alternos", "Compare alternative airports", "Comparez les aéroports alternatifs")}
            </h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "En CDMX, comparar AICM vs AIFA o Toluca (TLC) puede cambiar el precio 30-40%. En el Caribe, Cancun vs Cozumel (CZM) vs Merida (MID) dan opciones muy distintas. Para Puerto Vallarta, tambien revisa Tepic (TPQ) si tu destino final es la Riviera Nayarit.",
                "In Mexico City, comparing AICM vs AIFA or Toluca (TLC) can change price by 30-40%. In the Caribbean, Cancun vs Cozumel (CZM) vs Merida (MID) offer very different options.",
                "À Mexico, comparer AICM vs AIFA ou Toluca (TLC) peut changer le prix de 30-40%."
              )}
            </p>
          </div>
          <div className="p-5 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-display font-bold text-arena-900 mb-2">
              🧳 {t3(locale, "Calcula el precio total, no la tarifa base", "Calculate total price, not base fare", "Calculez le prix total, pas le tarif de base")}
            </h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "Un vuelo de Volaris o VivaAerobus de 499 MXN puede convertirse en 1,500 MXN al agregar maleta documentada, equipaje de mano grande y asiento. Siempre calcula el precio final con los extras que realmente vas a necesitar antes de comparar con Aeromexico (que incluye todo eso).",
                "A 499 MXN flight on Volaris or VivaAerobus can become 1,500 MXN once you add checked bag, large carry-on and seat. Always calculate the final price with the extras you really need before comparing with Aeromexico (which bundles them in).",
                "Un vol low-cost peut doubler une fois ajoutés les bagages et le siège. Calculez toujours le prix final."
              )}
            </p>
          </div>
          <div className="p-5 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-display font-bold text-arena-900 mb-2">
              🔔 {t3(locale, "Alertas de precio y flexibilidad de fechas", "Price alerts and date flexibility", "Alertes de prix et flexibilité des dates")}
            </h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "Configura alertas de precio en Google Flights o Skyscanner para la ruta que te interesa. Si tus fechas son flexibles, la vista de calendario del mes completo muestra los dias mas baratos. Mover el vuelo uno o dos dias puede significar ahorros del 25% o mas.",
                "Set up price alerts on Google Flights or Skyscanner for your route. If dates are flexible, the full-month calendar view shows cheapest days. Shifting by one or two days can mean 25%+ savings.",
                "Activez les alertes de prix sur Google Flights ou Skyscanner. Décaler d'un ou deux jours peut économiser 25% ou plus."
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Mejores y peores epocas para volar",
            "Best and worst times to fly",
            "Meilleures et pires périodes pour voler"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-4">
          {t3(locale,
            "Mexico tiene temporadas muy marcadas. Evitar las temporadas altas puede reducir el precio de un vuelo a la mitad.",
            "Mexico has distinct seasons. Avoiding peak periods can halve your flight price.",
            "Le Mexique a des saisons bien marquées. Éviter les hautes saisons peut diviser par deux le prix du vol."
          )}
        </p>
        <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="p-5 bg-red-50 rounded-xl border border-red-200">
            <h4 className="font-display font-bold text-red-700 mb-2">
              {t3(locale, "🔴 Temporada alta (mas caro)", "🔴 Peak season (most expensive)", "🔴 Haute saison")}
            </h4>
            <p className="text-sm text-arena-700">
              {t3(locale,
                "Semana Santa (marzo o abril), verano (julio-agosto), Dia de Muertos (1-2 nov), Navidad-Ano Nuevo (20 dic-6 ene), Spring Break (marzo).",
                "Holy Week (March or April), summer (July-August), Day of the Dead (Nov 1-2), Christmas-New Year (Dec 20-Jan 6), Spring Break (March).",
                "Semaine sainte, été, Jour des Morts, fêtes de fin d'année."
              )}
            </p>
          </div>
          <div className="p-5 bg-yellow-50 rounded-xl border border-yellow-200">
            <h4 className="font-display font-bold text-yellow-700 mb-2">
              {t3(locale, "🟡 Temporada media", "🟡 Shoulder season", "🟡 Moyenne saison")}
            </h4>
            <p className="text-sm text-arena-700">
              {t3(locale,
                "Febrero, mayo, fin de octubre. Precios razonables y clima agradable. Muy recomendable para viajeros con flexibilidad.",
                "February, May, end of October. Reasonable prices and pleasant weather. Highly recommended for flexible travelers.",
                "Février, mai, fin octobre. Prix raisonnables et climat agréable."
              )}
            </p>
          </div>
          <div className="p-5 bg-green-50 rounded-xl border border-green-200">
            <h4 className="font-display font-bold text-green-700 mb-2">
              {t3(locale, "🟢 Temporada baja (mas barato)", "🟢 Low season (cheapest)", "🟢 Basse saison")}
            </h4>
            <p className="text-sm text-arena-700">
              {t3(locale,
                "Septiembre (excepto 15-16), primera quincena de noviembre, finales de enero. Hasta 50% mas barato. Unico riesgo: huracanes en el Caribe de agosto a octubre.",
                "September (except 15-16), first half of November, late January. Up to 50% cheaper. Only risk: hurricanes in the Caribbean August-October.",
                "Septembre, première moitié de novembre, fin janvier. Jusqu'à 50% moins cher."
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Equipaje: lo que debes saber",
            "Baggage: what you need to know",
            "Bagages : ce qu'il faut savoir"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-4">
          {t3(locale,
            "Las politicas de equipaje cambian muy seguido, especialmente en aerolineas de bajo costo. Una sorpresa en el aeropuerto puede costarte hasta 1,000 MXN por maleta. Esto es lo general para 2026:",
            "Baggage policies change often, especially on low-cost carriers. A surprise at the airport can cost up to 1,000 MXN per bag. General policy for 2026:",
            "Les politiques de bagages changent souvent. Une surprise à l'aéroport peut coûter jusqu'à 1 000 MXN par valise."
          )}
        </p>
        <ul className="space-y-2 text-arena-700">
          <li>
            <strong>Volaris:</strong>{" "}
            {t3(locale,
              "Solo incluye un articulo personal que quepa bajo el asiento (bolsa o mochila pequena de hasta 10 kg). El equipaje de mano en compartimento superior y el documentado se pagan aparte. Comprarlos por adelantado en la web es mucho mas barato que en el aeropuerto.",
              "Only includes one personal item that fits under the seat (small bag or backpack up to 10 kg). Overhead carry-on and checked bags are paid separately. Pre-purchasing online is much cheaper than at the airport.",
              "Inclut uniquement un article personnel sous le siège. Les autres bagages sont payants."
            )}
          </li>
          <li>
            <strong>VivaAerobus:</strong>{" "}
            {t3(locale,
              "Similar a Volaris. Un articulo personal de hasta 10 kg es gratis. Todo lo demas es extra. Revisa el peso exacto antes de llegar al aeropuerto.",
              "Similar to Volaris. One personal item up to 10 kg is free. Everything else is extra. Check exact weight before the airport.",
              "Similaire à Volaris. Un article personnel de 10 kg max est gratuit."
            )}
          </li>
          <li>
            <strong>Aeromexico:</strong>{" "}
            {t3(locale,
              "Tarifa Clasica incluye un equipaje de mano (10 kg) y una maleta documentada de 25 kg. Tarifa Basica solo incluye el de mano; la documentada se paga aparte. Siempre confirma segun la tarifa que compraste.",
              "Classic fare includes one carry-on (10 kg) and one checked bag of 25 kg. Basic fare only includes carry-on; checked bag is extra. Always confirm by the exact fare you bought.",
              "Tarif Classique : un bagage à main et une valise de 25 kg. Tarif Basique : uniquement à main."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Vuelos internacionales:", "International flights:", "Vols internationaux :")}</strong>{" "}
            {t3(locale,
              "Los vuelos a Europa suelen incluir 23 kg documentados. A Estados Unidos depende de la aerolinea; American, Delta y United cobran aparte en tarifa basica.",
              "Flights to Europe usually include 23 kg checked. To the US it depends; American, Delta and United charge extra on basic fare.",
              "Vols vers l'Europe : 23 kg inclus généralement."
            )}
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Documentos y requisitos de viaje",
            "Travel documents and requirements",
            "Documents et exigences de voyage"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-3">
          {t3(locale,
            "Para vuelos domesticos dentro de Mexico, los mexicanos solo necesitan identificacion oficial vigente (INE, pasaporte o licencia de conducir). Los extranjeros deben presentar pasaporte.",
            "For domestic flights within Mexico, Mexicans only need valid official ID (INE, passport or driver's license). Foreigners must present their passport.",
            "Pour les vols intérieurs, les Mexicains n'ont besoin que d'une pièce d'identité officielle. Les étrangers doivent présenter leur passeport."
          )}
        </p>
        <p className="text-arena-700 leading-relaxed">
          {t3(locale,
            "Para vuelos internacionales hacia Mexico, necesitas pasaporte vigente (con al menos 6 meses de validez desde la fecha de entrada) y, segun tu nacionalidad, posiblemente una visa mexicana. Los ciudadanos de Estados Unidos, Canada, Union Europea, Reino Unido y la mayoria de paises de America Latina no requieren visa para estancias turisticas de hasta 180 dias. Al entrar recibiras la FMM (Forma Migratoria Multiple), que debes conservar hasta tu salida.",
            "For international flights to Mexico, you need a valid passport (with at least 6 months validity from entry date) and, depending on nationality, possibly a Mexican visa. Citizens of US, Canada, EU, UK and most Latin American countries don't need a visa for tourist stays up to 180 days. On entry you'll receive the FMM (Multiple Migration Form), which you must keep until departure.",
            "Pour les vols internationaux vers le Mexique, vous avez besoin d'un passeport valide. Les citoyens de l'UE, du Royaume-Uni, du Canada et des États-Unis n'ont pas besoin de visa pour un séjour touristique jusqu'à 180 jours."
          )}
        </p>
      </section>
    </article>
  );
}

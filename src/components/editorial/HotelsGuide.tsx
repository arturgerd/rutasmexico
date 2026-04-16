import { t3 } from "@/lib/utils";

interface Props {
  locale: string;
}

export default function HotelsGuide({ locale }: Props) {
  return (
    <article className="mt-12 bg-white rounded-2xl shadow-lg border border-arena-100 p-6 md:p-10 prose prose-arena max-w-none">
      <header className="not-prose mb-8 pb-6 border-b border-arena-100">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-arena-900 mb-3">
          {t3(locale,
            "Donde hospedarse en Mexico: guia completa 2026",
            "Where to stay in Mexico: complete 2026 guide",
            "Où loger au Mexique : guide complet 2026"
          )}
        </h2>
        <p className="text-arena-500 text-lg">
          {t3(locale,
            "Zonas recomendadas por destino, tipos de alojamiento, rangos de precios, temporadas y estrategias para encontrar la mejor relacion calidad-precio en Mexico.",
            "Recommended areas by destination, types of accommodation, price ranges, seasons, and strategies for finding the best value in Mexico.",
            "Zones recommandées par destination, types d'hébergement, fourchettes de prix et stratégies pour trouver le meilleur rapport qualité-prix."
          )}
        </p>
      </header>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Tipos de alojamiento en Mexico",
            "Types of accommodation in Mexico",
            "Types d'hébergement au Mexique"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-4">
          {t3(locale,
            "Mexico tiene una oferta de hospedaje muy diversa, desde resorts todo incluido de lujo hasta hostales de 200 MXN la noche. Conocer las diferencias te ayudara a elegir lo adecuado para tu viaje:",
            "Mexico has a very diverse lodging scene, from luxury all-inclusive resorts to 200 MXN hostels. Knowing the differences helps you pick what fits your trip:",
            "Le Mexique offre une grande variété d'hébergements, des resorts tout inclus aux auberges de jeunesse."
          )}
        </p>
        <div className="not-prose space-y-4 my-6">
          <div className="p-5 bg-terracotta-50 rounded-xl border border-terracotta-100">
            <h4 className="font-display font-bold text-terracotta-700 mb-2">
              🏖️ {t3(locale, "Resorts todo incluido (All-Inclusive)", "All-inclusive resorts", "Resorts tout inclus")}
            </h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "Concentrados en Cancun, Riviera Maya, Los Cabos, Puerto Vallarta, Huatulco y Ixtapa. Incluyen habitacion, todas las comidas, bebidas (alcoholicas y no), actividades y entretenimiento. Precios desde 2,500 MXN por persona/noche en temporada baja hasta 10,000+ MXN en Navidad. Ideales si quieres cero preocupaciones y estar en la playa. Marcas: RIU, Iberostar, Barcelo, Palladium, Palace Resorts, Grand Velas, Hyatt Ziva.",
                "Concentrated in Cancun, Riviera Maya, Los Cabos, Puerto Vallarta, Huatulco and Ixtapa. Include room, all meals, drinks (alcoholic and non), activities and entertainment. Prices from 2,500 MXN per person/night low season to 10,000+ at Christmas. Ideal for zero-hassle beach stays. Brands: RIU, Iberostar, Barcelo, Palladium, Palace Resorts, Grand Velas, Hyatt Ziva.",
                "Concentrés à Cancun, Riviera Maya et Los Cabos. Incluent chambre, repas, boissons et activités. Idéals pour ne pas se soucier de rien."
              )}
            </p>
          </div>
          <div className="p-5 bg-azul-50 rounded-xl border border-azul-100">
            <h4 className="font-display font-bold text-azul-700 mb-2">
              🏨 {t3(locale, "Hoteles urbanos", "Urban hotels", "Hôtels urbains")}
            </h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "En ciudades como CDMX, Guadalajara, Monterrey, Merida, Puebla. Abarcan desde cadenas economicas (City Express, Fiesta Inn, Holiday Inn Express) hasta lujo (Four Seasons, St. Regis, W, Las Alcobas). Precios: 900-2,500 MXN en gama media, 3,500-8,000 MXN en lujo. Generalmente solo incluyen desayuno en tarifas mas caras.",
                "In cities like Mexico City, Guadalajara, Monterrey, Merida, Puebla. Range from budget chains (City Express, Fiesta Inn, Holiday Inn Express) to luxury (Four Seasons, St. Regis, W, Las Alcobas). Prices: 900-2,500 MXN mid-range, 3,500-8,000 MXN luxury.",
                "Dans les villes. Des chaînes économiques aux établissements de luxe."
              )}
            </p>
          </div>
          <div className="p-5 bg-jade-50 rounded-xl border border-jade-100">
            <h4 className="font-display font-bold text-jade-700 mb-2">
              🏡 {t3(locale, "Hoteles boutique", "Boutique hotels", "Hôtels boutique")}
            </h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "La joya del sector mexicano. Casonas coloniales restauradas con 10-30 habitaciones unicas, decoracion local, servicio personalizado y, a menudo, spa y restaurante de autor. Fuertes en San Miguel de Allende, Oaxaca, Merida, Tulum, Valle de Guadalupe y los Pueblos Magicos. Precios: 2,500-6,000 MXN/noche. Ofrecen la experiencia mas autentica del viaje.",
                "The gem of Mexican lodging. Restored colonial buildings with 10-30 unique rooms, local decor, personalized service and often spa and signature restaurant. Strong in San Miguel de Allende, Oaxaca, Merida, Tulum, Valle de Guadalupe and Pueblos Magicos. Prices: 2,500-6,000 MXN/night. Most authentic travel experience.",
                "Manoirs coloniaux restaurés avec décoration locale. Forts à San Miguel de Allende, Oaxaca, Merida."
              )}
            </p>
          </div>
          <div className="p-5 bg-oro-50 rounded-xl border border-oro-100">
            <h4 className="font-display font-bold text-oro-700 mb-2">
              🏠 {t3(locale, "Airbnb y apartamentos", "Airbnb and apartments", "Airbnb et appartements")}
            </h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "Muy popular en Mexico, especialmente en CDMX (Roma, Condesa, Polanco), Oaxaca, Merida y Playa del Carmen. Precios 30-50% mas bajos que hoteles equivalentes para estancias de 4+ noches. Ideal para familias o grupos que quieran cocina propia. Verifica el registro del anfitrion y las resenas recientes. En algunas zonas hay regulacion reciente.",
                "Very popular in Mexico, especially in Mexico City (Roma, Condesa, Polanco), Oaxaca, Merida and Playa del Carmen. 30-50% cheaper than equivalent hotels for 4+ night stays. Ideal for families or groups wanting kitchen access. Check host registration and recent reviews. Some areas have new regulations.",
                "Très populaire au Mexique. 30-50% moins cher pour les séjours de 4+ nuits."
              )}
            </p>
          </div>
          <div className="p-5 bg-terracotta-50 rounded-xl border border-terracotta-100">
            <h4 className="font-display font-bold text-terracotta-700 mb-2">
              🎒 {t3(locale, "Hostales", "Hostels", "Auberges de jeunesse")}
            </h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "Opcion para mochileros con buena relacion calidad-precio. Cama en dormitorio: 200-500 MXN. Habitaciones privadas: 500-1,200 MXN. Muy desarrollados en San Cristobal de las Casas, Oaxaca, Playa del Carmen, CDMX, Puerto Escondido. Mundo Joven y Selina son redes confiables con presencia en varias ciudades.",
                "Option for backpackers with great value. Dorm bed: 200-500 MXN. Private rooms: 500-1,200 MXN. Very developed in San Cristobal de las Casas, Oaxaca, Playa del Carmen, Mexico City, Puerto Escondido. Mundo Joven and Selina are reliable networks with presence in multiple cities.",
                "Option pour les routards. Lit en dortoir : 200-500 MXN. Très développés à Oaxaca, San Cristobal et CDMX."
              )}
            </p>
          </div>
          <div className="p-5 bg-azul-50 rounded-xl border border-azul-100">
            <h4 className="font-display font-bold text-azul-700 mb-2">
              🌵 {t3(locale, "Haciendas, eco-lodges y cabanas", "Haciendas, eco-lodges and cabins", "Haciendas et eco-lodges")}
            </h4>
            <p className="text-sm text-arena-700 leading-relaxed">
              {t3(locale,
                "Para experiencias unicas: haciendas henequeneras en Yucatan, eco-lodges en la selva de Chiapas o Veracruz, cabanas en zonas montanosas como la Sierra de Chihuahua o Valle de Bravo. Precios: 1,500-5,000 MXN/noche. A menudo son opciones 'fuera del radar' que aprovechan paisajes increibles.",
                "For unique experiences: henequen haciendas in Yucatan, jungle eco-lodges in Chiapas or Veracruz, mountain cabins in Sierra de Chihuahua or Valle de Bravo. Prices: 1,500-5,000 MXN/night. Often 'off-the-radar' options with incredible settings.",
                "Pour des expériences uniques : haciendas, eco-lodges dans la jungle, cabanes en montagne."
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Mejores zonas por destino",
            "Best areas by destination",
            "Meilleures zones par destination"
          )}
        </h3>

        <div className="not-prose space-y-5 my-6">
          <div className="p-5 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-display font-bold text-arena-900 mb-2">
              📍 {t3(locale, "Ciudad de Mexico (CDMX)", "Mexico City (CDMX)", "Mexico City (CDMX)")}
            </h4>
            <ul className="text-sm text-arena-700 space-y-1.5 leading-relaxed">
              <li><strong>Roma / Condesa:</strong> {t3(locale, "La zona mas recomendada para turistas. Arbolada, llena de cafes, restaurantes y vida nocturna. Segura caminando de dia y noche. Airbnbs y boutiques desde 1,200 MXN.", "Most recommended tourist area. Tree-lined, full of cafes, restaurants and nightlife. Safe day and night. Airbnbs and boutiques from 1,200 MXN.", "Zone la plus recommandée. Arborée, cafés, restaurants. Sécurisée jour et nuit.")}</li>
              <li><strong>Polanco:</strong> {t3(locale, "Zona de lujo. Sede de marcas, restaurantes premiados y hoteles 5 estrellas (St. Regis, Four Seasons, Las Alcobas). Cara pero impecable.", "Luxury area. Home to brands, award-winning restaurants and 5-star hotels (St. Regis, Four Seasons, Las Alcobas). Pricey but flawless.", "Zone de luxe. Hôtels 5 étoiles, restaurants primés.")}</li>
              <li><strong>{t3(locale, "Centro Historico", "Historic Center", "Centre Historique")}:</strong> {t3(locale, "Para inmersion cultural. Cerca del Zocalo, palacios, museos. Hoteles historicos como Gran Hotel Ciudad de Mexico. Zona muy turistica de dia, vacia en la noche.", "For cultural immersion. Near Zocalo, palaces, museums. Historic hotels like Gran Hotel. Very touristy by day, empty at night.", "Pour l'immersion culturelle. Près du Zocalo.")}</li>
              <li><strong>Coyoacan:</strong> {t3(locale, "Barrio bohemio con la Casa Azul de Frida Kahlo. Ambiente pueblerino, casas coloniales y plazas. Airbnbs y B&Bs desde 900 MXN.", "Bohemian neighborhood with Frida Kahlo's Blue House. Small-town feel, colonial houses and squares. Airbnbs and B&Bs from 900 MXN.", "Quartier bohème, maison de Frida Kahlo.")}</li>
              <li><strong>Santa Fe / Reforma:</strong> {t3(locale, "Zonas de negocios. Ideales si viajas por trabajo.", "Business districts. Good for work trips.", "Quartiers d'affaires.")}</li>
              <li><strong>{t3(locale, "Evita", "Avoid", "Évitez")}:</strong> {t3(locale, "Tepito, Doctores partes de Iztapalapa y Ecatepec sin razon especifica. No son zonas turisticas ni recomendadas para alojamiento.", "Tepito, parts of Doctores, Iztapalapa and Ecatepec without specific reason. Not tourist-friendly lodging areas.", "Tepito et certaines zones non touristiques.")}</li>
            </ul>
          </div>

          <div className="p-5 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-display font-bold text-arena-900 mb-2">
              📍 {t3(locale, "Cancun y Riviera Maya", "Cancun and Riviera Maya", "Cancun et Riviera Maya")}
            </h4>
            <ul className="text-sm text-arena-700 space-y-1.5 leading-relaxed">
              <li><strong>{t3(locale, "Zona Hotelera Cancun", "Cancun Hotel Zone", "Zone Hôtelière Cancun")}:</strong> {t3(locale, "Franja frente al mar de 22 km con resorts all-inclusive. Km 0-10 mas economico y familiar; km 10-20 mas lujoso. Todos tienen playa privada.", "22 km oceanfront strip with all-inclusive resorts. Km 0-10 cheaper and family; km 10-20 more luxurious. All have private beach.", "Bande côtière de 22 km avec des resorts tout inclus.")}</li>
              <li><strong>{t3(locale, "Centro de Cancun (downtown)", "Downtown Cancun", "Centre de Cancun")}:</strong> {t3(locale, "Mucho mas barato (hoteles desde 900 MXN). Al usar autobus local llegas a la playa en 20-30 min. Autentico y bueno para conocer la vida local.", "Much cheaper (hotels from 900 MXN). Local bus reaches beach in 20-30 min. Authentic and good for local life.", "Beaucoup moins cher. Bus local jusqu'à la plage en 20-30 min.")}</li>
              <li><strong>Playa del Carmen:</strong> {t3(locale, "Quinta Avenida es la calle peatonal principal. Boutiques, bares y restaurantes. Hoteles desde 1,200 MXN en el centro, all-inclusive de lujo en Playacar. Ambiente mas joven que Cancun.", "Fifth Avenue is the main pedestrian street. Boutiques, bars, restaurants. Hotels from 1,200 MXN downtown, luxury all-inclusive in Playacar. Younger vibe than Cancun.", "Quinta Avenida est la rue piétonne principale.")}</li>
              <li><strong>Tulum:</strong> {t3(locale, "Dos zonas muy distintas: el pueblo (economico, 800-2,500 MXN) y la zona costera con hoteles boutique en la jungla (3,500-15,000+ MXN). Ambiente eco-chic, bohemio, instagrameable.", "Two very different areas: the town (affordable, 800-2,500 MXN) and the coastal zone with boutique jungle hotels (3,500-15,000+ MXN). Eco-chic, bohemian, instagrammable vibe.", "Deux zones : le village (économique) et la côte (boutique-jungle).")}</li>
              <li><strong>{t3(locale, "Islas: Cozumel, Isla Mujeres, Holbox", "Islands: Cozumel, Isla Mujeres, Holbox", "Îles : Cozumel, Isla Mujeres, Holbox")}:</strong> {t3(locale, "Ambiente relajado. Holbox sin carros. Hoteles boutique y posadas desde 1,500 MXN.", "Relaxed vibe. Holbox is car-free. Boutique hotels and guesthouses from 1,500 MXN.", "Ambiance détendue. Holbox sans voitures.")}</li>
            </ul>
          </div>

          <div className="p-5 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-display font-bold text-arena-900 mb-2">
              📍 {t3(locale, "Los Cabos", "Los Cabos", "Los Cabos")}
            </h4>
            <ul className="text-sm text-arena-700 space-y-1.5 leading-relaxed">
              <li><strong>Cabo San Lucas:</strong> {t3(locale, "Marina, vida nocturna, el Arco. Hoteles grandes, muy internacional. Ideal si buscas fiesta y actividad.", "Marina, nightlife, the Arch. Large hotels, very international. Good for party and activity.", "Marina, vie nocturne, l'Arche.")}</li>
              <li><strong>San Jose del Cabo:</strong> {t3(locale, "Mas tranquilo, distrito de arte, gastronomia. Hoteles boutique. A 30 min de la marina.", "Quieter, art district, gastronomy. Boutique hotels. 30 min from the marina.", "Plus calme, quartier artistique.")}</li>
              <li><strong>{t3(locale, "Corredor Turistico (entre ambos)", "Tourist Corridor (between both)", "Corridor touristique")}:</strong> {t3(locale, "Resorts de lujo frente al mar. Caros pero con las mejores playas (Chileno, Santa Maria).", "Beachfront luxury resorts. Expensive but with the best beaches (Chileno, Santa Maria).", "Resorts de luxe en bord de mer.")}</li>
            </ul>
          </div>

          <div className="p-5 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-display font-bold text-arena-900 mb-2">
              📍 Oaxaca
            </h4>
            <ul className="text-sm text-arena-700 space-y-1.5 leading-relaxed">
              <li><strong>{t3(locale, "Centro Historico", "Historic Center", "Centre Historique")}:</strong> {t3(locale, "Todo a pie. Boutiques en casonas virreinales. Precios: 1,500-4,000 MXN. Mejor zona para visitantes.", "All walkable. Boutiques in colonial mansions. Prices: 1,500-4,000 MXN. Best area for visitors.", "Tout à pied. Boutiques dans des manoirs coloniaux.")}</li>
              <li><strong>Jalatlaco:</strong> {t3(locale, "Barrio artistico emergente, calles de colores, boutiques encantadores. A 10 min a pie del Zocalo.", "Emerging artistic neighborhood, colorful streets, charming boutiques. 10 min walk from Zocalo.", "Quartier artistique émergent.")}</li>
              <li><strong>Xoxocotlan:</strong> {t3(locale, "Afueras, mas barato, ideal para rentar auto. Solo recomendado con transporte propio.", "Outskirts, cheaper, ideal if renting a car. Only if you have transport.", "Périphérie, moins cher, nécessite une voiture.")}</li>
            </ul>
          </div>

          <div className="p-5 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-display font-bold text-arena-900 mb-2">
              📍 Puerto Vallarta
            </h4>
            <ul className="text-sm text-arena-700 space-y-1.5 leading-relaxed">
              <li><strong>{t3(locale, "Zona Romantica (Old Town)", "Zona Romantica (Old Town)", "Zona Romantica (Vieille Ville)")}:</strong> {t3(locale, "El corazon del Vallarta tradicional. Boutiques, bares LGBTQ+ friendly, playa de los Muertos. Hoteles desde 1,500 MXN.", "Heart of traditional Vallarta. Boutiques, LGBTQ+ friendly bars, Los Muertos Beach. Hotels from 1,500 MXN.", "Cœur du Vallarta traditionnel.")}</li>
              <li><strong>Marina Vallarta:</strong> {t3(locale, "Resorts y condos frente al mar. Cerca del aeropuerto. Mas corporate.", "Beachfront resorts and condos. Near airport. More corporate.", "Resorts en bord de mer, proche de l'aéroport.")}</li>
              <li><strong>{t3(locale, "Riviera Nayarit (Sayulita, Punta Mita)", "Riviera Nayarit (Sayulita, Punta Mita)", "Riviera Nayarit")}:</strong> {t3(locale, "A 30-60 min al norte. Sayulita es bohemio, Punta Mita es ultra-lujo.", "30-60 min north. Sayulita is bohemian, Punta Mita is ultra-luxury.", "30-60 min au nord. Sayulita bohème, Punta Mita ultra-luxe.")}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Temporadas y variacion de precios",
            "Seasons and price variation",
            "Saisons et variation des prix"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-4">
          {t3(locale,
            "Los precios de hoteles en Mexico pueden triplicarse en temporada alta. Conocer el calendario es tu principal herramienta para ahorrar:",
            "Hotel prices in Mexico can triple in peak season. Knowing the calendar is your main money-saving tool:",
            "Les prix peuvent tripler en haute saison. Connaître le calendrier est essentiel pour économiser."
          )}
        </p>
        <ul className="space-y-2 text-arena-700">
          <li>
            <strong>{t3(locale, "Muy alta (caro):", "Very high (expensive):", "Très haute (cher) :")}</strong>{" "}
            {t3(locale,
              "20 diciembre - 6 enero, Semana Santa (10 dias antes de Pascua), 15 julio - 15 agosto. Reservar con 3-6 meses de anticipacion.",
              "Dec 20 - Jan 6, Holy Week (10 days before Easter), Jul 15 - Aug 15. Book 3-6 months ahead.",
              "20 déc - 6 janv, semaine sainte, 15 juil - 15 août."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Alta:", "High:", "Haute :")}</strong>{" "}
            {t3(locale,
              "Enero-abril (sobre todo en la costa), puentes largos mexicanos (febrero, marzo, noviembre).",
              "January-April (especially on the coast), long Mexican holiday weekends (Feb, Mar, Nov).",
              "Janvier-avril, ponts mexicains."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Media:", "Shoulder:", "Moyenne :")}</strong>{" "}
            {t3(locale,
              "Mayo-junio, octubre-inicio de noviembre. Buen clima, menos gente, precios razonables.",
              "May-June, October-early November. Good weather, fewer crowds, reasonable prices.",
              "Mai-juin, octobre-début novembre."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Baja (mas barato):", "Low (cheapest):", "Basse (moins cher) :")}</strong>{" "}
            {t3(locale,
              "Septiembre, primera mitad de diciembre. En la costa caribena hay riesgo de huracanes de agosto a octubre; tarifas hasta 50% menores. En ciudades del interior no afecta.",
              "September, first half of December. On the Caribbean coast there's hurricane risk August-October; rates up to 50% lower. Interior cities unaffected.",
              "Septembre, début décembre. Risque d'ouragans sur la côte en août-octobre mais tarifs jusqu'à 50% moins chers."
            )}
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Como encontrar el mejor precio",
            "How to find the best price",
            "Comment trouver le meilleur prix"
          )}
        </h3>
        <ol className="space-y-3 text-arena-700 list-decimal list-inside">
          <li>
            <strong>{t3(locale, "Compara varios sitios:", "Compare multiple sites:", "Comparez plusieurs sites :")}</strong>{" "}
            {t3(locale,
              "El mismo hotel puede costar 20-40% diferente entre Booking, Expedia, Hoteles.com y el sitio oficial. Revisa los tres principales antes de decidir.",
              "The same hotel can cost 20-40% differently between Booking, Expedia, Hoteles.com and the official site. Check all three before deciding.",
              "Le même hôtel peut coûter 20-40% différemment selon les sites."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Prueba reservar directo:", "Try booking direct:", "Essayez en direct :")}</strong>{" "}
            {t3(locale,
              "Muchos hoteles mexicanos (sobre todo boutiques) ofrecen mejor precio o extras por WhatsApp o correo. Mandales el precio que viste en OTAs y suelen igualar o mejorar.",
              "Many Mexican hotels (especially boutiques) offer better prices or extras via WhatsApp or email. Send them the OTA price and they usually match or beat it.",
              "Beaucoup d'hôtels offrent de meilleurs prix en direct par WhatsApp ou email."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Reserva flexible cuando sea posible:", "Book flexibly when possible:", "Réservez en flexible quand c'est possible :")}</strong>{" "}
            {t3(locale,
              "Las tarifas 'no reembolsables' suelen ser 15-25% mas baratas, pero si algo cambia pierdes todo. Para viajes a mas de 2 meses, elige tarifa flexible; para viajes de menos de 2 semanas puedes arriesgar con no reembolsable.",
              "'Non-refundable' rates are usually 15-25% cheaper, but if anything changes you lose everything. For trips 2+ months out, pick flexible; for trips under 2 weeks you can risk non-refundable.",
              "Les tarifs non remboursables sont 15-25% moins chers mais risqués."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Evita viernes y sabados en playa:", "Avoid Friday and Saturday on the beach:", "Évitez vendredi et samedi à la plage :")}</strong>{" "}
            {t3(locale,
              "En destinos de fin de semana, las tarifas de jueves a sabado son 30-50% mas altas. Entra un domingo y sal un jueves.",
              "In weekend destinations, Thursday-Saturday rates are 30-50% higher. Check in on a Sunday and out on a Thursday.",
              "Les tarifs jeudi-samedi sont 30-50% plus chers dans les destinations de week-end."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Programa de lealtad si viajas seguido:", "Loyalty programs if you travel often:", "Programmes de fidélité :")}</strong>{" "}
            {t3(locale,
              "Marriott Bonvoy, Hilton Honors y IHG Rewards tienen buena presencia en Mexico. Hyatt domina los all-inclusive de lujo con su programa World of Hyatt.",
              "Marriott Bonvoy, Hilton Honors and IHG Rewards have good Mexico presence. Hyatt dominates luxury all-inclusive with World of Hyatt.",
              "Marriott, Hilton, Hyatt ont une bonne présence au Mexique."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Tarjetas de viaje con puntos:", "Travel credit cards:", "Cartes de voyage :")}</strong>{" "}
            {t3(locale,
              "En Mexico, las tarjetas Amex Platinum, Santander Aeromexico, y Banamex Marriott dan beneficios en hoteles como early check-in, desayuno incluido y upgrades.",
              "In Mexico, Amex Platinum, Santander Aeromexico and Banamex Marriott cards offer hotel perks like early check-in, breakfast and upgrades.",
              "Les cartes Amex, Marriott et Aeromexico offrent des avantages."
            )}
          </li>
        </ol>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "All-Inclusive: cuando vale la pena",
            "All-Inclusive: when it's worth it",
            "Tout inclus : quand ça vaut le coup"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-3">
          {t3(locale,
            "Los resorts all-inclusive son dominantes en el Caribe Mexicano, pero no siempre son la mejor opcion. Cuando si conviene:",
            "All-inclusive resorts dominate the Mexican Caribbean, but aren't always the best choice. When they're worth it:",
            "Les resorts tout inclus dominent les Caraïbes mexicaines mais ne sont pas toujours le meilleur choix."
          )}
        </p>
        <ul className="space-y-2 text-arena-700 mb-4">
          <li>
            {t3(locale,
              "Vas con niños (bebes gratis hasta 2 anos en muchos, ninos 4-12 con gran descuento).",
              "Traveling with kids (babies free up to 2 years in many, kids 4-12 deeply discounted).",
              "Avec enfants (bébés gratuits jusqu'à 2 ans)."
            )}
          </li>
          <li>
            {t3(locale,
              "Quieres cero planeacion y estar solo en la playa durante toda la estancia.",
              "Want zero planning and to stay at the beach the entire time.",
              "Vous voulez zéro planification, rester à la plage."
            )}
          </li>
          <li>
            {t3(locale,
              "Bebes bastante alcohol; 3+ bebidas al dia justifican el costo del paquete.",
              "Drink a fair amount; 3+ drinks/day justifies the package cost.",
              "Buveurs modérés ou plus : 3+ boissons/jour justifient le forfait."
            )}
          </li>
        </ul>
        <p className="text-arena-700 leading-relaxed">
          {t3(locale,
            "Cuando NO conviene: si planeas explorar cenotes, ruinas, pueblos vecinos, o probar la gastronomia local. En ese caso, un hotel estandar o Airbnb en Playa del Carmen o Tulum te sale mas barato y mas autentico. Comer en restaurantes locales en Riviera Maya tambien es una experiencia diferente al buffet del resort.",
            "When NOT worth it: if you plan to explore cenotes, ruins, neighboring towns, or try local food. A standard hotel or Airbnb in Playa del Carmen or Tulum is cheaper and more authentic. Local restaurants in the Riviera Maya are a different experience than the resort buffet.",
            "Pas intéressant si vous voulez explorer cenotes, ruines, villages ou goûter la cuisine locale."
          )}
        </p>
      </section>

      <section className="mb-6">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Impuestos y tarifas a considerar",
            "Taxes and fees to watch for",
            "Taxes et frais à surveiller"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-3">
          {t3(locale,
            "Verifica siempre si el precio mostrado incluye impuestos. En Mexico los impuestos son considerables:",
            "Always check if the price shown includes taxes. Mexican taxes are substantial:",
            "Vérifiez toujours si le prix inclut les taxes. Elles sont importantes au Mexique."
          )}
        </p>
        <ul className="space-y-2 text-arena-700">
          <li>
            <strong>IVA 16%:</strong>{" "}
            {t3(locale,
              "Impuesto al Valor Agregado nacional.",
              "National Value Added Tax.",
              "TVA nationale."
            )}
          </li>
          <li>
            <strong>ISH 3%:</strong>{" "}
            {t3(locale,
              "Impuesto Sobre Hospedaje, varia por estado. Algunos estados tambien cobran Contribucion Estatal de Ecologia.",
              "Lodging tax, varies by state. Some states also charge State Ecology Contribution.",
              "Taxe d'hébergement, varie selon l'état."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Derechos de saneamiento y ambientales:", "Environmental and sanitation fees:", "Frais environnementaux :")}</strong>{" "}
            {t3(locale,
              "En Quintana Roo hay una tarifa de US$4 por huesped por estancia (VISITAX). Algunos estados aplican cargos similares.",
              "Quintana Roo has a US$4 per guest per stay fee (VISITAX). Some states apply similar charges.",
              "Quintana Roo : 4 USD par personne (VISITAX)."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Resort fee (en cadenas americanas):", "Resort fee (American chains):", "Resort fee :")}</strong>{" "}
            {t3(locale,
              "Algunos resorts cobran 20-40 USD/dia por 'resort fee' que cubre WiFi, gym, servicio de playa. Verifica antes de reservar.",
              "Some resorts charge US$20-40/day 'resort fee' covering WiFi, gym, beach service. Check before booking.",
              "Certains resorts facturent 20-40 USD/jour de 'resort fee'."
            )}
          </li>
        </ul>
      </section>
    </article>
  );
}

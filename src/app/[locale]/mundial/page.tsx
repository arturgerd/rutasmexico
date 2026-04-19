import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { getAllMundialVenues } from "@/lib/data/mundial";
import { getMundialMenu } from "@/lib/data/mundial-menu";
import MundialVenueGrid from "@/components/mundial/MundialVenueGrid";
import MenuBuilder from "@/components/mundial/MenuBuilder";
import TraditionsSection from "@/components/mundial/TraditionsSection";
import MercadoLibreBanner from "@/components/widgets/MercadoLibreBanner";
import { t3, seoAlternates, seoOpenGraph } from "@/lib/utils";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const title = t3(locale,
    "Mundial 2026 en México - Sedes, Partidos y Cómo Llegar",
    "World Cup 2026 in Mexico - Venues, Matches & How to Get There",
    "Coupe du Monde 2026 au Mexique - Stades, Matchs et Comment s'y Rendre"
  );
  const description = t3(locale,
    "Guía completa del Mundial FIFA 2026 en México: estadios, calendario de partidos, transporte, hoteles y tips para cada sede",
    "Complete FIFA World Cup 2026 guide for Mexico: stadiums, match schedule, transport, hotels and tips for each venue",
    "Guide complet de la Coupe du Monde FIFA 2026 au Mexique : stades, calendrier, transport, hôtels et conseils"
  );
  return {
    title,
    description,
    alternates: seoAlternates(locale, "/mundial"),
    openGraph: seoOpenGraph(locale, title, description, "/mundial"),
  };
}

export default async function MundialPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const venues = await getAllMundialVenues();
  const menu = getMundialMenu();

  const totalMatches = venues.reduce((sum, v) => sum + v.matches.length, 0);
  const mexicoMatches = venues.reduce((sum, v) => sum + v.matches.filter(m => m.isMexicoGame).length, 0);
  const allMexicoGames = venues.flatMap(v => v.matches.filter(m => m.isMexicoGame)).sort((a, b) => a.date.localeCompare(b.date));
  const mxVenues = venues.filter(v => (v.country ?? "MX") === "MX");
  const usVenues = venues.filter(v => v.country === "US");
  const caVenues = venues.filter(v => v.country === "CA");

  return (
    <div className="min-h-screen">
      {/* Hero - DARK SOLID BACKGROUND */}
      <div className="bg-arena-900 py-16 md:py-20">
        <div className="container-custom">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-jade-600 rounded-full px-5 py-2 mb-6">
              <span className="text-lg">⚽</span>
              <span className="text-white text-sm font-bold tracking-wide">FIFA WORLD CUP 2026™</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
              {t3(locale, "Mundial 2026: 16 sedes en 3 países", "World Cup 2026: 16 venues across 3 countries", "Coupe du Monde 2026 : 16 stades dans 3 pays")}
            </h1>
            <p className="text-arena-300 text-lg max-w-3xl mx-auto mb-8">
              {t3(locale,
                "3 sedes en México 🇲🇽 + 11 en EE.UU. 🇺🇸 + 2 en Canadá 🇨🇦. Partido inaugural en CDMX, final en Nueva York. Tu guía completa para cada ciudad sede: cómo llegar, transporte, zonas seguras, cambio y lugares cerca.",
                "3 venues in Mexico 🇲🇽 + 11 in USA 🇺🇸 + 2 in Canada 🇨🇦. Opening match in Mexico City, final in New York. Your complete guide for every host city: how to get there, transport, safe zones, currency and nearby places.",
                "3 stades au Mexique 🇲🇽 + 11 aux USA 🇺🇸 + 2 au Canada 🇨🇦. Match d'ouverture à Mexico, finale à New York. Ton guide complet pour chaque ville hôte."
              )}
            </p>

            {/* Stats cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-arena-800 rounded-xl p-4 border border-arena-700">
                <div className="text-3xl font-bold text-oro-400">{venues.length}</div>
                <div className="text-xs text-arena-400 mt-1">{t3(locale, "Ciudades sede", "Host cities", "Villes hôtes")}</div>
              </div>
              <div className="bg-arena-800 rounded-xl p-4 border border-arena-700">
                <div className="text-3xl font-bold text-oro-400">{totalMatches}</div>
                <div className="text-xs text-arena-400 mt-1">{t3(locale, "Partidos totales", "Total matches", "Matchs au total")}</div>
              </div>
              <div className="bg-arena-800 rounded-xl p-4 border border-arena-700">
                <div className="text-3xl font-bold text-jade-400">🇲🇽 {mexicoMatches}</div>
                <div className="text-xs text-arena-400 mt-1">{t3(locale, "Juegos de México", "Mexico games", "Matchs du Mexique")}</div>
              </div>
              <div className="bg-arena-800 rounded-xl p-4 border border-arena-700">
                <div className="text-3xl font-bold text-terracotta-400">Jun 11</div>
                <div className="text-xs text-arena-400 mt-1">{t3(locale, "Inauguración", "Opening day", "Ouverture")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mexico Group A - Partidos */}
      <div className="bg-jade-700 py-8">
        <div className="container-custom">
          <h2 className="font-display text-2xl font-bold text-white mb-6 text-center">
            🇲🇽 {t3(locale, "Partidos de México — Grupo A", "Mexico Matches — Group A", "Matchs du Mexique — Groupe A")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {allMexicoGames.map((match, i) => (
              <div key={i} className="bg-white rounded-xl p-5 text-center shadow-lg">
                <div className="text-xs font-bold text-jade-600 uppercase mb-2">
                  {i === 0 ? `🎉 ${t3(locale, "PARTIDO INAUGURAL", "OPENING MATCH", "MATCH D'OUVERTURE")}` : `${t3(locale, "Fase de Grupos", "Group Stage", "Phase de Groupes")}`}
                </div>
                <div className="flex items-center justify-center gap-4 my-3">
                  <div className="text-center">
                    <div className="text-2xl mb-1">{match.teamA.es.includes("México") ? "🇲🇽" : match.teamA.es.includes("Sudáfrica") ? "🇿🇦" : match.teamA.es.includes("Chequia") ? "🇨🇿" : "🏳️"}</div>
                    <div className="font-bold text-arena-800 text-sm">{locale === "en" ? match.teamA.en : match.teamA.es}</div>
                  </div>
                  <div className="text-xl font-bold text-arena-400">VS</div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">{match.teamB.es.includes("México") ? "🇲🇽" : match.teamB.es.includes("Corea") ? "🇰🇷" : match.teamB.es.includes("Sudáfrica") ? "🇿🇦" : "🏳️"}</div>
                    <div className="font-bold text-arena-800 text-sm">{locale === "en" ? match.teamB.en : match.teamB.es}</div>
                  </div>
                </div>
                <div className="text-sm text-arena-500 mt-2">
                  📅 {match.date} • ⏰ {match.time} hrs
                </div>
                <div className="text-xs text-arena-400 mt-1">
                  {venues.find(v => v.matches.some(m => m.date === match.date && m.isMexicoGame))?.stadium.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sedes en México */}
      <div className="bg-arena-50 py-12">
        <div className="container-custom">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-arena-800 mb-2 text-center">
            🇲🇽 {t3(locale, "Las 3 sedes en México", "The 3 venues in Mexico", "Les 3 stades au Mexique")}
          </h2>
          <p className="text-arena-500 text-center mb-8 max-w-xl mx-auto">
            {t3(locale,
              "Fase de grupos + Ronda de 32 + Octavos. Partido inaugural en el Estadio Azteca.",
              "Group stage + Round of 32 + Round of 16. Opening match at Estadio Azteca.",
              "Phase de groupes + 32es + 8es. Match d'ouverture au Estadio Azteca."
            )}
          </p>
          <MundialVenueGrid venues={mxVenues} />
        </div>
      </div>

      {/* Sedes en EUA */}
      <div className="bg-white py-12 border-t border-arena-200">
        <div className="container-custom">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-arena-800 mb-2 text-center">
            🇺🇸 {t3(locale, "Las 11 sedes en Estados Unidos", "The 11 venues in the United States", "Les 11 stades aux États-Unis")}
          </h2>
          <p className="text-arena-500 text-center mb-8 max-w-2xl mx-auto">
            {t3(locale,
              "Semifinales en Atlanta y Dallas, final en Nueva York (MetLife Stadium, 19 julio). Guía para cada sede: vuelos desde México, transporte local, zonas seguras y cambio USD.",
              "Semifinals in Atlanta and Dallas, final in New York (MetLife Stadium, July 19). Guide for each venue: flights from Mexico, local transport, safe zones and USD exchange.",
              "Demi-finales à Atlanta et Dallas, finale à New York (MetLife Stadium, 19 juillet). Guide pour chaque site : vols depuis le Mexique, transport local, zones sûres et change USD."
            )}
          </p>
          <MundialVenueGrid venues={usVenues} />
        </div>
      </div>

      {/* Sedes en Canadá */}
      {caVenues.length > 0 && (
        <div className="bg-arena-50 py-12 border-t border-arena-200">
          <div className="container-custom">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-arena-800 mb-2 text-center">
              🇨🇦 {t3(locale, "Las 2 sedes en Canadá", "The 2 venues in Canada", "Les 2 stades au Canada")}
            </h2>
            <p className="text-arena-500 text-center mb-8 max-w-2xl mx-auto">
              {t3(locale,
                "Toronto (BMO Field) y Vancouver (BC Place). Fase de grupos y octavos en Vancouver. SIN visa física para mexicanos — solo eTA ($7 CAD en línea).",
                "Toronto (BMO Field) and Vancouver (BC Place). Group stage and R16 in Vancouver. NO physical visa for Mexicans — only eTA ($7 CAD online).",
                "Toronto (BMO Field) et Vancouver (BC Place). Phase de groupes et 8es à Vancouver. PAS de visa physique pour les Mexicains — seulement eTA (7 CAD en ligne)."
              )}
            </p>
            <MundialVenueGrid venues={caVenues} />
          </div>
        </div>
      )}

      {/* Guia rapida: Como llegar a Mexico */}
      <div className="bg-white py-12">
        <div className="container-custom">
          <h2 className="font-display text-2xl font-bold text-arena-800 mb-8 text-center">
            ✈️ {t3(locale, "Cómo llegar a las sedes", "How to reach the venues", "Comment rejoindre les stades")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CDMX */}
            <div className="card p-6">
              <h3 className="font-display font-bold text-arena-800 mb-3">🏙️ Ciudad de México</h3>
              <ul className="space-y-2 text-sm text-arena-600">
                <li>✈️ {t3(locale, "Aeropuerto MEX - vuelos desde todo el mundo", "MEX Airport - flights worldwide", "Aéroport MEX - vols du monde entier")}</li>
                <li>🚇 {t3(locale, "Metro + Metrobús al Estadio Azteca", "Metro + Metrobús to Estadio Azteca", "Métro + Metrobús au Estadio Azteca")}</li>
                <li>🚗 {t3(locale, "Uber/DiDi $150-250 MXN desde centro", "Uber/DiDi $150-250 MXN from downtown", "Uber/DiDi $150-250 MXN du centre")}</li>
                <li>⚠️ {t3(locale, "Altitud 2,240m - aclimatarse 2 días", "Altitude 2,240m - acclimatize 2 days", "Altitude 2 240m - s'acclimater 2 jours")}</li>
              </ul>
              <Link href={`/${locale}/mundial/ciudad-de-mexico`} className="btn-primary mt-4 inline-block text-sm">
                {t3(locale, "Ver guía completa", "See full guide", "Voir le guide")}
              </Link>
            </div>
            {/* Monterrey */}
            <div className="card p-6">
              <h3 className="font-display font-bold text-arena-800 mb-3">🏔️ Monterrey</h3>
              <ul className="space-y-2 text-sm text-arena-600">
                <li>✈️ {t3(locale, "Aeropuerto MTY - vuelos nacionales e internacionales", "MTY Airport - domestic & international flights", "Aéroport MTY - vols nationaux et internationaux")}</li>
                <li>🚇 {t3(locale, "Metro a Exposición + shuttle FIFA", "Metro to Exposición + FIFA shuttle", "Métro à Exposición + navette FIFA")}</li>
                <li>🚗 {t3(locale, "Uber/DiDi $200-350 MXN desde centro", "Uber/DiDi $200-350 MXN from downtown", "Uber/DiDi $200-350 MXN du centre")}</li>
                <li>🌡️ {t3(locale, "CALOR EXTREMO en junio: 35-40°C", "EXTREME HEAT in June: 35-40°C", "CHALEUR EXTRÊME en juin : 35-40°C")}</li>
              </ul>
              <Link href={`/${locale}/mundial/monterrey`} className="btn-primary mt-4 inline-block text-sm">
                {t3(locale, "Ver guía completa", "See full guide", "Voir le guide")}
              </Link>
            </div>
            {/* Guadalajara */}
            <div className="card p-6">
              <h3 className="font-display font-bold text-arena-800 mb-3">🎺 Guadalajara</h3>
              <ul className="space-y-2 text-sm text-arena-600">
                <li>✈️ {t3(locale, "Aeropuerto GDL - vuelos nacionales e internacionales", "GDL Airport - domestic & international flights", "Aéroport GDL - vols nationaux et internationaux")}</li>
                <li>🚇 {t3(locale, "Tren Ligero L3 + shuttle FIFA", "Light Rail L3 + FIFA shuttle", "Tram L3 + navette FIFA")}</li>
                <li>🚗 {t3(locale, "Uber/DiDi $250-400 MXN desde centro", "Uber/DiDi $250-400 MXN from downtown", "Uber/DiDi $250-400 MXN du centre")}</li>
                <li>📍 {t3(locale, "Estadio en Zapopan, 30 min del centro", "Stadium in Zapopan, 30 min from downtown", "Stade à Zapopan, 30 min du centre")}</li>
              </ul>
              <Link href={`/${locale}/mundial/guadalajara`} className="btn-primary mt-4 inline-block text-sm">
                {t3(locale, "Ver guía completa", "See full guide", "Voir le guide")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tips generales */}
      <div className="bg-arena-100 py-12">
        <div className="container-custom">
          <h2 className="font-display text-2xl font-bold text-arena-800 mb-8 text-center">
            📋 {t3(locale, "Guía esencial para el aficionado", "Essential fan guide", "Guide essentiel pour les fans")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-arena-800 mb-2">🎟️ {t3(locale, "Boletos", "Tickets", "Billets")}</h3>
              <p className="text-sm text-arena-600">
                {t3(locale,
                  "Solo compra boletos en FIFA.com/tickets. No compres en reventa callejera. Los precios van de $1,800 a $50,000 MXN dependiendo de la fase y ubicación.",
                  "Only buy tickets at FIFA.com/tickets. Don't buy from street resellers. Prices range from $1,800 to $50,000 MXN depending on phase and location.",
                  "Achetez uniquement sur FIFA.com/tickets. Les prix vont de 1 800 à 50 000 MXN."
                )}
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-arena-800 mb-2">💳 {t3(locale, "Pagos", "Payments", "Paiements")}</h3>
              <p className="text-sm text-arena-600">
                {t3(locale,
                  "Los estadios serán cashless (sin efectivo). Lleva tarjeta de crédito/débito o billetera digital. Hay cajeros ATM afuera de los estadios.",
                  "Stadiums will be cashless. Bring credit/debit cards or digital wallet. ATMs available outside stadiums.",
                  "Les stades seront sans espèces. Apportez cartes ou portefeuille numérique."
                )}
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-arena-800 mb-2">📱 {t3(locale, "Conectividad", "Connectivity", "Connectivité")}</h3>
              <p className="text-sm text-arena-600">
                {t3(locale,
                  "Compra un chip Telcel o AT&T en el aeropuerto ($200-500 MXN con datos). WiFi gratuito en fan zones y muchos restaurantes.",
                  "Buy a Telcel or AT&T SIM at the airport ($200-500 MXN with data). Free WiFi at fan zones and many restaurants.",
                  "Achetez une carte SIM Telcel ou AT&T à l'aéroport (200-500 MXN avec données)."
                )}
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-arena-800 mb-2">👕 {t3(locale, "Jerseys y souvenirs", "Jerseys & souvenirs", "Maillots et souvenirs")}</h3>
              <p className="text-sm text-arena-600">
                {t3(locale,
                  "Compra jerseys oficiales en las tiendas FIFA dentro de fan zones o en línea. Evita falsificaciones callejeras. En Mercado Libre encuentras opciones desde $400 MXN.",
                  "Buy official jerseys at FIFA stores in fan zones or online. Avoid street counterfeits. Mercado Libre has options from $400 MXN.",
                  "Achetez des maillots officiels dans les boutiques FIFA ou en ligne."
                )}
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-arena-800 mb-2">🍺 {t3(locale, "Comida y bebida", "Food & drinks", "Nourriture et boissons")}</h3>
              <p className="text-sm text-arena-600">
                {t3(locale,
                  "Prueba la comida callejera mexicana: tacos, elotes, esquites, aguas frescas. En el estadio los precios son 2-3x más caros. Come antes de entrar.",
                  "Try Mexican street food: tacos, elotes, esquites, aguas frescas. Stadium prices are 2-3x higher. Eat before entering.",
                  "Essayez la cuisine de rue mexicaine. Les prix au stade sont 2-3x plus élevés."
                )}
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-arena-800 mb-2">🔒 {t3(locale, "Seguridad", "Safety", "Sécurité")}</h3>
              <p className="text-sm text-arena-600">
                {t3(locale,
                  "Las zonas de estadios tendrán seguridad reforzada. No lleves mochilas grandes. Usa Uber/DiDi en lugar de taxis callejeros. Guarda tus pertenencias cerca.",
                  "Stadium areas will have enhanced security. Don't bring large backpacks. Use Uber/DiDi instead of street taxis. Keep belongings close.",
                  "Les zones de stade auront une sécurité renforcée. N'apportez pas de grands sacs."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Experiencia mundialista: cerveza, comida, botana */}
      <div className="bg-gradient-to-br from-oro-50 to-terracotta-50 py-12">
        <div className="container-custom">
          <h2 className="font-display text-2xl font-bold text-arena-800 mb-2 text-center">
            🎊 {t3(locale, "La experiencia mundialista mexicana", "The Mexican World Cup experience", "L'expérience mexicaine de la Coupe du Monde")}
          </h2>
          <p className="text-arena-500 text-center mb-8 max-w-xl mx-auto">
            {t3(locale,
              "No solo es fútbol — es una fiesta. Esto es lo que necesitas saber para vivirla como mexicano",
              "It's not just football — it's a party. Here's what you need to know to experience it like a local",
              "Ce n'est pas que du football — c'est une fête. Voici ce qu'il faut savoir"
            )}
          </p>

          <MenuBuilder menu={menu} locale={locale} />

          {/* Ambiente y tradiciones */}
          <TraditionsSection locale={locale} />
        </div>
      </div>

      {/* Presupuesto estimado */}
      <div className="bg-white py-12">
        <div className="container-custom">
          <h2 className="font-display text-2xl font-bold text-arena-800 mb-8 text-center">
            💰 {t3(locale, "Presupuesto estimado por día", "Estimated daily budget", "Budget quotidien estimé")}
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🏨", label: t3(locale, "Hotel (por noche)", "Hotel (per night)", "Hôtel (par nuit)"), range: "$1,500 - $5,000" },
                { icon: "🍽️", label: t3(locale, "Comida (3 comidas)", "Food (3 meals)", "Nourriture (3 repas)"), range: "$500 - $1,500" },
                { icon: "🚗", label: t3(locale, "Transporte", "Transport", "Transport"), range: "$200 - $800" },
                { icon: "🎟️", label: t3(locale, "Boleto partido", "Match ticket", "Billet match"), range: "$1,800 - $15,000" },
                { icon: "🍺", label: t3(locale, "Entretenimiento", "Entertainment", "Divertissement"), range: "$500 - $2,000" },
                { icon: "👕", label: t3(locale, "Souvenirs", "Souvenirs", "Souvenirs"), range: "$400 - $3,000" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-arena-50 rounded-lg p-3">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <div className="text-xs text-arena-500">{item.label}</div>
                    <div className="font-bold text-arena-800 text-sm">{item.range} MXN</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-terracotta-50 border border-terracotta-200 rounded-xl p-4 mt-6 text-center">
              <p className="text-sm text-arena-600">{t3(locale, "Total estimado por día:", "Estimated daily total:", "Total quotidien estimé:")}</p>
              <p className="text-2xl font-bold text-terracotta-600">$4,900 - $27,300 MXN</p>
              <p className="text-xs text-arena-400">({t3(locale, "~$250 - $1,400 USD", "~$250 - $1,400 USD", "~$250 - $1 400 USD")})</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mercado Libre - productos mundialistas */}
      <div className="bg-arena-50 py-8">
        <div className="container-custom">
          <MercadoLibreBanner context="travel" />
        </div>
      </div>

      {/* Planea tu viaje CTA */}
      <div className="bg-arena-900 py-12">
        <div className="container-custom text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-4">
            🛫 {t3(locale, "Planea tu viaje al Mundial", "Plan your World Cup trip", "Planifiez votre voyage")}
          </h2>
          <p className="text-arena-400 mb-6 max-w-xl mx-auto">
            {t3(locale,
              "Busca vuelos, compara hoteles y encuentra las mejores rutas para llegar a cada sede",
              "Search flights, compare hotels and find the best routes to each venue",
              "Cherchez des vols, comparez des hôtels et trouvez les meilleures routes"
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/vuelos`} className="btn-primary text-lg px-8">
              ✈️ {t3(locale, "Buscar vuelos", "Search flights", "Chercher des vols")}
            </Link>
            <Link href={`/${locale}/hoteles`} className="bg-white text-arena-800 font-semibold py-3 px-8 rounded-xl hover:bg-arena-100 transition-colors text-lg">
              🏨 {t3(locale, "Buscar hoteles", "Search hotels", "Chercher des hôtels")}
            </Link>
            <Link href={`/${locale}/rutas`} className="btn-outline border-white text-white hover:bg-white hover:text-arena-900 text-lg px-8">
              🗺️ {t3(locale, "Ver rutas", "See routes", "Voir routes")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

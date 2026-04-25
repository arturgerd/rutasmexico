import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { t3, seoAlternates, seoOpenGraph } from "@/lib/utils";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const title = t3(locale,
    "Sobre RutasMéxico | Guía de viajes por México",
    "About RutasMéxico | Mexico Travel Guide & Comparison",
    "À propos de RutasMéxico | Guide de voyage au Mexique"
  );
  const description = t3(locale,
    "Conoce al equipo detrás de RutasMéxico: comparamos vuelos, autobuses, hoteles y rutas para que viajes por México al mejor precio, sin anuncios invasivos.",
    "Meet the team behind RutasMéxico: we compare flights, buses, hotels and routes so you can travel Mexico at the best price, without invasive ads.",
    "Découvrez l'équipe derrière RutasMéxico : nous comparons vols, bus, hôtels et itinéraires pour voyager au Mexique au meilleur prix, sans publicités intrusives."
  );
  return {
    title,
    description,
    alternates: seoAlternates(locale, "/nosotros"),
    openGraph: seoOpenGraph(locale, title, description, "/nosotros"),
    twitter: { card: "summary_large_image" as const, title, description },
  };
}

export default function NosotrosPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://rutasmexico.com.mx/${locale}/nosotros#editor`,
    name: "Arturo García",
    givenName: "Arturo Gerardo",
    familyName: "García Álvarez",
    alternateName: ["Arturo Gerardo García Álvarez", "Gerardo Álvarez"],
    jobTitle: locale === "es"
      ? "Fundador y editor de RutasMéxico"
      : locale === "fr"
        ? "Fondateur et éditeur de RutasMéxico"
        : "Founder and editor of RutasMéxico",
    description: locale === "es"
      ? "Viajero mexicano radicado en CDMX. Ha recorrido las 32 entidades federativas verificando rutas, terminales y precios de transporte. Verifica precios trimestralmente y confirma cada artículo contra fuentes oficiales (Volaris, VivaAerobus, Aeroméxico, ADO, ETN, Primera Plus)."
      : "Mexican traveler based in Mexico City. Has visited all 32 Mexican states verifying routes, terminals and transport prices. Reviews prices quarterly and confirms every article against official sources (Volaris, VivaAerobus, Aeromexico, ADO, ETN, Primera Plus).",
    url: `https://rutasmexico.com.mx/${locale}/nosotros`,
    image: `https://rutasmexico.com.mx/logo.png`, // TODO: replace with /team/arturo.jpg when supplied
    email: "contacto@rutasmexico.com.mx",
    sameAs: [
      "https://www.linkedin.com/in/arturo-garcia-ia/",
      "https://www.youtube.com/@arturog-IA",
      "https://www.tiktok.com/@arturogga",
      "https://www.instagram.com/arturogerardoga/",
      "https://www.facebook.com/arturo.g.alvarez",
    ],
    worksFor: { "@id": "https://rutasmexico.com.mx/#organization" },
    knowsAbout: [
      "Mexico travel",
      "Mexican domestic transportation",
      "Volaris airline",
      "VivaAerobus airline",
      "Aeroméxico airline",
      "ADO bus line",
      "ETN bus line",
      "Primera Plus bus line",
      "FIFA World Cup 2026 venues in Mexico",
      "Mexican destinations",
    ],
    knowsLanguage: ["es", "en"],
    nationality: { "@type": "Country", name: "Mexico" },
    address: { "@type": "PostalAddress", addressLocality: "Ciudad de México", addressCountry: "MX" },
  };

  return (
    <div className="min-h-screen bg-arena-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="container-custom py-12 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-arena-400 mb-8">
          <Link href={`/${locale}`} className="hover:text-terracotta-500 transition-colors">
            {t3(locale, "Inicio", "Home", "Accueil")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-arena-600">
            {t3(locale, "Sobre nosotros", "About us", "À propos")}
          </span>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg border border-arena-100 p-8 md:p-12">
          {/* Hero */}
          <div className="text-center mb-12">
            <span className="text-5xl mb-4 block">🇲🇽</span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-arena-900 mb-4">
              {t3(locale,
                "Sobre RutasMéxico",
                "About RutasMéxico",
                "À propos de RutasMéxico"
              )}
            </h1>
            <p className="text-arena-500 text-lg max-w-2xl mx-auto">
              {t3(locale,
                "Somos un equipo apasionado por México que creamos la guía de viajes más completa y accesible para explorar nuestro país.",
                "We are a team passionate about Mexico, creating the most complete and accessible travel guide to explore our country.",
                "Nous sommes une équipe passionnée par le Mexique, créant le guide de voyage le plus complet et accessible pour explorer notre pays."
              )}
            </p>
          </div>

          {/* Mission */}
          <section className="mb-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-terracotta-400 to-terracotta-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg shadow-terracotta-500/25">
                🎯
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-arena-900 mb-3">
                  {t3(locale, "Nuestra misión", "Our mission", "Notre mission")}
                </h2>
                <p className="text-arena-600 leading-relaxed">
                  {t3(locale,
                    "En RutasMéxico creemos que viajar por nuestro país debería ser fácil, accesible y emocionante para todos. Nuestra misión es proporcionar información detallada, actualizada y confiable sobre cómo moverse entre las ciudades más increíbles de México, para que cada viajero pueda planificar su aventura con confianza.",
                    "At RutasMéxico, we believe that traveling across our country should be easy, accessible, and exciting for everyone. Our mission is to provide detailed, up-to-date, and reliable information about how to get around Mexico's most incredible cities, so every traveler can plan their adventure with confidence.",
                    "Chez RutasMéxico, nous croyons que voyager à travers notre pays devrait être facile, accessible et passionnant pour tous. Notre mission est de fournir des informations détaillées, à jour et fiables sur la façon de se déplacer entre les villes les plus incroyables du Mexique, afin que chaque voyageur puisse planifier son aventure en toute confiance."
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* Author / Editor profile — visible E-E-A-T signal that the Person schema points to */}
          <section className="mb-12 bg-gradient-to-br from-arena-50 to-terracotta-50/40 rounded-2xl border border-arena-200 p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div
                aria-hidden="true"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-terracotta-500 to-terracotta-700 flex items-center justify-center font-display font-bold text-3xl text-white shadow-lg flex-shrink-0"
              >
                AG
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider text-terracotta-600 font-semibold mb-1">
                  {t3(locale, "Editor responsable", "Lead editor", "Éditeur responsable")}
                </p>
                <h2 className="font-display text-2xl font-bold text-arena-900 mb-1">
                  Arturo García
                </h2>
                <p className="text-sm text-arena-700 mb-3">
                  {t3(locale,
                    "Fundador y editor — Ciudad de México",
                    "Founder and editor — Mexico City",
                    "Fondateur et éditeur — Mexico"
                  )}
                </p>
                <p className="text-arena-700 leading-relaxed mb-4">
                  {t3(locale,
                    "Viajero mexicano radicado en CDMX. He recorrido las 32 entidades federativas verificando rutas, terminales y precios de transporte. Cada artículo de RutasMéxico se publica solo después de que confirmo personalmente los datos clave (precios, horarios, terminales) o los verifico contra las fuentes oficiales de las aerolíneas (Volaris, VivaAerobus, Aeroméxico) y líneas de autobús (ADO, ETN, Primera Plus).",
                    "Mexican traveler based in Mexico City. I have visited all 32 Mexican states verifying routes, terminals and transport prices. Every RutasMéxico article is only published after I personally confirm the key data (prices, schedules, terminals) or verify it against the official sources of airlines (Volaris, VivaAerobus, Aeroméxico) and bus lines (ADO, ETN, Primera Plus).",
                    "Voyageur mexicain basé à Mexico. J'ai parcouru les 32 États du Mexique en vérifiant itinéraires, terminaux et tarifs. Chaque article de RutasMéxico n'est publié qu'après avoir confirmé personnellement les données clés ou les avoir vérifiées auprès des sources officielles."
                  )}
                </p>
                <div className="flex flex-wrap items-center gap-3 mb-4" aria-label={t3(locale, "Redes sociales del autor", "Author social profiles", "Profils sociaux de l'auteur")}>
                  <a href="https://www.linkedin.com/in/arturo-garcia-ia/" target="_blank" rel="me noopener noreferrer" className="text-arena-700 hover:text-terracotta-600 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 rounded">LinkedIn</a>
                  <span className="text-arena-300" aria-hidden>·</span>
                  <a href="https://www.youtube.com/@arturog-IA" target="_blank" rel="me noopener noreferrer" className="text-arena-700 hover:text-terracotta-600 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 rounded">YouTube</a>
                  <span className="text-arena-300" aria-hidden>·</span>
                  <a href="https://www.instagram.com/arturogerardoga/" target="_blank" rel="me noopener noreferrer" className="text-arena-700 hover:text-terracotta-600 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 rounded">Instagram</a>
                  <span className="text-arena-300" aria-hidden>·</span>
                  <a href="https://www.tiktok.com/@arturogga" target="_blank" rel="me noopener noreferrer" className="text-arena-700 hover:text-terracotta-600 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 rounded">TikTok</a>
                  <span className="text-arena-300" aria-hidden>·</span>
                  <a href="https://www.facebook.com/arturo.g.alvarez" target="_blank" rel="me noopener noreferrer" className="text-arena-700 hover:text-terracotta-600 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 rounded">Facebook</a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-white rounded-lg border border-arena-200 px-3 py-2">
                    <div className="font-semibold text-arena-900">
                      {t3(locale, "Especialidad", "Expertise", "Spécialité")}
                    </div>
                    <div className="text-arena-700 mt-0.5">
                      {t3(locale,
                        "Transporte interurbano, presupuestos, Mundial 2026",
                        "Domestic transport, budgets, World Cup 2026",
                        "Transport intérieur, budgets, Coupe du Monde 2026"
                      )}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg border border-arena-200 px-3 py-2">
                    <div className="font-semibold text-arena-900">
                      {t3(locale, "Verificación", "Verification", "Vérification")}
                    </div>
                    <div className="text-arena-700 mt-0.5">
                      {t3(locale,
                        "Precios revisados trimestralmente",
                        "Prices reviewed quarterly",
                        "Prix vérifiés trimestriellement"
                      )}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg border border-arena-200 px-3 py-2">
                    <div className="font-semibold text-arena-900">
                      {t3(locale, "Contacto", "Contact", "Contact")}
                    </div>
                    <div className="text-arena-700 mt-0.5">
                      <Link href={`/${locale}/contacto`} className="text-terracotta-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 rounded">
                        contacto@rutasmexico.com.mx
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What we do */}
          <section className="mb-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-azul-500 to-azul-700 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg shadow-azul-500/25">
                ✈️
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-arena-900 mb-3">
                  {t3(locale, "Qué hacemos", "What we do", "Ce que nous faisons")}
                </h2>
                <p className="text-arena-600 leading-relaxed mb-4">
                  {t3(locale,
                    "Investigamos, verificamos y publicamos guías paso a paso para viajar entre las principales ciudades de México. Cada ruta incluye:",
                    "We research, verify, and publish step-by-step guides for traveling between Mexico's main cities. Each route includes:",
                    "Nous recherchons, vérifions et publions des guides étape par étape pour voyager entre les principales villes du Mexique. Chaque itinéraire comprend :"
                  )}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-16">
              <div className="p-4 bg-arena-50 rounded-xl border border-arena-100">
                <h3 className="font-semibold text-arena-800 text-sm mb-1">
                  {t3(locale, "Comparación de transporte", "Transport comparison", "Comparaison des transports")}
                </h3>
                <p className="text-sm text-arena-500">
                  {t3(locale,
                    "Vuelos, autobuses y opciones en auto con precios estimados y tiempos reales.",
                    "Flights, buses, and driving options with estimated prices and real times.",
                    "Vols, bus et options en voiture avec prix estimés et temps réels."
                  )}
                </p>
              </div>
              <div className="p-4 bg-arena-50 rounded-xl border border-arena-100">
                <h3 className="font-semibold text-arena-800 text-sm mb-1">
                  {t3(locale, "Guías de destino", "Destination guides", "Guides de destination")}
                </h3>
                <p className="text-sm text-arena-500">
                  {t3(locale,
                    "Información completa sobre qué hacer, comer y cómo moverse en cada ciudad.",
                    "Complete information about what to do, eat, and how to get around each city.",
                    "Informations complètes sur quoi faire, manger et comment se déplacer dans chaque ville."
                  )}
                </p>
              </div>
              <div className="p-4 bg-arena-50 rounded-xl border border-arena-100">
                <h3 className="font-semibold text-arena-800 text-sm mb-1">
                  {t3(locale, "Blog de viajes", "Travel blog", "Blog de voyage")}
                </h3>
                <p className="text-sm text-arena-500">
                  {t3(locale,
                    "Artículos con tips, mejores épocas para viajar y guías especializadas.",
                    "Articles with tips, best times to travel, and specialized guides.",
                    "Articles avec des conseils, les meilleures périodes pour voyager et des guides spécialisés."
                  )}
                </p>
              </div>
              <div className="p-4 bg-arena-50 rounded-xl border border-arena-100">
                <h3 className="font-semibold text-arena-800 text-sm mb-1">
                  {t3(locale, "Búsqueda de vuelos y hoteles", "Flight & hotel search", "Recherche de vols et hôtels")}
                </h3>
                <p className="text-sm text-arena-500">
                  {t3(locale,
                    "Herramientas integradas para buscar y comparar precios de vuelos y alojamiento.",
                    "Integrated tools to search and compare flight and accommodation prices.",
                    "Outils intégrés pour rechercher et comparer les prix des vols et hébergements."
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* Editor — EEAT signal */}
          <section className="mb-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-jade-500 to-jade-700 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg shadow-jade-500/25">
                ✍️
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-arena-900 mb-3">
                  {t3(locale, "Quién escribe RutasMéxico", "Who writes RutasMéxico", "Qui écrit RutasMéxico")}
                </h2>
              </div>
            </div>
            <div className="ml-16 bg-white border border-arena-200 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-terracotta-300 to-terracotta-600 flex items-center justify-center text-white text-3xl font-bold shadow-md flex-shrink-0">
                  GA
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-arena-900 text-xl mb-1">Gerardo Álvarez</h3>
                  <p className="text-sm text-terracotta-600 font-semibold mb-3">
                    {t3(locale,
                      "Fundador y editor — RutasMéxico",
                      "Founder and editor — RutasMéxico",
                      "Fondateur et éditeur — RutasMéxico"
                    )}
                  </p>
                  <p className="text-arena-600 leading-relaxed text-sm mb-3">
                    {t3(locale,
                      "Gerardo es un viajero y editor mexicano radicado en la Ciudad de México. Ha recorrido las 32 entidades federativas, comparado precios de cada aerolínea y cadena de autobuses, y se ha hospedado desde hostales en Sayulita hasta resorts en Los Cabos. Cada artículo en RutasMéxico está escrito o revisado personalmente por él, con verificación de precios actualizados al menos una vez por trimestre.",
                      "Gerardo is a Mexican traveler and editor based in Mexico City. He has visited all 32 Mexican states, compared prices from every airline and bus company, and stayed everywhere from Sayulita hostels to Los Cabos resorts. Every article on RutasMéxico is written or reviewed personally by him, with prices verified at least once per quarter.",
                      "Gerardo est un voyageur et éditeur mexicain basé à Mexico. Il a parcouru les 32 États du Mexique, comparé les prix de chaque compagnie aérienne et de bus, et séjourné aussi bien dans des auberges de Sayulita que dans des resorts de Los Cabos. Chaque article sur RutasMéxico est écrit ou révisé personnellement par lui, avec des prix vérifiés au moins une fois par trimestre."
                    )}
                  </p>
                  <p className="text-arena-500 text-sm leading-relaxed">
                    <strong className="text-arena-700">{t3(locale, "Áreas de especialidad:", "Areas of expertise:", "Domaines d'expertise :")}</strong>{" "}
                    {t3(locale,
                      "transporte interurbano (vuelos low-cost mexicanos, líneas ADO/ETN/Primera Plus, Metro CDMX), planeación de itinerarios, presupuesto para viajeros internacionales, logística del Mundial 2026.",
                      "intercity transportation (Mexican low-cost airlines, ADO/ETN/Primera Plus bus lines, CDMX Metro), itinerary planning, budget for international travelers, 2026 World Cup logistics.",
                      "transport interurbain (compagnies low-cost mexicaines, lignes ADO/ETN/Primera Plus, métro de Mexico), planification d'itinéraires, budget pour voyageurs internationaux, logistique de la Coupe du Monde 2026."
                    )}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    <span className="bg-arena-100 text-arena-700 px-3 py-1 rounded-full">
                      📍 {t3(locale, "Ciudad de México, MX", "Mexico City, MX", "Mexico, MX")}
                    </span>
                    <span className="bg-arena-100 text-arena-700 px-3 py-1 rounded-full">
                      🗓️ {t3(locale, "Editor desde 2025", "Editor since 2025", "Éditeur depuis 2025")}
                    </span>
                    <span className="bg-arena-100 text-arena-700 px-3 py-1 rounded-full">
                      🌐 ES · EN · FR
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="mb-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-oro-400 to-oro-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg shadow-oro-500/25">
                💡
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-arena-900 mb-3">
                  {t3(locale, "Nuestros valores", "Our values", "Nos valeurs")}
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-16">
              <div className="text-center p-6 bg-terracotta-50 rounded-xl border border-terracotta-100">
                <span className="text-3xl block mb-3">🔍</span>
                <h3 className="font-display font-bold text-terracotta-700 mb-2">
                  {t3(locale, "Información verificada", "Verified information", "Information vérifiée")}
                </h3>
                <p className="text-sm text-terracotta-600/80">
                  {t3(locale,
                    "Cada ruta y precio es investigado y actualizado regularmente.",
                    "Every route and price is researched and regularly updated.",
                    "Chaque itinéraire et prix est recherché et régulièrement mis à jour."
                  )}
                </p>
              </div>
              <div className="text-center p-6 bg-azul-50 rounded-xl border border-azul-100">
                <span className="text-3xl block mb-3">🌍</span>
                <h3 className="font-display font-bold text-azul-700 mb-2">
                  {t3(locale, "Accesibilidad", "Accessibility", "Accessibilité")}
                </h3>
                <p className="text-sm text-azul-600/80">
                  {t3(locale,
                    "Contenido disponible en español, inglés y francés para todos los viajeros.",
                    "Content available in Spanish, English, and French for all travelers.",
                    "Contenu disponible en espagnol, anglais et français pour tous les voyageurs."
                  )}
                </p>
              </div>
              <div className="text-center p-6 bg-jade-50 rounded-xl border border-jade-100">
                <span className="text-3xl block mb-3">❤️</span>
                <h3 className="font-display font-bold text-jade-700 mb-2">
                  {t3(locale, "Amor por México", "Love for Mexico", "Amour du Mexique")}
                </h3>
                <p className="text-sm text-jade-600/80">
                  {t3(locale,
                    "Promovemos el turismo responsable y la riqueza cultural de cada destino.",
                    "We promote responsible tourism and the cultural richness of each destination.",
                    "Nous promouvons le tourisme responsable et la richesse culturelle de chaque destination."
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* Transparency */}
          <section className="mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-arena-400 to-arena-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg shadow-arena-500/25">
                📋
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-arena-900 mb-3">
                  {t3(locale, "Transparencia", "Transparency", "Transparence")}
                </h2>
                <p className="text-arena-600 leading-relaxed">
                  {t3(locale,
                    "RutasMéxico es un sitio independiente. Parte de nuestros ingresos proviene de enlaces de afiliado a servicios de viaje (como búsquedas de vuelos y hoteles) y publicidad. Esto nos permite mantener el contenido gratuito y actualizado. Los enlaces de afiliado no afectan nuestras recomendaciones: siempre priorizamos la mejor opción para el viajero.",
                    "RutasMéxico is an independent website. Part of our revenue comes from affiliate links to travel services (such as flight and hotel searches) and advertising. This allows us to keep our content free and up-to-date. Affiliate links do not affect our recommendations: we always prioritize the best option for the traveler.",
                    "RutasMéxico est un site indépendant. Une partie de nos revenus provient de liens d'affiliation vers des services de voyage (comme les recherches de vols et d'hôtels) et de la publicité. Cela nous permet de maintenir notre contenu gratuit et à jour. Les liens d'affiliation n'affectent pas nos recommandations : nous privilégions toujours la meilleure option pour le voyageur."
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center pt-8 border-t border-arena-100">
            <p className="text-arena-500 mb-4">
              {t3(locale,
                "¿Tienes preguntas o sugerencias? Nos encantaría escucharte.",
                "Have questions or suggestions? We'd love to hear from you.",
                "Des questions ou des suggestions ? Nous serions ravis de vous entendre."
              )}
            </p>
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              {t3(locale, "Contáctanos", "Contact us", "Contactez-nous")} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { t3 } from "@/lib/utils";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return {
    title: t3(locale, "Sobre Nosotros", "About Us", "À propos"),
    description: t3(locale,
      "Conoce al equipo detrás de RutasMéxico, la guía de viajes más completa para explorar México.",
      "Meet the team behind RutasMéxico, the most complete travel guide for exploring Mexico.",
      "Découvrez l'équipe derrière RutasMéxico, le guide de voyage le plus complet pour explorer le Mexique."
    ),
  };
}

export default function NosotrosPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-arena-50">
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

          {/* Our team */}
          <section className="mb-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-jade-500 to-jade-700 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg shadow-jade-500/25">
                👥
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-arena-900 mb-3">
                  {t3(locale, "Nuestro equipo", "Our team", "Notre équipe")}
                </h2>
                <p className="text-arena-600 leading-relaxed">
                  {t3(locale,
                    "RutasMéxico es creado por un equipo de viajeros mexicanos con sede en la Ciudad de México. Con experiencia recorriendo todo el país, desde las playas del Caribe hasta los pueblos mágicos de la sierra, conocemos de primera mano los retos y las maravillas de viajar por México. Nuestro equipo combina experiencia en tecnología, turismo y creación de contenido para ofrecer la mejor guía posible.",
                    "RutasMéxico is created by a team of Mexican travelers based in Mexico City. With experience traveling across the entire country, from the Caribbean beaches to the magical towns in the mountains, we know firsthand the challenges and wonders of traveling through Mexico. Our team combines expertise in technology, tourism, and content creation to deliver the best possible guide.",
                    "RutasMéxico est créé par une équipe de voyageurs mexicains basés à Mexico. Avec une expérience de voyage à travers tout le pays, des plages des Caraïbes aux villages magiques de la montagne, nous connaissons de première main les défis et les merveilles du voyage au Mexique. Notre équipe combine une expertise en technologie, tourisme et création de contenu pour offrir le meilleur guide possible."
                  )}
                </p>
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

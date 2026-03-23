import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { t3 } from "@/lib/utils";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return {
    title: t3(locale, "Contacto", "Contact", "Contact"),
    description: t3(locale,
      "Contáctanos para preguntas, sugerencias o colaboraciones con RutasMéxico.",
      "Contact us for questions, suggestions or collaborations with RutasMéxico.",
      "Contactez-nous pour des questions, suggestions ou collaborations avec RutasMéxico."
    ),
  };
}

export default function ContactoPage({ params: { locale } }: { params: { locale: string } }) {
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
            {t3(locale, "Contacto", "Contact", "Contact")}
          </span>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg border border-arena-100 p-8 md:p-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-arena-900 mb-4">
            {t3(locale, "Contacto", "Contact Us", "Contactez-nous")}
          </h1>
          <p className="text-arena-500 text-lg mb-10">
            {t3(locale,
              "¿Tienes preguntas, sugerencias o quieres colaborar con nosotros? Nos encantaría saber de ti.",
              "Have questions, suggestions or want to collaborate with us? We'd love to hear from you.",
              "Vous avez des questions, des suggestions ou souhaitez collaborer avec nous ? Nous serions ravis de vous entendre."
            )}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact info cards */}
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4 p-6 bg-arena-50 rounded-2xl border border-arena-100">
                <div className="w-12 h-12 bg-gradient-to-br from-terracotta-400 to-terracotta-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg shadow-terracotta-500/25">
                  ✉️
                </div>
                <div>
                  <h3 className="font-display font-bold text-arena-900 mb-1">Email</h3>
                  <a
                    href="mailto:contacto@rutasmexico.com.mx"
                    className="text-terracotta-500 hover:text-terracotta-600 transition-colors font-medium"
                  >
                    contacto@rutasmexico.com.mx
                  </a>
                  <p className="text-sm text-arena-400 mt-1">
                    {t3(locale,
                      "Respondemos en 24-48 horas",
                      "We respond within 24-48 hours",
                      "Nous répondons sous 24-48 heures"
                    )}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 p-6 bg-arena-50 rounded-2xl border border-arena-100">
                <div className="w-12 h-12 bg-gradient-to-br from-azul-500 to-azul-700 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg shadow-azul-500/25">
                  📍
                </div>
                <div>
                  <h3 className="font-display font-bold text-arena-900 mb-1">
                    {t3(locale, "Ubicación", "Location", "Emplacement")}
                  </h3>
                  <p className="text-arena-600">
                    {t3(locale, "Ciudad de México, México", "Mexico City, Mexico", "Mexico, Mexique")}
                  </p>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start gap-4 p-6 bg-arena-50 rounded-2xl border border-arena-100">
                <div className="w-12 h-12 bg-gradient-to-br from-jade-500 to-jade-700 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg shadow-jade-500/25">
                  🌐
                </div>
                <div>
                  <h3 className="font-display font-bold text-arena-900 mb-1">Web</h3>
                  <p className="text-arena-600">rutasmexico.com.mx</p>
                </div>
              </div>
            </div>

            {/* Topics */}
            <div>
              <h2 className="font-display text-xl font-bold text-arena-900 mb-6">
                {t3(locale, "¿En qué podemos ayudarte?", "How can we help?", "Comment pouvons-nous vous aider ?")}
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-terracotta-50 rounded-xl border border-terracotta-100">
                  <h3 className="font-semibold text-terracotta-700 text-sm mb-1">
                    💬 {t3(locale, "Preguntas generales", "General questions", "Questions générales")}
                  </h3>
                  <p className="text-sm text-terracotta-600/80">
                    {t3(locale,
                      "Información sobre destinos, rutas y cómo usar el sitio.",
                      "Information about destinations, routes and how to use the site.",
                      "Informations sur les destinations, itinéraires et utilisation du site."
                    )}
                  </p>
                </div>

                <div className="p-4 bg-azul-50 rounded-xl border border-azul-100">
                  <h3 className="font-semibold text-azul-700 text-sm mb-1">
                    🤝 {t3(locale, "Colaboraciones", "Partnerships", "Collaborations")}
                  </h3>
                  <p className="text-sm text-azul-600/80">
                    {t3(locale,
                      "¿Tienes un negocio de turismo en México? Trabajemos juntos.",
                      "Have a tourism business in Mexico? Let's work together.",
                      "Vous avez une entreprise touristique au Mexique ? Travaillons ensemble."
                    )}
                  </p>
                </div>

                <div className="p-4 bg-jade-50 rounded-xl border border-jade-100">
                  <h3 className="font-semibold text-jade-700 text-sm mb-1">
                    📝 {t3(locale, "Sugerencias de contenido", "Content suggestions", "Suggestions de contenu")}
                  </h3>
                  <p className="text-sm text-jade-600/80">
                    {t3(locale,
                      "¿Quieres que agreguemos un destino o ruta? Cuéntanos.",
                      "Want us to add a destination or route? Let us know.",
                      "Vous souhaitez que nous ajoutions une destination ? Dites-le nous."
                    )}
                  </p>
                </div>

                <div className="p-4 bg-oro-50 rounded-xl border border-oro-100">
                  <h3 className="font-semibold text-oro-700 text-sm mb-1">
                    🐛 {t3(locale, "Reportar un error", "Report a bug", "Signaler un bug")}
                  </h3>
                  <p className="text-sm text-oro-600/80">
                    {t3(locale,
                      "¿Encontraste información incorrecta o un enlace roto? Avísanos.",
                      "Found incorrect information or a broken link? Let us know.",
                      "Vous avez trouvé une information incorrecte ou un lien cassé ? Prévenez-nous."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

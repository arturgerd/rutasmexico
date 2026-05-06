import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { t3, seoAlternates, seoOpenGraph } from "@/lib/utils";
import ContactForm from "./ContactForm";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const title = t3(locale,
    "Contacto RutasMéxico | Preguntas y colaboraciones",
    "Contact RutasMéxico | Questions & collaborations",
    "Contact RutasMéxico | Questions et collaborations"
  );
  const description = t3(locale,
    "¿Preguntas sobre vuelos, autobuses, hoteles o rutas en México? Contáctanos para sugerencias, colaboraciones editoriales o reportar errores en RutasMéxico.",
    "Questions about flights, buses, hotels or routes in Mexico? Contact us for suggestions, editorial collaborations or to report errors on RutasMéxico.",
    "Questions sur les vols, bus, hôtels ou itinéraires au Mexique ? Contactez-nous pour suggestions, collaborations éditoriales ou signaler des erreurs."
  );
  return {
    title,
    description,
    alternates: seoAlternates(locale, "/contacto"),
    openGraph: seoOpenGraph(locale, title, description, "/contacto"),
    twitter: { card: "summary_large_image" as const, title, description },
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

            {/* Form */}
            <div>
              <h2 className="font-display text-xl font-bold text-arena-900 mb-6">
                {t3(locale, "Envíanos un mensaje", "Send us a message", "Envoyez-nous un message")}
              </h2>
              <ContactForm locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

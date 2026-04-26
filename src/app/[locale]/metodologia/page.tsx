import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { t3, seoAlternates, seoOpenGraph } from "@/lib/utils";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Icon from "@/components/ui/Icon";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  // The locale layout already wraps page titles with `template: '%s | RutasMéxico'`,
  // so the page-level title MUST NOT include "RutasMéxico" itself or it ends up duplicated
  // (e.g. "Metodología editorial | RutasMéxico | RutasMéxico" — caught by external SEO audit).
  const title = t3(locale,
    "Metodología editorial",
    "Editorial methodology",
    "Méthodologie éditoriale"
  );
  const description = t3(locale,
    "Cómo verificamos precios, fuentes oficiales que consultamos, frecuencia de actualización y política de afiliados de RutasMéxico. Transparencia editorial completa.",
    "How we verify prices, the official sources we consult, update cadence, and our affiliate policy at RutasMéxico. Full editorial transparency.",
    "Comment nous vérifions les prix, les sources officielles consultées, la fréquence de mise à jour et notre politique d'affiliation."
  );
  return {
    title,
    description,
    alternates: seoAlternates(locale, "/metodologia"),
    openGraph: seoOpenGraph(locale, title, description, "/metodologia"),
    twitter: { card: "summary_large_image" as const, title, description },
  };
}

const LAST_REVIEW = "2026-04-25";

export default function MetodologiaPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const isEs = locale === "es";

  // The visible review date doubles as schema dateModified so Google sees a single source of truth.
  const formattedDate = new Date(LAST_REVIEW + "T12:00:00").toLocaleDateString(
    locale === "es" ? "es-MX" : locale === "fr" ? "fr-FR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `https://rutasmexico.com.mx/${locale}/metodologia#about`,
    name: t3(locale, "Metodología editorial", "Editorial methodology", "Méthodologie éditoriale"),
    inLanguage: locale === "es" ? "es-MX" : locale === "fr" ? "fr-FR" : "en-US",
    isPartOf: { "@id": "https://rutasmexico.com.mx/#website" },
    publisher: { "@id": "https://rutasmexico.com.mx/#organization" },
    author: { "@id": `https://rutasmexico.com.mx/${locale}/nosotros#editor` },
    dateModified: LAST_REVIEW,
    description: isEs
      ? "Documenta cómo verificamos precios, qué fuentes oficiales consultamos, con qué frecuencia actualizamos cada artículo y cómo manejamos los enlaces de afiliados."
      : "Documents how we verify prices, which official sources we consult, how often we refresh each article, and how we handle affiliate links.",
  };

  return (
    <div className="min-h-screen bg-arena-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <div className="container-custom py-10 max-w-4xl">
        <Breadcrumbs
          className="mb-6"
          items={[
            { name: t3(locale, "Inicio", "Home", "Accueil"), href: `/${locale}` },
            { name: t3(locale, "Metodología", "Methodology", "Méthodologie") },
          ]}
        />

        <article className="bg-white rounded-2xl shadow-sm border border-arena-200 p-6 md:p-10">
          {/* Header */}
          <header className="mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-terracotta-50 text-terracotta-600 mb-4">
              <Icon name="shield" className="w-7 h-7" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-arena-900 mb-3">
              {t3(locale,
                "Metodología editorial",
                "Editorial methodology",
                "Méthodologie éditoriale"
              )}
            </h1>
            <p className="text-lg text-arena-700 leading-relaxed">
              {t3(locale,
                "Cómo verificamos cada precio, ruta y recomendación que publicamos. La transparencia editorial es la base de RutasMéxico — si los datos son falsos, la guía no sirve para planear un viaje real.",
                "How we verify every price, route, and recommendation we publish. Editorial transparency is the foundation of RutasMéxico — if the data is wrong, the guide is useless for planning a real trip.",
                "Comment nous vérifions chaque prix, itinéraire et recommandation. La transparence éditoriale est la base de RutasMéxico."
              )}
            </p>
            <p className="text-sm text-arena-700 mt-4 inline-flex items-center gap-2">
              <Icon name="calendar" className="w-4 h-4 text-jade-600" />
              <span>
                <span className="font-semibold">
                  {t3(locale, "Última revisión: ", "Last reviewed: ", "Dernière révision : ")}
                </span>
                <time dateTime={LAST_REVIEW}>{formattedDate}</time>
              </span>
            </p>
          </header>

          {/* Section 1: Author + verification */}
          <section className="mb-10">
            <h2 className="font-display text-2xl font-bold text-arena-900 mb-3">
              {t3(locale,
                "1. Quién escribe y verifica",
                "1. Who writes and verifies",
                "1. Qui écrit et vérifie"
              )}
            </h2>
            <p className="text-arena-700 leading-relaxed mb-3">
              {t3(locale,
                "Cada artículo lo redacta o revisa personalmente Arturo García (",
                "Every article is written or reviewed personally by Arturo García (",
                "Chaque article est rédigé ou révisé personnellement par Arturo García ("
              )}
              <Link href={`/${locale}/nosotros`} className="text-terracotta-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 rounded">
                {t3(locale, "ver perfil", "see profile", "voir profil")}
              </Link>
              {t3(locale,
                "), editor responsable y viajero mexicano radicado en CDMX. No usamos contenido autogenerado por IA sin revisión humana, no compramos artículos a granel y no aceptamos publicaciones patrocinadas que se hagan pasar por contenido editorial.",
                "), lead editor and Mexican traveler based in Mexico City. We do not use AI-generated content without human review, we do not buy articles in bulk, and we do not accept sponsored posts disguised as editorial content.",
                "), éditeur responsable et voyageur mexicain basé à Mexico. Nous n'utilisons pas de contenu généré par IA sans révision humaine."
              )}
            </p>
          </section>

          {/* Section 2: Price verification */}
          <section className="mb-10">
            <h2 className="font-display text-2xl font-bold text-arena-900 mb-3">
              {t3(locale,
                "2. Cómo verificamos los precios",
                "2. How we verify prices",
                "2. Comment nous vérifions les prix"
              )}
            </h2>
            <p className="text-arena-700 leading-relaxed mb-3">
              {t3(locale,
                "Los precios que aparecen en la guía (vuelos, autobuses, hospedaje, comida) se obtienen de tres fuentes y se cruzan entre sí antes de publicar:",
                "Prices shown in the guide (flights, buses, lodging, food) come from three sources, cross-checked before publishing:",
                "Les prix affichés viennent de trois sources, recoupées avant publication :"
              )}
            </p>
            <ul className="space-y-2 text-arena-700 leading-relaxed mb-3 ml-2">
              <li className="flex items-start gap-2">
                <span className="text-terracotta-600 font-bold mt-0.5">•</span>
                <span>
                  <strong>{t3(locale, "Sitios oficiales de cada operador", "Official sites of each operator", "Sites officiels de chaque opérateur")}:</strong>{" "}
                  {t3(locale,
                    "volaris.com, vivaaerobus.com, aeromexico.com, ado.com.mx, etn.com.mx, primeraplus.com.mx, booking.com, expedia.com.",
                    "volaris.com, vivaaerobus.com, aeromexico.com, ado.com.mx, etn.com.mx, primeraplus.com.mx, booking.com, expedia.com.",
                    "volaris.com, vivaaerobus.com, aeromexico.com, ado.com.mx, etn.com.mx, primeraplus.com.mx, booking.com, expedia.com."
                  )}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-terracotta-600 font-bold mt-0.5">•</span>
                <span>
                  <strong>{t3(locale, "Agregadores en tiempo real", "Real-time aggregators", "Agrégateurs en temps réel")}:</strong>{" "}
                  {t3(locale,
                    "Travelpayouts / Aviasales para vuelos y hoteles. Estos son nuestros socios de afiliados — usamos sus datos pero no inflamos precios para mejorar comisiones.",
                    "Travelpayouts / Aviasales for flights and hotels. These are our affiliate partners — we use their data but never inflate prices to boost commissions.",
                    "Travelpayouts / Aviasales pour les vols et hôtels. Ce sont nos partenaires affiliés — nous utilisons leurs données sans gonfler les prix."
                  )}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-terracotta-600 font-bold mt-0.5">•</span>
                <span>
                  <strong>{t3(locale, "Verificación en sitio", "On-site verification", "Vérification sur place")}:</strong>{" "}
                  {t3(locale,
                    "para destinos clave (CDMX, Cancún, Oaxaca, Mérida, Guadalajara, Puerto Vallarta, Los Cabos) los precios de comida y entradas se confirman recorriendo el destino al menos una vez al año.",
                    "for key destinations (Mexico City, Cancún, Oaxaca, Mérida, Guadalajara, Puerto Vallarta, Los Cabos) food and entry prices are confirmed by traveling to the destination at least once a year.",
                    "pour les destinations clés, les prix sont confirmés sur place au moins une fois par an."
                  )}
                </span>
              </li>
            </ul>
            <p className="text-arena-700 leading-relaxed">
              {t3(locale,
                "Los precios se publican siempre como rango (mín-máx) y en pesos mexicanos (MXN), nunca como valores absolutos que pretendan ser exactos en el momento exacto de la lectura.",
                "Prices are always published as ranges (min-max) and in Mexican pesos (MXN), never as absolute values pretending to be exact at the moment of reading.",
                "Les prix sont publiés sous forme de fourchette (min-max) en pesos mexicains."
              )}
            </p>
          </section>

          {/* Section 3: Update cadence */}
          <section className="mb-10">
            <h2 className="font-display text-2xl font-bold text-arena-900 mb-3">
              {t3(locale,
                "3. Frecuencia de actualización",
                "3. Update cadence",
                "3. Fréquence de mise à jour"
              )}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-arena-200 rounded-xl overflow-hidden">
                <thead className="bg-arena-50">
                  <tr>
                    <th className="text-left px-4 py-2 font-semibold text-arena-900">
                      {t3(locale, "Tipo de contenido", "Content type", "Type de contenu")}
                    </th>
                    <th className="text-left px-4 py-2 font-semibold text-arena-900">
                      {t3(locale, "Cadencia", "Cadence", "Cadence")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-arena-100 text-arena-700">
                  <tr>
                    <td className="px-4 py-2">{t3(locale, "Precios de transporte (vuelos, autobuses)", "Transport prices (flights, buses)", "Prix de transport")}</td>
                    <td className="px-4 py-2 font-medium">{t3(locale, "Trimestral", "Quarterly", "Trimestriel")}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">{t3(locale, "Guías de destino y rutas", "Destination and route guides", "Guides de destination")}</td>
                    <td className="px-4 py-2 font-medium">{t3(locale, "Semestral o tras cambios mayores", "Twice a year or after major changes", "Semestriel")}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">{t3(locale, "Información del Mundial 2026", "World Cup 2026 info", "Coupe du Monde 2026")}</td>
                    <td className="px-4 py-2 font-medium">{t3(locale, "Mensual hasta junio 2026", "Monthly until June 2026", "Mensuel jusqu'en juin 2026")}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">{t3(locale, "Páginas legales (privacidad, términos)", "Legal pages", "Pages légales")}</td>
                    <td className="px-4 py-2 font-medium">{t3(locale, "Cuando cambia la ley o la política", "When law or policy changes", "Lors de changements")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-arena-700 leading-relaxed mt-3">
              {t3(locale,
                "Cada artículo del blog y cada guía de destino muestra la fecha de publicación y, cuando aplica, la fecha de última actualización.",
                "Each blog article and destination guide shows the publication date and, when applicable, the last updated date.",
                "Chaque article affiche la date de publication et, le cas échéant, la dernière mise à jour."
              )}
            </p>
          </section>

          {/* Section 4: Sources */}
          <section className="mb-10">
            <h2 className="font-display text-2xl font-bold text-arena-900 mb-3">
              {t3(locale,
                "4. Fuentes oficiales que consultamos",
                "4. Official sources we consult",
                "4. Sources officielles consultées"
              )}
            </h2>
            <p className="text-arena-700 leading-relaxed mb-3">
              {t3(locale,
                "Para temas que rozan políticas migratorias, requisitos de entrada o seguridad pública (categoría YMYL — Your Money or Your Life), citamos siempre fuentes oficiales y recomendamos que el lector las verifique antes de viajar:",
                "For topics touching on immigration, entry requirements, or public safety (YMYL — Your Money or Your Life), we always cite official sources and ask the reader to verify them before traveling:",
                "Pour l'immigration et la sécurité, nous citons les sources officielles."
              )}
            </p>
            <ul className="space-y-2 text-arena-700 leading-relaxed ml-2">
              <li className="flex items-start gap-2">
                <span className="text-terracotta-600 font-bold mt-0.5">•</span>
                <span>
                  <strong>INM</strong> ({t3(locale, "Instituto Nacional de Migración", "National Immigration Institute", "Institut National d'Immigration")}) —{" "}
                  <a href="https://www.gob.mx/inm" target="_blank" rel="noopener noreferrer" className="text-terracotta-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 rounded">gob.mx/inm</a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-terracotta-600 font-bold mt-0.5">•</span>
                <span>
                  <strong>SECTUR</strong> ({t3(locale, "Secretaría de Turismo", "Ministry of Tourism", "Ministère du Tourisme")}) —{" "}
                  <a href="https://www.gob.mx/sectur" target="_blank" rel="noopener noreferrer" className="text-terracotta-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 rounded">gob.mx/sectur</a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-terracotta-600 font-bold mt-0.5">•</span>
                <span>
                  <strong>SRE</strong> ({t3(locale, "Secretaría de Relaciones Exteriores", "Ministry of Foreign Affairs", "Ministère des Affaires étrangères")}) —{" "}
                  <a href="https://www.gob.mx/sre" target="_blank" rel="noopener noreferrer" className="text-terracotta-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 rounded">gob.mx/sre</a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-terracotta-600 font-bold mt-0.5">•</span>
                <span>
                  <strong>FIFA</strong> ({t3(locale, "Mundial 2026", "World Cup 2026", "Coupe du Monde 2026")}) —{" "}
                  <a href="https://www.fifa.com/es/tournaments/mens/worldcup/canadamexicousa2026" target="_blank" rel="noopener noreferrer" className="text-terracotta-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 rounded">fifa.com</a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-terracotta-600 font-bold mt-0.5">•</span>
                <span>
                  <strong>UNESCO</strong> ({t3(locale, "Patrimonio Mundial en México", "World Heritage in Mexico", "Patrimoine mondial au Mexique")}) —{" "}
                  <a href="https://whc.unesco.org/en/statesparties/mx" target="_blank" rel="noopener noreferrer" className="text-terracotta-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 rounded">whc.unesco.org</a>
                </span>
              </li>
            </ul>
          </section>

          {/* Section 5: Affiliate policy */}
          <section className="mb-10">
            <h2 className="font-display text-2xl font-bold text-arena-900 mb-3">
              {t3(locale,
                "5. Política de afiliados y publicidad",
                "5. Affiliate and advertising policy",
                "5. Politique d'affiliation et de publicité"
              )}
            </h2>
            <p className="text-arena-700 leading-relaxed mb-3">
              {t3(locale,
                "RutasMéxico es un sitio independiente, gratuito para el lector. Cubrimos costos de hosting, viajes de verificación y redacción con dos fuentes:",
                "RutasMéxico is independent and free for readers. We cover hosting, verification travel, and writing with two revenue streams:",
                "RutasMéxico est indépendant et gratuit pour le lecteur."
              )}
            </p>
            <ol className="space-y-2 text-arena-700 leading-relaxed mb-3 ml-2 list-decimal list-inside">
              <li>
                <strong>{t3(locale, "Enlaces de afiliados", "Affiliate links", "Liens d'affiliation")}</strong>{" "}
                {t3(locale,
                  "(Travelpayouts, Aviasales). Si reservas un vuelo, hotel o renta de auto a través de los buscadores integrados, recibimos una comisión del proveedor — sin costo adicional para ti. Las recomendaciones editoriales son independientes de las comisiones: nunca priorizamos una aerolínea o cadena hotelera por pagar más.",
                  "(Travelpayouts, Aviasales). If you book a flight, hotel or car rental through the embedded search, we earn a commission from the provider — at no extra cost to you. Editorial recommendations are independent of commissions: we never rank an airline or hotel chain higher because they pay more.",
                  "Si vous réservez via la recherche intégrée, nous recevons une commission. Les recommandations restent indépendantes."
                )}
              </li>
              <li>
                <strong>{t3(locale, "Anuncios display", "Display ads", "Publicités display")}</strong>{" "}
                {t3(locale,
                  "(Google AdSense, sujeto a aprobación). Los anuncios se gestionan por Google según el contenido de la página y las preferencias del visitante; no controlamos qué anuncios específicos aparecen. AdSense no afecta el contenido editorial ni el orden de las recomendaciones.",
                  "(Google AdSense, subject to approval). Ads are managed by Google based on page content and visitor preferences; we do not control which specific ads appear. AdSense does not influence editorial content or recommendation order.",
                  "Les annonces sont gérées par Google selon le contenu et les préférences."
                )}
              </li>
            </ol>
            <p className="text-arena-700 leading-relaxed">
              {t3(locale,
                "Detalles legales completos en la ",
                "Full legal details on the ",
                "Détails juridiques sur la "
              )}
              <Link href={`/${locale}/privacidad`} className="text-terracotta-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 rounded">
                {t3(locale, "política de privacidad", "privacy policy", "politique de confidentialité")}
              </Link>
              {t3(locale, " y los ", " and ", " et les ")}
              <Link href={`/${locale}/terminos`} className="text-terracotta-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 rounded">
                {t3(locale, "términos de uso", "terms of use", "conditions d'utilisation")}
              </Link>.
            </p>
          </section>

          {/* Section 6: Corrections */}
          <section className="mb-10">
            <h2 className="font-display text-2xl font-bold text-arena-900 mb-3">
              {t3(locale,
                "6. Correcciones y errores",
                "6. Corrections and errors",
                "6. Corrections et erreurs"
              )}
            </h2>
            <p className="text-arena-700 leading-relaxed mb-3">
              {t3(locale,
                "Si encuentras un dato incorrecto (precio desactualizado, terminal cambiada, ruta cancelada), avísanos por correo a ",
                "If you find an error (outdated price, changed terminal, cancelled route), let us know at ",
                "Si vous trouvez une erreur, écrivez à "
              )}
              <a href="mailto:contacto@rutasmexico.com.mx" className="text-terracotta-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 rounded">contacto@rutasmexico.com.mx</a>
              {t3(locale,
                ". Verificamos cada reporte y, si procede, actualizamos el artículo dentro de las 72 horas siguientes con la fecha de modificación visible.",
                ". We verify every report and, if applicable, update the article within 72 hours with the modification date visible.",
                ". Nous vérifions chaque signalement et mettons à jour sous 72h."
              )}
            </p>
            <p className="text-arena-700 leading-relaxed">
              {t3(locale,
                "Para temas con implicaciones financieras, migratorias o de seguridad, siempre recomendamos confirmar con la fuente oficial antes de tomar decisiones. RutasMéxico es una guía editorial — no sustituye al consejo de una agencia de viajes, abogado migratorio o autoridad consular.",
                "For topics with financial, immigration or safety implications, we always recommend confirming with the official source before making decisions. RutasMéxico is an editorial guide — it does not replace a travel agent, immigration lawyer or consular authority.",
                "Pour des questions financières ou migratoires, vérifiez toujours auprès des sources officielles."
              )}
            </p>
          </section>

          {/* Footer link */}
          <div className="mt-10 pt-6 border-t border-arena-200 text-sm text-arena-700">
            <p>
              {t3(locale,
                "¿Preguntas sobre nuestra metodología? ",
                "Questions about our methodology? ",
                "Des questions sur notre méthodologie ? "
              )}
              <Link href={`/${locale}/contacto`} className="text-terracotta-600 hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 rounded">
                {t3(locale, "Escríbenos", "Write to us", "Écrivez-nous")}
              </Link>.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

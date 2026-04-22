import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { t3, seoAlternates } from "@/lib/utils";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return {
    title: t3(locale, "Política de Privacidad", "Privacy Policy", "Politique de Confidentialité"),
    description: t3(locale,
      "Política de privacidad de RutasMéxico. Cómo recopilamos, usamos y protegemos tu información.",
      "RutasMéxico privacy policy. How we collect, use and protect your information.",
      "Politique de confidentialité de RutasMéxico. Comment nous collectons, utilisons et protégeons vos informations."
    ),
    alternates: seoAlternates(locale, "/privacidad"),
  };
}

export default function PrivacidadPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  const lastUpdated = "23 de marzo de 2026";

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
            {t3(locale, "Política de Privacidad", "Privacy Policy", "Politique de Confidentialité")}
          </span>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg border border-arena-100 p-8 md:p-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-arena-900 mb-2">
            {t3(locale, "Política de Privacidad", "Privacy Policy", "Politique de Confidentialité")}
          </h1>
          <p className="text-arena-400 text-sm mb-8">
            {t3(locale, `Última actualización: ${lastUpdated}`, `Last updated: March 23, 2026`, `Dernière mise à jour : 23 mars 2026`)}
          </p>

          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-arena-900 prose-p:text-arena-600 prose-li:text-arena-600 prose-strong:text-arena-800 prose-a:text-terracotta-500">

            {locale === "en" ? (
              <>
                <h2>1. Introduction</h2>
                <p>Welcome to RutasMéxico (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). We operate the website rutasmexico.com.mx. This Privacy Policy explains how we collect, use, disclose and protect your information when you visit our website.</p>

                <h2>2. Information We Collect</h2>
                <h3>Automatically Collected Information</h3>
                <p>When you visit our website, we may automatically collect certain information, including:</p>
                <ul>
                  <li>IP address and approximate geographic location</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent on each page</li>
                  <li>Referring website</li>
                </ul>

                <h3>Cookies and Tracking Technologies</h3>
                <p>We use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. These include:</p>
                <ul>
                  <li><strong>Essential cookies:</strong> Required for the website to function properly.</li>
                  <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our site (e.g., Google Analytics).</li>
                  <li><strong>Advertising cookies:</strong> Used by Google AdSense to display relevant ads.</li>
                </ul>

                <h2>3. How We Use Your Information</h2>
                <p>We use the collected information to:</p>
                <ul>
                  <li>Provide and improve our website and services</li>
                  <li>Analyze usage trends to enhance user experience</li>
                  <li>Display relevant advertising through Google AdSense</li>
                  <li>Generate affiliate referrals through our travel partners (Travelpayouts, Aviasales)</li>
                </ul>

                <h2>4. Third-Party Services</h2>
                <p>Our website uses the following third-party services that may collect information:</p>
                <ul>
                  <li><strong>Google AdSense:</strong> Displays personalized ads. Google may use cookies to serve ads based on your browsing history. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.</li>
                  <li><strong>Travelpayouts / Aviasales:</strong> Our affiliate partner for flight and hotel searches. When you click on search links, you are redirected to their platform. <a href="https://www.travelpayouts.com/privacy" target="_blank" rel="noopener noreferrer">Travelpayouts Privacy Policy</a>.</li>
                  <li><strong>Vercel:</strong> Our hosting provider. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a>.</li>
                </ul>

                <h2>5. Your Rights</h2>
                <p>Depending on your location, you may have the following rights regarding your personal data:</p>
                <ul>
                  <li>Right to access, correct, or delete your personal data</li>
                  <li>Right to object to or restrict processing</li>
                  <li>Right to data portability</li>
                  <li>Right to opt out of targeted advertising</li>
                </ul>
                <p>To exercise these rights, please contact us at the email address listed below.</p>

                <h2>6. Data Security</h2>
                <p>We implement reasonable technical and organizational measures to protect your information. However, no method of transmission over the Internet is 100% secure.</p>

                <h2>7. Children&apos;s Privacy</h2>
                <p>Our website is not directed to children under 13. We do not knowingly collect personal information from children.</p>

                <h2>8. Changes to This Policy</h2>
                <p>We may update this Privacy Policy periodically. Any changes will be posted on this page with an updated revision date.</p>

                <h2>9. Contact Us</h2>
                <p>If you have questions about this Privacy Policy, please contact us at:</p>
                <p><strong>Email:</strong> contacto@rutasmexico.com.mx</p>
              </>
            ) : locale === "fr" ? (
              <>
                <h2>1. Introduction</h2>
                <p>Bienvenue sur RutasMéxico (&quot;nous&quot;, &quot;notre&quot;). Nous exploitons le site web rutasmexico.com.mx. Cette Politique de Confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre site web.</p>

                <h2>2. Informations que nous collectons</h2>
                <h3>Informations collectées automatiquement</h3>
                <p>Lorsque vous visitez notre site web, nous pouvons automatiquement collecter certaines informations, notamment :</p>
                <ul>
                  <li>Adresse IP et localisation géographique approximative</li>
                  <li>Type et version du navigateur</li>
                  <li>Système d&apos;exploitation</li>
                  <li>Pages visitées et temps passé sur chaque page</li>
                  <li>Site web de référence</li>
                </ul>

                <h3>Cookies et technologies de suivi</h3>
                <p>Nous utilisons des cookies et des technologies de suivi similaires pour améliorer votre expérience de navigation et analyser le trafic du site. Ceux-ci comprennent :</p>
                <ul>
                  <li><strong>Cookies essentiels :</strong> Nécessaires au bon fonctionnement du site.</li>
                  <li><strong>Cookies d&apos;analyse :</strong> Nous aident à comprendre comment les visiteurs interagissent avec notre site.</li>
                  <li><strong>Cookies publicitaires :</strong> Utilisés par Google AdSense pour afficher des annonces pertinentes.</li>
                </ul>

                <h2>3. Comment nous utilisons vos informations</h2>
                <p>Nous utilisons les informations collectées pour :</p>
                <ul>
                  <li>Fournir et améliorer notre site web et nos services</li>
                  <li>Analyser les tendances d&apos;utilisation pour améliorer l&apos;expérience utilisateur</li>
                  <li>Afficher des publicités pertinentes via Google AdSense</li>
                  <li>Générer des références d&apos;affiliation via nos partenaires de voyage</li>
                </ul>

                <h2>4. Services tiers</h2>
                <p>Notre site web utilise les services tiers suivants qui peuvent collecter des informations :</p>
                <ul>
                  <li><strong>Google AdSense :</strong> Affiche des annonces personnalisées. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Politique de confidentialité de Google</a>.</li>
                  <li><strong>Travelpayouts / Aviasales :</strong> Notre partenaire d&apos;affiliation pour les recherches de vols et d&apos;hôtels. <a href="https://www.travelpayouts.com/privacy" target="_blank" rel="noopener noreferrer">Politique de confidentialité de Travelpayouts</a>.</li>
                  <li><strong>Vercel :</strong> Notre hébergeur. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Politique de confidentialité de Vercel</a>.</li>
                </ul>

                <h2>5. Vos droits</h2>
                <p>Selon votre localisation, vous pouvez avoir les droits suivants concernant vos données personnelles :</p>
                <ul>
                  <li>Droit d&apos;accès, de rectification ou de suppression de vos données</li>
                  <li>Droit d&apos;opposition ou de limitation du traitement</li>
                  <li>Droit à la portabilité des données</li>
                  <li>Droit de refuser la publicité ciblée</li>
                </ul>

                <h2>6. Sécurité des données</h2>
                <p>Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables pour protéger vos informations.</p>

                <h2>7. Confidentialité des enfants</h2>
                <p>Notre site web ne s&apos;adresse pas aux enfants de moins de 13 ans. Nous ne collectons pas sciemment d&apos;informations personnelles auprès d&apos;enfants.</p>

                <h2>8. Modifications de cette politique</h2>
                <p>Nous pouvons mettre à jour cette Politique de Confidentialité périodiquement. Toute modification sera publiée sur cette page.</p>

                <h2>9. Nous contacter</h2>
                <p>Si vous avez des questions, contactez-nous à :</p>
                <p><strong>Email :</strong> contacto@rutasmexico.com.mx</p>
              </>
            ) : (
              <>
                <h2>1. Introducción</h2>
                <p>Bienvenido a RutasMéxico (&quot;nosotros&quot;, &quot;nuestro&quot;). Operamos el sitio web rutasmexico.com.mx. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos tu información cuando visitas nuestro sitio web.</p>

                <h2>2. Información que recopilamos</h2>
                <h3>Información recopilada automáticamente</h3>
                <p>Cuando visitas nuestro sitio web, podemos recopilar automáticamente cierta información, incluyendo:</p>
                <ul>
                  <li>Dirección IP y ubicación geográfica aproximada</li>
                  <li>Tipo y versión del navegador</li>
                  <li>Sistema operativo</li>
                  <li>Páginas visitadas y tiempo en cada página</li>
                  <li>Sitio web de referencia</li>
                </ul>

                <h3>Cookies y tecnologías de rastreo</h3>
                <p>Utilizamos cookies y tecnologías de rastreo similares para mejorar tu experiencia de navegación y analizar el tráfico del sitio. Estos incluyen:</p>
                <ul>
                  <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento correcto del sitio.</li>
                  <li><strong>Cookies de análisis:</strong> Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio (ej. Google Analytics).</li>
                  <li><strong>Cookies de publicidad:</strong> Utilizadas por Google AdSense para mostrar anuncios relevantes.</li>
                </ul>

                <h2>3. Cómo usamos tu información</h2>
                <p>Usamos la información recopilada para:</p>
                <ul>
                  <li>Proporcionar y mejorar nuestro sitio web y servicios</li>
                  <li>Analizar tendencias de uso para mejorar la experiencia del usuario</li>
                  <li>Mostrar publicidad relevante a través de Google AdSense</li>
                  <li>Generar referencias de afiliados a través de nuestros socios de viaje (Travelpayouts, Aviasales)</li>
                </ul>

                <h2>4. Servicios de terceros</h2>
                <p>Nuestro sitio web utiliza los siguientes servicios de terceros que pueden recopilar información:</p>
                <ul>
                  <li><strong>Google AdSense:</strong> Muestra anuncios personalizados. Google puede usar cookies basadas en tu historial de navegación. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Política de Privacidad de Google</a>.</li>
                  <li><strong>Travelpayouts / Aviasales:</strong> Nuestro socio afiliado para búsquedas de vuelos y hoteles. Al hacer clic en los enlaces, serás redirigido a su plataforma. <a href="https://www.travelpayouts.com/privacy" target="_blank" rel="noopener noreferrer">Política de Privacidad de Travelpayouts</a>.</li>
                  <li><strong>Vercel:</strong> Nuestro proveedor de hospedaje. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Política de Privacidad de Vercel</a>.</li>
                </ul>

                <h2>5. Tus derechos</h2>
                <p>De acuerdo con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) de México, tienes los derechos ARCO:</p>
                <ul>
                  <li><strong>Acceso:</strong> Conocer qué datos personales tenemos sobre ti</li>
                  <li><strong>Rectificación:</strong> Solicitar la corrección de tus datos</li>
                  <li><strong>Cancelación:</strong> Pedir la eliminación de tus datos</li>
                  <li><strong>Oposición:</strong> Oponerte al uso de tus datos para ciertos fines</li>
                </ul>
                <p>Para ejercer estos derechos, contáctanos al correo electrónico indicado abajo.</p>

                <h2>6. Seguridad de los datos</h2>
                <p>Implementamos medidas técnicas y organizativas razonables para proteger tu información. Sin embargo, ningún método de transmisión por Internet es 100% seguro.</p>

                <h2>7. Privacidad de menores</h2>
                <p>Nuestro sitio web no está dirigido a menores de 13 años. No recopilamos conscientemente información personal de menores.</p>

                <h2>8. Cambios a esta política</h2>
                <p>Podemos actualizar esta Política de Privacidad periódicamente. Cualquier cambio será publicado en esta página con una fecha de revisión actualizada.</p>

                <h2>9. Contacto</h2>
                <p>Si tienes preguntas sobre esta Política de Privacidad, contáctanos en:</p>
                <p><strong>Email:</strong> contacto@rutasmexico.com.mx</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

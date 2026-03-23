import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { t3 } from "@/lib/utils";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return {
    title: t3(locale, "Términos y Condiciones", "Terms of Service", "Conditions d'Utilisation"),
    description: t3(locale,
      "Términos y condiciones de uso de RutasMéxico.",
      "RutasMéxico terms of service and conditions of use.",
      "Conditions d'utilisation de RutasMéxico."
    ),
  };
}

export default function TerminosPage({ params: { locale } }: { params: { locale: string } }) {
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
            {t3(locale, "Términos y Condiciones", "Terms of Service", "Conditions d'Utilisation")}
          </span>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg border border-arena-100 p-8 md:p-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-arena-900 mb-2">
            {t3(locale, "Términos y Condiciones", "Terms of Service", "Conditions d'Utilisation")}
          </h1>
          <p className="text-arena-400 text-sm mb-8">
            {t3(locale, `Última actualización: ${lastUpdated}`, `Last updated: March 23, 2026`, `Dernière mise à jour : 23 mars 2026`)}
          </p>

          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-arena-900 prose-p:text-arena-600 prose-li:text-arena-600 prose-strong:text-arena-800 prose-a:text-terracotta-500">

            {locale === "en" ? (
              <>
                <h2>1. Acceptance of Terms</h2>
                <p>By accessing and using RutasMéxico (rutasmexico.com.mx), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.</p>

                <h2>2. Description of Service</h2>
                <p>RutasMéxico is a travel information and comparison website that provides:</p>
                <ul>
                  <li>Travel guides and destination information for Mexico</li>
                  <li>Flight search and price comparison through Aviasales/Travelpayouts</li>
                  <li>Hotel search and price comparison</li>
                  <li>Bus route information and booking links</li>
                  <li>Travel tips and blog articles</li>
                </ul>
                <p>We act as an information aggregator and affiliate referral service. We do not directly sell tickets, hotel rooms, or any travel services.</p>

                <h2>3. Affiliate Disclosure</h2>
                <p>RutasMéxico participates in affiliate programs including Travelpayouts. When you click on links to third-party websites (such as Aviasales for flights, Hotellook for hotels, or Busbud for buses) and make a purchase, we may earn a commission at no additional cost to you.</p>
                <p>This affiliate relationship does not influence the information we provide. We strive to present accurate and unbiased travel information.</p>

                <h2>4. No Warranty on Prices and Information</h2>
                <p>While we make reasonable efforts to ensure accuracy:</p>
                <ul>
                  <li>Prices displayed are estimates and may change without notice</li>
                  <li>Flight and hotel availability is subject to change</li>
                  <li>Travel information (schedules, routes, etc.) may become outdated</li>
                  <li>We are not responsible for inaccuracies in third-party data</li>
                </ul>
                <p>Always verify prices and availability directly with the service provider before booking.</p>

                <h2>5. Third-Party Websites</h2>
                <p>Our website contains links to third-party websites. We are not responsible for the content, privacy policies, or practices of these external sites. When you leave our website, we encourage you to read the terms and policies of the sites you visit.</p>

                <h2>6. Intellectual Property</h2>
                <p>All content on RutasMéxico, including text, graphics, logos, and software, is our property or the property of our licensors and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.</p>

                <h2>7. User Conduct</h2>
                <p>When using our website, you agree not to:</p>
                <ul>
                  <li>Use the site for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the proper functioning of the website</li>
                  <li>Scrape or collect data from the website without permission</li>
                  <li>Use automated systems to access the website in a manner that exceeds reasonable use</li>
                </ul>

                <h2>8. Limitation of Liability</h2>
                <p>RutasMéxico is provided &quot;as is&quot; without warranties of any kind. To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website or reliance on information provided.</p>

                <h2>9. Advertising</h2>
                <p>Our website displays advertisements through Google AdSense. These ads may be personalized based on your browsing activity. Google&apos;s advertising policies govern the display of these ads.</p>

                <h2>10. Changes to Terms</h2>
                <p>We reserve the right to modify these Terms of Service at any time. Changes take effect immediately upon posting. Continued use of the website constitutes acceptance of the modified terms.</p>

                <h2>11. Governing Law</h2>
                <p>These terms are governed by the laws of Mexico. Any disputes shall be resolved in the courts of Mexico City.</p>

                <h2>12. Contact</h2>
                <p>For questions about these terms, contact us at:</p>
                <p><strong>Email:</strong> contacto@rutasmexico.com.mx</p>
              </>
            ) : locale === "fr" ? (
              <>
                <h2>1. Acceptation des conditions</h2>
                <p>En accédant et en utilisant RutasMéxico (rutasmexico.com.mx), vous acceptez d&apos;être lié par ces Conditions d&apos;Utilisation. Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser notre site web.</p>

                <h2>2. Description du service</h2>
                <p>RutasMéxico est un site d&apos;information et de comparaison de voyages qui fournit :</p>
                <ul>
                  <li>Guides de voyage et informations sur les destinations au Mexique</li>
                  <li>Recherche de vols et comparaison de prix via Aviasales/Travelpayouts</li>
                  <li>Recherche d&apos;hôtels et comparaison de prix</li>
                  <li>Informations sur les itinéraires de bus et liens de réservation</li>
                  <li>Conseils de voyage et articles de blog</li>
                </ul>
                <p>Nous agissons en tant qu&apos;agrégateur d&apos;informations et service de référencement affilié. Nous ne vendons pas directement de billets, de chambres d&apos;hôtel ou de services de voyage.</p>

                <h2>3. Divulgation d&apos;affiliation</h2>
                <p>RutasMéxico participe à des programmes d&apos;affiliation, notamment Travelpayouts. Lorsque vous cliquez sur des liens vers des sites tiers et effectuez un achat, nous pouvons recevoir une commission sans coût supplémentaire pour vous.</p>

                <h2>4. Aucune garantie sur les prix et les informations</h2>
                <p>Bien que nous fassions des efforts raisonnables pour assurer l&apos;exactitude :</p>
                <ul>
                  <li>Les prix affichés sont des estimations et peuvent changer sans préavis</li>
                  <li>La disponibilité des vols et des hôtels est sujette à modification</li>
                  <li>Les informations de voyage peuvent devenir obsolètes</li>
                  <li>Nous ne sommes pas responsables des inexactitudes dans les données de tiers</li>
                </ul>

                <h2>5. Sites web tiers</h2>
                <p>Notre site contient des liens vers des sites tiers. Nous ne sommes pas responsables du contenu ou des pratiques de ces sites externes.</p>

                <h2>6. Propriété intellectuelle</h2>
                <p>Tout le contenu de RutasMéxico est notre propriété et est protégé par les lois sur le droit d&apos;auteur. Vous ne pouvez pas reproduire ou distribuer ce contenu sans notre autorisation écrite.</p>

                <h2>7. Limitation de responsabilité</h2>
                <p>RutasMéxico est fourni &quot;tel quel&quot; sans garantie d&apos;aucune sorte. Nous ne serons pas responsables des dommages indirects résultant de votre utilisation du site.</p>

                <h2>8. Publicité</h2>
                <p>Notre site affiche des publicités via Google AdSense. Ces annonces peuvent être personnalisées en fonction de votre activité de navigation.</p>

                <h2>9. Modifications des conditions</h2>
                <p>Nous nous réservons le droit de modifier ces conditions à tout moment. Les changements prennent effet immédiatement après publication.</p>

                <h2>10. Droit applicable</h2>
                <p>Ces conditions sont régies par les lois du Mexique. Tout litige sera résolu devant les tribunaux de Mexico.</p>

                <h2>11. Contact</h2>
                <p>Pour toute question, contactez-nous à :</p>
                <p><strong>Email :</strong> contacto@rutasmexico.com.mx</p>
              </>
            ) : (
              <>
                <h2>1. Aceptación de los términos</h2>
                <p>Al acceder y usar RutasMéxico (rutasmexico.com.mx), aceptas quedar vinculado por estos Términos y Condiciones. Si no estás de acuerdo con estos términos, por favor no utilices nuestro sitio web.</p>

                <h2>2. Descripción del servicio</h2>
                <p>RutasMéxico es un sitio web de información y comparación de viajes que proporciona:</p>
                <ul>
                  <li>Guías de viaje e información de destinos en México</li>
                  <li>Búsqueda y comparación de vuelos a través de Aviasales/Travelpayouts</li>
                  <li>Búsqueda y comparación de hoteles</li>
                  <li>Información de rutas de autobuses y enlaces de reserva</li>
                  <li>Tips de viaje y artículos de blog</li>
                </ul>
                <p>Actuamos como un agregador de información y servicio de referencia de afiliados. No vendemos directamente boletos, habitaciones de hotel ni ningún servicio de viaje.</p>

                <h2>3. Divulgación de afiliados</h2>
                <p>RutasMéxico participa en programas de afiliados incluyendo Travelpayouts. Cuando haces clic en enlaces a sitios web de terceros (como Aviasales para vuelos, Hotellook para hoteles, o Busbud para autobuses) y realizas una compra, podemos ganar una comisión sin costo adicional para ti.</p>
                <p>Esta relación de afiliación no influye en la información que proporcionamos. Nos esforzamos por presentar información de viaje precisa e imparcial.</p>

                <h2>4. Sin garantía sobre precios e información</h2>
                <p>Aunque hacemos esfuerzos razonables para asegurar la precisión:</p>
                <ul>
                  <li>Los precios mostrados son estimaciones y pueden cambiar sin previo aviso</li>
                  <li>La disponibilidad de vuelos y hoteles está sujeta a cambios</li>
                  <li>La información de viaje (horarios, rutas, etc.) puede volverse obsoleta</li>
                  <li>No somos responsables de inexactitudes en datos de terceros</li>
                </ul>
                <p>Siempre verifica precios y disponibilidad directamente con el proveedor del servicio antes de reservar.</p>

                <h2>5. Sitios web de terceros</h2>
                <p>Nuestro sitio web contiene enlaces a sitios de terceros. No somos responsables del contenido, políticas de privacidad o prácticas de estos sitios externos. Cuando abandonas nuestro sitio web, te recomendamos leer los términos y políticas de los sitios que visites.</p>

                <h2>6. Propiedad intelectual</h2>
                <p>Todo el contenido de RutasMéxico, incluyendo texto, gráficos, logotipos y software, es nuestra propiedad o de nuestros licenciantes y está protegido por las leyes de derechos de autor y propiedad intelectual. No puedes reproducir, distribuir ni crear obras derivadas sin nuestro permiso por escrito.</p>

                <h2>7. Conducta del usuario</h2>
                <p>Al usar nuestro sitio web, aceptas no:</p>
                <ul>
                  <li>Usar el sitio para cualquier propósito ilegal</li>
                  <li>Intentar obtener acceso no autorizado a nuestros sistemas</li>
                  <li>Interferir con el funcionamiento adecuado del sitio</li>
                  <li>Hacer scraping o recolectar datos del sitio sin permiso</li>
                  <li>Usar sistemas automatizados para acceder al sitio de manera excesiva</li>
                </ul>

                <h2>8. Limitación de responsabilidad</h2>
                <p>RutasMéxico se proporciona &quot;tal cual&quot; sin garantías de ningún tipo. En la máxima medida permitida por la ley, no seremos responsables de daños indirectos, incidentales, especiales o consecuentes derivados de tu uso del sitio web o de la información proporcionada.</p>

                <h2>9. Publicidad</h2>
                <p>Nuestro sitio web muestra anuncios a través de Google AdSense. Estos anuncios pueden ser personalizados según tu actividad de navegación. Las políticas de publicidad de Google rigen la visualización de estos anuncios.</p>

                <h2>10. Cambios a los términos</h2>
                <p>Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios entran en vigor inmediatamente después de su publicación. El uso continuado del sitio constituye la aceptación de los términos modificados.</p>

                <h2>11. Ley aplicable</h2>
                <p>Estos términos se rigen por las leyes de México. Cualquier disputa se resolverá en los tribunales de la Ciudad de México.</p>

                <h2>12. Contacto</h2>
                <p>Para preguntas sobre estos términos, contáctanos en:</p>
                <p><strong>Email:</strong> contacto@rutasmexico.com.mx</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

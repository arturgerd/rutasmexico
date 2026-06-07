"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import FlagMX from "@/components/ui/FlagMX";
import Icon from "@/components/ui/Icon";

export default function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("common");
  const locale = useLocale();

  return (
    <footer className="bg-arena-900 text-arena-300 mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FlagMX className="w-6 h-4" />
              <span className="font-display font-bold text-xl text-white">
                Rutas<span className="text-terracotta-400">México</span>
              </span>
            </div>
            <p className="text-sm text-arena-200 leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${locale}/mundial`}
                  className="inline-flex items-center gap-1.5 text-jade-300 hover:text-emerald-300 font-semibold transition-colors"
                >
                  <Icon name="ball" className="w-4 h-4" />
                  {locale === "es" ? "Mundial 2026" : "World Cup 2026"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/destinos`} className="hover:text-terracotta-400 transition-colors">
                  {tc("allDestinations")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/rutas`} className="hover:text-terracotta-400 transition-colors">
                  {tc("popularRoutes")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="hover:text-terracotta-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/nosotros`} className="hover:text-terracotta-400 transition-colors">
                  {t("aboutUs")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}/privacidad`} className="hover:text-terracotta-400 transition-colors">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terminos`} className="hover:text-terracotta-400 transition-colors">
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contacto`} className="hover:text-terracotta-400 transition-colors">
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/metodologia`} className="hover:text-terracotta-400 transition-colors">
                  {locale === "es" ? "Metodología" : "Methodology"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Site-wide affiliate + advertising disclosure — required by FTC and AdSense
            "Inventario Valioso" policy. Surfaces the same disclosure that appears in
            individual articles, so it's visible regardless of which page the user lands on. */}
        <div className="border-t border-arena-800 mt-8 pt-6">
          <p className="text-xs text-arena-300 leading-relaxed max-w-3xl mx-auto text-center">
            <span className="font-semibold text-arena-300">
              {locale === "es" ? "Aviso de afiliados y publicidad. " : "Affiliate & advertising disclosure. "}
            </span>
            {locale === "es"
              ? "Esta página contiene enlaces de afiliado (Travelpayouts, Aviasales y otros) y muestra anuncios servidos por Google AdSense. Recibimos una comisión si reservas a través de estos enlaces, sin costo adicional para ti. Nuestras recomendaciones editoriales son independientes. "
              : "This site contains affiliate links (Travelpayouts, Aviasales and others) and displays ads served by Google AdSense. We earn a commission if you book through these links, at no extra cost to you. Our editorial recommendations are independent. "}
            <Link href={`/${locale}/privacidad`} className="underline hover:text-arena-200">
              {locale === "es" ? "Política de privacidad" : "Privacy policy"}
            </Link>
          </p>
        </div>

        <div className="border-t border-arena-800 mt-6 pt-6 text-center text-sm text-arena-500">
          <p>{t("madeWith")} ❤️ {t("inMexico")} &copy; {new Date().getFullYear()} RutasMéxico</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

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
              <span className="text-2xl">🇲🇽</span>
              <span className="font-display font-bold text-xl text-white">
                Rutas<span className="text-terracotta-400">México</span>
              </span>
            </div>
            <p className="text-sm text-arena-400 leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
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
            </ul>
          </div>
        </div>

        <div className="border-t border-arena-800 mt-8 pt-8 text-center text-sm text-arena-500">
          <p>{t("madeWith")} ❤️ {t("inMexico")} &copy; {new Date().getFullYear()} RutasMéxico</p>
        </div>
      </div>
    </footer>
  );
}

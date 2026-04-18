"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations("common");
  const locale = useLocale();

  const homeLabel = locale === "es" ? "Inicio" : locale === "fr" ? "Accueil" : "Home";
  const flightLabel = locale === "es" ? "✈️ Vuelos" : locale === "fr" ? "✈️ Vols" : "✈️ Flights";
  const busLabel = locale === "es" ? "🚌 Autobuses" : locale === "fr" ? "🚌 Bus" : "🚌 Buses";
  const hotelLabel = locale === "es" ? "🏨 Hoteles" : locale === "fr" ? "🏨 Hôtels" : "🏨 Hotels";

  const blogLabel = locale === "es" ? "📝 Blog" : locale === "fr" ? "📝 Blog" : "📝 Blog";

  const weddingLabel = locale === "es" ? "💍 Bodas" : locale === "fr" ? "💍 Mariages" : "💍 Weddings";

  const mundialLabel = locale === "es" ? "Mundial 2026" : locale === "fr" ? "Coupe du Monde 2026" : "World Cup 2026";

  const aboutLabel = locale === "es" ? "Nosotros" : locale === "fr" ? "À propos" : "About";

  const navLinks = [
    { href: `/${locale}`, label: homeLabel },
    { href: `/${locale}/vuelos`, label: flightLabel },
    { href: `/${locale}/autobuses`, label: busLabel },
    { href: `/${locale}/hoteles`, label: hotelLabel },
    { href: `/${locale}/bodas`, label: weddingLabel },
    { href: `/${locale}/destinos`, label: t("allDestinations") },
    { href: `/${locale}/rutas`, label: t("popularRoutes") },
    { href: `/${locale}/blog`, label: blogLabel },
    { href: `/${locale}/nosotros`, label: aboutLabel },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-arena-200 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-2xl">🇲🇽</span>
            <span className="font-display font-bold text-xl text-terracotta-600">
              Rutas<span className="text-azul-700">México</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-arena-700 hover:text-terracotta-500 font-medium transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/mundial`}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-jade-600 to-emerald-500 text-white text-sm font-bold py-1.5 px-3.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
            >
              ⚽ {mundialLabel}
            </Link>
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-arena-700"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-arena-200 pt-4">
            <div className="flex flex-col gap-3">
              <Link
                href={`/${locale}/mundial`}
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-jade-600 to-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-md"
              >
                ⚽ {mundialLabel}
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-arena-700 hover:text-terracotta-500 font-medium py-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <LanguageSwitcher />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

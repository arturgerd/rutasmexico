"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import FlagMX from "@/components/ui/FlagMX";
import Icon from "@/components/ui/Icon";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations("common");
  const locale = useLocale();

  const homeLabel = locale === "es" ? "Inicio" : locale === "fr" ? "Accueil" : "Home";
  const flightLabel = locale === "es" ? "Vuelos" : locale === "fr" ? "Vols" : "Flights";
  const busLabel = locale === "es" ? "Autobuses" : locale === "fr" ? "Bus" : "Buses";
  const hotelLabel = locale === "es" ? "Hoteles" : locale === "fr" ? "Hôtels" : "Hotels";

  const blogLabel = "Blog";

  const weddingLabel = locale === "es" ? "Bodas" : locale === "fr" ? "Mariages" : "Weddings";

  const mundialLabel = locale === "es" ? "Mundial 2026" : locale === "fr" ? "Coupe du Monde 2026" : "World Cup 2026";

  const aboutLabel = locale === "es" ? "Nosotros" : locale === "fr" ? "À propos" : "About";

  type NavLink = { href: string; label: string; icon?: "plane" | "bus" | "hotel" | "ring" | "pen" };

  // Primary links: always visible from md+
  const primaryLinks: NavLink[] = [
    { href: `/${locale}/vuelos`, label: flightLabel, icon: "plane" },
    { href: `/${locale}/autobuses`, label: busLabel, icon: "bus" },
    { href: `/${locale}/hoteles`, label: hotelLabel, icon: "hotel" },
    { href: `/${locale}/destinos`, label: t("allDestinations") },
    { href: `/${locale}/rutas`, label: t("popularRoutes") },
  ];
  // Secondary links: hidden on md, shown on lg+ to avoid overflow
  const secondaryLinks: NavLink[] = [
    { href: `/${locale}/bodas`, label: weddingLabel, icon: "ring" },
    { href: `/${locale}/blog`, label: blogLabel, icon: "pen" },
    { href: `/${locale}/nosotros`, label: aboutLabel },
  ];
  // Mobile menu shows everything including Home
  const mobileLinks: NavLink[] = [
    { href: `/${locale}`, label: homeLabel },
    ...primaryLinks,
    ...secondaryLinks,
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-arena-200 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <FlagMX className="w-6 h-4" />
            <span className="font-display font-bold text-xl text-terracotta-600">
              Rutas<span className="text-azul-700">México</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-5">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1.5 text-arena-700 hover:text-terracotta-500 font-medium transition-colors text-sm whitespace-nowrap rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2"
              >
                {link.icon && <Icon name={link.icon} className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hidden lg:inline-flex items-center gap-1.5 text-arena-700 hover:text-terracotta-500 font-medium transition-colors text-sm whitespace-nowrap rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2"
              >
                {link.icon && <Icon name={link.icon} className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/mundial`}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-jade-700 to-jade-600 text-white text-sm font-bold py-1.5 px-3.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade-500 focus-visible:ring-offset-2"
            >
              <Icon name="ball" className="w-4 h-4" />
              {mundialLabel}
            </Link>
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-3 -mr-3 min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-arena-700 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
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
          <nav id="mobile-nav" className="md:hidden pb-4 border-t border-arena-200 pt-4">
            <div className="flex flex-col gap-3">
              <Link
                href={`/${locale}/mundial`}
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-jade-700 to-jade-600 text-white font-bold py-2.5 px-4 rounded-xl shadow-md"
              >
                <Icon name="ball" className="w-5 h-5" />
                {mundialLabel}
              </Link>
              {mobileLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center gap-2 text-arena-700 hover:text-terracotta-500 font-medium py-2"
                >
                  {link.icon && <Icon name={link.icon} className="w-4 h-4" />}
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

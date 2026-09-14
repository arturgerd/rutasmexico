"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import FlagMX from "@/components/ui/FlagMX";
import Icon from "@/components/ui/Icon";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const t = useTranslations("common");
  const locale = useLocale();

  // Mobile menu keyboard handling (a11y): move focus into the menu when it
  // opens, keep Tab cycling between the toggle button and the menu items so
  // focus cannot wander into the page behind it, and close on Escape returning
  // focus to the toggle button.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const focusables = () => {
      const inNav = mobileNavRef.current
        ? Array.from(mobileNavRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"))
        : [];
      return menuButtonRef.current ? [menuButtonRef.current, ...inNav] : inNav;
    };
    focusables()[1]?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  const homeLabel = locale === "es" ? "Inicio" : "Home";
  const flightLabel = locale === "es" ? "Vuelos" : "Flights";
  const busLabel = locale === "es" ? "Autobuses" : "Buses";
  const hotelLabel = locale === "es" ? "Hoteles" : "Hotels";

  const blogLabel = "Blog";

  const weddingLabel = locale === "es" ? "Bodas" : "Weddings";

  const mundialLabel = locale === "es" ? "Mundial 2026" : "World Cup 2026";
  const futbolLabel = locale === "es" ? "Fútbol" : "Football";

  const aboutLabel = locale === "es" ? "Nosotros" : "About";

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
    { href: `/${locale}/mundial`, label: mundialLabel },
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
          {/* Once elementos no caben en una barra horizontal hasta bien pasados
              los 1300 px. Por debajo de lg la barra entera cede su sitio al menu
              desplegable, y los enlaces secundarios no aparecen hasta xl. En
              ambos casos el menu movil los lista todos, asi que no se pierde
              ningun destino: solo cambia por donde se llega. */}
          <nav aria-label={locale === "es" ? "Navegación principal" : "Main navigation"} className="hidden lg:flex items-center gap-3">
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
                className="hidden xl:inline-flex items-center gap-1.5 text-arena-700 hover:text-terracotta-500 font-medium transition-colors text-sm whitespace-nowrap rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2"
              >
                {link.icon && <Icon name={link.icon} className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/futbol`}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-jade-700 to-jade-600 text-white text-sm font-bold py-1.5 px-3.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade-500 focus-visible:ring-offset-2"
            >
              <Icon name="ball" className="w-4 h-4" />
              {futbolLabel}
            </Link>
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 -mr-3 min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-arena-700 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500"
            aria-label={
              mobileMenuOpen
                ? locale === "es" ? "Cerrar menú" : "Close menu"
                : locale === "es" ? "Abrir menú" : "Open menu"
            }
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
          <nav
            id="mobile-nav"
            ref={mobileNavRef}
            aria-label={locale === "es" ? "Menú de navegación" : "Navigation menu"}
            className="lg:hidden pb-4 border-t border-arena-200 pt-4"
          >
            <div className="flex flex-col gap-3">
              <Link
                href={`/${locale}/futbol`}
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-jade-700 to-jade-600 text-white font-bold py-2.5 px-4 rounded-xl shadow-md"
              >
                <Icon name="ball" className="w-5 h-5" />
                {futbolLabel}
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

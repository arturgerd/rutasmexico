import Link from "next/link";

// Hardcoded "es" instead of headers()-based detection: a single use of `headers()`
// here was opting the entire [locale] segment into dynamic rendering on Vercel,
// which is what was forcing `Cache-Control: no-store` on every page.
// Spanish is our default locale and the highest-traffic 404 surface; English
// readers landing here still see the same links.
export default function NotFound() {
  const locale: "es" | "en" | "fr" = "es";

  const t = {
    es: {
      title: "Página no encontrada",
      desc: "La página que buscas no existe o fue movida. Vuelve al inicio o explora nuestras guías.",
      home: "Volver al inicio",
      blog: "Ver el blog",
      routes: "Explorar rutas",
    },
    en: {
      title: "Page not found",
      desc: "The page you are looking for does not exist or has been moved. Go back home or explore our guides.",
      home: "Back to home",
      blog: "Read the blog",
      routes: "Explore routes",
    },
    fr: {
      title: "Page introuvable",
      desc: "La page que vous recherchez n'existe pas ou a été déplacée. Retournez à l'accueil ou explorez nos guides.",
      home: "Retour à l'accueil",
      blog: "Lire le blog",
      routes: "Explorer les itinéraires",
    },
  }[locale];

  return (
    <div className="container-custom py-20 md:py-28 text-center">
      <p className="text-sm uppercase tracking-widest text-terracotta-600 mb-3">404</p>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
      <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10">{t.desc}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href={`/${locale}`}
          className="inline-block bg-terracotta-600 hover:bg-terracotta-700 text-white px-6 py-3 rounded-lg font-medium"
        >
          {t.home}
        </Link>
        <Link
          href={`/${locale}/blog`}
          className="inline-block border border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium"
        >
          {t.blog}
        </Link>
        <Link
          href={`/${locale}/rutas`}
          className="inline-block border border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium"
        >
          {t.routes}
        </Link>
      </div>
    </div>
  );
}

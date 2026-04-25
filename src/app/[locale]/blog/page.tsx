import { setRequestLocale } from "next-intl/server";
import { getAllBlogPosts } from "@/lib/data/blog";
import BlogFilter from "@/components/blog/BlogFilter";
import { t3, seoAlternates, seoOpenGraph } from "@/lib/utils";

export const revalidate = 86400;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const year = new Date().getFullYear();
  const title = t3(locale,
    `Blog de Viajes México ${year} | Guías, tips y rutas`,
    `Mexico Travel Blog ${year} | Guides, tips & routes`,
    `Blog de Voyage Mexique ${year} | Guides, conseils et routes`
  );
  const description = t3(
    locale,
    `Guías completas, comparativas de aerolíneas, tips de seguridad, rutas y consejos reales para viajar por México en ${year}. Ahorra tiempo y dinero en cada viaje.`,
    `Complete guides, airline comparisons, safety tips, routes and real advice for traveling Mexico in ${year}. Save time and money on every trip.`,
    `Guides complets, comparatifs de compagnies, conseils de sécurité, itinéraires et astuces pour voyager au Mexique en ${year}. Économisez sur chaque voyage.`
  );
  return {
    title,
    description,
    alternates: seoAlternates(locale, "/blog"),
    openGraph: seoOpenGraph(locale, title, description, "/blog"),
    twitter: { card: "summary_large_image" as const, title, description },
  };
}

export default async function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const posts = await getAllBlogPosts();

  const baseUrl = "https://rutasmexico.com.mx";
  const isEs = locale === "es";

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isEs ? "Blog de Viajes México" : locale === "fr" ? "Blog de Voyage Mexique" : "Mexico Travel Blog",
    numberOfItems: posts.length,
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${baseUrl}/${locale}/blog/${p.slug}`,
      name: p.title[locale as "es" | "en"] || p.title.es,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEs ? "Inicio" : "Home", item: `${baseUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: isEs ? "Blog" : "Blog" },
    ],
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero */}
      <div className="relative py-16 md:py-20 bg-gradient-to-br from-terracotta-600 via-terracotta-500 to-oro-500">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-white/20">
            <span>📝</span>
            <span className="text-white text-sm font-medium">
              {t3(locale, `${posts.length} artículos`, `${posts.length} articles`, `${posts.length} articles`)}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {t3(locale, "Blog de Viajes", "Travel Blog", "Blog de Voyage")}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {t3(
              locale,
              "Guías, tips y consejos prácticos para descubrir lo mejor de México",
              "Guides, tips and practical advice to discover the best of Mexico",
              "Guides, conseils et astuces pratiques pour découvrir le meilleur du Mexique"
            )}
          </p>
        </div>
      </div>

      {/* Category filter + Grid */}
      <div className="container-custom py-12">
        <BlogFilter posts={posts} />
      </div>
    </div>
  );
}

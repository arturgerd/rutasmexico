import { setRequestLocale } from "next-intl/server";
import { getAllBlogPosts } from "@/lib/data/blog";
import BlogCard from "@/components/blog/BlogCard";
import { t3 } from "@/lib/utils";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return {
    title: t3(locale, "Blog de Viajes | RutasMéxico", "Travel Blog | RutasMéxico", "Blog de Voyage | RutasMéxico"),
    description: t3(
      locale,
      "Guías de viaje, tips y consejos para viajar por México. Destinos, transporte, seguridad y más.",
      "Travel guides, tips and advice for traveling in Mexico. Destinations, transport, safety and more.",
      "Guides de voyage, conseils et astuces pour voyager au Mexique. Destinations, transport, sécurité et plus."
    ),
  };
}

export default async function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const posts = await getAllBlogPosts();

  const categories = [
    { id: "all", label: t3(locale, "Todos", "All", "Tous") },
    { id: "guia-destino", label: t3(locale, "Guías de destino", "Destination Guides", "Guides de destination") },
    { id: "tips-viaje", label: t3(locale, "Tips de viaje", "Travel Tips", "Conseils de voyage") },
    { id: "transporte", label: t3(locale, "Transporte", "Transportation", "Transport") },
  ];

  return (
    <div className="min-h-screen">
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
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map((cat) => (
            <span
              key={cat.id}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors cursor-default ${
                cat.id === "all"
                  ? "bg-terracotta-500 text-white border-terracotta-500"
                  : "bg-white text-arena-600 border-arena-200 hover:border-terracotta-300 hover:text-terracotta-600"
              }`}
            >
              {cat.label}
            </span>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

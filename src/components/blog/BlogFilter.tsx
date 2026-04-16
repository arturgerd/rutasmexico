"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { BlogPost, BlogCategory } from "@/types/blog";
import { Locale } from "@/types/common";
import { t3 } from "@/lib/utils";
import BlogCard from "./BlogCard";

interface BlogFilterProps {
  posts: BlogPost[];
}

const CATEGORIES: { id: "all" | BlogCategory; labelEs: string; labelEn: string; labelFr: string; emoji: string }[] = [
  { id: "all", labelEs: "Todos", labelEn: "All", labelFr: "Tous", emoji: "📚" },
  { id: "guia-destino", labelEs: "Guías de destino", labelEn: "Destination Guides", labelFr: "Guides de destination", emoji: "🗺️" },
  { id: "tips-viaje", labelEs: "Tips de viaje", labelEn: "Travel Tips", labelFr: "Conseils de voyage", emoji: "💡" },
  { id: "transporte", labelEs: "Transporte", labelEn: "Transportation", labelFr: "Transport", emoji: "🚌" },
  { id: "gastronomia", labelEs: "Gastronomía", labelEn: "Food & Drink", labelFr: "Gastronomie", emoji: "🌮" },
  { id: "cultura", labelEs: "Cultura", labelEn: "Culture", labelFr: "Culture", emoji: "🎭" },
];

export default function BlogFilter({ posts }: BlogFilterProps) {
  const locale = useLocale() as Locale;
  const [activeCategory, setActiveCategory] = useState<"all" | BlogCategory>("all");

  const filteredPosts = activeCategory === "all"
    ? posts
    : posts.filter((post) => post.category === activeCategory);

  const getCategoryCount = (catId: "all" | BlogCategory) => {
    if (catId === "all") return posts.length;
    return posts.filter((p) => p.category === catId).length;
  };

  return (
    <>
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = getCategoryCount(cat.id);
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                isActive
                  ? "bg-terracotta-500 text-white border-terracotta-500 shadow-lg shadow-terracotta-500/25"
                  : "bg-white text-arena-600 border-arena-200 hover:border-terracotta-300 hover:text-terracotta-600 hover:shadow-md"
              }`}
            >
              {cat.emoji} {t3(locale, cat.labelEs, cat.labelEn, cat.labelFr)}
              <span className={`ml-1.5 text-xs ${isActive ? "text-white/80" : "text-arena-400"}`}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Results count */}
      {activeCategory !== "all" && (
        <p className="text-center text-sm text-arena-400 mb-6">
          {t3(
            locale,
            `Mostrando ${filteredPosts.length} artículo${filteredPosts.length !== 1 ? "s" : ""} en esta categoría`,
            `Showing ${filteredPosts.length} article${filteredPosts.length !== 1 ? "s" : ""} in this category`,
            `${filteredPosts.length} article${filteredPosts.length !== 1 ? "s" : ""} dans cette catégorie`
          )}
        </p>
      )}

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* Empty state */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-arena-500 text-lg">
            {t3(locale, "No hay artículos en esta categoría aún", "No articles in this category yet", "Pas encore d'articles dans cette catégorie")}
          </p>
        </div>
      )}
    </>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { BlogPost } from "@/types/blog";
import { l, t3 } from "@/lib/utils";
import { getCategoryLabel, getCategoryColor } from "@/components/blog/BlogCard";

interface RecentBlogPostsProps {
  posts: BlogPost[];
}

export default function RecentBlogPosts({ posts }: RecentBlogPostsProps) {
  const locale = useLocale();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T12:00:00");
    return date.toLocaleDateString(
      locale === "es" ? "es-MX" : locale === "fr" ? "fr-FR" : "en-US",
      { year: "numeric", month: "long", day: "numeric" }
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-jade-100 text-jade-700 rounded-full text-sm font-semibold mb-4">
            {t3(locale, "Blog de viajes", "Travel Blog", "Blog de voyage")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-arena-900 mb-3">
            {t3(locale, "Últimos artículos", "Latest Articles", "Derniers articles")}
          </h2>
          <p className="text-arena-500 text-lg max-w-2xl mx-auto">
            {t3(
              locale,
              "Guías, consejos y todo lo que necesitas para tu próximo viaje por México",
              "Guides, tips and everything you need for your next trip across Mexico",
              "Guides, conseils et tout ce dont vous avez besoin pour votre prochain voyage au Mexique"
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/${locale}/blog/${post.slug}`}
              className="group bg-white rounded-2xl shadow-lg border border-arena-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.featuredImage}
                  alt={l(post.title, locale)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${getCategoryColor(post.category)}`}
                  >
                    {getCategoryLabel(post.category, locale)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display font-bold text-arena-900 text-lg leading-snug group-hover:text-terracotta-600 transition-colors line-clamp-2">
                  {l(post.title, locale)}
                </h3>
                <p className="text-arena-500 text-sm mt-2 line-clamp-2">
                  {l(post.excerpt, locale)}
                </p>
                <div className="flex items-center justify-between mt-4 text-xs text-arena-400">
                  <span>{formatDate(post.publishedDate)}</span>
                  <span>
                    {post.readingTime} {t3(locale, "min de lectura", "min read", "min de lecture")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-10">
          <Link
            href={`/${locale}/blog`}
            className="btn-primary inline-flex items-center gap-2"
          >
            {t3(locale, "Ver todos los artículos", "View all articles", "Voir tous les articles")}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { Locale } from "@/types/common";
import { l, t3 } from "@/lib/utils";
import { getCategoryLabel, getCategoryColor } from "./BlogCard";

export default function BlogContent({ post }: { post: BlogPost }) {
  const locale = useLocale() as Locale;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T12:00:00");
    return date.toLocaleDateString(locale === "es" ? "es-MX" : locale === "fr" ? "fr-FR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-arena-400 mb-6">
        <Link href={`/${locale}`} className="hover:text-terracotta-500 transition-colors">
          {t3(locale, "Inicio", "Home", "Accueil")}
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/${locale}/blog`} className="hover:text-terracotta-500 transition-colors">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-arena-600">{l(post.title, locale)}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${getCategoryColor(post.category)}`}>
            {getCategoryLabel(post.category, locale)}
          </span>
          <span className="text-sm text-arena-400">
            {post.readingTime} {t3(locale, "min de lectura", "min read", "min de lecture")}
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-arena-900 leading-tight">
          {l(post.title, locale)}
        </h1>

        <p className="text-lg text-arena-500 mt-4">
          {l(post.excerpt, locale)}
        </p>

        <div className="flex items-center gap-4 mt-6 text-sm text-arena-400">
          <span className="flex items-center gap-1.5">
            ✍️ {post.author}
          </span>
          <span>•</span>
          <span>{formatDate(post.publishedDate)}</span>
          {post.updatedDate && (
            <>
              <span>•</span>
              <span>{t3(locale, "Actualizado:", "Updated:", "Mis à jour :")} {formatDate(post.updatedDate)}</span>
            </>
          )}
        </div>
      </header>

      {/* Featured Image */}
      <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-10">
        <Image
          src={post.featuredImage}
          alt={l(post.title, locale)}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </div>

      {/* Article Body */}
      <div
        className="prose prose-lg max-w-none
          prose-headings:font-display prose-headings:text-arena-900
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-arena-600 prose-p:leading-relaxed
          prose-li:text-arena-600
          prose-strong:text-arena-800
          prose-a:text-terracotta-500 prose-a:no-underline hover:prose-a:underline
          prose-ul:my-4 prose-ol:my-4
          prose-img:rounded-xl
        "
        dangerouslySetInnerHTML={{ __html: l(post.content, locale) }}
      />

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="mt-10 pt-6 border-t border-arena-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-arena-500">Tags:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-arena-100 text-arena-600 border border-arena-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Back to blog */}
      <div className="mt-8">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-terracotta-500 font-semibold hover:text-terracotta-600 transition-colors"
        >
          ← {t3(locale, "Volver al blog", "Back to blog", "Retour au blog")}
        </Link>
      </div>
    </article>
  );
}

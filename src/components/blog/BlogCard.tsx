"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { BlogPost } from "@/types/blog";
import { l, t3 } from "@/lib/utils";
import { getCategoryLabel, getCategoryColor } from "@/lib/blog-category";

export default function BlogCard({ post }: { post: BlogPost }) {
  const locale = useLocale();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T12:00:00");
    return date.toLocaleDateString(locale === "es" ? "es-MX" : locale === "fr" ? "fr-FR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="group bg-white rounded-2xl shadow-lg border border-arena-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <Image
          src={post.featuredImage}
          alt={l(post.title, locale)}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${getCategoryColor(post.category)}`}>
            {getCategoryLabel(post.category, locale)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-bold text-arena-900 text-lg leading-snug group-hover:text-terracotta-600 transition-colors line-clamp-2">
          {l(post.title, locale)}
        </h3>
        <p className="text-arena-500 text-sm mt-2 line-clamp-3">
          {l(post.excerpt, locale)}
        </p>
        <div className="flex items-center justify-between mt-4 text-xs text-arena-700">
          <span>{formatDate(post.publishedDate)}</span>
          <span>{post.readingTime} {t3(locale, "min de lectura", "min read", "min de lecture")}</span>
        </div>
      </div>
    </Link>
  );
}

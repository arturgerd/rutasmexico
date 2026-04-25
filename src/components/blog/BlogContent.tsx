"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { l, t3 } from "@/lib/utils";
import { getCategoryLabel, getCategoryColor } from "./BlogCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface RelatedPost {
  slug: string;
  title: string;
}

// HowTo schemas reference #step-N anchors. Inject those ids into the first 8 H3s
// of the post body so anchor links resolve and rich result step navigation works.
function injectStepIds(html: string, isHowTo: boolean): string {
  if (!isHowTo) return html;
  let i = 0;
  return html.replace(/<h3([^>]*)>/gi, (full, attrs) => {
    if (i >= 8) return full;
    if (/\bid\s*=/.test(attrs)) return full; // don't override an existing id
    i += 1;
    return `<h3${attrs} id="step-${i}">`;
  });
}

export default function BlogContent({ post, relatedPosts = [] }: { post: BlogPost; relatedPosts?: RelatedPost[] }) {
  const locale = useLocale();
  const isHowTo = /^(como-|cuanto-cuesta|hoteles-|vuelos-|que-hacer)/.test(post.slug)
    || post.tags?.some((t) => /como|paso|guia/.test(t));

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
      <Breadcrumbs
        className="mb-6"
        items={[
          { name: t3(locale, "Inicio", "Home", "Accueil"), href: `/${locale}` },
          { name: "Blog", href: `/${locale}/blog` },
          { name: l(post.title, locale) },
        ]}
      />

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${getCategoryColor(post.category)}`}>
            {getCategoryLabel(post.category, locale)}
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-arena-900 leading-tight">
          {l(post.title, locale)}
        </h1>

        <p className="text-lg text-arena-700 mt-4">
          {l(post.excerpt, locale)}
        </p>

        {/* Author byline — visible E-E-A-T signal, links to the editor profile */}
        <div className="flex items-center gap-3 mt-6 pb-6 border-b border-arena-200">
          <Link
            href={`/${locale}/nosotros`}
            aria-label={`${t3(locale, "Sobre", "About", "À propos de")} ${post.author}`}
            className="w-11 h-11 rounded-full bg-gradient-to-br from-terracotta-500 to-terracotta-700 flex items-center justify-center font-display font-bold text-sm text-white shadow-sm flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2"
          >
            {post.author.split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </Link>
          <div className="text-sm">
            <div className="text-arena-900">
              <span className="text-arena-500">
                {t3(locale, "Por ", "By ", "Par ")}
              </span>
              <Link
                href={`/${locale}/nosotros`}
                className="font-semibold hover:text-terracotta-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 rounded"
              >
                {post.author}
              </Link>
              <span className="text-arena-700"> · </span>
              <span className="text-arena-700">
                {t3(locale, "Editor de RutasMéxico", "Editor at RutasMéxico", "Éditeur de RutasMéxico")}
              </span>
            </div>
            <div className="text-arena-700 mt-0.5 flex flex-wrap items-center gap-x-1.5">
              <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
              {post.updatedDate && (
                <>
                  <span>·</span>
                  <span>
                    {t3(locale, "Actualizado", "Updated", "Mis à jour")}{" "}
                    <time dateTime={post.updatedDate}>{formatDate(post.updatedDate)}</time>
                  </span>
                </>
              )}
              <span>·</span>
              <span>{post.readingTime} {t3(locale, "min de lectura", "min read", "min de lecture")}</span>
            </div>
          </div>
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
        dangerouslySetInnerHTML={{ __html: injectStepIds(l(post.content, locale), isHowTo) }}
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

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-12 pt-8 border-t border-arena-200">
          <h2 className="font-display text-2xl font-bold text-arena-900 mb-4">
            {t3(locale, "Artículos relacionados", "Related articles", "Articles connexes")}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedPosts.map((rp) => (
              <li key={rp.slug}>
                <Link
                  href={`/${locale}/blog/${rp.slug}`}
                  className="block p-4 rounded-xl border border-arena-200 bg-white hover:border-terracotta-400 hover:shadow-md transition-all"
                >
                  <p className="font-semibold text-arena-900 leading-snug">{rp.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
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

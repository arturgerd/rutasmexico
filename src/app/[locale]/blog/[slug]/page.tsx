import { notFound } from "next/navigation";
import { getAllBlogSlugs, getBlogPostBySlug, getBlogPostsByCategory } from "@/lib/data/blog";
import { localize, seoAlternates } from "@/lib/utils";
import { Locale } from "@/types/common";
import { setRequestLocale } from "next-intl/server";
import BlogContent from "@/components/blog/BlogContent";

export const revalidate = 604800;

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.flatMap((slug) => [
    { locale: "es", slug },
    { locale: "en", slug },
  ]);
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  const title = localize(post.title, locale as Locale);
  const description = localize(post.excerpt, locale as Locale);
  const baseUrl = "https://rutasmexico.com.mx";
  const canonicalPath = `/${locale}/blog/${slug}`;

  const ogImage = post.featuredImage?.startsWith("/")
    ? `${baseUrl}${post.featuredImage}`
    : post.featuredImage;

  return {
    title,
    description,
    alternates: seoAlternates(locale, `/blog/${slug}`),
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedDate,
      ...(post.updatedDate && { modifiedTime: post.updatedDate }),
      url: `${baseUrl}${canonicalPath}`,
      authors: [post.author],
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function BlogPostPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const title = localize(post.title, locale as Locale);
  const description = localize(post.excerpt, locale as Locale);
  const baseUrl = "https://rutasmexico.com.mx";

  // Related posts: same category, excluding current, max 3
  const sameCategory = await getBlogPostsByCategory(post.category);
  const relatedPosts = sameCategory
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      title: localize(p.title, locale as Locale),
    }));

  // wordCount: strip HTML tags, collapse whitespace, count whitespace-separated tokens.
  const localizedContent = localize(post.content, locale as Locale);
  const wordCount = localizedContent
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: post.featuredImage,
    author: { "@id": `${baseUrl}/${locale}/nosotros#editor` },
    publisher: { "@id": `${baseUrl}/#organization` },
    datePublished: post.publishedDate,
    ...(post.updatedDate && { dateModified: post.updatedDate }),
    mainEntityOfPage: `${baseUrl}/${locale}/blog/${slug}`,
    keywords: post.tags?.join(", "),
    articleSection: post.category,
    wordCount,
    timeRequired: `PT${post.readingTime}M`,
    inLanguage: locale === "es" ? "es-MX" : locale === "fr" ? "fr-FR" : "en-US",
  };

  // Detect listicle / step-by-step posts so we can emit HowTo schema. Catches:
  //   - explicit prefixes (como-/cuanto-cuesta/hoteles-/vuelos-/que-hacer)
  //   - slugs containing itinerario or guia-completa (multi-day plans)
  //   - "N-dias" patterns (3-dias, 5-dias, 10-dias)
  //   - relevant tag hints (como, paso, guia, itinerario)
  const isHowTo = /^(como-|cuanto-cuesta|hoteles-|vuelos-|que-hacer)/.test(post.slug)
    || /(itinerario|guia-completa|-\d+-dias)/.test(post.slug)
    || post.tags?.some((t) => /como|paso|guia|itinerario/.test(t));
  const stepMatches: string[] = [];
  const h3Re = /<h3[^>]*>([^<]+)<\/h3>/gi;
  let m: RegExpExecArray | null;
  while ((m = h3Re.exec(localizedContent)) !== null && stepMatches.length < 8) {
    stepMatches.push(m[1].trim());
  }
  const howToSchema = isHowTo && stepMatches.length >= 3
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: title,
        description,
        image: post.featuredImage,
        totalTime: `PT${post.readingTime}M`,
        step: stepMatches.map((stepName, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: stepName,
          url: `${baseUrl}/${locale}/blog/${slug}#step-${i + 1}`,
        })),
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : "Home", item: `${baseUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/${locale}/blog` },
      { "@type": "ListItem", position: 3, name: title },
    ],
  };

  // FAQPage schema — only when we're NOT already emitting HowTo (Google
  // discourages stacking both schemas on the same page, since they signal
  // different intents). Detect Q&A pairs by scanning H2/H3 headings that
  // start with ¿ (Spanish question opener), end with ?, or start with an
  // English question word, then capture the following content as the answer.
  const faqs: { question: string; answer: string }[] = [];
  if (!howToSchema) {
    const sectionRe = /<(h2|h3)[^>]*>([\s\S]*?)<\/\1>([\s\S]*?)(?=<h[23][^>]*>|$)/gi;
    let s: RegExpExecArray | null;
    while ((s = sectionRe.exec(localizedContent)) !== null && faqs.length < 10) {
      const heading = s[2].replace(/<[^>]+>/g, "").replace(/&[a-z]+;/gi, " ").trim();
      const isQuestion = /^¿/.test(heading)
        || /\?\s*$/.test(heading)
        || /^(what|how|why|when|where|which|is|are|do|does|can)\b/i.test(heading);
      if (!isQuestion) continue;
      const answer = s[3].replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
      // Skip too-short (likely just a paragraph stub) or too-long answers (whole
      // section dumps confuse the FAQ pattern).
      if (answer.length < 40 || answer.length > 900) continue;
      faqs.push({ question: heading, answer });
    }
  }
  const faqSchema = faqs.length >= 2
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {howToSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      )}
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="min-h-screen bg-white">
        <div className="container-custom py-10">
          <BlogContent post={post} relatedPosts={relatedPosts} />
        </div>
      </div>
    </>
  );
}

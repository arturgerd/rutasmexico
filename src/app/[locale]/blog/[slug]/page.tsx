import { notFound } from "next/navigation";
import { getAllBlogSlugs, getBlogPostBySlug, getBlogPostsByCategory } from "@/lib/data/blog";
import { localize, seoAlternates } from "@/lib/utils";
import { Locale } from "@/types/common";
import { setRequestLocale } from "next-intl/server";
import BlogContent from "@/components/blog/BlogContent";

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.flatMap((slug) => [
    { locale: "es", slug },
    { locale: "en", slug },
    { locale: "fr", slug },
  ]);
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  const title = localize(post.title, locale as Locale);
  const description = localize(post.excerpt, locale as Locale);
  const baseUrl = "https://rutasmexico.com.mx";
  const canonicalPath = `/${locale}/blog/${slug}`;

  return {
    title,
    description,
    alternates: seoAlternates(locale, `/blog/${slug}`),
    openGraph: {
      title,
      description,
      images: [{ url: post.featuredImage, width: 800, height: 500 }],
      type: "article",
      publishedTime: post.publishedDate,
      ...(post.updatedDate && { modifiedTime: post.updatedDate }),
      url: `${baseUrl}${canonicalPath}`,
      authors: [post.author],
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: post.featuredImage,
    author: { "@type": "Organization", name: post.author, url: baseUrl },
    publisher: { "@type": "Organization", name: "RutasMéxico", url: baseUrl },
    datePublished: post.publishedDate,
    ...(post.updatedDate && { dateModified: post.updatedDate }),
    mainEntityOfPage: `${baseUrl}/${locale}/blog/${slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : "Home", item: `${baseUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/${locale}/blog` },
      { "@type": "ListItem", position: 3, name: title },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="min-h-screen bg-white">
        <div className="container-custom py-10">
          <BlogContent post={post} relatedPosts={relatedPosts} />
        </div>
      </div>
    </>
  );
}

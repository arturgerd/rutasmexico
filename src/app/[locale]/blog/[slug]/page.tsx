import { notFound } from "next/navigation";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/data/blog";
import { localize } from "@/lib/utils";
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
  return {
    title: `${localize(post.title, locale as Locale)} | RutasMéxico`,
    description: localize(post.excerpt, locale as Locale),
    openGraph: {
      title: localize(post.title, locale as Locale),
      description: localize(post.excerpt, locale as Locale),
      images: [{ url: post.featuredImage, width: 800, height: 500 }],
      type: "article",
      publishedTime: post.publishedDate,
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

  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom py-10">
        <BlogContent post={post} />
      </div>
    </div>
  );
}

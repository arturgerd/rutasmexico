import { BlogPost, BlogCategory } from "@/types/blog";
import blogPostsData from "@/data/blog-posts.json";

// Hide posts whose publishedDate is in the future. ISR (revalidate windows on
// the blog list and post pages) reissues fresh data daily, so a scheduled post
// surfaces within 24h of its date without manual intervention.
const today = new Date().toISOString().slice(0, 10);
const blogPosts = (blogPostsData as BlogPost[])
  .filter((p) => p.publishedDate <= today)
  .sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return blogPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return blogPosts.find((p) => p.slug === slug) || null;
}

export async function getBlogPostsByCategory(category: BlogCategory): Promise<BlogPost[]> {
  return blogPosts.filter((p) => p.category === category);
}

export async function getRecentBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  return blogPosts.slice(0, limit);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  return blogPosts.map((p) => p.slug);
}

// Strip accents/case so "México" matches "mexico" when comparing slugs/tags/titles.
function normalize(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

// Surface blog posts that talk about a given destination, to build destino→blog
// topical clusters (internal linking + E-E-A-T). Matches a post when the
// destination's slug or shortName appears in the post's slug, tags or title.
// Generic needles ("mexico") are skipped to avoid matching every post.
export async function getBlogPostsForDestination(
  destination: { slug: string; shortName?: string },
  limit = 4
): Promise<BlogPost[]> {
  const needles = [destination.slug, destination.shortName ?? ""]
    .map(normalize)
    .filter((n) => n.length >= 4 && n !== "mexico");
  if (needles.length === 0) return [];

  return blogPosts
    .filter((p) => {
      const haystack = normalize(
        [p.slug, p.tags.join(" "), p.title.es, p.title.en].join(" ")
      );
      return needles.some((n) => haystack.includes(n));
    })
    .slice(0, limit);
}

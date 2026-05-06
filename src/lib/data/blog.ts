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

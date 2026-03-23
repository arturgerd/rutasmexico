import { BlogPost, BlogCategory } from "@/types/blog";
import blogPostsData from "@/data/blog-posts.json";

const blogPosts = (blogPostsData as BlogPost[]).sort(
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

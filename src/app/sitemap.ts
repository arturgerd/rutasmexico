import { MetadataRoute } from "next";
import destinations from "@/data/destinations.json";
import blogPosts from "@/data/blog-posts.json";
import routes from "@/data/routes.json";
import bodas from "@/data/bodas.json";

const BASE_URL = "https://rutasmexico.com.mx";
const locales = ["es", "en"];

function generateAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${BASE_URL}/${locale}${path}`;
  }
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  const staticPages = [
    { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
    { path: "/vuelos", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/autobuses", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/hoteles", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/destinos", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/rutas", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/blog", changeFrequency: "daily" as const, priority: 0.8 },
    { path: "/bodas", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/nosotros", changeFrequency: "monthly" as const, priority: 0.5 },
    { path: "/contacto", changeFrequency: "monthly" as const, priority: 0.4 },
    { path: "/privacidad", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/terminos", changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  for (const page of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: generateAlternates(page.path),
      });
    }
  }

  // Destination pages
  for (const dest of destinations) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/destinos/${dest.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: generateAlternates(`/destinos/${dest.slug}`),
      });
    }
  }

  // Blog posts
  for (const post of blogPosts) {
    const postWithDates = post as typeof post & { updatedDate?: string };
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(postWithDates.updatedDate || post.publishedDate),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: generateAlternates(`/blog/${post.slug}`),
      });
    }
  }

  // Route pages
  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/rutas/${route.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: generateAlternates(`/rutas/${route.slug}`),
      });
    }
  }

  // Bodas (wedding) pages
  for (const boda of bodas) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/bodas/${boda.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: generateAlternates(`/bodas/${boda.slug}`),
      });
    }
  }

  return entries;
}

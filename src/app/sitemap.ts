import { MetadataRoute } from "next";
import destinations from "@/data/destinations.json";
import blogPosts from "@/data/blog-posts.json";
import routes from "@/data/routes.json";
import bodas from "@/data/bodas.json";
import mundialVenues from "@/data/mundial-venues.json";

const BASE_URL = "https://rutasmexico.com.mx";
// FR omitted from sitemap until translations reach parity with es/en —
// exposing FR URLs with mostly-Spanish content triggers Google duplicate-content penalties.
// Routes still resolve at /fr/* via next-intl; we just don't advertise them to crawlers yet.
const locales = ["es", "en"];

// Stable build-time date so the sitemap doesn't tell Google "everything changed"
// on every crawl. Bump this when doing a sweep update across many static pages.
const BUILD_DATE = new Date("2026-04-26");

// Per-entry lastModified resolver: if a data file entry exposes its own lastModified
// (yyyy-mm-dd or ISO), use it; otherwise fall back to BUILD_DATE. This lets us refresh
// individual destinos/rutas/bodas without bumping every URL in the sitemap.
function resolveLastModified(entry: { lastModified?: string }): Date {
  if (entry.lastModified) {
    const d = new Date(entry.lastModified);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return BUILD_DATE;
}

function generateAlternates(path: string) {
  // Only es/en in hreflang map — same reason as the locales constant above.
  const languages: Record<string, string> = {
    es: `${BASE_URL}/es${path}`,
    en: `${BASE_URL}/en${path}`,
    "x-default": `${BASE_URL}/es${path}`,
  };
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
    { path: "/mundial", changeFrequency: "weekly" as const, priority: 0.95 },
    { path: "/mundial/calendario", changeFrequency: "weekly" as const, priority: 0.92 },
    { path: "/nosotros", changeFrequency: "monthly" as const, priority: 0.5 },
    { path: "/metodologia", changeFrequency: "monthly" as const, priority: 0.5 },
    { path: "/contacto", changeFrequency: "monthly" as const, priority: 0.4 },
    { path: "/privacidad", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/terminos", changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  for (const page of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: BUILD_DATE,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: generateAlternates(page.path),
      });
    }
  }

  // Destination pages
  for (const dest of destinations) {
    const lm = resolveLastModified(dest as { lastModified?: string });
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/destinos/${dest.slug}`,
        lastModified: lm,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: generateAlternates(`/destinos/${dest.slug}`),
      });
    }
  }

  // Blog posts — use real publishedDate / updatedDate so Google sees stable timestamps
  for (const post of blogPosts) {
    const postWithDates = post as typeof post & { updatedDate?: string };
    const isMundialPost = post.slug.includes("mundial") || post.slug.includes("estadio-azteca") || post.slug.includes("estadio-bbva");
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(postWithDates.updatedDate || post.publishedDate),
        changeFrequency: "monthly",
        priority: isMundialPost ? 0.9 : 0.7,
        alternates: generateAlternates(`/blog/${post.slug}`),
      });
    }
  }

  // Route pages
  for (const route of routes) {
    const lm = resolveLastModified(route as { lastModified?: string });
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/rutas/${route.slug}`,
        lastModified: lm,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: generateAlternates(`/rutas/${route.slug}`),
      });
    }
  }

  // Bodas (wedding) pages
  for (const boda of bodas) {
    const lm = resolveLastModified(boda as { lastModified?: string });
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/bodas/${boda.slug}`,
        lastModified: lm,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: generateAlternates(`/bodas/${boda.slug}`),
      });
    }
  }

  // Mundial 2026 venue pages (16 venues × 2 locales = 32 URLs)
  for (const venue of mundialVenues) {
    const lm = resolveLastModified(venue as { lastModified?: string });
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/mundial/${venue.slug}`,
        lastModified: lm,
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: generateAlternates(`/mundial/${venue.slug}`),
      });
    }
  }

  return entries;
}

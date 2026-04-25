import { NextRequest } from "next/server";
import { getAllBlogPosts } from "@/lib/data/blog";
import { localize } from "@/lib/utils";
import { Locale } from "@/types/common";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://rutasmexico.com.mx";

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function GET(
  _req: NextRequest,
  { params: { locale } }: { params: { locale: string } }
) {
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    return new Response("Not found", { status: 404 });
  }

  const posts = await getAllBlogPosts();
  const l = locale as Locale;
  const siteTitle =
    locale === "fr"
      ? "RutasMexico — Blog voyage au Mexique"
      : locale === "en"
        ? "RutasMexico — Mexico travel blog"
        : "RutasMéxico — Blog de viajes por México";
  const siteDescription =
    locale === "fr"
      ? "Guides, itinéraires et conseils pour voyager au Mexique."
      : locale === "en"
        ? "Guides, itineraries and tips for traveling in Mexico."
        : "Guías, itinerarios y consejos para viajar por México.";

  const feedUrl = `${BASE_URL}/${locale}/feed.xml`;
  const blogUrl = `${BASE_URL}/${locale}/blog`;
  const now = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${BASE_URL}/${locale}/blog/${post.slug}`;
      const pubDate = new Date(post.publishedDate).toUTCString();
      const title = xmlEscape(localize(post.title, l));
      const description = xmlEscape(localize(post.excerpt, l));
      return `<item>
  <title>${title}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <pubDate>${pubDate}</pubDate>
  <description>${description}</description>
  ${post.featuredImage ? `<enclosure url="${xmlEscape(post.featuredImage)}" type="image/jpeg" />` : ""}
  <category>${xmlEscape(post.category)}</category>
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${xmlEscape(siteTitle)}</title>
  <link>${blogUrl}</link>
  <description>${xmlEscape(siteDescription)}</description>
  <language>${locale}</language>
  <lastBuildDate>${now}</lastBuildDate>
  <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

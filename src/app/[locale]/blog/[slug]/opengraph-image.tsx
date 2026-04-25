import { ImageResponse } from "next/og";
import { getBlogPostBySlug } from "@/lib/data/blog";
import { localize } from "@/lib/utils";
import { Locale } from "@/types/common";

export const runtime = "edge";
export const revalidate = 3600;
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = "RutasMéxico — Blog post card";

export default async function Image({ params }: { params: { locale: string; slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return new ImageResponse(<div>Not found</div>, size);

  const locale = params.locale as Locale;
  const title = localize(post.title, locale);
  const featured = post.featuredImage;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#1E3A5F",
        }}
      >
        {featured && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={featured}
            alt=""
            width={1200}
            height={630}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.88) 100%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 70,
            width: "100%",
            color: "white",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 26, fontWeight: 600 }}>
            <span>MX</span>
            <span style={{ opacity: 0.9 }}>RutasMéxico — Blog</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                background: "#C8553D",
                color: "white",
                padding: "8px 22px",
                borderRadius: 999,
                fontSize: 24,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
                alignSelf: "flex-start",
                display: "flex",
              }}
            >
              {post.category.replace(/-/g, " ")}
            </div>
            <div
              style={{
                fontSize: title.length > 70 ? 64 : 78,
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: -1.5,
                maxWidth: 1060,
              }}
            >
              {title}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 24, opacity: 0.9 }}>
              <span style={{ display: "flex" }}>{post.author}</span>
              <span style={{ display: "flex" }}>•</span>
              <span style={{ display: "flex" }}>
                {post.readingTime} min
              </span>
              <span style={{ display: "flex" }}>•</span>
              <span style={{ display: "flex" }}>rutasmexico.com.mx</span>
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}

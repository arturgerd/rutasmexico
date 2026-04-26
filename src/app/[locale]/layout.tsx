import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SetHtmlLang from "@/components/layout/SetHtmlLang";
import { seoAlternates, seoOpenGraph } from "@/lib/utils";

// Without generateStaticParams Next.js can't pre-render the locale layout, so every
// request is rendered on demand and Vercel emits Cache-Control: no-store. We only
// pre-render es/en — fr translations are incomplete (~80% missing) and break the build
// when a translator falls back to undefined; fr URLs still work, just dynamically.
const STATIC_LOCALES = ["es", "en"] as const;
export function generateStaticParams() {
  return STATIC_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "common" });
  const title = `${t("siteName")} - ${t("tagline")}`;
  const description = t("tagline");
  return {
    title: {
      default: title,
      template: `%s | ${t("siteName")}`,
    },
    description,
    alternates: seoAlternates(locale, ""),
    openGraph: seoOpenGraph(locale, title, description, "", "https://rutasmexico.com.mx/og-image.png"),
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://rutasmexico.com.mx/og-image.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const skipLabel = locale === "fr" ? "Aller au contenu" : locale === "en" ? "Skip to content" : "Ir al contenido";
  const rssTitle = locale === "fr" ? "RutasMexico — Blog RSS" : locale === "en" ? "RutasMexico — Blog RSS" : "RutasMéxico — Blog RSS";

  return (
    <NextIntlClientProvider messages={messages}>
      <link
        rel="alternate"
        type="application/rss+xml"
        title={rssTitle}
        href={`https://rutasmexico.com.mx/${locale}/feed.xml`}
      />
      <SetHtmlLang locale={locale} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-3 focus:rounded-lg focus:bg-terracotta-600 focus:text-white focus:font-semibold focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white"
      >
        {skipLabel}
      </a>
      <Header />
      <main id="main-content" className="flex-grow">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}

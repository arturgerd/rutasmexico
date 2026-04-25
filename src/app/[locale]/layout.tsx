import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SetHtmlLang from "@/components/layout/SetHtmlLang";
import { seoAlternates, seoOpenGraph } from "@/lib/utils";

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

  return (
    <NextIntlClientProvider messages={messages}>
      <SetHtmlLang locale={locale} />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}

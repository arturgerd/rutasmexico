import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://rutasmexico.com.mx"),
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default" as const,
    title: "RutasMéxico",
  },
  verification: {
    google: "a588a56f7dc54021",
    other: {
      // AdSense ownership tag — kept alongside the adsbygoogle.js script in the
      // [locale] layout so both signals are present for the crawler.
      "google-adsense-account": "ca-pub-6589074911542620",
    },
  },
};

export const viewport = {
  themeColor: "#C8553D",
  width: "device-width",
  initialScale: 1,
};

// Pass-through root layout: <html lang> must reflect the locale, which is only known
// in src/app/[locale]/layout.tsx — so the document shell lives there. Keeping the
// static <html lang="es"> here served Spanish-declared HTML for every /en page
// (crawlers/screen readers saw the wrong language; the old SetHtmlLang client fix
// only ran after hydration). The root not-found.tsx renders its own <html>.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

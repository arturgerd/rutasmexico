import "./globals.css";
import Script from "next/script";
import ConsentManager from "@/components/layout/ConsentManager";
import { inter, outfit } from "@/lib/fonts";

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
  },
};

export const viewport = {
  themeColor: "#C8553D",
  width: "device-width",
  initialScale: 1,
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID; // e.g. "G-XXXXXXXXXX"
const ADSENSE_CLIENT = "ca-pub-6589074911542620";

// Site-wide schemas use @graph + @id so per-page Article/TouristDestination/Event schemas
// can reference Organization/WebSite by id without re-declaring them.
const SITE_GRAPH_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://rutasmexico.com.mx/#organization",
      name: "RutasMéxico",
      alternateName: "RutasMexico",
      url: "https://rutasmexico.com.mx",
      logo: {
        "@type": "ImageObject",
        "@id": "https://rutasmexico.com.mx/#logo",
        url: "https://rutasmexico.com.mx/logo.png",
        width: 512,
        height: 512,
        caption: "RutasMéxico",
      },
      image: { "@id": "https://rutasmexico.com.mx/#logo" },
      description:
        "Guía completa para viajar por México. Rutas, destinos, vuelos, autobuses, hoteles y guías paso a paso.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ciudad de México",
        addressCountry: "MX",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "contacto@rutasmexico.com.mx",
        contactType: "customer support",
        availableLanguage: ["Spanish", "English", "French"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://rutasmexico.com.mx/#website",
      url: "https://rutasmexico.com.mx",
      name: "RutasMéxico",
      publisher: { "@id": "https://rutasmexico.com.mx/#organization" },
      inLanguage: ["es-MX", "en"],
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://rutasmexico.com.mx/es/rutas?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect to third-party origins used by scripts below to shave TLS/DNS time off LCP */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://emrldco.com" />
        <link rel="dns-prefetch" href="https://tp.media" />

        {/*
          Google Consent Mode v2 — default all consent to "denied" BEFORE any Google tag loads.
          ConsentManager (client component) updates this via gtag('consent','update',...) when the
          user accepts/rejects cookies. beforeInteractive is required for this to run pre-gtag.
        */}
        <Script id="gtag-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              wait_for_update: 500
            });
          `}
        </Script>

        {/* Google Analytics — loads always; personalization gated by Consent Mode above */}
        {GA_ID && (
          <>
            <Script
              id="ga-script"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  anonymize_ip: true,
                  cookie_flags: 'SameSite=None;Secure'
                });
              `}
            </Script>
          </>
        )}

        {/* Google AdSense — loads always so Google can verify ownership; serving is gated by Consent Mode */}
        <Script
          id="google-adsense"
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />

        {/* JSON-LD structured data — @graph linking lets per-page schemas reference these by @id */}
        <Script
          id="site-graph-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_GRAPH_JSONLD) }}
        />

        {/* Travelpayouts site verification */}
        <Script
          id="travelpayouts-verification"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var script = document.createElement("script");
                script.async = 1;
                script.src = 'https://emrldco.com/NTEwNjU0.js?t=510654';
                document.head.appendChild(script);
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
        {/* ConsentManager handles the cookie banner UI and pushes gtag consent updates */}
        <ConsentManager />
      </body>
    </html>
  );
}

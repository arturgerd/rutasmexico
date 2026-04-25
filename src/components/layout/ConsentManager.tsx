"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { t3 } from "@/lib/utils";

const CONSENT_KEY = "rutasmexico-cookie-consent";

type ConsentValue = "accepted" | "rejected" | null;

// gtag dataLayer push helper — typed minimally
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
  }
}

function getLocaleFromPath(pathname: string): string {
  const match = pathname.match(/^\/(es|en|fr)(\/|$)/);
  return match ? match[1] : "es";
}

// Push a gtag command to the dataLayer without needing the global function reference
function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // gtag is traditionally implemented by pushing the raw `arguments`; we emulate it with an array
  window.dataLayer.push(args);
}

export default function ConsentManager() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname || "/es");
  const [consent, setConsent] = useState<ConsentValue>(null);
  const [mounted, setMounted] = useState(false);

  // Read stored consent on mount and, if we already have consent granted, push the update to gtag
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(CONSENT_KEY) as ConsentValue;
      if (stored === "accepted" || stored === "rejected") {
        setConsent(stored);
        if (stored === "accepted") {
          // On repeat visits, let gtag know consent was previously granted
          gtag("consent", "update", {
            ad_storage: "granted",
            ad_user_data: "granted",
            ad_personalization: "granted",
            analytics_storage: "granted",
          });
        }
      }
    } catch {
      // localStorage may be unavailable
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "accepted");
    } catch {
      // ignore
    }
    setConsent("accepted");
    // Update Google Consent Mode in real time
    gtag("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });
  };

  const handleReject = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "rejected");
    } catch {
      // ignore
    }
    setConsent("rejected");
    // Keep consent denied — explicit update for clarity
    gtag("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
  };

  return (
    <>
      {/* Cookie banner - slim bottom bar; only show after mount and if no decision yet */}
      {mounted && consent === null && (
        <div
          role="region"
          aria-label={t3(locale, "Consentimiento de cookies", "Cookie consent", "Consentement aux cookies")}
          className="fixed bottom-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-md border-t border-arena-200 shadow-lg"
        >
          <div className="container-custom py-2.5 md:py-3">
            <div className="flex flex-row items-center gap-3">
              <span aria-hidden className="text-lg flex-shrink-0">🍪</span>
              <p id="cookie-consent-description" className="flex-1 text-xs md:text-sm text-arena-700 leading-snug">
                <span id="cookie-consent-title" className="font-semibold text-arena-900">
                  {t3(locale, "Cookies. ", "Cookies. ", "Cookies. ")}
                </span>
                {t3(locale,
                  "Usamos cookies para anuncios y analítica.",
                  "We use cookies for ads and analytics.",
                  "Nous utilisons des cookies pour les pubs et l'analyse."
                )}{" "}
                <Link
                  href={`/${locale}/privacidad`}
                  className="text-terracotta-600 hover:text-terracotta-700 underline font-medium hidden sm:inline"
                >
                  {t3(locale, "Privacidad", "Privacy", "Confidentialité")}
                </Link>
              </p>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={handleReject}
                  className="px-3 py-2 min-h-[36px] text-xs md:text-sm font-medium text-arena-700 bg-arena-100 hover:bg-arena-200 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500"
                >
                  {t3(locale, "Rechazar", "Reject", "Refuser")}
                </button>
                <button
                  onClick={handleAccept}
                  className="px-4 py-2 min-h-[36px] text-xs md:text-sm font-semibold text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-lg transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-terracotta-500"
                >
                  {t3(locale, "Aceptar", "Accept", "Accepter")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

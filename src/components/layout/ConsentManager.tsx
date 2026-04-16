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
      {/* Cookie banner - only show after mount and if no decision yet */}
      {mounted && consent === null && (
        <div
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
          className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t-2 border-arena-200 shadow-2xl"
        >
          <div className="container-custom py-4 md:py-5">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-1">
                <h2
                  id="cookie-consent-title"
                  className="font-display font-bold text-arena-900 text-base md:text-lg mb-1 flex items-center gap-2"
                >
                  <span className="text-xl">🍪</span>
                  {t3(locale,
                    "Usamos cookies",
                    "We use cookies",
                    "Nous utilisons des cookies"
                  )}
                </h2>
                <p id="cookie-consent-description" className="text-sm text-arena-600 leading-relaxed">
                  {t3(locale,
                    "Usamos cookies y tecnologías similares para mejorar tu experiencia, analizar el tráfico y mostrar publicidad personalizada (Google AdSense). Puedes aceptar todas las cookies o rechazar las opcionales. Consulta nuestra",
                    "We use cookies and similar technologies to enhance your experience, analyze traffic, and show personalized ads (Google AdSense). You can accept all cookies or reject optional ones. See our",
                    "Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience, analyser le trafic et afficher des publicités personnalisées (Google AdSense). Vous pouvez accepter tous les cookies ou refuser ceux qui sont facultatifs. Consultez notre"
                  )}{" "}
                  <Link
                    href={`/${locale}/privacidad`}
                    className="text-terracotta-600 hover:text-terracotta-700 underline font-medium"
                  >
                    {t3(locale,
                      "política de privacidad",
                      "privacy policy",
                      "politique de confidentialité"
                    )}
                  </Link>
                  .
                </p>
              </div>
              <div className="flex gap-2 w-full md:w-auto flex-shrink-0">
                <button
                  onClick={handleReject}
                  className="flex-1 md:flex-initial px-4 py-2.5 text-sm font-medium text-arena-700 bg-arena-100 hover:bg-arena-200 rounded-xl transition-colors"
                >
                  {t3(locale, "Rechazar", "Reject", "Refuser")}
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 md:flex-initial px-6 py-2.5 text-sm font-semibold text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-xl transition-colors shadow-md"
                >
                  {t3(locale, "Aceptar todas", "Accept all", "Tout accepter")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

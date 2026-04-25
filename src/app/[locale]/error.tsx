"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const locale = (params?.locale as string) || "es";

  useEffect(() => {
    if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "exception", {
        description: error.message,
        fatal: true,
      });
    }
  }, [error]);

  const t = {
    es: {
      title: "Algo salió mal",
      desc: "Ocurrió un error inesperado. Puedes reintentar o volver al inicio.",
      retry: "Reintentar",
      home: "Volver al inicio",
    },
    en: {
      title: "Something went wrong",
      desc: "An unexpected error occurred. You can retry or go back home.",
      retry: "Try again",
      home: "Back to home",
    },
    fr: {
      title: "Une erreur est survenue",
      desc: "Une erreur inattendue s'est produite. Vous pouvez réessayer ou revenir à l'accueil.",
      retry: "Réessayer",
      home: "Retour à l'accueil",
    },
  }[locale === "fr" ? "fr" : locale === "en" ? "en" : "es"];

  return (
    <div className="container-custom py-20 md:py-28 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
      <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10">{t.desc}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={reset}
          className="inline-block bg-terracotta-600 hover:bg-terracotta-700 text-white px-6 py-3 rounded-lg font-medium"
        >
          {t.retry}
        </button>
        <Link
          href={`/${locale}`}
          className="inline-block border border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium"
        >
          {t.home}
        </Link>
      </div>
    </div>
  );
}

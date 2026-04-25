"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const baseBtn = "min-w-[44px] min-h-[36px] px-3 py-2 rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500";
  return (
    <div role="group" aria-label="Language" className="flex items-center gap-1 bg-arena-100 rounded-lg p-1">
      <button
        onClick={() => switchLocale("es")}
        aria-pressed={locale === "es"}
        aria-label="Cambiar idioma a español"
        className={`${baseBtn} ${
          locale === "es"
            ? "bg-white text-terracotta-600 shadow-sm"
            : "text-arena-700 hover:text-terracotta-600"
        }`}
      >
        ES
      </button>
      <button
        onClick={() => switchLocale("en")}
        aria-pressed={locale === "en"}
        aria-label="Switch language to English"
        className={`${baseBtn} ${
          locale === "en"
            ? "bg-white text-terracotta-600 shadow-sm"
            : "text-arena-700 hover:text-terracotta-600"
        }`}
      >
        EN
      </button>
    </div>
  );
}

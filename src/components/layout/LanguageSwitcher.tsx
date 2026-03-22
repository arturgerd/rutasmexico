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

  return (
    <div className="flex items-center gap-1 bg-arena-100 rounded-lg p-1">
      <button
        onClick={() => switchLocale("es")}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
          locale === "es"
            ? "bg-white text-terracotta-600 shadow-sm"
            : "text-arena-500 hover:text-arena-700"
        }`}
      >
        ES
      </button>
      <button
        onClick={() => switchLocale("en")}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
          locale === "en"
            ? "bg-white text-terracotta-600 shadow-sm"
            : "text-arena-500 hover:text-arena-700"
        }`}
      >
        EN
      </button>
    </div>
  );
}

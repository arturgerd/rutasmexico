"use client";

import { useLocale } from "next-intl";
import { t3 } from "@/lib/utils";
import { Locale } from "@/types/common";

type ProductContext = "travel" | "wedding" | "beach" | "general";

interface Product {
  emoji: string;
  name: { es: string; en: string };
  url: string;
}

const PRODUCTS: Record<ProductContext, Product[]> = {
  travel: [
    { emoji: "🧳", name: { es: "Maleta de cabina", en: "Carry-on luggage" }, url: "https://meli.la/1tAhVWw" },
    { emoji: "🧳", name: { es: "Set de maletas", en: "Luggage set" }, url: "https://meli.la/2KvWTes" },
    { emoji: "😴", name: { es: "Almohada de viaje", en: "Travel pillow" }, url: "https://meli.la/1u3tzjn" },
    { emoji: "🔌", name: { es: "Adaptador universal", en: "Universal adapter" }, url: "https://meli.la/2sPF1cr" },
    { emoji: "📦", name: { es: "Organizador maleta", en: "Packing cubes" }, url: "https://meli.la/1sS7HKd" },
    { emoji: "🔒", name: { es: "Candado TSA", en: "TSA lock" }, url: "https://meli.la/2T7ZvCH" },
    { emoji: "🔋", name: { es: "Power bank 20000mAh", en: "Power bank 20000mAh" }, url: "https://meli.la/2k7HHpf" },
    { emoji: "🎧", name: { es: "Audífonos bluetooth", en: "Bluetooth headphones" }, url: "https://meli.la/2wcP9dv" },
  ],
  wedding: [
    { emoji: "👰", name: { es: "Vestido novia playa", en: "Beach wedding dress" }, url: "https://meli.la/2aBEkRw" },
    { emoji: "🤵", name: { es: "Traje lino boda", en: "Linen wedding suit" }, url: "https://meli.la/1ZkMEVB" },
    { emoji: "🎀", name: { es: "Decoración boda", en: "Wedding décor" }, url: "https://meli.la/2FCQZws" },
    { emoji: "💍", name: { es: "Anillo compromiso", en: "Engagement ring" }, url: "https://meli.la/1mEVpUc" },
    { emoji: "👠", name: { es: "Zapatos novia", en: "Bridal shoes" }, url: "https://meli.la/1skki1x" },
  ],
  beach: [
    { emoji: "☀️", name: { es: "Protector solar", en: "Sunscreen" }, url: "https://meli.la/2X8693K" },
    { emoji: "🤿", name: { es: "Set de snorkel", en: "Snorkel set" }, url: "https://meli.la/1bDkupo" },
    { emoji: "👙", name: { es: "Traje de baño", en: "Swimsuit" }, url: "https://meli.la/21qs1v5" },
    { emoji: "👡", name: { es: "Sandalias playa", en: "Beach sandals" }, url: "https://meli.la/1K6BWxo" },
    { emoji: "🕶️", name: { es: "Lentes polarizados", en: "Polarized sunglasses" }, url: "https://meli.la/2tnf9m2" },
  ],
  general: [
    { emoji: "🎒", name: { es: "Canguro antirrobo", en: "Anti-theft bag" }, url: "https://meli.la/1YKcXTT" },
    { emoji: "🫗", name: { es: "Botella térmica", en: "Thermal bottle" }, url: "https://meli.la/1jyqGRy" },
    { emoji: "📸", name: { es: "Cámara GoPro", en: "GoPro camera" }, url: "https://meli.la/1bb2nJK" },
    { emoji: "🕶️", name: { es: "Lentes polarizados", en: "Polarized sunglasses" }, url: "https://meli.la/2tnf9m2" },
    { emoji: "🔋", name: { es: "Power bank", en: "Power bank" }, url: "https://meli.la/2k7HHpf" },
  ],
};

interface MercadoLibreBannerProps {
  context?: ProductContext;
}

export default function MercadoLibreBanner({ context = "general" }: MercadoLibreBannerProps) {
  const locale = useLocale() as Locale;
  const products = PRODUCTS[context] || PRODUCTS.general;

  return (
    <section className="my-8 bg-gradient-to-r from-oro-50 to-arena-50 rounded-2xl p-6 border border-oro-200/50">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🛒</span>
        <h3 className="font-display font-bold text-arena-800 text-lg">
          {t3(locale,
            context === "wedding" ? "Productos para tu boda" : "Productos para tu viaje",
            context === "wedding" ? "Products for your wedding" : "Products for your trip",
            context === "wedding" ? "Produits pour votre mariage" : "Produits pour votre voyage"
          )}
        </h3>
        <span className="text-xs text-arena-400 ml-auto">Mercado Libre</span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-hide">
        {products.map((product, i) => (
          <a
            key={i}
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-[160px] bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 text-center group border border-arena-100"
          >
            <span className="text-3xl block mb-2">{product.emoji}</span>
            <p className="text-sm font-medium text-arena-700 mb-3 line-clamp-2 min-h-[2.5rem]">
              {locale === "en" ? product.name.en : product.name.es}
            </p>
            <span className="inline-block text-xs font-bold text-white bg-oro-500 group-hover:bg-terracotta-500 transition-colors px-3 py-1.5 rounded-full">
              {t3(locale, "Ver en ML", "View on ML", "Voir sur ML")}
            </span>
          </a>
        ))}
      </div>

      <p className="text-xs text-arena-400 mt-3 text-center">
        {t3(locale,
          "Comprando a través de estos enlaces nos ayudas a mantener el sitio",
          "Purchasing through these links helps us maintain the site",
          "En achetant via ces liens, vous nous aidez à maintenir le site"
        )}
      </p>
    </section>
  );
}

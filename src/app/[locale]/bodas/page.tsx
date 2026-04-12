import Link from "next/link";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getAllWeddingDestinations } from "@/lib/data/bodas";
import { localize } from "@/lib/utils";
import { Locale } from "@/types/common";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const year = new Date().getFullYear();
  const baseUrl = "https://rutasmexico.com.mx";
  if (locale === "es") {
    return {
      title: `Bodas en México ${year} | Venues inclusivos, despedidas y guía LGBTIQ+`,
      description: `Planifica tu boda soñada en México. Venues accesibles e inclusivos, despedidas de soltera y soltero, bodas LGBTIQ+ y guía completa con precios ${year}.`,
      alternates: {
        canonical: `${baseUrl}/es/bodas`,
        languages: { es: `${baseUrl}/es/bodas`, en: `${baseUrl}/en/bodas` },
      },
    };
  }
  return {
    title: `Weddings in Mexico ${year} | Inclusive venues, parties & LGBTIQ+ guide`,
    description: `Plan your dream wedding in Mexico. Accessible and inclusive venues, bachelor & bachelorette parties, LGBTIQ+ weddings, and complete guide with prices ${year}.`,
    alternates: {
      canonical: `${baseUrl}/en/bodas`,
      languages: { es: `${baseUrl}/es/bodas`, en: `${baseUrl}/en/bodas` },
    },
  };
}

export default async function BodasPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const destinations = await getAllWeddingDestinations();
  const t = (es: string, en: string) => (locale === "es" ? es : en);

  return (
    <div>
      <div className="bg-gradient-to-br from-terracotta-500 via-terracotta-600 to-terracotta-700 text-white py-16 px-4">
        <div className="container-custom max-w-4xl text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            {t("Bodas y celebraciones en México", "Weddings & celebrations in Mexico")}
          </h1>
          <p className="text-terracotta-100 text-lg max-w-2xl mx-auto">
            {t(
              "Venues inclusivos, despedidas de soltera y soltero, bodas LGBTIQ+ y celebraciones accesibles en los destinos más hermosos de México.",
              "Inclusive venues, bachelorette & bachelor parties, LGBTIQ+ weddings, and accessible celebrations in Mexico's most beautiful destinations."
            )}
          </p>
        </div>
      </div>

      <div className="container-custom max-w-5xl py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/${locale}/bodas/${dest.slug}`}
              className="group bg-white rounded-2xl border border-arena-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=600&h=400&fit=crop&q=80"
                  alt={localize(dest.name, locale as Locale)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h2 className="font-display text-2xl font-bold text-white">
                    {localize(dest.name, locale as Locale)}
                  </h2>
                  <p className="text-white/80 text-sm">
                    {dest.venues.length} venues &middot; {dest.bacheloretteIdeas.length + dest.bachelorIdeas.length} {t("actividades", "activities")}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-gradient-to-r from-red-100 via-yellow-100 to-blue-100 text-arena-700 text-xs px-2 py-0.5 rounded-full">
                    🏳️‍🌈 LGBTIQ+
                  </span>
                  <span className="bg-azul-50 text-azul-700 text-xs px-2 py-0.5 rounded-full">
                    ♿ {t("Accesible", "Accessible")}
                  </span>
                  <span className="bg-terracotta-50 text-terracotta-700 text-xs px-2 py-0.5 rounded-full">
                    💍 {t("Bodas", "Weddings")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

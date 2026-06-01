import Link from "next/link";
import Image from "next/image";
import { Destination } from "@/types/destination";
import { Locale } from "@/types/common";
import { localize } from "@/lib/utils";
import { getDestinationImage } from "@/lib/destination-images";

interface RelatedDestinationsProps {
  destinations: Array<Destination & { distanceKm: number }>;
  locale: Locale;
}

// Server component — renders a row of 4 compact cards linking to nearby
// destinations. Sits at the bottom of /destinos/[slug] so a reader who
// liked Cancún can hop straight to Tulum or Playa del Carmen instead of
// bouncing back to the destinations index.
export default function RelatedDestinations({ destinations, locale }: RelatedDestinationsProps) {
  if (destinations.length === 0) return null;

  const heading = locale === "es" ? "Destinos cercanos" : "Nearby destinations";
  const subheading =
    locale === "es"
      ? "Otros destinos a los que también puedes ir desde aquí"
      : "Other destinations you can also reach from here";

  return (
    <section className="bg-arena-50 border-t border-arena-200 py-12">
      <div className="container-custom">
        <div className="mb-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-azul-900">{heading}</h2>
          <p className="text-arena-700 mt-1">{subheading}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {destinations.map((dest) => {
            const image = getDestinationImage(dest.id);
            return (
              <Link
                key={dest.id}
                href={`/${locale}/destinos/${dest.slug}`}
                className="group card overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={image.url}
                    alt={image.alt[locale]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3">
                    <h3 className="font-display font-bold text-white text-base md:text-lg drop-shadow-lg">
                      {localize(dest.name, locale)}
                    </h3>
                    <p className="text-white/85 text-xs md:text-sm drop-shadow">
                      {localize(dest.state, locale)} · {Math.round(dest.distanceKm)} km
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

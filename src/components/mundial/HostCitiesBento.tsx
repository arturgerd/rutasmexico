import Link from "next/link";
import { t3 } from "@/lib/utils";

interface HostCitiesBentoProps {
  locale: string;
  mxCount: number;
  usCount: number;
  caCount: number;
}

export default function HostCitiesBento({ locale, mxCount, usCount, caCount }: HostCitiesBentoProps) {
  const cards = [
    {
      anchor: "sedes-mexico",
      flag: "🇲🇽",
      name: t3(locale, "México", "Mexico", "Mexique"),
      count: mxCount,
      countLabel: t3(locale, "sedes", "venues", "stades"),
      blurb: t3(
        locale,
        "CDMX (Estadio Azteca), Guadalajara y Monterrey. Partido inaugural en el Azteca.",
        "Mexico City (Azteca), Guadalajara and Monterrey. Opening match at the Azteca.",
        "Mexico (Azteca), Guadalajara et Monterrey. Match d'ouverture à l'Azteca."
      ),
      gradient: "from-jade-700 via-jade-800 to-jade-900",
      span: "md:col-span-7 md:row-span-2",
      height: "min-h-[260px] md:min-h-[420px]",
      accent: "bg-oro-400 text-arena-900",
    },
    {
      anchor: "sedes-usa",
      flag: "🇺🇸",
      name: t3(locale, "Estados Unidos", "United States", "États-Unis"),
      count: usCount,
      countLabel: t3(locale, "sedes", "venues", "stades"),
      blurb: t3(
        locale,
        "De Los Ángeles a Nueva York. Semifinales en Atlanta y Dallas, final en NY.",
        "From Los Angeles to New York. Semifinals in Atlanta and Dallas, final in NY.",
        "De Los Angeles à New York. Demi-finales à Atlanta et Dallas, finale à NY."
      ),
      gradient: "from-azul-800 via-azul-900 to-arena-900",
      span: "md:col-span-5 md:row-span-2",
      height: "min-h-[260px] md:min-h-[420px]",
      accent: "bg-white text-azul-900",
    },
    {
      anchor: "sedes-canada",
      flag: "🇨🇦",
      name: t3(locale, "Canadá", "Canada", "Canada"),
      count: caCount,
      countLabel: t3(locale, "sedes", "venues", "stades"),
      blurb: t3(
        locale,
        "Toronto (BMO Field) y Vancouver (BC Place). Sin visa para mexicanos: solo eTA.",
        "Toronto (BMO Field) and Vancouver (BC Place). No visa for Mexicans: just eTA.",
        "Toronto et Vancouver. Pas de visa pour les Mexicains : juste eTA."
      ),
      gradient: "from-terracotta-700 via-terracotta-800 to-arena-900",
      span: "md:col-span-12",
      height: "min-h-[200px] md:min-h-[220px]",
      accent: "bg-white text-terracotta-700",
    },
  ];

  return (
    <section className="bg-arena-100 py-12 md:py-16">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-arena-900 mb-3">
            {t3(
              locale,
              "Las 16 sedes en 3 países",
              "16 venues across 3 countries",
              "16 stades dans 3 pays"
            )}
          </h2>
          <p className="text-arena-600 max-w-2xl mx-auto">
            {t3(
              locale,
              "Explora los países anfitriones del Mundial 2026 y salta directo a la guía de cada sede.",
              "Explore the host countries of World Cup 2026 and jump straight into each venue guide.",
              "Explorez les pays hôtes de la Coupe du Monde 2026 et accédez aux guides de chaque stade."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {cards.map((c) => (
            <Link
              key={c.anchor}
              href={`#${c.anchor}`}
              className={`${c.span} ${c.height} relative overflow-hidden rounded-2xl shadow-lg group focus:outline-none focus:ring-4 focus:ring-oro-400 focus:ring-offset-2`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient}`} />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 15% 20%, rgba(255,255,255,0.35), transparent 35%), radial-gradient(circle at 85% 80%, rgba(255,255,255,0.2), transparent 40%)",
                }}
              />
              <div className="relative h-full p-6 md:p-8 flex flex-col justify-between text-white">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-5xl md:text-6xl drop-shadow" aria-hidden="true">
                    {c.flag}
                  </span>
                  <span className={`${c.accent} text-xs md:text-sm font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md`}>
                    {c.count} {c.countLabel}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-2 drop-shadow">{c.name}</h3>
                  <p className="text-white/85 text-sm md:text-base leading-snug max-w-md">{c.blurb}</p>
                  <span className="inline-flex items-center gap-1.5 mt-4 text-oro-200 text-sm font-semibold group-hover:gap-3 transition-all">
                    {t3(locale, "Ver guías", "See guides", "Voir les guides")} →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

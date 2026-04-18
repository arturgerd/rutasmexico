import Link from "next/link";
import { t3 } from "@/lib/utils";

const OPENING_MATCH = new Date("2026-06-11T13:00:00-06:00");

export default function MundialBanner({ locale }: { locale: string }) {
  const now = new Date();
  const daysUntil = Math.max(0, Math.ceil((OPENING_MATCH.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-jade-600 via-emerald-700 to-arena-900 py-12 md:py-16">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3), transparent 30%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.25), transparent 40%)",
        }}
      />
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-oro-400 rounded-full px-4 py-1.5 mb-4 shadow-lg">
              <span className="text-sm font-bold tracking-wide text-arena-900">⚽ FIFA WORLD CUP 2026™</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
              {t3(
                locale,
                "México sede del Mundial 2026",
                "Mexico hosts the 2026 World Cup",
                "Le Mexique accueille la Coupe du Monde 2026"
              )}
            </h2>
            <p className="text-white/85 text-base md:text-lg max-w-2xl leading-relaxed">
              {t3(
                locale,
                "3 sedes, 13 partidos, el inaugural en CDMX. Tu guía completa: aeropuertos, transporte seguro, casas de cambio, zonas turísticas y qué evitar — por cada ciudad.",
                "3 venues, 13 matches, opening match in Mexico City. Your complete guide: airports, safe transport, currency exchange, tourist zones and what to avoid — for each city.",
                "3 stades, 13 matchs, le match d'ouverture à Mexico. Ton guide complet : aéroports, transport sûr, bureaux de change, zones touristiques et quoi éviter — par ville."
              )}
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-4 w-full lg:w-auto lg:min-w-[280px]">
            {daysUntil > 0 && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/20">
                <div className="text-5xl md:text-6xl font-bold text-oro-300 drop-shadow-lg leading-none">
                  {daysUntil}
                </div>
                <div className="text-white/80 text-sm mt-2">
                  {t3(locale, "días al partido inaugural", "days to the opening match", "jours avant le match d'ouverture")}
                </div>
              </div>
            )}
            <Link
              href={`/${locale}/mundial`}
              className="bg-white text-emerald-700 font-bold py-3.5 px-6 rounded-xl text-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              🗺️ {t3(locale, "Ver la guía completa", "View the complete guide", "Voir le guide complet")}
            </Link>
          </div>
        </div>

        {/* Venue cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
          {[
            {
              slug: "ciudad-de-mexico",
              flag: "🏙️",
              city: { es: "Ciudad de México", en: "Mexico City", fr: "Mexico" },
              stadium: "Estadio Azteca",
              highlight: { es: "🎉 Partido inaugural", en: "🎉 Opening match", fr: "🎉 Match d'ouverture" },
            },
            {
              slug: "monterrey",
              flag: "🏔️",
              city: { es: "Monterrey", en: "Monterrey", fr: "Monterrey" },
              stadium: "Estadio BBVA",
              highlight: { es: "🌡️ Calor extremo", en: "🌡️ Extreme heat", fr: "🌡️ Chaleur extrême" },
            },
            {
              slug: "guadalajara",
              flag: "🎺",
              city: { es: "Guadalajara", en: "Guadalajara", fr: "Guadalajara" },
              stadium: "Estadio Akron",
              highlight: { es: "🥃 Tequila + Chivas", en: "🥃 Tequila + Chivas", fr: "🥃 Tequila + Chivas" },
            },
          ].map((v) => (
            <Link
              key={v.slug}
              href={`/${locale}/mundial/${v.slug}`}
              className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{v.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white truncate">{t3(locale, v.city.es, v.city.en, v.city.fr)}</div>
                  <div className="text-xs text-white/70 truncate">{v.stadium}</div>
                </div>
                <span className="text-white/60 group-hover:text-white transition-colors">→</span>
              </div>
              <div className="text-xs text-oro-300 mt-2 font-semibold">
                {t3(locale, v.highlight.es, v.highlight.en, v.highlight.fr)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

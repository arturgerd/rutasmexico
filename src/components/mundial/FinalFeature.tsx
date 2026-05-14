import { t3 } from "@/lib/utils";
import { getFlightSearchUrl, getKlookAffiliateUrl } from "@/lib/affiliate";

interface FinalFeatureProps {
  locale: string;
}

export default function FinalFeature({ locale }: FinalFeatureProps) {
  const flightUrl = getFlightSearchUrl({
    originIATA: "MEX",
    destIATA: "EWR",
    departDate: "2026-07-17",
    returnDate: "2026-07-21",
    passengers: 2,
  });
  const klookNYC = getKlookAffiliateUrl("https://www.klook.com/en-US/search/?keyword=New+York");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-arena-900 via-arena-800 to-jade-900 py-16 md:py-20">
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(255,204,17,0.6), transparent 30%), radial-gradient(circle at 10% 90%, rgba(218,75,26,0.5), transparent 35%)",
        }}
      />
      <div className="container-custom relative grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <span className="inline-block text-oro-300 text-xs font-bold tracking-[0.2em] uppercase mb-3">
            {t3(locale, "La gran final", "The grand final", "La grande finale")}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {t3(locale, "Final del Mundial 2026", "World Cup 2026 Final", "Finale de la Coupe du Monde 2026")}
          </h2>
          <p className="text-arena-200 text-base md:text-lg mb-8 max-w-lg leading-relaxed">
            {t3(
              locale,
              "El 19 de julio se decide al campeón en el MetLife Stadium, área metropolitana de Nueva York. Empieza a planear tu viaje desde México con tiempo: los vuelos a EWR/JFK se inflan rápido en julio.",
              "On July 19 the champion is crowned at MetLife Stadium, in the New York metro area. Start planning early — flights to EWR/JFK spike fast in July.",
              "Le 19 juillet, le champion est sacré au MetLife Stadium, dans la région de New York. Planifiez tôt : les vols vers EWR/JFK explosent vite en juillet."
            )}
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <div className="bg-arena-800/60 backdrop-blur-sm border border-arena-700 rounded-xl px-4 py-3">
              <div className="text-oro-300 font-display font-bold text-lg">19 jul 2026</div>
              <div className="text-arena-300 text-xs uppercase tracking-wider">{t3(locale, "Fecha", "Date", "Date")}</div>
            </div>
            <div className="bg-arena-800/60 backdrop-blur-sm border border-arena-700 rounded-xl px-4 py-3">
              <div className="text-oro-300 font-display font-bold text-lg">MetLife</div>
              <div className="text-arena-300 text-xs uppercase tracking-wider">{t3(locale, "Estadio", "Stadium", "Stade")}</div>
            </div>
            <div className="bg-arena-800/60 backdrop-blur-sm border border-arena-700 rounded-xl px-4 py-3">
              <div className="text-oro-300 font-display font-bold text-lg">82,500</div>
              <div className="text-arena-300 text-xs uppercase tracking-wider">{t3(locale, "Aforo", "Capacity", "Capacité")}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={flightUrl}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="inline-flex items-center gap-2 bg-oro-400 hover:bg-oro-300 text-arena-900 font-bold py-3.5 px-6 rounded-xl shadow-lg transition-colors"
            >
              ✈️ {t3(locale, "Vuelos MEX → Nueva York", "Flights MEX → New York", "Vols MEX → New York")}
            </a>
            <a
              href={klookNYC}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold py-3.5 px-6 rounded-xl transition-colors"
            >
              🗽 {t3(locale, "Tours en NYC", "Tours in NYC", "Tours à NYC")}
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-oro-400 via-oro-500 to-terracotta-700 shadow-2xl border-4 border-oro-300 flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 35%, rgba(255,255,255,0.5), transparent 40%)",
              }}
            />
            <div className="relative text-center px-6">
              <div className="text-[140px] md:text-[180px] leading-none drop-shadow-2xl" aria-hidden="true">
                🏆
              </div>
              <div className="font-display text-white text-2xl md:text-3xl font-bold drop-shadow-lg mt-2">
                {t3(locale, "Por la copa", "For the cup", "Pour la coupe")}
              </div>
              <div className="text-white/90 text-sm md:text-base mt-1 uppercase tracking-widest">
                New Jersey · USA
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

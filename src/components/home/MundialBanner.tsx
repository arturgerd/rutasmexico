import Link from "next/link";
import { t3 } from "@/lib/utils";

// El Mundial 2026 terminó el 19-jul-2026 (España campeón). Este banner quedó
// como acceso al archivo histórico; el protagonismo futbolero de la home lo
// lleva FutbolBanner (Liga MX + Leagues Cup).
export default function MundialBanner({ locale }: { locale: string }) {
  return (
    <section className="bg-arena-900 py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-oro-400/90 rounded-full px-3 py-1 mb-2">
              <span className="text-xs font-bold tracking-wide text-arena-900">
                🏆 {t3(locale, "ASÍ FUE EL MUNDIAL 2026", "THE 2026 WORLD CUP, AS IT HAPPENED", "LA COUPE DU MONDE 2026")}
              </span>
            </div>
            <h2 className="font-display text-xl md:text-2xl font-bold text-white">
              {t3(
                locale,
                "España campeón: los 104 partidos, las 16 sedes y todas las guías",
                "Spain champions: all 104 matches, 16 venues and every guide",
                "Espagne championne : les 104 matchs et les 16 stades"
              )}
            </h2>
            <p className="text-arena-400 text-sm mt-1 max-w-2xl">
              {t3(
                locale,
                "El torneo terminó el 19 de julio con la final en Nueva York (1-0 a Argentina). Conservamos el archivo completo: resultados, guías por sede y el simulador para revivirlo.",
                "The tournament ended July 19 with the final in New York (1-0 vs Argentina). The full archive is still here: results, venue guides and the simulator to relive it.",
                "Le tournoi s'est achevé le 19 juillet à New York. L'archive complète reste disponible."
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href={`/${locale}/mundial/calendario`}
              className="bg-white text-arena-900 font-bold py-2.5 px-5 rounded-xl text-sm shadow hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              📋 {t3(locale, "Resultados", "Results", "Résultats")}
            </Link>
            <Link
              href={`/${locale}/mundial`}
              className="bg-white/10 text-white font-bold py-2.5 px-5 rounded-xl text-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
            >
              🗺️ {t3(locale, "Guías por sede", "Venue guides", "Guides par stade")}
            </Link>
            <Link
              href={`/${locale}/mundial/simulador`}
              className="bg-white/10 text-white font-bold py-2.5 px-5 rounded-xl text-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
            >
              🎮 {t3(locale, "Simulador", "Simulator", "Simulateur")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

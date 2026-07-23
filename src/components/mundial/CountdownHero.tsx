import { t3 } from "@/lib/utils";

// El torneo terminó el 19 de julio de 2026 (final: España 1-0 Argentina, aet).
// Este hero era una cuenta regresiva de cliente; ahora es un banner estático de
// campeón para que el HTML servido — lo que ven crawlers y el primer paint —
// nunca muestre un countdown caducado.

interface CountdownHeroProps {
  locale: string;
}

export default function CountdownHero({ locale }: CountdownHeroProps) {
  return (
    <div className="bg-gradient-to-r from-arena-900 via-jade-900 to-arena-900 py-10 border-y-4 border-oro-500">
      <div className="container-custom">
        <div className="text-center mb-6">
          <span className="inline-block text-oro-300 text-xs font-bold tracking-[0.2em] uppercase mb-2">
            {t3(locale, "Mundial 2026", "World Cup 2026", "Coupe du Monde 2026")}
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            {t3(
              locale,
              "🏆 ¡España, campeón del mundo! 1-0 a Argentina",
              "🏆 Spain, world champions! 1-0 over Argentina",
              "🏆 L'Espagne championne du monde ! 1-0 contre l'Argentine"
            )}
          </h2>
        </div>

        <p className="text-center text-arena-200 text-sm md:text-base max-w-2xl mx-auto">
          {t3(
            locale,
            "Gol de Ferran Torres en la prórroga (106'). España conquista su segunda copa tras 2010; Inglaterra fue tercero (6-4 a Francia). Revisa todos los resultados en el calendario.",
            "Ferran Torres scored in extra time (106'). Spain lifts its second cup after 2010; England took third place (6-4 over France). Check all results in the calendar.",
            "But de Ferran Torres en prolongation (106'). L'Espagne remporte sa deuxième coupe après 2010 ; l'Angleterre finit troisième (6-4 contre la France). Tous les résultats dans le calendrier."
          )}
        </p>
      </div>
    </div>
  );
}

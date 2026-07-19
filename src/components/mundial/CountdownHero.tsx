"use client";

import { useEffect, useState } from "react";
import { t3 } from "@/lib/utils";

// El Mundial ya empezó; ahora contamos los días que restan hacia la gran final.
const FINAL_KICKOFF = new Date("2026-07-19T15:00:00-04:00").getTime();
// 90 min + descanso + posible prórroga y penales: ~3h de colchón antes de
// declarar el torneo terminado.
const FINAL_END = FINAL_KICKOFF + 3 * 3_600_000;

type Parts = { days: number; hours: number; mins: number; secs: number };

function diff(now: number): Parts {
  const ms = Math.max(0, FINAL_KICKOFF - now);
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const mins = Math.floor((ms % 3_600_000) / 60_000);
  const secs = Math.floor((ms % 60_000) / 1000);
  return { days, hours, mins, secs };
}

interface CountdownHeroProps {
  locale: string;
}

export default function CountdownHero({ locale }: CountdownHeroProps) {
  const [mounted, setMounted] = useState(false);
  const [parts, setParts] = useState<Parts>({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [now, setNow] = useState(0);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const n = Date.now();
      setNow(n);
      setParts(diff(n));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const labels: Array<[keyof Parts, string]> = [
    ["days", t3(locale, "Días", "Days", "Jours")],
    ["hours", t3(locale, "Horas", "Hours", "Heures")],
    ["mins", t3(locale, "Min", "Mins", "Min")],
    ["secs", t3(locale, "Seg", "Secs", "Sec")],
  ];

  // Tres estados: cuenta regresiva → final en juego → torneo terminado.
  // Antes de montar (SSR) se muestra la cuenta regresiva con ceros, igual que antes.
  const live = mounted && now >= FINAL_KICKOFF && now < FINAL_END;
  const finished = mounted && now >= FINAL_END;

  return (
    <div className="bg-gradient-to-r from-arena-900 via-jade-900 to-arena-900 py-10 border-y-4 border-oro-500">
      <div className="container-custom">
        <div className="text-center mb-6">
          <span className="inline-block text-oro-300 text-xs font-bold tracking-[0.2em] uppercase mb-2">
            {finished
              ? t3(locale, "Mundial 2026", "World Cup 2026", "Coupe du Monde 2026")
              : live
              ? t3(locale, "Gran final · MetLife Stadium", "Grand final · MetLife Stadium", "Grande finale · MetLife Stadium")
              : t3(locale, "Cuenta regresiva a la gran final", "Countdown to the grand final", "Compte à rebours vers la grande finale")}
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            {finished
              ? t3(
                  locale,
                  "🏆 ¡España, campeón del mundo! 1-0 a Argentina",
                  "🏆 Spain, world champions! 1-0 over Argentina",
                  "🏆 L'Espagne championne du monde ! 1-0 contre l'Argentine"
                )
              : live
              ? t3(
                  locale,
                  "¡La final está en juego! 🇪🇸 España vs 🇦🇷 Argentina",
                  "The final is underway! 🇪🇸 Spain vs 🇦🇷 Argentina",
                  "La finale est en cours ! 🇪🇸 Espagne vs 🇦🇷 Argentine"
                )
              : t3(
                  locale,
                  "🇪🇸 España vs 🇦🇷 Argentina · HOY 19 de julio",
                  "🇪🇸 Spain vs 🇦🇷 Argentina · TODAY July 19",
                  "🇪🇸 Espagne vs 🇦🇷 Argentine · AUJOURD'HUI 19 juillet"
                )}
          </h2>
        </div>

        {!live && !finished && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto" aria-live="polite">
            {labels.map(([key, label]) => (
              <div
                key={key}
                className="bg-arena-800/60 backdrop-blur-sm border border-arena-700 rounded-xl py-5 px-3 text-center"
              >
                <div
                  className="font-display text-4xl md:text-6xl font-bold text-oro-300 tabular-nums leading-none"
                  suppressHydrationWarning
                >
                  {String(parts[key]).padStart(2, "0")}
                </div>
                <div className="text-arena-300 text-xs md:text-sm mt-2 uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        )}

        {(live || finished) && (
          <p className="text-center text-arena-200 text-sm md:text-base max-w-2xl mx-auto">
            {finished
              ? t3(
                  locale,
                  "Gol de Ferran Torres en la prórroga (106'). España conquista su segunda copa tras 2010; Inglaterra fue tercero (6-4 a Francia). Revisa todos los resultados en el calendario.",
                  "Ferran Torres scored in extra time (106'). Spain lifts its second cup after 2010; England took third place (6-4 over France). Check all results in the calendar.",
                  "But de Ferran Torres en prolongation (106'). L'Espagne remporte sa deuxième coupe après 2010 ; l'Angleterre finit troisième (6-4 contre la France). Tous les résultats dans le calendrier."
                )
              : t3(
                  locale,
                  "España busca su segunda copa; Argentina, el bicampeonato. Tercer lugar: Inglaterra (6-4 a Francia).",
                  "Spain chases its second title; Argentina, back-to-back cups. Third place: England (6-4 over France).",
                  "L'Espagne vise sa deuxième coupe ; l'Argentine, le doublé. Troisième place : l'Angleterre (6-4 contre la France)."
                )}
          </p>
        )}
      </div>
    </div>
  );
}

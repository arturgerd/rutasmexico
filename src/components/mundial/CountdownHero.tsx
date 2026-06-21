"use client";

import { useEffect, useState } from "react";
import { t3 } from "@/lib/utils";

// El Mundial ya empezó; ahora contamos los días que restan hacia la gran final.
const FINAL_KICKOFF = new Date("2026-07-19T15:00:00-04:00").getTime();

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

  useEffect(() => {
    setMounted(true);
    setParts(diff(Date.now()));
    const id = setInterval(() => setParts(diff(Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  const labels: Array<[keyof Parts, string]> = [
    ["days", t3(locale, "Días", "Days", "Jours")],
    ["hours", t3(locale, "Horas", "Hours", "Heures")],
    ["mins", t3(locale, "Min", "Mins", "Min")],
    ["secs", t3(locale, "Seg", "Secs", "Sec")],
  ];

  const finished = mounted && parts.days === 0 && parts.hours === 0 && parts.mins === 0 && parts.secs === 0;

  return (
    <div className="bg-gradient-to-r from-arena-900 via-jade-900 to-arena-900 py-10 border-y-4 border-oro-500">
      <div className="container-custom">
        <div className="text-center mb-6">
          <span className="inline-block text-oro-300 text-xs font-bold tracking-[0.2em] uppercase mb-2">
            {finished
              ? t3(locale, "Mundial 2026", "World Cup 2026", "Coupe du Monde 2026")
              : t3(locale, "Días que restan del Mundial", "Days left in the World Cup", "Jours restants de la Coupe")}
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            {finished
              ? t3(locale, "¡El Mundial 2026 terminó!", "World Cup 2026 has ended!", "La Coupe du Monde 2026 est terminée !")
              : t3(
                  locale,
                  "Rumbo a la gran final · 19 de julio 2026",
                  "Toward the grand final · July 19, 2026",
                  "Vers la grande finale · 19 juillet 2026"
                )}
          </h2>
        </div>

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
      </div>
    </div>
  );
}

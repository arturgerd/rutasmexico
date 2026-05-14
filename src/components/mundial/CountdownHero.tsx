"use client";

import { useEffect, useState } from "react";
import { t3 } from "@/lib/utils";

const OPENING_KICKOFF = new Date("2026-06-11T13:00:00-06:00").getTime();

type Parts = { days: number; hours: number; mins: number; secs: number };

function diff(now: number): Parts {
  const ms = Math.max(0, OPENING_KICKOFF - now);
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
            {t3(locale, "Cuenta regresiva", "Kickoff countdown", "Compte à rebours")}
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            {finished
              ? t3(locale, "¡Inició el Mundial 2026!", "World Cup 2026 has started!", "La Coupe du Monde 2026 a commencé !")
              : t3(
                  locale,
                  "11 de junio 2026 · Estadio Azteca · 13:00",
                  "June 11, 2026 · Estadio Azteca · 13:00",
                  "11 juin 2026 · Estadio Azteca · 13h00"
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

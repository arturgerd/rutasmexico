"use client";

import { useEffect, useState } from "react";

/**
 * Fecha local en formato YYYY-MM-DD, `daysAhead` días en el futuro.
 *
 * Los buscadores usaban `new Date().toISOString().split("T")[0]`, que devuelve
 * la fecha en UTC. México va en UTC-6, así que a partir de las 18:00 hora local
 * el UTC ya está en el día siguiente: "hoy" salía como mañana y "mañana" como
 * pasado mañana. Aquí se leen los componentes locales de la fecha.
 */
export function localDateISO(daysAhead = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/**
 * Fechas del buscador, calculadas en el cliente.
 *
 * Las páginas que montan estos widgets son estáticas (`revalidate` por hora),
 * así que cualquier fecha que calcule el servidor queda congelada en el HTML
 * del build y envejece con él. Se computan después del montaje; hasta entonces
 * devuelve cadenas vacías, que es exactamente lo que renderiza el servidor, así
 * que no hay desajuste de hidratación.
 *
 * `today` es el mínimo seleccionable: viajar hoy mismo es un caso real —
 * alguien que busca un autobús para esta tarde o un hotel para esta noche—
 * y antes estaba bloqueado.
 */
export function useTravelDates(
  firstOffset: number,
  secondOffset?: number
): { today: string; first: string; second: string } {
  const [dates, setDates] = useState({ today: "", first: "", second: "" });

  useEffect(() => {
    setDates({
      today: localDateISO(0),
      first: localDateISO(firstOffset),
      second: secondOffset === undefined ? "" : localDateISO(secondOffset),
    });
  }, [firstOffset, secondOffset]);

  return dates;
}

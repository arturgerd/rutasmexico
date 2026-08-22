import Link from "next/link";
import data from "@/data/cancun-lugares.json";
import DataConfidence from "@/components/ui/DataConfidence";
import { l, t3 } from "@/lib/utils";
import type { LocalizedString } from "@/types/common";

type Area = "hotelera" | "centro" | "cerca" | "lejos";

interface Place {
  id: string;
  name: string;
  area: Area;
  badge: LocalizedString;
  why: LocalizedString;
  entry: { amountMxn: number; note: LocalizedString };
  howTo: LocalizedString;
  /** Costo del traslado por persona. null cuando no hay transporte público que sirva. */
  priceMxn: number | null;
  minutes: number;
  /** Ruta de camión que te deja ahí. Enlaza a su página del catálogo. */
  camion: string | null;
  tip: LocalizedString;
}

/**
 * Los grupos van ordenados por esfuerzo, no por fama.
 *
 * Alguien que llega el martes por la tarde necesita saber primero qué tiene a
 * quince minutos, no que Chichén Itzá existe. Ordenar por distancia convierte la
 * lista en un plan.
 */
const AREAS: { id: Area; title: LocalizedString; blurb: LocalizedString }[] = [
  {
    id: "hotelera",
    title: { es: "Sin salir de la Zona Hotelera", en: "Without leaving the Hotel Zone" },
    blurb: {
      es: "Todo esto está sobre el bulevar Kukulcán, a un camión de doce pesos de tu hotel.",
      en: "All of this sits on Kukulcán Boulevard, a twelve-peso bus ride from your hotel.",
    },
  },
  {
    id: "centro",
    title: { es: "En el centro, donde come la ciudad", en: "Downtown, where the city eats" },
    blurb: {
      es: "Media hora de camión y los precios se parten a la mitad. Es el mismo viaje que hace la gente que trabaja en los hoteles.",
      en: "Half an hour by bus and prices halve. It's the same trip the people who work in the hotels make.",
    },
  },
  {
    id: "cerca",
    title: { es: "Medio día de camino", en: "Half a day away" },
    blurb: {
      es: "Salidas de mañana con regreso para cenar. Ninguna necesita tour ni reserva previa.",
      en: "Morning trips with time to be back for dinner. None needs a tour or advance booking.",
    },
  },
  {
    id: "lejos",
    title: { es: "Día completo, o más", en: "A full day, or more" },
    blurb: {
      es: "Aquí el traslado ya es parte del plan. Compra el autobús con anticipación y sal temprano.",
      en: "Here the journey is part of the plan. Buy the bus in advance and leave early.",
    },
  },
];

function entryLabel(place: Place, locale: string): string {
  if (place.entry.amountMxn === 0) return t3(locale, "Gratis", "Free");
  return `$${place.entry.amountMxn} MXN`;
}

export default function LugaresDeInteres({ locale }: { locale: string }) {
  const places = data.places as Place[];
  const isEs = locale === "es";

  return (
    <section className="mt-12" aria-labelledby="lugares-de-interes">
      <h2 id="lugares-de-interes" className="font-display text-2xl font-bold text-arena-900">
        {isEs ? "Qué ver, y cómo llegar sin taxi" : "What to see, and how to get there without a taxi"}
      </h2>
      <p className="mt-2 max-w-3xl leading-relaxed text-arena-700">
        {isEs
          ? "Cancún se recorre casi entero en camión urbano y autobús foráneo. Cada lugar de abajo lleva cuánto cuesta entrar, cuánto cuesta llegar y qué transporte tomar, ordenados de lo que tienes al lado a lo que te va a costar un día entero."
          : "You can cover almost all of Cancún on city buses and intercity coaches. Each place below lists what it costs to get in, what it costs to get there and what to take, ordered from what's next door to what will cost you a whole day."}
      </p>

      <div className="mt-8 space-y-10">
        {AREAS.map((area) => {
          const group = places.filter((p) => p.area === area.id);
          if (group.length === 0) return null;

          return (
            <div key={area.id}>
              <h3 className="font-display text-lg font-bold text-arena-900">{l(area.title, locale)}</h3>
              <p className="mt-1 text-sm text-arena-600">{l(area.blurb, locale)}</p>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {group.map((place) => (
                  <article
                    key={place.id}
                    className="flex flex-col rounded-2xl border border-arena-200 bg-white p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-display font-bold text-arena-900">{place.name}</h4>
                      <span className="shrink-0 rounded-full bg-arena-100 px-2 py-0.5 text-[11px] font-medium text-arena-700">
                        {l(place.badge, locale)}
                      </span>
                    </div>

                    <p className="mt-2 flex-1 text-sm leading-relaxed text-arena-700">
                      {l(place.why, locale)}
                    </p>

                    <dl className="mt-4 grid grid-cols-2 gap-3 border-y border-arena-100 py-3 text-sm">
                      <div>
                        <dt className="text-[11px] font-semibold uppercase tracking-wide text-arena-500">
                          {isEs ? "Entrada" : "Entry"}
                        </dt>
                        <dd className="font-medium text-arena-900">{entryLabel(place, locale)}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-semibold uppercase tracking-wide text-arena-500">
                          {isEs ? "Llegar" : "Getting there"}
                        </dt>
                        <dd className="font-medium text-arena-900">
                          {place.priceMxn === null
                            ? isEs
                              ? "Auto o tour"
                              : "Car or tour"
                            : `$${place.priceMxn} · ${place.minutes} min`}
                        </dd>
                      </div>
                    </dl>

                    <p className="mt-3 text-sm leading-relaxed text-arena-700">
                      {l(place.howTo, locale)}
                    </p>

                    {place.camion && (
                      <Link
                        href={`/${locale}/camiones-cancun/${place.camion}`}
                        className="mt-2 inline-block text-sm font-medium text-terracotta-600 underline-offset-2 hover:underline"
                      >
                        {isEs
                          ? `Recorrido del ${place.camion.toUpperCase()}`
                          : `${place.camion.toUpperCase()} route map`}
                      </Link>
                    )}

                    <p className="mt-3 border-l-2 border-oro-300 pl-3 text-sm leading-relaxed text-arena-600">
                      {l(place.tip, locale)}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <DataConfidence
        className="mt-6"
        level="approx"
        checkedOn={data.lastReviewed}
        locale={locale}
        note={l(data.pricesNote, locale)}
      />
    </section>
  );
}

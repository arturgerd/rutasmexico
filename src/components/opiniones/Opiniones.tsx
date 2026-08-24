import data from "@/data/opiniones.json";
import OpinionForm from "./OpinionForm";
import { temaLabel } from "./temas";

/**
 * Opiniones de lectores, ya revisadas, más el formulario para mandar una.
 *
 * Sin opiniones publicadas todavía se muestra sólo el formulario: una sección
 * de testimonios vacía se ve peor que no tenerla, y el formulario por sí solo
 * es una invitación legítima.
 */

export interface Opinion {
  id: string;
  nombre: string;
  ciudad?: string;
  tema: string;
  visita?: string;
  texto: string;
  aprobadoEl: string;
}

interface Props {
  locale: string;
  /**
   * Filtra por tema. Sin filtro se muestran todas, que es lo que hace la
   * página general de opiniones.
   */
  tema?: string;
  /** Cuántas mostrar como máximo. */
  limite?: number;
  titulo?: string;
}

export default function Opiniones({ locale, tema, limite = 6, titulo }: Props) {
  const isEs = locale === "es";
  const todas = data.opiniones as Opinion[];
  const visibles = (tema ? todas.filter((o) => o.tema === tema) : todas).slice(0, limite);

  return (
    <section className="mt-12" aria-labelledby="opiniones">
      <h2 id="opiniones" className="font-display text-2xl font-bold text-arena-900">
        {titulo ?? (isEs ? "Lo que cuentan otros viajeros" : "What other travellers say")}
      </h2>

      {visibles.length > 0 ? (
        <>
          <p className="mt-2 max-w-3xl leading-relaxed text-arena-700">
            {isEs
              ? "Opiniones que nos mandaron lectores y que revisamos antes de publicar. Son experiencias individuales, no datos verificados por nosotros."
              : "Opinions readers sent us, reviewed before publishing. They are individual experiences, not data we verified ourselves."}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {visibles.map((opinion) => (
              <figure
                key={opinion.id}
                className="flex flex-col rounded-2xl border border-arena-200 bg-white p-5"
              >
                <blockquote className="flex-1 text-sm leading-relaxed text-arena-800">
                  {opinion.texto}
                </blockquote>
                <figcaption className="mt-4 border-t border-arena-100 pt-3 text-xs text-arena-600">
                  <span className="font-semibold text-arena-900">{opinion.nombre}</span>
                  {opinion.ciudad && <span> · {opinion.ciudad}</span>}
                  <span className="block text-arena-500">
                    {temaLabel(opinion.tema, locale)}
                    {opinion.visita && ` · ${opinion.visita}`}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-2 max-w-3xl leading-relaxed text-arena-700">
          {isEs
            ? "Todavía no publicamos ninguna. Si ya hiciste este viaje, lo que aprendiste sobre la marcha le sirve al que viene detrás más que cualquier guía."
            : "We haven't published any yet. If you've already made this trip, what you learned along the way helps the next person more than any guide can."}
        </p>
      )}

      <div className="mt-8 rounded-2xl border border-arena-200 bg-white p-6 md:p-8">
        <h3 className="font-display text-xl font-bold text-arena-900">
          {isEs ? "Cuenta cómo te fue" : "Tell us how it went"}
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-arena-700">
          {isEs
            ? "Lo que nos interesa no son las estrellas, sino el dato: cuánto pagaste de verdad, a qué hora pasó el camión, qué te sorprendió al llegar. Eso es lo que corrige esta guía."
            : "We're not after star ratings, we're after the detail: what you actually paid, when the bus really came, what surprised you on arrival. That's what corrects this guide."}
        </p>
        <div className="mt-5">
          <OpinionForm locale={locale} temaPorDefecto={tema} />
        </div>
      </div>
    </section>
  );
}

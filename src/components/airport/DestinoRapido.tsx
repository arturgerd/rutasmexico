import Link from "next/link";
import { getArrivalRows } from "@/lib/data/cancun-llegadas";
import { formatCurrency, l, t3 } from "@/lib/utils";

/**
 * La respuesta corta, arriba de todo.
 *
 * Quien acaba de aterrizar no quiere comparar seis medios de transporte: quiere
 * saber cuánto le cuesta llegar a donde va. Esta tabla contesta eso en cinco
 * segundos y deja las fichas largas para quien de verdad quiera comparar.
 *
 * Lo importante es el desglose por pasos: los trayectos que necesitan dos o tres
 * boletos son justo los que las guías presentan como si fueran uno solo, y la
 * Zona Hotelera —el destino de la mayoría— es uno de ellos.
 */
export default function DestinoRapido({ locale }: { locale: string }) {
  const rows = getArrivalRows();
  const isEs = locale === "es";

  return (
    <section aria-labelledby="a-donde-vas">
      <h2 id="a-donde-vas" className="font-display text-2xl font-bold text-arena-900">
        {isEs ? "¿A dónde vas? Empieza por aquí" : "Where are you headed? Start here"}
      </h2>
      <p className="mt-2 max-w-3xl leading-relaxed text-arena-700">
        {isEs
          ? "El camino más barato hasta cada destino, con todos los boletos sumados. Cuando aparece más de un paso es porque hace falta más de un boleto: eso es exactamente lo que casi nadie te cuenta antes de que llegues."
          : "The cheapest way to each destination, with every ticket added up. Where you see more than one step, that's because it takes more than one ticket — which is exactly what nobody tells you before you land."}
      </p>

      <ul className="mt-6 space-y-3">
        {rows.map((row) => (
          <li
            key={row.id}
            className="rounded-2xl border border-arena-200 bg-white p-5 transition-colors hover:border-arena-300"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-lg font-bold text-arena-900">
                {l(row.destination, locale)}
              </h3>
              <div className="text-right">
                <p className="font-display text-xl font-bold text-terracotta-600 tabular-nums">
                  {formatCurrency(row.totalMxn, "MXN")}
                </p>
                <p className="text-xs text-arena-500">
                  {t3(locale, "por persona", "per person")} · {row.minutes.min}–{row.minutes.max} min
                </p>
              </div>
            </div>

            {/* Desglose. Un solo paso se muestra igual, para que la comparación
                entre filas sea visualmente pareja. */}
            <ol className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2">
              {row.steps.map((step, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <span className="text-arena-400" aria-hidden="true">
                      +
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-arena-200 bg-arena-50 px-2.5 py-1 text-xs">
                    <span className="font-medium text-arena-800">{l(step.label, locale)}</span>
                    <span className="tabular-nums text-arena-600">${step.priceMxn}</span>
                  </span>
                </li>
              ))}
            </ol>

            <p className="mt-3 text-sm leading-relaxed text-arena-700">{l(row.note, locale)}</p>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              {row.camionSlug && (
                <Link
                  href={`/${locale}/camiones-cancun/${row.camionSlug}`}
                  className="text-sm font-medium text-terracotta-600 underline-offset-2 hover:underline"
                >
                  {isEs
                    ? `Ver el recorrido del ${row.camionSlug.toUpperCase()}`
                    : `See the ${row.camionSlug.toUpperCase()} route`}
                </Link>
              )}
              {row.destinoSlug && (
                <Link
                  href={`/${locale}/destinos/${row.destinoSlug}`}
                  className="text-sm font-medium text-terracotta-600 underline-offset-2 hover:underline"
                >
                  {isEs
                    ? `Guía de ${l(row.destination, locale)}`
                    : `${l(row.destination, locale)} guide`}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs leading-relaxed text-arena-500">
        {isEs
          ? "Los totales suman las tarifas más bajas disponibles y son por persona: para dos o más viajeros, compara contra un traslado reservado, que se cobra por vehículo. Precios de ADO revisados con su fuente en las fichas de abajo."
          : "Totals add up the lowest available fares and are per person: for two or more travellers, compare against a booked transfer, which is charged per vehicle. ADO prices are sourced and dated in the cards below."}
      </p>
    </section>
  );
}

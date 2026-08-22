import Link from "next/link";
import data from "@/data/cancun-lugares-detalle.json";
import DataConfidence from "@/components/ui/DataConfidence";
import { l } from "@/lib/utils";
import type { LocalizedString } from "@/types/common";

/**
 * Perfiles largos de los dos lugares sobre los que la gente pregunta de más:
 * el mercado del centro y el show de la Zona Hotelera.
 *
 * Van aparte de la retícula de tarjetas a propósito. Una tarjeta de un tercio
 * de ancho aguanta un párrafo; no aguanta historia, desglose de precios y
 * advertencias. Aquí tienen el ancho completo, y desde la tarjeta se llega por
 * ancla para no repetir el resumen.
 */

interface Detail {
  placeId: string;
  title: LocalizedString;
  standfirst: LocalizedString;
  history: { title: LocalizedString; body: LocalizedString[] };
  whatYouFind: { title: LocalizedString; items: { label: LocalizedString; text: LocalizedString }[] };
  practical: { label: LocalizedString; value: LocalizedString }[];
  headsUp: { title: LocalizedString; body: LocalizedString[] };
  gettingThere: { title: LocalizedString; body: LocalizedString };
  sources: { label: string; url: string }[];
}

export default function LugarDetalle({ locale }: { locale: string }) {
  const details = data.details as Detail[];
  const isEs = locale === "es";

  return (
    <section className="mt-12" aria-labelledby="en-detalle">
      <h2 id="en-detalle" className="font-display text-2xl font-bold text-arena-900">
        {isEs ? "Dos paradas, con lo que nadie te cuenta" : "Two stops, with what nobody tells you"}
      </h2>
      <p className="mt-2 max-w-3xl leading-relaxed text-arena-700">
        {isEs
          ? "Son los dos nombres que más se repiten cuando alguien pregunta qué hacer en Cancún, y los dos que peor se explican. Aquí van completos: de dónde salen, qué encuentras y qué conviene saber antes de ir."
          : "These are the two names that come up most when someone asks what to do in Cancún, and the two worst explained. Here they are in full: where they come from, what you'll find and what's worth knowing before you go."}
      </p>

      <div className="mt-8 space-y-8">
        {details.map((detail) => (
          <article
            key={detail.placeId}
            id={`detalle-${detail.placeId}`}
            className="scroll-mt-8 overflow-hidden rounded-2xl border border-arena-200 bg-white"
          >
            <header className="border-b border-arena-100 bg-arena-50 p-6 md:p-8">
              <h3 className="font-display text-xl font-bold text-arena-900 md:text-2xl">
                {l(detail.title, locale)}
              </h3>
              <p className="mt-2 max-w-3xl leading-relaxed text-arena-700">
                {l(detail.standfirst, locale)}
              </p>
            </header>

            <div className="p-6 md:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
                <div className="min-w-0">
                  <h4 className="font-display font-bold text-arena-900">
                    {l(detail.history.title, locale)}
                  </h4>
                  <div className="mt-2 space-y-3">
                    {detail.history.body.map((paragraph, i) => (
                      <p key={i} className="leading-relaxed text-arena-700">
                        {l(paragraph, locale)}
                      </p>
                    ))}
                  </div>

                  <h4 className="mt-8 font-display font-bold text-arena-900">
                    {l(detail.whatYouFind.title, locale)}
                  </h4>
                  <dl className="mt-3 space-y-4">
                    {detail.whatYouFind.items.map((item, i) => (
                      <div key={i} className="border-l-2 border-terracotta-200 pl-4">
                        <dt className="font-medium text-arena-900">{l(item.label, locale)}</dt>
                        <dd className="mt-1 text-sm leading-relaxed text-arena-700">
                          {l(item.text, locale)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Los datos duros, fuera del cuerpo del texto: quien sólo
                    quiere el horario y el precio no debería tener que leer
                    cuatro párrafos para encontrarlos. */}
                <aside className="lg:border-l lg:border-arena-100 lg:pl-8">
                  <dl className="rounded-xl border border-arena-200 bg-arena-50 p-4">
                    {detail.practical.map((row, i) => (
                      <div key={i} className={i > 0 ? "mt-3 border-t border-arena-200 pt-3" : ""}>
                        <dt className="text-[11px] font-semibold uppercase tracking-wide text-arena-500">
                          {l(row.label, locale)}
                        </dt>
                        <dd className="mt-0.5 text-sm leading-snug text-arena-900">
                          {l(row.value, locale)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </aside>
              </div>

              <div className="mt-8 rounded-xl border border-oro-200 bg-oro-50 p-5">
                <h4 className="font-display font-bold text-arena-900">
                  {l(detail.headsUp.title, locale)}
                </h4>
                <div className="mt-2 space-y-3">
                  {detail.headsUp.body.map((paragraph, i) => (
                    <p key={i} className="text-sm leading-relaxed text-arena-800">
                      {l(paragraph, locale)}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-arena-200 p-5">
                <h4 className="font-display font-bold text-arena-900">
                  {l(detail.gettingThere.title, locale)}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-arena-700">
                  {l(detail.gettingThere.body, locale)}
                </p>
                <Link
                  href={`/${locale}/camiones-cancun`}
                  className="mt-3 inline-block text-sm font-medium text-terracotta-600 underline-offset-2 hover:underline"
                >
                  {isEs ? "Ver el mapa de las rutas" : "See the route map"}
                </Link>
              </div>

              <p className="mt-5 text-xs leading-relaxed text-arena-500">
                {isEs ? "Fuentes: " : "Sources: "}
                {detail.sources.map((source, i) => (
                  <span key={source.url}>
                    {i > 0 && " · "}
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="underline hover:text-terracotta-600"
                    >
                      {source.label}
                    </a>
                  </span>
                ))}
              </p>
            </div>
          </article>
        ))}
      </div>

      <DataConfidence
        className="mt-6"
        level="approx"
        checkedOn={data.lastReviewed}
        locale={locale}
        note={
          isEs
            ? "Precios de entrada y horarios recopilados de fuentes públicas en la fecha indicada. Los boletos de Coco Bongo cambian por temporada y por evento, y el horario del mercado varía entre locales."
            : "Entry prices and hours gathered from public sources on the date shown. Coco Bongo tickets change by season and event, and market hours vary from stall to stall."
        }
      />
    </section>
  );
}

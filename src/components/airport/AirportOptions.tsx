import DataConfidence from "@/components/ui/DataConfidence";
import { formatCurrency, formatDuration, l, t3 } from "@/lib/utils";
import { getBusSearchUrl, getCarRentalUrl, getKiwitaxiAffiliateUrl } from "@/lib/affiliate";
import { operatorName, type TransportOption } from "@/lib/data/aeropuerto-cun";

const MODE_ICON: Record<TransportOption["mode"], string> = {
  bus: "🚌",
  taxi: "🚕",
  transfer: "🚐",
  car: "🚗",
};

/** Destino en Busbud por opción. Las claves coinciden con BUSBUD_CITY_IDS en affiliate.ts. */
const BUSBUD_DEST: Record<string, string> = {
  "ado-centro": "Cancun",
  "ado-playa-del-carmen": "Playa del Carmen",
  "ado-tulum": "Tulum",
};

/**
 * Fechas de ejemplo para el comparador de autos. La página revalida cada hora,
 * así que se mantienen siempre en el futuro sin necesidad de un cron.
 */
function sampleCarDates(): { pickup: string; dropoff: string } {
  const now = new Date();
  const iso = (daysAhead: number) =>
    new Date(now.getTime() + daysAhead * 86_400_000).toISOString().slice(0, 10);
  return { pickup: iso(14), dropoff: iso(21) };
}

function bookingUrl(option: TransportOption, locale: string): string | null {
  switch (option.mode) {
    case "bus": {
      const destCity = BUSBUD_DEST[option.id];
      if (!destCity) return null;
      return getBusSearchUrl({
        originCity: "Cancun CUN Airport",
        destCity,
        locale: locale === "es" ? "es" : "en",
      });
    }
    case "transfer":
      return getKiwitaxiAffiliateUrl("https://kiwitaxi.com/Mexico/Cancun-airport");
    case "car": {
      const { pickup, dropoff } = sampleCarDates();
      return getCarRentalUrl({
        pickupIATA: "CUN",
        pickupDate: pickup,
        returnDate: dropoff,
        locale: locale === "es" ? "es" : "en",
      });
    }
    // El taxi de mostrador no tiene programa de afiliados: se queda como
    // información, sin botón. Mandarlo a un revendedor sería venderle al
    // lector la opción más cara del listado disfrazada de recomendación.
    case "taxi":
      return null;
  }
}

function ctaLabel(option: TransportOption, locale: string): string {
  switch (option.mode) {
    case "bus":
      return t3(locale, "Ver horarios y comprar", "See schedules and book");
    case "transfer":
      return t3(locale, "Cotizar traslado privado", "Get a private transfer quote");
    case "car":
      return t3(locale, "Comparar precios de renta", "Compare rental prices");
    default:
      return t3(locale, "Ver opciones", "See options");
  }
}

function priceDisplay(option: TransportOption, locale: string): string {
  const { amount, currency, unit } = option.price;
  if (amount === undefined) {
    return t3(locale, "Según tu búsqueda", "Depends on your search");
  }
  const unitLabel =
    unit === "person"
      ? t3(locale, "por persona", "per person")
      : unit === "vehicle"
        ? t3(locale, "por vehículo", "per vehicle")
        : t3(locale, "por día", "per day");
  return `${t3(locale, "desde", "from")} ${formatCurrency(amount, currency)} ${unitLabel}`;
}

interface Props {
  options: TransportOption[];
  locale: string;
}

export default function AirportOptions({ options, locale }: Props) {
  return (
    <div className="space-y-4">
      {options.map((option) => {
        const url = bookingUrl(option, locale);
        return (
          <article
            key={option.id}
            className={`rounded-2xl border bg-white p-5 shadow-sm md:p-6 ${
              option.recommended ? "border-terracotta-200 ring-1 ring-terracotta-100" : "border-arena-200"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="text-xl" aria-hidden="true">
                    {MODE_ICON[option.mode]}
                  </span>
                  <h3 className="font-display text-lg font-bold text-arena-900">
                    {l(option.name, locale)}
                  </h3>
                  {option.recommended && (
                    <span className="rounded-full bg-terracotta-50 px-2 py-0.5 text-xs font-semibold text-terracotta-700">
                      {t3(locale, "Recomendado", "Recommended")}
                    </span>
                  )}
                </div>
                <p className="text-sm text-arena-700">{l(option.destination, locale)}</p>
              </div>

              <div className="text-right">
                <p className="font-display text-lg font-bold text-arena-900">
                  {priceDisplay(option, locale)}
                </p>
                <p className="text-sm text-arena-600">
                  {formatDuration(option.duration.minMinutes)}–{formatDuration(option.duration.maxMinutes)}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-arena-100 pt-4">
              <p className="text-xs text-arena-500">
                {t3(locale, "Sale de:", "Departs from:")}{" "}
                <span className="font-medium text-arena-700">{option.terminals.join(" · ")}</span>
              </p>
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="ml-auto inline-flex items-center gap-2 rounded-xl bg-terracotta-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-terracotta-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2"
                >
                  {ctaLabel(option, locale)}
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              )}
            </div>

            {/* Seis fichas con toda su letra chica abierta eran un muro. Lo que
                decide —precio, duración, a dónde te deja— se queda arriba
                siempre; la procedencia del dato y el pro y contra siguen a un
                clic, sin salir de la página. */}
            <details className="group/detail mt-4 border-t border-arena-100 pt-4">
              <summary className="flex cursor-pointer items-center gap-2 text-sm font-medium text-arena-700 marker:content-none hover:text-terracotta-600">
                <svg
                  className="h-4 w-4 shrink-0 text-arena-400 transition-transform group-open/detail:rotate-90"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
                {t3(locale, "Ver el detalle y de dónde sale el precio", "See the detail and where the price comes from")}
              </summary>

              <DataConfidence
                className="mt-4"
                level={option.price.confidence}
                checkedOn={option.price.checkedOn}
                source={option.price.source}
                sourceUrl={option.price.sourceUrl}
                note={option.price.note ? l(option.price.note, locale) : undefined}
                locale={locale}
              />

              <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-arena-500">
                    {t3(locale, "Operador", "Operator")}
                  </dt>
                  <dd className="text-arena-800">{operatorName(option.operator, locale)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-arena-500">
                    {t3(locale, "Frecuencia", "Frequency")}
                  </dt>
                  <dd className="text-arena-800">{l(option.frequency, locale)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-arena-500">
                    {t3(locale, "Horario", "Hours")}
                  </dt>
                  <dd className="text-arena-800">{l(option.hours, locale)}</dd>
                </div>
              </dl>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ul className="space-y-1.5">
                  {option.pros.map((pro, i) => (
                    <li key={i} className="flex gap-2 text-sm text-arena-700">
                      <span className="mt-0.5 flex-shrink-0 text-jade-600" aria-hidden="true">
                        ✓
                      </span>
                      <span>{l(pro, locale)}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-1.5">
                  {option.cons.map((con, i) => (
                    <li key={i} className="flex gap-2 text-sm text-arena-700">
                      <span className="mt-0.5 flex-shrink-0 text-terracotta-600" aria-hidden="true">
                        ✕
                      </span>
                      <span>{l(con, locale)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </article>
        );
      })}
    </div>
  );
}

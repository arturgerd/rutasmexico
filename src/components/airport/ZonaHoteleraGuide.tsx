import data from "@/data/zona-hotelera.json";
import DataConfidence, { type ConfidenceLevel } from "@/components/ui/DataConfidence";
import HotelSearchLink from "./HotelSearchLink";
import { l, t3 } from "@/lib/utils";
import type { LocalizedString } from "@/types/common";

type Level = "low" | "medium" | "high";

interface Zone {
  id: string;
  km: string;
  accent: "jade" | "oro" | "azul";
  name: LocalizedString;
  tagline: LocalizedString;
  orientation: LocalizedString;
  waves: LocalizedString & { level: Level };
  sargassum: LocalizedString & { level: Level };
  airportMinutes: { min: number; max: number };
  beaches: string[];
  goodFor: LocalizedString;
  tradeoff: LocalizedString;
}

// Tailwind no puede generar clases a partir de strings interpolados, así que
// cada acento se escribe completo.
const ACCENT: Record<Zone["accent"], { band: string; chip: string; ring: string }> = {
  jade: {
    band: "bg-gradient-to-br from-jade-500 to-jade-700",
    chip: "bg-jade-50 text-jade-800 border-jade-200",
    ring: "border-jade-200",
  },
  oro: {
    band: "bg-gradient-to-br from-oro-400 to-oro-600",
    chip: "bg-oro-50 text-oro-800 border-oro-200",
    ring: "border-oro-200",
  },
  azul: {
    band: "bg-gradient-to-br from-azul-500 to-azul-800",
    chip: "bg-azul-50 text-azul-800 border-azul-200",
    ring: "border-azul-200",
  },
};

/** Tres barras llenas según intensidad: se lee de un vistazo, sin tener que leer el texto. */
function LevelMeter({ level, label, locale }: { level: Level; label: string; locale: string }) {
  const filled = level === "low" ? 1 : level === "medium" ? 2 : 3;
  const tone =
    level === "low" ? "bg-jade-500" : level === "medium" ? "bg-oro-500" : "bg-terracotta-500";
  const word =
    level === "low"
      ? t3(locale, "Bajo", "Low")
      : level === "medium"
        ? t3(locale, "Medio", "Medium")
        : t3(locale, "Alto", "High");

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-arena-500">{label}</p>
      <div className="mt-1 flex items-center gap-2">
        <span className="flex gap-0.5" role="img" aria-label={word}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-3 w-1.5 rounded-sm ${i < filled ? tone : "bg-arena-200"}`}
              aria-hidden="true"
            />
          ))}
        </span>
        <span className="text-sm font-medium text-arena-800">{word}</span>
      </div>
    </div>
  );
}

export default function ZonaHoteleraGuide({ locale }: { locale: string }) {
  const zones = data.zones as Zone[];
  const isEs = locale === "es";

  return (
    <section className="mt-10">
      <h2 className="font-display mb-2 text-2xl font-bold text-arena-900">
        {isEs ? "Dónde dormir en la Zona Hotelera" : "Where to stay in the Hotel Zone"}
      </h2>
      <p className="mb-6 max-w-3xl leading-relaxed text-arena-700">{l(data.intro, locale)}</p>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {zones.map((zone) => {
          const accent = ACCENT[zone.accent];
          return (
            <article
              key={zone.id}
              className={`flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm ${accent.ring}`}
            >
              <div className={`px-5 py-4 text-white ${accent.band}`}>
                <p className="font-display text-2xl font-bold tabular-nums">{zone.km}</p>
                <p className="mt-0.5 text-sm font-medium text-white/90">{l(zone.name, locale)}</p>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="font-display text-lg font-bold text-arena-900">{l(zone.tagline, locale)}</p>
                <p className="mt-1 text-sm text-arena-600">{l(zone.orientation, locale)}</p>

                <div className="mt-4 grid grid-cols-2 gap-4 border-y border-arena-100 py-4">
                  <LevelMeter
                    level={zone.waves.level}
                    label={isEs ? "Oleaje" : "Surf"}
                    locale={locale}
                  />
                  <LevelMeter
                    level={zone.sargassum.level}
                    label={isEs ? "Sargazo" : "Sargassum"}
                    locale={locale}
                  />
                </div>

                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-arena-500">
                  {isEs ? "Del aeropuerto" : "From the airport"}
                </p>
                <p className="text-sm text-arena-800">
                  {zone.airportMinutes.min}–{zone.airportMinutes.max} min
                </p>

                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-arena-500">
                  {isEs ? "Playas" : "Beaches"}
                </p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {zone.beaches.map((beach) => (
                    <span
                      key={beach}
                      className={`rounded-full border px-2 py-0.5 text-xs font-medium ${accent.chip}`}
                    >
                      {beach}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-arena-700">{l(zone.goodFor, locale)}</p>

                <p className="mt-3 border-l-2 border-arena-300 pl-3 text-sm leading-relaxed text-arena-600">
                  <strong className="text-arena-800">{isEs ? "A cambio: " : "The trade-off: "}</strong>
                  {l(zone.tradeoff, locale)}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <DataConfidence
        className="mt-4"
        level={data.airportTimes.confidence as ConfidenceLevel}
        checkedOn={data.airportTimes.checkedOn}
        source={data.airportTimes.source}
        note={l(data.airportTimes.note, locale)}
        locale={locale}
      />

      {/* Sargazo */}
      <div className="mt-8 rounded-2xl border border-oro-200 bg-oro-50 p-6 md:p-8">
        <h3 className="font-display mb-3 text-xl font-bold text-arena-900">
          {l(data.sargassum.title, locale)}
        </h3>
        <p className="leading-relaxed text-arena-800">{l(data.sargassum.body, locale)}</p>
        <DataConfidence
          className="mt-4"
          level={data.sargassum.confidence as ConfidenceLevel}
          checkedOn={data.sargassum.checkedOn}
          source={data.sargassum.source}
          sourceUrl={data.sargassum.sourceUrl}
          locale={locale}
        />
      </div>

      {/* Búsqueda */}
      <div className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-arena-800 to-arena-900 p-6 text-center md:p-10">
        <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
          {isEs ? "Ya sabes qué kilómetro buscar" : "Now you know which kilometre to look for"}
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-arena-200">
          {isEs
            ? "El buscador filtra por Zona Hotelera, pero no por tramo: la dirección de cada hotel trae el kilómetro. Con eso y lo de arriba ya puedes elegir con criterio en vez de por la foto."
            : "The search filters by Hotel Zone, but not by stretch: each hotel's address includes its kilometre. With that and the guide above you can choose on the facts instead of the photo."}
        </p>
        <HotelSearchLink
          locale={locale}
          destination="Zona Hotelera, Cancún"
          label={isEs ? "Ver hoteles en la Zona Hotelera" : "See Hotel Zone hotels"}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-terracotta-500 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-terracotta-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-400 focus-visible:ring-offset-2 focus-visible:ring-offset-arena-900"
        />
        <p className="mt-3 text-xs text-arena-400">
          {isEs
            ? "Enlace de afiliado: si reservas, recibimos comisión sin costo extra para ti."
            : "Affiliate link: if you book, we earn a commission at no extra cost to you."}
        </p>
      </div>
    </section>
  );
}

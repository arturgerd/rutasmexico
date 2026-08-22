import { t3 } from "@/lib/utils";

/**
 * Etiqueta de confianza de un dato.
 *
 * El precio de un boleto no es una verdad permanente: ADO ajusta tarifas varias
 * veces al año y un traslado se cotiza al momento. Publicar "MXN 270" sin decir
 * de dónde salió ni cuándo lo vimos es lo que hace que las guías de viaje
 * envejezcan mal y pierdan credibilidad. Esta etiqueta viaja pegada al dato.
 *
 *  - verified    → lo confirmamos contra una fuente primaria (transportista, operador)
 *  - approx      → varias fuentes coinciden en el orden de magnitud, pero no al peso
 *  - unconfirmed → no lo pudimos confirmar; lo decimos en vez de inventarlo
 *  - live        → no es un dato nuestro: lo cotiza el proveedor al momento de buscar
 */
export type ConfidenceLevel = "verified" | "approx" | "unconfirmed" | "live";

const STYLES: Record<ConfidenceLevel, string> = {
  verified: "bg-jade-50 text-jade-800 border-jade-200",
  approx: "bg-oro-50 text-oro-800 border-oro-200",
  unconfirmed: "bg-arena-100 text-arena-700 border-arena-300",
  live: "bg-azul-50 text-azul-800 border-azul-200",
};

const DOTS: Record<ConfidenceLevel, string> = {
  verified: "bg-jade-500",
  approx: "bg-oro-500",
  unconfirmed: "bg-arena-400",
  live: "bg-azul-500",
};

function label(level: ConfidenceLevel, locale: string): string {
  switch (level) {
    case "verified":
      return t3(locale, "Verificado", "Verified");
    case "approx":
      return t3(locale, "Aproximado", "Approximate");
    case "unconfirmed":
      return t3(locale, "Sin confirmar", "Unconfirmed");
    case "live":
      return t3(locale, "Precio en vivo", "Live price");
  }
}

/** Formatea "2026-08-16" como "16 ago 2026" sin depender de la zona horaria del servidor. */
export function formatCheckedOn(iso: string, locale: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(
    locale === "es" ? "es-MX" : "en-US",
    { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }
  );
}

interface Props {
  level: ConfidenceLevel;
  checkedOn?: string;
  source?: string;
  sourceUrl?: string;
  note?: string;
  locale: string;
  className?: string;
}

export default function DataConfidence({
  level,
  checkedOn,
  source,
  sourceUrl,
  note,
  locale,
  className = "",
}: Props) {
  return (
    <div className={className}>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${STYLES[level]}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${DOTS[level]}`} aria-hidden="true" />
        {label(level, locale)}
        {checkedOn && (
          <span className="font-normal opacity-80">
            · {t3(locale, "revisado", "checked")} {formatCheckedOn(checkedOn, locale)}
          </span>
        )}
      </span>

      {(note || source) && (
        <p className="mt-2 text-xs leading-relaxed text-arena-600">
          {note}
          {source && (
            <>
              {note ? " " : ""}
              <span className="text-arena-500">
                {t3(locale, "Fuente:", "Source:")}{" "}
                {sourceUrl ? (
                  <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="underline hover:text-terracotta-600"
                  >
                    {source}
                  </a>
                ) : (
                  source
                )}
              </span>
            </>
          )}
        </p>
      )}
    </div>
  );
}

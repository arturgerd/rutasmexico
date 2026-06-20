/**
 * Bandera de país como IMAGEN, no emoji.
 *
 * Motivo: Windows no incluye glifos de banderas emoji 🇲🇽 — los muestra como el
 * código de país ("MX"). Una imagen se ve igual en todos los sistemas. Es un
 * componente presentacional puro, usable en Server y Client Components.
 *
 * Los SVG están auto-alojados en `public/flags/{code}.svg` (descargados de
 * flagcdn.com) para no depender de un CDN externo ni filtrar la IP del visitante.
 */
export default function Flag({
  code,
  alt = "",
  className = "h-5 w-7",
}: {
  code?: string;
  alt?: string;
  className?: string;
}) {
  if (!code) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`} aria-hidden="true">
        ⚽
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/flags/${code}.svg`}
      alt={alt}
      width={28}
      height={20}
      loading="lazy"
      className={`inline-block rounded-[3px] object-cover align-middle shadow-sm ${className}`}
    />
  );
}

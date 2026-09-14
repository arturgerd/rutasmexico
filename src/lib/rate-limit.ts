import { headers } from "next/headers";

/**
 * Freno mínimo para las server actions de formularios (contacto, opiniones).
 *
 * Ventana deslizante por IP en memoria del proceso. En Vercel cada instancia
 * tiene su propia memoria, así que esto NO es un límite global exacto: es un
 * freno barato contra un script que reenvía el mismo formulario en bucle y
 * agota la cuota de Formspree (que además aplica su propio límite). Sin
 * dependencias ni almacenamiento externo, a propósito.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function clientIp(): string {
  try {
    const h = headers();
    const forwarded = h.get("x-forwarded-for") ?? "";
    return forwarded.split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  } catch {
    // Fuera del ámbito de una petición (tests, scripts): no limitar.
    return "unknown";
  }
}

/** true si esta IP ya agotó sus envíos de `scope` en la ventana actual. */
export function isRateLimited(scope: string): boolean {
  const key = `${scope}:${clientIp()}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  // Poda ocasional para que el mapa no crezca sin límite en instancias longevas.
  if (hits.size > 2000) {
    hits.forEach((times, k) => {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    });
  }
  return false;
}

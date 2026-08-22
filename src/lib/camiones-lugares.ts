import { CamionFilter, CamionPlace, CamionSummary } from "@/types/camion";

/**
 * Módulo deliberadamente sin dependencias del catálogo completo.
 *
 * Lo importa el explorador, que es un componente de cliente: si aquí entrara
 * `@/data/camiones-cancun.json` el navegador se bajaría 470 KB de trazos que ya
 * recibe simplificados por otro lado.
 */

/**
 * Puntos de referencia que la gente sí sabe nombrar. El planificador acepta
 * cualquier punto del mapa, pero nadie conoce sus propias coordenadas: esta
 * lista llena los selectores de origen y destino.
 */
export const CAMION_PLACES: CamionPlace[] = [
  { id: "ado", name: "ADO Centro", hint: { es: "Terminal de autobuses, Av. Tulum", en: "Bus terminal, Av. Tulum" }, lng: -86.826643, lat: 21.164335 },
  { id: "palapas", name: "Parque de las Palapas", hint: { es: "Centro, a una cuadra de Tulum", en: "Downtown, a block off Tulum" }, lng: -86.827599, lat: 21.161199 },
  { id: "m28", name: "Mercado 28", hint: { es: "Artesanías y comida", en: "Crafts and food" }, lng: -86.834097, lat: 21.161837 },
  { id: "americas", name: "Plaza Las Américas", hint: { es: "Av. Tulum sur", en: "Southern Av. Tulum" }, lng: -86.823408, lat: 21.146607 },
  { id: "imss", name: "Hospital IMSS Cobá", hint: { es: "Av. Cobá", en: "Av. Cobá" }, lng: -86.827646, lat: 21.157196 },
  { id: "juarez", name: "Puerto Juárez / Ultramar", hint: { es: "Ferry a Isla Mujeres", en: "Ferry to Isla Mujeres" }, lng: -86.8075, lat: 21.1908 },
  { id: "hotelera", name: "Entrada a la Zona Hotelera", hint: { es: "Inicio del bulevar Kukulcán", en: "Start of Kukulcán boulevard" }, lng: -86.7898, lat: 21.1428 },
  { id: "punta", name: "Punta Cancún", hint: { es: "La vuelta del 7, km 9", en: "The bend of the 7, km 9" }, lng: -86.7468, lat: 21.1345 },
  { id: "forum", name: "Forum Beach", hint: { es: "Kukulcán km 9", en: "Kukulcán km 9" }, lng: -86.7585, lat: 21.0995 },
  { id: "isla", name: "La Isla", hint: { es: "Plaza comercial, Zona Hotelera", en: "Shopping mall, Hotel Zone" }, lng: -86.7728, lat: 21.0808 },
  { id: "delfines", name: "Playa Delfines", hint: { es: "Mirador, km 18 de la hotelera", en: "Lookout, km 18 of the Hotel Zone" }, lng: -86.778583, lat: 21.061964 },
  { id: "tec", name: "Tecnológico de Cancún", hint: { es: "Campus sur", en: "Southern campus" }, lng: -86.835641, lat: 21.137923 },
  { id: "portillo", name: "López Portillo y Tulum", hint: { es: "Cruce del norte", en: "Northern junction" }, lng: -86.8468, lat: 21.1845 },
  { id: "kabah", name: "Walmart Kabah", hint: { es: "Av. Kabah", en: "Av. Kabah" }, lng: -86.8478, lat: 21.1475 },
  { id: "bonfil", name: "Alfredo V. Bonfil", hint: { es: "Ejido, sur-poniente", en: "Settlement, south-west" }, lng: -86.858, lat: 21.088 },
  { id: "joya", name: "La Joya", hint: { es: "Colonia del poniente", en: "Western neighbourhood" }, lng: -86.892, lat: 21.128 },
  { id: "lakin", name: "Lakin", hint: { es: "Norte-poniente", en: "North-west" }, lng: -86.888, lat: 21.192 },
  { id: "corales", name: "Corales", hint: { es: "Sur, rumbo a Bonfil", en: "South, towards Bonfil" }, lng: -86.855, lat: 21.085 },
];

/**
 * Filtra el catálogo por texto y por categoría.
 *
 * La búsqueda es tolerante con el código porque la gente escribe el número del
 * camión de tres formas distintas: "R1", "r-1" y "1" tienen que encontrar lo mismo.
 */
export function filterCamionSummaries(
  routes: CamionSummary[],
  query: string,
  filter: CamionFilter = "todas"
): CamionSummary[] {
  const needle = query.trim().toLowerCase();
  const compact = needle.replace(/^r-?/, "").replace(/\s+/g, "");

  return routes.filter((r) => {
    if (filter === "hotelera" && r.coverage !== "hotelera") return false;
    if (filter === "urbana" && r.coverage !== "urbana") return false;
    if (filter === "24h" && !r.allDay) return false;
    if (filter === "combi" && r.vehicleType !== "combi") return false;
    if (!needle) return true;

    const haystack =
      `${r.slug} ${r.code} ${r.name} ${r.sign} ${r.operator} ${r.stops.join(" ")}`.toLowerCase();
    return (
      haystack.includes(needle) ||
      r.slug.replace(/-/g, "") === compact ||
      r.code.toLowerCase().replace(/^r/, "") === compact
    );
  });
}

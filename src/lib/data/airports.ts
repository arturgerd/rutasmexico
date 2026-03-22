import { Airport } from "@/types/airport";
import airportsData from "@/data/airports.json";

const airports: Airport[] = airportsData;

export async function getAllAirports(): Promise<Airport[]> {
  return airports;
}

export async function getAirportByIATA(iata: string): Promise<Airport | undefined> {
  return airports.find((a) => a.iata === iata);
}

export async function searchAirports(query: string): Promise<Airport[]> {
  const q = query.toLowerCase();
  return airports.filter(
    (a) =>
      a.iata.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q) ||
      a.city.es.toLowerCase().includes(q) ||
      a.city.en.toLowerCase().includes(q) ||
      a.state.es.toLowerCase().includes(q)
  );
}

/**
 * Returns major airports that appear first in search dropdowns
 */
export async function getPopularAirports(): Promise<Airport[]> {
  const popularCodes = ["MEX", "CUN", "GDL", "MTY", "TIJ", "SJD", "PVR", "MID", "OAX", "MZT"];
  return airports.filter((a) => popularCodes.includes(a.iata));
}

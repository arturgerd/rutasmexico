import terminalsData from "@/data/terminals.json";
import { Terminal } from "@/types/terminal";

const terminals = terminalsData as Terminal[];

export async function getAllTerminals(): Promise<Terminal[]> {
  return terminals;
}

export async function getTerminalById(id: string): Promise<Terminal | null> {
  return terminals.find((t) => t.id === id) ?? null;
}

export async function getTerminalsByCity(cityId: string): Promise<Terminal[]> {
  return terminals.filter((t) => t.cityId === cityId);
}

export async function getTerminalsByType(type: string): Promise<Terminal[]> {
  return terminals.filter((t) => t.type === type);
}

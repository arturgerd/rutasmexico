import type { GoalkeeperFace } from "@/components/mundial/GoalkeeperKit";

/**
 * Portero (titular proyectado) de cada selección + su aspecto estilizado.
 * Los más conocidos están verificados (Mundial 2026: Ochoa, Dibu Martínez,
 * Alisson, Unai Simón, Neuer, Pickford, Maignan, Diogo Costa, etc.); el resto
 * es una aproximación razonable. Es caricatura, no un retrato exacto.
 */
export interface Goalkeeper extends GoalkeeperFace {
  name: string;
}

// Paletas reutilizables.
const S = {
  light: "#f0c6a0",
  light2: "#e8b48c",
  tan: "#d29b6e",
  medium: "#c0875c",
  brown: "#a9714a",
  dark: "#8a5a3c",
  darker: "#6e452c",
};
const H = {
  black: "#1c1712",
  darkbrown: "#33241a",
  brown: "#5a3a22",
  lightbrown: "#7a5230",
  blonde: "#caa45a",
  ginger: "#a85a2a",
  gray: "#8a8278",
};

export const GOALKEEPERS: Record<string, Goalkeeper> = {
  // Grupo A
  mexico: { name: "Guillermo Ochoa", skin: S.light2, hair: H.black, hairStyle: "curly", beard: "stubble" },
  south_africa: { name: "Ronwen Williams", skin: S.dark, hair: H.black, hairStyle: "buzz", beard: "stubble" },
  south_korea: { name: "Jo Hyeon-woo", skin: S.light, hair: H.black, hairStyle: "short", beard: "none" },
  czechia: { name: "Tomáš Vaclík", skin: S.light, hair: H.brown, hairStyle: "short", beard: "stubble" },
  // Grupo B
  canada: { name: "Milan Borjan", skin: S.light, hair: H.black, hairStyle: "short", beard: "full" },
  qatar: { name: "Saad Al-Sheeb", skin: S.tan, hair: H.black, hairStyle: "short", beard: "full" },
  switzerland: { name: "Yann Sommer", skin: S.light, hair: H.brown, hairStyle: "short", beard: "stubble" },
  bosnia: { name: "Asmir Begović", skin: S.light, hair: H.brown, hairStyle: "short", beard: "stubble" },
  // Grupo C
  brazil: { name: "Alisson", skin: S.light, hair: H.darkbrown, hairStyle: "short", beard: "full" },
  morocco: { name: "Yassine Bounou", skin: S.tan, hair: H.black, hairStyle: "short", beard: "full" },
  scotland: { name: "Angus Gunn", skin: S.light, hair: H.lightbrown, hairStyle: "short", beard: "stubble" },
  haiti: { name: "Johny Placide", skin: S.dark, hair: H.black, hairStyle: "buzz", beard: "stubble" },
  // Grupo D
  usa: { name: "Matt Turner", skin: S.light, hair: H.brown, hairStyle: "short", beard: "full" },
  paraguay: { name: "Antony Silva", skin: S.tan, hair: H.gray, hairStyle: "short", beard: "stubble" },
  australia: { name: "Mathew Ryan", skin: S.light, hair: H.brown, hairStyle: "short", beard: "stubble" },
  turkey: { name: "Uğurcan Çakır", skin: S.light, hair: H.black, hairStyle: "short", beard: "stubble" },
  // Grupo E
  germany: { name: "Manuel Neuer", skin: S.light, hair: H.brown, hairStyle: "short", beard: "stubble" },
  ecuador: { name: "Hernán Galíndez", skin: S.light, hair: H.brown, hairStyle: "short", beard: "stubble" },
  ivory_coast: { name: "Badra Ali Sangaré", skin: S.dark, hair: H.black, hairStyle: "buzz", beard: "stubble" },
  curacao: { name: "Eloy Room", skin: S.brown, hair: H.black, hairStyle: "buzz", beard: "stubble" },
  // Grupo F
  netherlands: { name: "Andries Noppert", skin: S.light, hair: H.brown, hairStyle: "short", beard: "full" },
  japan: { name: "Shūichi Gonda", skin: S.light, hair: H.black, hairStyle: "short", beard: "none" },
  sweden: { name: "Robin Olsen", skin: S.light, hair: H.brown, hairStyle: "bald", beard: "stubble" },
  tunisia: { name: "Aymen Dahmen", skin: S.tan, hair: H.black, hairStyle: "short", beard: "stubble" },
  // Grupo G
  belgium: { name: "Thibaut Courtois", skin: S.light, hair: H.brown, hairStyle: "short", beard: "stubble" },
  egypt: { name: "Mohamed Abou Gabal", skin: S.medium, hair: H.black, hairStyle: "short", beard: "full" },
  iran: { name: "Alireza Beiranvand", skin: S.medium, hair: H.black, hairStyle: "short", beard: "stubble" },
  new_zealand: { name: "Oliver Sail", skin: S.light, hair: H.brown, hairStyle: "short", beard: "stubble" },
  // Grupo H
  spain: { name: "Unai Simón", skin: S.light, hair: H.darkbrown, hairStyle: "short", beard: "full" },
  uruguay: { name: "Sergio Rochet", skin: S.light, hair: H.brown, hairStyle: "short", beard: "stubble" },
  saudi_arabia: { name: "Mohammed Al-Owais", skin: S.tan, hair: H.black, hairStyle: "short", beard: "full" },
  cape_verde: { name: "Vozinha", skin: S.dark, hair: H.black, hairStyle: "buzz", beard: "stubble" },
  // Grupo I
  france: { name: "Mike Maignan", skin: S.dark, hair: H.black, hairStyle: "buzz", beard: "full" },
  senegal: { name: "Édouard Mendy", skin: S.darker, hair: H.black, hairStyle: "buzz", beard: "stubble" },
  norway: { name: "Ørjan Nyland", skin: S.light, hair: H.blonde, hairStyle: "short", beard: "stubble" },
  iraq: { name: "Jalal Hassan", skin: S.tan, hair: H.black, hairStyle: "short", beard: "stubble" },
  // Grupo J
  argentina: { name: "Emiliano Martínez", skin: S.light, hair: H.darkbrown, hairStyle: "short", beard: "stubble" },
  algeria: { name: "Raïs M'Bolhi", skin: S.medium, hair: H.black, hairStyle: "short", beard: "stubble" },
  austria: { name: "Daniel Bachmann", skin: S.light, hair: H.brown, hairStyle: "short", beard: "stubble" },
  jordan: { name: "Yazeed Abulaila", skin: S.tan, hair: H.black, hairStyle: "short", beard: "full" },
  // Grupo K
  portugal: { name: "Diogo Costa", skin: S.light, hair: H.darkbrown, hairStyle: "short", beard: "stubble" },
  colombia: { name: "David Ospina", skin: S.tan, hair: H.black, hairStyle: "short", beard: "stubble" },
  dr_congo: { name: "Joël Kiassumbua", skin: S.dark, hair: H.black, hairStyle: "buzz", beard: "stubble" },
  uzbekistan: { name: "Utkir Yusupov", skin: S.light2, hair: H.black, hairStyle: "short", beard: "stubble" },
  // Grupo L
  england: { name: "Jordan Pickford", skin: S.light, hair: H.lightbrown, hairStyle: "short", beard: "stubble" },
  croatia: { name: "Dominik Livaković", skin: S.light, hair: H.darkbrown, hairStyle: "short", beard: "stubble" },
  ghana: { name: "Lawrence Ati-Zigi", skin: S.dark, hair: H.black, hairStyle: "buzz", beard: "stubble" },
  panama: { name: "Orlando Mosquera", skin: S.medium, hair: H.black, hairStyle: "short", beard: "stubble" },
};

const FALLBACK: Goalkeeper = {
  name: "Portero",
  skin: "#e8b48c",
  hair: "#33241a",
  hairStyle: "short",
  beard: "stubble",
};

export function getGoalkeeper(teamId: string): Goalkeeper {
  return GOALKEEPERS[teamId] ?? FALLBACK;
}

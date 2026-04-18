export type Lang = { es: string; en: string; fr: string };

export type MenuItemCategory = "agua-fresca" | "cafe" | "taco" | "guisado" | "antojito" | "regional";

export interface MenuItem {
  id: string;
  emoji: string;
  category: MenuItemCategory;
  region?: { city: string; flag: string };
  name: Lang;
  description: Lang;
  ingredients: Lang;
  servingTip: Lang;
  funFact: Lang;
  orderPhrase: { es: string; pronEn: string; pronFr: string };
  variants: Lang;
  image: string | null;
  gradient: string;
  mlSearch: string;
}

export interface Pairing {
  drink: string;
  food: string;
  rating: 1 | 2 | 3 | 4 | 5;
  note: Lang;
}

export interface MundialMenu {
  drinks: MenuItem[];
  foods: MenuItem[];
  pairings: Pairing[];
}

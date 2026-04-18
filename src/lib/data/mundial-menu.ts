import menuData from "@/data/mundial-menu.json";
import { MundialMenu } from "@/types/mundial-menu";

export function getMundialMenu(): MundialMenu {
  return menuData as MundialMenu;
}

"use client";

import dynamic from "next/dynamic";
import { CamionLine, CamionPlan, LngLat } from "@/types/camion";

// Leaflet toca `window` al importarse: fuera del render del servidor.
const CamionesMapDynamic = dynamic(() => import("./CamionesMap"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-2xl bg-arena-100 animate-pulse flex items-center justify-center"
      style={{ height: "560px" }}
    >
      <p className="text-arena-700 text-sm">Cargando mapa…</p>
    </div>
  ),
});

interface Props {
  lines: CamionLine[];
  visibleIds: string[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  plan: CamionPlan | null;
  origin: LngLat | null;
  dest: LngLat | null;
  picking: boolean;
  onMapClick: (point: LngLat) => void;
  locale: string;
  height?: string;
}

export default function CamionesMapLoader(props: Props) {
  return <CamionesMapDynamic {...props} />;
}

"use client";

import dynamic from "next/dynamic";
import { CamionStop } from "@/types/camion";

// Leaflet toca `window` al importarse, así que el mapa no puede renderizarse en
// el servidor. Mismo patrón que MapLoader en components/map.
const RutaMapDynamic = dynamic(() => import("./RutaMap"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-2xl bg-arena-100 animate-pulse flex items-center justify-center"
      style={{ height: "460px" }}
    >
      <p className="text-arena-700 text-sm">Cargando mapa…</p>
    </div>
  ),
});

interface Props {
  polyline: [number, number][];
  stops: CamionStop[];
  color: string;
  code: string;
  height?: string;
}

export default function RutaMapLoader(props: Props) {
  return <RutaMapDynamic {...props} />;
}

"use client";

import dynamic from "next/dynamic";
import { Destination } from "@/types/destination";

const MexicoMapDynamic = dynamic(() => import("./MexicoMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full rounded-2xl bg-arena-100 animate-pulse flex items-center justify-center" style={{ height: "500px" }}>
      <div className="text-center">
        <div className="text-4xl mb-2">🗺️</div>
        <p className="text-arena-400 text-sm">Cargando mapa...</p>
      </div>
    </div>
  ),
});

interface MapLoaderProps {
  destinations?: Destination[];
  routePoints?: [number, number][];
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
  focusedDestinationId?: string;
  hideLegend?: boolean;
}

export default function MapLoader(props: MapLoaderProps) {
  return <MexicoMapDynamic {...props} />;
}

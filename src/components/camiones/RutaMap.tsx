"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { TILE_URL, TILE_ATTRIBUTION } from "@/lib/constants";
import { CamionStop } from "@/types/camion";

interface RutaMapProps {
  /** Trazo en orden [lng, lat] (GeoJSON). Aquí se invierte para Leaflet. */
  polyline: [number, number][];
  stops: CamionStop[];
  color: string;
  code: string;
  height?: string;
}

/** Encuadra el trazo completo al montar. Fuera de <MapContainer> no hay mapa al que pedírselo. */
function FitToRoute({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds, { padding: [24, 24] });
  }, [map, bounds]);
  return null;
}

export default function RutaMap({ polyline, stops, color, code, height = "460px" }: RutaMapProps) {
  const positions: [number, number][] = polyline.map(([lng, lat]) => [lat, lng]);
  const bounds = L.latLngBounds(positions);

  return (
    <MapContainer
      bounds={bounds}
      style={{ height, width: "100%" }}
      scrollWheelZoom={false}
      className="rounded-2xl shadow-lg z-0"
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
      <FitToRoute bounds={bounds} />

      {/* Contorno blanco debajo del trazo: sin él, los colores oscuros se pierden
          sobre las calles grises del mosaico. */}
      <Polyline positions={positions} pathOptions={{ color: "#ffffff", weight: 8, opacity: 0.9 }} />
      <Polyline positions={positions} pathOptions={{ color, weight: 4, opacity: 1 }} />

      {stops.map((stop, i) => (
        <CircleMarker
          key={`${stop.name}-${i}`}
          center={[stop.lat, stop.lng]}
          radius={5}
          pathOptions={{ color: "#ffffff", weight: 2, fillColor: color, fillOpacity: 1 }}
        >
          <Tooltip direction="top" offset={[0, -6]}>
            <span className="text-xs font-medium">{stop.name}</span>
            <span className="ml-1 text-xs text-arena-500">{code}</span>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

"use client";

import { useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  TILE_URL,
  TILE_ATTRIBUTION,
  CANCUN_CENTER,
  CANCUN_ZOOM,
} from "@/lib/constants";
import { CamionLine, CamionPlan, LngLat } from "@/types/camion";

interface CamionesMapProps {
  lines: CamionLine[];
  /** Rutas que pasan el filtro. Las demás se pintan tenues para no perder el contexto de la ciudad. */
  visibleIds: string[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  plan: CamionPlan | null;
  origin: LngLat | null;
  dest: LngLat | null;
  /** Cuando está activo, un clic en el mapa fija origen o destino del planificador. */
  picking: boolean;
  onMapClick: (point: LngLat) => void;
  locale: string;
  height?: string;
}

/** Encuadra la ruta seleccionada, o vuelve a la ciudad entera al deseleccionar. */
function FocusController({
  selected,
  plan,
}: {
  selected: CamionLine | null;
  plan: CamionPlan | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (plan) {
      const pts = plan.legs.flatMap((leg) => [
        [leg.from.lat, leg.from.lng] as [number, number],
        [leg.to.lat, leg.to.lng] as [number, number],
      ]);
      if (pts.length) map.fitBounds(L.latLngBounds(pts), { padding: [40, 40] });
      return;
    }
    if (selected) {
      const pts = selected.polyline.map(([lng, lat]) => [lat, lng] as [number, number]);
      map.fitBounds(L.latLngBounds(pts), { padding: [30, 30] });
      return;
    }
    map.setView([CANCUN_CENTER.lat, CANCUN_CENTER.lng], CANCUN_ZOOM);
  }, [map, selected, plan]);

  return null;
}

function ClickCatcher({
  picking,
  onMapClick,
  onSelect,
}: {
  picking: boolean;
  onMapClick: (p: LngLat) => void;
  onSelect: (id: string | null) => void;
}) {
  useMapEvents({
    click(e) {
      if (picking) onMapClick({ lng: e.latlng.lng, lat: e.latlng.lat });
      // Clic en el mapa vacío = deseleccionar. Los clics sobre un trazo no
      // llegan aquí: Leaflet los detiene en la capa de la línea.
      else onSelect(null);
    },
  });
  return null;
}

export default function CamionesMap({
  lines,
  visibleIds,
  selectedId,
  onSelect,
  plan,
  origin,
  dest,
  picking,
  onMapClick,
  locale,
  height = "560px",
}: CamionesMapProps) {
  const visible = useMemo(() => new Set(visibleIds), [visibleIds]);
  const selected = useMemo(
    () => lines.find((l) => l.id === selectedId) ?? null,
    [lines, selectedId]
  );

  const toLatLng = (coords: [number, number][]): [number, number][] =>
    coords.map(([lng, lat]) => [lat, lng]);

  return (
    <MapContainer
      center={[CANCUN_CENTER.lat, CANCUN_CENTER.lng]}
      zoom={CANCUN_ZOOM}
      style={{ height, width: "100%", cursor: picking ? "crosshair" : "" }}
      scrollWheelZoom
      className="rounded-2xl shadow-lg z-0"
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
      <FocusController selected={selected} plan={plan} />
      <ClickCatcher picking={picking} onMapClick={onMapClick} onSelect={onSelect} />

      {/* Trazos del catálogo. Con un plan activo se apagan del todo: el usuario
          ya no está explorando rutas, está leyendo un itinerario. */}
      {!plan &&
        lines.map((line) => {
          const isVisible = visible.has(line.id);
          const isSelected = line.id === selectedId;
          if (selectedId && !isSelected) {
            return (
              <Polyline
                key={line.id}
                positions={toLatLng(line.polyline)}
                pathOptions={{ color: "#c2a98e", weight: 2, opacity: 0.25 }}
                interactive={false}
              />
            );
          }
          return (
            <Polyline
              key={line.id}
              positions={toLatLng(line.polyline)}
              pathOptions={{
                color: isVisible ? line.color : "#c2a98e",
                weight: isSelected ? 6 : isVisible ? 3.5 : 1.5,
                opacity: isVisible ? 0.95 : 0.25,
              }}
              eventHandlers={{
                click: (e) => {
                  // Eligiendo origen o destino, el clic tiene que llegar al
                  // mapa: si cae encima de un trazo sigue siendo un punto
                  // válido del itinerario.
                  if (picking) return;
                  L.DomEvent.stopPropagation(e);
                  onSelect(line.id);
                },
              }}
            >
              {isVisible && (
                <Tooltip sticky>
                  <span className="text-xs font-semibold">{line.code}</span>{" "}
                  <span className="text-xs">{locale === "es" ? line.name.es : line.name.en}</span>
                </Tooltip>
              )}
            </Polyline>
          );
        })}

      {/* Paradas con nombre de la ruta seleccionada. */}
      {!plan &&
        selected?.stops.map((stop, i) => (
          <CircleMarker
            key={`${selected.id}-${i}`}
            center={[stop.lat, stop.lng]}
            radius={5}
            pathOptions={{
              color: "#ffffff",
              weight: 2,
              fillColor: selected.color,
              fillOpacity: 1,
            }}
          >
            <Tooltip direction="top" offset={[0, -6]}>
              <span className="text-xs font-medium">{stop.name}</span>
            </Tooltip>
          </CircleMarker>
        ))}

      {/* Itinerario: camión en color sólido, caminata punteada. */}
      {plan?.legs.map((leg, i) => (
        <Polyline
          key={`${plan.id}-${i}`}
          positions={
            leg.kind === "bus"
              ? findRideGeometry(lines, leg.routeId, leg.from, leg.to)
              : [
                  [leg.from.lat, leg.from.lng],
                  [leg.to.lat, leg.to.lng],
                ]
          }
          pathOptions={
            leg.kind === "bus"
              ? { color: leg.routeColor ?? "#e96424", weight: 6, opacity: 0.95 }
              : { color: "#5e4840", weight: 3, opacity: 0.8, dashArray: "6, 8" }
          }
        />
      ))}

      {origin && (
        <CircleMarker
          center={[origin.lat, origin.lng]}
          radius={9}
          pathOptions={{ color: "#ffffff", weight: 3, fillColor: "#0d9668", fillOpacity: 1 }}
        >
          <Tooltip direction="top" offset={[0, -8]}>
            {locale === "es" ? "Origen" : "Start"}
          </Tooltip>
        </CircleMarker>
      )}
      {dest && (
        <CircleMarker
          center={[dest.lat, dest.lng]}
          radius={9}
          pathOptions={{ color: "#ffffff", weight: 3, fillColor: "#e96424", fillOpacity: 1 }}
        >
          <Tooltip direction="top" offset={[0, -8]}>
            {locale === "es" ? "Destino" : "Destination"}
          </Tooltip>
        </CircleMarker>
      )}
    </MapContainer>
  );
}

/**
 * Recorta el trazo real de la ruta entre subida y bajada.
 *
 * Sin esto el tramo en camión se dibujaría como una recta que atraviesa manzanas
 * enteras. Se buscan los índices más cercanos a cada extremo y se corta ahí; si
 * la ruta va en sentido contrario al del viaje, el corte se invierte.
 */
function findRideGeometry(
  lines: CamionLine[],
  routeId: string | undefined,
  from: LngLat,
  to: LngLat
): [number, number][] {
  const line = lines.find((l) => l.id === routeId);
  if (!line) {
    return [
      [from.lat, from.lng],
      [to.lat, to.lng],
    ];
  }
  const nearestIndex = (p: LngLat) => {
    let best = 0;
    let bestDist = Infinity;
    line.polyline.forEach(([lng, lat], i) => {
      const d = (lng - p.lng) ** 2 + (lat - p.lat) ** 2;
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    return best;
  };
  const a = nearestIndex(from);
  const b = nearestIndex(to);
  const slice = a <= b ? line.polyline.slice(a, b + 1) : line.polyline.slice(b, a + 1).reverse();
  return slice.map(([lng, lat]) => [lat, lng]);
}

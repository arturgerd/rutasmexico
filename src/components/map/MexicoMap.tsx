"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MEXICO_CENTER, MEXICO_ZOOM, TILE_URL, TILE_ATTRIBUTION } from "@/lib/constants";
import Link from "next/link";
import { useLocale } from "next-intl";
import { localize } from "@/lib/utils";
import { Destination } from "@/types/destination";
import { Locale } from "@/types/common";

import { REGION_STYLE, Region } from "./regionStyles";
// Re-export so any existing imports from MexicoMap keep working
export { REGION_STYLE };
export type { Region };

function createCustomIcon(region: Region): L.DivIcon {
  const style = REGION_STYLE[region] || REGION_STYLE.centro;
  return L.divIcon({
    className: "rm-custom-marker",
    html: `
      <div style="position: relative; width: 40px; height: 50px;">
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          background: ${style.color};
          border: 3px solid white;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <span style="
            transform: rotate(45deg);
            font-size: 18px;
            line-height: 1;
          ">${style.emoji}</span>
        </div>
      </div>
    `,
    iconSize: [40, 50],
    iconAnchor: [20, 40],
    popupAnchor: [0, -36],
  });
}

interface MexicoMapProps {
  destinations?: Destination[];
  routePoints?: [number, number][];
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
  /** If provided, the map flies to this destination and opens its popup when it changes. */
  focusedDestinationId?: string;
  /** If true, the built-in legend is hidden (use when parent component renders its own UI). */
  hideLegend?: boolean;
}

/** Internal helper that flies the map to the focused destination. Must be a child of <MapContainer>. */
function FocusController({
  destinations,
  focusedDestinationId,
  markerRefs,
}: {
  destinations: Destination[];
  focusedDestinationId?: string;
  markerRefs: React.MutableRefObject<Record<string, L.Marker | null>>;
}) {
  const map = useMap();

  useEffect(() => {
    if (!focusedDestinationId) return;
    const dest = destinations.find((d) => d.id === focusedDestinationId);
    if (!dest) return;
    map.flyTo([dest.coordinates.lat, dest.coordinates.lng], 8, { duration: 1.2 });
    // Open popup once the flyTo finishes
    const marker = markerRefs.current[dest.id];
    if (marker) {
      setTimeout(() => marker.openPopup(), 1300);
    }
  }, [focusedDestinationId, destinations, map, markerRefs]);

  return null;
}

export default function MexicoMap({
  destinations = [],
  routePoints,
  center = MEXICO_CENTER,
  zoom = MEXICO_ZOOM,
  height = "500px",
  focusedDestinationId,
  hideLegend = false,
}: MexicoMapProps) {
  const locale = useLocale() as Locale;
  const markerRefs = useRef<Record<string, L.Marker | null>>({});

  // Build legend from regions actually present in the destinations list
  const regionsPresent = Array.from(new Set(destinations.map((d) => d.region as Region)));

  return (
    <div className="relative">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        style={{ height, width: "100%" }}
        scrollWheelZoom={true}
        className="rounded-2xl shadow-lg z-0"
      >
        <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />

        <FocusController
          destinations={destinations}
          focusedDestinationId={focusedDestinationId}
          markerRefs={markerRefs}
        />

        {destinations.map((dest) => (
          <Marker
            key={dest.id}
            position={[dest.coordinates.lat, dest.coordinates.lng]}
            icon={createCustomIcon(dest.region as Region)}
            ref={(ref) => {
              markerRefs.current[dest.id] = ref;
            }}
          >
            <Popup>
              <div className="text-center min-w-[180px]">
                <div
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold mb-1.5"
                  style={{
                    backgroundColor: `${REGION_STYLE[dest.region as Region]?.color}20`,
                    color: REGION_STYLE[dest.region as Region]?.color,
                  }}
                >
                  {REGION_STYLE[dest.region as Region]?.emoji}{" "}
                  {locale === "es"
                    ? REGION_STYLE[dest.region as Region]?.label.es
                    : REGION_STYLE[dest.region as Region]?.label.en}
                </div>
                <h3 className="font-display font-bold text-base text-arena-900 mb-0.5">
                  {localize(dest.name, locale)}
                </h3>
                <p className="text-xs text-arena-500 mb-2">
                  {localize(dest.state, locale)}
                </p>
                <Link
                  href={`/${locale}/destinos/${dest.slug}`}
                  className="inline-block text-xs bg-terracotta-500 text-white px-3 py-1.5 rounded-lg hover:bg-terracotta-600 transition-colors font-medium"
                >
                  {locale === "es" ? "Ver destino" : "View destination"}
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}

        {routePoints && routePoints.length >= 2 && (
          <Polyline
            positions={routePoints}
            pathOptions={{ color: "#e96424", weight: 3, dashArray: "10, 10" }}
          />
        )}
      </MapContainer>

      {/* Legend - only shows when destinations are provided and legend is not hidden */}
      {!hideLegend && regionsPresent.length > 1 && (
        <div className="mt-4 bg-white rounded-xl border border-arena-100 p-4 shadow-sm">
          <p className="text-xs font-semibold text-arena-500 uppercase tracking-wide mb-3">
            {locale === "es" ? "Regiones" : "Regions"}
          </p>
          <div className="flex flex-wrap gap-3">
            {regionsPresent.map((region) => {
              const style = REGION_STYLE[region];
              if (!style) return null;
              const count = destinations.filter((d) => d.region === region).length;
              return (
                <div key={region} className="inline-flex items-center gap-2 text-sm">
                  <span
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs"
                    style={{ backgroundColor: style.color }}
                  >
                    {style.emoji}
                  </span>
                  <span className="text-arena-700 font-medium">
                    {locale === "es" ? style.label.es : style.label.en}
                  </span>
                  <span className="text-arena-400 text-xs">({count})</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

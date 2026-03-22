"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MEXICO_CENTER, MEXICO_ZOOM, TILE_URL, TILE_ATTRIBUTION } from "@/lib/constants";
import Link from "next/link";
import { useLocale } from "next-intl";
import { localize } from "@/lib/utils";
import { Destination } from "@/types/destination";
import { Locale } from "@/types/common";

// Fix default markers
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface MexicoMapProps {
  destinations?: Destination[];
  routePoints?: [number, number][];
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
}

export default function MexicoMap({
  destinations = [],
  routePoints,
  center = MEXICO_CENTER,
  zoom = MEXICO_ZOOM,
  height = "500px",
}: MexicoMapProps) {
  const locale = useLocale() as Locale;

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      style={{ height, width: "100%" }}
      scrollWheelZoom={true}
      className="rounded-2xl shadow-lg"
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />

      {destinations.map((dest) => (
        <Marker
          key={dest.id}
          position={[dest.coordinates.lat, dest.coordinates.lng]}
          icon={defaultIcon}
        >
          <Popup>
            <div className="text-center min-w-[150px]">
              <h3 className="font-display font-bold text-base text-arena-900 mb-1">
                {localize(dest.name, locale)}
              </h3>
              <p className="text-xs text-arena-500 mb-2">
                {localize(dest.state, locale)}
              </p>
              <Link
                href={`/${locale}/destinos/${dest.slug}`}
                className="inline-block text-xs bg-terracotta-500 text-white px-3 py-1 rounded-lg hover:bg-terracotta-600 transition-colors"
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
  );
}

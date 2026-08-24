"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { TILE_URL, TILE_ATTRIBUTION } from "@/lib/constants";
import { Locale, LocalizedString } from "@/types/common";
import { localize } from "@/lib/utils";
import { useLocale } from "next-intl";

// Los iconos se sirven desde /public en vez de unpkg: el CSP del sitio no
// permite img-src externo, asi que las URLs del CDN salian bloqueadas y el pin
// se veia roto en todas las fichas de destino con terminal. Copiados de
// node_modules/leaflet/dist/images.
const pinIcon = L.icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface LocationPinMapProps {
  lat: number;
  lng: number;
  name: LocalizedString;
  address: LocalizedString;
}

export default function LocationPinMap({ lat, lng, name, address }: LocationPinMapProps) {
  const locale = useLocale() as Locale;

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      style={{ height: "200px", width: "100%" }}
      scrollWheelZoom={false}
      dragging={false}
      className="rounded-xl shadow-md"
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
      <Marker position={[lat, lng]} icon={pinIcon}>
        <Popup>
          <div className="text-sm">
            <p className="font-semibold">{localize(name, locale)}</p>
            <p className="text-arena-500 text-xs mt-1">{localize(address, locale)}</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

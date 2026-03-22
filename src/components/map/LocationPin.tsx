"use client";

import dynamic from "next/dynamic";
import { LocalizedString } from "@/types/common";

const LocationPinMapDynamic = dynamic(() => import("./LocationPinMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[200px] rounded-xl bg-arena-100 animate-pulse flex items-center justify-center">
      <span className="text-arena-400 text-sm">📍</span>
    </div>
  ),
});

interface LocationPinProps {
  lat: number;
  lng: number;
  name: LocalizedString;
  address: LocalizedString;
}

export default function LocationPin(props: LocationPinProps) {
  return <LocationPinMapDynamic {...props} />;
}

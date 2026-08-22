"use client";

import { getHotelSearchUrl } from "@/lib/affiliate";
import { localDateISO } from "@/lib/travel-dates";
import { trackAffiliateClick } from "@/lib/analytics";

interface Props {
  /** Destino tal cual lo recibe Hotellook. "Zona Hotelera, Cancún" sí llega como filtro real. */
  destination: string;
  label: string;
  locale: string;
  className?: string;
}

/**
 * Botón de búsqueda de hoteles.
 *
 * Vive en el cliente por las fechas: la página es estática, así que un check-in
 * calculado en el servidor se congelaría en el HTML del build y en pocos días
 * estaría pidiendo una fecha pasada.
 */
export default function HotelSearchLink({ destination, label, locale, className = "" }: Props) {
  const handleClick = () => {
    trackAffiliateClick({
      product: "hotel",
      network: "travelpayouts",
      partner: "hotellook",
      destination,
    });
    window.open(
      getHotelSearchUrl({
        cityName: destination,
        checkIn: localDateISO(14),
        checkOut: localDateISO(18),
        adults: 2,
        locale: locale === "es" ? "es" : "en",
      }),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {label}
    </button>
  );
}

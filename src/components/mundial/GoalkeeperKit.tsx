/**
 * Portero estilizado en SVG, teñido con los 2 colores reales de cada selección.
 * Un solo dibujo sirve para las 48: `primary` = camiseta, `secondary` = detalles
 * (mangas, cuello, número), `skin` = tono de piel. Componente presentacional puro.
 */
export default function GoalkeeperKit({
  primary,
  secondary,
  skin = "#e8b48c",
  className = "",
}: {
  primary: string;
  secondary: string;
  skin?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 120 150" className={className} role="img" aria-label="Portero">
      {/* Brazos / mangas en pose de atajada */}
      <path d="M42 72 L16 42" stroke={primary} strokeWidth="12" strokeLinecap="round" />
      <path d="M78 72 L104 42" stroke={primary} strokeWidth="12" strokeLinecap="round" />
      {/* Guantes */}
      <ellipse cx="14" cy="40" rx="9" ry="11" fill="#f5f5f5" stroke={secondary} strokeWidth="2.5" />
      <ellipse cx="106" cy="40" rx="9" ry="11" fill="#f5f5f5" stroke={secondary} strokeWidth="2.5" />
      {/* Piernas + calcetas */}
      <rect x="47" y="108" width="11" height="32" rx="4" fill="#2b2b2b" />
      <rect x="62" y="108" width="11" height="32" rx="4" fill="#2b2b2b" />
      <rect x="47" y="131" width="11" height="11" rx="2" fill={primary} />
      <rect x="62" y="131" width="11" height="11" rx="2" fill={primary} />
      {/* Short */}
      <rect x="43" y="95" width="34" height="22" rx="5" fill={secondary} />
      {/* Camiseta */}
      <path d="M42 66 Q60 60 78 66 L80 99 Q60 105 40 99 Z" fill={primary} stroke={secondary} strokeWidth="2" />
      {/* Cuello */}
      <path d="M53 64 Q60 71 67 64" fill="none" stroke={secondary} strokeWidth="4" />
      {/* Número */}
      <text x="60" y="90" textAnchor="middle" fontSize="17" fontWeight="700" fill={secondary} fontFamily="system-ui, sans-serif">1</text>
      {/* Cuello-piel */}
      <rect x="55" y="55" width="10" height="11" fill={skin} />
      {/* Cabeza */}
      <circle cx="60" cy="43" r="14" fill={skin} />
      {/* Cabello */}
      <path d="M46 41 Q60 25 74 41 Q70 33 60 32 Q50 33 46 41 Z" fill="#3a2a1a" />
    </svg>
  );
}

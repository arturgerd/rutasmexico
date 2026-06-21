/**
 * Portero estilizado en SVG, teñido con los 2 colores reales de cada selección.
 * Un solo dibujo sirve para las 48: `primary` = camiseta, `secondary` = detalles
 * (mangas, cuello, número), `skin` = tono de piel. Componente presentacional puro.
 * El efecto de "atajada" (pose en horizontal) se logra rotando el contenedor.
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
      <path d="M42 70 L15 40" stroke={primary} strokeWidth="13" strokeLinecap="round" />
      <path d="M78 70 L105 40" stroke={primary} strokeWidth="13" strokeLinecap="round" />
      {/* Guantes */}
      <g>
        <ellipse cx="13" cy="38" rx="11" ry="13" fill="#fafafa" stroke={secondary} strokeWidth="3" />
        <ellipse cx="107" cy="38" rx="11" ry="13" fill="#fafafa" stroke={secondary} strokeWidth="3" />
      </g>
      {/* Piernas */}
      <rect x="47" y="106" width="11" height="30" rx="4" fill="#2b2b2b" />
      <rect x="62" y="106" width="11" height="30" rx="4" fill="#2b2b2b" />
      {/* Calcetas */}
      <rect x="47" y="124" width="11" height="9" rx="2" fill={primary} />
      <rect x="62" y="124" width="11" height="9" rx="2" fill={primary} />
      {/* Botines */}
      <path d="M44 136 q-3 0 -3 4 l17 0 0 -4 z" fill="#1a1a1a" />
      <path d="M76 136 q3 0 3 4 l-17 0 0 -4 z" fill="#1a1a1a" />
      {/* Short */}
      <rect x="43" y="94" width="34" height="22" rx="5" fill={secondary} />
      {/* Camiseta */}
      <path d="M42 65 Q60 59 78 65 L80 99 Q60 105 40 99 Z" fill={primary} stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" />
      {/* Banda lateral */}
      <path d="M44 67 L42 98" stroke={secondary} strokeWidth="3" opacity="0.85" />
      <path d="M76 67 L78 98" stroke={secondary} strokeWidth="3" opacity="0.85" />
      {/* Cuello */}
      <path d="M53 64 Q60 71 67 64" fill="none" stroke={secondary} strokeWidth="4" />
      {/* Número */}
      <text x="60" y="89" textAnchor="middle" fontSize="17" fontWeight="700" fill={secondary} fontFamily="system-ui, sans-serif">1</text>
      {/* Cuello-piel */}
      <rect x="55" y="55" width="10" height="11" fill={skin} />
      {/* Cabeza */}
      <circle cx="60" cy="43" r="14.5" fill={skin} stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
      {/* Cabello */}
      <path d="M45 41 Q60 24 75 41 Q71 32 60 31 Q49 32 45 41 Z" fill="#3a2a1a" />
    </svg>
  );
}

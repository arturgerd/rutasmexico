/**
 * Portero estilizado en SVG, teñido con los 2 colores reales de cada selección
 * y con ROSTRO (ojos, cejas, nariz, boca) + peinado, barba y tono de piel
 * aproximados al portero real de cada equipo. Componente presentacional puro.
 * La "atajada" (pose horizontal) se logra rotando el contenedor.
 */

export type HairStyle = "short" | "buzz" | "bald" | "curly" | "long";
export type BeardStyle = "none" | "stubble" | "full";

export interface GoalkeeperFace {
  skin: string;
  hair: string;
  hairStyle: HairStyle;
  beard: BeardStyle;
}

const DEFAULT_FACE: GoalkeeperFace = {
  skin: "#e8b48c",
  hair: "#33241a",
  hairStyle: "short",
  beard: "none",
};

function Hair({ style, color }: { style: HairStyle; color: string }) {
  if (style === "bald") {
    return <path d="M47 45 Q47 52 50 55 M73 45 Q73 52 70 55" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.85" />;
  }
  if (style === "buzz") {
    return <path d="M46.5 41 Q60 29 73.5 41 Q69 34 60 33.5 Q51 34 46.5 41 Z" fill={color} opacity="0.92" />;
  }
  if (style === "curly") {
    return (
      <g fill={color}>
        {[
          [49, 36], [54, 32.5], [60, 31], [66, 32.5], [71, 36], [46.5, 41], [73.5, 41],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={3.6} />
        ))}
      </g>
    );
  }
  if (style === "long") {
    return (
      <g fill={color}>
        <path d="M45 41 Q60 23 75 41 Q70 31 60 30 Q50 31 45 41 Z" />
        <path d="M45.5 40 Q44 50 47 55 L50 54 Q48 47 49 41 Z" />
        <path d="M74.5 40 Q76 50 73 55 L70 54 Q72 47 71 41 Z" />
      </g>
    );
  }
  // short
  return <path d="M45.5 41 Q60 24 74.5 41 Q70 31 60 30 Q50 31 45.5 41 Z" fill={color} />;
}

function Beard({ style, color }: { style: BeardStyle; color: string }) {
  if (style === "none") return null;
  const opacity = style === "stubble" ? 0.22 : 0.95;
  return (
    <path
      d="M46.5 44 Q48 57 60 58.2 Q72 57 73.5 44 Q67.5 51.5 60 51.5 Q52.5 51.5 46.5 44 Z"
      fill={color}
      opacity={opacity}
    />
  );
}

export default function GoalkeeperKit({
  primary,
  secondary,
  face,
  className = "",
}: {
  primary: string;
  secondary: string;
  face?: GoalkeeperFace;
  className?: string;
}) {
  const f = face ?? DEFAULT_FACE;
  const skin = f.skin;

  return (
    <svg viewBox="0 0 120 150" className={className} role="img" aria-label="Portero">
      {/* Brazos / mangas en pose de atajada */}
      <path d="M42 70 L15 40" stroke={primary} strokeWidth="13" strokeLinecap="round" />
      <path d="M78 70 L105 40" stroke={primary} strokeWidth="13" strokeLinecap="round" />
      {/* Guantes */}
      <ellipse cx="13" cy="38" rx="11" ry="13" fill="#fafafa" stroke={secondary} strokeWidth="3" />
      <ellipse cx="107" cy="38" rx="11" ry="13" fill="#fafafa" stroke={secondary} strokeWidth="3" />
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
      <path d="M44 67 L42 98" stroke={secondary} strokeWidth="3" opacity="0.85" />
      <path d="M76 67 L78 98" stroke={secondary} strokeWidth="3" opacity="0.85" />
      <path d="M53 64 Q60 71 67 64" fill="none" stroke={secondary} strokeWidth="4" />
      <text x="60" y="89" textAnchor="middle" fontSize="17" fontWeight="700" fill={secondary} fontFamily="system-ui, sans-serif">1</text>
      {/* Cuello-piel */}
      <rect x="55" y="55" width="10" height="11" fill={skin} />

      {/* Cabeza */}
      <circle cx="60" cy="43" r="14.5" fill={skin} stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
      {/* Orejas */}
      <circle cx="46.5" cy="44" r="2.4" fill={skin} stroke="rgba(0,0,0,0.1)" strokeWidth="0.6" />
      <circle cx="73.5" cy="44" r="2.4" fill={skin} stroke="rgba(0,0,0,0.1)" strokeWidth="0.6" />

      {/* Barba (debajo de los rasgos) */}
      <Beard style={f.beard} color={f.hair} />

      {/* Cejas */}
      <path d="M52.4 38.8 Q55.4 37.5 58 38.4" stroke={f.hair} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M62 38.4 Q64.6 37.5 67.6 38.8" stroke={f.hair} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Ojos */}
      <ellipse cx="55.4" cy="42" rx="1.7" ry="2.2" fill="#241c14" />
      <ellipse cx="64.6" cy="42" rx="1.7" ry="2.2" fill="#241c14" />
      <circle cx="54.9" cy="41.4" r="0.6" fill="#ffffff" opacity="0.9" />
      <circle cx="64.1" cy="41.4" r="0.6" fill="#ffffff" opacity="0.9" />
      {/* Nariz */}
      <path d="M60 42.6 q-1.3 3 -0.3 4.3" stroke="rgba(0,0,0,0.22)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      {/* Boca */}
      <path d="M56.5 49.6 Q60 51.8 63.5 49.6" stroke="#8a4636" strokeWidth="1.4" fill="none" strokeLinecap="round" />

      {/* Cabello (encima) */}
      <Hair style={f.hairStyle} color={f.hair} />
    </svg>
  );
}

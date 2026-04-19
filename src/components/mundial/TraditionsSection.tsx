"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { t3 } from "@/lib/utils";

type Lang = { es: string; en: string; fr: string };

interface Tradition {
  id: string;
  emoji: string;
  title: Lang;
  description: Lang;
  image: string;
  audio?: string;
  audioLabel?: Lang;
}

const TRADITIONS: Tradition[] = [
  {
    id: "cielito-lindo",
    emoji: "📣",
    title: { es: "El Cielito Lindo", en: "Cielito Lindo chant", fr: "Chant Cielito Lindo" },
    description: {
      es: "Canta 'Ay ay ay ay, canta y no llores' con 80,000 personas en el Estadio Azteca. Piel de gallina garantizada.",
      en: "Sing 'Ay ay ay ay, canta y no llores' with 80,000 people at Estadio Azteca. Goosebumps guaranteed.",
      fr: "Chante 'Ay ay ay ay, canta y no llores' avec 80 000 personnes au Estadio Azteca. Frissons garantis.",
    },
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop&q=80",
    audio: "/audio/cielito-lindo.ogg",
    audioLabel: { es: "Escuchar la melodía", en: "Listen to the melody", fr: "Écouter la mélodie" },
  },
  {
    id: "ola-mexicana",
    emoji: "🪇",
    title: { es: "La Ola mexicana", en: "The Mexican Wave", fr: "La Ola mexicaine" },
    description: {
      es: "Inventada en México 1986. Levántate cuando llegue a tu sección. Es tradición mundial con origen mexicano.",
      en: "Invented in Mexico 1986. Stand up when it reaches your section. A worldwide tradition with Mexican roots.",
      fr: "Inventée au Mexique en 1986. Lève-toi quand elle arrive. Tradition mondiale d'origine mexicaine.",
    },
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=600&fit=crop&q=80",
    audio: "/audio/multitud-ola.wav",
    audioLabel: { es: "Ambiente del estadio", en: "Stadium ambience", fr: "Ambiance du stade" },
  },
  {
    id: "trompetas-matracas",
    emoji: "🎺",
    title: { es: "Trompetas y matracas", en: "Trumpets & rattles", fr: "Trompettes et crécelles" },
    description: {
      es: "Compra una matraca o vuvuzela afuera del estadio ($50-100 MXN). El ruido es parte de la fiesta.",
      en: "Buy a rattle or vuvuzela outside the stadium ($50-100 MXN). The noise is part of the party.",
      fr: "Achète une crécelle ou vuvuzela dehors ($50-100 MXN). Le bruit fait partie de la fête.",
    },
    image: "https://images.unsplash.com/photo-1565035010268-a3816f98589a?w=800&h=600&fit=crop&q=80",
    audio: "/audio/trompeta-fanfare.wav",
    audioLabel: { es: "Escuchar la fanfarria", en: "Listen to the fanfare", fr: "Écouter la fanfare" },
  },
  {
    id: "pintarse-cara",
    emoji: "🇲🇽",
    title: { es: "Pintarse la cara", en: "Face painting", fr: "Peinture de visage" },
    description: {
      es: "Verde, blanco y rojo. Hay artistas afuera del estadio desde $50 MXN. Los sombreros de charro también son clásicos.",
      en: "Green, white and red. Artists outside the stadium from $50 MXN. Charro hats are also classic.",
      fr: "Vert, blanc et rouge. Artistes devant le stade dès $50 MXN. Les sombreros de charro aussi sont classiques.",
    },
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&h=600&fit=crop&q=80",
  },
];

export default function TraditionsSection({ locale }: { locale: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
      <h3 className="font-display font-bold text-arena-800 text-lg mb-2">
        🎉 {t3(locale, "Tradiciones y ambiente en el estadio", "Stadium traditions & atmosphere", "Traditions et ambiance au stade")}
      </h3>
      <p className="text-sm text-arena-500 mb-5">
        {t3(
          locale,
          "Escucha cómo suena el Mundial mexicano: toca ▶ en cada tarjeta.",
          "Hear what the Mexican World Cup sounds like: tap ▶ on each card.",
          "Écoute à quoi ressemble la Coupe du Monde mexicaine : touche ▶ sur chaque carte."
        )}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {TRADITIONS.map((t) => (
          <TraditionCard key={t.id} tradition={t} locale={locale} />
        ))}
      </div>
      <p className="text-xs text-arena-400 mt-4 text-center">
        🎵 {t3(
          locale,
          "Clips de audio: Cielito Lindo (Wikimedia, dominio público). Trompeta y multitud sintetizados bajo CC0.",
          "Audio clips: Cielito Lindo (Wikimedia, public domain). Trumpet and crowd synthesized under CC0.",
          "Extraits audio : Cielito Lindo (Wikimedia, domaine public). Trompette et foule synthétisées sous CC0."
        )}
      </p>
    </div>
  );
}

function TraditionCard({ tradition, locale }: { tradition: Tradition; locale: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = t3(locale, tradition.title.es, tradition.title.en, tradition.title.fr);
  const description = t3(locale, tradition.description.es, tradition.description.en, tradition.description.fr);
  const audioLabel = tradition.audioLabel
    ? t3(locale, tradition.audioLabel.es, tradition.audioLabel.en, tradition.audioLabel.fr)
    : "";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => setPlaying(false);
    const onPause = () => setPlaying(false);
    const onPlaying = () => {
      setLoading(false);
      setPlaying(true);
    };
    const onWaiting = () => setLoading(true);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("waiting", onWaiting);
    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("waiting", onWaiting);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
      return;
    }
    setLoading(true);
    try {
      audio.currentTime = 0;
      await audio.play();
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-arena-900 aspect-[4/5] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Background image */}
      <Image
        src={tradition.image}
        alt={title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
        className="object-cover opacity-70 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
      />
      {/* Darken gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

      <div className="relative z-10 h-full flex flex-col justify-between p-4">
        <div className="text-4xl drop-shadow-lg">{tradition.emoji}</div>
        <div>
          <h4 className="font-display font-bold text-white text-base leading-tight mb-1 drop-shadow">{title}</h4>
          <p className="text-white/80 text-xs leading-snug line-clamp-4">{description}</p>
          {tradition.audio && (
            <>
              <button
                type="button"
                onClick={togglePlay}
                aria-label={audioLabel}
                className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold shadow-lg transition-all ${
                  playing
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-white text-arena-900 hover:bg-oro-300"
                }`}
              >
                {loading ? (
                  <span className="inline-block w-3 h-3 rounded-full border-2 border-arena-800 border-t-transparent animate-spin" />
                ) : playing ? (
                  <span>⏸</span>
                ) : (
                  <span>▶</span>
                )}
                <span>
                  {playing
                    ? t3(locale, "Detener", "Stop", "Arrêter")
                    : loading
                    ? t3(locale, "Cargando…", "Loading…", "Chargement…")
                    : audioLabel}
                </span>
              </button>
              <audio ref={audioRef} src={tradition.audio} preload="none" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

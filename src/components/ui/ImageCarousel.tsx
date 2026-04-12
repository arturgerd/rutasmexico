"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  height?: string;
}

export default function ImageCarousel({ images, alt, height = "h-48" }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrent((i) => (i + 1) % images.length);
    },
    [images.length]
  );

  const prev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrent((i) => (i - 1 + images.length) % images.length);
    },
    [images.length]
  );

  if (images.length === 0) return null;

  return (
    <div className={`relative ${height} w-full overflow-hidden`}>
      <Image
        src={images[current]}
        alt={`${alt} ${current + 1}`}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs transition-colors"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs transition-colors"
            aria-label="Next image"
          >
            ›
          </button>
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <span
                key={i}
                className={`block w-1.5 h-1.5 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

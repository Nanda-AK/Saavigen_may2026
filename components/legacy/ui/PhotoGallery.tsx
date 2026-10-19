"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

type Photo = {
  src: string;
  alt: string;
};

type PhotoGalleryProps = {
  photos: Photo[];
};

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null ? null : (current - 1 + photos.length) % photos.length,
        );
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? null : (current + 1) % photos.length,
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, photos.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`View larger image: ${photo.alt}`}
            className="aspect-square overflow-hidden rounded-xl border border-default transition-opacity duration-150 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photos[activeIndex].alt}
          onClick={() => setActiveIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 p-6"
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Close image"
            className="absolute right-6 top-6 text-white/80 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
          >
            <X className="h-7 w-7" />
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveIndex((current) =>
                    current === null ? null : (current - 1 + photos.length) % photos.length,
                  );
                }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal md:left-6"
              >
                <ChevronLeft className="h-9 w-9" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveIndex((current) =>
                    current === null ? null : (current + 1) % photos.length,
                  );
                }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal md:right-6"
              >
                <ChevronRight className="h-9 w-9" />
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[activeIndex].src}
            alt={photos[activeIndex].alt}
            className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
}

"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { GalleryImage } from "@/lib/article-utils";

/*
  Article photo gallery with a full-screen viewer.
  Thumbnails zoom slightly on hover; clicking opens the viewer.
  Viewer keys: Escape closes, Left / Right move between photos. Focus moves to the
  close button on open and returns to the thumbnail that opened it on close.
*/
export function Gallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpened = useRef(0);

  const close = useCallback(() => {
    setOpen(null);
    thumbRefs.current[lastOpened.current]?.focus();
  }, []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? null : (i + d + images.length) % images.length)), [images.length]);

  useEffect(() => {
    if (open === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, close, step]);

  return (
    <section aria-label={title}>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((img, i) => (
          <li key={img.src} className={i === 0 ? "col-span-2 row-span-2" : ""}>
            <button
              ref={(el) => {
                thumbRefs.current[i] = el;
              }}
              type="button"
              onClick={() => {
                lastOpened.current = i;
                setOpen(i);
              }}
              aria-label={`View larger: ${img.alt}`}
              className="group block size-full overflow-hidden rounded-[1rem] bg-tint"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transform-none"
              />
            </button>
          </li>
        ))}
      </ul>

      {open !== null ? (
        <div role="dialog" aria-modal="true" aria-label={images[open].alt} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/92 p-4 md:p-10" onClick={close}>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close photo"
            className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:top-6 md:right-6"
          >
            <Icon icon={X} size={22} />
          </button>
          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous photo"
                className="absolute left-3 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6"
              >
                <Icon icon={ChevronLeft} size={24} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next photo"
                className="absolute right-3 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6"
              >
                <Icon icon={ChevronRight} size={24} />
              </button>
            </>
          ) : null}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[open].src} alt={images[open].alt} onClick={(e) => e.stopPropagation()} className="max-h-[85vh] max-w-full rounded-[0.75rem] object-contain" />
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[0.875rem] text-white/70">
            {open + 1} / {images.length}
          </p>
        </div>
      ) : null}
    </section>
  );
}

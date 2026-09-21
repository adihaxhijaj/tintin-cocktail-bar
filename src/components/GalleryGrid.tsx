"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Photo } from "@/components/Photo";
import { gallery } from "@/lib/site";
import { motionTokens } from "@/lib/motion-tokens";

export function GalleryGrid() {
  const [index, setIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const go = useCallback(
    (dir: number) =>
      setIndex((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, go]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {gallery.map((g, i) => (
          <motion.li
            key={g.src}
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: reduce ? motionTokens.duration.fast : motionTokens.duration.normal,
              ease: motionTokens.easing.smooth,
              delay: reduce ? 0 : (i % 4) * 0.05,
            }}
            className={g.tall ? "row-span-2" : ""}
          >
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block h-full w-full overflow-hidden rounded-[3px] focus-visible:outline-brass-bright"
              aria-label={`Open image: ${g.alt}`}
            >
              <div className={`relative w-full ${g.tall ? "aspect-[3/4] sm:aspect-[3/5]" : "aspect-square"}`}>
                <Photo
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1100ms] group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-noir/0 transition-colors duration-500 group-hover:bg-noir/20" />
              </div>
            </button>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {open && index !== null && (
          <motion.div
            data-lenis-prevent
            className="fixed inset-0 z-[80] flex items-center justify-center bg-noir/92 p-4 backdrop-blur-md sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionTokens.duration.normal }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-5 top-5 z-10 text-sm uppercase tracking-[0.2em] text-bone-dim hover:text-bone"
            >
              Close
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 px-3 py-4 font-display text-4xl text-bone-dim transition-colors hover:text-brass sm:left-8"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 px-3 py-4 font-display text-4xl text-bone-dim transition-colors hover:text-brass sm:right-8"
            >
              ›
            </button>

            <motion.figure
              key={index}
              initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
              className="relative max-h-[85vh] w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative mx-auto aspect-[4/5] max-h-[80vh] w-auto">
                <Photo
                  src={gallery[index].src}
                  alt={gallery[index].alt}
                  fill
                  sizes="(max-width: 768px) 90vw, 768px"
                  className="rounded-[3px] object-contain"
                />
              </div>
              <figcaption className="mt-4 text-center text-sm text-bone-dim">
                {gallery[index].alt}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

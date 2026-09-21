"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Photo } from "@/components/Photo";

type Slide = { src: string; alt: string };

const SLIDE_MS = 5000;

/** Crossfading photo backdrop for a page header. Reduced-motion → static first slide. */
export function HeaderBackdrop({ slides }: { slides: Slide[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || slides.length < 2) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, reduce, slides.length]);

  return (
    <div className="absolute inset-0 z-0">
      {slides.map((s, i) => {
        const active = i === index;
        return (
          <motion.div
            key={s.src}
            aria-hidden={!active}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: active ? 1 : 0,
              scale: reduce ? 1.05 : active ? 1.1 : 1.05,
            }}
            transition={{
              opacity: { duration: 1.3, ease: "easeInOut" },
              scale: { duration: SLIDE_MS / 1000 + 1.3, ease: "linear" },
            }}
          >
            <Photo
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover [object-position:50%_45%]"
            />
          </motion.div>
        );
      })}
    </div>
  );
}

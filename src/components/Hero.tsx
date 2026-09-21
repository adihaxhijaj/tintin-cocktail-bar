"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Photo } from "@/components/Photo";
import { site } from "@/lib/site";
import { motionTokens } from "@/lib/motion-tokens";

const line = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: motionTokens.easing.smooth, delay: 0.15 + i * 0.12 },
  }),
};

// Hero carousel: a drink, the room, the terrace. Each photo has a logo watermark
// high-centre, hidden behind the nav and top scrim.
const slides = [
  {
    src: "/img/oasis-spirit-hi.webp",
    alt: "Oasis, a pale cocktail on a dark marble bar at Tintin.",
    position: "50% 55%",
  },
  {
    src: "/img/room-stories.webp",
    alt: "Tables by the windows at dusk, next to a patio heater.",
    position: "50% 50%",
  },
  {
    src: "/img/evenings-stretch.webp",
    alt: "Amber-lit tables and palms in the evening.",
    position: "50% 50%",
  },
];

const SLIDE_MS = 6000;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [index, setIndex] = useState(0);

  // Auto-advance. Re-arms whenever `index` changes, so a manual pick also
  // resets the timer. Held still when the user prefers reduced motion.
  useEffect(() => {
    if (reduce || slides.length < 2) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, reduce]);

  return (
    <section
      ref={ref}
      className="vignette relative flex min-h-[100svh] items-end overflow-hidden"
      aria-label="Tintin Cocktail Bar"
    >
      {/* Background carousel: slides crossfade, the active one zooms slowly. */}
      <motion.div style={{ y: reduce ? 0 : imgY }} className="absolute inset-0 z-0">
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
                opacity: { duration: 1.4, ease: "easeInOut" },
                scale: { duration: SLIDE_MS / 1000 + 1.4, ease: "linear" },
              }}
            >
              <Photo
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: s.position }}
              />
            </motion.div>
          );
        })}
      </motion.div>
      {/* Scrims keep text legible. The top one also hides each photo's logo watermark. */}
      <div className="absolute inset-x-0 top-0 z-[1] h-36 bg-gradient-to-b from-noir via-noir/70 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-noir via-noir/65 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-noir via-noir/25 to-noir/45" />

      <motion.div
        style={{ opacity: reduce ? 1 : fade }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-40 sm:px-8 sm:pb-28"
      >
        <h1 className="h-hero font-display text-bone">
          <motion.span custom={1} variants={line} initial="hidden" animate="show" className="block">
            Tintin
          </motion.span>
          <motion.span
            custom={2}
            variants={line}
            initial="hidden"
            animate="show"
            className="block"
          >
            Cocktail Bar
          </motion.span>
        </h1>

        <motion.p
          custom={3}
          variants={line}
          initial="hidden"
          animate="show"
          className="lede mt-8 max-w-xl text-xl sm:text-2xl"
        >
          Cocktails, coffee and food in central Prishtina.
        </motion.p>

        <motion.div
          custom={4}
          variants={line}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/visit#reserve"
            className="rounded-full bg-brass px-7 py-3 text-sm font-medium tracking-wide text-noir transition-colors hover:bg-brass-bright"
          >
            Reserve a table
          </Link>
          <Link
            href="/drinks"
            className="rounded-full border border-bone/25 px-7 py-3 text-sm tracking-wide text-bone transition-colors hover:border-bone/60"
          >
            Drinks menu
          </Link>
        </motion.div>

        {/* Slide indicator */}
        <motion.div
          custom={5}
          variants={line}
          initial="hidden"
          animate="show"
          className="mt-12 flex items-center gap-3"
          role="group"
          aria-label="Choose a hero image"
        >
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1} of ${slides.length}`}
              aria-current={i === index}
              className="group py-2"
            >
              <span
                className={`block h-[3px] rounded-full transition-all duration-500 ${
                  i === index
                    ? "w-9 bg-brass"
                    : "w-5 bg-bone/25 group-hover:bg-bone/50"
                }`}
              />
            </button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

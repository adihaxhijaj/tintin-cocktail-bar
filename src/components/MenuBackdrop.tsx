"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

// Ambient floating-photo backdrop for the Drinks / Eats menus. Photo cards live
// only in the side gutters, anchored to the edges of the reading column, so they
// never pass behind menu text; on viewports too narrow for gutters (< xl) the
// backdrop is hidden. Each card sits at its own parallax depth (drifts at a
// different rate on scroll) with a slow idle float. Frozen flat on
// prefers-reduced-motion. Decorative only — aria-hidden, pointer-events-none,
// lazy-loaded.

// Half-width of the menu text column: max-w-5xl (64rem) minus px-8 (2rem × 2).
const COLUMN_HALF = "30rem";

type Slot = { side: "l" | "r"; g: number; t: number; s: number; d: number; r: number };

// side = gutter, g = gap from the text column (px; cards bleed off the viewport
// edge on narrower screens), t = top (%, negative starts above the fold and
// drifts in on scroll), s = width (px), d = parallax depth, r = tilt (deg).
// Gaps stay ≥ 36px so tilted corners clear the text. On-screen tops start at
// ≥ 14% to clear the transparent nav at scroll 0; cards only drift downward,
// and the nav turns solid once scrolled.
const LAYOUT: Slot[] = [
  { side: "l", g: 56, t: 14, s: 210, d: 0.12, r: -5 },
  { side: "r", g: 48, t: 14, s: 190, d: 0.2, r: 6 },
  { side: "r", g: 110, t: 42, s: 215, d: 0.14, r: -4 },
  { side: "l", g: 150, t: 34, s: 150, d: 0.44, r: 7 },
  { side: "l", g: 40, t: 72, s: 200, d: 0.08, r: -3 },
  { side: "r", g: 40, t: 72, s: 180, d: 0.05, r: 5 },
  { side: "l", g: 90, t: -40, s: 170, d: 0.36, r: 6 },
  { side: "r", g: 60, t: -36, s: 200, d: 0.32, r: -5 },
  { side: "l", g: 44, t: -95, s: 195, d: 0.26, r: -6 },
  { side: "r", g: 130, t: -85, s: 165, d: 0.4, r: 8 },
  { side: "r", g: 180, t: 88, s: 150, d: 0.1, r: -7 },
  { side: "l", g: 36, t: -150, s: 185, d: 0.3, r: 4 },
];

export function MenuBackdrop({ images }: { images: string[] }) {
  const reduce = useReducedMotion();
  const [y, setY] = useState(0);

  useEffect(() => {
    if (reduce) return;
    // Matches the xl breakpoint below which the backdrop is display:none.
    const mq = window.matchMedia("(min-width: 80rem)");
    let raf = 0;
    const onScroll = () => {
      if (!mq.matches) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden xl:block"
    >
      {LAYOUT.map((c, i) => {
        const edge = `calc(50% + ${COLUMN_HALF} + ${c.g}px)`;
        return (
          <div
            key={i}
            className="absolute"
            style={{
              ...(c.side === "l" ? { right: edge } : { left: edge }),
              top: `${c.t}%`,
              transform: `translateY(${reduce ? 0 : y * c.d}px)`,
              willChange: "transform",
            }}
          >
            <div
              className={reduce ? undefined : "menu-card-float"}
              style={{ animationDuration: `${18 + i * 2.5}s`, animationDelay: `${-i * 2.3}s` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[i % images.length]}
                alt=""
                loading="lazy"
                decoding="async"
                style={{
                  display: "block",
                  width: c.s,
                  height: c.s * 1.25,
                  objectFit: "cover",
                  borderRadius: 6,
                  border: "1px solid color-mix(in srgb, var(--color-brass) 30%, transparent)",
                  boxShadow: "0 22px 55px -26px rgba(43,33,27,0.35)",
                  opacity: 0.62,
                  transform: `rotate(${c.r}deg)`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

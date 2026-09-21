"use client";

import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/LogoMark";

// Route curtain. On every navigation (and first load) a dark
// panel sweeps up from the bottom to cover the screen, flashes the Tintin crest,
// then keeps sweeping up and off the top to reveal the page — one continuous
// bottom-to-top gesture (see the `curtain-sweep` keyframes in globals.css).
//
// Keyed on `pathname` so React remounts the node each route, restarting the CSS
// animation from its 0% frame. This is deliberately CSS rather than motion/JS:
// motion repeatedly collapsed the opening keyframe, so the rise-to-cover never
// rendered — only the exit did. CSS keyframes always paint the 0% frame.
export function PageTransition() {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      aria-hidden
      className="curtain pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-bone"
    >

      <div className="curtain__crest relative">
        <LogoMark className="h-20 w-auto text-brass sm:h-24" />
      </div>
    </div>
  );
}

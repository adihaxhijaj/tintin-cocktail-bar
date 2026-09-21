"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { frame, cancelFrame, useReducedMotion } from "motion/react";

// Site-wide momentum scrolling (Lenis). Drives Lenis from motion's own RAF loop
// (autoRaf:false) so scroll-linked effects — the hero/parallax useScroll, the
// nav shadow — stay frame-perfect with the lerped scroll position.
// Reduced motion → no Lenis, native scroll. Overlays opt out via
// `data-lenis-prevent` (mobile menu, gallery lightbox).
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (reduce) return;
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }
    frame.update(update, true);
    return () => cancelFrame(update);
  }, [reduce]);

  // Jump to top instantly on route change — hidden behind the page curtain — so
  // Lenis doesn't animate a long scroll-up when a new page mounts.
  useEffect(() => {
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  if (reduce) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
        anchors: { offset: -80, duration: 1.1 },
        autoRaf: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}

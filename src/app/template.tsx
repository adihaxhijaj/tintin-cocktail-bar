"use client";

import { motion, useReducedMotion } from "motion/react";
import { motionTokens } from "@/lib/motion-tokens";

// App Router template — re-mounts on every navigation, so it gives each page a
// fresh enter animation. Eases the incoming page up + in just behind the lifting
// route curtain (see PageTransition) for one continuous reveal.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: motionTokens.distance.md }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: motionTokens.duration.slow,
        ease: motionTokens.easing.smooth,
        delay: reduce ? 0 : 0.18,
      }}
    >
      {children}
    </motion.div>
  );
}

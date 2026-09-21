"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { motionTokens } from "@/lib/motion-tokens";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger children that are themselves <Reveal.Item> or motion children */
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "span" | "header" | "article";
  once?: boolean;
};

/**
 * Scroll reveal. SSR-safe: motion renders the same `initial` on server and
 * client, so no hydration mismatch. Reduced motion → opacity-only, fast.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = motionTokens.distance.lg,
  as = "div",
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y, filter: reduce ? "blur(0px)" : "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount: 0.15 }}
      transition={{
        duration: reduce ? motionTokens.duration.fast : motionTokens.duration.slow,
        ease: motionTokens.easing.smooth,
        delay: reduce ? 0 : delay,
      }}
    >
      {children}
    </MotionTag>
  );
}

/** Container that staggers its direct <StaggerItem> children into view. */
export function Stagger({
  children,
  className,
  gap = 0.09,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  once?: boolean;
}) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: gap } },
  };
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      // `amount: "some"` triggers as soon as any part enters view. A fixed
      // fraction breaks for tall lists (e.g. the menu's 33-item group), where
      // that fraction can never fit in the viewport, so it would never reveal.
      viewport={{ once, amount: "some" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = motionTokens.distance.lg,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? motionTokens.duration.fast : motionTokens.duration.normal,
        ease: motionTokens.easing.smooth,
      },
    },
  };
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

export function SectionHeading({
  title,
  intro,
  align = "left",
  className = "",
}: {
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const center = align === "center";
  return (
    <Reveal
      className={`${center ? "mx-auto max-w-2xl text-center" : "max-w-3xl"} ${className}`}
    >
      <h2 className="h-section font-display text-bone">{title}</h2>
      {intro && (
        <p className="mt-6 max-w-xl text-base leading-relaxed text-bone-dim sm:text-lg">
          {intro}
        </p>
      )}
    </Reveal>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>
  );
}

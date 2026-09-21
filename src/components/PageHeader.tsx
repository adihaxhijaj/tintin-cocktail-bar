import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

export function PageHeader({
  title,
  intro,
  transparent = false,
  narrow = false,
}: {
  title: ReactNode;
  intro?: ReactNode;
  // Drop the solid background + border so an ambient backdrop shows through.
  transparent?: boolean;
  // Match the max-w-5xl menu column (keeps the MenuBackdrop gutters clear).
  narrow?: boolean;
}) {
  return (
    <header
      className={`relative overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-44 ${
        transparent ? "" : "border-b border-bone/8 bg-noir"
      }`}
    >
      <div
        className={`relative mx-auto px-5 sm:px-8 ${narrow ? "max-w-5xl" : "max-w-7xl"}`}
      >
        <Reveal>
          <h1 className="h-section font-display text-bone">{title}</h1>
          {intro && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone-dim">
              {intro}
            </p>
          )}
        </Reveal>
      </div>
    </header>
  );
}

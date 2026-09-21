import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { MenuSections } from "@/components/MenuSections";
import { MenuBackdrop } from "@/components/MenuBackdrop";
import { eatGroups, eatBackdrop, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Eats",
  description:
    "The food menu at Tintin Cocktail Bar in central Prishtina: burgers, sandwiches, pasta, plates to share, and breakfast from 07:00 on weekdays.",
};

export default function EatsPage() {
  return (
    <>
      <MenuBackdrop images={eatBackdrop} />

      <div className="relative z-10">
        <PageHeader
          transparent
          narrow
          title="Eats"
          intro="Burgers, sandwiches and pasta, plates to share, and breakfast from 07:00 on weekdays. Prices are at the bar; most people spend €5–€15."
        />

        <MenuSections groups={eatGroups} />

        {/* Cross-link to the bar + seasonal note */}
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="border-b border-bone/6 py-16 text-center">
            <Link
              href="/drinks"
              className="link-underline font-display text-3xl text-bone transition-colors hover:text-brass sm:text-4xl"
            >
              Drinks menu &rarr;
            </Link>
          </div>
          <p className="py-12 text-center text-xs leading-relaxed text-muted">
            Ask your server what&apos;s on today, or message us on{" "}
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-brass"
            >
              Instagram
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}

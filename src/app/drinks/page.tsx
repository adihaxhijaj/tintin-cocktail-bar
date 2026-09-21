import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { MenuSections } from "@/components/MenuSections";
import { MenuBackdrop } from "@/components/MenuBackdrop";
import { drinkGroups, drinkBackdrop, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Drinks",
  description:
    "The cocktail and coffee menu at Tintin Cocktail Bar in central Prishtina. The cocktail list changes with the seasons.",
};

export default function DrinksPage() {
  return (
    <>
      <MenuBackdrop images={drinkBackdrop} />

      <div className="relative z-10">
        <PageHeader
          transparent
          narrow
          title="Drinks"
          intro="The cocktail list changes with the seasons, so some of these may be off the menu when you visit. Prices are at the bar; most people spend €5–€15."
        />

        <MenuSections groups={drinkGroups} />

        {/* Cross-link to the kitchen + seasonal note */}
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="border-b border-bone/6 py-16 text-center">
            <Link
              href="/eats"
              className="link-underline font-display text-3xl text-bone transition-colors hover:text-brass sm:text-4xl"
            >
              Food menu &rarr;
            </Link>
          </div>
          <p className="py-12 text-center text-xs leading-relaxed text-muted">
            Ask your bartender what&apos;s on tonight, or message us on{" "}
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

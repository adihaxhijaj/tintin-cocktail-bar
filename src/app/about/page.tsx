import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Section";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Story",
  description:
    "About Tintin Cocktail Bar: open since 2021 on Sejdi Kryeziu in central Prishtina, with a seasonal cocktail list and a kitchen that opens for breakfast.",
};

// Sourced from public listings (RestaurantGuru, Tripadvisor, Wanderlog).
// See research/content.md.
const details = [
  { term: "Seating", desc: "Inside, and on a glass-roofed terrace" },
  { term: "Smoking", desc: "Non-smoking inside" },
  { term: "Access", desc: "Wheelchair accessible" },
  { term: "Parking", desc: "Free street parking nearby" },
  { term: "Payment", desc: "Cards accepted" },
  { term: "Pets & kids", desc: "Both welcome" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="The stories that we live and tell." />

      <article className="bg-ink">
        {/* Opening statement */}
        <section className="py-20 sm:py-28">
          <Container>
            <Reveal className="max-w-4xl">
              <p className="font-display text-3xl font-light leading-[1.3] text-bone sm:text-4xl md:text-[2.6rem]">
                Tintin opened in 2021 at Sejdi Kryeziu 6, near the Mother Teresa
                Cathedral. It&apos;s a café in the morning and a cocktail bar at
                night, with one kitchen serving both.
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Image + narrative */}
        <section className="pb-20 sm:pb-28">
          <Container>
            <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
              <Reveal className="md:col-span-6">
                <Parallax amount={40} className="overflow-hidden rounded-[3px]">
                  <div className="relative aspect-[4/5] w-full">
                    <Photo
                      src="/img/quiet-corner.webp"
                      alt="The terrace at Tintin, with a patio heater and palms."
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </Parallax>
              </Reveal>

              <div className="space-y-6 text-base leading-relaxed text-bone-dim md:col-span-6">
                <Reveal>
                  <h2 className="font-display text-3xl text-bone">The bar</h2>
                </Reveal>
                <Reveal delay={0.08}>
                  <p>
                    Inside there are rattan chairs, marble tables, a long mustard
                    banquette and local art on the walls. There&apos;s also a
                    glass-roofed terrace with palms and patio heaters.
                  </p>
                </Reveal>
                <Reveal delay={0.12}>
                  <p>
                    The cocktail list changes with the seasons. House drinks like{" "}
                    <span className="text-bone">Blood on the Leaves</span>,{" "}
                    <span className="text-bone">The Forager</span> and{" "}
                    <span className="text-bone">Tea Time, Reworked</span> sit next
                    to classics like the Penicillin and the Pisco Sour, plus a
                    handful of Negroni variations.
                  </p>
                </Reveal>
                <Reveal delay={0.16}>
                  <p>
                    If you can&apos;t decide, ask the bartender. Mendim comes up by
                    name in a lot of our reviews.
                  </p>
                </Reveal>
              </div>
            </div>
          </Container>
        </section>

        {/* Practical details */}
        <section className="border-t border-bone/10 py-20 sm:py-28">
          <Container>
            <Reveal>
              <h2 className="font-display text-3xl text-bone">Good to know</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <dl className="mt-10 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
                {details.map((d) => (
                  <div
                    key={d.term}
                    className="flex items-baseline justify-between gap-6 border-b border-bone/10 py-4"
                  >
                    <dt className="text-sm text-muted">{d.term}</dt>
                    <dd className="text-right text-sm text-bone">{d.desc}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal className="mt-14">
              <p className="text-sm text-bone-dim">
                We post new drinks and dishes on{" "}
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-brass"
                >
                  {site.instagramHandle}
                </a>
                . Directions and hours are on the{" "}
                <Link href="/visit" className="link-underline text-brass">
                  visit page
                </Link>
                .
              </p>
            </Reveal>
          </Container>
        </section>
      </article>
    </>
  );
}

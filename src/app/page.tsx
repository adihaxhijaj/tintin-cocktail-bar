import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Photo } from "@/components/Photo";
import { Marquee } from "@/components/Marquee";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Container, SectionHeading } from "@/components/Section";
import {
  allDay,
  hours,
  site,
  gallery,
  drinkBackdrop,
  eatBackdrop,
  ambianceBackdrop,
} from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ── About ───────────────────────────────────────── */}
      <section className="relative bg-noir py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-7">
              <p className="font-display text-3xl font-light leading-[1.25] text-bone sm:text-4xl md:text-[2.6rem]">
                Tintin is a cocktail bar and kitchen on Sejdi Kryeziu, near the
                Mother Teresa Cathedral. On weekdays we open at 07:00 for coffee
                and pancakes and stay open until 23:30.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="md:col-span-5 md:pt-3">
              <div className="space-y-6 text-base leading-relaxed text-bone-dim">
                <p>
                  The cocktail list changes with the seasons. Right now it
                  includes Blood on the Leaves (aged rum, strawberry, basil, black
                  pepper), a Truffle Negroni, and The Forager, a whisky sour made
                  with porcini and truffle.
                </p>
                <p>
                  The kitchen does burgers, fried chicken sandwiches, pasta and
                  plates to share. Most people spend{" "}
                  {site.priceBand.replace(" per person", "")}.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Drinks · Eats · Room carousels ──────────────── */}
      <section
        className="relative overflow-hidden bg-ink py-24 sm:py-32"
        aria-labelledby="taste-title"
      >
        <Container>
          <SectionHeading title={<span id="taste-title">Drinks, food and the room</span>} />
        </Container>

        <div className="mt-12 space-y-10 sm:mt-16 sm:space-y-14">
          {[
            { label: "Drinks", link: "Drinks menu", href: "/drinks#cocktails", images: drinkBackdrop, direction: "left" as const, speed: 64 },
            { label: "Eats", link: "Food menu", href: "/eats", images: eatBackdrop, direction: "right" as const, speed: 52 },
            { label: "The room", link: "All photos", href: "/gallery", images: ambianceBackdrop, direction: "left" as const, speed: 76 },
          ].map((row) => (
            <Reveal key={row.label}>
              <Container>
                <div className="mb-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl text-bone sm:text-3xl">{row.label}</h3>
                  <Link
                    href={row.href}
                    className="link-underline text-sm tracking-wide text-brass"
                  >
                    {row.link}
                  </Link>
                </div>
              </Container>
              <Marquee
                images={row.images}
                direction={row.direction}
                speed={row.speed}
                label={row.label}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Breakfast band ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-noir py-24 sm:py-28">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
            <Reveal>
              <h2 className="h-section font-display text-bone">Breakfast from 07:00</h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-bone-dim">
                Espresso, pancakes and crêpes Suzette on weekday mornings. On
                Sundays there&apos;s French toast finished like a tiramisu, and a
                bagel with egg, cheese and bacon.
              </p>
              <Link
                href="/eats#all-day"
                className="link-underline mt-7 inline-block text-sm tracking-wide text-brass"
              >
                Breakfast menu
              </Link>
            </Reveal>
            <Stagger className="grid grid-cols-2 gap-4">
              {allDay
                .filter((d) => d.img)
                .slice(0, 4)
                .map((d) => (
                  <StaggerItem key={d.slug}>
                    <figure className="group relative aspect-square overflow-hidden rounded-[3px]">
                      <Photo
                        src={d.img!}
                        alt={d.alt!}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-noir/90 px-3 py-2 text-xs text-bone">
                        {d.name}
                      </figcaption>
                    </figure>
                  </StaggerItem>
                ))}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* ── Gallery teaser ──────────────────────────────── */}
      <section className="relative bg-ink py-24 sm:py-32" aria-labelledby="atmosphere-title">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading title={<span id="atmosphere-title">Inside Tintin</span>} />
            <Reveal>
              <Link
                href="/gallery"
                className="rounded-full border border-bone/20 px-6 py-2.5 text-sm text-bone transition-colors hover:border-brass hover:text-brass"
              >
                See all photos
              </Link>
            </Reveal>
          </div>

          <Stagger className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
            {gallery.slice(2, 7).map((g, i) => (
              <StaggerItem
                key={g.src}
                className={i === 0 ? "col-span-2 row-span-2" : ""}
              >
                <figure
                  className={`group relative h-full overflow-hidden rounded-[3px] ${i === 0 ? "aspect-square md:aspect-auto" : "aspect-square"}`}
                >
                  <Photo
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ── Reserve CTA ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-noir py-24 sm:py-32">
        <Container className="relative text-center">
          <Reveal>
            <h2 className="h-section mx-auto max-w-3xl font-display text-bone">
              Book a table
            </h2>
            <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-5">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/visit#reserve"
                  className="rounded-full bg-brass px-7 py-3 text-sm font-medium tracking-wide text-noir transition-colors hover:bg-brass-bright"
                >
                  Reserve online
                </Link>
                <a
                  href={site.phoneHref}
                  className="rounded-full border border-bone/25 px-7 py-3 text-sm tracking-wide text-bone transition-colors hover:border-bone/60"
                >
                  Call {site.phone}
                </a>
              </div>
              <ul className="mt-4 space-y-1 text-sm text-muted">
                {hours.map((h) => (
                  <li key={h.day} className="flex justify-center gap-3">
                    <span>{h.day}</span>
                    <span className="text-bone-dim">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

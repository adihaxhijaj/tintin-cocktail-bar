import type { Metadata } from "next";
import { Container } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { HeaderBackdrop } from "@/components/HeaderBackdrop";
import { ReserveForm } from "@/components/ReserveForm";
import { hours, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Tintin Cocktail Bar is at Sejdi Kryeziu 6, Prishtina, near the Mother Teresa Cathedral. Opening hours, map, contact details and reservations.",
};

// Photos of the room, day and night. Crossfading backdrop behind the visit hero.
const placePhotos = [
  {
    src: "/img/candlelight.webp",
    alt: "Wall lamps over a mustard banquette in the evening.",
  },
  {
    src: "/img/warm-sunshine.webp",
    alt: "The glass-roofed terrace in afternoon sun.",
  },
  {
    src: "/img/room-stories.webp",
    alt: "Tables by the windows at dusk, next to a patio heater.",
  },
  {
    src: "/img/heart-of-city.webp",
    alt: "The Tintin Cocktail Bar sign behind greenery.",
  },
];

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  site.mapsQuery,
)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.mapsQuery,
)}`;

export default function VisitPage() {
  return (
    <>
      {/* Hero: address, hours and contact over photos of the room */}
      <section className="relative flex min-h-[92vh] flex-col justify-end overflow-hidden border-b border-bone/8 bg-noir pb-16 pt-40 sm:pb-20">
        <HeaderBackdrop slides={placePhotos} />
        {/* Scrims keep text legible over the photos */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-noir via-noir/80 to-noir/40" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-noir via-noir/60 to-noir/30" />

        <Container className="relative z-10">
          <Reveal>
            <h1 className="h-section font-display text-bone">Visit</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone-dim">
              {site.landmark}
            </p>
          </Reveal>

          <Reveal
            delay={0.1}
            className="mt-12 grid gap-10 border-t border-bone/12 pt-10 sm:mt-16 sm:grid-cols-3 sm:gap-8"
          >
            {/* Address */}
            <div>
              <h2 className="eyebrow mb-4">Address</h2>
              <address className="not-italic">
                <p className="font-display text-xl leading-snug text-bone">
                  Sejdi Kryeziu 6
                  <br />
                  Prishtina 10000, Kosovo
                </p>
              </address>
              <a
                href={directions}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-3 inline-block text-sm tracking-wide text-brass"
              >
                Get directions
              </a>
            </div>

            {/* Hours */}
            <div>
              <h2 className="eyebrow mb-4">Hours</h2>
              <ul className="space-y-2.5 text-sm">
                {hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex items-baseline justify-between gap-5 border-b border-bone/10 pb-2.5"
                  >
                    <span className="text-bone">{h.day}</span>
                    <span className="text-bone-dim">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h2 className="eyebrow mb-4">Contact</h2>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href={site.phoneHref} className="link-underline text-bone hover:text-brass">
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="link-underline text-bone hover:text-brass"
                  >
                    {site.email}
                  </a>
                </li>
                <li className="flex gap-4 pt-1">
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-brass hover:text-brass-bright"
                  >
                    Instagram
                  </a>
                  <a
                    href={site.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-brass hover:text-brass-bright"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="bg-ink">
        {/* Map */}
        <Container>
          <div className="py-16 sm:py-20">
            <Reveal>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[3px] border border-bone/10 sm:aspect-[16/7]">
                <iframe
                  title="Map showing Tintin Cocktail Bar, Sejdi Kryeziu 6, Prishtina"
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full grayscale-[0.35] contrast-[1.05] [filter:invert(0.9)_hue-rotate(180deg)]"
                />
              </div>
            </Reveal>
          </div>
        </Container>

        {/* Reserve */}
        <section
          id="reserve"
          className="relative scroll-mt-24 overflow-hidden border-t border-bone/8 bg-noir py-24 sm:py-32"
        >
          <Container className="relative">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-4xl font-light leading-tight text-bone sm:text-6xl">
                Book a table
              </h2>
              <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-bone-dim">
                Choose a date, a time, and whether you&apos;d like to sit inside or
                outside. Your request goes to the bar on WhatsApp and we confirm
                it there.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-12 sm:mt-16">
              <ReserveForm />
            </Reveal>

            <Reveal delay={0.15} className="mx-auto mt-10 max-w-md text-center">
              <p className="text-xs text-muted">
                Prefer to call?{" "}
                <a href={site.phoneHref} className="link-underline text-brass">
                  {site.phone}
                </a>{" "}
                ·{" "}
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(
                    "Reservation at Tintin",
                  )}`}
                  className="link-underline text-brass"
                >
                  Email a request
                </a>
              </p>
            </Reveal>
          </Container>
        </section>
      </div>
    </>
  );
}

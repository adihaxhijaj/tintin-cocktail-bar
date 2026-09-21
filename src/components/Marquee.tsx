import { Photo } from "@/components/Photo";

interface MarqueeProps {
  images: string[]; // /img/<name>.webp
  direction?: "left" | "right";
  speed?: number; // seconds for one full loop — higher = slower
  label: string; // accessible group label, e.g. "Drinks"
}

// A pure-CSS infinite image carousel. The track holds two identical copies of
// the images and slides by -50%, so the loop is seamless and needs no JS. The
// `data-direction` attribute flips it via CSS. Hover pauses; reduced-motion
// freezes it (handled globally in globals.css).
export function Marquee({ images, direction = "left", speed = 60, label }: MarqueeProps) {
  const loop = [...images, ...images];

  return (
    <div
      className="marquee"
      data-direction={direction}
      role="group"
      aria-label={`${label}: scrolling images`}
    >
      <ul className="marquee__track" style={{ ["--marquee-duration" as string]: `${speed}s` }}>
        {loop.map((src, i) => (
          <li key={`${src}-${i}`} className="marquee__item" aria-hidden="true">
            <Photo
              src={src}
              alt=""
              fill
              sizes="(max-width: 768px) 45vw, 22vw"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

import Link from "next/link";
import { hours, nav, site } from "@/lib/site";
import { LogoMark } from "@/components/LogoMark";

export function Footer() {
  return (
    <footer className="relative border-t border-bone/10 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="group flex items-center gap-3 text-bone"
              aria-label="Tintin Cocktail Bar, home"
            >
              <LogoMark className="h-9 w-auto text-brass transition-colors group-hover:text-brass-bright" />
              <span className="font-display text-4xl tracking-tight">Tintin</span>
            </Link>
            <p className="lede mt-4 max-w-xs text-lg">{site.tagline}</p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="eyebrow mb-5">Pages</h2>
            <ul className="space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-sm text-bone-dim transition-colors hover:text-bone"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit */}
          <div className="md:col-span-4">
            <h2 className="eyebrow mb-5">Contact</h2>
            <address className="space-y-3 text-sm not-italic text-bone-dim">
              <p className="leading-relaxed">{site.address}</p>
              <p>
                <a href={site.phoneHref} className="link-underline hover:text-bone">
                  {site.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="link-underline hover:text-bone">
                  {site.email}
                </a>
              </p>
            </address>
            <ul className="mt-5 space-y-1.5 text-sm text-muted">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-6">
                  <span>{h.day}</span>
                  <span className="text-bone-dim">{h.time}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-4 text-sm">
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
            </div>
          </div>
        </div>

        <div className="mt-14 h-px w-full bg-bone/10" />
        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Tintin Cocktail Bar · Prishtina, Kosovo</p>
          <p>
            Rated {site.rating} on {site.ratingSource} · {site.priceBand}
          </p>
        </div>
      </div>
    </footer>
  );
}

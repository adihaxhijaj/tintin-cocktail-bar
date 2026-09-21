# Tintin Cocktail Bar — Website

A cinematic, fine-dining marketing site for **Tintin Cocktail Bar**, Prishtina, Kosovo
(Instagram [@tintin.cocktailbar](https://www.instagram.com/tintin.cocktailbar/)).

Dark, candlelit, editorial. Built around the bar's real tagline — *"the stories that we live and tell."*

## Run it locally

Requires Node 18.18+ (Node 20+ recommended).

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

For a production build:

```bash
npm run build
npm start
```

To regenerate optimized images from the originals in `assets/sourced/`:

```bash
npm run optimize:images
```

## Tech

- **Next.js (App Router) + TypeScript** — SEO, routing, `next/image` optimization.
- **Tailwind CSS v4** — design system via CSS variables (palette + type scale in `src/app/globals.css`).
- **motion/react** (Framer Motion) — staggered hero load, scroll reveals, subtle parallax, gallery lightbox. All motion respects `prefers-reduced-motion` and is transform/opacity-only.
- No 3D / WebGL: a CSS candlelight-glow + film-grain treatment delivers the atmosphere without the load cost (deliberate performance choice).

## Pages

| Route | Contents |
|-------|----------|
| `/` | Cinematic hero, brand statement, three signature "stories", all-day band, gallery teaser, reserve CTA |
| `/drinks` | Signature cocktails + coffee — grouped, with real descriptions |
| `/eats` | Kitchen, share plates, and all-day/sweet — grouped, with real descriptions |
| `/menu` | Permanent redirect → `/drinks` (keeps old links/QRs alive) |
| `/about` | The story, atmosphere, values |
| `/gallery` | Curated photos with an accessible lightbox |
| `/visit` | Address, embedded map, hours, contact, reservation CTAs |

Shared `Nav` (scroll-aware, mobile overlay) and `Footer` across all pages.

## Content & sourcing

All content is **researched, not invented**. See:

- [`research/content.md`](research/content.md) — every fact with its source URL.
- [`research/images.md`](research/images.md) — image sources + alt text.
- [`research/design-references.md`](research/design-references.md) — references studied and the chosen direction.
- [`research/gaps.md`](research/gaps.md) — anything unverified, marked as a placeholder.

The menu, gallery and copy are built from the venue's own Instagram dataset
(`tintin-dataset.json`, 240 posts) — see [`scripts/fetch-ig.mjs`](scripts/fetch-ig.mjs)
for the post→image mapping. Founding year (**2021**) and the venue's own interior
photography are now sourced from that dataset. The one remaining placeholder is
exact per-item **prices** (not published online — omitted, real price band shown
instead). See `gaps.md`.

## Image credits & licensing

All **70 photographs are the venue's own**, sourced from the public Instagram
[@tintin.cocktailbar](https://www.instagram.com/tintin.cocktailbar/) (15 from the
logged-out grid + 55 from the full post dataset).
Originals: `assets/sourced/`. Optimized WebP: `assets/img/` and `public/img/`.
Full per-image source list: [`research/images.md`](research/images.md).

> **Before going live:** confirm the owner authorizes publishing these photos
> (© Tintin Cocktail Bar), and ideally swap in full-resolution originals plus
> dedicated interior/exterior/team photography. No stock or AI imagery is used.

Fonts: **Cormorant Garamond** + **Outfit** via `next/font` (Google Fonts, OFL).
Map: keyless Google Maps embed.

## Project structure

```
assets/sourced/      original venue photos
assets/img/          optimized WebP copies
public/img/          optimized WebP served by the app
research/            content.md · images.md · design-references.md · gaps.md
scripts/             fetch-ig.mjs (dataset → photos) · optimize-images.mjs
src/app/             routes (home, menu, about, gallery, visit) + layout + globals.css
src/components/      Nav · Footer · Hero · Reveal · Parallax · Photo · GalleryGrid · …
src/lib/             site.ts (content) · motion-tokens.ts · blur.ts (generated)
```

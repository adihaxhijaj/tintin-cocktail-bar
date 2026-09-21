"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { nav, site } from "@/lib/site";
import { motionTokens, springs } from "@/lib/motion-tokens";
import { LogoMark } from "@/components/LogoMark";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + Esc-to-close when the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close on route change.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-noir/85 py-3 backdrop-blur-md shadow-[0_1px_0_rgba(154,112,34,0.2)]"
          : "bg-transparent py-5"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="Tintin Cocktail Bar, home"
        >
          <LogoMark className="h-7 w-auto text-brass transition-colors group-hover:text-brass-bright" />
          <span className="font-display text-2xl tracking-tight text-bone transition-colors group-hover:text-brass-bright">
            Tintin
          </span>
          <span className="hidden text-[0.6rem] uppercase tracking-[0.3em] text-muted sm:inline">
            Prishtina
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 md:flex">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`link-underline text-sm tracking-wide transition-colors ${
                    active ? "text-brass" : "text-bone-dim hover:text-bone"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/visit#reserve"
              className="rounded-full border border-brass/40 px-5 py-2 text-sm text-brass transition-colors hover:border-brass hover:bg-brass hover:text-noir"
            >
              Reserve
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <div className="flex flex-col items-end gap-[5px]">
            <span
              className={`h-px bg-bone transition-all duration-300 ${open ? "w-6 translate-y-[6px] rotate-45" : "w-6"}`}
            />
            <span
              className={`h-px bg-bone transition-all duration-300 ${open ? "opacity-0" : "w-4"}`}
            />
            <span
              className={`h-px bg-bone transition-all duration-300 ${open ? "w-6 -translate-y-[6px] -rotate-45" : "w-5"}`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            className="fixed inset-0 z-40 flex flex-col bg-noir px-6 pb-12 pt-28 md:hidden"
            initial={reduce ? { opacity: 0 } : { y: "-100%" }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: "-100%" }}
            transition={{
              duration: motionTokens.duration.slow,
              ease: motionTokens.easing.smooth,
            }}
          >
            <ul className="relative flex flex-col gap-1">
              {nav.map((item, i) => {
                const active = isActive(item.href);
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: reduce ? 0 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...springs.gentle, delay: reduce ? 0 : 0.05 + i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      className={`block border-b border-bone/10 py-5 font-display text-4xl ${active ? "text-brass" : "text-bone"}`}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
            <div className="relative mt-auto space-y-2 text-sm text-bone-dim">
              <a href={site.phoneHref} className="block link-underline w-fit">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="block link-underline w-fit">
                {site.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import Link from "next/link";
import { Container } from "@/components/Section";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-noir">
      <Container className="relative text-center">
        <h1 className="font-display text-6xl font-light text-bone sm:text-8xl">
          Page not found
        </h1>
        <p className="mx-auto mt-6 max-w-md text-bone-dim">
          This page doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-9 inline-block rounded-full bg-brass px-7 py-3 text-sm font-medium tracking-wide text-noir transition-colors hover:bg-brass-bright"
        >
          Go to the home page
        </Link>
      </Container>
    </section>
  );
}

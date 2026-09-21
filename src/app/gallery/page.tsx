import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Section";
import { GalleryGrid } from "@/components/GalleryGrid";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos of the cocktails, food and rooms at Tintin Cocktail Bar in central Prishtina.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title="Gallery"
        intro="All photos taken at Tintin. There are more on our Instagram."
      />
      <div className="bg-ink py-16 sm:py-20">
        <Container>
          <GalleryGrid />
          <p className="mt-12 text-center text-xs text-muted">
            All photography © Tintin Cocktail Bar ·{" "}
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-brass"
            >
              {site.instagramHandle}
            </a>
          </p>
        </Container>
      </div>
    </>
  );
}

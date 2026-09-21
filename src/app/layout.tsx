import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/lib/site";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tintin.example"),
  title: {
    default: "Tintin Cocktail Bar, Prishtina",
    template: "%s · Tintin Cocktail Bar",
  },
  description:
    "Cocktail bar and kitchen at Sejdi Kryeziu 6, Prishtina, near the Mother Teresa Cathedral. Seasonal cocktails, burgers and sandwiches, and breakfast from 07:00 on weekdays.",
  keywords: [
    "Tintin",
    "cocktail bar",
    "Prishtina",
    "Pristina",
    "Kosovo",
    "cocktails",
    "bar",
    "brunch",
  ],
  openGraph: {
    title: "Tintin Cocktail Bar, Prishtina",
    description:
      "Cocktail bar and kitchen in central Prishtina. Breakfast from 07:00 on weekdays.",
    type: "website",
    locale: "en_GB",
    siteName: "Tintin Cocktail Bar",
    images: [{ url: "/img/blood-on-the-leaves-hero.webp", width: 1600, height: 2000, alt: "Blood on the Leaves, a rum cocktail at Tintin" }],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#080605",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: site.fullName,
    description: metadata.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sejdi Kryeziu 6",
      addressLocality: "Prishtina",
      postalCode: "10000",
      addressCountry: "XK",
    },
    telephone: site.phone,
    email: site.email,
    foundingDate: "2021",
    servesCuisine: ["Cocktails", "Brunch", "Burgers"],
    priceRange: "€€",
    sameAs: [site.instagram, site.facebook],
    openingHours: ["Mo-Fr 07:00-23:30", "Sa 16:00-23:30", "Su 10:00-18:00"],
  };

  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brass focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:text-noir"
        >
          Skip to content
        </a>
        <PageTransition />
        <SmoothScroll>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

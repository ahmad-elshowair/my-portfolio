import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { geistSans, inika } from "@/lib/fonts";
import {
  AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/site";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${SITE_TITLE} — ${SITE_URL}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      {
        url: "/images/logo.1.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/logo.1.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: {
      url: "/images/logo.1.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR.name,
  jobTitle: AUTHOR.role,
  url: SITE_URL,
  email: `mailto:${AUTHOR.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: AUTHOR.location.city,
    addressCountry: AUTHOR.location.country,
  },
  sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${inika.variable} antialiased bg-bgGreen text-beige font-sans`}
      >
        {/* First focusable element — keyboard users skip the navigation */}
        <a
          href="#me"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-bgGreen focus:px-4 focus:py-2 focus:text-beige"
        >
          Skip to main content
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

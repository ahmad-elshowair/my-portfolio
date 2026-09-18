import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { geistMono, geistSans, inika } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ahmad Elshowair | Full-Stack Developer",
  description:
    "Full-Stack Developer with expertise in React, Next.js, Node.js, and TypeScript. Harvard CS50 graduate building modern, responsive web applications.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${inika.variable} ${geistMono.variable} antialiased `}
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

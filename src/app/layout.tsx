import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Ahmad Elshowair | Full-Stack Developer",
	description:
		"Full-Stack Developer with expertise in React, Next.js, Node.js, and TypeScript. Harvard CS50 graduate building modern, responsive web applications.",
	manifest: "/site.webmanifest",
	icons: {
		icon: [
			{
				url: "https://ioytezgkjmzpfcwaxqcj.supabase.co/storage/v1/object/public/portfolio/logos/2.png",
				sizes: "32x32",
				type: "image/png",
			},
			{
				url: "https://ioytezgkjmzpfcwaxqcj.supabase.co/storage/v1/object/public/portfolio/logos/2.png",
				sizes: "16x16",
				type: "image/png",
			},
		],
		apple: {
			url: "https://ioytezgkjmzpfcwaxqcj.supabase.co/storage/v1/object/public/portfolio/logos/2.png",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

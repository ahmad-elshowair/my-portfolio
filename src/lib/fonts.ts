import { Geist, Inika } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const inika = Inika({
  variable: "--font-inika",
  subsets: ["latin"],
  weight: ["400", "700"],
});

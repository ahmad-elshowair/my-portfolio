"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const NAV_SECTIONS = [
  { label: "Me", id: "me" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-bgGreen/75 backdrop-blur-lg border-b border-beige/10"
            : "bg-bgGreen backdrop-blur-none border-b border-transparent",
        )}
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href={"/"}>
              <Image
                src="/images/logo.2.png"
                width={64}
                height={64}
                alt="Ahmad Elshowair — home"
                className="transition-transform duration-200 ease-in-out hover:scale-105"
              />
            </Link>

            {/* Desktop navigation */}
            <ul className="hidden items-center gap-8 md:flex">
              {NAV_SECTIONS.map(({ label, id }) => (
                <li key={id}>
                  <Link
                    href={`#${id}`}
                    className="text-base text-beige transition-colors duration-200 ease-in-out hover:text-mainGreen"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="relative z-50 h-16 w-16 p-2 text-mainGreen hover:text-beige md:hidden"
            >
              <div className="relative h-full w-full">
                <FiMenu
                  className={cn(
                    "absolute inset-0 h-full w-full transition-all duration-200 ease-in-out",
                    isOpen
                      ? "opacity-0 translate-y-full"
                      : "opacity-100 translate-y-0",
                  )}
                />

                <FiX
                  className={cn(
                    "absolute inset-0 h-full w-full transition-all duration-200 ease-in-out",
                    isOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-full",
                  )}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu overlay — instant state change under reduced motion.
            The shell clips the translated panel so the closed menu cannot
            extend the page's scrollable region. */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden md:hidden">
          <div
            className={cn(
              "pointer-events-auto absolute inset-y-0 right-0 h-full w-full transform bg-bgGreen/95 backdrop-blur",
              prefersReducedMotion ||
                "transition-[transform,visibility] duration-200 ease-in-out",
              isOpen ? "visible translate-x-0" : "invisible translate-x-full",
            )}
          >
            <ul className="flex flex-col items-center justify-center h-full space-y-12 pt-20">
              {NAV_SECTIONS.map(({ label, id }) => (
                <li
                  key={id}
                  className="transform transition-all duration-200 ease-in-out relative group hover:scale-105"
                >
                  {/* Left Bracket */}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 pr-6 transition-all duration-200 ease-in-out opacity-0 -translate-x-10 group-hover:translate-x-0 group-hover:opacity-100">
                    <span className="text-5xl font-light text-beige">&lt;</span>
                  </div>

                  <Link
                    href={`#${id}`}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl text-beige transition-colors duration-200 ease-in-out hover:text-mainGreen block px-4"
                  >
                    {label}
                  </Link>

                  {/* Right Bracket */}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 pl-6 transition-all duration-200 ease-in-out opacity-0 translate-x-10 group-hover:translate-x-0 group-hover:opacity-100">
                    <span className="text-5xl font-light text-beige">/&gt;</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Prevent scrolling when menu is open */}
      <style jsx global>{`
        body {
          overflow: ${isOpen ? "hidden" : "auto"};
        }
      `}</style>
    </>
  );
};

export default Navbar;

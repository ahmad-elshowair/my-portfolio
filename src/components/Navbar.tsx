"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const NAV_SECTIONS = [
  { label: "Me", id: "me" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("me");
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Offset for detecting the active section in view
      const scrollPosition = window.scrollY + 180;
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80;

      if (isBottom) {
        setActiveSection("contact");
        return;
      }

      for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(NAV_SECTIONS[i].id);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(NAV_SECTIONS[i].id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuToggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !menuPanelRef.current) return;

      const focusables = menuPanelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <header className="sticky top-4 sm:top-5 z-50 w-full px-4 sm:px-6 pointer-events-none">
      {/* Floating Island Capsule */}
      <nav
        aria-label="Primary navigation"
        className="pointer-events-auto relative mx-auto flex max-w-5xl items-center justify-between rounded-full bg-bgGreen/70 px-4 sm:px-6 md:px-8 py-2.5 md:py-3.5 shadow-sm shadow-black/40 backdrop-blur-3xl transition-all duration-300"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center pl-1 sm:pl-2 transition-transform duration-200 ease-in-out hover:scale-105"
        >
          <Image
            src="/images/logo.2.png"
            width={48}
            height={48}
            alt="Ahmad Elshowair — home"
            priority
            className="w-10 h-10 md:w-12 md:h-12"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden items-center gap-2 md:flex">
          {NAV_SECTIONS.map(({ label, id }) => {
            const isActive = activeSection === id;
            return (
              <li key={id}>
                <Link
                  href={`#${id}`}
                  onClick={() => setActiveSection(id)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative px-5 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-200 ease-in-out",
                    isActive
                      ? "bg-mainGreen text-bgGreen font-semibold shadow-[0_0_18px_rgba(141,165,91,0.45)] scale-105"
                      : "text-beige/85 hover:text-beige hover:bg-beige/10",
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Toggle Button */}
        <button
          ref={menuToggleRef}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full  bg-beige/5 text-mainGreen transition-all hover:bg-beige/10 hover:text-beige active:scale-95 md:hidden"
        >
          {isOpen ? (
            <FiX className="h-5 w-5" aria-hidden="true" />
          ) : (
            <FiMenu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Modern Mobile Glass Dropdown Menu */}
      {isOpen && (
        <div
          ref={menuPanelRef}
          className="pointer-events-auto absolute left-4 right-4 top-full mt-2 mx-auto max-w-4xl rounded-3xl bg-bgGreen/70 p-4 shadow-sm shadow-black/40 backdrop-blur-3xl md:hidden transition-all duration-200"
        >
          <ul className="flex flex-col gap-1.5">
            {NAV_SECTIONS.map(({ label, id }) => {
              const isActive = activeSection === id;
              return (
                <li key={id}>
                  <Link
                    href={`#${id}`}
                    onClick={() => {
                      setActiveSection(id);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-4 py-3 text-base transition-all duration-200",
                      isActive
                        ? "bg-mainGreen/20 text-mainGreen font-semibold border border-mainGreen/30"
                        : "text-beige hover:bg-beige/5 hover:text-mainGreen",
                    )}
                  >
                    <span>{label}</span>
                    {isActive && (
                      <span
                        className="h-2 w-2 rounded-full bg-mainGreen"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Quick Actions in Mobile Drawer */}
          <div className="mt-3 flex flex-col gap-2 border-t border-beige/10 pt-3">
            <a
              href="/files/ahmad_elshowair_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-mainGreen py-2.5 text-sm font-semibold text-bgGreen transition-all hover:brightness-95 active:scale-95"
            >
              Download Resume (PDF)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

"use client";

import {
  useActiveSection,
  useMenuFocusTrap,
  usePrefersReducedMotion,
} from "@/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { DesktopNav } from "./DesktopNav";
import { MobileNavMenu } from "./MobileNavMenu";
import { MobileNavToggle } from "./MobileNavToggle";
import { NAV_SECTIONS } from "./navbar.constants";

/**
 * Primary navigation bar with floating island capsule, desktop links,
 * and accessible animated mobile dropdown menu.
 */
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useActiveSection(NAV_SECTIONS, "me");
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useMenuFocusTrap({
    isOpen,
    onClose: () => setIsOpen(false),
    panelRef: menuPanelRef,
    toggleRef: menuToggleRef,
  });

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
            width={50}
            height={28}
            alt="Ahmad Elshowair — home"
            priority
            className="h-10 w-auto md:h-12"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <DesktopNav
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />

        {/* Mobile Menu Toggle Button */}
        <MobileNavToggle
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          toggleRef={menuToggleRef}
          prefersReducedMotion={prefersReducedMotion}
        />
      </nav>

      {/* Modern Mobile Glass Dropdown Menu */}
      <MobileNavMenu
        isOpen={isOpen}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        onClose={() => setIsOpen(false)}
        panelRef={menuPanelRef}
        prefersReducedMotion={prefersReducedMotion}
      />
    </header>
  );
}

export default Navbar;

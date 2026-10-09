"use client";

import { usePrefersReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Iconify from "@/components/iconify";
import { CONCEPT_ICONS, CONCEPT_ORDER } from "./switcher.constants";
import type { ConceptItem, ConceptSwitcherProps } from "./switcher.types";
import { DesktopSwitcherTrack } from "./DesktopSwitcherTrack";
import { MobileSwitcherRail } from "./MobileSwitcherRail";
import { CONCEPT_REGISTRY } from "../registry";

export function ConceptSwitcher({
  active,
  onSelect,
  concepts,
  className,
}: ConceptSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const activeDescriptor = CONCEPT_REGISTRY[active];
  const ActiveIcon = CONCEPT_ICONS[active] || "lucide:x";

  // Build the 8 ordered concept items
  const conceptItems: ConceptItem[] = useMemo(() => {
    return CONCEPT_ORDER.map((id) => {
      const desc = CONCEPT_REGISTRY[id] ||
        concepts?.find((c) => c.id === id) || {
          id,
          label: id,
          blurb: "",
        };

      return {
        id,
        label: desc.label,
        blurb: desc.blurb,
        icon: CONCEPT_ICONS[id],
      };
    });
  }, [concepts]);

  // Click outside and escape key dismissal
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (id: typeof active) => {
    onSelect(id);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-flex items-center", className)}
    >
      {/* ========================================================= */}
      {/* DESKTOP VIEW (sm: and up)                                 */}
      {/* Spreads to the left on click, and on hover expands label  */}
      {/* ========================================================= */}
      <div className="hidden sm:flex items-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Normal Default Closed Pill: [ label | (icon) ] */
            <button
              key="closed-pill-desktop"
              type="button"
              onClick={() => setIsOpen(true)}
              aria-expanded={false}
              aria-haspopup="dialog"
              aria-label={`Skills concept switcher. Currently showing ${activeDescriptor?.label}. Click to expand options`}
              className="group flex h-11 items-center gap-2.5 rounded-full border border-beige/25 bg-bgGreen/90 pl-3.5 pr-1 py-1 text-sm shadow-md backdrop-blur-md transition-all duration-200 hover:border-mainGreen/60 hover:bg-bgGreen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainGreen cursor-pointer"
            >
              <span className="font-inika font-bold tracking-wide text-beige group-hover:text-mainGreen transition-colors text-xs sm:text-sm whitespace-nowrap">
                {activeDescriptor?.label}
              </span>

              <span
                className="flex h-7 w-7 items-center justify-center rounded-full border border-beige/20 bg-beige/10 text-mainGreen transition-transform duration-300 group-hover:scale-105"
                aria-hidden="true"
              >
                <Iconify icon={ActiveIcon} className="h-3.5 w-3.5" />
              </span>
            </button>
          ) : (
            /* Open Track: Spreads to the left with circular buttons and kinetic hover label */
            <DesktopSwitcherTrack
              key="open-track-desktop"
              items={conceptItems}
              active={active}
              onSelect={handleSelect}
              onClose={() => setIsOpen(false)}
              prefersReducedMotion={prefersReducedMotion}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================= */}
      {/* MOBILE VIEW (below sm)                                    */}
      {/* Normal default view at top; slides down on click;         */}
      {/* on hover/tap, label tag slides out to the left            */}
      {/* ========================================================= */}
      <div className="relative flex sm:hidden items-center z-40">
        {/* Default View Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label={`Skills concept switcher. Currently showing ${activeDescriptor?.label}. Tap to ${isOpen ? "close" : "open"}`}
          className={cn(
            "group flex h-11 items-center gap-2.5 rounded-full border border-beige/25 bg-bgGreen/90 pl-3.5 pr-1 py-1 text-sm shadow-md backdrop-blur-md transition-all duration-200 hover:border-mainGreen/60 hover:bg-bgGreen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainGreen cursor-pointer",
            isOpen && "border-mainGreen/70 bg-bgGreen",
          )}
        >
          <span className="font-inika font-bold tracking-wide text-beige group-hover:text-mainGreen transition-colors text-xs whitespace-nowrap">
            {activeDescriptor?.label}
          </span>

          <span
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full border border-beige/20 bg-beige/10 text-mainGreen transition-transform duration-300",
              isOpen
                ? "rotate-90 bg-mainGreen text-bgGreen border-mainGreen"
                : "rotate-0",
            )}
            aria-hidden="true"
          >
            {isOpen ? (
              <Iconify
                icon="lucide:x"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
            ) : (
              <Iconify icon={ActiveIcon} className="h-3.5 w-3.5" />
            )}
          </span>
        </button>

        {/* Animatedly slides DOWN below default view */}
        <AnimatePresence>
          {isOpen && (
            <MobileSwitcherRail
              key="mobile-rail"
              items={conceptItems}
              active={active}
              onSelect={handleSelect}
              prefersReducedMotion={prefersReducedMotion}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

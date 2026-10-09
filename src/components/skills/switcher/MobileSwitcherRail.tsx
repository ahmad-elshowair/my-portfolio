"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { ConceptItem } from "./switcher.types";
import Iconify from "@/components/iconify";
import type { ConceptId } from "@/definitions";

interface MobileSwitcherRailProps {
  items: ConceptItem[];
  active: ConceptId;
  onSelect: (id: ConceptId) => void;
  prefersReducedMotion: boolean;
}

export function MobileSwitcherRail({
  items,
  active,
  onSelect,
  prefersReducedMotion,
}: MobileSwitcherRailProps) {
  const [hoveredId, setHoveredId] = useState<ConceptId | null>(null);

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: -16, scaleY: 0.85 }
      }
      animate={
        prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, scaleY: 1 }
      }
      exit={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: -16, scaleY: 0.85, transition: { duration: 0.15 } }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0.15 }
          : { type: "spring", damping: 25, stiffness: 300 }
      }
      style={{ transformOrigin: "top center" }}
      className="absolute right-0 top-full mt-2.5 z-40 flex flex-col items-center gap-2 rounded-full border border-beige/25 bg-bgGreen/95 p-1.5 shadow-2xl backdrop-blur-md select-none"
      role="radiogroup"
      aria-label="Skills concepts rail"
    >
      {items.map((item) => {
        const isActive = active === item.id;
        const isHovered = hoveredId === item.id;

        return (
          <div
            key={item.id}
            className={cn(
              "relative flex h-11 w-11 items-center justify-end",
              isHovered ? "z-30" : "z-10",
            )}
          >
            {/* The concept button: compact circle on the rail, smoothly expands to the left on hover */}
            <motion.button
              layout={!prefersReducedMotion}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={`${item.label} — ${item.blurb}`}
              tabIndex={0}
              onClick={() => onSelect(item.id)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(item.id)}
              onBlur={() => setHoveredId(null)}
              onTouchStart={() => setHoveredId(item.id)}
              className={cn(
                "absolute right-0 top-0 flex h-11 items-center rounded-full transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainGreen",
                isActive
                  ? "bg-mainGreen text-bgGreen font-bold shadow-[0_0_12px_rgba(141,165,91,0.55)] border border-mainGreen"
                  : isHovered
                  ? "bg-bgGreen border border-mainGreen/70 text-beige shadow-xl"
                  : "bg-beige/10 text-beige hover:bg-bgGreen hover:text-mainGreen border border-transparent",
                isHovered ? "pl-3.5 pr-0.5 gap-2" : "w-11 justify-center p-0",
              )}
            >
              {/* When hovered, label expands to the left inside the pill */}
              <AnimatePresence initial={false}>
                {isHovered && (
                  <motion.span
                    initial={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { width: 0, opacity: 0, x: -6 }
                    }
                    animate={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { width: "auto", opacity: 1, x: 0 }
                    }
                    exit={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { width: 0, opacity: 0, x: -6 }
                    }
                    transition={{ type: "spring", damping: 25, stiffness: 350 }}
                    className={cn(
                      "overflow-hidden whitespace-nowrap text-xs font-inika font-bold tracking-wide",
                      isActive ? "text-bgGreen" : "text-beige",
                    )}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Circular icon container - positioned at the right end of the pill, exactly aligned with rail */}
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-200",
                  isActive
                    ? isHovered
                      ? "bg-bgGreen text-mainGreen"
                      : "text-bgGreen"
                    : isHovered
                    ? "border border-beige/20 bg-beige/10 text-mainGreen"
                    : "text-beige",
                )}
                aria-hidden="true"
              >
                <Iconify icon={item.icon} className="h-4 w-4" />
              </span>
            </motion.button>
          </div>
        );
      })}
    </motion.div>
  );
}

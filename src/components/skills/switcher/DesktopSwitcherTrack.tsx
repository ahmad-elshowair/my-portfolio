"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Iconify from "@/components/iconify";
import type { ConceptItem } from "./switcher.types";
import type { ConceptId } from "@/definitions";

interface DesktopSwitcherTrackProps {
  items: ConceptItem[];
  active: ConceptId;
  onSelect: (id: ConceptId) => void;
  onClose: () => void;
  prefersReducedMotion: boolean;
}

export function DesktopSwitcherTrack({
  items,
  active,
  onSelect,
  onClose,
  prefersReducedMotion,
}: DesktopSwitcherTrackProps) {
  const [hoveredId, setHoveredId] = useState<ConceptId | null>(null);

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, scaleX: 0.7, x: 20 }
      }
      animate={
        prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 1, scaleX: 1, x: 0 }
      }
      exit={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, scaleX: 0.7, x: 20, transition: { duration: 0.15 } }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0.15 }
          : { type: "spring", damping: 26, stiffness: 320 }
      }
      style={{ transformOrigin: "right center" }}
      className="relative flex items-center gap-1.5 rounded-full border border-beige/25 bg-[#202724]/95 p-1 shadow-2xl backdrop-blur-md select-none"
    >
      {/* 8 Concept circle buttons spreading horizontally */}
      <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Skills concepts">
        {items.map((item) => {
          const isActive = active === item.id;
          const isHovered = hoveredId === item.id;

          return (
            <motion.button
              layout={!prefersReducedMotion}
              key={item.id}
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
              className={cn(
                "relative flex h-7 items-center rounded-full transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainGreen",
                isActive
                  ? "bg-mainGreen text-bgGreen font-bold shadow-[0_0_12px_rgba(141,165,91,0.5)]"
                  : "bg-beige/10 text-beige hover:bg-[#2c3531] hover:text-mainGreen",
                isHovered ? "px-2.5 gap-1.5" : "w-7 justify-center p-0",
              )}
            >
              <Iconify icon={item.icon} className="h-3.5 w-3.5 shrink-0" />

              <AnimatePresence initial={false}>
                {isHovered && (
                  <motion.span
                    initial={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { width: 0, opacity: 0, x: -4 }
                    }
                    animate={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { width: "auto", opacity: 1, x: 0 }
                    }
                    exit={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { width: 0, opacity: 0, x: -4 }
                    }
                    transition={{ type: "spring", damping: 25, stiffness: 350 }}
                    className="overflow-hidden whitespace-nowrap text-xs font-semibold tracking-wide"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Close button at the right end of the track */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close concept switcher"
        className="flex h-7 w-7 items-center justify-center rounded-full border border-beige/20 bg-beige/10 text-beige hover:border-mainGreen/70 hover:bg-mainGreen hover:text-bgGreen transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainGreen"
      >
        <Iconify icon="lucide:x" className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </motion.div>
  );
}

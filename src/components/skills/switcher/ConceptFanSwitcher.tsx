"use client";

import { usePrefersReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { ConceptPetal } from "./ConceptPetal";
import {
  CONCEPT_FAN_ORDER,
  CONCEPT_ICONS,
  FAN_GEOMETRY,
} from "./switcher.constants";
import type { ConceptFanItem, ConceptFanSwitcherProps } from "./switcher.types";
import { CONCEPT_REGISTRY } from "../registry";

export function ConceptFanSwitcher({
  active,
  onSelect,
  concepts,
  className,
}: ConceptFanSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const activeDescriptor = CONCEPT_REGISTRY[active];
  const ActiveIcon = CONCEPT_ICONS[active] || FiX;

  // Build the 8 ordered fan items spanning the left semi-circle (+82° to -82°)
  const fanItems: ConceptFanItem[] = useMemo(() => {
    const total = CONCEPT_FAN_ORDER.length;
    const arcSpan = FAN_GEOMETRY.endAngle - FAN_GEOMETRY.startAngle;
    const step = arcSpan / (total - 1);

    return CONCEPT_FAN_ORDER.map((id, index) => {
      const desc =
        CONCEPT_REGISTRY[id] ||
        concepts?.find((c) => c.id === id) || {
          id,
          label: id,
          blurb: "",
        };

      const angleDeg = FAN_GEOMETRY.startAngle + index * step;
      const isEven = index % 2 === 0;

      return {
        id,
        label: desc.label,
        blurb: desc.blurb,
        angleDeg,
        offsetPx: isEven ? FAN_GEOMETRY.innerOffset : FAN_GEOMETRY.outerOffset,
        widthPx: FAN_GEOMETRY.petalWidth,
        icon: CONCEPT_ICONS[id] || FiX,
      };
    });
  }, [concepts]);

  // Click outside to dismiss
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
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
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
      {/* Dimmed touch-dismiss backdrop on mobile when fan is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 z-20 sm:hidden bg-black/40 backdrop-blur-[2px]"
        />
      )}

      {/* Main Switcher Pill / Hub */}
      <div className="relative z-30 flex items-center">
        {/* Closed Pill Trigger: [ label | (icon) ] matching sketch; morphs into circular hub when open */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label={`Skills concept dial. Currently showing ${activeDescriptor?.label}. Click to ${isOpen ? "close" : "open"} switcher`}
          className={cn(
            "group flex items-center justify-center rounded-full border border-beige/25 bg-[#202724]/90 text-sm shadow-md backdrop-blur-md transition-all duration-200 hover:border-mainGreen/60 hover:bg-[#2c3531] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainGreen cursor-pointer",
            isOpen
              ? "h-9 w-9 border-mainGreen/70 bg-[#2c3531] p-0"
              : "h-9 pl-3.5 pr-1 py-1 gap-2.5",
          )}
        >
          {!isOpen && (
            <span className="font-inika font-bold tracking-wide text-beige group-hover:text-mainGreen transition-colors text-xs sm:text-sm whitespace-nowrap">
              {activeDescriptor?.label}
            </span>
          )}

          <span
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full border border-beige/20 bg-beige/10 text-mainGreen transition-transform duration-300 group-hover:scale-105",
              isOpen ? "rotate-90 bg-mainGreen text-bgGreen border-mainGreen" : "rotate-0",
            )}
            aria-hidden="true"
          >
            {isOpen ? <FiX className="h-3.5 w-3.5" /> : <ActiveIcon className="h-3.5 w-3.5" />}
          </span>
        </button>

        {/* Radiating Fan Petals container anchored directly at the hub */}
        <div
          role="radiogroup"
          aria-label="Skill concepts"
          className="pointer-events-none absolute right-[18px] top-1/2 h-0 w-0"
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="concept-fan-menu"
                initial={false}
                className="pointer-events-auto relative"
              >
                {fanItems.map((item, index) => (
                  <ConceptPetal
                    key={item.id}
                    item={item}
                    index={index}
                    isActive={active === item.id}
                    onSelect={handleSelect}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default ConceptFanSwitcher;

"use client";

/* ─── Shelf Chip Component ───────────────────────────────────────────── */

import Iconify from "@/components/iconify";
import type { SkillItem } from "@/definitions";
import { cn } from "@/lib/utils";

interface ShelfChipProps {
  skill: SkillItem;
  isSelected: boolean;
  isPreviewed: boolean;
  onSelect: () => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
  chipRef?: (el: HTMLButtonElement | null) => void;
}

/**
 * Single skill chip resting on the category shelf.
 * Matches desktop-direction.jpg & mobile-direction.jpg with rounded-2xl geometry,
 * prominent icon glyphs, and high-contrast illuminated active state.
 */
export function ShelfChip({
  skill,
  isSelected,
  isPreviewed,
  onSelect,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  chipRef,
}: ShelfChipProps) {
  const isElevated = isSelected || isPreviewed;

  return (
    <button
      ref={chipRef}
      type="button"
      aria-pressed={isSelected}
      aria-label={`Inspect ${skill.name} evidence`}
      onClick={onSelect}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      className={cn(
        "group relative flex min-h-11 w-full sm:w-auto items-center gap-2 rounded-2xl border text-sm transition-all duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainGreen focus-visible:ring-offset-2 focus-visible:ring-offset-bgGreen",
        "motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none",
        "px-3.5 py-2.5 md:px-3.5 md:py-1.5 md:min-h-10 md:gap-2",
        isElevated
          ? "border-mainGreen bg-mainGreen/25 text-beige shadow-[0_0_18px_rgba(141,165,91,0.45)] md:border-white/80 md:bg-beige md:text-bgGreen md:shadow-[0_0_24px_rgba(245,230,211,0.55)] font-semibold"
          : "border-beige/15 bg-black/35 backdrop-blur-md text-beige/90 hover:border-beige/35 hover:bg-beige/10 hover:text-beige font-normal md:shadow-[0_3px_10px_rgba(141,165,91,0.15)]"
      )}
    >
      {skill.icon ? (
        <Iconify
          icon={skill.icon}
          className={cn(
            "h-4 w-4 shrink-0 transition-colors duration-200",
            isElevated
              ? "text-beige md:text-bgGreen"
              : "text-beige/70 group-hover:text-mainGreen"
          )}
        />
      ) : null}
      <span className="truncate">{skill.name}</span>
    </button>
  );
}

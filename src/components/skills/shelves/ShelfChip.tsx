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
 * Renders with a touch-friendly target, fine-pointer hover lift,
 * exact Iconify glyph, and elevated glass styling when selected or previewed.
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
        "group relative flex min-h-11 w-full sm:w-auto items-center gap-2 rounded-xl border text-[13px] sm:text-sm transition-all duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainGreen focus-visible:ring-offset-2 focus-visible:ring-offset-bgGreen",
        "motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none",
        "px-3 py-2",
        isElevated
          ? "border-mainGreen bg-mainGreen/25 text-beige shadow-glow ring-1 ring-mainGreen/50 font-medium"
          : "border-beige/15 bg-beige/5 text-beige/90 hover:border-beige/30 hover:bg-beige/10 hover:text-beige font-normal",
      )}
    >
      {skill.icon ? (
        <Iconify
          icon={skill.icon}
          className={cn(
            "h-4 w-4 shrink-0 transition-colors duration-200",
            isElevated ? "text-beige" : "text-mainGreen",
          )}
        />
      ) : null}
      <span className="truncate">{skill.name}</span>
    </button>
  );
}

"use client";

import { SkillGlyph } from "@/components/skills/shared";
import type { SkillItem } from "@/definitions";
import { cn } from "@/lib/utils";

export interface SkillChipButtonProps {
  skill: SkillItem;
  isSelected: boolean;
  isHero: boolean;
  onSelect: (id: string) => void;
}

/**
 * Interactive SkillChipButton atom with tactile feedback, glowing halos, and ARIA state.
 */
export function SkillChipButton({
  skill,
  isSelected,
  isHero,
  onSelect,
}: SkillChipButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      aria-controls="bento-live-inspector"
      aria-label={`Select ${skill.name} to view production proof`}
      onClick={() => onSelect(skill.id)}
      className={cn(
        "group relative flex min-h-[44px] items-center gap-2 rounded-xl border text-sm transition-all duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainGreen focus-visible:ring-offset-2 focus-visible:ring-offset-bgGreen",
        "motion-safe:active:scale-[0.98] motion-safe:hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none",
        isHero
          ? "px-3.5 py-1.5 font-medium backdrop-blur-sm"
          : "px-3 py-1 font-normal",
        isSelected
          ? "border-mainGreen bg-mainGreen/25 text-beige shadow-[0_0_15px_rgba(141,165,91,0.3)] ring-1 ring-mainGreen/50"
          : "border-beige/15 bg-beige/5 text-beige/90 hover:border-beige/30 hover:bg-beige/10 hover:text-beige",
      )}
    >
      {isHero && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-colors duration-200 shrink-0",
            isSelected
              ? "bg-mainGreen shadow-[0_0_6px_#8DA55B]"
              : "bg-mainGreen/60 group-hover:bg-mainGreen",
          )}
          aria-hidden="true"
        />
      )}
      <SkillGlyph
        skill={skill}
        className={cn(
          "text-mainGreen shrink-0 transition-transform duration-200 group-hover:scale-105 motion-reduce:transform-none",
          isHero ? "[&_svg]:text-xl" : "[&_svg]:text-lg",
        )}
      />
      <span className="tracking-tight">{skill.name}</span>
    </button>
  );
}

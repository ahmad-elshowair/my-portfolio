"use client";

import Iconify from "@/components/iconify";
import type { SkillItem } from "@/definitions";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

/**
 * Flow-layout chip with the visible label — the static grid keeps names
 * on-chip (Article VI complete baseline); the orbit's icon-only variant
 * is SatelliteChip below.
 */
export function GridChip({
  skill,
  selected,
  onSelect,
  className,
}: {
  skill: SkillItem;
  selected: boolean;
  onSelect: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "flex min-h-11 min-w-11 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-2 text-xs transition-colors duration-200 [&_svg]:text-base",
        selected
          ? "border-mainGreen bg-mainGreen/30 text-beige shadow-[0_0_12px_rgba(141,165,91,0.3)]"
          : "border-beige/20 bg-bgGreen/80 text-beige/90 hover:bg-beige/10",
        className,
      )}
    >
      <Iconify icon={skill.icon} className="h-[1.15em] w-[1.15em] shrink-0" />
      {skill.name}
    </button>
  );
}

/** Icon-only orbit satellite: the official glyph at a 44px target, named via aria-label. */
export function SatelliteChip({
  skill,
  selected,
  onSelect,
  className,
  style,
  dataRing,
}: {
  skill: SkillItem;
  selected: boolean;
  onSelect: () => void;
  className?: string;
  style?: CSSProperties;
  dataRing: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={skill.name}
      data-ring={dataRing}
      data-skill-id={skill.id}
      onClick={onSelect}
      style={style}
      className={cn(
        "pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 hover:shadow-[0_0_12px_rgba(141,165,91,0.3)]",
        selected
          ? "scale-110 border-mainGreen bg-mainGreen/30 ring-2 ring-mainGreen/60 shadow-[0_0_16px_rgba(141,165,91,0.4)]"
          : "border-beige/15 bg-mainGreen/10 hover:border-mainGreen/40 hover:bg-mainGreen/25 hover:scale-105",
        className,
      )}
    >
      <Iconify icon={skill.icon} className="h-6 w-6 text-beige" />
    </button>
  );
}

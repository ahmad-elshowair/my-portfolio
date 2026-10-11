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
        "flex items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs transition-colors duration-200 [&_svg]:text-sm",
        selected
          ? "border-mainGreen bg-mainGreen/30 text-beige shadow-[0_0_12px_rgba(141,165,91,0.3)]"
          : "border-beige/20 bg-bgGreen/80 text-beige/90 hover:bg-beige/10",
        className,
      )}
    >
      <Iconify icon={skill.icon} className="h-[1em] w-[1em] shrink-0" />
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
        "flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-200 hover:shadow-[0_0_12px_rgba(141,165,91,0.3)]",
        selected
          ? "border-mainGreen bg-mainGreen/30 shadow-[0_0_12px_rgba(141,165,91,0.3)]"
          : "border-beige/15 bg-mainGreen/10 hover:bg-mainGreen/25",
        className,
      )}
    >
      <Iconify icon={skill.icon} className="h-6 w-6 text-beige" />
    </button>
  );
}

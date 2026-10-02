"use client";

import type { SkillCategoryId } from "@/definitions";
import { GROUPS } from "./cli";

export function PresetQuickRun({
  onRun,
}: {
  onRun: (preset: SkillCategoryId | "clear") => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {GROUPS.slice(0, 3).map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onRun(category)}
          className="min-h-[44px] rounded-full border border-beige/20 bg-beige/5 px-3 py-1 font-mono text-[11px] text-beige/80 transition-colors duration-200 hover:bg-beige/10 sm:text-xs"
        >
          $ inspect --{category}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onRun("clear")}
        className="min-h-[44px] rounded-full border border-beige/20 bg-beige/5 px-3 py-1 font-mono text-[11px] text-beige/80 transition-colors duration-200 hover:bg-beige/10 sm:text-xs"
      >
        $ clear
      </button>
    </div>
  );
}

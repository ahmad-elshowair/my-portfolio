"use client";

import type { SkillCategoryId } from "@/definitions";
import { GROUPS } from "./cli";

export function PresetQuickRun({
  onRun,
}: {
  onRun: (preset: SkillCategoryId | "clear") => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
      {GROUPS.slice(0, 3).map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onRun(category)}
          className="flex min-h-[44px] items-center justify-center rounded-full border border-beige/20 bg-beige/5 px-3 py-1.5 font-mono text-[11px] text-beige/80 transition-colors duration-200 hover:bg-beige/10 active:bg-beige/15 sm:text-xs"
        >
          $ inspect --{category}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onRun("clear")}
        className="flex min-h-[44px] items-center justify-center rounded-full border border-beige/20 bg-beige/5 px-3 py-1.5 font-mono text-[11px] text-beige/80 transition-colors duration-200 hover:bg-beige/10 active:bg-beige/15 sm:text-xs"
      >
        $ clear
      </button>
    </div>
  );
}

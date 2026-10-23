"use client";

/* ─── Language Strip Component ───────────────────────────────────────── */

import Iconify from "@/components/iconify";
import { getSkillsByCategory } from "@/data";
import { cn } from "@/lib/utils";

interface LanguageStripProps {
  className?: string;
}

/**
 * Slim frosted glass communication strip rendered beneath the category shelf.
 * Displays only spoken languages (Arabic, English) derived verbatim from the dataset (OD7).
 */
export function LanguageStrip({ className }: LanguageStripProps) {
  const languages = getSkillsByCategory("languages");

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-beige/15 bg-mainGreen/10 backdrop-blur-md px-4 py-2.5 text-xs sm:text-sm",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-xs uppercase tracking-wider font-semibold text-mainGreen">
          Communication
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {languages.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center gap-1.5 rounded-lg border border-beige/10 bg-beige/5 px-2.5 py-1 text-beige/90 text-xs sm:text-sm"
          >
            {skill.icon ? (
              <Iconify
                icon={skill.icon}
                className="h-3.5 w-3.5 text-mainGreen shrink-0"
              />
            ) : null}
            <span className="font-medium text-beige">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

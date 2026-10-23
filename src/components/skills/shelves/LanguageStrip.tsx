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
 * Matches desktop-direction.jpg & mobile-direction.jpg:
 * Centered "Communication" section with subtle hairline wings and frosted language pills.
 * Displays only spoken languages (Arabic, English) derived verbatim from the dataset (OD7).
 */
export function LanguageStrip({ className }: LanguageStripProps) {
  const languages = getSkillsByCategory("languages");

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 pt-2 text-xs sm:text-sm",
        className
      )}
    >
      {/* Centered Section Label with Hairline Wings */}
      <div className="flex items-center justify-center gap-3 w-full max-w-xs">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-beige/20 to-beige/30" />
        <span className="text-xs uppercase tracking-widest font-medium text-beige/70">
          Communication
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-beige/20 to-beige/30" />
      </div>

      {/* Language Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        {languages.map((skill) => {
          // Format "Arabic (native)" as "Arabic · native" per mockups
          const formattedLabel = skill.name.replace(/\s*\((.*?)\)/, " · $1");

          return (
            <div
              key={skill.id}
              className="flex min-h-11 items-center gap-2 rounded-full border border-beige/20 bg-black/30 backdrop-blur-md px-4 py-2 text-beige/90 text-xs sm:text-sm shadow-sm transition-colors hover:border-beige/35 hover:bg-black/40"
            >
              {skill.icon ? (
                <Iconify
                  icon={skill.icon}
                  className="h-3.5 w-3.5 text-mainGreen shrink-0"
                />
              ) : null}
              <span className="font-normal text-beige">{formattedLabel}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

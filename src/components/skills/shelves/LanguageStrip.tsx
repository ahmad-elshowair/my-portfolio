"use client";

/* ─── Language Strip Component ───────────────────────────────────────── */

import Iconify from "@/components/iconify";
import { getSkillsByCategory } from "@/data";
import { cn } from "@/lib/utils";

interface LanguageStripProps {
  className?: string;
}

/**
 * Frosted glass communication strip for spoken languages.
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
      {/* Section label with hairline wings */}
      <div className="flex items-center justify-center gap-3 w-full max-w-xs">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-beige/20 to-beige/30" />
        <span className="text-xs uppercase tracking-widest font-medium text-beige/70">
          Communication
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-beige/20 to-beige/30" />
      </div>

      {/* Language badges */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        {languages.map((skill) => {
          // Format "Arabic (native)" as "Arabic · native"
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

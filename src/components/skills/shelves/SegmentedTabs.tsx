"use client";

/* ─── Segmented Tabs Component ───────────────────────────────────────── */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MOTION } from "@/lib/motion";
import { useRovingTabs } from "@/hooks";
import type { ShelfCategoryId, SkillCategoryId } from "@/definitions";

interface SegmentedTabsProps {
  shelves: readonly ShelfCategoryId[];
  activeShelf: ShelfCategoryId;
  onShelfChange: (shelf: ShelfCategoryId) => void;
  counts: Readonly<Record<SkillCategoryId, number>>;
  shortLabels: Readonly<Record<SkillCategoryId, string>>;
  fullLabels: Readonly<Record<SkillCategoryId, string>>;
}

/**
 * Frosted-glass segmented tab control adhering to WAI-ARIA horizontal tablist.
 * Renders equal-width tabs with responsive short/full labels, tabular count badges,
 * and a sliding active indicator.
 */
export function SegmentedTabs({
  shelves,
  activeShelf,
  onShelfChange,
  counts,
  shortLabels,
  fullLabels,
}: SegmentedTabsProps) {
  const { tablistProps, getTabProps, tabRefs } = useRovingTabs({
    tabs: shelves,
    activeTab: activeShelf,
    onChange: onShelfChange,
    ariaLabel: "Skill categories",
    idPrefix: "shelves",
  });

  return (
    <div
      {...tablistProps}
      className="relative grid grid-cols-3 p-1.5 rounded-full bg-black/30 border border-beige/25 backdrop-blur-md max-w-xl mx-auto w-full shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
    >
      {shelves.map((category) => {
        const isActive = activeShelf === category;
        const tabProps = getTabProps(category);

        return (
          <div key={category} className="relative flex items-center justify-center">
            <button
              ref={(el) => {
                tabRefs.current[category] = el;
              }}
              type="button"
              {...tabProps}
              className={cn(
                "relative min-h-11 w-full rounded-full flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainGreen focus-visible:ring-offset-1 focus-visible:ring-offset-bgGreen",
                isActive
                  ? "text-beige font-semibold"
                  : "text-beige/70 hover:text-beige hover:bg-beige/5 font-normal"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="shelves-active-tab"
                  className="absolute inset-0 rounded-full bg-mainGreen/30 border border-mainGreen/60 shadow-[0_0_15px_rgba(141,165,91,0.3)]"
                  transition={MOTION.tabSpring}
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10 sm:hidden">{shortLabels[category]}</span>
              <span className="relative z-10 hidden sm:inline">{fullLabels[category]}</span>
              <span
                className={cn(
                  "relative z-10 px-2 py-0.5 text-[11px] leading-none rounded-full tabular-nums font-mono transition-colors",
                  isActive
                    ? "bg-black/35 text-beige/95 border border-beige/10"
                    : "bg-black/25 text-beige/60"
                )}
              >
                {counts[category]}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

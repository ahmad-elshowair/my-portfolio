"use client";

/* ─── Segmented Tabs Component ───────────────────────────────────────── */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MOTION } from "@/lib/motion";
import type {
  RovingTabsState,
  ShelfCategoryId,
  SkillCategoryId,
} from "@/definitions";

interface SegmentedTabsProps {
  shelves: readonly ShelfCategoryId[];
  activeShelf: ShelfCategoryId;
  onShelfChange: (shelf: ShelfCategoryId) => void;
  counts: Readonly<Record<SkillCategoryId, number>>;
  shortLabels: Readonly<Record<SkillCategoryId, string>>;
  fullLabels: Readonly<Record<SkillCategoryId, string>>;
  roving: RovingTabsState<ShelfCategoryId>;
}

/**
 * Frosted-glass segmented tab control adhering to WAI-ARIA horizontal tablist.
 * Renders equal-width tabs with responsive short/full labels, tabular count badges,
 * and a sliding active indicator.
 */
export function SegmentedTabs({
  shelves,
  activeShelf,
  counts,
  shortLabels,
  fullLabels,
  roving,
}: SegmentedTabsProps) {
  return (
    <div
      {...roving.tablistProps}
      className="relative grid grid-cols-3 p-1 rounded-full bg-mainGreen/10 border border-beige/15 backdrop-blur-md max-w-xl mx-auto w-full"
    >
      {shelves.map((category) => {
        const isActive = activeShelf === category;
        const tabProps = roving.getTabProps(category);

        return (
          <button
            key={category}
            ref={(el) => {
              roving.tabRefs.current[category] = el;
            }}
            type="button"
            {...tabProps}
            className={cn(
              "relative min-h-11 w-full rounded-full flex items-center justify-center gap-1.5 px-2 py-2 text-xs sm:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainGreen",
              isActive
                ? "text-beige font-semibold"
                : "text-beige/70 hover:text-beige hover:bg-beige/5"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="shelves-active-tab"
                className="absolute inset-0 rounded-full bg-mainGreen/25 border border-mainGreen shadow-glow"
                transition={MOTION.tabSpring}
                aria-hidden="true"
              />
            )}
            <span className="relative z-10 sm:hidden">{shortLabels[category]}</span>
            <span className="relative z-10 hidden sm:inline">{fullLabels[category]}</span>
            <span className="relative z-10 px-1.5 py-0.5 text-[11px] leading-none rounded-full bg-beige/15 text-beige/90 tabular-nums">
              {counts[category]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

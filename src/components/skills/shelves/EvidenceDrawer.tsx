"use client";

/* ─── Evidence Drawer Component ──────────────────────────────────────── */

import { motion } from "framer-motion";
import Iconify from "@/components/iconify";
import { ProjectPills } from "@/components/skills/shared";
import type { SkillItem } from "@/definitions";
import { cn } from "@/lib/utils";
import { MOTION } from "@/lib/motion";

interface EvidenceDrawerProps {
  skill: SkillItem | undefined;
  variant: "desktop-pullout" | "mobile-inline";
  caretOffsetPx?: number;
  caretColumn?: "left" | "right";
  onCollapse?: () => void;
  onPillClick?: () => void;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
}

/**
 * Unified Evidence Drawer presenting proof and project cross-links for a skill.
 * - Desktop: Pull-out glass drawer attached beneath shelf ledge with chip-centered caret (CLS = 0).
 * - Mobile: Inline row-split drawer expanding beneath active 2-column row with column caret and collapse button.
 */
export function EvidenceDrawer({
  skill,
  variant,
  caretOffsetPx,
  caretColumn,
  onCollapse,
  onPillClick,
  onPointerEnter,
  onPointerLeave,
}: EvidenceDrawerProps) {
  const isDesktop = variant === "desktop-pullout";

  // Desktop idle state: maintain reserved height to ensure CLS = 0
  if (isDesktop && !skill) {
    return (
      <div
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        className="relative mt-2 min-h-[140px] rounded-2xl border border-beige/15 bg-mainGreen/10 backdrop-blur-md p-6 flex items-center justify-center text-center text-sm text-beige/50"
      >
        Hover or tap a skill to inspect evidence & projects.
      </div>
    );
  }

  // Mobile collapsed state: render nothing
  if (!isDesktop && !skill) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: isDesktop ? -4 : 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: isDesktop ? -4 : 4 }}
      transition={{ duration: MOTION.fast }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={cn(
        "relative rounded-2xl border border-beige/15 bg-mainGreen/10 backdrop-blur-md shadow-lg",
        isDesktop ? "mt-2 p-6 min-h-[140px]" : "my-2 p-4 col-span-2 w-full"
      )}
    >
      {/* Desktop chip-centered upward caret */}
      {isDesktop && caretOffsetPx !== undefined && (
        <div
          className="absolute -top-2 w-3.5 h-3.5 bg-bgGreen border-t border-l border-beige/25 pointer-events-none"
          style={{
            left: `${caretOffsetPx}px`,
            transform: "translateX(-50%) rotate(45deg)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Mobile column-aligned upward caret */}
      {!isDesktop && caretColumn && (
        <div
          className={cn(
            "absolute -top-2 w-3.5 h-3.5 bg-bgGreen border-t border-l border-beige/25 pointer-events-none rotate-45 -translate-x-1/2",
            caretColumn === "left" ? "left-1/4" : "left-3/4"
          )}
          aria-hidden="true"
        />
      )}

      {/* Header: Skill Icon + Name + Mobile Collapse Button */}
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          {skill?.icon ? (
            <Iconify
              icon={skill.icon}
              className="h-5 w-5 shrink-0 text-mainGreen"
            />
          ) : null}
          <h4 className="font-medium text-beige text-base truncate">
            {skill?.name}
          </h4>
        </div>

        {!isDesktop && onCollapse && (
          <button
            type="button"
            onClick={onCollapse}
            aria-label="Close evidence drawer"
            className="min-h-11 min-w-11 -mr-2 -my-2 flex items-center justify-center rounded-full text-beige/70 hover:text-beige hover:bg-beige/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainGreen transition-colors"
          >
            <Iconify icon="lucide:x" className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Context Description */}
      <p className="text-sm leading-relaxed text-beige/90 mb-3">
        {skill?.context}
      </p>

      {/* Project Evidence Cross-Links or Resume Fallback */}
      {skill && skill.projects.length > 0 ? (
        <ProjectPills ids={skill.projects} onPillClick={onPillClick} />
      ) : (
        <p className="text-xs text-beige/60">Verified in resume</p>
      )}
    </motion.div>
  );
}

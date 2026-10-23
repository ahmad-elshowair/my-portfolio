"use client";

/* ─── Evidence Drawer Component ──────────────────────────────────────── */

import { AnimatePresence, motion } from "framer-motion";
import Iconify from "@/components/iconify";
import { ProjectPills } from "@/components/skills/shared";
import type { SkillItem } from "@/definitions";
import { cn } from "@/lib/utils";

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
 * Unified Evidence Drawer.
 * - Desktop: Sleek horizontal telemetry dock with prominent icon, Inika serif title,
 *   flowing description, project pills, and chip-centered upward caret.
 *   Hidden by default; slides down under shelf on hover/click, stays open with smooth
 *   content cross-fading when moving between skills, slides back up when clicking out.
 * - Mobile: Inline row-split drawer expanding beneath active row with Inika serif title,
 *   circular upward-chevron collapse control, and column-aligned caret.
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

  // When no skill is active, drawer is hidden
  if (!skill) {
    return null;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: isDesktop ? -24 : 4,
        scale: isDesktop ? 0.99 : 1,
      }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: isDesktop ? -24 : 4, scale: isDesktop ? 0.99 : 1 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={cn(
        "relative rounded-2xl border border-beige/20 bg-black/35 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.45)]",
        isDesktop
          ? "p-6 min-h-[135px] flex flex-col justify-between w-full"
          : "my-2 p-5 col-span-2 w-full",
      )}
    >
      {/* Desktop Integrated Caret: seamless upward extension aligned with active chip */}
      {isDesktop && caretOffsetPx !== undefined && (
        <motion.div
          className="absolute -top-[14px] w-7 h-[15px] pointer-events-none z-20"
          animate={{ left: caretOffsetPx }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          style={{ transform: "translateX(-50%)" }}
          aria-hidden="true"
        >
          {/* Translucent glass fill matching drawer interior with backdrop blur */}
          <div
            className="w-full h-full bg-black/35 backdrop-blur-xl"
            style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
          />
          {/* 45-deg angled border strokes seamlessly meeting container top border */}
          <svg
            className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
            viewBox="0 0 28 14"
            fill="none"
          >
            <polyline
              points="0,14 14,0.5 28,14"
              fill="none"
              stroke="rgba(245, 230, 211, 0.2)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* Seamless bridge covering container top border stroke under caret */}
          <div className="absolute -bottom-px left-0.5 right-0.5 h-[2px] bg-[#1c2620]" />
        </motion.div>
      )}

      {/* Mobile Integrated Caret: seamless upward extension aligned with column */}
      {!isDesktop && caretColumn && (
        <div
          className="absolute -top-[12px] w-6 h-[13px] pointer-events-none z-20"
          style={{
            left: caretColumn === "left" ? "25%" : "75%",
            transform: "translateX(-50%)",
          }}
          aria-hidden="true"
        >
          {/* Translucent glass fill matching drawer interior with backdrop blur */}
          <div
            className="w-full h-full bg-black/35 backdrop-blur-xl"
            style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
          />
          {/* 45-deg angled border strokes meeting top border */}
          <svg
            className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
            viewBox="0 0 24 12"
            fill="none"
          >
            <polyline
              points="0,12 12,0.5 24,12"
              fill="none"
              stroke="rgba(245, 230, 211, 0.2)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* Seamless bridge covering container top border stroke under caret */}
          <div className="absolute -bottom-px left-0.5 right-0.5 h-[2px] bg-[#1c2620]" />
        </div>
      )}

      {/* Desktop Layout (Direction B: Two-Tier Floating Telemetry) */}
      {isDesktop ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col gap-3.5 w-full"
          >
            {/* Top Tier: Left Identity + Right Provenance Project Pills */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                {skill.icon ? (
                  <Iconify
                    icon={skill.icon}
                    className="h-8 w-8 sm:h-9 sm:w-9 text-mainGreen shrink-0"
                  />
                ) : null}
                <h4 className="font-inika text-2xl text-beige font-normal tracking-wide">
                  {skill.name}
                </h4>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {skill.projects.length > 0 ? (
                  <ProjectPills
                    ids={skill.projects}
                    label={null}
                    onPillClick={onPillClick}
                  />
                ) : (
                  <span className="text-xs text-beige/60 italic px-3 py-1.5 rounded-full border border-beige/10 bg-white/5">
                    Verified in resume
                  </span>
                )}
              </div>
            </div>

            {/* Subtle horizontal separator */}
            <div className="h-px w-full bg-gradient-to-r from-beige/20 via-beige/10 to-transparent" />

            {/* Bottom Tier: Full-Width Flowing Context Description */}
            <p className="text-sm leading-relaxed text-beige/85">
              {skill.context}
            </p>
          </motion.div>
        </AnimatePresence>
      ) : (
        /* Mobile Vertical Layout */
        <>
          {/* Header: Icon Tile + Inika Title + Circular Chevron-Up Collapse Button */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3 min-w-0">
              {skill?.icon ? (
                <div className="h-10 w-10 rounded-xl bg-black/40 border border-beige/15 flex items-center justify-center shrink-0">
                  <Iconify
                    icon={skill.icon}
                    className="h-6 w-6 text-mainGreen shrink-0"
                  />
                </div>
              ) : null}
              <h4 className="font-inika text-2xl text-beige font-normal tracking-wide truncate">
                {skill?.name}
              </h4>
            </div>

            {onCollapse && (
              <button
                type="button"
                onClick={onCollapse}
                aria-label="Collapse evidence drawer"
                className="min-h-11 min-w-11 -mr-1 -my-1 rounded-full text-beige/80 hover:text-beige flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainGreen"
              >
                <div className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <Iconify icon="lucide:chevron-up" className="h-4 w-4" />
                </div>
              </button>
            )}
          </div>

          {/* Context Description */}
          <p className="text-sm leading-relaxed text-beige/85 mb-3.5">
            {skill?.context}
          </p>

          {/* Project Pills / Resume Note */}
          {skill && skill.projects.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              <ProjectPills
                ids={skill.projects}
                label={null}
                onPillClick={onPillClick}
              />
            </div>
          ) : (
            <p className="text-xs text-beige/60">Verified in resume</p>
          )}
        </>
      )}
    </motion.div>
  );
}

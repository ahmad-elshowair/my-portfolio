"use client";

/* ─── Desktop Evidence Drawer ────────────────────────────────────────── */

import { AnimatePresence, motion } from "framer-motion";
import Iconify from "@/components/iconify";
import { ProjectPills } from "@/components/skills/shared";
import type { SkillItem } from "@/definitions";

interface DesktopEvidenceDrawerProps {
  skill: SkillItem;
  caretOffsetPx?: number;
  onPillClick?: () => void;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
}

/**
 * Desktop pullout telemetry dock with chip-centered caret and provenance pills.
 */
export function DesktopEvidenceDrawer({
  skill,
  caretOffsetPx,
  onPillClick,
  onPointerEnter,
  onPointerLeave,
}: DesktopEvidenceDrawerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -24, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.99 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className="relative rounded-2xl border-x border-b border-beige/20 bg-black/35 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.45)] p-6 min-h-[135px] flex flex-col justify-between w-full"
    >
      {/* Top rounded corners (16px radius) */}
      <div
        className="absolute top-0 left-0 w-4 h-4 rounded-tl-2xl border-t border-l border-beige/20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 w-4 h-4 rounded-tr-2xl border-t border-r border-beige/20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Top border with chip-aligned caret */}
      {caretOffsetPx !== undefined ? (
        <>
          <motion.div
            className="absolute top-0 left-4 h-px bg-beige/20 pointer-events-none"
            animate={{ width: Math.max(0, caretOffsetPx - 30) }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />

          <motion.div
            className="absolute -top-[14px] w-7 h-[15px] pointer-events-none z-20"
            animate={{ left: caretOffsetPx }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            style={{ transform: "translateX(-50%)" }}
            aria-hidden="true"
          >
            <div
              className="w-full h-full bg-black/35 backdrop-blur-xl"
              style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
            />
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
          </motion.div>

          <motion.div
            className="absolute top-0 right-4 h-px bg-beige/20 pointer-events-none"
            animate={{ left: caretOffsetPx + 14 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        </>
      ) : (
        <div className="absolute top-0 left-4 right-4 h-px bg-beige/20 pointer-events-none" />
      )}

      {/* Cross-fading telemetry content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={skill.id}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.15 }}
          className="flex flex-col gap-3.5 w-full"
        >
          {/* Header row: Skill identity & project provenance */}
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

          <div className="h-px w-full bg-gradient-to-r from-beige/20 via-beige/10 to-transparent" />

          {/* Context description */}
          <p className="text-sm leading-relaxed text-beige/85">
            {skill.context}
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

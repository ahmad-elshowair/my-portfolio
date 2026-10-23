"use client";

/* ─── Shelf Panel Component ──────────────────────────────────────────── */

import { Fragment } from "react";
import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";
import type { SkillItem } from "@/definitions";
import { ShelfChip } from "./ShelfChip";

interface ShelfPanelProps {
  skills: readonly SkillItem[];
  selectedSkillId: string | null;
  previewId: string | null;
  onSelectSkill: (id: string) => void;
  onChipPointerEnter: (id: string) => void;
  onChipPointerLeave: () => void;
  onChipFocus: (id: string) => void;
  onChipBlur: () => void;
  registerChipRef?: (id: string, el: HTMLButtonElement | null) => void;
  mobileDrawerSlot?: React.ReactNode;
  id?: string;
  role?: string;
  "aria-labelledby"?: string;
  tabIndex?: number;
}

/**
 * Physical frosted glass shelf pedestal.
 * Renders chips on a 3D perspective glass shelf with glowing front ledge on desktop,
 * and an ambient frosted glass card with 2-column inline row-split grid on mobile.
 */
export function ShelfPanel({
  skills,
  selectedSkillId,
  previewId,
  onSelectSkill,
  onChipPointerEnter,
  onChipPointerLeave,
  onChipFocus,
  onChipBlur,
  registerChipRef,
  mobileDrawerSlot,
  id,
  role = "tabpanel",
  "aria-labelledby": ariaLabelledBy,
  tabIndex = -1,
}: ShelfPanelProps) {
  const activeSkillId = previewId ?? selectedSkillId;
  const activeIndex = skills.findIndex((s) => s.id === activeSkillId);
  const rowEndIndex =
    activeIndex !== -1
      ? Math.min(Math.floor(activeIndex / 2) * 2 + 1, skills.length - 1)
      : -1;

  return (
    <motion.div
      id={id}
      role={role}
      aria-labelledby={ariaLabelledBy}
      tabIndex={tabIndex}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: MOTION.fast }}
      className="relative rounded-3xl border border-beige/20 bg-black/20 backdrop-blur-md p-4 sm:p-6 md:border-none md:bg-transparent md:backdrop-blur-none md:p-0 md:shadow-none focus:outline-none"
    >
      {/* Soft ambient radial green light behind mobile shelf card */}
      <div
        className="md:hidden pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,_rgba(141,165,91,0.22)_0%,_rgba(141,165,91,0.06)_55%,_transparent_75%)] blur-lg"
        aria-hidden="true"
      />

      {/* Chips Layout: 2-column on mobile, balanced floating rows on desktop (matching design) */}
      <div className="grid grid-cols-2 gap-2.5 md:flex md:flex-wrap md:justify-center md:gap-3">
        {skills.map((skill, index) => {
          const isSelected = selectedSkillId === skill.id;
          const isPreviewed = previewId === skill.id;

          return (
            <Fragment key={skill.id}>
              <ShelfChip
                skill={skill}
                isSelected={isSelected}
                isPreviewed={isPreviewed}
                onSelect={() => onSelectSkill(skill.id)}
                onPointerEnter={() => onChipPointerEnter(skill.id)}
                onPointerLeave={onChipPointerLeave}
                onFocus={() => onChipFocus(skill.id)}
                onBlur={onChipBlur}
                chipRef={(el) => registerChipRef?.(skill.id, el)}
              />
              {index === rowEndIndex && mobileDrawerSlot ? (
                <div className="col-span-2 md:hidden w-full">
                  {mobileDrawerSlot}
                </div>
              ) : null}
            </Fragment>
          );
        })}
      </div>

      {/* Desktop 3D Physical Shelf Stage (matching media_1792749110982_e13ba36c.png) */}
      <div
        className="hidden md:block relative w-full mt-5 pointer-events-none select-none z-10"
        aria-hidden="true"
      >
        {/* Slanted Perspective Top Surface (Trapezoid sloping down to front ledge) */}
        <div className="relative h-2.5 w-full">
          {/* Luminous Neon Lime Rim at Back Edge of Shelf */}
          <div className="absolute top-0 inset-x-[7%] h-[2px] bg-gradient-to-r from-transparent via-[#b6db76] to-transparent shadow-[0_0_12px_#8DA55B,0_0_4px_#cbf084]" />

          {/* Translucent Glass Top Slope */}
          <div
            className="w-full h-full bg-gradient-to-b from-[#8DA55B]/25 via-[#233126]/60 to-[#18231c]/80 border-t border-beige/25"
            style={{
              clipPath: "polygon(7% 0%, 93% 0%, 100% 100%, 0% 100%)",
            }}
          />

          {/* Angled Perspective Corner Bevel Hairlines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
          >
            <line
              x1="7"
              y1="0"
              x2="0"
              y2="10"
              stroke="rgba(245,230,211,0.3)"
              strokeWidth="0.8"
            />
            <line
              x1="93"
              y1="0"
              x2="100"
              y2="10"
              stroke="rgba(245,230,211,0.3)"
              strokeWidth="0.8"
            />
          </svg>
        </div>

        {/* Illuminated Front Edge Rim */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#a7c784] to-transparent shadow-[0_0_10px_rgba(141,165,91,0.65)]" />

        {/* 3D Glass Front Fascia (Vertical Slab Thickness ~36px with rounded bottom corners matching design) */}
        <div className="h-[36px] w-full rounded-b-2xl bg-gradient-to-b from-[#2b3c2f]/95 via-[#1f2b22]/95 to-[#141b16]/98 border-b border-l border-r border-beige/25 shadow-[0_14px_32px_rgba(0,0,0,0.6)]" />

        {/* Under-Ledge Diffuse Green Ambient Reflection */}
        <div className="absolute -bottom-1 inset-x-12 h-4 bg-gradient-to-r from-transparent via-mainGreen/30 to-transparent blur-md" />
      </div>

      {/* Mobile under-glow hairline */}
      <div
        className="md:hidden absolute bottom-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-mainGreen/50 to-transparent shadow-glow pointer-events-none"
        aria-hidden="true"
      />
    </motion.div>
  );
}

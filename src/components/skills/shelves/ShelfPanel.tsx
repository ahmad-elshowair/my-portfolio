"use client";

/* ─── Shelf Panel Component ──────────────────────────────────────────── */

import { Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ShelfCategoryId, SkillItem } from "@/definitions";
import { ShelfChip } from "./ShelfChip";

interface ShelfPanelProps {
  activeShelf: ShelfCategoryId;
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
 * 3D glass shelf pedestal on desktop and 2-column inline grid on mobile.
 */
export function ShelfPanel({
  activeShelf,
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
    <div
      id={id}
      role={role}
      aria-labelledby={ariaLabelledBy}
      tabIndex={tabIndex}
      className="relative rounded-3xl border border-beige/20 bg-black/20 backdrop-blur-md p-4 sm:p-6 md:border-none md:bg-transparent md:backdrop-blur-none md:p-0 md:shadow-none focus:outline-none"
    >
      {/* Mobile ambient glow */}
      <div
        className="md:hidden pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,_rgba(141,165,91,0.22)_0%,_rgba(141,165,91,0.06)_55%,_transparent_75%)] blur-lg"
        aria-hidden="true"
      />

      {/* Responsive chips layout with smooth in-place cross-fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeShelf}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="grid grid-cols-2 gap-2.5 md:flex md:flex-wrap md:justify-center md:gap-3 md:min-h-[92px]"
        >
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
        </motion.div>
      </AnimatePresence>

      {/* Desktop 3D shelf */}
      <div
        className="hidden md:block relative w-full mt-5 pointer-events-none select-none z-10"
        aria-hidden="true"
      >
        {/* Slanted top shelf surface */}
        <div className="relative h-2.5 w-full">
          {/* Back rim accent */}
          <div className="absolute top-0 inset-x-[7%] h-[2px] bg-gradient-to-r from-transparent via-[#b6db76] to-transparent shadow-[0_0_12px_#8DA55B,0_0_4px_#cbf084]" />

          {/* Glass top slope */}
          <div
            className="w-full h-full bg-gradient-to-b from-[#8DA55B]/25 via-[#233126]/60 to-[#18231c]/80 border-t border-beige/25"
            style={{
              clipPath: "polygon(7% 0%, 93% 0%, 100% 100%, 0% 100%)",
            }}
          />

          {/* Perspective corner bevels */}
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

        {/* Front ledge rim */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#a7c784] to-transparent shadow-[0_0_10px_rgba(141,165,91,0.65)]" />

        {/* Glass shelf face */}
        <div className="h-[36px] w-full rounded-b-2xl bg-gradient-to-b from-[#2b3c2f]/95 via-[#1f2b22]/95 to-[#141b16]/98 border-b border-l border-r border-beige/25 shadow-[0_14px_32px_rgba(0,0,0,0.6)]" />

        {/* Under-shelf reflection */}
        <div className="absolute -bottom-1 inset-x-12 h-4 bg-gradient-to-r from-transparent via-mainGreen/30 to-transparent blur-md" />
      </div>

      {/* Mobile under-glow hairline */}
      <div
        className="md:hidden absolute bottom-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-mainGreen/50 to-transparent shadow-glow pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}

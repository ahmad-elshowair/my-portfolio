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
 * Renders chips in a 2-column mobile grid with an inline row-split drawer slot,
 * and balanced centered rows on desktop with a glowing bottom hairline pedestal.
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
      className="relative rounded-2xl border border-beige/15 bg-mainGreen/10 backdrop-blur-md p-4 sm:p-6 focus:outline-none"
    >
      <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-center md:gap-2.5">
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

      {/* Pedestal bottom-edge gradient hairline + glow */}
      <div
        className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-mainGreen/50 to-transparent shadow-glow pointer-events-none"
        aria-hidden="true"
      />
    </motion.div>
  );
}

"use client";

import Iconify from "@/components/iconify";
import { SkillEvidence } from "@/components/skills/shared";
import {
  SKILL_CATEGORIES,
  skills,
} from "@/data";
import { usePrefersReducedMotion } from "@/hooks";
import { useSelectSkill, useSelectedSkillId } from "@/stores/skillsLabStore";
import type { SkillCategoryId, SkillItem } from "@/definitions";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const SHELVES: SkillCategoryId[] = ["frontend", "backend", "tools"];

/** Category shelves with proof tooltips — docked evidence card, tabbed shelves. */
export default function Concept013() {
  const [shelf, setShelf] = useState<SkillCategoryId>("frontend");
  const [docked, setDocked] = useState<string | null>(null);
  const selectedSkillId = useSelectedSkillId();
  const selectSkill = useSelectSkill();
  const prefersReducedMotion = usePrefersReducedMotion();
  const tabRefs = useRef<Partial<Record<SkillCategoryId, HTMLButtonElement | null>>>({});

  // Present any carried-over selection; hover/focus takes the dock when active.
  const dockedSkill =
    (docked ?? selectedSkillId) &&
    skills.find((s) => s.id === (docked ?? selectedSkillId));

  const shelfSkills = skills.filter((s) => s.category === shelf);
  const languages = skills.filter((s) => s.category === "languages");

  const handleTabKeys = (event: React.KeyboardEvent) => {
    const current = SHELVES.indexOf(shelf);
    let next: number;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (current + 1) % SHELVES.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (current - 1 + SHELVES.length) % SHELVES.length;
    } else {
      return;
    }
    event.preventDefault();
    setShelf(SHELVES[next]);
    tabRefs.current[SHELVES[next]]?.focus();
  };

  return (
    <div className="flex flex-col gap-6">
      <div
        role="tablist"
        aria-label="Skill shelves"
        onKeyDown={handleTabKeys}
        className="flex flex-wrap gap-2"
      >
        {SHELVES.map((category) => (
          <button
            key={category}
            ref={(el) => {
              tabRefs.current[category] = el;
            }}
            type="button"
            role="tab"
            aria-selected={shelf === category}
            tabIndex={shelf === category ? 0 : -1}
            onClick={() => setShelf(category)}
            className={cn(
              "min-h-[44px] rounded-full border px-4 py-2 text-sm capitalize transition-colors duration-200",
              shelf === category
                ? "border-mainGreen bg-mainGreen/20 font-semibold text-beige"
                : "border-beige/20 bg-beige/5 text-beige/80 hover:bg-beige/10",
            )}
          >
            {SKILL_CATEGORIES[category]}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        aria-label={`${SKILL_CATEGORIES[shelf]} skills`}
        className="flex flex-wrap gap-3"
      >
        {shelfSkills.map((skill) => (
          <SkillChip
            key={skill.id}
            skill={skill}
            selected={selectedSkillId === skill.id}
            reducedMotion={prefersReducedMotion}
            onSelect={() => selectSkill(skill.id)}
            onDock={() => setDocked(skill.id)}
            onUndock={() => setDocked(null)}
          />
        ))}
      </div>

      <p className="flex flex-wrap items-center gap-3 text-sm text-beige/80">
        <span className="text-beige/60">Languages:</span>
        {languages.map((skill) => (
          <span key={skill.id} className="font-medium">
            {skill.name}
          </span>
        ))}
      </p>

      {dockedSkill && <SkillEvidence skill={dockedSkill} announce />}
    </div>
  );
}

function SkillChip({
  skill,
  selected,
  reducedMotion,
  onSelect,
  onDock,
  onUndock,
}: {
  skill: SkillItem;
  selected: boolean;
  reducedMotion: boolean;
  onSelect: () => void;
  onDock: () => void;
  onUndock: () => void;
}) {
  return (
    <motion.button
      type="button"
      whileHover={reducedMotion ? undefined : { scale: 1.05 }}
      transition={{ duration: 0.2 }}
      onClick={onSelect}
      onMouseEnter={onDock}
      onMouseLeave={onUndock}
      onFocus={onDock}
      onBlur={onUndock}
      onKeyDown={(event) => {
        if (event.key === "Escape") onUndock();
      }}
      aria-pressed={selected}
      className={cn(
        "flex min-h-[44px] items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-colors duration-200 [&_svg]:text-xl",
        selected
          ? "border-mainGreen bg-mainGreen/20 text-beige shadow-[0_0_15px_rgba(141,165,91,0.25)]"
          : "border-beige/15 bg-beige/5 text-beige/90 hover:bg-beige/10",
      )}
    >
      <Iconify icon={skill.icon} className="h-[1em] w-[1em] shrink-0" />
      {skill.name}
    </motion.button>
  );
}

"use client";

/* ─── Skill Evidence Component ──────────────────────────────────────── */

import Iconify from "@/components/iconify";
import type { SkillItem } from "@/definitions";
import { cn } from "@/lib/utils";
import { ProjectPills } from "./ProjectPills";

interface SkillEvidenceProps {
  skill: SkillItem;
  announce?: boolean;
  className?: string;
  onPillClick?: () => void;
}

/**
 * Standard evidence presentation: glyph + verbatim name, context,
 * and project pills with honest resume fallback.
 */
export function SkillEvidence({
  skill,
  announce = false,
  className,
  onPillClick,
}: SkillEvidenceProps) {
  return (
    <div
      aria-live={announce ? "polite" : undefined}
      className={cn(
        "flex flex-col gap-2 rounded-lg border border-beige/15 bg-mainGreen/10 p-4 backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-lg text-beige *:shrink-0">
        <Iconify
          icon={skill.icon}
          className="text-2xl h-[1em] w-[1em] shrink-0"
        />
        <span className="font-medium">{skill.name}</span>
      </div>
      <p className="text-sm leading-relaxed text-beige/90">{skill.context}</p>
      {skill.projects.length > 0 ? (
        <ProjectPills ids={skill.projects} onPillClick={onPillClick} />
      ) : (
        <p className="text-xs text-beige/60">Verified in resume</p>
      )}
    </div>
  );
}

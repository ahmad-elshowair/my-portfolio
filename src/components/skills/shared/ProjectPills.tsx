"use client";

/* ─── Project Pills Component ───────────────────────────────────────── */

import { SKILL_PROJECTS } from "@/data";
import type { SkillProjectId } from "@/definitions";
import { cn } from "@/lib/utils";

interface ProjectPillsProps {
  ids: readonly SkillProjectId[];
  label?: string | null;
  className?: string;
  onPillClick?: () => void;
}

/**
 * Pill links that jump to cited project card anchors (#project-<anchor>).
 * Features ≥ 44px touch targets and an optional cross-glow selection callback.
 */
export function ProjectPills({
  ids,
  label = "Shipped in:",
  className,
  onPillClick,
}: ProjectPillsProps) {
  if (ids.length === 0) return null;
  return (
    <span className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {label && <span className="text-xs text-beige/70">{label}</span>}
      {ids.map((id) => (
        <a
          key={id}
          href={`#project-${SKILL_PROJECTS[id].anchor}`}
          onClick={onPillClick}
          className="min-h-11 inline-flex items-center rounded-full border border-mainGreen/40 bg-mainGreen/20 px-3 py-1.5 text-xs text-beige transition-colors hover:bg-mainGreen/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainGreen"
        >
          {SKILL_PROJECTS[id].name}
          <span className="sr-only"> — jump to project card</span>
        </a>
      ))}
    </span>
  );
}

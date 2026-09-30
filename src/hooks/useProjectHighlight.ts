"use client";

import type { SkillProjectId } from "@/definitions";
import { useHighlightedProjectIds } from "@/stores/skillsLabStore";

/**
 * Consumer adapter over the lab store: reports whether the project with this
 * anchor is in the current highlight payload (the proof-map cross-glow).
 * False when the card has no anchor or nothing is highlighted.
 */
export function useProjectHighlight(anchorId?: string): boolean {
  const highlighted = useHighlightedProjectIds();
  return (
    !!anchorId &&
    !!highlighted &&
    highlighted.includes(anchorId as SkillProjectId)
  );
}

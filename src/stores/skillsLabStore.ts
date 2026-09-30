"use client";

import type { ConceptId, SkillProjectId } from "@/definitions";
import { skills } from "@/data";
import { create } from "zustand";

/**
 * The shared lab state — one store owns the evaluation subject and the
 * cross-page highlight.
 *
 * Ownership rule: the SkillsSection host is the only writer of `conceptId`
 * and the clearer of highlights; variants read selection and call
 * `selectSkill`. "Selection is shared; interaction is local" — the selection
 * survives concept switches (the host remounts the variant, not the store),
 * while variant-local chrome resets naturally with the remount.
 *
 * SSR safety: initial state is static (no selection, no host), and writes
 * happen only from client effects and event handlers — never during render —
 * so a module-level store cannot leak state across server requests.
 */

interface SkillsLabState {
  /** Which concept is mounted; null before the host mounts. Informational. */
  conceptId: ConceptId | null;
  /** The shared evaluation subject; survives concept switches. */
  selectedSkillId: string | null;
  /** Projects whose cards cross-glow; derived from the selection, cleared on switch. */
  highlightedProjectIds: readonly SkillProjectId[] | null;
  /** Host-only: mount a concept and clear the cross-glow centrally. */
  setConcept: (id: ConceptId) => void;
  /** Set the shared selection; derives the highlighted projects. */
  selectSkill: (id: string | null) => void;
}

export const useSkillsLabStore = create<SkillsLabState>((set) => ({
  conceptId: null,
  selectedSkillId: null,
  highlightedProjectIds: null,

  setConcept: (id) => set({ conceptId: id, highlightedProjectIds: null }),

  selectSkill: (id) =>
    set({
      selectedSkillId: id,
      highlightedProjectIds: id
        ? (skills.find((skill) => skill.id === id)?.projects ?? null)
        : null,
    }),
}));

/* Selector hooks — each consumer subscribes to exactly the slice it needs. */

export const useLabConceptId = () => useSkillsLabStore((s) => s.conceptId);
export const useSetLabConcept = () => useSkillsLabStore((s) => s.setConcept);
export const useSelectedSkillId = () =>
  useSkillsLabStore((s) => s.selectedSkillId);
export const useSelectSkill = () => useSkillsLabStore((s) => s.selectSkill);
export const useHighlightedProjectIds = () =>
  useSkillsLabStore((s) => s.highlightedProjectIds);

// Consumer adapters live in src/hooks/ (e.g. useProjectHighlight for the
// ProjectCard cross-glow ring) — they compose these primitive selectors.

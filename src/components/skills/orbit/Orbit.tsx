"use client";

import { SkillEvidence } from "@/components/skills/shared";
import { SKILL_CATEGORIES, skills } from "@/data";
import {
  useDesktopViewport,
  useFinePointer,
  usePrefersReducedMotion,
} from "@/hooks";
import { useSelectSkill, useSelectedSkillId } from "@/stores/skillsLabStore";
import { ORBIT_RINGS } from "@/definitions";
import { OrbitStage } from "./Stage";
import { StaticGrid } from "./StaticGrid";

/**
 * Orbit constellation. Concentric category rings (tools inner, front-end
 * middle, back-end outer) carry icon-only satellites on a tilted pure-CSS 3D
 * plane around the candidate orb on desktop; a static grouped grid renders
 * everywhere else. The ambient gate is three-condition and fails closed —
 * when it closes, the interactive stage (and every interaction with it)
 * tears down cleanly while the shared selection survives in the lab store.
 */

export default function Orbit() {
  const selectedSkillId = useSelectedSkillId();
  const selectSkill = useSelectSkill();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDesktopViewport = useDesktopViewport();
  const hasFinePointer = useFinePointer();
  // Ambient motion gate (Article IX v1.4.0): desktop + fine pointer + motion
  // allowed — fails closed on every other environment.
  const useOrbit = isDesktopViewport && hasFinePointer && !prefersReducedMotion;

  const selected = selectedSkillId
    ? skills.find((s) => s.id === selectedSkillId)
    : undefined;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center gap-4 text-xs text-beige/60">
        {ORBIT_RINGS.map(({ id, category }) => (
          <span key={id} className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full border border-mainGreen"
            />
            {SKILL_CATEGORIES[category]}
          </span>
        ))}
      </div>

      {useOrbit ? (
        <OrbitStage
          selectedSkillId={selectedSkillId}
          selectSkill={selectSkill}
        />
      ) : (
        <StaticGrid
          selectedSkillId={selectedSkillId}
          onSelectSkill={selectSkill}
        />
      )}

      {/* The orbit's HUD column is the live announcer; this shared block stays
          live only on the static variant, where it IS the HUD — one
          announcement per change, never two. */}
      <div aria-live={useOrbit ? undefined : "polite"}>
        {selected ? (
          <SkillEvidence skill={selected} />
        ) : (
          <p className="text-sm text-beige/60">
            Focus or select a satellite to spotlight its evidence.
          </p>
        )}
      </div>
    </div>
  );
}

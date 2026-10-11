"use client";

import { SKILL_CATEGORIES, skills } from "@/data";
import {
  useDesktopViewport,
  useFinePointer,
  usePrefersReducedMotion,
  useSkillsSectionActive,
} from "@/hooks";
import { useSelectSkill, useSelectedSkillId } from "@/stores/skillsLabStore";
import { ORBIT_RINGS } from "@/definitions";
import { OrbitStage } from "./Stage";
import { StaticGrid } from "./StaticGrid";
import { MobileEvidenceSheet } from "./MobileEvidenceSheet";

/** Skills section orchestrator: desktop 3D orbit constellation with static grid mobile fallback. */
export default function Orbit() {
  const selectedSkillId = useSelectedSkillId();
  const selectSkill = useSelectSkill();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDesktopViewport = useDesktopViewport();
  const hasFinePointer = useFinePointer();
  const inSkillsSection = useSkillsSectionActive();

  // Desktop with mouse pointer and motion allowed
  const useOrbit = isDesktopViewport && hasFinePointer && !prefersReducedMotion;

  const selected = selectedSkillId
    ? skills.find((s) => s.id === selectedSkillId)
    : undefined;

  const showMobileSheet = !useOrbit && Boolean(selected) && inSkillsSection;

  return (
    <div className="flex flex-col gap-6">
      {/* Category ring legend (desktop only) */}
      {useOrbit && (
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
      )}

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

      <MobileEvidenceSheet
        skill={selected}
        isVisible={showMobileSheet}
        onClose={() => selectSkill(null)}
      />
    </div>
  );
}

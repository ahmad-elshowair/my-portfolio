"use client";

import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SkillEvidence } from "@/components/skills/shared";
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
  const inSkillsSection = useSkillsSectionActive();

  // Ambient motion gate (Article IX v1.4.0): desktop + fine pointer + motion
  // allowed — fails closed on every other environment.
  const useOrbit = isDesktopViewport && hasFinePointer && !prefersReducedMotion;

  const selected = selectedSkillId
    ? skills.find((s) => s.id === selectedSkillId)
    : undefined;

  const showMobileSheet = !useOrbit && Boolean(selected) && inSkillsSection;

  return (
    <div className="flex flex-col gap-6">
      {/* Category ring legend: rendered exclusively on desktop orbit mode */}
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

      {/* Mobile Floating Evidence Sheet:
          - Docks comfortably in the natural thumb zone when a skill is tapped.
          - Enters with a smooth, refined animation curve (380ms easeOut).
          - Automatically fades out when scrolling outside the skills section or dismissed. */}
      {typeof document !== "undefined" &&
        !useOrbit &&
        createPortal(
          <AnimatePresence>
            {showMobileSheet && selected && (
              <motion.div
                key="mobile-skill-sheet"
                aria-live="polite"
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 36, scale: 0.95 }
                }
                animate={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 1, y: 0, scale: 1 }
                }
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        y: 28,
                        scale: 0.95,
                        transition: { duration: 0.25, ease: "easeIn" },
                      }
                }
                transition={{
                  duration: prefersReducedMotion ? 0.15 : 0.38,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="fixed bottom-4 left-4 right-4 z-[90] mx-auto max-w-lg"
              >
                <div className="relative rounded-xl border border-beige/25 bg-bgGreen/95 p-4 pr-10 shadow-[0_12px_36px_rgba(0,0,0,0.6)] backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => selectSkill(null)}
                    aria-label="Close evidence preview"
                    className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-beige/60 transition-colors hover:bg-beige/10 hover:text-beige focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainGreen"
                  >
                    <span aria-hidden="true" className="text-base leading-none">✕</span>
                  </button>
                  <motion.div
                    key={selected.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SkillEvidence
                      skill={selected}
                      className="border-0 bg-transparent p-0 shadow-none"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

"use client";

import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SkillEvidence } from "@/components/skills/shared";
import type { SkillItem } from "@/definitions";
import { usePrefersReducedMotion } from "@/hooks";

interface MobileEvidenceSheetProps {
  skill: SkillItem | undefined;
  isVisible: boolean;
  onClose: () => void;
}

/** Floating bottom evidence drawer for mobile viewports. */
export function MobileEvidenceSheet({
  skill,
  isVisible,
  onClose,
}: MobileEvidenceSheetProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isVisible && skill && (
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
              onClick={onClose}
              aria-label="Close evidence preview"
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-beige/60 transition-colors hover:bg-beige/10 hover:text-beige focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainGreen"
            >
              <span aria-hidden="true" className="text-base leading-none">
                ✕
              </span>
            </button>
            <motion.div
              key={skill.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <SkillEvidence
                skill={skill}
                className="border-0 bg-transparent p-0 shadow-none"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

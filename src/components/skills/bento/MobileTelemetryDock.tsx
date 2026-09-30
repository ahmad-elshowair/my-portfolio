"use client";

import { SkillGlyph } from "@/components/skills/shared";
import type { SkillItem } from "@/definitions";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { statusBadge } from "./bento.constants";
import { ProjectJumpPill } from "./ProjectJumpPill";

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export interface MobileTelemetryDockProps {
  skill: SkillItem;
}

/**
 * Mobile Floating Telemetry Dock & Drawer (< lg).
 * Renders anchored at the bottom viewport, providing instant feedback on every chip selection
 * with an expandable slide-up bottom sheet for the complete production proof.
 */
export function MobileTelemetryDock({ skill }: MobileTelemetryDockProps) {
  const isClient = useIsClient();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isExpanded, setIsExpanded] = useState(false);
  const [inSkillsSection, setInSkillsSection] = useState(true);
  const status = statusBadge(skill);

  useEffect(() => {
    const el = document.getElementById("skills");
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInSkillsSection(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Close sheet on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsExpanded(false);
    }
    if (isExpanded) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isExpanded]);

  // Lock background scroll when drawer is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isExpanded]);

  if (!isClient) return null;

  return createPortal(
    <div className="lg:hidden">
      {/* Floating Bottom Dock (Minimized Peek Pill) */}
      <div
        className={cn(
          "fixed bottom-4 inset-x-4 sm:inset-x-8 z-50 transition-all duration-300 ease-out",
          inSkillsSection
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0 pointer-events-none",
        )}
      >
        <div
          role="region"
          aria-label="Active Skill Telemetry"
          className="flex items-center justify-between gap-3 rounded-2xl border border-beige/20 bg-[#2c3531]/95 p-2.5 sm:p-3 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-200"
        >
          {/* Left: Tap to open proof details */}
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            aria-expanded={isExpanded}
            aria-controls="mobile-telemetry-sheet"
            className="flex min-w-0 flex-1 items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainGreen rounded-xl p-1 active:scale-[0.98] transition-transform"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-beige/10 bg-beige/5">
              <SkillGlyph
                skill={skill}
                className="text-mainGreen text-xl [&_svg]:text-xl shrink-0"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-inika font-bold text-beige text-sm sm:text-base truncate">
                  {skill.name}
                </span>
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full shrink-0",
                    status === "Core Daily Stack"
                      ? "bg-mainGreen shadow-[0_0_6px_#8DA55B]"
                      : status === "Production Deployed"
                        ? "bg-mainGreen/70"
                        : "bg-beige/60",
                  )}
                  aria-hidden="true"
                />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-beige/60 truncate">
                {status} · {skill.category}
              </span>
            </div>
          </button>

          {/* Right: Explicit Proof button */}
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
            aria-controls="mobile-telemetry-sheet"
            aria-label={`View proof details for ${skill.name}`}
            className="flex min-h-[44px] items-center gap-1.5 rounded-xl border border-mainGreen/40 bg-mainGreen/20 px-3.5 py-1.5 text-xs font-semibold text-beige transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainGreen shrink-0"
          >
            <span>Proof</span>
            <span
              className={cn(
                "text-mainGreen transition-transform duration-200 text-xs",
                isExpanded ? "rotate-180" : "rotate-0",
              )}
              aria-hidden="true"
            >
              ▲
            </span>
          </button>
        </div>
      </div>

      {/* Expanded Bottom Sheet Drawer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id="mobile-telemetry-sheet"
            role="dialog"
            aria-modal="true"
            aria-label={`${skill.name} Telemetry Proof`}
            className="fixed inset-0 z-50 flex flex-col justify-end"
          >
            {/* Dimmed Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsExpanded(false)}
              aria-hidden="true"
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Sheet Body */}
            <motion.div
              initial={{
                y: prefersReducedMotion ? 0 : "100%",
                opacity: prefersReducedMotion ? 0 : 1,
              }}
              animate={{ y: 0, opacity: 1 }}
              exit={{
                y: prefersReducedMotion ? 0 : "100%",
                opacity: prefersReducedMotion ? 0 : 1,
              }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.15 }
                  : { type: "spring", damping: 32, stiffness: 340, mass: 0.8 }
              }
              className="relative z-10 max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-beige/20 bg-[#2c3531]/95 p-5 pb-8 backdrop-blur-2xl shadow-[0_-12px_48px_rgba(0,0,0,0.6)] flex flex-col gap-4"
            >
              {/* Grab handle */}
              <div
                className="mx-auto h-1 w-10 rounded-full bg-beige/30"
                aria-hidden="true"
              />

              {/* Header */}
              <div className="flex items-center justify-between border-b border-beige/10 pb-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-mainGreen">
                  Telemetry HUD · Live Proof
                </span>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-mainGreen/40 bg-mainGreen/20 px-2.5 py-0.5 text-xs font-semibold text-beige">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full shrink-0",
                        status === "Core Daily Stack"
                          ? "bg-mainGreen shadow-[0_0_6px_#8DA55B]"
                          : status === "Production Deployed"
                            ? "bg-mainGreen/70"
                            : "bg-beige/60",
                      )}
                      aria-hidden="true"
                    />
                    <span>{status}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsExpanded(false)}
                    aria-label="Close telemetry proof"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-beige/15 bg-beige/5 text-beige/80 hover:text-beige hover:bg-beige/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainGreen"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Skill Identity: 32px Glyph + Inika Title */}
              <div className="flex items-center gap-3 min-w-0">
                <SkillGlyph
                  skill={skill}
                  className="text-mainGreen text-[2rem] [&_svg]:text-[2rem] shrink-0"
                />
                <div className="flex flex-col min-w-0 flex-1">
                  <h4 className="font-inika text-2xl font-bold tracking-tight text-beige truncate">
                    {skill.name}
                  </h4>
                  <span className="text-xs font-mono uppercase tracking-wider text-beige/60">
                    {skill.category} Engineering
                  </span>
                </div>
              </div>

              {/* Verbatim Resume Proof Statement */}
              <div className="rounded-xl border border-beige/10 bg-beige/5 p-3.5 break-words">
                <p className="text-[11px] font-mono uppercase tracking-wider text-beige/50 mb-1">
                  Production Proof & Context
                </p>
                <p className="text-sm leading-relaxed text-beige/90">
                  {skill.context}
                </p>
              </div>

              {/* Verifiable Project Links */}
              <div className="flex flex-col gap-2 pt-1">
                {skill.projects.length > 0 ? (
                  <>
                    <span className="text-xs font-mono uppercase tracking-wider text-beige/70">
                      Shipped In:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {skill.projects.map((projId) => (
                        <div
                          key={projId}
                          onClick={() => setIsExpanded(false)}
                        >
                          <ProjectJumpPill projectId={projId} />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-beige/60 italic leading-relaxed">
                    Verified in resume — foundational competency without
                    dedicated project case study.
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document.body,
  );
}

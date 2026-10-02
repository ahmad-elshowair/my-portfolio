"use client";

import Iconify from "@/components/iconify";
import { SkillEvidence } from "@/components/skills/shared";
import { SKILL_CATEGORIES, skills } from "@/data";
import { useDesktopViewport, usePrefersReducedMotion } from "@/hooks";
import { useSelectSkill, useSelectedSkillId } from "@/stores/skillsLabStore";
import { AnimatePresence, useAnimationFrame, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Spring physics playground. The static grid is the SSR baseline and the
 * fallback; repulsion activates only on desktop, fine pointers, and without
 * a reduced-motion preference. Motion budget: translation-only springs with
 * a ≤ 8px idle drift — scale never exceeds the 1.05 hover token and the
 * flip is a 200ms crossfade.
 */

const REPULSION_RADIUS = 120;
const REPULSION_STRENGTH = 26;
const MAX_DISPLACEMENT = 32;
const DRIFT_AMPLITUDE = 8;
const STIFFNESS = 0.08;
const DAMPING = 0.82;

interface ChipState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  cx: number;
  cy: number;
}

export default function Concept015() {
  const selectedSkillId = useSelectedSkillId();
  const selectSkill = useSelectSkill();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDesktopViewport = useDesktopViewport();

  const fieldRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const chipState = useRef<ChipState[]>([]);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const [detail, setDetail] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // Lazy client-only probe: markup never depends on it, so hydration is safe.
  const [finePointer] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches,
  );
  const physicsOn = isDesktopViewport && !prefersReducedMotion && finePointer;

  const selected = selectedSkillId ? skills.find((s) => s.id === selectedSkillId) : undefined;

  useEffect(() => {
    if (physicsOn) {
      // Cache untransformed centers once; transforms then compose on top.
      chipState.current = chipRefs.current.map((el) => {
        const rect = el?.getBoundingClientRect();
        return rect
          ? { x: 0, y: 0, vx: 0, vy: 0, cx: rect.left + rect.width / 2, cy: rect.top + rect.height / 2 }
          : { x: 0, y: 0, vx: 0, vy: 0, cx: 0, cy: 0 };
      });
    } else {
      chipState.current = [];
      chipRefs.current.forEach((el) => el && (el.style.transform = ""));
    }
  }, [physicsOn]);

  // Dialog focus management: focus moves in on open and back to the
  // triggering chip on close (any close path).
  useEffect(() => {
    if (detail) closeRef.current?.focus();
    else triggerRef.current?.focus();
  }, [detail]);

  useAnimationFrame((time) => {
    if (!physicsOn) return;
    const pointerPos = pointer.current;

    chipRefs.current.forEach((el, i) => {
      if (!el) return;
      const state = chipState.current[i];
      if (!state) return;

      // Idle drift around rest, always inside the amplitude budget.
      let tx = Math.sin(time / 1300 + i * 1.3) * DRIFT_AMPLITUDE;
      let ty = Math.cos(time / 1700 + i * 1.7) * DRIFT_AMPLITUDE;

      if (pointerPos) {
        const dx = state.cx + state.x - pointerPos.x;
        const dy = state.cy + state.y - pointerPos.y;
        const distance = Math.hypot(dx, dy);
        if (distance < REPULSION_RADIUS && distance > 0.01) {
          const force =
            (1 - distance / REPULSION_RADIUS) * REPULSION_STRENGTH;
          tx += (dx / distance) * force;
          ty += (dy / distance) * force;
        }
      }

      state.vx = (state.vx + (tx - state.x) * STIFFNESS) * DAMPING;
      state.vy = (state.vy + (ty - state.y) * STIFFNESS) * DAMPING;
      state.x = Math.max(-MAX_DISPLACEMENT, Math.min(MAX_DISPLACEMENT, state.x + state.vx));
      state.y = Math.max(-MAX_DISPLACEMENT, Math.min(MAX_DISPLACEMENT, state.y + state.vy));
      el.style.transform = `translate(${state.x.toFixed(1)}px, ${state.y.toFixed(1)}px)`;
    });
  });

  return (
    <div className="flex flex-col gap-6">
      <div
        ref={fieldRef}
        onPointerMove={(event) => {
          pointer.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerLeave={() => {
          pointer.current = null;
        }}
        className="relative flex min-h-[28rem] flex-wrap content-start gap-3"
      >
        {skills.map((skill, index) => (
          <button
            key={skill.id}
            ref={(el) => {
              chipRefs.current[index] = el;
            }}
            type="button"
            aria-pressed={selectedSkillId === skill.id}
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              selectSkill(skill.id);
              setDetail(skill.id);
            }}
            className={cn(
              "flex min-h-[44px] items-center gap-2 rounded-xl border px-3 py-1.5 text-sm transition-colors duration-200 will-change-transform [&_svg]:text-lg",
              selectedSkillId === skill.id
                ? "border-mainGreen bg-mainGreen/25 text-beige"
                : "border-beige/15 bg-beige/5 text-beige/90 hover:bg-beige/10",
            )}
          >
            <Iconify icon={skill.icon} className="h-[1em] w-[1em] shrink-0" />
            {skill.name}
          </button>
        ))}

        <AnimatePresence>
          {detail && (() => {
            const skill = skills.find((s) => s.id === detail);
            if (!skill) return null;
            return (
              <motion.div
                key="detail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 z-10 flex items-center justify-center bg-bgGreen/85 p-6 backdrop-blur-sm"
                onClick={() => setDetail(null)}
              >
                <div
                  ref={dialogRef}
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${skill.name} details`}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setDetail(null);
                      return;
                    }
                    if (event.key !== "Tab") return;
                    // Trap focus inside the dialog while it is open.
                    const focusables =
                      dialogRef.current?.querySelectorAll<HTMLElement>(
                        "button, a[href]",
                      ) ?? [];
                    if (focusables.length === 0) return;
                    const first = focusables[0];
                    const last = focusables[focusables.length - 1];
                    if (event.shiftKey && document.activeElement === first) {
                      event.preventDefault();
                      last.focus();
                    } else if (
                      !event.shiftKey &&
                      document.activeElement === last
                    ) {
                      event.preventDefault();
                      first.focus();
                    }
                  }}
                  className="max-w-md"
                >
                  <SkillEvidence skill={skill} announce />
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={() => setDetail(null)}
                    className="mt-3 min-h-[44px] rounded-full border border-beige/20 px-4 py-2 text-sm text-beige/85 transition-colors duration-200 hover:bg-beige/10"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>

      <p aria-live="polite" className="text-sm text-beige/60">
        {selected
          ? `Selected: ${selected.name} — ${selected.context}`
          : `Field of ${skills.length} skills across ${Object.keys(SKILL_CATEGORIES).length} categories — click any chip to flip its details.`}
      </p>
    </div>
  );
}

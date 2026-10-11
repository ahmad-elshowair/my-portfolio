"use client";

import { SkillEvidence } from "@/components/skills/shared";
import { skills } from "@/data";
import { ORBIT_RINGS } from "@/definitions";
import {
  ORBIT_KEYFRAMES,
  PLANE_TILT_DEG,
  RING_OUTER,
  satellitesOf,
} from "./motion";
import { CoreOrb } from "./CoreOrb";
import { OrbitRing } from "./OrbitRing";
import { OrbitTooltip, type SpotlightState } from "./OrbitTooltip";
import { useOrbitAnimation } from "./useOrbitAnimation";
import type { CSSProperties } from "react";
import {
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  useRef,
  useState,
} from "react";

interface OrbitStageProps {
  selectedSkillId?: string | null;
  selectSkill?: (id: string | null) => void;
}

/** Interactive desktop 3D orbit constellation stage. */
export function OrbitStage({
  selectedSkillId = null,
  selectSkill = () => {},
}: OrbitStageProps = {}) {
  const { rotatorRefs, pauseRing, resumeRing } = useOrbitAnimation();

  const tipDismissedFor = useRef<string | null>(null);
  const [spotlight, setSpotlight] = useState<SpotlightState | null>(null);

  const chipFrom = (target: EventTarget | null): HTMLElement | null =>
    target instanceof HTMLElement
      ? target.closest<HTMLElement>(".orbit-sat")
      : null;

  const onStagePointerOver = (event: PointerEvent<HTMLDivElement>) => {
    const chip = chipFrom(event.target);
    if (!chip) return;
    const ring = chip.dataset.ring;
    const id = chip.dataset.skillId ?? null;
    if (!ring || !id) return;

    tipDismissedFor.current = null;
    pauseRing(ring, "hover");
    setSpotlight({ id, name: chip.getAttribute("aria-label") ?? id });
  };

  const onStagePointerOut = (event: PointerEvent<HTMLDivElement>) => {
    const chip = chipFrom(event.target);
    if (!chip) return;
    const next = chipFrom(event.relatedTarget);
    if (next === chip) return;

    const nextRing = next?.dataset.ring ?? null;
    const nextId = next?.dataset.skillId ?? null;

    resumeRing("hover", nextRing);

    if (next && nextId && tipDismissedFor.current !== nextId) {
      setSpotlight({ id: nextId, name: next.getAttribute("aria-label") ?? nextId });
    } else {
      setSpotlight(null);
    }
  };

  const onStageFocus = (event: FocusEvent<HTMLDivElement>) => {
    const chip = chipFrom(event.target);
    if (!chip) return;
    const ring = chip.dataset.ring;
    const id = chip.dataset.skillId ?? null;
    if (!ring || !id) return;

    tipDismissedFor.current = null;
    pauseRing(ring, "focus");
    setSpotlight({ id, name: chip.getAttribute("aria-label") ?? id });
  };

  const onStageBlur = (event: FocusEvent<HTMLDivElement>) => {
    const chip = chipFrom(event.target);
    if (!chip) return;
    const next = chipFrom(event.relatedTarget);
    const nextRing = next?.dataset.ring ?? null;
    const nextId = next?.dataset.skillId ?? null;

    resumeRing("focus", nextRing);

    if (next && nextId && tipDismissedFor.current !== nextId) {
      setSpotlight({ id: nextId, name: next.getAttribute("aria-label") ?? nextId });
    } else {
      setSpotlight(null);
    }
  };

  const onStageKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape" || !spotlight) return;
    tipDismissedFor.current = spotlight.id;
    setSpotlight(null);
  };

  const selected = selectedSkillId
    ? skills.find((s) => s.id === selectedSkillId)
    : undefined;
  const hudSkill =
    skills.find((s) => s.id === (spotlight?.id ?? selectedSkillId)) ?? selected;
  const activeRingCategory = hudSkill?.category;

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <style>{ORBIT_KEYFRAMES}</style>

      <div className="w-full">
        <div
          onPointerOver={onStagePointerOver}
          onPointerOut={onStagePointerOut}
          onFocus={onStageFocus}
          onBlur={onStageBlur}
          onKeyDown={onStageKeyDown}
          className="pointer-events-none relative mx-auto h-[22rem] w-full max-w-4xl [container-type:inline-size] [perspective:1500px] [transform-style:preserve-3d]"
          style={{ "--ring-outer": RING_OUTER } as CSSProperties}
        >
          {/* Tilted 3D orbital plane */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
            style={
              {
                width: "var(--ring-outer)",
                height: "var(--ring-outer)",
                transform: `translate(-50%, -50%) rotateX(${PLANE_TILT_DEG}deg)`,
              } as CSSProperties
            }
          >
            {ORBIT_RINGS.map((ring) => (
              <OrbitRing
                key={ring.id}
                ring={ring}
                isActive={ring.category === activeRingCategory}
                selectedSkillId={selectedSkillId}
                onSelectSkill={selectSkill}
                setRotatorRef={(el) => {
                  if (el) rotatorRefs.current.set(ring.id, el);
                  else rotatorRefs.current.delete(ring.id);
                }}
              />
            ))}
          </div>

          <CoreOrb />
        </div>

        <p className="mt-4 flex flex-wrap justify-center gap-x-4 text-sm text-beige/70">
          {satellitesOf("languages", 0).map(({ skill }) => (
            <span key={skill.id} className="font-medium">
              {skill.context}
            </span>
          ))}
        </p>
      </div>

      {/* Docked bottom evidence HUD */}
      <div aria-live="polite" className="w-full max-w-2xl">
        {hudSkill ? (
          <SkillEvidence
            key={hudSkill.id}
            skill={hudSkill}
            className="animate-in fade-in duration-200 motion-reduce:animate-none shadow-[0_0_24px_rgba(141,165,91,0.12)]"
          />
        ) : (
          <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-beige/20 bg-mainGreen/5 p-4 text-center text-sm text-beige/50 backdrop-blur-md">
            <span aria-hidden="true" className="text-mainGreen/70">
              ✦
            </span>
            <span>Focus or select a satellite to spotlight its evidence.</span>
          </div>
        )}
      </div>

      <OrbitTooltip spotlight={spotlight} />
    </div>
  );
}

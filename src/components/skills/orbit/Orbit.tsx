"use client";

import { SkillEvidence } from "@/components/skills/shared";
import { SKILL_CATEGORIES, skills } from "@/data";
import { AUTHOR } from "@/lib/site";
import { useDesktopViewport, useFinePointer, usePrefersReducedMotion } from "@/hooks";
import { useSelectSkill, useSelectedSkillId } from "@/stores/skillsLabStore";
import { ORBIT_RINGS } from "@/definitions";
import {
  MARKER_COUNT,
  ORBIT_KEYFRAMES,
  PLANE_TILT_DEG,
  RAMP_MS,
  RING_OUTER,
  depthDelaySeconds,
  satellitesOf,
  spinFor,
} from "./motion";
import { SatelliteChip } from "./Chips";
import { StaticGrid } from "./StaticGrid";
import type { CSSProperties } from "react";
import {
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

/**
 * Orbit constellation. Concentric category rings (tools inner, front-end
 * middle, back-end outer) carry icon-only satellites on a tilted pure-CSS 3D
 * plane around the candidate orb on desktop; a static grouped grid renders
 * everywhere else. Rings rotate on the GPU compositor; hovering or focusing
 * a satellite decelerates its ring to a stop (~300ms ambient ramp) while a
 * name tooltip and the Spotlight HUD present the evidence payload.
 */

interface SpotlightState {
  id: string;
  name: string;
  /** Chip center x and top edge in viewport coordinates, captured at open. */
  cx: number;
  top: number;
  ready: boolean;
}

export default function Concept016() {
  const selectedSkillId = useSelectedSkillId();
  const selectSkill = useSelectSkill();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDesktopViewport = useDesktopViewport();
  const hasFinePointer = useFinePointer();
  // Ambient motion gate (Article IX v1.4.0): desktop + fine pointer + motion
  // allowed — fails closed on every other environment.
  const useOrbit = isDesktopViewport && hasFinePointer && !prefersReducedMotion;

  const selected = selectedSkillId ? skills.find((s) => s.id === selectedSkillId) : undefined;

  // ---- Deceleration & spotlight (orbit branch only) ----------------------
  // Animations are read once per interaction via the ring rotator refs, then
  // ramped on cached handles; steady-state rotation never touches JS.
  const rotatorRefs = useRef(new Map<string, HTMLDivElement>());
  const ringAnimations = useRef(new Map<string, Animation[]>());
  const rampLoops = useRef(new Map<string, number>());
  const ringRates = useRef(new Map<string, number>());
  const hoveredRing = useRef<string | null>(null);
  const focusedRing = useRef<string | null>(null);
  const hoveredChip = useRef<HTMLElement | null>(null);
  const focusedChip = useRef<HTMLElement | null>(null);
  const tipDismissedFor = useRef<string | null>(null);
  const [spotlight, setSpotlight] = useState<SpotlightState | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);

  useEffect(
    () => () => {
      rampLoops.current.forEach((handle) => cancelAnimationFrame(handle));
      ringAnimations.current.clear();
    },
    [],
  );

  const rampRing = (ring: string, targetRate: number) => {
    cancelAnimationFrame(rampLoops.current.get(ring) ?? 0);
    const rotator = rotatorRefs.current.get(ring);
    if (!rotator) return;
    let animations = ringAnimations.current.get(ring);
    if (!animations || animations.some((a) => a.playState === "idle")) {
      animations = rotator.getAnimations({ subtree: true });
      ringAnimations.current.set(ring, animations);
    }
    const startRate = ringRates.current.get(ring) ?? 1;
    let startedAt = -1;
    const step = (now: number) => {
      if (startedAt < 0) startedAt = now;
      const progress = Math.min((now - startedAt) / RAMP_MS, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      const rate = startRate + (targetRate - startRate) * eased;
      animations.forEach((a) => a.updatePlaybackRate(rate));
      ringRates.current.set(ring, rate);
      if (progress < 1) {
        rampLoops.current.set(ring, requestAnimationFrame(step));
      } else {
        animations.forEach((a) => a.updatePlaybackRate(targetRate));
        ringRates.current.set(ring, targetRate);
        rampLoops.current.delete(ring);
      }
    };
    rampLoops.current.set(ring, requestAnimationFrame(step));
  };

  // A ring resumes only when its interaction fully ends — pointer-leave AND
  // blur have both released it (never either alone while focus is held).
  const settleRing = (ring: string) => {
    if (hoveredRing.current !== ring && focusedRing.current !== ring) {
      rampRing(ring, 1);
    }
  };

  const chipFrom = (target: EventTarget | null): HTMLElement | null =>
    target instanceof HTMLElement ? target.closest<HTMLElement>(".orbit-sat") : null;

  // Spotlight subject: the focused chip wins over the hovered one; both the
  // tooltip and the HUD preview ride this single state.
  const syncSpotlight = () => {
    const chip = focusedChip.current ?? hoveredChip.current;
    const id = chip?.dataset.skillId ?? null;
    if (!chip || !id || tipDismissedFor.current === id) {
      setSpotlight(null);
      return;
    }
    setSpotlight((current) => {
      if (current?.id === id) return current;
      const rect = chip.getBoundingClientRect();
      return {
        id,
        name: chip.getAttribute("aria-label") ?? id,
        cx: rect.left + rect.width / 2,
        top: rect.top,
        ready: false,
      };
    });
  };

  const onStagePointerOver = (event: PointerEvent<HTMLDivElement>) => {
    const chip = chipFrom(event.target);
    if (!chip) return;
    const ring = chip.dataset.ring;
    if (!ring) return;
    hoveredChip.current = chip;
    hoveredRing.current = ring;
    tipDismissedFor.current = null;
    rampRing(ring, 0);
    syncSpotlight();
  };

  const onStagePointerOut = (event: PointerEvent<HTMLDivElement>) => {
    const chip = chipFrom(event.target);
    if (!chip) return;
    const next = chipFrom(event.relatedTarget);
    if (next === chip) return;
    if (next) {
      const ring = next.dataset.ring;
      hoveredChip.current = next;
      if (ring && hoveredRing.current !== ring) {
        const previous = hoveredRing.current;
        hoveredRing.current = ring;
        if (previous) settleRing(previous);
        rampRing(ring, 0);
      }
    } else {
      hoveredChip.current = null;
      const previous = hoveredRing.current;
      hoveredRing.current = null;
      if (previous) settleRing(previous);
    }
    syncSpotlight();
  };

  const onStageFocus = (event: FocusEvent<HTMLDivElement>) => {
    const chip = chipFrom(event.target);
    if (!chip) return;
    const ring = chip.dataset.ring;
    if (!ring) return;
    focusedChip.current = chip;
    focusedRing.current = ring;
    tipDismissedFor.current = null;
    rampRing(ring, 0);
    syncSpotlight();
  };

  const onStageBlur = (event: FocusEvent<HTMLDivElement>) => {
    const chip = chipFrom(event.target);
    if (!chip) return;
    const next = chipFrom(event.relatedTarget);
    focusedChip.current = next;
    const previous = focusedRing.current;
    focusedRing.current = next?.dataset.ring ?? null;
    if (previous) settleRing(previous);
    syncSpotlight();
  };

  // Escape dismisses the tooltip while focus stays on the satellite, so the
  // ring remains halted for reading (interaction has not ended).
  const onStageKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape" || !spotlight) return;
    tipDismissedFor.current = spotlight.id;
    setSpotlight(null);
  };

  // Clamp the tooltip inside the viewport once its real size is measurable.
  useLayoutEffect(() => {
    if (!spotlight || spotlight.ready || !tipRef.current) return;
    const tip = tipRef.current;
    const x = Math.min(
      Math.max(spotlight.cx - tip.offsetWidth / 2, 8),
      window.innerWidth - tip.offsetWidth - 8,
    );
    const above = spotlight.top - tip.offsetHeight - 12;
    const y = above >= 8 ? above : spotlight.top + 56;
    tip.style.left = `${x}px`;
    tip.style.top = `${y}px`;
    setSpotlight((current) => (current ? { ...current, ready: true } : current));
  }, [spotlight]);

  // HUD subject: transient hover/focus preview, else the pinned selection.
  const hudSkill = skills.find((s) => s.id === (spotlight?.id ?? selectedSkillId)) ?? selected;

  return (
    <div className="flex flex-col gap-6">
      <style>{ORBIT_KEYFRAMES}</style>

      <div className="flex justify-center gap-4 text-xs text-beige/60">
        {ORBIT_RINGS.map(({ id, category }) => (
          <span key={id} className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-2 w-2 rounded-full border border-mainGreen" />
            {SKILL_CATEGORIES[category]}
          </span>
        ))}
      </div>

      {useOrbit ? (
        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_19rem]">
          <div>
            <div
              onPointerOver={onStagePointerOver}
              onPointerOut={onStagePointerOut}
              onFocus={onStageFocus}
              onBlur={onStageBlur}
              onKeyDown={onStageKeyDown}
              className="relative mx-auto h-[22rem] w-full max-w-4xl [container-type:inline-size] [perspective:1500px] [transform-style:preserve-3d]"
              style={{ "--ring-outer": RING_OUTER } as CSSProperties}
            >
              <div
                className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
                style={
                  {
                    width: "var(--ring-outer)",
                    height: "var(--ring-outer)",
                    transform: `translate(-50%, -50%) rotateX(${PLANE_TILT_DEG}deg)`,
                  } as CSSProperties
                }
              >
                {ORBIT_RINGS.map((ring) => {
                  const { id, sizeFactor, direction, cycleSeconds } = ring;
                  const size = `calc(var(--ring-outer) * ${sizeFactor})`;
                  const radius = `calc(${size} / 2)`;
                  return (
                    <div
                      key={id}
                      ref={(rotator) => {
                        if (rotator) rotatorRefs.current.set(id, rotator);
                        else rotatorRefs.current.delete(id);
                      }}
                      className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
                      style={
                        {
                          width: size,
                          height: size,
                          marginLeft: `calc(${size} / -2)`,
                          marginTop: `calc(${size} / -2)`,
                          animation: `${spinFor(direction)} ${cycleSeconds}s linear infinite`,
                        } as CSSProperties
                      }
                    >
                      <div
                        aria-hidden="true"
                        className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-mainGreen/25"
                        style={{ width: size, height: size, transform: "translate(-50%, -50%)" }}
                      >
                        {Array.from({ length: MARKER_COUNT }, (_, markerIndex) => (
                          <span
                            key={markerIndex}
                            className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mainGreen/40"
                            style={{
                              transform: `rotate(${(markerIndex / MARKER_COUNT) * 360 + 22.5}deg) translate(${radius})`,
                            }}
                          />
                        ))}
                      </div>
                      {satellitesOf(ring.category, ring.offsetDeg).map(({ skill, angleDeg }) => (
                        <span
                          key={skill.id}
                          className="absolute left-1/2 top-1/2 h-0 w-0 [transform-style:preserve-3d]"
                          style={{ transform: `rotate(${angleDeg}deg) translate(${radius})` }}
                        >
                          <span
                            className="h-0 w-0 [transform-style:preserve-3d]"
                            style={{ animation: `${spinFor(direction === 1 ? -1 : 1)} ${cycleSeconds}s linear infinite` }}
                          >
                            <span
                              className="h-0 w-0"
                              style={{ transform: `rotate(${-angleDeg}deg) rotateX(${-PLANE_TILT_DEG}deg)` }}
                            >
                              <SatelliteChip
                                className="orbit-sat -translate-x-1/2 -translate-y-1/2"
                                dataRing={id}
                                style={
                                  {
                                    "--orbit-cycle": `${cycleSeconds}s`,
                                    "--orbit-depth-delay": `${depthDelaySeconds(angleDeg, ring).toFixed(3)}s`,
                                  } as CSSProperties
                                }
                                skill={skill}
                                selected={selectedSkillId === skill.id}
                                onSelect={() => selectSkill(selectedSkillId === skill.id ? null : skill.id)}
                              />
                            </span>
                          </span>
                        </span>
                      ))}
                    </div>
                  );
                })}
              </div>

              <div className="absolute left-1/2 top-1/2 flex h-48 w-48 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full border border-beige/15 bg-mainGreen/10 text-center shadow-[0_0_35px_rgba(141,165,91,0.25)] backdrop-blur-md">
                <span className="font-inika text-2xl font-bold text-mainGreen">{AUTHOR.name}</span>
                <span className="px-6 text-xs leading-snug text-beige/80">{AUTHOR.role}</span>
              </div>
            </div>

            <p className="mt-2 flex flex-wrap justify-center gap-x-4 text-sm text-beige/70">
              {satellitesOf("languages", 0).map(({ skill }) => (
                <span key={skill.id} className="font-medium">
                  {skill.context}
                </span>
              ))}
            </p>
          </div>

          <div aria-live="polite" className="xl:sticky xl:top-24">
            {hudSkill ? (
              <SkillEvidence skill={hudSkill} className="shadow-[0_0_24px_rgba(141,165,91,0.12)]" />
            ) : (
              <div className="rounded-lg border border-beige/15 bg-mainGreen/10 p-4 text-sm text-beige/60 backdrop-blur-md">
                Focus or select a satellite to spotlight its evidence.
              </div>
            )}
          </div>
        </div>
      ) : (
        <StaticGrid selectedSkillId={selectedSkillId} onSelectSkill={selectSkill} />
      )}

      <div aria-live="polite">
        {selected ? (
          <SkillEvidence skill={selected} />
        ) : (
          <p className="text-sm text-beige/60">
            Focus or select a satellite to spotlight its evidence.
          </p>
        )}
      </div>

      {spotlight && (
        <div
          ref={tipRef}
          role="tooltip"
          style={{
            left: -9999,
            top: -9999,
            visibility: spotlight.ready ? "visible" : "hidden",
          }}
          className="orbit-tip pointer-events-none fixed z-50 rounded-full border border-beige/15 bg-mainGreen/10 px-3 py-1 text-xs text-beige backdrop-blur-md"
        >
          {spotlight.name}
        </div>
      )}
    </div>
  );
}

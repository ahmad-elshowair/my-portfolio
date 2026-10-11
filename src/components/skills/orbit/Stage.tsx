"use client";

import { SkillEvidence } from "@/components/skills/shared";
import { AUTHOR } from "@/lib/site";
import { skills } from "@/data";
import { ORBIT_RINGS } from "@/definitions";
import { cn } from "@/lib/utils";
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
import type { CSSProperties } from "react";
import {
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

/**
 * The interactive orbit stage: tilted pure-CSS 3D rings, ambient GPU
 * rotation, deceleration, name tooltip, and the docked Spotlight HUD.
 * All interaction state is local and tears down with this component when
 * the ambient gate closes — selection survives in the shared lab store.
 */

interface SpotlightState {
  id: string;
  name: string;
}

export function OrbitStage({
  selectedSkillId = null,
  selectSkill = () => {},
}: {
  selectedSkillId?: string | null;
  selectSkill?: (id: string | null) => void;
} = {}) {
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

  useEffect(() => {
    if (!spotlight) return;
    let animId: number;
    const updatePosition = () => {
      const chip = focusedChip.current ?? hoveredChip.current;
      const tip = tipRef.current;
      if (chip && tip) {
        const rect = chip.getBoundingClientRect();
        const tipWidth = tip.offsetWidth;
        const tipHeight = tip.offsetHeight;
        // Position directly above the icon, pointing down
        const x = rect.left + rect.width / 2;
        const y = rect.top - 8;
        tip.style.transform = `translate3d(${Math.round(x - tipWidth / 2)}px, ${Math.round(y - tipHeight)}px, 0)`;
        tip.style.visibility = "visible";
      }
      animId = requestAnimationFrame(updatePosition);
    };
    updatePosition();
    return () => cancelAnimationFrame(animId);
  }, [spotlight]);

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
      return {
        id,
        name: chip.getAttribute("aria-label") ?? id,
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


  // HUD subject: transient hover/focus preview, else the pinned selection.
  const selected = selectedSkillId ? skills.find((s) => s.id === selectedSkillId) : undefined;
  const hudSkill = skills.find((s) => s.id === (spotlight?.id ?? selectedSkillId)) ?? selected;
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
            {ORBIT_RINGS.map((ring) => {
              const { id, sizeFactor, direction, cycleSeconds } = ring;
              const size = `calc(var(--ring-outer) * ${sizeFactor})`;
              const radius = `calc(${size} / 2)`;
              const isRingActive = ring.category === activeRingCategory;
              return (
                <div
                  key={id}
                  ref={(rotator) => {
                    if (rotator) rotatorRefs.current.set(id, rotator);
                    else rotatorRefs.current.delete(id);
                  }}
                  className="pointer-events-none absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
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
                    className={cn(
                      "pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-dashed transition-all duration-300",
                      isRingActive
                        ? "border-mainGreen/70 shadow-[0_0_12px_rgba(141,165,91,0.3)]"
                        : "border-mainGreen/25",
                    )}
                    style={{ width: size, height: size, transform: "translate(-50%, -50%)" }}
                  >
                    {Array.from({ length: MARKER_COUNT }, (_, markerIndex) => (
                      <span
                        key={markerIndex}
                        className={cn(
                          "absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300",
                          isRingActive
                            ? "bg-mainGreen/90 scale-125 shadow-[0_0_6px_rgba(141,165,91,0.6)]"
                            : "bg-mainGreen/40",
                        )}
                        style={{
                          transform: `rotate(${(markerIndex / MARKER_COUNT) * 360 + 22.5}deg) translate(${radius})`,
                        }}
                      />
                    ))}
                  </div>
                  {satellitesOf(ring.category, ring.offsetDeg).map(({ skill, angleDeg }) => (
                    <span
                      key={skill.id}
                      className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0 [transform-style:preserve-3d]"
                      style={{ transform: `rotate(${angleDeg}deg) translate(${radius})` }}
                    >
                      <span
                        className="pointer-events-none h-0 w-0 [transform-style:preserve-3d]"
                        style={{ animation: `${spinFor(direction === 1 ? -1 : 1)} ${cycleSeconds}s linear infinite` }}
                      >
                        <span
                          className="pointer-events-none h-0 w-0"
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

          {/* Celestial atmospheric core glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(141,165,91,0.14)_0%,transparent_70%)] blur-2xl"
          />

          <div className="pointer-events-none select-none absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-full border border-beige/15 bg-mainGreen/10 text-center shadow-[0_0_25px_rgba(141,165,91,0.25)] backdrop-blur-md">
            <span className="font-inika text-sm font-bold text-mainGreen leading-tight">{AUTHOR.name}</span>
            <span className="px-2 text-[9.5px] leading-snug text-beige/80">{AUTHOR.role}</span>
          </div>
        </div>

        <p className="mt-4 flex flex-wrap justify-center gap-x-4 text-sm text-beige/70">
          {satellitesOf("languages", 0).map(({ skill }) => (
            <span key={skill.id} className="font-medium">
              {skill.context}
            </span>
          ))}
        </p>
      </div>

      <div aria-live="polite" className="w-full max-w-2xl">
        {hudSkill ? (
          <SkillEvidence skill={hudSkill} className="shadow-[0_0_24px_rgba(141,165,91,0.12)]" />
        ) : (
          <div className="rounded-lg border border-beige/15 bg-mainGreen/10 p-4 text-center text-sm text-beige/60 backdrop-blur-md">
            Focus or select a satellite to spotlight its evidence.
          </div>
        )}
      </div>

      {typeof document !== "undefined" &&
        spotlight &&
        createPortal(
          <div
            ref={tipRef}
            role="tooltip"
            style={{ visibility: "hidden" }}
            className="orbit-tip pointer-events-none fixed left-0 top-0 z-[100] flex flex-col items-center"
          >
            <div className="relative whitespace-nowrap rounded-full border border-beige/25 bg-bgGreen/95 px-3 py-1 font-sans text-xs font-medium text-beige shadow-[0_4px_16px_rgba(0,0,0,0.5)] backdrop-blur-md">
              {spotlight.name}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 border-b border-r border-beige/25 bg-bgGreen"
              />
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

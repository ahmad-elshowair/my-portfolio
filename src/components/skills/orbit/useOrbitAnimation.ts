"use client";

import { useEffect, useRef } from "react";
import { RAMP_MS } from "./motion";

/** Manages Web Animations API speed ramping for orbital ring rotators. */
export function useOrbitAnimation() {
  const rotatorRefs = useRef(new Map<string, HTMLDivElement>());
  const ringAnimations = useRef(new Map<string, Animation[]>());
  const rampLoops = useRef(new Map<string, number>());
  const ringRates = useRef(new Map<string, number>());
  const hoveredRing = useRef<string | null>(null);
  const focusedRing = useRef<string | null>(null);

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
    const cached = ringAnimations.current.get(ring);

    const animations =
      !cached || cached.some((a) => a.playState === "idle")
        ? rotator.getAnimations({ subtree: true })
        : cached;

    ringAnimations.current.set(ring, animations);
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

  const pauseRing = (ring: string, source: "hover" | "focus") => {
    if (source === "hover") hoveredRing.current = ring;
    if (source === "focus") focusedRing.current = ring;
    rampRing(ring, 0);
  };

  const resumeRing = (source: "hover" | "focus", nextRing?: string | null) => {
    const previous =
      source === "hover" ? hoveredRing.current : focusedRing.current;
    if (source === "hover") hoveredRing.current = nextRing ?? null;
    if (source === "focus") focusedRing.current = nextRing ?? null;

    if (previous && previous !== nextRing) {
      if (hoveredRing.current !== previous && focusedRing.current !== previous) {
        rampRing(previous, 1);
      }
    }
    if (nextRing) {
      rampRing(nextRing, 0);
    }
  };

  return {
    rotatorRefs,
    pauseRing,
    resumeRing,
  };
}

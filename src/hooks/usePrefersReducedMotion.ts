"use client";

import { useSyncExternalStore } from "react";

/**
 * Tracks the user's `prefers-reduced-motion` setting.
 *
 * Implemented with `useSyncExternalStore`: the server snapshot is `false`
 * (server render and hydration agree — no mismatch), the client snapshot is
 * the live media-query value, and runtime changes re-render subscribers.
 * Gate every animation on this hook.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
}

/**
 * Reports whether the reduced-motion preference is active.
 * Called during client render only (never during server render).
 */
function getReducedMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Subscribes to preference changes; returns the unsubscribe cleanup.
 */
function subscribeToReducedMotion(onChange: () => void): () => void {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

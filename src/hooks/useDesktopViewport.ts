"use client";

import { useSyncExternalStore } from "react";

/**
 * Tracks the desktop breakpoint the same hydration-safe way as the
 * reduced-motion preference: server snapshot is `false`, the client snapshot
 * is the live media-query value, and runtime changes re-render subscribers.
 * Concepts with layout-sensitive enhancements gate on this.
 */
export function useDesktopViewport(): boolean {
  return useSyncExternalStore(
    subscribeToDesktopViewport,
    getDesktopViewportSnapshot,
    () => false,
  );
}

function getDesktopViewportSnapshot(): boolean {
  return window.matchMedia("(min-width: 1024px)").matches;
}

function subscribeToDesktopViewport(onChange: () => void): () => void {
  const mediaQuery = window.matchMedia("(min-width: 1024px)");
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

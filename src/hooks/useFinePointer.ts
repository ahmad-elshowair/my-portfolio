"use client";

import { useSyncExternalStore } from "react";

/**
 * Tracks pointer precision the same hydration-safe way as the desktop
 * breakpoint: server snapshot is `false`, the client snapshot is the live
 * media-query value, and runtime changes re-render subscribers. Ambient
 * motion gates compose this so coarse-pointer environments fail closed.
 */
export function useFinePointer(): boolean {
  return useSyncExternalStore(
    subscribeToFinePointer,
    getFinePointerSnapshot,
    () => false,
  );
}

function getFinePointerSnapshot(): boolean {
  return window.matchMedia("(pointer: fine)").matches;
}

function subscribeToFinePointer(onChange: () => void): () => void {
  const mediaQuery = window.matchMedia("(pointer: fine)");
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

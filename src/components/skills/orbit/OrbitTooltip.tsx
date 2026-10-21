"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export interface SpotlightState {
  id: string;
  name: string;
}

interface OrbitTooltipProps {
  spotlight: SpotlightState | null;
}

/** 2D screen-space tooltip tracking the active satellite. */
export function OrbitTooltip({ spotlight }: OrbitTooltipProps) {
  const tipRef = useRef<HTMLDivElement | null>(null);

  // The chip element is resolved once per subject; position tracking runs
  // only through the deceleration window, then pins — no steady-state loop.
  useEffect(() => {
    if (!spotlight) return;
    const chip = document.querySelector<HTMLElement>(
      `[data-skill-id="${spotlight.id}"]`,
    );
    const tip = tipRef.current;
    if (!chip || !tip) return;

    const TRACK_MS = 450;
    let startedAt = -1;
    let animId = 0;

    const place = (now: number) => {
      if (startedAt < 0) startedAt = now;
      const rect = chip.getBoundingClientRect();
      const x = Math.min(
        Math.max(rect.left + rect.width / 2 - tip.offsetWidth / 2, 8),
        window.innerWidth - tip.offsetWidth - 8,
      );
      const y = Math.max(rect.top - tip.offsetHeight - 12, 8);
      tip.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
      tip.style.visibility = "visible";
      if (now - startedAt < TRACK_MS) animId = requestAnimationFrame(place);
    };

    animId = requestAnimationFrame(place);
    return () => cancelAnimationFrame(animId);
  }, [spotlight]);

  if (typeof document === "undefined" || !spotlight) return null;

  return createPortal(
    <div
      ref={tipRef}
      role="tooltip"
      style={{ visibility: "hidden" }}
      className="orbit-tip pointer-events-none fixed left-0 top-0 z-[60] flex flex-col items-center"
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
  );
}

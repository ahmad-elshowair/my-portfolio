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

  useEffect(() => {
    if (!spotlight) return;
    let animId: number;

    const updatePosition = () => {
      const tip = tipRef.current;
      const chip = document.querySelector<HTMLElement>(
        `[data-skill-id="${spotlight.id}"]`,
      );
      if (chip && tip) {
        const rect = chip.getBoundingClientRect();
        const tipWidth = tip.offsetWidth;
        const tipHeight = tip.offsetHeight;
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

  if (typeof document === "undefined" || !spotlight) return null;

  return createPortal(
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
  );
}

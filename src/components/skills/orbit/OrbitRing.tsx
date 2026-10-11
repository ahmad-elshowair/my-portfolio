"use client";

import { cn } from "@/lib/utils";
import {
  MARKER_COUNT,
  PLANE_TILT_DEG,
  depthDelaySeconds,
  satellitesOf,
  spinFor,
} from "./motion";
import { SatelliteChip } from "./Chips";
import type { OrbitRingConfig } from "@/definitions";
import type { CSSProperties, RefCallback } from "react";

interface OrbitRingProps {
  ring: OrbitRingConfig;
  isActive: boolean;
  selectedSkillId: string | null;
  onSelectSkill: (id: string | null) => void;
  setRotatorRef: RefCallback<HTMLDivElement>;
}

/** Single orbital ring with trajectory border, markers, and counter-tilted satellites. */
export function OrbitRing({
  ring,
  isActive,
  selectedSkillId,
  onSelectSkill,
  setRotatorRef,
}: OrbitRingProps) {
  const { id, sizeFactor, direction, cycleSeconds } = ring;
  const size = `calc(var(--ring-outer) * ${sizeFactor})`;
  const radius = `calc(${size} / 2)`;

  return (
    <div
      ref={setRotatorRef}
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
      {/* Dashed trajectory ring and celestial markers */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-dashed transition-all duration-300",
          isActive
            ? "border-mainGreen/70 shadow-[0_0_12px_rgba(141,165,91,0.3)]"
            : "border-mainGreen/25",
        )}
        style={{
          width: size,
          height: size,
          transform: "translate(-50%, -50%)",
        }}
      >
        {Array.from({ length: MARKER_COUNT }, (_, i) => (
          <span
            key={i}
            className={cn(
              "absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300",
              isActive
                ? "bg-mainGreen/90 scale-125 shadow-[0_0_6px_rgba(141,165,91,0.6)]"
                : "bg-mainGreen/40",
            )}
            style={{
              transform: `rotate(${(i / MARKER_COUNT) * 360 + 22.5}deg) translate(${radius})`,
            }}
          />
        ))}
      </div>

      {/* Satellites positioned along ring arc */}
      {satellitesOf(ring.category, ring.offsetDeg).map(
        ({ skill, angleDeg }) => (
          <span
            key={skill.id}
            className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0 [transform-style:preserve-3d]"
            style={{
              transform: `rotate(${angleDeg}deg) translate(${radius})`,
            }}
          >
            <span
              className="pointer-events-none h-0 w-0 [transform-style:preserve-3d]"
              style={{
                animation: `${spinFor(direction === 1 ? -1 : 1)} ${cycleSeconds}s linear infinite`,
              }}
            >
              <span
                className="pointer-events-none h-0 w-0"
                style={{
                  transform: `rotate(${-angleDeg}deg) rotateX(${-PLANE_TILT_DEG}deg)`,
                }}
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
                  onSelect={() =>
                    onSelectSkill(
                      selectedSkillId === skill.id ? null : skill.id,
                    )
                  }
                />
              </span>
            </span>
          </span>
        ),
      )}
    </div>
  );
}

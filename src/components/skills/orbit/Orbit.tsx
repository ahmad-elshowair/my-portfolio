"use client";

import Iconify from "@/components/iconify";
import { SkillEvidence } from "@/components/skills/shared";
import { SKILL_CATEGORIES, skills } from "@/data";
import { AUTHOR } from "@/lib/site";
import { useDesktopViewport, useFinePointer, usePrefersReducedMotion } from "@/hooks";
import { useSelectSkill, useSelectedSkillId } from "@/stores/skillsLabStore";
import { ORBIT_RINGS, type OrbitRingConfig, type SkillItem } from "@/definitions";
import { cn } from "@/lib/utils";
import { type CSSProperties } from "react";

/**
 * Orbit constellation. Concentric category rings (tools inner, front-end
 * middle, back-end outer) carry icon-only satellites on a tilted pure-CSS 3D
 * plane around the candidate orb on desktop; a static grouped grid renders
 * everywhere else. Rings rotate on the GPU compositor (transform-only,
 * >= 60s cycles, adjacent rings counter-rotating) with every satellite
 * counter-rotating in lockstep and dimming through the far side of the plane.
 */

// Stage geometry: the outer diameter caps at 560px (≈280px reference radius)
// and always keeps the icon-chip overhang inside the section container.
const RING_OUTER = "min(560px, calc(100cqw - 240px))";

// Plane tilt that reads the circular tracks as elliptical orbits; satellites
// counter-tilt by the same angle to stand billboarded toward the viewer.
const PLANE_TILT_DEG = 62;

const MARKER_COUNT = 8;

// Ambient rotation is transform-only; the depth pair keeps far-side glyphs
// legible (opacity floor 0.5 ≈ >3:1) and shrinks only the glyph, never the
// 44px hit box. All animations start in the same commit so the satellite
// counter-rotations stay in lockstep with their ring.
const ORBIT_KEYFRAMES = `
@keyframes orbit-spin-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes orbit-spin-ccw { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
@keyframes orbit-depth { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
@keyframes orbit-depth-glyph { 0%, 100% { transform: scale(0.82); } 50% { transform: scale(1); } }
.orbit-sat { animation: orbit-depth var(--orbit-cycle) linear infinite; animation-delay: var(--orbit-depth-delay); }
.orbit-sat svg { animation: orbit-depth-glyph var(--orbit-cycle) linear infinite; animation-delay: var(--orbit-depth-delay); }
`;

const byCategory = (category: SkillItem["category"]) =>
  skills.filter((s) => s.category === category);

const satellitesOf = (category: SkillItem["category"], offsetDeg: number) =>
  byCategory(category).map((skill, index, all) => ({
    skill,
    angleDeg: (index / all.length) * 360 - 90 + offsetDeg,
  }));

const spinFor = (direction: 1 | -1) =>
  direction === 1 ? "orbit-spin-cw" : "orbit-spin-ccw";

/**
 * Depth phase: the satellite crosses the plane's far side (top of the
 * ellipse) when ring rotation has carried it to 270deg, so the dim cycle is
 * delayed by that fraction of the ring period — negative delay presets the
 * phase without JavaScript in the animation loop.
 */
const depthDelaySeconds = (angleDeg: number, ring: OrbitRingConfig) => {
  const phase = ((((270 - angleDeg) / ring.direction) % 360) + 360) % 360;
  return -(phase / 360) * ring.cycleSeconds;
};

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
  const languages = byCategory("languages");

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
        <div
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
      ) : (
        <div className="flex flex-col gap-5">
          {ORBIT_RINGS.map(({ id, category }) => (
            <div key={id}>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-beige/60">
                {SKILL_CATEGORIES[category]}
              </h3>
              <div className="flex flex-wrap gap-2">
                {byCategory(category).map((skill) => (
                  <GridChip
                    key={skill.id}
                    skill={skill}
                    selected={selectedSkillId === skill.id}
                    onSelect={() => selectSkill(selectedSkillId === skill.id ? null : skill.id)}
                  />
                ))}
              </div>
            </div>
          ))}
          <p className="flex flex-wrap gap-x-3 text-sm text-beige/70">
            {languages.map((skill) => (
              <span key={skill.id} className="font-medium">
                {skill.context}
              </span>
            ))}
          </p>
        </div>
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
    </div>
  );
}

/**
 * Flow-layout chip with the visible label — the static grid keeps names
 * on-chip (Article VI complete baseline); the orbit's icon-only variant
 * is SatelliteChip below.
 */
function GridChip({
  skill,
  selected,
  onSelect,
  className,
}: {
  skill: SkillItem;
  selected: boolean;
  onSelect: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "flex items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs transition-colors duration-200 [&_svg]:text-sm",
        selected
          ? "border-mainGreen bg-mainGreen/30 text-beige shadow-[0_0_12px_rgba(141,165,91,0.3)]"
          : "border-beige/20 bg-bgGreen/80 text-beige/90 hover:bg-beige/10",
        className,
      )}
    >
      <Iconify icon={skill.icon} className="h-[1em] w-[1em] shrink-0" />
      {skill.name}
    </button>
  );
}

/** Icon-only orbit satellite: the official glyph at a 44px target, named via aria-label. */
function SatelliteChip({
  skill,
  selected,
  onSelect,
  className,
  style,
}: {
  skill: SkillItem;
  selected: boolean;
  onSelect: () => void;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={skill.name}
      onClick={onSelect}
      style={style}
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-200",
        selected
          ? "border-mainGreen bg-mainGreen/30 shadow-[0_0_12px_rgba(141,165,91,0.3)]"
          : "border-beige/15 bg-mainGreen/10 hover:bg-mainGreen/25",
        className,
      )}
    >
      <Iconify icon={skill.icon} className="h-6 w-6 text-beige" />
    </button>
  );
}

import { skills } from "@/data";
import type { OrbitRingConfig, SkillItem } from "@/definitions";

/**
 * Orbit motion geometry and budgets. Ambient rotation is transform-only on
 * the GPU compositor (Article IX v1.4.0); the deceleration ramp belongs to
 * the ambient-motion class (Step 3 Option B ruling) while the tooltip
 * entrance stays inside the 150–250ms interaction tokens.
 */

// Stage geometry: the outer diameter caps at 560px (≈280px reference radius)
// and always keeps the icon-chip overhang inside the section container.
export const RING_OUTER = "min(560px, calc(100cqw - 240px))";

// Plane tilt that reads the circular tracks as elliptical orbits; satellites
// counter-tilt by the same angle to stand billboarded toward the viewer.
export const PLANE_TILT_DEG = 62;

// Deceleration/resumption ramp (ambient-motion class) and tooltip entrance.
export const RAMP_MS = 300;
export const TIP_MS = 180;

export const MARKER_COUNT = 8;

export const ORBIT_KEYFRAMES = `
@keyframes orbit-spin-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes orbit-spin-ccw { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
@keyframes orbit-depth { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
@keyframes orbit-depth-glyph { 0%, 100% { transform: scale(0.82); } 50% { transform: scale(1); } }
@keyframes orbit-tip-in { from { opacity: 0; } to { opacity: 1; } }
.orbit-sat { animation: orbit-depth var(--orbit-cycle) linear infinite; animation-delay: var(--orbit-depth-delay); }
.orbit-sat svg { animation: orbit-depth-glyph var(--orbit-cycle) linear infinite; animation-delay: var(--orbit-depth-delay); }
.orbit-tip { animation: orbit-tip-in ${TIP_MS}ms ease-out; }
`;

export const byCategory = (category: SkillItem["category"]) =>
  skills.filter((s) => s.category === category);

export const satellitesOf = (category: SkillItem["category"], offsetDeg: number) =>
  byCategory(category).map((skill, index, all) => ({
    skill,
    angleDeg: (index / all.length) * 360 - 90 + offsetDeg,
  }));

export const spinFor = (direction: 1 | -1) =>
  direction === 1 ? "orbit-spin-cw" : "orbit-spin-ccw";

/**
 * Depth phase: the satellite crosses the plane's far side (top of the
 * ellipse) when ring rotation has carried it to 270deg, so the dim cycle is
 * delayed by that fraction of the ring period — negative delay presets the
 * phase without JavaScript in the animation loop.
 */
export const depthDelaySeconds = (angleDeg: number, ring: OrbitRingConfig) => {
  const phase = ((((270 - angleDeg) / ring.direction) % 360) + 360) % 360;
  return -(phase / 360) * ring.cycleSeconds;
};

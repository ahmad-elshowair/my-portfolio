import { skills } from "@/data";
import type { OrbitRingConfig, SkillItem } from "@/definitions";

/** Outer diameter bounded by 560px and container query width. */
export const RING_OUTER = "min(560px, calc(100cqw - 240px))";

/** 3D orbital plane tilt angle in degrees. */
export const PLANE_TILT_DEG = 62;

/** Speed ramp duration in milliseconds. */
export const RAMP_MS = 300;

/** Tooltip fade duration in milliseconds. */
export const TIP_MS = 180;

/** Number of celestial marker dots on each orbital ring. */
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

/** Computes negative animation delay so satellite depth matches its orbital position. */
export const depthDelaySeconds = (angleDeg: number, ring: OrbitRingConfig) => {
  const phase = ((((270 - angleDeg) / ring.direction) % 360) + 360) % 360;
  return -(phase / 360) * ring.cycleSeconds;
};

import type { SkillCategoryId } from "./index";

/** The three orbital bands, innermost to outermost. */
export type OrbitRingId = "inner" | "middle" | "outer";

/** Category bound to a ring — languages are caption-only by design. */
export type OrbitRingCategory = Exclude<SkillCategoryId, "languages">;

/** One orbital band's geometry and motion contract (Article IX v1.4.0 budgets). */
export interface OrbitRingConfig {
  id: OrbitRingId;
  category: OrbitRingCategory;
  /** Ring diameter as a factor of the cqw-derived outer cap. */
  sizeFactor: number;
  /** Rotation direction: 1 = clockwise, -1 = counter-clockwise. */
  direction: 1 | -1;
  /** Full-cycle seconds — never below 60 (ambient-motion class). */
  cycleSeconds: number;
  /** Static angular offset keeping adjacent rings from aligning radially. */
  offsetDeg: number;
}

/**
 * Category→ring binding: every ringed dataset category must appear — a new
 * SkillCategoryId without an entry here is a compile error, never a silent
 * drop from the orbit. Consumed as the source of each ring's id so the map
 * cannot drift from ORBIT_RINGS.
 */
const RING_BY_CATEGORY = {
  tools: "inner",
  frontend: "middle",
  backend: "outer",
} as const satisfies Record<OrbitRingCategory, OrbitRingId>;

export const ORBIT_RINGS: readonly OrbitRingConfig[] = [
  { id: RING_BY_CATEGORY.tools, category: "tools", sizeFactor: 0.58, direction: 1, cycleSeconds: 60, offsetDeg: 0 },
  { id: RING_BY_CATEGORY.frontend, category: "frontend", sizeFactor: 0.78, direction: -1, cycleSeconds: 72, offsetDeg: 15 },
  { id: RING_BY_CATEGORY.backend, category: "backend", sizeFactor: 1, direction: 1, cycleSeconds: 84, offsetDeg: 30 },
] as const;

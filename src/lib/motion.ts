/* ─── Motion Tokens ──────────────────────────────────────────────────── */

/**
 * Shared motion tokens adhering to Constitution Article VI (150–250ms budget).
 */
export const MOTION = {
  /** Fast transition duration (180ms) for fade/panel swaps. */
  fast: 0.18,
  /** Spring transition for active tab indicator. */
  tabSpring: {
    type: "spring" as const,
    bounce: 0.15,
    duration: 0.25,
  },
} as const;

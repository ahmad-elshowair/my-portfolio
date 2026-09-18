"use client";

import { useSyncExternalStore } from "react";
import { TypeAnimation } from "react-type-animation";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/** Animated role set — title-case per the casing convention. */
const ROLES = [
  "Front-End Developer",
  "Back-End Developer",
  "Full-Stack Developer",
];
/** Static fallback: the final role, rendered pre-hydration and under reduced motion. */
const STATIC_ROLE = ROLES[ROLES.length - 1];

const subscribeToNothing = () => () => {};

/**
 * Animated role line for the hero heading. Server-renders the static role,
 * then upgrades to the typing animation after hydration — and only when
 * motion is allowed — so the page's identity never depends on scripts or
 * animation.
 */
export default function AnimatedRole() {
  // Hydration-safe "is mounted": false on the server and during hydration,
  // true afterwards — implemented without effects or setState.
  const mounted = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
  const prefersReducedMotion = usePrefersReducedMotion();

  if (!mounted || prefersReducedMotion) {
    return <span>{STATIC_ROLE}</span>;
  }

  const sequence = ROLES.flatMap((role) => [role, 2000]);

  return (
    <TypeAnimation
      sequence={sequence}
      wrapper="span"
      speed={50}
      repeat={Infinity}
    />
  );
}

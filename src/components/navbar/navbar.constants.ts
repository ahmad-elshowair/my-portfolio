import type { Variants } from "framer-motion";

export interface NavSectionItem {
  label: string;
  id: string;
}

export const NAV_SECTIONS: readonly NavSectionItem[] = [
  { label: "Me", id: "me" },
  { label: "Experience", id: "experience" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export const getMenuVariants = (prefersReducedMotion: boolean): Variants => ({
  closed: {
    opacity: 0,
    y: prefersReducedMotion ? 0 : -20,
    scale: prefersReducedMotion ? 1 : 0.96,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 24,
      stiffness: 280,
      mass: 0.8,
      staggerChildren: prefersReducedMotion ? 0 : 0.04,
      delayChildren: 0.03,
    },
  },
});

export const getItemVariants = (prefersReducedMotion: boolean): Variants => ({
  closed: {
    opacity: 0,
    y: prefersReducedMotion ? 0 : -8,
    transition: {
      duration: 0.15,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

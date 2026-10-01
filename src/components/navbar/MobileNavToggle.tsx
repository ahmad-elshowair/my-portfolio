import { AnimatePresence, motion } from "framer-motion";
import { RefObject } from "react";
import Iconify from "@/components/iconify";

export interface MobileNavToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  toggleRef: RefObject<HTMLButtonElement | null>;
  prefersReducedMotion: boolean;
}

/**
 * Animated hamburger / close toggle button with spring rotation.
 */
export function MobileNavToggle({
  isOpen,
  onToggle,
  toggleRef,
  prefersReducedMotion,
}: MobileNavToggleProps) {
  return (
    <button
      ref={toggleRef}
      onClick={onToggle}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full bg-beige/5 text-mainGreen transition-all hover:bg-beige/10 hover:text-beige active:scale-95 md:hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.span
            key="close"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, rotate: -90, scale: 0.8 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, rotate: 0, scale: 1 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, rotate: 90, scale: 0.8 }
            }
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
          >
            <Iconify icon="lucide:x" className="h-5 w-5" aria-hidden="true" />
          </motion.span>
        ) : (
          <motion.span
            key="menu"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, rotate: 90, scale: 0.8 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, rotate: 0, scale: 1 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, rotate: -90, scale: 0.8 }
            }
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
          >
            <Iconify icon="lucide:menu" className="h-5 w-5" aria-hidden="true" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

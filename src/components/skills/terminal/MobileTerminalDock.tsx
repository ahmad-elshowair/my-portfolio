"use client";

import Iconify from "@/components/iconify";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks";

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

/**
 * Mobile shell for the terminal: a persistent, non-modal bottom panel.
 * When collapsed, it sits as a compact pill floating at the bottom edge.
 * When expanded, it smoothly slides up to max-h-[58dvh] with cubic-bezier easing.
 * When collapsed, it smoothly slides down and retracts back into the small dock pill.
 * Automatically collapses when the user taps outside of the dock.
 */

interface MobileTerminalDockProps {
  title: string;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  onExpanded?: () => void;
  children: ReactNode;
}
export function MobileTerminalDock({
  title,
  expanded,
  onExpandedChange,
  onExpanded,
  children,
}: MobileTerminalDockProps) {
  const dockRef = useRef<HTMLDivElement>(null);
  const onExpandedRef = useRef(onExpanded);
  const expandedRef = useRef(expanded);
  const onExpandedChangeRef = useRef(onExpandedChange);
  const isClient = useIsClient();
  const [inSkillsSection, setInSkillsSection] = useState(true);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    onExpandedRef.current = onExpanded;
  }, [onExpanded]);

  useEffect(() => {
    expandedRef.current = expanded;
  }, [expanded]);

  useEffect(() => {
    onExpandedChangeRef.current = onExpandedChange;
  }, [onExpandedChange]);

  // Click outside to collapse the dock
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        expandedRef.current &&
        dockRef.current &&
        !dockRef.current.contains(event.target as Node)
      ) {
        onExpandedChangeRef.current(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  // The panel strictly belongs to the skills section:
  // It only shows when the user is viewing #skills, and immediately hides
  // (and collapses) the moment they scroll past #skills or into #projects.
  useEffect(() => {
    const skillsSection = document.getElementById("skills");
    const projectsSection = document.getElementById("projects");
    if (!skillsSection) return;

    const checkVisibility = () => {
      const skillsRect = skillsSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      let projectsOverlapping = false;
      if (projectsSection) {
        const projectsRect = projectsSection.getBoundingClientRect();
        // The moment the projects section enters the screen (top < 75% of viewport):
        if (projectsRect.top < windowHeight * 0.75) {
          projectsOverlapping = true;
        }
      }

      // Skills section is active when its top has reached the viewport,
      // its bottom has not scrolled past the top of the screen,
      // and the projects section has not taken over.
      const isSkillsActive =
        skillsRect.top < windowHeight * 0.75 &&
        skillsRect.bottom > windowHeight * 0.25 &&
        !projectsOverlapping;

      setInSkillsSection(isSkillsActive);
      if (!isSkillsActive && expandedRef.current) {
        onExpandedChangeRef.current(false);
      }
    };

    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility, { passive: true });
    checkVisibility();

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, []);

  useEffect(() => {
    if (expanded) onExpandedRef.current?.();
  }, [expanded]);

  if (!isClient) return null;

  // Portal to the body: the host section carries a backdrop-blur, which
  // would otherwise become the containing block for this fixed panel.
  return createPortal(
    <div
      ref={dockRef}
      className={cn(
        "fixed z-40 flex flex-col overflow-hidden bg-bgGreen/95 shadow-[0_12px_40px_rgba(22,26,25,0.6)] backdrop-blur-xl transition-[max-height,inset,border-radius,transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none lg:hidden",
        // Collapsed: floating inset pill. Expanded: companion drawer docked to bottom edge at 58dvh.
        expanded
          ? "inset-x-0 bottom-0 max-h-[58dvh] rounded-t-2xl rounded-b-none border-t border-beige/20 border-x-0 border-b-0 pb-[env(safe-area-inset-bottom)]"
          : "bottom-4 inset-x-4 max-h-[52px] rounded-2xl border border-beige/20 sm:inset-x-8",
        inSkillsSection
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "pointer-events-none translate-y-[calc(100%+2rem)] opacity-0 invisible",
      )}
    >
      <button
        type="button"
        onClick={() => onExpandedChange(!expanded)}
        aria-expanded={expanded}
        aria-controls="terminal-mobile-deck"
        className="flex min-h-[44px] w-full shrink-0 items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors hover:bg-beige/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-mainGreen"
      >
        <span className="flex min-w-0 items-center gap-2 font-mono text-[11px] text-beige/90 sm:text-xs">
          <span className="text-mainGreen">$</span>
          {/* key remount re-triggers the entrance when the command changes */}
          <span
            key={title}
            className="truncate animate-in fade-in duration-200 motion-reduce:animate-none"
          >
            {title}
          </span>
        </span>

        <span className="flex shrink-0 items-center gap-1.5 text-[11px] text-beige/60 transition-colors hover:text-beige sm:text-xs">
          {expanded ? "collapse" : "terminal"}
          <Iconify
            icon={expanded ? "lucide:chevron-down" : "lucide:chevron-up"}
            className="h-3.5 w-3.5"
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            key="terminal-mobile-deck"
            id="terminal-mobile-deck"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-h-0 flex-1 flex-col overflow-hidden border-t border-beige/10"
          >
            {children}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>,
    document.body,
  );
}

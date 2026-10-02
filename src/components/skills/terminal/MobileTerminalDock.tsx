"use client";

import Iconify from "@/components/iconify";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

/**
 * Mobile shell for the terminal: a persistent, non-modal bottom panel. The
 * collapsed grab bar mirrors the latest command and floats at the bottom
 * edge; expanding reveals the full deck while the page keeps scrolling —
 * chips stay reachable, nothing is overlaid or locked.
 */
export function MobileTerminalDock({
  title,
  expanded,
  onExpandedChange,
  onExpanded,
  children,
}: {
  title: string;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  onExpanded?: () => void;
  children: ReactNode;
}) {
  const onExpandedRef = useRef(onExpanded);
  const [inSkillsSection, setInSkillsSection] = useState(true);

  useEffect(() => {
    onExpandedRef.current = onExpanded;
  }, [onExpanded]);

  // The panel belongs to the skills section: it rides in when the section
  // enters the viewport and fades out when the visitor scrolls past it.
  useEffect(() => {
    const section = document.getElementById("skills");
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInSkillsSection(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (expanded) onExpandedRef.current?.();
  }, [expanded]);

  // Portal to the body: the host section carries a backdrop-blur, which
  // would otherwise become the containing block for this fixed panel.
  return createPortal(
    <div
      className={cn(
        "fixed z-40 flex flex-col overflow-hidden border border-beige/20 bg-bgGreen/95 shadow-[0_12px_40px_rgba(22,26,25,0.6)] backdrop-blur-xl transition-all duration-300 ease-out motion-reduce:transition-none lg:hidden",
        // Collapsed: an inset pill. Expanded: a full-bleed sheet docked to
        // the bottom edge, clearing the home-indicator via the safe area.
        expanded
          ? "inset-x-0 bottom-0 max-h-[85dvh] rounded-t-2xl border-x-0 border-b-0 pb-[env(safe-area-inset-bottom)]"
          : "bottom-4 inset-x-4 rounded-2xl sm:inset-x-8",
        inSkillsSection
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-8 opacity-0",
      )}
    >
      <button
        type="button"
        onClick={() => onExpandedChange(!expanded)}
        aria-expanded={expanded}
        aria-controls="terminal-mobile-deck"
        className="flex min-h-[44px] w-full shrink-0 items-center justify-between gap-3 px-3 py-2.5 text-left transition-colors duration-200 hover:bg-beige/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-mainGreen"
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
        <span className="flex shrink-0 items-center gap-1.5 text-[11px] text-beige/60 sm:text-xs">
          {expanded ? "collapse" : "terminal"}
          <Iconify
            icon={expanded ? "lucide:chevron-down" : "lucide:chevron-up"}
            className="h-3.5 w-3.5"
          />
        </span>
      </button>

      {expanded ? (
        <div
          id="terminal-mobile-deck"
          className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden border-t border-beige/10 p-3 animate-in slide-in-from-bottom-2 duration-200 motion-reduce:animate-none"
        >
          {children}
        </div>
      ) : null}
    </div>,
    document.body,
  );
}

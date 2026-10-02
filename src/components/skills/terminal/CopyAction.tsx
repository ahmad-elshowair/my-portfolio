"use client";

import Iconify from "@/components/iconify";
import { usePrefersReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export interface CopyActionProps {
  copyState: "idle" | "copied" | "unavailable";
  onCopy: () => void;
  className?: string;
}

/**
 * Compact copy action button matching the height of the icon (h-7 / 28px).
 * When clicked, the icon fades out and a "copied ✓" badge slides in from
 * the right. When the state resets, the badge slides back out to the right
 * and the copy icon fades back in.
 */
export function CopyAction({ copyState, onCopy, className }: CopyActionProps) {
  const isCopied = copyState === "copied";
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className={cn("relative flex h-7 items-center justify-end", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {isCopied ? (
          <motion.div
            key="copied-toast"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 16 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex h-7 items-center rounded-md border border-mainGreen/40 bg-mainGreen/20 px-2.5 font-mono text-[11px] leading-none text-beige shadow-sm"
          >
            copied ✓
          </motion.div>
        ) : (
          <motion.button
            key="copy-button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            type="button"
            onClick={onCopy}
            title="Copy terminal telemetry JSON"
            aria-label="Copy terminal telemetry JSON"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-beige/20 bg-beige/5 text-beige/70 transition-colors duration-200 hover:bg-beige/10 hover:text-beige focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mainGreen active:scale-95"
          >
            <Iconify icon="lucide:copy" className="h-3.5 w-3.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ConceptPetalProps } from "./switcher.types";

export function ConceptPetal({
  item,
  isActive,
  onSelect,
  index,
  prefersReducedMotion,
}: ConceptPetalProps) {
  const Icon = item.icon;
  // Lower hemisphere vertical petals (<= -60°, like orbit & proof map) are flipped 180°
  // so text reads downwards from hub to tip, matching the hand-drawn sketch.
  const isFlipped = item.angleDeg <= -60;

  return (
    <div
      className={cn(
        "pointer-events-none absolute right-0 top-0 h-0 w-0",
        isActive ? "z-50" : index % 2 === 0 ? "z-40" : "z-30",
      )}
      style={{
        transform: `rotate(${item.angleDeg}deg)`,
        transformOrigin: "0 0",
      }}
    >
      <motion.button
        type="button"
        role="radio"
        aria-checked={isActive}
        aria-label={`${item.label} — ${item.blurb}`}
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(item.id);
        }}
        initial={
          prefersReducedMotion
            ? { opacity: 0 }
            : {
                opacity: 0,
                scale: 0.2,
                x: 28,
                rotate: isFlipped ? 180 : 0,
              }
        }
        animate={
          prefersReducedMotion
            ? { opacity: 1 }
            : {
                opacity: 1,
                scale: 1,
                x: 0,
                rotate: isFlipped ? 180 : 0,
              }
        }
        exit={
          prefersReducedMotion
            ? { opacity: 0 }
            : {
                opacity: 0,
                scale: 0.2,
                x: 28,
                rotate: isFlipped ? 180 : 0,
                transition: { duration: 0.15 },
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0.15 }
            : {
                type: "spring",
                damping: 24,
                stiffness: 320,
                delay: index * 0.02,
              }
        }
        whileHover={prefersReducedMotion ? undefined : { scale: 1.06 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
        style={{
          right: `${item.offsetPx}px`,
          top: "-12.5px",
          width: `${item.widthPx}px`,
          height: "25px",
          transformOrigin: "center center",
        }}
        className={cn(
          "pointer-events-auto absolute flex items-center justify-between gap-1.5 rounded-full border px-2.5 py-0.5 text-xs backdrop-blur-md transition-colors select-none shadow-lg cursor-pointer",
          isActive
            ? "border-mainGreen bg-mainGreen font-bold text-bgGreen shadow-[0_0_16px_rgba(141,165,91,0.55)]"
            : "border-beige/25 bg-[#202724]/95 text-beige hover:border-mainGreen/70 hover:bg-[#2c3531] hover:text-mainGreen",
        )}
      >
        <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span className="whitespace-nowrap text-[11px] font-semibold tracking-wide">
          {item.label}
        </span>
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0",
            isActive ? "bg-bgGreen" : "bg-mainGreen/60",
          )}
          aria-hidden="true"
        />
      </motion.button>
    </div>
  );
}



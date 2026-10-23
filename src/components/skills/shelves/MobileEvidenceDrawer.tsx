"use client";

/* ─── Mobile Evidence Drawer ─────────────────────────────────────────── */

import Iconify from "@/components/iconify";
import { ProjectPills } from "@/components/skills/shared";
import type { SkillItem } from "@/definitions";

interface MobileEvidenceDrawerProps {
  skill: SkillItem;
  caretColumn?: "left" | "right";
  onCollapse?: () => void;
  onPillClick?: () => void;
}

/**
 * Mobile inline row-split drawer with column-aligned caret.
 */
export function MobileEvidenceDrawer({
  skill,
  caretColumn,
  onCollapse,
  onPillClick,
}: MobileEvidenceDrawerProps) {
  return (
    <div className="relative my-2 p-5 col-span-2 w-full rounded-2xl border-x border-b border-beige/20 bg-black/35 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.45)]">
      {/* Top rounded corners (16px radius) */}
      <div
        className="absolute top-0 left-0 w-4 h-4 rounded-tl-2xl border-t border-l border-beige/20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 w-4 h-4 rounded-tr-2xl border-t border-r border-beige/20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Top border with column-aligned caret */}
      {caretColumn ? (
        <>
          <div
            className="absolute top-0 left-4 h-px bg-beige/20 pointer-events-none"
            style={{
              width:
                caretColumn === "left"
                  ? "calc(25% - 28px)"
                  : "calc(75% - 28px)",
            }}
          />

          <div
            className="absolute -top-[12px] w-6 h-[13px] pointer-events-none z-20"
            style={{
              left: caretColumn === "left" ? "25%" : "75%",
              transform: "translateX(-50%)",
            }}
            aria-hidden="true"
          >
            <div
              className="w-full h-full bg-black/35 backdrop-blur-xl"
              style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
            />
            <svg
              className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
              viewBox="0 0 24 12"
              fill="none"
            >
              <polyline
                points="0,12 12,0.5 24,12"
                fill="none"
                stroke="rgba(245, 230, 211, 0.2)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div
            className="absolute top-0 right-4 h-px bg-beige/20 pointer-events-none"
            style={{
              left:
                caretColumn === "left"
                  ? "calc(25% + 12px)"
                  : "calc(75% + 12px)",
            }}
          />
        </>
      ) : (
        <div className="absolute top-0 left-4 right-4 h-px bg-beige/20 pointer-events-none" />
      )}

      {/* Header: Skill icon, title, and collapse toggle */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          {skill.icon ? (
            <div className="h-10 w-10 rounded-xl bg-black/40 border border-beige/15 flex items-center justify-center shrink-0">
              <Iconify
                icon={skill.icon}
                className="h-6 w-6 text-mainGreen shrink-0"
              />
            </div>
          ) : null}
          <h4 className="font-inika text-2xl text-beige font-normal tracking-wide truncate">
            {skill.name}
          </h4>
        </div>

        {onCollapse && (
          <button
            type="button"
            onClick={onCollapse}
            aria-label="Collapse evidence drawer"
            className="min-h-11 min-w-11 -mr-1 -my-1 rounded-full text-beige/80 hover:text-beige flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainGreen"
          >
            <div className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Iconify icon="lucide:chevron-up" className="h-4 w-4" />
            </div>
          </button>
        )}
      </div>

      {/* Context description */}
      <p className="text-sm leading-relaxed text-beige/85 mb-3.5">
        {skill.context}
      </p>

      {/* Project pills */}
      {skill.projects.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          <ProjectPills
            ids={skill.projects}
            label={null}
            onPillClick={onPillClick}
          />
        </div>
      ) : (
        <p className="text-xs text-beige/60">Verified in resume</p>
      )}
    </div>
  );
}

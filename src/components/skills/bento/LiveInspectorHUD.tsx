"use client";

import { SkillGlyph } from "@/components/skills/shared";
import type { SkillItem } from "@/definitions";
import { cn } from "@/lib/utils";
import { statusBadge } from "./bento.constants";
import { ProjectJumpPill } from "./ProjectJumpPill";

export interface LiveInspectorHUDProps {
  skill: SkillItem;
}

/**
 * Sticky Desktop Live Proof Inspector (Telemetry HUD).
 */
export function LiveInspectorHUD({ skill }: LiveInspectorHUDProps) {
  const status = statusBadge(skill);

  return (
    <aside
      id="bento-live-inspector"
      aria-label="Skill Proof Telemetry Inspector"
      aria-live="polite"
      className="hidden lg:flex lg:sticky lg:top-28 flex-col gap-4 rounded-2xl border border-beige/15 bg-mainGreen/10 p-5 md:p-6 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-colors duration-200 hover:border-beige/25 w-full max-w-full overflow-hidden"
    >
      {/* Telemetry Header */}
      <div className="flex items-center justify-between gap-2 border-b border-beige/10 pb-3">
        <span className="text-[11px] font-mono uppercase tracking-widest text-mainGreen">
          Telemetry HUD
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-mainGreen/40 bg-mainGreen/20 px-2.5 py-0.5 text-xs font-semibold text-beige shrink-0">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full shrink-0",
              status === "Core Daily Stack"
                ? "bg-mainGreen shadow-[0_0_6px_#8DA55B]"
                : status === "Production Deployed"
                  ? "bg-mainGreen/70"
                  : "bg-beige/60",
            )}
            aria-hidden="true"
          />
          <span>{status}</span>
        </span>
      </div>

      {/* Skill Identity: 32px Glyph + Inika Title */}
      <div className="flex items-center gap-3 min-w-0">
        <SkillGlyph
          skill={skill}
          className="text-mainGreen text-[2rem] [&_svg]:text-[2rem] shrink-0"
        />
        <div className="flex flex-col min-w-0 flex-1">
          <h4 className="font-inika text-2xl font-bold tracking-tight text-beige truncate">
            {skill.name}
          </h4>
          <span className="text-xs font-mono uppercase tracking-wider text-beige/60">
            {skill.category} Engineering
          </span>
        </div>
      </div>

      {/* Verbatim Resume Proof Statement */}
      <div className="rounded-xl border border-beige/10 bg-beige/5 p-3.5 break-words">
        <p className="text-[11px] font-mono uppercase tracking-wider text-beige/50 mb-1">
          Production Proof & Context
        </p>
        <p className="text-sm leading-relaxed text-beige/90">{skill.context}</p>
      </div>

      {/* Verifiable Project Links or Honest Fallback */}
      <div className="flex flex-col gap-2 pt-1">
        {skill.projects.length > 0 ? (
          <>
            <span className="text-xs font-mono uppercase tracking-wider text-beige/70">
              Shipped In:
            </span>
            <div className="flex flex-wrap gap-2">
              {skill.projects.map((projId) => (
                <ProjectJumpPill key={projId} projectId={projId} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-xs text-beige/60 italic leading-relaxed">
            Verified in resume — foundational competency without dedicated
            project case study.
          </p>
        )}
      </div>
    </aside>
  );
}

"use client";

import {
  SkillEvidence,
  SkillGlyph,
  ProjectPills,
} from "@/components/skills/shared";
import { skills } from "@/data/portfolioData";
import { useSelectSkill, useSelectedSkillId } from "@/stores/skillsLabStore";
import type { SkillItem } from "@/definitions";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const ZONES: { title: string; ids: string[] }[] = [
  {
    title: "Front-End & UI Systems",
    ids: [
      "javascript",
      "typescript",
      "react",
      "nextjs",
      "html-css",
      "tailwind",
      "mui",
      "bootstrap",
      "responsive-ui",
      "cross-browser",
      "pwa",
      "api-integration",
      "fe-architecture",
    ],
  },
  {
    title: "Back-End, Data & APIs",
    ids: [
      "nodejs",
      "express",
      "rest-apis",
      "postgresql",
      "sqlite",
      "supabase",
      "redis",
      "jwt-rbac",
      "acid-transactions",
      "stripe",
      "python",
    ],
  },
  {
    title: "State, Testing & DevOps",
    ids: [
      "zustand",
      "vitest",
      "git",
      "vercel",
      "performance-optimization",
      "realtime-dashboards",
      "ai-assisted",
    ],
  },
  {
    title: "Global Remote & Communication",
    ids: ["agile-remote", "bilingual-ui", "arabic", "english"],
  },
];

const CORE_DAILY = new Set([
  "typescript",
  "react",
  "nodejs",
  "postgresql",
  "git",
]);

function statusBadge(skill: SkillItem): string {
  if (CORE_DAILY.has(skill.id)) return "Core Daily Stack";
  if (skill.projects.length > 0) return "Production Deployed";
  return "Verified in Resume";
}

const byId = new Map(skills.map((s) => [s.id, s]));

/** Bento zones with a live proof inspector. */
export default function Bento() {
  const selectedSkillId = useSelectedSkillId();
  const selectSkill = useSelectSkill();

  // Keep the inspector populated from the first paint onward.
  useEffect(() => {
    if (!selectedSkillId) selectSkill("typescript");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selected =
    (selectedSkillId && byId.get(selectedSkillId)) || byId.get("typescript")!;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <div className="grid gap-4 sm:grid-cols-2">
        {ZONES.map((zone) => (
          <section
            key={zone.title}
            aria-label={zone.title}
            className="rounded-xl border border-beige/15 bg-mainGreen/10 p-4 backdrop-blur-sm"
          >
            <h3 className="mb-3 text-sm font-semibold text-mainGreen">
              {zone.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {zone.ids.map((id) => {
                const skill = byId.get(id);
                if (!skill) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={selectedSkillId === id}
                    onClick={() => selectSkill(id)}
                    className={cn(
                      "flex min-h-[44px] items-center gap-1.5 rounded-lg border px-3 py-1 text-sm transition-colors duration-200 [&_svg]:text-lg",
                      selectedSkillId === id
                        ? "border-mainGreen bg-mainGreen/25 text-beige"
                        : "border-beige/15 bg-beige/5 text-beige/90 hover:bg-beige/10",
                    )}
                  >
                    <SkillGlyph skill={skill} />
                    {skill.name}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <aside aria-live="polite" className="flex h-fit flex-col gap-3">
        <SkillEvidence skill={selected} />
        <span className="w-fit rounded-full border border-mainGreen/40 bg-mainGreen/20 px-3 py-1 text-xs font-semibold text-beige">
          {statusBadge(selected)}
        </span>
        <ProjectPills ids={selected.projects} label="Jump to:" />
      </aside>
    </div>
  );
}

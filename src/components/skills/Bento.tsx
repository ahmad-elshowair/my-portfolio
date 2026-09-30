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

interface BentoZoneConfig {
  id: string;
  title: string;
  subtitle: string;
  spanClass: string;
  heroIds?: string[];
  ids: string[];
}

const ZONES: BentoZoneConfig[] = [
  {
    id: "frontend",
    title: "Front-End & UI Systems",
    subtitle: "Core Strengths & Architecture",
    spanClass: "md:col-span-2 lg:col-span-2",
    heroIds: ["typescript", "react", "nextjs", "tailwind"],
    ids: [
      "typescript",
      "react",
      "nextjs",
      "tailwind",
      "javascript",
      "html-css",
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
    id: "backend",
    title: "Back-End, Data & APIs",
    subtitle: "Server Architecture & Pipelines",
    spanClass: "md:col-span-1 lg:col-span-1 lg:row-span-2",
    heroIds: ["nodejs", "postgresql"],
    ids: [
      "nodejs",
      "postgresql",
      "express",
      "rest-apis",
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
    id: "devops",
    title: "State, Testing & DevOps",
    subtitle: "Quality & Deployment",
    spanClass: "md:col-span-1 lg:col-span-1",
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
    id: "global",
    title: "Global Remote & Communication",
    subtitle: "Agile & Multilingual",
    spanClass: "md:col-span-2 lg:col-span-1",
    ids: ["agile-remote", "bilingual-ui", "arabic", "english"],
  },
];

const CORE_DAILY = new Set([
  "typescript",
  "react",
  "nextjs",
  "tailwind",
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

/**
 * Bento Stack & Live Proof Inspector.
 * Asymmetrical 4-zone Bento grid coupled with a sticky Live Proof Inspector HUD.
 */
export default function Bento() {
  const selectedSkillId = useSelectedSkillId();
  const selectSkill = useSelectSkill();

  // Keep the inspector populated from the first paint onward to prevent CLS.
  useEffect(() => {
    if (!selectedSkillId) selectSkill("typescript");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selected =
    (selectedSkillId && byId.get(selectedSkillId)) || byId.get("typescript")!;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_21rem] xl:grid-cols-[1fr_23rem] items-start">
      {/* Asymmetrical 4-Zone Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ZONES.map((zone) => {
          const heroSet = new Set(zone.heroIds ?? []);
          return (
            <section
              key={zone.id}
              aria-label={zone.title}
              className={cn(
                "rounded-2xl border border-beige/15 bg-mainGreen/10 p-5 backdrop-blur-md transition-colors duration-200 hover:border-beige/25 flex flex-col justify-between",
                zone.spanClass,
              )}
            >
              <div>
                <div className="mb-4 flex flex-col gap-0.5">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-mainGreen">
                    {zone.subtitle}
                  </span>
                  <h3 className="font-inika text-lg font-semibold text-beige">
                    {zone.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {zone.ids.map((id) => {
                    const skill = byId.get(id);
                    if (!skill) return null;
                    const isSelected = selectedSkillId === id;
                    const isHero = heroSet.has(id);

                    return (
                      <button
                        key={id}
                        type="button"
                        aria-pressed={isSelected}
                        aria-controls="bento-live-inspector"
                        onClick={() => selectSkill(id)}
                        className={cn(
                          "flex min-h-[44px] items-center gap-2 rounded-xl border text-sm transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainGreen focus-visible:ring-offset-2 focus-visible:ring-offset-bgGreen active:scale-[0.98] motion-safe:hover:scale-[1.02]",
                          isHero
                            ? "px-3.5 py-1.5 font-medium"
                            : "px-3 py-1 font-normal",
                          isSelected
                            ? "border-mainGreen bg-mainGreen/25 text-beige shadow-[0_0_15px_rgba(141,165,91,0.3)] ring-1 ring-mainGreen/50"
                            : "border-beige/15 bg-beige/5 text-beige/90 hover:bg-beige/10 hover:border-beige/30",
                        )}
                      >
                        <SkillGlyph
                          skill={skill}
                          className={cn(
                            "text-mainGreen shrink-0",
                            isHero ? "[&_svg]:text-xl" : "[&_svg]:text-lg",
                          )}
                        />
                        <span>{skill.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Sticky Desktop Live Proof Inspector (Telemetry HUD) */}
      <aside
        id="bento-live-inspector"
        aria-label="Skill Proof Telemetry Inspector"
        aria-live="polite"
        className="lg:sticky lg:top-28 flex flex-col gap-3 rounded-2xl border border-beige/15 bg-mainGreen/10 p-5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      >
        <SkillEvidence skill={selected} />
        <span className="w-fit rounded-full border border-mainGreen/40 bg-mainGreen/20 px-3 py-1 text-xs font-semibold text-beige">
          {statusBadge(selected)}
        </span>
        <ProjectPills ids={selected.projects} label="Jump to:" />
      </aside>
    </div>
  );
}

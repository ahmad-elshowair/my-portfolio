"use client";

import { SkillGlyph } from "@/components/skills/shared";
import { skills, SKILL_PROJECTS } from "@/data/portfolioData";
import { useSelectSkill, useSelectedSkillId } from "@/stores/skillsLabStore";
import type { SkillItem, SkillProjectId } from "@/definitions";
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
      "html5",
      "css3",
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
 * Interactive SkillChipButton atom with tactile feedback, glowing halos, and ARIA state.
 */
function SkillChipButton({
  skill,
  isSelected,
  isHero,
  onSelect,
}: {
  skill: SkillItem;
  isSelected: boolean;
  isHero: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      aria-controls="bento-live-inspector"
      aria-label={`Select ${skill.name} to view production proof`}
      onClick={() => onSelect(skill.id)}
      className={cn(
        "group relative flex min-h-[44px] items-center gap-2 rounded-xl border text-sm transition-all duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainGreen focus-visible:ring-offset-2 focus-visible:ring-offset-bgGreen",
        "motion-safe:active:scale-[0.98] motion-safe:hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none",
        isHero
          ? "px-3.5 py-1.5 font-medium backdrop-blur-sm"
          : "px-3 py-1 font-normal",
        isSelected
          ? "border-mainGreen bg-mainGreen/25 text-beige shadow-[0_0_15px_rgba(141,165,91,0.3)] ring-1 ring-mainGreen/50"
          : "border-beige/15 bg-beige/5 text-beige/90 hover:border-beige/30 hover:bg-beige/10 hover:text-beige",
      )}
    >
      {isHero && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-colors duration-200 shrink-0",
            isSelected ? "bg-mainGreen shadow-[0_0_6px_#8DA55B]" : "bg-mainGreen/60 group-hover:bg-mainGreen",
          )}
          aria-hidden="true"
        />
      )}
      <SkillGlyph
        skill={skill}
        className={cn(
          "text-mainGreen shrink-0 transition-transform duration-200 group-hover:scale-105 motion-reduce:transform-none",
          isHero ? "[&_svg]:text-xl" : "[&_svg]:text-lg",
        )}
      />
      <span className="tracking-tight">{skill.name}</span>
    </button>
  );
}

/**
 * Button-in-Button trailing icon launcher pill jumping to a project card in #projects.
 */
function ProjectJumpPill({ projectId }: { projectId: SkillProjectId }) {
  const project = SKILL_PROJECTS[projectId];
  if (!project) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById(`project-${project.anchor}`);
    if (el) {
      e.preventDefault();
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "center",
      });
    }
  };

  return (
    <a
      href={`#project-${project.anchor}`}
      onClick={handleClick}
      className={cn(
        "group inline-flex min-h-[44px] items-center gap-2 rounded-full border border-mainGreen/40 bg-mainGreen/15 pl-3 pr-1.5 py-1 text-xs font-medium text-beige",
        "transition-all duration-200 hover:border-mainGreen hover:bg-mainGreen/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainGreen",
        "motion-safe:active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none",
      )}
    >
      <span>{project.name}</span>
      <span
        className="flex h-5 w-5 items-center justify-center rounded-full bg-mainGreen/20 text-mainGreen text-[11px] transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110 motion-reduce:transform-none"
        aria-hidden="true"
      >
        ↗
      </span>
      <span className="sr-only"> — jump to {project.name} project card in projects section</span>
    </a>
  );
}

/**
 * Sticky Live Proof Inspector (Telemetry HUD).
 */
function LiveInspectorHUD({ skill }: { skill: SkillItem }) {
  const status = statusBadge(skill);

  return (
    <aside
      id="bento-live-inspector"
      aria-label="Skill Proof Telemetry Inspector"
      aria-live="polite"
      className="lg:sticky lg:top-28 flex flex-col gap-4 rounded-2xl border border-beige/15 bg-mainGreen/10 p-5 md:p-6 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-colors duration-200 hover:border-beige/25 w-full max-w-full overflow-hidden"
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
        <p className="text-sm leading-relaxed text-beige/90">
          {skill.context}
        </p>
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
            Verified in resume — foundational competency without dedicated project case study.
          </p>
        )}
      </div>
    </aside>
  );
}

/**
 * Concept 009: Bento Stack & Live Proof Inspector.
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
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-[1fr_21rem] xl:grid-cols-[1fr_23rem] items-start w-full">
      {/* Asymmetrical 4-Zone Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full">
        {ZONES.map((zone) => {
          const heroSet = new Set(zone.heroIds ?? []);
          return (
            <section
              key={zone.id}
              aria-label={zone.title}
              className={cn(
                "rounded-2xl border border-beige/15 bg-mainGreen/10 p-4 sm:p-5 backdrop-blur-md transition-colors duration-200 hover:border-beige/25 flex flex-col justify-between w-full overflow-hidden",
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
                    return (
                      <SkillChipButton
                        key={id}
                        skill={skill}
                        isSelected={selectedSkillId === id}
                        isHero={heroSet.has(id)}
                        onSelect={selectSkill}
                      />
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Sticky Desktop Live Proof Inspector (Telemetry HUD) */}
      <LiveInspectorHUD skill={selected} />
    </div>
  );
}

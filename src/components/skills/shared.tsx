"use client";

import type { SkillItem, SkillProjectId } from "@/definitions";
import { cn } from "@/lib/utils";
import { SKILL_PROJECTS } from "@/data";
import { Icon as IconifyIcon } from "@iconify/react";

/**
 * Shared presentation atoms for every concept variant.
 *
 * One dataset, one glyph language, one evidence presentation — variants compose
 * these instead of re-implementing claim markup, so no concept can drift the
 */

/** Renders a skill's official icon with its screen-reader name; text badge when iconless. */
export function SkillGlyph({
  skill,
  className,
}: {
  skill: SkillItem;
  className?: string;
}) {
  const Icon = skill.icon;
  if (!Icon) return null;

  return (
    <span className={cn("inline-flex items-center", className)}>
      {typeof Icon === "string" ? (
        <IconifyIcon icon={Icon} aria-hidden="true" className="h-[1em] w-[1em] shrink-0" />
      ) : (
        <Icon aria-hidden="true" />
      )}
      <span className="sr-only">{skill.name}</span>
    </span>
  );
}

/** Pill links that jump to the cited project's card anchor (#project-<anchor>). */
export function ProjectPills({
  ids,
  label = "Shipped in:",
  className,
}: {
  ids: readonly SkillProjectId[];
  label?: string | null;
  className?: string;
}) {
  if (ids.length === 0) return null;
  return (
    <span className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {label && <span className="text-xs text-beige/70">{label}</span>}
      {ids.map((id) => (
        <a
          key={id}
          href={`#project-${SKILL_PROJECTS[id].anchor}`}
          className="rounded-full border border-mainGreen/40 bg-mainGreen/20 px-2.5 py-0.5 text-xs text-beige transition-colors hover:bg-mainGreen/40"
        >
          {SKILL_PROJECTS[id].name}
          <span className="sr-only"> — jump to project card</span>
        </a>
      ))}
    </span>
  );
}

/**
 * The standard evidence presentation every concept mounts for a skill:
 * glyph + verbatim name, resume-verbatim context, project pills (or the
 * honest "verified in resume" note when no project association exists).
 * `announce` wraps it in a polite live region for the one-time mount
 * announcement of a carried-over selection.
 */
export function SkillEvidence({
  skill,
  announce = false,
  className,
}: {
  skill: SkillItem;
  announce?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-live={announce ? "polite" : undefined}
      className={cn(
        "flex flex-col gap-2 rounded-lg border border-beige/15 bg-mainGreen/10 p-4 backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-lg text-beige *:shrink-0">
        <SkillGlyph skill={skill} className="[&_svg]:text-2xl" />
        <span className="font-medium">{skill.name}</span>
      </div>
      <p className="text-sm leading-relaxed text-beige/90">{skill.context}</p>
      {skill.projects.length > 0 ? (
        <ProjectPills ids={skill.projects} />
      ) : (
        <p className="text-xs text-beige/60">Verified in resume</p>
      )}
    </div>
  );
}

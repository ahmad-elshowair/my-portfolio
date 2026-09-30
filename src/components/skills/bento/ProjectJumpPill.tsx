"use client";

import { SKILL_PROJECTS } from "@/data";
import type { SkillProjectId } from "@/definitions";
import { cn } from "@/lib/utils";

/**
 * Button-in-Button trailing icon launcher pill jumping to a project card in #projects.
 */
export function ProjectJumpPill({ projectId }: { projectId: SkillProjectId }) {
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
      <span className="sr-only">
        {" "}
        — jump to {project.name} project card in projects section
      </span>
    </a>
  );
}

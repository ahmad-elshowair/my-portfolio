"use client";

import type { TelemetryPayload, TelemetryProjectBadge } from "@/definitions";
import { usePrefersReducedMotion } from "@/hooks";

/** JSON key/value line — keys carry the accent, values the page voice. */
function TelemetryRow({
  name,
  value,
  last,
}: {
  name: string;
  value: string;
  last?: boolean;
}) {
  return (
    <p>
      <span className="text-mainGreen">&quot;{name}&quot;</span>
      <span className="text-beige/50">: </span>
      <span className="text-beige">&quot;{value}&quot;</span>
      {last ? null : <span className="text-beige/50">,</span>}
    </p>
  );
}

/**
 * The click's job is the scroll; the destination card's glow is carried by
 * the selection-derived highlight payload, not by this button.
 */
function ProjectBadge({ project }: { project: TelemetryProjectBadge }) {
  const reduceMotion = usePrefersReducedMotion();
  return (
    <button
      type="button"
      onClick={() => {
        document
          .getElementById(`project-${project.anchorId}`)
          ?.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
          });
      }}
      className="min-h-[44px] rounded-full border border-mainGreen/40 bg-mainGreen/10 px-3 text-xs text-beige transition-colors duration-200 hover:bg-mainGreen/25"
    >
      [🚀 SHIPPED IN {project.name.toUpperCase()}]
    </button>
  );
}

function StatusPill({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-beige/25 bg-beige/10 px-2.5 py-0.5 text-beige/85">
      {children}
    </span>
  );
}

export function TelemetryBlock({ payload }: { payload: TelemetryPayload }) {
  const skill = payload.skill;
  const resume = payload.resume;
  if (skill) {
    return (
      <div className="flex flex-col gap-1 pl-2">
        <span className="text-beige/50">{"{"}</span>
        <div className="flex flex-col gap-1 pl-2">
          <TelemetryRow name="technology" value={skill.name} />
          <TelemetryRow name="category" value={skill.category} />
          <TelemetryRow name="capabilities" value={skill.context} />
          <p className="flex flex-wrap items-center gap-2">
            <span className="text-mainGreen">&quot;production_evidence&quot;</span>
            <span className="text-beige/50">: </span>
            {skill.projects.length > 0 ? (
              skill.projects.map((project) => (
                <ProjectBadge key={project.anchorId} project={project} />
              ))
            ) : (
              <span className="text-beige/50">[]</span>
            )}
            <span className="text-beige/50">,</span>
          </p>
          <p className="flex flex-wrap items-center gap-2">
            <span className="text-mainGreen">&quot;status&quot;</span>
            <span className="text-beige/50">: </span>
            <StatusPill>✔ VERIFIED IN RESUME</StatusPill>
          </p>
        </div>
        <span className="text-beige/50">{"}"}</span>
      </div>
    );
  }
  if (resume) {
    return (
      <div className="flex flex-col gap-1 pl-2">
        <span className="text-beige/50">{"{"}</span>
        <div className="flex flex-col gap-1 pl-2">
          <TelemetryRow name="name" value={resume.name} />
          <TelemetryRow name="role" value={resume.role} />
          <TelemetryRow name="summary" value={resume.summary} />
          <TelemetryRow name="location" value={resume.location} />
          <TelemetryRow
            name="links"
            value={resume.links.map((link) => link.label).join(", ")}
            last
          />
        </div>
        <span className="text-beige/50">{"}"}</span>
      </div>
    );
  }
  return null;
}

"use client";

import { ProjectPills, SkillEvidence, SkillGlyph } from "@/components/skills/shared";
import { SKILL_CATEGORIES, SKILL_PROJECTS, skills } from "@/data/portfolioData";
import { useSelectSkill, useSelectedSkillId } from "@/stores/skillsLabStore";
import type { SkillCategoryId, SkillItem, SkillProjectId } from "@/definitions";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const GROUPS: SkillCategoryId[] = ["frontend", "backend", "tools", "languages"];

/** Proof map — one wall of skills; selecting one cross-glows its projects. */
export default function Concept014() {
  const selectedSkillId = useSelectedSkillId();
  const selectSkill = useSelectSkill();
  const [projectFilter, setProjectFilter] = useState<SkillProjectId | null>(null);

  const selected = skills.find((s) => s.id === selectedSkillId) ?? null;

  // Re-derive the cross-glow from any carried-over selection on mount.
  useEffect(() => {
    if (selectedSkillId) selectSkill(selectedSkillId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2" aria-label="Browse by project">
        <span className="text-sm text-beige/60">Browse by project:</span>
        {(Object.keys(SKILL_PROJECTS) as SkillProjectId[]).map((id) => (
          <button
            key={id}
            type="button"
            aria-pressed={projectFilter === id}
            onClick={() => setProjectFilter(projectFilter === id ? null : id)}
            className={cn(
              "min-h-[36px] rounded-full border px-3 py-1 text-xs transition-colors duration-200",
              projectFilter === id
                ? "border-mainGreen bg-mainGreen/30 text-beige"
                : "border-beige/20 bg-beige/5 text-beige/80 hover:bg-beige/10",
            )}
          >
            {SKILL_PROJECTS[id].name}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-5">
        {GROUPS.map((category) => (
          <div key={category}>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-beige/60">
              {SKILL_CATEGORIES[category]}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills
                .filter((s) => s.category === category)
                .map((skill) => (
                  <WallChip
                    key={skill.id}
                    skill={skill}
                    selected={selectedSkillId === skill.id}
                    dimmed={
                      projectFilter !== null && !skill.projects.includes(projectFilter)
                    }
                    onSelect={() =>
                      selectSkill(selectedSkillId === skill.id ? null : skill.id)
                    }
                  />
                ))}
            </div>
          </div>
        ))}
      </div>

      <div aria-live="polite">
        {selected ? (
          <div className="flex flex-col gap-3">
            <SkillEvidence skill={selected} />
            <div className="flex flex-wrap items-center gap-3">
              <ProjectPills ids={selected.projects} label="Shipped in:" />
              {selected.projects.length > 0 && (
                <a
                  href={`#project-${SKILL_PROJECTS[selected.projects[0]].anchor}`}
                  className="rounded-full bg-mainGreen px-4 py-2 text-sm font-semibold text-bgGreen transition-all duration-200 hover:brightness-95"
                >
                  View matching projects
                  <span className="sr-only"> — jump to the first cited card</span>
                </a>
              )}
              <button
                type="button"
                onClick={() => selectSkill(null)}
                className="min-h-[36px] rounded-full border border-beige/20 px-3 py-1 text-xs text-beige/80 transition-colors duration-200 hover:bg-beige/10"
              >
                Clear selection
              </button>
            </div>
          </div>
        ) : (
          <p className="rounded-lg border border-beige/10 bg-mainGreen/5 p-4 text-sm text-beige/70">
            Select any skill to see where it shipped.
          </p>
        )}
      </div>
    </div>
  );
}

function WallChip({
  skill,
  selected,
  dimmed,
  onSelect,
}: {
  skill: SkillItem;
  selected: boolean;
  dimmed: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex min-h-[44px] items-center gap-2 rounded-xl border px-3 py-1.5 text-sm transition-all duration-200 [&_svg]:text-lg",
        selected
          ? "border-mainGreen bg-mainGreen/25 text-beige shadow-[0_0_15px_rgba(141,165,91,0.25)] scale-100"
          : "border-beige/15 bg-beige/5 text-beige/90 hover:bg-beige/10",
        dimmed && "opacity-25",
      )}
    >
      <SkillGlyph skill={skill} />
      {skill.name}
    </button>
  );
}

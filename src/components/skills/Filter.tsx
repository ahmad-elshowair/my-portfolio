"use client";

import { SkillGlyph } from "@/components/skills/shared";
import { SKILL_CATEGORIES, SKILL_PROJECTS, skills } from "@/data/portfolioData";
import { useSelectSkill, useSelectedSkillId } from "@/stores/skillsLabStore";
import { useState } from "react";
import { cn } from "@/lib/utils";

const PRESETS = [
  { id: "all", label: "All Skills" },
  { id: "frontend", label: "Front-End Focus" },
  { id: "backend", label: "Back-End & APIs" },
  { id: "security", label: "Security & Data Integrity" },
  { id: "tools", label: "Tools & DevOps" },
] as const;

const SECURITY_IDS = new Set([
  "jwt-rbac",
  "acid-transactions",
  "redis",
  "postgresql",
  "supabase",
  "sqlite",
  "stripe",
]);

function matchesPreset(
  preset: (typeof PRESETS)[number]["id"],
  category: string,
  id: string,
) {
  if (preset === "all") return true;
  if (preset === "security") return SECURITY_IDS.has(id);
  return category === preset;
}

/** Recruiter domain filter with spotlight/dim cross-lighting and a jump HUD. */
export default function Filter() {
  const [preset, setPreset] = useState<(typeof PRESETS)[number]["id"]>("all");
  const [query, setQuery] = useState("");
  const selectedSkillId = useSelectedSkillId();
  const selectSkill = useSelectSkill();

  const q = query.trim().toLowerCase();
  const visible = skills.filter(
    (s) =>
      matchesPreset(preset, s.category, s.id) &&
      (q === "" ||
        s.name.toLowerCase().includes(q) ||
        SKILL_CATEGORIES[s.category].toLowerCase().includes(q) ||
        s.projects.some((p) =>
          SKILL_PROJECTS[p].name.toLowerCase().includes(q),
        )),
  );
  const visibleIds = new Set(visible.map((s) => s.id));
  const selected = skills.find((s) => s.id === selectedSkillId) ?? null;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-pressed={preset === p.id}
            onClick={() => setPreset(p.id)}
            className={cn(
              "min-h-[36px] rounded-full border px-3 py-1 text-xs transition-colors duration-200",
              preset === p.id
                ? "border-mainGreen bg-mainGreen/30 text-beige"
                : "border-beige/20 bg-beige/5 text-beige/80 hover:bg-beige/10",
            )}
          >
            {p.label}
          </button>
        ))}
        <div className="relative ml-auto">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Filter skills by keyword"
            placeholder="Search skills…"
            className="min-h-[44px] w-56 rounded-full border border-beige/20 bg-beige/5 px-4 text-sm text-beige placeholder:text-beige/40"
          />
          <span
            aria-live="polite"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-beige/60"
          >
            {visible.length}/{skills.length}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2" aria-label="Skills">
        {skills.map((skill) => {
          const isMatch = visibleIds.has(skill.id);
          return (
            <button
              key={skill.id}
              type="button"
              aria-pressed={selectedSkillId === skill.id}
              onClick={() => selectSkill(skill.id)}
              className={cn(
                "flex min-h-[44px] items-center gap-1.5 rounded-xl border px-3 py-1 text-sm transition-all duration-200 [&_svg]:text-lg",
                selectedSkillId === skill.id
                  ? "border-mainGreen bg-mainGreen/25 text-beige shadow-[0_0_15px_rgba(141,165,91,0.25)]"
                  : "border-beige/15 bg-beige/5 text-beige/90 hover:bg-beige/10",
                !isMatch && "opacity-25",
              )}
            >
              <SkillGlyph skill={skill} />
              {skill.name}
            </button>
          );
        })}
        {visible.length === 0 && (
          <p className="rounded-lg border border-beige/10 bg-mainGreen/5 p-4 text-sm text-beige/70">
            No skills matching &quot;{query}&quot; found in resume. Try
            &quot;react&quot;, &quot;sql&quot;, &quot;auth&quot;, or reset.
          </p>
        )}
      </div>

      <div aria-live="polite">
        {selected ? (
          <div className="flex flex-wrap items-center gap-3 rounded-lg border border-mainGreen/30 bg-mainGreen/10 p-4 text-sm">
            <span className="font-semibold text-beige">{selected.name}</span>
            <span className="text-beige/80">{selected.context}</span>
            {selected.projects.length > 0 && (
              <>
                <span className="text-beige/60">
                  Shipped in:{" "}
                  {selected.projects
                    .map((p) => SKILL_PROJECTS[p].name)
                    .join(", ")}
                </span>
                <a
                  href={`#project-${SKILL_PROJECTS[selected.projects[0]].anchor}`}
                  className="rounded-full bg-mainGreen px-4 py-2 text-xs font-semibold text-bgGreen transition-all duration-200 hover:brightness-95"
                >
                  View Project
                  <span className="sr-only">
                    {" "}
                    — jump to the first cited card
                  </span>
                </a>
              </>
            )}
          </div>
        ) : (
          <p className="text-sm text-beige/60">
            Select a skill to see where it shipped.
          </p>
        )}
      </div>
    </div>
  );
}

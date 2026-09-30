"use client";

import { SkillEvidence, SkillGlyph } from "@/components/skills/shared";
import { skills } from "@/data/portfolioData";
import { useSelectSkill, useSelectedSkillId } from "@/stores/skillsLabStore";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    label: "Client & Presentation",
    ids: ["nextjs", "react", "typescript", "javascript", "html-css", "tailwind", "mui", "responsive-ui", "cross-browser", "pwa", "api-integration", "fe-architecture"],
  },
  {
    label: "Application, Auth & Payments",
    ids: ["nodejs", "express", "rest-apis", "jwt-rbac", "stripe", "zustand", "python"],
  },
  {
    label: "Persistence, Caching & Integrity",
    ids: ["postgresql", "sqlite", "supabase", "redis", "acid-transactions"],
  },
  {
    label: "Foundation — Practices & Languages",
    ids: ["git", "vitest", "vercel", "agile-remote", "ai-assisted", "performance-optimization", "realtime-dashboards", "bilingual-ui", "arabic", "english"],
  },
];

// Tier-adjacency edge map — how the layers talk to each other.
const EDGES: Record<string, string[]> = {
  nextjs: ["react", "typescript"],
  react: ["typescript"],
  typescript: ["nodejs"],
  nodejs: ["express"],
  express: ["postgresql", "redis"],
  "rest-apis": ["express"],
  supabase: ["postgresql"],
  stripe: ["express"],
};

const byId = new Map(skills.map((s) => [s.id, s]));

/** System architecture topology — stacked tiers with a node inspector. */
export default function Concept011() {
  const selectedSkillId = useSelectedSkillId();
  const selectSkill = useSelectSkill();
  const selected = selectedSkillId ? byId.get(selectedSkillId) ?? null : null;
  const related = selected ? EDGES[selected.id] ?? [] : [];

  return (
    <div className="flex flex-col gap-3">
      {TIERS.map((tier, index) => (
        <div key={tier.label} className="flex flex-col gap-3">
          <section
            aria-label={tier.label}
            className="rounded-xl border border-beige/15 bg-mainGreen/10 p-4 backdrop-blur-sm"
          >
            <h3 className="mb-3 text-sm font-semibold text-mainGreen">{tier.label}</h3>
            <div className="flex flex-wrap gap-2">
              {tier.ids.map((id) => {
                const skill = byId.get(id);
                if (!skill) return null;
                const isSelected = selectedSkillId === id;
                const isRelated = related.includes(id);
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => selectSkill(isSelected ? null : id)}
                    className={cn(
                      "flex min-h-[44px] items-center gap-1.5 rounded-lg border px-3 py-1 text-sm transition-all duration-200 [&_svg]:text-lg",
                      isSelected && "border-mainGreen bg-mainGreen/30 text-beige",
                      !isSelected && isRelated && "border-mainGreen/60 bg-mainGreen/15 text-beige",
                      !isSelected && !isRelated && "border-beige/15 bg-beige/5 text-beige/90 hover:bg-beige/10",
                    )}
                  >
                    <SkillGlyph skill={skill} />
                    {skill.name}
                  </button>
                );
              })}
            </div>
          </section>
          {index < TIERS.length - 1 && (
            <div aria-hidden="true" className="flex justify-center text-mainGreen/60">
              ▼
            </div>
          )}
        </div>
      ))}

      <div aria-live="polite" className="flex flex-col gap-3">
        {selected ? (
          <>
            <SkillEvidence skill={selected} />
            {related.length > 0 && (
              <p className="text-sm text-beige/70">
                Talks to:{" "}
                <span className="font-medium text-beige">
                  {related.map((id) => byId.get(id)?.name ?? id).join(" · ")}
                </span>
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-beige/60">Select a node to inspect its tier and pipeline.</p>
        )}
      </div>
    </div>
  );
}

"use client";

import { SkillGlyph } from "@/components/skills/shared";
import { SKILL_CATEGORIES, skills } from "@/data";
import { GROUPS } from "./cli";
import { cn } from "@/lib/utils";

export function SkillCatalog({
  selectedSkillId,
  onInspect,
}: {
  selectedSkillId: string | null;
  onInspect: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {GROUPS.map((category) => (
        <section
          key={category}
          className="rounded-2xl border border-beige/15 bg-mainGreen/10 p-4 backdrop-blur-md"
        >
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-beige/80">
            {SKILL_CATEGORIES[category]}
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills
              .filter((s) => s.category === category)
              .map((skill) => (
                <button
                  key={skill.id}
                  type="button"
                  aria-pressed={selectedSkillId === skill.id}
                  onClick={() => onInspect(skill.id)}
                  className={cn(
                    "flex min-h-[44px] items-center gap-1.5 rounded-lg border px-3 py-1 text-sm transition-colors duration-200 [&_svg]:text-lg",
                    selectedSkillId === skill.id
                      ? "border-mainGreen bg-mainGreen/25 text-beige"
                      : "border-beige/15 bg-beige/5 text-beige/90 hover:bg-beige/10",
                  )}
                >
                  <SkillGlyph skill={skill} />
                  {skill.name}
                </button>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

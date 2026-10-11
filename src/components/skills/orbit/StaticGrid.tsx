"use client";

import { SKILL_CATEGORIES } from "@/data";
import { ORBIT_RINGS } from "@/definitions";
import { byCategory } from "./motion";
import { GridChip } from "./Chips";
import type { SkillItem } from "@/definitions";

/**
 * The complete static baseline (Article VI): grouped category rows with
 * visible names, the Languages line, and full touch accessibility — rendered
 * everywhere the ambient-motion gate fails closed.
 */
export function StaticGrid({
  selectedSkillId,
  onSelectSkill,
}: {
  selectedSkillId: string | null;
  onSelectSkill: (id: string | null) => void;
}) {
  const languages = byCategory("languages");

  return (
    <div className="flex flex-col gap-5">
      {ORBIT_RINGS.map(({ id, category }) => (
        <div key={id}>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-beige/60">
            {SKILL_CATEGORIES[category]}
          </h3>
          <div className="flex flex-wrap gap-2">
            {byCategory(category).map((skill: SkillItem) => (
              <GridChip
                key={skill.id}
                skill={skill}
                selected={selectedSkillId === skill.id}
                onSelect={() => onSelectSkill(selectedSkillId === skill.id ? null : skill.id)}
              />
            ))}
          </div>
        </div>
      ))}
      <p className="flex flex-wrap gap-x-3 text-sm text-beige/70">
        {languages.map((skill) => (
          <span key={skill.id} className="font-medium">
            {skill.context}
          </span>
        ))}
      </p>
    </div>
  );
}

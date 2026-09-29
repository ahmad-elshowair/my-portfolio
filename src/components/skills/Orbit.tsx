"use client";

import { SkillEvidence, SkillGlyph } from "@/components/skills/shared";
import { SKILL_CATEGORIES, skills } from "@/data/portfolioData";
import { AUTHOR } from "@/lib/site";
import { useDesktopViewport } from "@/hooks/useDesktopViewport";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useSelectSkill, useSelectedSkillId } from "@/stores/skillsLabStore";
import type { SkillItem } from "@/definitions";
import { cn } from "@/lib/utils";

/**
 * Orbit constellation. Concentric category rings (tools inner, front-end
 * middle, back-end outer) around the candidate headline on desktop; a static
 * grouped grid everywhere else. Ring rotation stays OFF until its motion
 * ruling lands — this is the complete static experience, not a stub.
 */

const RINGS = [
  { category: "tools", radius: 130 },
  { category: "frontend", radius: 195 },
  { category: "backend", radius: 260 },
] as const;

const byCategory = (category: SkillItem["category"]) =>
  skills.filter((s) => s.category === category);

export default function Concept016() {
  const selectedSkillId = useSelectedSkillId();
  const selectSkill = useSelectSkill();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDesktopViewport = useDesktopViewport();
  const useOrbit = isDesktopViewport && !prefersReducedMotion;

  const selected = selectedSkillId ? skills.find((s) => s.id === selectedSkillId) : undefined;
  const languages = byCategory("languages");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center gap-4 text-xs text-beige/60">
        {RINGS.map(({ category }) => (
          <span key={category} className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-2 w-2 rounded-full border border-mainGreen" />
            {SKILL_CATEGORIES[category]}
          </span>
        ))}
      </div>

      {useOrbit ? (
        <div className="relative mx-auto h-[38rem] w-full max-w-3xl">
          {RINGS.map(({ category, radius }) => (
            <div
              key={category}
              aria-label={`${SKILL_CATEGORIES[category]} ring`}
              className="absolute left-1/2 top-1/2 rounded-full border border-beige/10"
              style={{ width: radius * 2, height: radius * 2, transform: "translate(-50%, -50%)" }}
            >
              {byCategory(category).map((skill, index, all) => {
                const angle = (index / all.length) * 360 - 90;
                return (
                  <span
                    key={skill.id}
                    className="absolute left-1/2 top-1/2 h-0 w-0"
                    style={{ transform: `rotate(${angle}deg) translate(${radius}px)` }}
                  >
                    <RingChip
                      skill={skill}
                      selected={selectedSkillId === skill.id}
                      onSelect={() => selectSkill(selectedSkillId === skill.id ? null : skill.id)}
                    />
                  </span>
                );
              })}
            </div>
          ))}

          <div className="absolute left-1/2 top-1/2 flex w-56 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-center">
            <span className={`text-xl font-bold text-mainGreen ${"font-sans"}`}>{AUTHOR.name}</span>
            <span className="text-sm text-beige/80">{AUTHOR.role}</span>
            <span className="mt-2 flex flex-wrap justify-center gap-x-2 text-xs text-beige/60">
              {languages.map((skill) => (
                <span key={skill.id}>{skill.name}</span>
              ))}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {(["tools", "frontend", "backend"] as const).map((category) => (
            <div key={category}>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-beige/60">
                {SKILL_CATEGORIES[category]}
              </h3>
              <div className="flex flex-wrap gap-2">
                {byCategory(category).map((skill) => (
                  <RingChip
                    key={skill.id}
                    skill={skill}
                    selected={selectedSkillId === skill.id}
                    onSelect={() => selectSkill(selectedSkillId === skill.id ? null : skill.id)}
                  />
                ))}
              </div>
            </div>
          ))}
          <p className="flex flex-wrap gap-x-3 text-sm text-beige/70">
            {languages.map((skill) => (
              <span key={skill.id} className="font-medium">{skill.name}</span>
            ))}
          </p>
        </div>
      )}

      <div aria-live="polite">
        {selected ? (
          <SkillEvidence skill={selected} />
        ) : (
          <p className="text-sm text-beige/60">
            Focus or select a satellite to spotlight its evidence.
          </p>
        )}
      </div>
    </div>
  );
}

function RingChip({
  skill,
  selected,
  onSelect,
}: {
  skill: SkillItem;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs transition-colors duration-200 [&_svg]:text-sm",
        selected
          ? "border-mainGreen bg-mainGreen/30 text-beige shadow-[0_0_12px_rgba(141,165,91,0.3)]"
          : "border-beige/20 bg-bgGreen/80 text-beige/90 hover:bg-beige/10",
      )}
    >
      <SkillGlyph skill={skill} />
      {skill.name}
    </button>
  );
}

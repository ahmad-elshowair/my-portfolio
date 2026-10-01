"use client";

import { SkillGlyph } from "@/components/skills/shared";
import { SKILL_CATEGORIES, SKILL_PROJECTS, skills } from "@/data";
import { useSelectSkill, useSelectedSkillId } from "@/stores/skillsLabStore";
import type { SkillCategoryId, SkillItem } from "@/definitions";
import { useState } from "react";
import { cn } from "@/lib/utils";

const GROUPS: SkillCategoryId[] = ["frontend", "backend", "tools", "languages"];
const MAX_ENTRIES = 6;

interface Entry {
  cmd: string;
  skill?: SkillItem;
  batch?: string[];
  /** Guidance line rendered without a prompt echo — teaching, not output. */
  hint?: string;
}

function inspectEntry(skill: SkillItem): Entry {
  return { cmd: `ahmad-cli inspect --skill="${skill.name}"`, skill };
}

const byId = new Map(skills.map((s) => [s.id, s]));

/** Developer terminal — dual pane with instant CLI-style inspection. */
export default function Concept012() {
  const selectedSkillId = useSelectedSkillId();
  const selectSkill = useSelectSkill();
  // A carried-over selection is inspected once, at first render.
  const [entries, setEntries] = useState<Entry[]>(() => {
    const skill = selectedSkillId ? byId.get(selectedSkillId) : undefined;
    return skill ? [inspectEntry(skill)] : [];
  });

  const pushEntry = (entry: Entry) =>
    setEntries((prev) => [...prev, entry].slice(-MAX_ENTRIES));

  const inspect = (id: string) => {
    selectSkill(id);
    const skill = byId.get(id);
    if (skill) pushEntry(inspectEntry(skill));
  };

  const runPreset = (category: SkillCategoryId | "clear") => {
    if (category === "clear") {
      setEntries([]);
      selectSkill(null);
      return;
    }
    const names = skills
      .filter((s) => s.category === category)
      .map((s) => s.name);
    pushEntry({ cmd: `ahmad-cli inspect --${category}`, batch: names });
  };

  /** Before any telemetry exists, the copy action teaches the command instead. */
  const copyLatestJson = () => {
    setEntries((prev) => {
      const hasTelemetry = prev.some((entry) => entry.skill !== undefined);
      if (hasTelemetry) return prev;
      return [...prev, { cmd: "", hint: "nothing to copy — run inspect <skill> first" }].slice(
        -MAX_ENTRIES,
      );
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className="flex flex-col gap-4">
        {GROUPS.map((category) => (
          <section
            key={category}
            className="rounded-2xl border border-beige/15 bg-mainGreen/10 p-4 backdrop-blur-md"
          >
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-beige/60">
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
                    onClick={() => inspect(skill.id)}
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

      <div className="flex flex-col gap-3">
        <div className="overflow-hidden rounded-xl border border-beige/20 bg-bgGreen/85 shadow-[0_8px_32px_rgba(22,26,25,0.5)] backdrop-blur-md">
          <div className="flex items-center gap-2 border-b border-beige/10 px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-beige/30" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-beige/30" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-beige/30" aria-hidden="true" />
            <span className="ml-2 font-mono text-xs text-beige/70">
              ahmad@stack:~ (zsh - 80x24)
            </span>
            <button
              type="button"
              onClick={copyLatestJson}
              aria-label="Copy the latest inspection JSON"
              className="ml-auto min-h-[44px] rounded-md border border-beige/20 bg-beige/5 px-3 font-mono text-xs text-beige/80 transition-colors duration-200 hover:bg-beige/10"
            >
              Copy JSON
            </button>
          </div>
          <div
            aria-live="polite"
            className="flex max-h-96 min-h-[16rem] flex-col gap-3 overflow-y-auto p-4 font-mono text-xs leading-relaxed text-beige/90 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-beige/20"
          >
            <p>
              <span className="text-mainGreen">$</span>{" "}
              ahmad.inspectStack() --role=&quot;Full-Stack Developer&quot;
            </p>
            {entries.map((entry, index) => (
              <div key={`${entry.cmd}-${index}`}>
                {entry.cmd ? (
                  <p>
                    <span className="text-mainGreen">$</span> {entry.cmd}
                  </p>
                ) : null}
                {entry.hint ? (
                  <p className="pl-2 text-beige/60">{entry.hint}</p>
                ) : null}
                {entry.skill ? (
                  <>
                    <p className="pl-2 text-beige/60">
                      &gt; Querying production registry…
                    </p>
                    <pre className="pl-2 whitespace-pre-wrap text-beige/85">{`{
  "technology": "${entry.skill.name}",
  "category": "${SKILL_CATEGORIES[entry.skill.category]}",
  "capabilities": "${entry.skill.context}",
  "production_evidence": [${entry.skill.projects
    .map((p) => `"${SKILL_PROJECTS[p].name}"`)
    .join(", ")}],
  "status": "Verified in Resume"
}`}</pre>
                  </>
                ) : entry.batch ? (
                  <p className="pl-2 text-beige/85">{`> [${entry.batch.join(", ")}]`}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {GROUPS.slice(0, 3).map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => runPreset(category)}
              className="min-h-[36px] rounded-full border border-beige/20 bg-beige/5 px-3 py-1 font-mono text-xs text-beige/80 transition-colors duration-200 hover:bg-beige/10"
            >
              $ inspect --{category}
            </button>
          ))}
          <button
            type="button"
            onClick={() => runPreset("clear")}
            className="min-h-[36px] rounded-full border border-beige/20 bg-beige/5 px-3 py-1 font-mono text-xs text-beige/80 transition-colors duration-200 hover:bg-beige/10"
          >
            $ clear
          </button>
        </div>
      </div>
    </div>
  );
}

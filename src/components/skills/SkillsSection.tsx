"use client";

import { CONCEPT_IDS, CONCEPT_LIST, CONCEPT_REGISTRY } from "@/components/skills/registry";
import { inika } from "@/lib/fonts";
import { useSetLabConcept } from "@/stores/skillsLabStore";
import type { ConceptId } from "@/definitions";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "skills-concept";
const DEFAULT_CONCEPT: ConceptId = "013";

function isConceptId(value: string | null): value is ConceptId {
  return value !== null && value in CONCEPT_REGISTRY;
}

const SkillsSection = () => {
  const [active, setActive] = useState<ConceptId>(DEFAULT_CONCEPT);
  const setConcept = useSetLabConcept();
  const radioRefs = useRef<Partial<Record<ConceptId, HTMLButtonElement | null>>>({});
  const ActiveConcept = CONCEPT_REGISTRY[active].component;

  const activate = useCallback(
    (id: ConceptId) => {
      setActive(id);
      setConcept(id); // clears the cross-glow centrally on every switch
      try {
        window.localStorage.setItem(STORAGE_KEY, id);
      } catch {
        // storage unavailable — preference simply doesn't persist
      }
    },
    [setConcept],
  );

  // Mount sync: apply any stored choice. Must run post-mount so the server
  // render and hydration agree on the default concept first.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isConceptId(stored) && stored !== DEFAULT_CONCEPT) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time stored-preference swap; running before paint would desync hydration
        activate(stored);
      }
    } catch {
      // storage unavailable — default stands
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const current = CONCEPT_IDS.indexOf(active);
    let next: number;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (current + 1) % CONCEPT_IDS.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (current - 1 + CONCEPT_IDS.length) % CONCEPT_IDS.length;
    } else {
      return;
    }
    event.preventDefault();
    const nextId = CONCEPT_IDS[next];
    activate(nextId);
    radioRefs.current[nextId]?.focus();
  };

  return (
    <section id="skills" className="py-20 backdrop-blur-sm">
      <div className="relative mx-auto max-w-5xl">
        <span className="absolute left-[-5%] top-[-12%] -z-10 h-40 w-40 rounded-full bg-mainGreen opacity-20 blur-[20px] md:left-[-5%] md:top-[-12%] md:h-52 md:w-52" />
        <div className="mb-10 flex items-baseline gap-5">
          <h2 className={`text-4xl font-bold text-mainGreen md:text-6xl ${inika.className}`}>
            skills
          </h2>
          <div className="flex items-center gap-1" aria-hidden="true">
            <span className="h-3 w-[40px] rounded-lg bg-beige" />
            <span className="h-3 w-[25px] rounded-lg bg-beige" />
            <span className="h-3 w-[12px] rounded-lg bg-mainGreen" />
          </div>
        </div>

        <div
          role="radiogroup"
          aria-label="Skills section concept"
          onKeyDown={handleKeyDown}
          className="mb-8 flex gap-2 overflow-x-auto pb-2"
        >
          {CONCEPT_LIST.map(({ id, label, blurb }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                ref={(el) => {
                  radioRefs.current[id] = el;
                }}
                type="button"
                role="radio"
                aria-checked={isActive}
                aria-label={`${label} — ${blurb}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => activate(id)}
                className={cn(
                  "min-h-[44px] shrink-0 rounded-full border px-4 py-2 text-sm transition-colors duration-200",
                  isActive
                    ? "border-mainGreen bg-mainGreen font-semibold text-bgGreen shadow-[0_0_18px_rgba(141,165,91,0.45)]"
                    : "border-beige/20 bg-beige/5 text-beige/85 hover:bg-beige/10 hover:text-beige",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        <ActiveConcept key={active} />
      </div>
    </section>
  );
};

export default SkillsSection;

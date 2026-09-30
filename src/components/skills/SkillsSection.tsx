"use client";

import { CONCEPT_LIST, CONCEPT_REGISTRY } from "@/components/skills/registry";
import { ConceptFanSwitcher } from "@/components/skills/switcher";
import { inika } from "@/lib/fonts";
import { useSetLabConcept } from "@/stores/skillsLabStore";
import type { ConceptId } from "@/definitions";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "skills-concept";
const DEFAULT_CONCEPT: ConceptId = "009";

function isConceptId(value: string | null): value is ConceptId {
  return value !== null && value in CONCEPT_REGISTRY;
}

const SkillsSection = () => {
  const [active, setActive] = useState<ConceptId>(DEFAULT_CONCEPT);
  const setConcept = useSetLabConcept();
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

  return (
    <section id="skills" className="py-20 backdrop-blur-sm">
      <div className="relative mx-auto max-w-5xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-baseline gap-5">
            <h2
              className={`relative isolate text-4xl font-bold text-mainGreen md:text-6xl ${inika.className}`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-44 w-44 rounded-full bg-mainGreen opacity-20 blur-[28px] md:h-52 md:w-52"
              />
              skills
            </h2>
            <div className="flex items-center gap-1" aria-hidden="true">
              <span className="h-3 w-[40px] rounded-lg bg-beige" />
              <span className="h-3 w-[25px] rounded-lg bg-beige" />
              <span className="h-3 w-[12px] rounded-lg bg-mainGreen" />
            </div>
          </div>

          {/* Radial Concept Fan Switcher matching user sketch */}
          <ConceptFanSwitcher
            active={active}
            onSelect={activate}
            concepts={CONCEPT_LIST}
          />
        </div>

        <ActiveConcept key={active} />
      </div>
    </section>
  );
};

export default SkillsSection;

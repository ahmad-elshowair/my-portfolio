"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useSelectSkill, useSelectedSkillId } from "@/stores/skillsLabStore";
import {
  byId,
  LiveInspectorHUD,
  MobileTelemetryDock,
  SkillChipButton,
  ZONES,
} from "./bento-grid";

/**
 * Bento Stack & Live Proof Inspector.
 * Asymmetrical 4-zone Bento grid coupled with a sticky Live Proof Inspector HUD
 * on desktop and a reactive floating dock with slide-up proof drawer on mobile.
 */
export default function Bento() {
  const selectedSkillId = useSelectedSkillId();
  const selectSkill = useSelectSkill();

  // Keep the inspector populated from the first paint onward to prevent CLS.
  useEffect(() => {
    if (!selectedSkillId) selectSkill("typescript");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selected =
    (selectedSkillId && byId.get(selectedSkillId)) || byId.get("typescript")!;

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-[1fr_21rem] xl:grid-cols-[1fr_23rem] items-start w-full pb-20 lg:pb-0">
      {/* Asymmetrical 4-Zone Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-flow-dense gap-4 md:gap-5 w-full">
        {ZONES.map((zone) => {
          const heroSet = new Set(zone.heroIds ?? []);
          return (
            <section
              key={zone.id}
              aria-label={zone.title}
              className={cn(
                "rounded-2xl border border-beige/15 bg-mainGreen/10 p-4 sm:p-5 backdrop-blur-md transition-colors duration-200 hover:border-beige/25 flex flex-col justify-between w-full overflow-hidden",
                zone.spanClass,
              )}
            >
              <div>
                <div className="mb-4 flex flex-col gap-0.5">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-mainGreen">
                    {zone.subtitle}
                  </span>
                  <h3 className="font-inika text-lg font-semibold text-beige">
                    {zone.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {zone.ids.map((id) => {
                    const skill = byId.get(id);
                    if (!skill) return null;
                    return (
                      <SkillChipButton
                        key={id}
                        skill={skill}
                        isSelected={selectedSkillId === id}
                        isHero={heroSet.has(id)}
                        onSelect={selectSkill}
                      />
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Sticky Desktop Live Proof Inspector (Telemetry HUD) */}
      <LiveInspectorHUD skill={selected} />

      {/* Mobile Floating Telemetry Dock & Drawer (< lg) */}
      <MobileTelemetryDock skill={selected} />
    </div>
  );
}

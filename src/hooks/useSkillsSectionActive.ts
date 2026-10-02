import { useEffect, useState } from "react";

/**
 * Gate for floating docks that belong to the skills section: true while the
 * section owns the viewport's middle band and the projects section hasn't
 * started taking it over. The root margins express the same band a
 * scroll-plus-rect check would, without work on every scroll tick.
 */
export function useSkillsSectionActive(): boolean {
  const [skillsInBand, setSkillsInBand] = useState(true);
  const [projectsTakingOver, setProjectsTakingOver] = useState(false);

  useEffect(() => {
    const skillsSection = document.getElementById("skills");
    if (!skillsSection) return;

    const observers: IntersectionObserver[] = [];

    // Middle band: skills stays active while any part of it crosses the
    // viewport's 25%..75% strip.
    const skillsObserver = new IntersectionObserver(
      ([entry]) => setSkillsInBand(entry.isIntersecting),
      { rootMargin: "25% 0px 25% 0px" },
    );
    skillsObserver.observe(skillsSection);
    observers.push(skillsObserver);

    // Takeover: projects claims the viewport once its top passes 75% height.
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      const projectsObserver = new IntersectionObserver(
        ([entry]) => setProjectsTakingOver(entry.isIntersecting),
        { rootMargin: "0px 0px -25% 0px" },
      );
      projectsObserver.observe(projectsSection);
      observers.push(projectsObserver);
    }

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return skillsInBand && !projectsTakingOver;
}

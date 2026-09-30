import { useEffect, useState } from "react";

export interface NavSection {
  label: string;
  id: string;
}

/**
 * Scroll spy hook that determines which section is currently active in the viewport.
 */
export function useActiveSection(
  sections: readonly NavSection[],
  defaultSectionId = "me",
  offset = 180,
) {
  const [activeSection, setActiveSection] = useState(defaultSectionId);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80;

      if (isBottom) {
        const lastSection = sections[sections.length - 1];
        if (lastSection) setActiveSection(lastSection.id);
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, offset]);

  return [activeSection, setActiveSection] as const;
}

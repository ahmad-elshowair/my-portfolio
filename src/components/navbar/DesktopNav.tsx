import { cn } from "@/lib/utils";
import Link from "next/link";
import { NAV_SECTIONS } from "./navbar.constants";

export interface DesktopNavProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
}

/**
 * Desktop navigation pill links with active glow indicators.
 */
export function DesktopNav({ activeSection, onSelectSection }: DesktopNavProps) {
  return (
    <ul className="hidden items-center gap-2 md:flex">
      {NAV_SECTIONS.map(({ label, id }) => {
        const isActive = activeSection === id;
        return (
          <li key={id}>
            <Link
              href={`#${id}`}
              onClick={() => onSelectSection(id)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative px-5 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-200 ease-in-out",
                isActive
                  ? "bg-mainGreen text-bgGreen font-semibold shadow-[0_0_18px_rgba(141,165,91,0.45)] scale-105"
                  : "text-beige/85 hover:text-beige hover:bg-beige/10",
              )}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

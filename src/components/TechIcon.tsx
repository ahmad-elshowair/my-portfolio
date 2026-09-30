import { Icon as IconifyIcon } from "@iconify/react";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

export interface TechIconProps {
  icon?: IconType | string | null;
  name?: string;
  className?: string;
}

/**
 * Unified icon component supporting both React Icons (IconType)
 * and Iconify string identifiers, with optional screen-reader accessible label.
 */
export function TechIcon({ icon, name, className }: TechIconProps) {
  if (!icon) return null;

  if (name) {
    return (
      <span className={cn("inline-flex items-center", className)}>
        {typeof icon === "string" ? (
          <IconifyIcon
            icon={icon}
            className="h-[1em] w-[1em] shrink-0"
            aria-hidden="true"
          />
        ) : (
          (() => {
            const IconComponent = icon;
            return <IconComponent aria-hidden="true" />;
          })()
        )}
        <span className="sr-only">{name}</span>
      </span>
    );
  }

  if (typeof icon === "string") {
    return <IconifyIcon icon={icon} className={className} aria-hidden="true" />;
  }

  const IconComponent = icon;
  return <IconComponent className={className} aria-hidden="true" />;
}

export default TechIcon;

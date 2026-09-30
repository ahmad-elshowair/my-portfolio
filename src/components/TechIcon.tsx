import type { TechItem } from "@/definitions";

/**
 * Renders a technology icon with its accessible screen-reader name.
 */
export function TechIcon({ name, icon: Icon }: TechItem) {
  return (
    <span className="inline-flex items-center">
      <Icon aria-hidden="true" />
      <span className="sr-only">{name}</span>
    </span>
  );
}

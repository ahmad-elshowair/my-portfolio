import type { IconType } from "react-icons";

/**
 * Renders a technology icon with its screen-reader name — bare icons carry no meaning.
 */
export const techIcon = (name: string, Icon: IconType) => (
  <span key={name} className="inline-flex items-center">
    <Icon aria-hidden="true" />
    <span className="sr-only">{name}</span>
  </span>
);

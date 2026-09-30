import type { ConceptId, SkillConceptDescriptor } from "@/definitions";
import type { IconType } from "react-icons";

export interface ConceptItem {
  id: ConceptId;
  label: string;
  blurb: string;
  icon: IconType | string;
}

export interface ConceptSwitcherProps {
  active: ConceptId;
  onSelect: (id: ConceptId) => void;
  concepts?: SkillConceptDescriptor[];
  className?: string;
}

// Backwards compatibility alias
export type ConceptFanSwitcherProps = ConceptSwitcherProps;

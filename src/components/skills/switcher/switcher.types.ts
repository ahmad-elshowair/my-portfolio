import type { ConceptId, SkillConceptDescriptor } from "@/definitions";
import type { IconifyProps } from "@/components/iconify";

export interface ConceptItem {
  id: ConceptId;
  label: string;
  blurb: string;
  icon: IconifyProps;
}

export interface ConceptSwitcherProps {
  active: ConceptId;
  onSelect: (id: ConceptId) => void;
  concepts?: SkillConceptDescriptor[];
  className?: string;
}

// Backwards compatibility alias
export type ConceptFanSwitcherProps = ConceptSwitcherProps;

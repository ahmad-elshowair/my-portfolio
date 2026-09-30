import type { ConceptId, SkillConceptDescriptor } from "@/definitions";
import type { IconType } from "react-icons";

export interface ConceptFanItem {
  id: ConceptId;
  label: string;
  blurb: string;
  angleDeg: number;
  offsetPx: number;
  widthPx: number;
  icon: IconType;
}

export interface ConceptFanSwitcherProps {
  active: ConceptId;
  onSelect: (id: ConceptId) => void;
  concepts?: SkillConceptDescriptor[];
  className?: string;
}

export interface ConceptPetalProps {
  item: ConceptFanItem;
  isActive: boolean;
  onSelect: (id: ConceptId) => void;
  index: number;
  prefersReducedMotion: boolean;
}

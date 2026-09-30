import type { ConceptId } from "@/definitions";
import type { IconifyProps } from "@/components/iconify";

/**
 * Semantic icon mapping for each of the 8 skill concepts.
 */
export const CONCEPT_ICONS: Record<ConceptId, IconifyProps> = {
  "009": "ic:baseline-bento", // bento
  "010": "lucide:list-filter", // filter
  "011": "fluent:layer-diagonal-24-filled", // architecture
  "012": "codicon:terminal-bash", // terminal
  "013": "bi:archive-fill", // shelves
  "014": "clarity:map-solid-alerted", // proof map
  "015": "lucide:activity", // physics
  "016": "hugeicons:orbit-02", // orbit
};

/**
 * Ordered list of all 8 concepts for the switcher track/rail.
 */
export const CONCEPT_ORDER: ConceptId[] = [
  "009", // bento
  "012", // terminal
  "010", // filter
  "011", // architecture
  "013", // shelves
  "015", // physics
  "016", // orbit
  "014", // proof map
];

// Backwards compatibility alias
export const CONCEPT_FAN_ORDER = CONCEPT_ORDER;

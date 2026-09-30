import type { ConceptId } from "@/definitions";
import type { IconType } from "react-icons";
import {
  FiActivity,
  FiArchive,
  FiCompass,
  FiFilter,
  FiGrid,
  FiLayers,
  FiMap,
  FiTerminal,
} from "react-icons/fi";

/**
 * Semantic icon mapping for each of the 8 skill concepts.
 */
export const CONCEPT_ICONS: Record<ConceptId, IconType> = {
  "009": FiGrid, // bento (2x2 grid icon, matching user sketch [田])
  "010": FiFilter, // filter
  "011": FiLayers, // architecture
  "012": FiTerminal, // terminal
  "013": FiArchive, // shelves
  "014": FiMap, // proof map
  "015": FiActivity, // physics
  "016": FiCompass, // orbit
};

/**
 * Ordering of the 8 concepts distributed along the left semi-circle arc (+82° to -82°),
 * matching the user's hand-drawn concept fan sketch:
 * - terminal at the top (+82°)
 * - filter, architecture in the upper-left
 * - bento near horizontal left
 * - shelves, orbit in the lower-left
 * - proof map at the bottom (-82°)
 */
export const CONCEPT_FAN_ORDER: ConceptId[] = [
  "012", // terminal   (topmost: +82°)
  "015", // physics    (+58.6°)
  "010", // filter     (+35.1°)
  "011", // architecture (+11.7°)
  "009", // bento      (-11.7°)
  "013", // shelves    (-35.1°)
  "016", // orbit      (-58.6°)
  "014", // proof map  (bottommost: -82°)
];

/**
 * Two-tier staggered geometry for the 8 radiating petals.
 * Staggering inner (24px) and outer (60px) radial offsets gives each petal ample breathing
 * room with zero label overlap or truncation.
 */
export const FAN_GEOMETRY = {
  hubRadius: 18, // 36px diameter central hub
  startAngle: 72, // Up-left arc start (+72° keeps clear of navbar)
  endAngle: -72, // Down-left arc end (-72° keeps clear of card headers)
  innerOffset: 20, // Radial distance from hub center for inner tier petals
  outerOffset: 56, // Radial distance from hub center for outer tier petals
  petalHeight: 25, // Height of petal pills
  petalWidth: 120, // Uniform width accommodating "architecture" and "proof map"
};





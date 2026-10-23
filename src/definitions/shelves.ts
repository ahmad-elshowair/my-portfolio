/* ─── Shelves Concept Contracts ─────────────────────────────────────── */

import type React from "react";
import type { SkillCategoryId, SkillItem } from "./index";

/** The three switchable category shelves (excluding standalone "languages"). */
export type ShelfCategoryId = "frontend" | "backend" | "tools";

/** State and ARIA wiring returned by useRovingTabs. */
export interface RovingTabsState<T extends string> {
  activeTab: T;
  setActiveTab: (tab: T) => void;
  tablistProps: {
    role: "tablist";
    "aria-label": string;
    onKeyDown: (event: React.KeyboardEvent) => void;
  };
  getTabProps: (tab: T) => {
    id: string;
    role: "tab";
    "aria-selected": boolean;
    "aria-controls": string;
    tabIndex: number;
    onClick: () => void;
  };
  getPanelProps: (tab: T) => {
    id: string;
    role: "tabpanel";
    "aria-labelledby": string;
    tabIndex: -1;
  };
  tabRefs: React.RefObject<Partial<Record<T, HTMLButtonElement | null>>>;
}

/** State and handlers returned by useHoverIntent. */
export interface HoverIntentState {
  previewId: string | null;
  onChipPointerEnter: (id: string) => void;
  onChipPointerLeave: () => void;
  onChipFocus: (id: string) => void;
  onChipBlur: () => void;
  onDrawerPointerEnter: () => void;
  onDrawerPointerLeave: () => void;
  clearPreview: () => void;
}

/** SegmentedTabs component contract. */
export interface SegmentedTabsProps {
  shelves: readonly ShelfCategoryId[];
  activeShelf: ShelfCategoryId;
  onShelfChange: (shelf: ShelfCategoryId) => void;
  counts: Readonly<Record<SkillCategoryId, number>>;
  shortLabels: Readonly<Record<SkillCategoryId, string>>;
  fullLabels: Readonly<Record<SkillCategoryId, string>>;
  roving: RovingTabsState<ShelfCategoryId>;
}

/** ShelfChip component contract. */
export interface ShelfChipProps {
  skill: SkillItem;
  isSelected: boolean;
  isPreviewed: boolean;
  onSelect: () => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
  chipRef?: (el: HTMLButtonElement | null) => void;
}

/** EvidenceDrawer presentation contract. */
export interface EvidenceDrawerProps {
  skill: SkillItem | undefined;
  variant: "desktop-pullout" | "mobile-inline";
  caretOffsetPx?: number;
  caretColumn?: "left" | "right";
  onCollapse?: () => void;
  onPillClick?: () => void;
}

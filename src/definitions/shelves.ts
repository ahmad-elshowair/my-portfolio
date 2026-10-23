/* ─── Shelves Concept Contracts ─────────────────────────────────────── */

import type React from "react";

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

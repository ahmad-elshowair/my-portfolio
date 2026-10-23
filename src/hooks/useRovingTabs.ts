"use client";

import { useCallback, useRef } from "react";

interface UseRovingTabsOptions<T extends string> {
  tabs: readonly T[];
  activeTab: T;
  onChange: (tab: T) => void;
  ariaLabel: string;
  idPrefix?: string;
}

/**
 * WAI-ARIA compliant horizontal tablist roving tabindex hook.
 * Handles ArrowLeft/ArrowRight (with wrap-around), Home, End,
 * roving tabIndex (0 active, -1 inactive), and matching panel IDs.
 */
export function useRovingTabs<T extends string>({
  tabs,
  activeTab,
  onChange,
  ariaLabel,
  idPrefix = "tabs",
}: UseRovingTabsOptions<T>) {
  const tabRefs = useRef<Partial<Record<T, HTMLButtonElement | null>>>({});

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const currentIndex = tabs.indexOf(activeTab);
      if (currentIndex === -1) return;

      let nextIndex: number | null = null;

      switch (event.key) {
        case "ArrowRight":
          nextIndex = (currentIndex + 1) % tabs.length;
          break;
        case "ArrowLeft":
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = tabs.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      const nextTab = tabs[nextIndex];
      onChange(nextTab);
      tabRefs.current[nextTab]?.focus();
    },
    [tabs, activeTab, onChange]
  );

  const getTabProps = useCallback(
    (tab: T) => ({
      id: `tab-${idPrefix}-${tab}`,
      role: "tab" as const,
      "aria-selected": tab === activeTab,
      "aria-controls": `panel-${idPrefix}-${tab}`,
      tabIndex: tab === activeTab ? 0 : -1,
      onClick: () => onChange(tab),
    }),
    [idPrefix, activeTab, onChange]
  );

  const getPanelProps = useCallback(
    (tab: T) => ({
      id: `panel-${idPrefix}-${tab}`,
      role: "tabpanel" as const,
      "aria-labelledby": `tab-${idPrefix}-${tab}`,
      tabIndex: -1 as const,
    }),
    [idPrefix]
  );

  return {
    activeTab,
    setActiveTab: onChange,
    tablistProps: {
      role: "tablist" as const,
      "aria-label": ariaLabel,
      onKeyDown: handleKeyDown,
    },
    getTabProps,
    getPanelProps,
    tabRefs,
  };
}

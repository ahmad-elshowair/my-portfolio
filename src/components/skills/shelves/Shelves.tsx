"use client";

/* ─── Category Shelves Concept ────────────────────────────────────────── */

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import {
  SHELF_CATEGORIES,
  SHELF_COUNTS,
  SKILL_CATEGORIES,
  SKILL_CATEGORY_SHORT_LABELS,
  SKILLS_BY_ID,
  getSkillsByCategory,
} from "@/data";
import { useHoverIntent } from "@/hooks";
import { useSelectedSkillId, useSelectSkill } from "@/stores/skillsLabStore";
import type { ShelfCategoryId, SkillItem } from "@/definitions";
import { SegmentedTabs } from "./SegmentedTabs";
import { ShelfPanel } from "./ShelfPanel";
import { DesktopEvidenceDrawer } from "./DesktopEvidenceDrawer";
import { MobileEvidenceDrawer } from "./MobileEvidenceDrawer";
import { LanguageStrip } from "./LanguageStrip";

/**
 * Category Shelves concept with roving tabs, 3D pedestal, and evidence drawers.
 */
export default function Shelves() {
  const selectedSkillId = useSelectedSkillId();
  const selectSkill = useSelectSkill();
  const hover = useHoverIntent();

  // Initialize shelf from carried-over store selection, defaulting to "frontend"
  const [activeShelf, setActiveShelf] = useState<ShelfCategoryId>(() => {
    if (selectedSkillId) {
      const item = SKILLS_BY_ID.get(selectedSkillId);
      if (
        item &&
        (item.category === "frontend" ||
          item.category === "backend" ||
          item.category === "tools")
      ) {
        return item.category;
      }
    }
    return "frontend";
  });

  const [caretOffset, setCaretOffset] = useState<number | undefined>(undefined);

  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const drawerContainerRef = useRef<HTMLDivElement | null>(null);
  const shelvesScopeRef = useRef<HTMLDivElement | null>(null);

  // Determine active skill scoped to current shelf
  const rawActiveId = hover.previewId ?? selectedSkillId;
  const rawActiveSkill: SkillItem | undefined = rawActiveId
    ? SKILLS_BY_ID.get(rawActiveId)
    : undefined;
  const drawerSkill =
    rawActiveSkill?.category === activeShelf ? rawActiveSkill : undefined;

  const shelfSkills = getSkillsByCategory(activeShelf);

  // Recalculate desktop caret offset relative to active chip
  const updateCaret = useCallback(() => {
    if (!drawerSkill) {
      setCaretOffset(undefined);
      return;
    }
    const chipEl = chipRefs.current[drawerSkill.id];
    const drawerEl = drawerContainerRef.current;
    if (!chipEl || !drawerEl) return;

    const chipRect = chipEl.getBoundingClientRect();
    const drawerRect = drawerEl.getBoundingClientRect();
    const rawOffset = chipRect.left + chipRect.width / 2 - drawerRect.left;
    const minOffset = 24;
    const maxOffset = Math.max(minOffset, drawerRect.width - 24);
    const clamped = Math.min(Math.max(rawOffset, minOffset), maxOffset);
    setCaretOffset(clamped);
  }, [drawerSkill]);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      updateCaret();
    });
    return () => cancelAnimationFrame(rafId);
  }, [updateCaret, activeShelf]);

  useEffect(() => {
    window.addEventListener("resize", updateCaret);
    return () => window.removeEventListener("resize", updateCaret);
  }, [updateCaret]);

  // Click-outside listener: collapse drawer when clicking outside the shelf & drawer scope
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (
        shelvesScopeRef.current &&
        !shelvesScopeRef.current.contains(target)
      ) {
        selectSkill(null);
        hover.clearPreview();
      }
    };
    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [selectSkill, hover]);

  // Global Escape key listener: clear preview and selection
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        hover.clearPreview();
        selectSkill(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hover, selectSkill]);

  const handleSelectSkill = useCallback(
    (id: string) => {
      if (selectedSkillId === id) {
        selectSkill(null);
      } else {
        selectSkill(id);
      }
    },
    [selectedSkillId, selectSkill],
  );

  const handleShelfChange = useCallback(
    (shelf: ShelfCategoryId) => {
      setActiveShelf(shelf);
      hover.clearPreview();
    },
    [hover],
  );

  const registerChipRef = useCallback(
    (id: string, el: HTMLButtonElement | null) => {
      chipRefs.current[id] = el;
    },
    [],
  );

  const handlePillClick = useCallback(() => {
    if (drawerSkill) {
      selectSkill(drawerSkill.id);
    }
  }, [drawerSkill, selectSkill]);

  // Mobile inline drawer configuration
  const activeIndex = shelfSkills.findIndex((s) => s.id === drawerSkill?.id);
  const caretColumn =
    activeIndex !== -1 ? (activeIndex % 2 === 0 ? "left" : "right") : undefined;

  const mobileDrawer = drawerSkill ? (
    <MobileEvidenceDrawer
      skill={drawerSkill}
      caretColumn={caretColumn}
      onCollapse={() => selectSkill(null)}
      onPillClick={handlePillClick}
    />
  ) : null;

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative flex flex-col gap-4 sm:gap-6 w-full">
        {/* Ambient background glow */}
        <div
          className="pointer-events-none absolute -inset-x-24 -top-28 h-[700px] -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_38%,_rgba(141,165,91,0.45)_0%,_rgba(141,165,91,0.20)_42%,_rgba(141,165,91,0.05)_65%,_transparent_80%)] blur-3xl"
          aria-hidden="true"
        />
        {/* Shelf spotlight glow */}
        <div
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-8 w-[650px] h-[380px] -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(163,190,109,0.55)_0%,_rgba(141,165,91,0.28)_45%,_transparent_75%)] blur-2xl opacity-95"
          aria-hidden="true"
        />

        {/* Screen reader live region */}
        <div
          className="sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {drawerSkill ? `${drawerSkill.name}: ${drawerSkill.context}` : ""}
        </div>

        <SegmentedTabs
          shelves={SHELF_CATEGORIES}
          activeShelf={activeShelf}
          onShelfChange={handleShelfChange}
          counts={SHELF_COUNTS}
          shortLabels={SKILL_CATEGORY_SHORT_LABELS}
          fullLabels={SKILL_CATEGORIES}
        />

        {/* Shelf and drawer hover container */}
        <div
          ref={shelvesScopeRef}
          className="relative"
          onPointerEnter={hover.onDrawerPointerEnter}
          onPointerLeave={hover.onDrawerPointerLeave}
        >
          <ShelfPanel
            activeShelf={activeShelf}
            skills={shelfSkills}
            selectedSkillId={selectedSkillId}
            previewId={hover.previewId}
            onSelectSkill={handleSelectSkill}
            onChipPointerEnter={hover.onChipPointerEnter}
            onChipPointerLeave={hover.onChipPointerLeave}
            onChipFocus={hover.onChipFocus}
            onChipBlur={hover.onChipBlur}
            registerChipRef={registerChipRef}
            mobileDrawerSlot={mobileDrawer}
            id={`panel-shelves-${activeShelf}`}
            role="tabpanel"
            aria-labelledby={`tab-shelves-${activeShelf}`}
            tabIndex={-1}
          />

          {/* Desktop pull-out drawer */}
          <div
            className="hidden md:block w-full max-w-[952px] mx-auto relative z-20 -mt-[18px]"
            ref={drawerContainerRef}
          >
            <AnimatePresence>
              {drawerSkill && (
                <DesktopEvidenceDrawer
                  key="desktop-drawer"
                  skill={drawerSkill}
                  caretOffsetPx={caretOffset}
                  onPillClick={handlePillClick}
                  onPointerEnter={hover.onDrawerPointerEnter}
                  onPointerLeave={hover.onDrawerPointerLeave}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        <LanguageStrip />
      </div>
    </MotionConfig>
  );
}

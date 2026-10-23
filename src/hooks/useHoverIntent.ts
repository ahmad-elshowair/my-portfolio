"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useFinePointer } from "./useFinePointer";
interface UseHoverIntentOptions {
  graceMs?: number;
}

interface HoverIntentState {
  previewId: string | null;
  onChipPointerEnter: (id: string) => void;
  onChipPointerLeave: () => void;
  onChipFocus: (id: string) => void;
  onChipBlur: () => void;
  onDrawerPointerEnter: () => void;
  onDrawerPointerLeave: () => void;
  clearPreview: () => void;
}

/**
 * Fine-pointer hover intent hook with 150ms grace travel period.
 * Keeps the drawer open as pointer travels between chip and drawer,
 * supports keyboard focus preview, and dismisses on Escape.
 */
export function useHoverIntent({
  graceMs = 150,
}: UseHoverIntentOptions = {}): HoverIntentState {
  const [previewId, setPreviewId] = useState<string | null>(null);
  const isFinePointer = useFinePointer();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const clearPreview = useCallback(() => {
    clearTimer();
    setPreviewId(null);
  }, [clearTimer]);

  const onChipPointerEnter = useCallback(
    (id: string) => {
      if (!isFinePointer) return;
      clearTimer();
      setPreviewId(id);
    },
    [isFinePointer, clearTimer]
  );

  const onChipPointerLeave = useCallback(() => {
    if (!isFinePointer) return;
    clearTimer();
    timerRef.current = setTimeout(() => {
      setPreviewId(null);
      timerRef.current = null;
    }, graceMs);
  }, [isFinePointer, clearTimer, graceMs]);

  const onChipFocus = useCallback(
    (id: string) => {
      clearTimer();
      setPreviewId(id);
    },
    [clearTimer]
  );

  const onChipBlur = useCallback(() => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      setPreviewId(null);
      timerRef.current = null;
    }, graceMs);
  }, [clearTimer, graceMs]);

  const onDrawerPointerEnter = useCallback(() => {
    clearTimer();
  }, [clearTimer]);

  const onDrawerPointerLeave = useCallback(() => {
    if (!isFinePointer) return;
    clearTimer();
    timerRef.current = setTimeout(() => {
      setPreviewId(null);
      timerRef.current = null;
    }, graceMs);
  }, [isFinePointer, clearTimer, graceMs]);

  useEffect(() => {
    if (!previewId) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        clearPreview();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewId, clearPreview]);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return {
    previewId,
    onChipPointerEnter,
    onChipPointerLeave,
    onChipFocus,
    onChipBlur,
    onDrawerPointerEnter,
    onDrawerPointerLeave,
    clearPreview,
  };
}

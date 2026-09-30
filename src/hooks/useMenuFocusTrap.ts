import { RefObject, useEffect } from "react";

export interface UseMenuFocusTrapOptions {
  isOpen: boolean;
  onClose: () => void;
  panelRef: RefObject<HTMLElement | null>;
  toggleRef?: RefObject<HTMLElement | null>;
}

/**
 * Traps keyboard Tab focus inside a menu panel, closes on Escape,
 * restores focus to the toggle button, and closes on outside click/tap.
 */
export function useMenuFocusTrap({
  isOpen,
  onClose,
  panelRef,
  toggleRef,
}: UseMenuFocusTrapOptions) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        toggleRef?.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        (!toggleRef?.current || !toggleRef.current.contains(target))
      ) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isOpen, onClose, panelRef, toggleRef]);
}

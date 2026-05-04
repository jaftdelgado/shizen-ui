import { KeyboardNavBehavior } from "../../../shared/collections/keyboard-nav.svelte.js";
import type { SelectContextResult } from "./select.types.js";
import type { Key } from "./select.types.js";

export interface KeyboardNavDeps<K extends Key = Key> {
  getKeys: () => K[];
  isDisabled: (key: K) => boolean;
  getFocusedKey: () => K | null;
  getSelectionMode: () => "none" | "single" | "multiple";
  navigate: (key: K, direction: "up" | "down" | "first" | "last", isShift: boolean) => void;
  triggerAction: (key: K) => void;
  selectKey: (key: K) => void;
  selectRange: (range: K[]) => void;
}

export function createSelectKeyboardNav(deps: KeyboardNavDeps<Key>): KeyboardNavBehavior<Key> {
  return new KeyboardNavBehavior<Key>({
    getKeys: deps.getKeys,
    isDisabled: deps.isDisabled,
    getFocusedKey: deps.getFocusedKey,
    wrapAround: false,
    shiftSelect: () => deps.getSelectionMode() === "multiple",
    onNavigate: (key, direction, isShift) => deps.navigate(key, direction, isShift),
    onActivate: deps.triggerAction,
    onSelect: deps.selectKey,
    onShiftSelect: deps.selectRange,
    blockedKeys: ["ArrowLeft", "ArrowRight"]
  });
}

export function createSelectTriggerHandlers(
  ctx: SelectContextResult,
  getContentEl: () => HTMLElement | null
): {
  handleClick: () => void;
  handleKeyDown: (e: KeyboardEvent) => void;
  handleBlur: (e: FocusEvent) => void;
} {
  function handleClick(): void {
    if (ctx.disabled) return;
    ctx.setOpenedByKeyboard(false);
    ctx.toggle();
  }

  function handleKeyDown(e: KeyboardEvent): void {
    if (ctx.disabled) return;

    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      if (ctx.isOpen) e.preventDefault();
      return;
    }

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!ctx.isOpen) {
        ctx.setOpenedByKeyboard(true);
        ctx.open();
        return;
      }

      ctx.handleContentKeydown(e);
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      ctx.close("escape");
      return;
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      ctx.setOpenedByKeyboard(true);
      ctx.toggle();
      return;
    }

    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      const matched = ctx.handleTypeahead(e.key);
      if (matched !== null) {
        ctx.selectKey(matched);
        ctx.setFocusedKey(matched);
      }
    }
  }

  function handleBlur(e: FocusEvent): void {
    const related = e.relatedTarget as Node | null;
    const contentEl = getContentEl();

    if (ctx.isOpen && related !== null && !(contentEl?.contains(related) ?? false)) {
      ctx.close("tab");
      return;
    }

    if (ctx.isOpen && related === null) {
      ctx.close("other");
    }
  }

  return { handleClick, handleKeyDown, handleBlur };
}

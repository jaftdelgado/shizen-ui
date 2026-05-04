import { KeyboardNavBehavior } from "../../../shared/collections/keyboard-nav.svelte.js";
import type { SelectStateInstance } from "./select.state.svelte.js";
import type { SelectContextResult } from "./select.types.js";
import type { Key } from "./select.types.js";

export function createSelectKeyboardNav(
  state: SelectStateInstance,
  focusItemEl: (key: Key) => void,
  focusContent: () => void
) {
  return new KeyboardNavBehavior<Key>({
    getKeys: () => state.getRegisteredKeys(),
    isDisabled: (key) => state.isDisabled(key),
    getFocusedKey: () => state.focusedKey,
    wrapAround: false,
    shiftSelect: () => state.selection.mode === "multiple",
    onNavigate: (key, _direction, isShift) => {
      state.setFocusedKey(key);
      if (!isShift) {
        focusItemEl(key);
      }
    },
    onActivate: (key) => state.activateKey(key),
    onSelect: (key) => state.selectKey(key),
    onShiftSelect: (range) => state.selection.selectRange(range),
    blockedKeys: ["ArrowLeft", "ArrowRight"]
  });
}

export function createSelectTriggerHandlers(ctx: SelectContextResult) {
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

      ctx.setOpenedByKeyboard(true);
      ctx.handleContentKeydown(e);
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      ctx.close();
      return;
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      ctx.setOpenedByKeyboard(true);
      ctx.toggle();
      return;
    }

    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      const matched = ctx.registry.orderedKeys().find((key) => {
        if (ctx.isDisabled(key)) return false;
        const textValue = ctx.registry.getTextValue(key) ?? "";
        return textValue.toLowerCase().startsWith(e.key.toLowerCase());
      });

      if (matched !== undefined) {
        ctx.selectKey(matched);
        ctx.setFocusedKey(matched);
      }
    }
  }

  function handleBlur(e: FocusEvent): void {
    if (!e) return;
    if (ctx.isOpen) return;
    const related = e.relatedTarget as Node | null;
    const popoverEl = document.querySelector("[data-state='open'].select__popover");
    if (popoverEl?.contains(related)) return;
    if (related !== null) {
      ctx.close("tab");
      return;
    }
    ctx.close("other");
  }

  return { handleClick, handleKeyDown, handleBlur };
}

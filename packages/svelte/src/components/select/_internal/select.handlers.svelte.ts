import { KeyboardNavBehavior } from "../../../shared/collections/keyboard-nav.svelte.js";
import type { SelectStateInstance } from "./select.state.svelte.js";
import type { SelectContextResult } from "./select.types.js";
import type { Key } from "./select.types.js";

export function createSelectKeyboardNav(
  state: SelectStateInstance,
  focusItemEl: (key: Key) => void
) {
  return new KeyboardNavBehavior<Key>({
    getKeys: () => state.getRegisteredKeys(),
    isDisabled: (key) => state.isDisabled(key),
    getFocusedKey: () => state.focusedKey,
    wrapAround: true,
    onNavigate: (key) => {
      state.setFocusedKey(key);
      focusItemEl(key);
    },
    onActivate: (key) => state.activateKey(key),
    onSelect: (key) => state.selectKey(key)
  });
}

export function createSelectTriggerHandlers(ctx: SelectContextResult) {
  function handleClick(): void {
    if (ctx.disabled) return;
    ctx.toggle();
  }

  function handleKeyDown(e: KeyboardEvent): void {
    if (ctx.disabled) return;

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!ctx.isOpen) {
        ctx.open();
        return;
      }
    }

    if (e.key === "Escape") {
      e.preventDefault();
      ctx.close();
      return;
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
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
    const related = e.relatedTarget as Node | null;
    const popoverEl = document.querySelector("[data-state='open'].select__popover");
    if (popoverEl?.contains(related)) return;
    ctx.close();
  }

  return { handleClick, handleKeyDown, handleBlur };
}

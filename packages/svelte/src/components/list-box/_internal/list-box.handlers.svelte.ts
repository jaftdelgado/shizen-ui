import { KeyboardNavBehavior } from "../../../shared/collections/keyboard-nav.svelte.js";
import type { Key } from "./list-box.types.js";
import type { ListBoxStateInstance } from "./list-box.state.svelte.js";
import type { ListBoxItemStateInstance } from "./compound/item.state.svelte.js";

export { KeyboardNavBehavior };
export type { ListBoxItemStateInstance };

export function createListBoxKeyboardNav(
  state: ListBoxStateInstance,
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

export function createListBoxItemHandlers(state: ListBoxItemStateInstance) {
  let isKeyboardActivation = false;

  function activate(): void {
    if (state.isDisabled) return;
    const ctx = state.listBoxCtx;
    if (ctx.selectionMode === "none") {
      ctx.activateKey(state.id);
    } else {
      ctx.selectKey(state.id);
    }
  }

  function handleClick(e: MouseEvent): void {
    if (isKeyboardActivation) return;
    activate();
  }

  function handlePointerDown(): void {
    if (!state.isDisabled) state.isPressed = true;
  }

  function handlePointerUp(): void {
    state.isPressed = false;
  }

  function handlePointerLeave(): void {
    state.isPressed = false;
  }

  function handleFocus(): void {
    state.isFocused = true;
    state.listBoxCtx.setFocusedKey(state.id);
  }

  function handleBlur(): void {
    state.isFocused = false;
  }

  function handleKeyDown(e: KeyboardEvent): void {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      state.isPressed = true;
      isKeyboardActivation = true;
    }
  }

  function handleKeyUp(e: KeyboardEvent): void {
    if (e.key === "Enter" || e.key === " ") {
      state.isPressed = false;
      activate();
      isKeyboardActivation = false;
    }
  }

  return {
    handleClick,
    handlePointerDown,
    handlePointerUp,
    handlePointerLeave,
    handleFocus,
    handleBlur,
    handleKeyDown,
    handleKeyUp
  };
}

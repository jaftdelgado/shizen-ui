import type { SelectItemStateInstance } from "./item.state.svelte.js";

export function createSelectItemHandlers(state: SelectItemStateInstance) {
  function activate(): void {
    if (state.isDisabled) return;
    state.selectCtx.selectKey(state.id);
  }

  function handleClick(): void {
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

  function handleFocus(fromKeyboard: boolean): void {
    if (!fromKeyboard) return;
    if (state.selectCtx.focusedKey !== state.id) {
      state.selectCtx.setFocusedKey(state.id);
    }
  }

  function handleBlur(): void {}

  return {
    handleClick,
    handlePointerDown,
    handlePointerUp,
    handlePointerLeave,
    handleFocus,
    handleBlur
  };
}

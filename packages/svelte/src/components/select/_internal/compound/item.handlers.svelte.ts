import type { SelectItemStateInstance } from "./item.state.svelte.js";

export function createSelectItemHandlers(state: SelectItemStateInstance) {
  let isKeyboardActivation = false;

  function activate(): void {
    if (state.isDisabled) return;
    state.selectCtx.selectKey(state.id);
  }

  function handleClick(): void {
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
    state.selectCtx.setFocusedKey(state.id);
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

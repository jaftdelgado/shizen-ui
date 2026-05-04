import type { SelectItemStateInstance } from "./item.state.svelte.js";

export function createSelectItemHandlers(state: SelectItemStateInstance): {
  handleClick: () => void;
  handlePointerDown: () => void;
  handlePointerUp: () => void;
  handlePointerLeave: () => void;
  handleFocus: (fromKeyboard: boolean) => void;
} {
  function handleClick(): void {
    if (state.isDisabled) return;
    state.selectCtx.selectKey(state.id);
  }

  function handlePointerDown(): void {
    if (!state.isDisabled) state.press();
  }

  function handlePointerUp(): void {
    state.release();
  }

  function handlePointerLeave(): void {
    state.release();
  }

  function handleFocus(fromKeyboard: boolean): void {
    if (!fromKeyboard) return;
    state.selectCtx.setFocusedKey(state.id);
  }

  return {
    handleClick,
    handlePointerDown,
    handlePointerUp,
    handlePointerLeave,
    handleFocus
  };
}

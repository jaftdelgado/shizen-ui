import type { RadioStateInstance } from "./radio.state.svelte.js";

export function createRadioHandlers(state: RadioStateInstance, setChecked: (val: boolean) => void) {
  function handleChange() {
    if (state.finalDisabled) return;
    if (state.groupCtx.exists) {
      state.groupCtx.setValue(state.value);
    } else {
      setChecked(true);
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleChange();
    }
  }

  function handleContainerClick(e: MouseEvent & { currentTarget: HTMLDivElement }) {
    const target = e.target as HTMLElement;
    if (target.closest("label")) return;
    handleChange();
    const input = e.currentTarget.querySelector('input[type="radio"]') as HTMLInputElement | null;
    input?.focus();
  }

  return {
    handleChange,
    handleKeyDown,
    handleContainerClick
  };
}

export type RadioHandlers = ReturnType<typeof createRadioHandlers>;

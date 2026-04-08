import type { CheckboxStateInstance } from "./checkbox.state.svelte.js";
import type { CheckboxCheckedState } from "./checkbox.types.js";

export function createCheckboxHandlers(
  state: CheckboxStateInstance,
  getChecked: () => CheckboxCheckedState,
  setChecked: (val: CheckboxCheckedState) => void
) {
  function handleChange() {
    if (state.finalDisabled) return;

    if (state.groupCtx.exists) {
      if (state.value === undefined) return;
      state.groupCtx.toggleValue(state.value);
    } else {
      setChecked(getChecked() === true ? false : true);
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleChange();
    }
  }

  function handleContainerClick(e: MouseEvent) {
    const target = e.target as HTMLElement;

    if (target.tagName === "INPUT" || target.closest("label")) return;

    handleChange();

    const container = e.currentTarget as HTMLDivElement;
    const input = container.querySelector("input");
    input?.focus();
  }

  return {
    handleChange,
    handleKeyDown,
    handleContainerClick
  };
}

export type CheckboxHandlers = ReturnType<typeof createCheckboxHandlers>;

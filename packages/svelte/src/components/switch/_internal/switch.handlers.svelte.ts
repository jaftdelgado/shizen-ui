import type { SwitchState } from "./switch.state.svelte.js";

export class SwitchHandlers {
  #state: SwitchState;
  #getChecked: () => boolean;
  #setChecked: (value: boolean) => void;

  constructor(state: SwitchState, getChecked: () => boolean, setChecked: (value: boolean) => void) {
    this.#state = state;
    this.#getChecked = getChecked;
    this.#setChecked = setChecked;
  }

  handleChange = (): void => {
    if (this.#state.finalDisabled) return;
    this.#setChecked(!this.#getChecked());
  };

  handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      this.handleChange();
    }
  };

  handleContainerClick = (e: MouseEvent & { currentTarget: HTMLDivElement }): void => {
    if (this.#state.finalDisabled) return;

    const target = e.target as HTMLElement;

    if (target.tagName === "INPUT" || target.closest("label")) {
      return;
    }

    this.handleChange();

    const input = e.currentTarget.querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement | null;
    input?.focus();
  };
}

import { useTabsContext, useTabsListContext } from "../tabs.context.js";

export class TabState {
  #getValue: () => string;
  #getDisabled: () => boolean;
  #getLocalIconOnly: () => boolean;

  #tabsCtx = useTabsContext();
  #listCtx = useTabsListContext();

  constructor(getValue: () => string, getDisabled: () => boolean, getLocalIconOnly: () => boolean) {
    this.#getValue = getValue;
    this.#getDisabled = getDisabled;
    this.#getLocalIconOnly = getLocalIconOnly;
  }

  get isActive(): boolean {
    return this.#tabsCtx.activeTab === this.#getValue();
  }

  get isDisabled(): boolean {
    return this.#getDisabled();
  }

  get iconOnly(): boolean {
    return this.#listCtx.iconOnly || this.#getLocalIconOnly();
  }

  register = (node: HTMLElement) => {
    this.#tabsCtx.registerTabElement(this.#getValue(), node);
  };

  onclick = () => {
    if (!this.#getDisabled()) {
      this.#tabsCtx.setActiveTab(this.#getValue());
    }
  };

  onkeydown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.onclick();
    }
  };
}

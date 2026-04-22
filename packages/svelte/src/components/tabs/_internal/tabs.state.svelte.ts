import { setTabsContext, useTabsContext } from "./tabs.context.js";

export { useTabsContext };

export class TabsState {
  #getValue: () => string;
  #getOnValueChange: () => ((value: string) => void) | undefined;
  #tabElements = new Map<string, HTMLElement>();

  #value = $state<string>("");

  constructor(
    getValue: () => string,
    getOnValueChange: () => ((value: string) => void) | undefined
  ) {
    this.#getValue = getValue;
    this.#getOnValueChange = getOnValueChange;
    this.#value = getValue();

    const self = this;
    setTabsContext({
      get activeTab() {
        return self.#value;
      },
      setActiveTab(value) {
        self.setActiveTab(value);
      },
      registerTabElement(value, node) {
        self.registerTabElement(value, node);
      },
      getTabElement(value) {
        return self.getTabElement(value);
      }
    });
  }

  get activeTab(): string {
    return this.#value;
  }

  setActiveTab(value: string) {
    this.#value = value;
    this.#getOnValueChange()?.(value);
  }

  syncFromProp() {
    this.#value = this.#getValue();
  }

  registerTabElement(value: string, node: HTMLElement) {
    this.#tabElements.set(value, node);
  }

  getTabElement(value: string): HTMLElement | undefined {
    return this.#tabElements.get(value);
  }
}

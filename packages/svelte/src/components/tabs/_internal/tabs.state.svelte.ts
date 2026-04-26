import { setTabsContext, useTabsContext } from "./tabs.context.js";
import type { TabsDirection } from "./tabs.context.js";

export { useTabsContext };

export class TabsState {
  #getValue: () => string;
  #getOnValueChange: () => ((value: string) => void) | undefined;
  #tabElements = new Map<string, HTMLElement>();
  #tabIndices = new Map<string, number>();
  #tabCount = 0;

  #value = $state<string>("");
  #previousValue = $state<string>("");
  #direction = $state<TabsDirection>("idle");
  #setValue: (value: string) => void;

  constructor(
    getValue: () => string,
    getOnValueChange: () => ((value: string) => void) | undefined,
    setValue: (value: string) => void
  ) {
    this.#getValue = getValue;
    this.#getOnValueChange = getOnValueChange;
    this.#setValue = setValue;
    this.#value = getValue();

    const self = this;
    setTabsContext({
      get activeTab() {
        return self.#value;
      },
      get previousTab() {
        return self.#previousValue;
      },
      get direction() {
        return self.#direction;
      },
      setActiveTab(value) {
        self.setActiveTab(value);
      },
      registerTabValue(value) {
        self.registerTabValue(value);
      },
      registerTabElement(value, node) {
        self.registerTabElement(value, node);
      },
      getTabElement(value) {
        return self.getTabElement(value);
      },
      getTabIndex(value) {
        return self.getTabIndex(value);
      }
    });
  }

  get activeTab(): string {
    return this.#value;
  }
  get previousTab(): string {
    return this.#previousValue;
  }
  get direction(): TabsDirection {
    return this.#direction;
  }

  setActiveTab(value: string) {
    const prevIndex = this.#tabIndices.get(this.#value) ?? 0;
    const nextIndex = this.#tabIndices.get(value) ?? 0;

    this.#direction = nextIndex > prevIndex ? "forward" : "backward";
    this.#previousValue = this.#value;
    this.#value = value;
    this.#setValue(value);
    this.#getOnValueChange()?.(value);
  }

  syncFromProp() {
    this.#value = this.#getValue();
  }

  registerTabValue(value: string) {
    if (!this.#tabIndices.has(value)) {
      this.#tabIndices.set(value, this.#tabCount++);
    }
  }

  registerTabElement(value: string, node: HTMLElement) {
    this.registerTabValue(value);
    this.#tabElements.set(value, node);
  }

  getTabElement(value: string): HTMLElement | undefined {
    return this.#tabElements.get(value);
  }

  getTabIndex(value: string): number {
    return this.#tabIndices.get(value) ?? -1;
  }
}

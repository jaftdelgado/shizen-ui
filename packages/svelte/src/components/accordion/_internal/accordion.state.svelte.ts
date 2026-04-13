import { toSet } from "./accordion.helpers.js";
import { setAccordionContext } from "../../../contexts/internal/index.js";
import type { AccordionProps } from "./accordion.types.js";

export class AccordionState {
  #expandeMode: () => NonNullable<AccordionProps["expandeMode"]>;
  #disabled: () => boolean;
  #controlledValue: () => AccordionProps["value"];
  #onValueChange: () => AccordionProps["onValueChange"];
  #internalItems: Set<string> = $state(new Set());

  get #isControlled(): boolean {
    return this.#controlledValue() !== undefined;
  }

  get #derivedItems(): Set<string> {
    return toSet(this.#controlledValue());
  }

  get openItems(): Set<string> {
    return this.#isControlled ? this.#derivedItems : this.#internalItems;
  }

  #computeNext(id: string, current: Set<string>): Set<string> {
    if (this.#expandeMode() === "single") {
      return current.has(id) ? new Set() : new Set([id]);
    }
    const next = new Set(current);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  }

  constructor(props: {
    expandeMode: () => NonNullable<AccordionProps["expandeMode"]>;
    disabled: () => boolean;
    controlledValue: () => AccordionProps["value"];
    onValueChange: () => AccordionProps["onValueChange"];
  }) {
    this.#expandeMode = props.expandeMode;
    this.#disabled = props.disabled;
    this.#controlledValue = props.controlledValue;
    this.#onValueChange = props.onValueChange;

    const self = this;

    setAccordionContext({
      get type() {
        return self.#expandeMode();
      },
      get disabled() {
        return self.#disabled();
      },
      get openItems() {
        return self.openItems;
      },
      get toggleItem() {
        return self.toggleItem;
      }
    });
  }

  toggleItem = (id: string): void => {
    if (this.#disabled()) return;

    const next = this.#computeNext(id, this.openItems);

    if (this.#isControlled) {
      this.#onValueChange()?.(this.#expandeMode() === "single" ? ([...next][0] ?? "") : [...next]);
    } else {
      this.#internalItems = next;
    }
  };
}

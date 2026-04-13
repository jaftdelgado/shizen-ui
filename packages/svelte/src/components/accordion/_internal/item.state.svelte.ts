import { useAccordionContext, setAccordionItemContext } from "../../../contexts/internal/index.js";
import type { AccordionItemProps } from "./item.types.js";

export class AccordionItemState {
  #disabled: () => boolean;
  #accordionContext = useAccordionContext();

  itemId: string;

  get isOpen(): boolean {
    return this.#accordionContext.openItems.has(this.itemId);
  }

  get isDisabled(): boolean {
    return this.#accordionContext.disabled || this.#disabled();
  }

  constructor(props: { value: () => AccordionItemProps["value"]; disabled: () => boolean }) {
    this.#disabled = props.disabled;
    this.itemId = props.value() ?? crypto.randomUUID();

    const self = this;

    setAccordionItemContext({
      get itemId() {
        return self.itemId;
      },
      get isOpen() {
        return self.isOpen;
      },
      get isDisabled() {
        return self.isDisabled;
      },
      get toggle() {
        return self.toggle;
      }
    });
  }

  toggle = (): void => {
    if (!this.isDisabled) {
      this.#accordionContext.toggleItem(this.itemId);
    }
  };
}

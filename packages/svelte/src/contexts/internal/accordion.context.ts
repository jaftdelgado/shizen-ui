import { getContext, setContext } from "svelte";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AccordionType = "single" | "multiple";

// ─── Accordion Root Context ───────────────────────────────────────────────────

export interface AccordionContextValue {
  readonly type: AccordionType;
  readonly disabled: boolean;
  readonly openItems: Set<string>;
  readonly toggleItem: (id: string) => void;
}

export interface AccordionContextResult {
  readonly type: AccordionType;
  readonly disabled: boolean;
  readonly openItems: Set<string>;
  readonly toggleItem: (id: string) => void;
  readonly exists: boolean;
}

const ACCORDION_CONTEXT_KEY = Symbol("shizen:accordion");

export function setAccordionContext(value: AccordionContextValue): void {
  setContext(ACCORDION_CONTEXT_KEY, value);
}

export function useAccordionContext(): AccordionContextResult {
  const context = getContext<AccordionContextValue | undefined>(ACCORDION_CONTEXT_KEY);

  if (!context) {
    return {
      get type() {
        return "single" as AccordionType;
      },
      get disabled() {
        return false;
      },
      get openItems() {
        return new Set<string>();
      },
      get toggleItem() {
        return (_id: string) => {};
      },
      get exists() {
        return false;
      }
    } satisfies AccordionContextResult;
  }

  return {
    get type() {
      return context.type;
    },
    get disabled() {
      return context.disabled;
    },
    get openItems() {
      return context.openItems;
    },
    get toggleItem() {
      return context.toggleItem;
    },
    get exists() {
      return true;
    }
  } satisfies AccordionContextResult;
}

// ─── Accordion Item Context ───────────────────────────────────────────────────

export interface AccordionItemContextValue {
  readonly itemId: string;
  readonly isOpen: boolean;
  readonly isDisabled: boolean;
  readonly toggle: () => void;
}

export interface AccordionItemContextResult {
  readonly itemId: string;
  readonly isOpen: boolean;
  readonly isDisabled: boolean;
  readonly toggle: () => void;
  readonly exists: boolean;
}

const ACCORDION_ITEM_CONTEXT_KEY = Symbol("shizen:accordion-item");

export function setAccordionItemContext(value: AccordionItemContextValue): void {
  setContext(ACCORDION_ITEM_CONTEXT_KEY, value);
}

export function useAccordionItemContext(): AccordionItemContextResult {
  const context = getContext<AccordionItemContextValue | undefined>(ACCORDION_ITEM_CONTEXT_KEY);

  if (!context) {
    return {
      get itemId() {
        return "";
      },
      get isOpen() {
        return false;
      },
      get isDisabled() {
        return false;
      },
      get toggle() {
        return () => {};
      },
      get exists() {
        return false;
      }
    } satisfies AccordionItemContextResult;
  }

  return {
    get itemId() {
      return context.itemId;
    },
    get isOpen() {
      return context.isOpen;
    },
    get isDisabled() {
      return context.isDisabled;
    },
    get toggle() {
      return context.toggle;
    },
    get exists() {
      return true;
    }
  } satisfies AccordionItemContextResult;
}

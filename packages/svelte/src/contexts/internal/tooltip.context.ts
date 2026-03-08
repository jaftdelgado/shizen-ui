import { getContext, setContext } from "svelte";
import type { Strategy } from "@floating-ui/dom";
import type { PopoverPlacement } from "../../shared/overlay.svelte.ts";

export interface TooltipContextValue {
  readonly isOpen: boolean;
  readonly delay: number;
  readonly placement: PopoverPlacement;
  readonly strategy: Strategy;
  readonly offsetVal: number;
  readonly handleOpen: () => void;
  readonly handleClose: () => void;
  readonly overlay: {
    readonly referenceEl: HTMLElement | null;
    readonly floatingEl: HTMLElement | null;
    readonly transformOrigin: string;
    readonly handleScroll: () => void;
  };
  setReferenceEl: (el: HTMLElement | null) => void;
  setFloatingEl: (el: HTMLElement | null) => void;
}

export interface TooltipContextResult extends TooltipContextValue {
  readonly exists: boolean;
}

const TOOLTIP_CONTEXT_KEY = Symbol("shizen:tooltip");

export function setTooltipContext(value: TooltipContextValue): void {
  setContext(TOOLTIP_CONTEXT_KEY, value);
}

export function useTooltipContext(): TooltipContextResult {
  const context = getContext<TooltipContextValue | undefined>(TOOLTIP_CONTEXT_KEY);

  if (!context) {
    return {
      get isOpen() {
        return false;
      },
      get delay() {
        return 200;
      },
      get placement() {
        return "top" as PopoverPlacement;
      },
      get strategy() {
        return "absolute" as Strategy;
      },
      get offsetVal() {
        return 8;
      },
      handleOpen: () => {},
      handleClose: () => {},
      get overlay() {
        return {
          get referenceEl() {
            return null;
          },
          get floatingEl() {
            return null;
          },
          get transformOrigin() {
            return "";
          },
          handleScroll: () => {}
        };
      },
      setReferenceEl: () => {},
      setFloatingEl: () => {},
      get exists() {
        return false;
      }
    } satisfies TooltipContextResult;
  }

  return {
    get isOpen() {
      return context.isOpen;
    },
    get delay() {
      return context.delay;
    },
    get placement() {
      return context.placement;
    },
    get strategy() {
      return context.strategy;
    },
    get offsetVal() {
      return context.offsetVal;
    },
    get handleOpen() {
      return context.handleOpen;
    },
    get handleClose() {
      return context.handleClose;
    },
    get overlay() {
      return context.overlay;
    },
    get setReferenceEl() {
      return context.setReferenceEl;
    },
    get setFloatingEl() {
      return context.setFloatingEl;
    },
    get exists() {
      return true;
    }
  } satisfies TooltipContextResult;
}

import { getContext, setContext } from "svelte";
import type { Strategy } from "@floating-ui/dom";
import type { OverlayPlacement } from "../../shared/overlay.svelte.ts";

export type PopoverPlacement = OverlayPlacement;

export interface PopoverContextValue {
  readonly isOpen: boolean;
  readonly placement: PopoverPlacement;
  readonly strategy: Strategy;
  readonly offsetVal: number;
  readonly open: () => void;
  readonly close: () => void;
  readonly toggle: () => void;
  readonly updatePosition: () => Promise<void>;
  readonly overlay: {
    readonly referenceEl: HTMLElement | null;
    readonly floatingEl: HTMLElement | null;
    readonly transformOrigin: string;
    readonly handleClickOutside: (event: MouseEvent) => void;
    readonly handleKeydown: (event: KeyboardEvent) => void;
  };
  setReferenceEl: (el: HTMLElement | null) => void;
  setFloatingEl: (el: HTMLElement | null) => void;
}

export interface PopoverContextResult extends PopoverContextValue {
  readonly exists: boolean;
}

const POPOVER_CONTEXT_KEY = Symbol("shizen:popover");

export function setPopoverContext(value: PopoverContextValue): void {
  setContext(POPOVER_CONTEXT_KEY, value);
}

export function usePopoverContext(): PopoverContextResult {
  const context = getContext<PopoverContextValue | undefined>(POPOVER_CONTEXT_KEY);

  if (!context) {
    return {
      get isOpen() {
        return false;
      },
      get placement() {
        return "bottom" as PopoverPlacement;
      },
      get strategy() {
        return "absolute" as Strategy;
      },
      get offsetVal() {
        return 8;
      },
      open: () => {},
      close: () => {},
      toggle: () => {},
      updatePosition: async () => {},
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
          handleClickOutside: () => {},
          handleKeydown: () => {}
        };
      },
      setReferenceEl: () => {},
      setFloatingEl: () => {},
      get exists() {
        return false;
      }
    } satisfies PopoverContextResult;
  }

  return {
    get isOpen() {
      return context.isOpen;
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
    get open() {
      return context.open;
    },
    get close() {
      return context.close;
    },
    get toggle() {
      return context.toggle;
    },
    get updatePosition() {
      return context.updatePosition;
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
  } satisfies PopoverContextResult;
}

import { getContext, setContext } from "svelte";
import type { Placement } from "@floating-ui/dom";

export interface TooltipContextValue {
  readonly triggerId: string;
  readonly contentId: string;
  readonly open: boolean;
  readonly placement: Placement;
  registerTrigger: (el: HTMLElement) => void;
  registerContent: (el: HTMLElement) => void;
  show: () => void;
  hide: () => void;
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
      get triggerId() {
        return "";
      },
      get contentId() {
        return "";
      },
      get open() {
        return false;
      },
      get placement() {
        return "top" as Placement;
      },
      registerTrigger: () => {},
      registerContent: () => {},
      show: () => {},
      hide: () => {},
      get exists() {
        return false;
      }
    } satisfies TooltipContextResult;
  }

  return {
    get triggerId() {
      return context.triggerId;
    },
    get contentId() {
      return context.contentId;
    },
    get open() {
      return context.open;
    },
    get placement() {
      return context.placement;
    },
    registerTrigger: context.registerTrigger,
    registerContent: context.registerContent,
    show: context.show,
    hide: context.hide,
    get exists() {
      return true;
    }
  } satisfies TooltipContextResult;
}

import { getContext, setContext } from "svelte";
import type { ToggleVariants } from "@shizen-ui/styles";

export type ToggleGroupType = "single" | "multiple";

export interface ToggleGroupContextValue {
  readonly type: ToggleGroupType;
  readonly variant?: ToggleVariants["variant"];
  readonly size?: ToggleVariants["size"];
  readonly disabled: boolean;
  isPressed: (value: string) => boolean;
  toggle: (value: string) => void;
}

export interface ToggleGroupContextResult extends ToggleGroupContextValue {
  readonly exists: boolean;
}

const TOGGLE_GROUP_CONTEXT_KEY = Symbol("shizen:toggle-group");

export function setToggleGroupContext(value: ToggleGroupContextValue): void {
  setContext(TOGGLE_GROUP_CONTEXT_KEY, value);
}

export function useToggleGroupContext(): ToggleGroupContextResult {
  const context = getContext<ToggleGroupContextValue | undefined>(TOGGLE_GROUP_CONTEXT_KEY);

  if (!context) {
    return {
      type: "single",
      get variant() {
        return undefined;
      },
      get size() {
        return undefined;
      },
      get disabled() {
        return false;
      },
      isPressed: () => false,
      toggle: () => {},
      get exists() {
        return false;
      }
    } satisfies ToggleGroupContextResult;
  }

  return {
    get type() {
      return context.type;
    },
    get variant() {
      return context.variant;
    },
    get size() {
      return context.size;
    },
    get disabled() {
      return context.disabled;
    },
    isPressed: context.isPressed,
    toggle: context.toggle,
    get exists() {
      return true;
    }
  } satisfies ToggleGroupContextResult;
}

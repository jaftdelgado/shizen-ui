import { getContext, setContext } from "svelte";
import type { SwitchSize } from "../switch/switch.context";

export type SwitchGroupOrientation = "horizontal" | "vertical";

export interface SwitchGroupContextValue {
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly size: SwitchSize;
  readonly orientation: SwitchGroupOrientation;
}

export const SWITCH_GROUP_CONTEXT_KEY = Symbol("switch-group-context");

export function setSwitchGroupContext(value: SwitchGroupContextValue) {
  setContext(SWITCH_GROUP_CONTEXT_KEY, value);
}

export function useSwitchGroupContext() {
  const context = getContext<SwitchGroupContextValue | undefined>(SWITCH_GROUP_CONTEXT_KEY);

  if (!context) {
    return {
      disabled: false,
      invalid: false,
      size: "md" as SwitchSize,
      orientation: "vertical" as SwitchGroupOrientation,
      exists: false
    } as const;
  }

  return {
    get disabled() {
      return context.disabled;
    },
    get invalid() {
      return context.invalid;
    },
    get size() {
      return context.size;
    },
    get orientation() {
      return context.orientation;
    },
    get exists() {
      return true;
    }
  };
}

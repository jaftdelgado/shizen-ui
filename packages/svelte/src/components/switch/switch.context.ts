import { getContext, setContext } from "svelte";

export interface SwitchContextValue {
  readonly checked: boolean;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly id: string;
}

export const SWITCH_CONTEXT_KEY = Symbol("switch-context");

export function setSwitchContext(value: SwitchContextValue) {
  setContext(SWITCH_CONTEXT_KEY, value);
}

export function useSwitchContext() {
  const context = getContext<SwitchContextValue | undefined>(SWITCH_CONTEXT_KEY);

  if (!context) {
    return {
      checked: false,
      disabled: false,
      invalid: false,
      id: "",
      exists: false
    } as const;
  }

  return {
    get checked() {
      return context.checked;
    },
    get disabled() {
      return context.disabled;
    },
    get invalid() {
      return context.invalid;
    },
    get id() {
      return context.id;
    },
    get exists() {
      return true;
    }
  };
}

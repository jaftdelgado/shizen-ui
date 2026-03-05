import { getContext, setContext } from "svelte";

export interface RadioContextValue {
  readonly checked: boolean;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly id: string;
}

export const RADIO_CONTEXT_KEY = Symbol("radio-context");

export function setRadioContext(value: RadioContextValue) {
  setContext(RADIO_CONTEXT_KEY, value);
}

export function useRadioContext() {
  const context = getContext<RadioContextValue | undefined>(RADIO_CONTEXT_KEY);

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

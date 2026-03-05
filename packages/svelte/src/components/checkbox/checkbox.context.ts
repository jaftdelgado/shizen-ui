import { getContext, setContext } from "svelte";

export type CheckboxCheckedState = boolean | "mixed";

export interface CheckboxContextValue {
  readonly checked: CheckboxCheckedState;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly id: string;
}

export const CHECKBOX_CONTEXT_KEY = Symbol("checkbox-context");

export function setCheckboxContext(value: CheckboxContextValue) {
  setContext(CHECKBOX_CONTEXT_KEY, value);
}

export function useCheckboxContext() {
  const context = getContext<CheckboxContextValue | undefined>(CHECKBOX_CONTEXT_KEY);

  if (!context) {
    return {
      checked: false as CheckboxCheckedState,
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

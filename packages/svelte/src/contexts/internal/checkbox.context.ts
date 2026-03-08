import { getContext, setContext } from "svelte";

export type CheckboxCheckedState = boolean | "mixed";

export interface CheckboxContextValue {
  readonly checked: CheckboxCheckedState;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly id: string;
}

export interface CheckboxContextResult {
  readonly checked: CheckboxCheckedState;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly id: string;
  readonly exists: boolean;
}

const CHECKBOX_CONTEXT_KEY = Symbol("shizen:checkbox");

export function setCheckboxContext(value: CheckboxContextValue): void {
  setContext(CHECKBOX_CONTEXT_KEY, value);
}

export function useCheckboxContext(): CheckboxContextResult {
  const context = getContext<CheckboxContextValue | undefined>(CHECKBOX_CONTEXT_KEY);

  if (!context) {
    return {
      get checked() {
        return false;
      },
      get disabled() {
        return false;
      },
      get invalid() {
        return false;
      },
      get id() {
        return "";
      },
      get exists() {
        return false;
      }
    } satisfies CheckboxContextResult;
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
  } satisfies CheckboxContextResult;
}

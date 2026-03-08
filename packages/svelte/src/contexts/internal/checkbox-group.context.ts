import { getContext, setContext } from "svelte";

export type CheckboxOrientation = "horizontal" | "vertical";

export interface CheckboxGroupContextValue {
  readonly value: string[];
  readonly name: string;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly orientation: CheckboxOrientation;
  readonly toggleValue: (val: string) => void;
}

export interface CheckboxGroupContextResult {
  readonly value: string[];
  readonly name: string;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly orientation: CheckboxOrientation;
  readonly toggleValue: (val: string) => void;
  readonly exists: boolean;
}

const CHECKBOX_GROUP_CONTEXT_KEY = Symbol("shizen:checkbox-group");

export function setCheckboxGroupContext(value: CheckboxGroupContextValue): void {
  setContext(CHECKBOX_GROUP_CONTEXT_KEY, value);
}

export function useCheckboxGroupContext(): CheckboxGroupContextResult {
  const context = getContext<CheckboxGroupContextValue | undefined>(CHECKBOX_GROUP_CONTEXT_KEY);

  if (!context) {
    return {
      get value() {
        return [] as string[];
      },
      get name() {
        return "";
      },
      get disabled() {
        return false;
      },
      get invalid() {
        return false;
      },
      get orientation() {
        return "vertical" as CheckboxOrientation;
      },
      get toggleValue() {
        return () => {};
      },
      get exists() {
        return false;
      }
    } satisfies CheckboxGroupContextResult;
  }

  return {
    get value() {
      return context.value;
    },
    get name() {
      return context.name;
    },
    get disabled() {
      return context.disabled;
    },
    get invalid() {
      return context.invalid;
    },
    get orientation() {
      return context.orientation;
    },
    get toggleValue() {
      return context.toggleValue;
    },
    get exists() {
      return true;
    }
  } satisfies CheckboxGroupContextResult;
}

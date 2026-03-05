import { getContext, setContext } from "svelte";

export type CheckboxOrientation = "horizontal" | "vertical";

export interface CheckboxGroupContextValue {
  readonly value: string[];
  readonly name: string;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly orientation: CheckboxOrientation;
  toggleValue: (val: string) => void;
}

export const CHECKBOX_GROUP_CONTEXT_KEY = Symbol("checkbox-group-context");

export function setCheckboxGroupContext(value: CheckboxGroupContextValue) {
  setContext(CHECKBOX_GROUP_CONTEXT_KEY, value);
}

export function useCheckboxGroupContext() {
  const context = getContext<CheckboxGroupContextValue | undefined>(CHECKBOX_GROUP_CONTEXT_KEY);

  if (!context) {
    return {
      value: [] as string[],
      name: "",
      disabled: false,
      invalid: false,
      orientation: "vertical" as CheckboxOrientation,
      toggleValue: () => {},
      exists: false
    } as const;
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
    toggleValue: context.toggleValue,
    get exists() {
      return true;
    }
  };
}

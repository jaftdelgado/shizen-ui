import { getContext, setContext } from "svelte";

export type RadioOrientation = "horizontal" | "vertical";

export interface RadioGroupContextValue {
  readonly value: string | undefined;
  readonly name: string;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly orientation: RadioOrientation;
  setValue: (value: string) => void;
}

export const RADIO_GROUP_CONTEXT_KEY = Symbol("radio-group-context");

export function setRadioGroupContext(value: RadioGroupContextValue) {
  setContext(RADIO_GROUP_CONTEXT_KEY, value);
}

export function useRadioGroupContext() {
  const context = getContext<RadioGroupContextValue | undefined>(RADIO_GROUP_CONTEXT_KEY);

  if (!context) {
    return {
      value: undefined,
      name: "",
      disabled: false,
      invalid: false,
      orientation: "vertical" as RadioOrientation,
      setValue: () => {},
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
    setValue: context.setValue,
    get exists() {
      return true;
    }
  };
}

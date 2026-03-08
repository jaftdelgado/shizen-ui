import { getContext, setContext } from "svelte";

export type RadioOrientation = "horizontal" | "vertical";

export interface RadioGroupContextValue {
  readonly value: string | undefined;
  readonly name: string;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly orientation: RadioOrientation;
  readonly setValue: (value: string) => void;
}

export interface RadioGroupContextResult {
  readonly value: string | undefined;
  readonly name: string;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly orientation: RadioOrientation;
  readonly setValue: (value: string) => void;
  readonly exists: boolean;
}

const RADIO_GROUP_CONTEXT_KEY = Symbol("shizen:radio-group");

export function setRadioGroupContext(value: RadioGroupContextValue): void {
  setContext(RADIO_GROUP_CONTEXT_KEY, value);
}

export function useRadioGroupContext(): RadioGroupContextResult {
  const context = getContext<RadioGroupContextValue | undefined>(RADIO_GROUP_CONTEXT_KEY);

  if (!context) {
    return {
      get value() {
        return undefined;
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
        return "vertical" as RadioOrientation;
      },
      get setValue() {
        return () => {};
      },
      get exists() {
        return false;
      }
    } satisfies RadioGroupContextResult;
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
    get setValue() {
      return context.setValue;
    },
    get exists() {
      return true;
    }
  } satisfies RadioGroupContextResult;
}

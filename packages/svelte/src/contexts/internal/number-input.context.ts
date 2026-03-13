import { getContext, setContext } from "svelte";

export type NumberInputSize = "sm" | "md" | "lg";

export interface NumberInputContextValue {
  readonly value: number;
  readonly min: number | undefined;
  readonly max: number | undefined;
  readonly step: number;
  readonly size: NumberInputSize;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly canIncrement: boolean;
  readonly canDecrement: boolean;
  readonly id: string | undefined;
  increment: () => void;
  decrement: () => void;
  setValue: (v: number) => void;
}

export interface NumberInputContextResult extends NumberInputContextValue {
  readonly exists: boolean;
}

const NUMBER_INPUT_CONTEXT_KEY = Symbol("shizen:number-input");

export function setNumberInputContext(value: NumberInputContextValue): void {
  setContext(NUMBER_INPUT_CONTEXT_KEY, value);
}

export function useNumberInputContext(): NumberInputContextResult {
  const context = getContext<NumberInputContextValue | undefined>(NUMBER_INPUT_CONTEXT_KEY);

  if (!context) {
    return {
      get value() {
        return 0;
      },
      get min() {
        return undefined;
      },
      get max() {
        return undefined;
      },
      get step() {
        return 1;
      },
      get size() {
        return "md" as NumberInputSize;
      },
      get disabled() {
        return false;
      },
      get invalid() {
        return false;
      },
      get canIncrement() {
        return false;
      },
      get canDecrement() {
        return false;
      },
      get id() {
        return undefined;
      },
      increment() {},
      decrement() {},
      setValue(_v: number) {},
      get exists() {
        return false;
      }
    } satisfies NumberInputContextResult;
  }

  return {
    get value() {
      return context.value;
    },
    get min() {
      return context.min;
    },
    get max() {
      return context.max;
    },
    get step() {
      return context.step;
    },
    get size() {
      return context.size;
    },
    get disabled() {
      return context.disabled;
    },
    get invalid() {
      return context.invalid;
    },
    get canIncrement() {
      return context.canIncrement;
    },
    get canDecrement() {
      return context.canDecrement;
    },
    get id() {
      return context.id;
    },
    increment() {
      context.increment();
    },
    decrement() {
      context.decrement();
    },
    setValue(v: number) {
      context.setValue(v);
    },
    get exists() {
      return true;
    }
  } satisfies NumberInputContextResult;
}

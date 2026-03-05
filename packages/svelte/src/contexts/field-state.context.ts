import { getContext, setContext } from "svelte";

export interface FieldStateContextValue {
  readonly invalid: boolean;
  readonly disabled: boolean;
  readonly required: boolean;
  readonly keepDescription?: boolean;
  readonly id: string;
}

export const FIELD_STATE_CONTEXT_KEY = Symbol("field-state");

export function setFieldStateContext(value: FieldStateContextValue) {
  setContext(FIELD_STATE_CONTEXT_KEY, value);
}

export function useFieldStateContext() {
  const context = getContext<FieldStateContextValue | undefined>(FIELD_STATE_CONTEXT_KEY);

  if (!context) {
    return {
      invalid: false,
      disabled: false,
      required: false,
      keepDescription: false,
      id: "",
      exists: false
    } as const;
  }

  return {
    get invalid() {
      return context.invalid;
    },
    get disabled() {
      return context.disabled;
    },
    get required() {
      return context.required;
    },
    get keepDescription() {
      return context.keepDescription ?? false;
    },
    get id() {
      return context.id;
    },
    get exists() {
      return true;
    }
  };
}

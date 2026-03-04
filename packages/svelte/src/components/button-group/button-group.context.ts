import { getContext, setContext } from "svelte";
import type { ButtonVariants } from "@shizen-ui/styles";

export interface ButtonGroupContextValue {
  readonly variant?: ButtonVariants["variant"];
  readonly size?: ButtonVariants["size"];
  readonly disabled: boolean;
}

export const BUTTON_GROUP_CONTEXT_KEY = Symbol("button-group");

export function setButtonGroupContext(value: ButtonGroupContextValue) {
  setContext(BUTTON_GROUP_CONTEXT_KEY, value);
}

export function useButtonGroupContext() {
  const context = getContext<ButtonGroupContextValue | undefined>(BUTTON_GROUP_CONTEXT_KEY);

  if (!context) {
    return {
      variant: undefined,
      size: undefined,
      disabled: false,
      exists: false
    } as const;
  }

  return {
    get variant() {
      return context.variant;
    },
    get size() {
      return context.size;
    },
    get disabled() {
      return context.disabled;
    },
    get exists() {
      return true;
    }
  };
}

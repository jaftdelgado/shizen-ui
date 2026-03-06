import { getContext, setContext } from "svelte";
import type { InputGroupVariants } from "@shizen-ui/styles";

export interface InputGroupContextValue {
  readonly size: InputGroupVariants["size"];
  readonly inGroup: boolean;
  readonly disabled: boolean;
}

export const INPUT_GROUP_CONTEXT_KEY = Symbol("input-group");

export function setInputGroupContext(value: InputGroupContextValue) {
  setContext(INPUT_GROUP_CONTEXT_KEY, value);
}

export function useInputGroupContext() {
  const context = getContext<InputGroupContextValue | undefined>(INPUT_GROUP_CONTEXT_KEY);

  if (!context) {
    return {
      size: "md" as InputGroupVariants["size"],
      inGroup: false,
      disabled: false,
      exists: false
    } as const;
  }

  return {
    get size() {
      return context.size;
    },
    get inGroup() {
      return context.inGroup;
    },
    get disabled() {
      return context.disabled;
    },
    get exists() {
      return true;
    }
  };
}

import { getContext, setContext } from "svelte";
import type { InputGroupVariants } from "@shizen-ui/styles";

export interface InputGroupContextValue {
  readonly size: InputGroupVariants["size"];
  readonly inGroup: boolean;
  readonly disabled: boolean;
}

export interface InputGroupContextResult {
  readonly size: InputGroupVariants["size"];
  readonly inGroup: boolean;
  readonly disabled: boolean;
  readonly exists: boolean;
}

const INPUT_GROUP_CONTEXT_KEY = Symbol("shizen:input-group");

export function setInputGroupContext(value: InputGroupContextValue): void {
  setContext(INPUT_GROUP_CONTEXT_KEY, value);
}

export function useInputGroupContext(): InputGroupContextResult {
  const context = getContext<InputGroupContextValue | undefined>(INPUT_GROUP_CONTEXT_KEY);

  if (!context) {
    return {
      get size() {
        return "md" as InputGroupVariants["size"];
      },
      get inGroup() {
        return false;
      },
      get disabled() {
        return false;
      },
      get exists() {
        return false;
      }
    } satisfies InputGroupContextResult;
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
  } satisfies InputGroupContextResult;
}

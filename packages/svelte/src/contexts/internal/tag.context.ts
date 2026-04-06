import { getContext, setContext } from "svelte";

export interface TagContextValue {
  readonly onClose: (() => void) | undefined;
}

export interface TagContextResult {
  readonly onClose: (() => void) | undefined;
  readonly exists: boolean;
}

const TAG_CONTEXT_KEY = Symbol("shizen:tag");

export function setTagContext(value: TagContextValue): void {
  setContext(TAG_CONTEXT_KEY, value);
}

export function useTagContext(): TagContextResult {
  const context = getContext<TagContextValue | undefined>(TAG_CONTEXT_KEY);

  if (!context) {
    return {
      get onClose() {
        return undefined;
      },
      get exists() {
        return false;
      }
    } satisfies TagContextResult;
  }

  return {
    get onClose() {
      return context.onClose;
    },
    get exists() {
      return true;
    }
  } satisfies TagContextResult;
}

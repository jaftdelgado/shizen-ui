import { getContext, setContext } from "svelte";
import type { Snippet } from "svelte";

export interface TagContextValue {
  readonly onClose: (() => void) | undefined;
  readonly registerRemoveButton: (snippet: Snippet) => void;
}

export interface TagContextResult {
  readonly onClose: (() => void) | undefined;
  readonly registerRemoveButton: (snippet: Snippet) => void;
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
      registerRemoveButton: () => {},
      get exists() {
        return false;
      }
    } satisfies TagContextResult;
  }

  return {
    get onClose() {
      return context.onClose;
    },
    get registerRemoveButton() {
      return context.registerRemoveButton;
    },
    get exists() {
      return true;
    }
  } satisfies TagContextResult;
}

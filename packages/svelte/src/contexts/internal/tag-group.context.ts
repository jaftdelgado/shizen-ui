import { getContext, setContext } from "svelte";
import type { TagVariants } from "@shizen-ui/styles";

export type TagSelectionMode = "none" | "single" | "multiple";

export interface TagGroupContextValue {
  readonly variant: TagVariants["variant"];
  readonly size: TagVariants["size"];
  readonly selectionMode: TagSelectionMode;
  readonly selectedValues: string[];
  readonly disabled: boolean;
  readonly toggleValue: (val: string) => void;
}

export interface TagGroupContextResult extends TagGroupContextValue {
  readonly exists: boolean;
}

const TAG_GROUP_CONTEXT_KEY = Symbol("shizen:tag-group");

export function setTagGroupContext(value: TagGroupContextValue): void {
  setContext(TAG_GROUP_CONTEXT_KEY, value);
}

export function useTagGroupContext(): TagGroupContextResult {
  const context = getContext<TagGroupContextValue | undefined>(TAG_GROUP_CONTEXT_KEY);

  if (!context) {
    return {
      get variant() {
        return undefined as TagVariants["variant"];
      },
      get size() {
        return undefined as TagVariants["size"];
      },
      get selectionMode() {
        return "none" as TagSelectionMode;
      },
      get selectedValues() {
        return [] as string[];
      },
      get disabled() {
        return false;
      },
      get toggleValue() {
        return () => {};
      },
      get exists() {
        return false;
      }
    } satisfies TagGroupContextResult;
  }

  return {
    get variant() {
      return context.variant;
    },
    get size() {
      return context.size;
    },
    get selectionMode() {
      return context.selectionMode;
    },
    get selectedValues() {
      return context.selectedValues;
    },
    get disabled() {
      return context.disabled;
    },
    get toggleValue() {
      return context.toggleValue;
    },
    get exists() {
      return true;
    }
  } satisfies TagGroupContextResult;
}

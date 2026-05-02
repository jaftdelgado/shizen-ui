import { getContext, setContext } from "svelte";
import type {
  ListBoxContextValue,
  ListBoxContextResult,
  ListBoxItemContextValue,
  ListBoxItemContextResult
} from "./list-box.types.js";

// ─── ListBox root context ─────────────────────────────────────────────────────

const LISTBOX_CONTEXT_KEY = Symbol("shizen:list-box");

export function setListBoxContext(value: ListBoxContextValue): void {
  setContext(LISTBOX_CONTEXT_KEY, value);
}

export function useListBoxContext(): ListBoxContextResult {
  const ctx = getContext<ListBoxContextValue | undefined>(LISTBOX_CONTEXT_KEY);

  if (!ctx) {
    return {
      selectionMode: "single",
      selectedKeys: new Set(),
      disabledKeys: new Set(),
      variant: "default",
      isSelected: () => false,
      isDisabled: () => false,
      selectKey: () => {},
      activateKey: () => {},
      get exists() {
        return false;
      }
    } satisfies ListBoxContextResult;
  }

  return {
    get selectionMode() {
      return ctx.selectionMode;
    },
    get selectedKeys() {
      return ctx.selectedKeys;
    },
    get disabledKeys() {
      return ctx.disabledKeys;
    },
    get variant() {
      return ctx.variant;
    },
    isSelected: ctx.isSelected,
    isDisabled: ctx.isDisabled,
    selectKey: ctx.selectKey,
    activateKey: ctx.activateKey,
    get exists() {
      return true;
    }
  } satisfies ListBoxContextResult;
}

// ─── ListBox item context ─────────────────────────────────────────────────────

const LISTBOX_ITEM_CONTEXT_KEY = Symbol("shizen:list-box-item");

export function setListBoxItemContext(value: ListBoxItemContextValue): void {
  setContext(LISTBOX_ITEM_CONTEXT_KEY, value);
}

export function useListBoxItemContext(): ListBoxItemContextResult {
  const ctx = getContext<ListBoxItemContextValue | undefined>(LISTBOX_ITEM_CONTEXT_KEY);

  if (!ctx) {
    return {
      id: "",
      isSelected: false,
      isDisabled: false,
      isFocused: false,
      isPressed: false,
      variant: "default",
      get exists() {
        return false;
      }
    } satisfies ListBoxItemContextResult;
  }

  return {
    get id() {
      return ctx.id;
    },
    get isSelected() {
      return ctx.isSelected;
    },
    get isDisabled() {
      return ctx.isDisabled;
    },
    get isFocused() {
      return ctx.isFocused;
    },
    get isPressed() {
      return ctx.isPressed;
    },
    get variant() {
      return ctx.variant;
    },
    get exists() {
      return true;
    }
  } satisfies ListBoxItemContextResult;
}

import { getContext, setContext } from "svelte";
import { ItemRegistryBehavior } from "../../../shared/collections/item-registry.svelte.js";
import type {
  ListBoxContextValue,
  ListBoxContextResult,
  ListBoxItemContextValue,
  ListBoxItemContextResult,
  Key
} from "./list-box.types.js";

const LISTBOX_CONTEXT_KEY = Symbol("shizen:list-box");

export function setListBoxContext(value: ListBoxContextValue): void {
  setContext(LISTBOX_CONTEXT_KEY, value);
}

export function useListBoxContext(): ListBoxContextResult {
  const ctx = getContext<ListBoxContextValue | undefined>(LISTBOX_CONTEXT_KEY);

  if (!ctx) {
    return {
      variant: "default",
      focusStrategy: "roving",
      focusedKey: null,
      registry: new ItemRegistryBehavior<Key>(),
      selectionMode: "single",
      selectedKeys: new Set(),
      disabledKeys: new Set(),
      isSelected: () => false,
      isDisabled: () => false,
      selectKey: () => {},
      activateKey: () => {},
      registerItem: () => {},
      unregisterItem: () => {},
      setFocusedKey: () => {},
      get exists() {
        return false;
      }
    } satisfies ListBoxContextResult;
  }

  return {
    get variant() {
      return ctx.variant;
    },
    get focusStrategy() {
      return ctx.focusStrategy;
    },
    get focusedKey() {
      return ctx.focusedKey;
    },
    get registry() {
      return ctx.registry;
    },
    get selectionMode() {
      return ctx.selectionMode;
    },
    get selectedKeys() {
      return ctx.selectedKeys;
    },
    get disabledKeys() {
      return ctx.disabledKeys;
    },
    isSelected: ctx.isSelected,
    isDisabled: ctx.isDisabled,
    selectKey: ctx.selectKey,
    activateKey: ctx.activateKey,
    registerItem: ctx.registerItem,
    unregisterItem: ctx.unregisterItem,
    setFocusedKey: ctx.setFocusedKey,
    get exists() {
      return true;
    }
  } satisfies ListBoxContextResult;
}

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

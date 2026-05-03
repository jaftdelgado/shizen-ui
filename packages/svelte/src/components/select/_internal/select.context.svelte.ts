import { getContext, setContext } from "svelte";
import { ItemRegistryBehavior } from "../../../shared/collections/item-registry.svelte.js";
import type {
  SelectContextValue,
  SelectContextResult,
  SelectItemContextValue,
  SelectItemContextResult,
  Key
} from "./select.types.js";

const SELECT_CONTEXT_KEY = Symbol("shizen:select");

export function setSelectContext(value: SelectContextValue): void {
  setContext(SELECT_CONTEXT_KEY, value);
}

export function useSelectContext(): SelectContextResult {
  const ctx = getContext<SelectContextValue | undefined>(SELECT_CONTEXT_KEY);

  if (!ctx) {
    return {
      isOpen: false,
      isMounted: false,
      placement: "bottom",
      selectedKeys: new Set(),
      disabledKeys: new Set(),
      selectionMode: "single",
      placeholder: undefined,
      disabled: false,
      invalid: false,
      registry: new ItemRegistryBehavior<Key>(),
      focusedKey: null,
      transformOrigin: "center",
      isSelected: () => false,
      isDisabled: () => false,
      selectKey: () => {},
      activateKey: () => {},
      registerItem: () => {},
      unregisterItem: () => {},
      setFocusedKey: () => {},
      open: () => {},
      close: () => {},
      toggle: () => {},
      handleKeydown: () => {},
      setTriggerEl: () => {},
      setContentEl: () => {},
      updatePosition: () => Promise.resolve(),
      get exists() {
        return false;
      }
    } satisfies SelectContextResult;
  }

  return {
    get isOpen() {
      return ctx.isOpen;
    },
    get isMounted() {
      return ctx.isMounted;
    },
    get placement() {
      return ctx.placement;
    },
    get selectedKeys() {
      return ctx.selectedKeys;
    },
    get disabledKeys() {
      return ctx.disabledKeys;
    },
    get selectionMode() {
      return ctx.selectionMode;
    },
    get placeholder() {
      return ctx.placeholder;
    },
    get disabled() {
      return ctx.disabled;
    },
    get invalid() {
      return ctx.invalid;
    },
    get registry() {
      return ctx.registry;
    },
    get focusedKey() {
      return ctx.focusedKey;
    },
    get transformOrigin() {
      return ctx.transformOrigin;
    },
    isSelected: ctx.isSelected,
    isDisabled: ctx.isDisabled,
    selectKey: ctx.selectKey,
    activateKey: ctx.activateKey,
    registerItem: ctx.registerItem,
    unregisterItem: ctx.unregisterItem,
    setFocusedKey: ctx.setFocusedKey,
    open: ctx.open,
    close: ctx.close,
    toggle: ctx.toggle,
    handleKeydown: ctx.handleKeydown,
    setTriggerEl: ctx.setTriggerEl,
    setContentEl: ctx.setContentEl,
    updatePosition: ctx.updatePosition,
    get exists() {
      return true;
    }
  } satisfies SelectContextResult;
}

const SELECT_ITEM_CONTEXT_KEY = Symbol("shizen:select-item");

export function setSelectItemContext(value: SelectItemContextValue): void {
  setContext(SELECT_ITEM_CONTEXT_KEY, value);
}

export function useSelectItemContext(): SelectItemContextResult {
  const ctx = getContext<SelectItemContextValue | undefined>(SELECT_ITEM_CONTEXT_KEY);

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
    } satisfies SelectItemContextResult;
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
  } satisfies SelectItemContextResult;
}

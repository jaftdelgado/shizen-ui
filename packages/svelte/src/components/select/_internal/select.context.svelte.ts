import { getContext, setContext } from "svelte";
import type {
  SelectContextValue,
  SelectContextResult,
  SelectItemContextValue,
  SelectItemContextResult
} from "./select.types.js";

const SELECT_CONTEXT_KEY = Symbol("shizen:select");
declare const process: { env: { NODE_ENV?: string | undefined } };

function warnMissingSelectContext(operation: string): void {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[shizen-ui] Select compound component used outside <Select> during ${operation}`);
  }
}

export function setSelectContext(value: SelectContextValue): void {
  setContext(SELECT_CONTEXT_KEY, value);
}

export function useSelectContext(): SelectContextResult {
  const ctx = getContext<SelectContextValue | undefined>(SELECT_CONTEXT_KEY);

  if (!ctx) {
    return {
      isOpen: false,
      openedByKeyboard: false,
      isMounted: false,
      placement: "bottom",
      selectedKeys: new Set(),
      disabledKeys: new Set(),
      selectionMode: "single",
      placeholder: undefined,
      disabled: false,
      invalid: false,
      focusedKey: null,
      transformOrigin: "center",
      isSelected: () => false,
      isDisabled: () => false,
      getFirstSelectableKey: () => null,
      getTextValue: () => undefined,
      handleTypeahead: () => null,
      selectKey: () => {},
      triggerAction: () => warnMissingSelectContext("triggerAction"),
      registerItem: () => warnMissingSelectContext("registerItem"),
      unregisterItem: () => warnMissingSelectContext("unregisterItem"),
      setFocusedKey: () => {},
      open: () => warnMissingSelectContext("open"),
      close: () => warnMissingSelectContext("close"),
      setOpenedByKeyboard: () => {},
      toggle: () => warnMissingSelectContext("toggle"),
      handleKeydown: () => {},
      handleContentKeydown: () => {},
      setTriggerEl: () => {},
      setSuppressFocusRing: () => {},
      setContentEl: () => {},
      getContentEl: () => null,
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
    get openedByKeyboard() {
      return ctx.openedByKeyboard;
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
    get focusedKey() {
      return ctx.focusedKey;
    },
    get transformOrigin() {
      return ctx.transformOrigin;
    },
    isSelected: ctx.isSelected,
    isDisabled: ctx.isDisabled,
    getFirstSelectableKey: ctx.getFirstSelectableKey,
    getTextValue: ctx.getTextValue,
    handleTypeahead: ctx.handleTypeahead,
    selectKey: ctx.selectKey,
    triggerAction: ctx.triggerAction,
    registerItem: ctx.registerItem,
    unregisterItem: ctx.unregisterItem,
    setFocusedKey: ctx.setFocusedKey,
    open: ctx.open,
    close: ctx.close,
    toggle: ctx.toggle,
    setOpenedByKeyboard: ctx.setOpenedByKeyboard,
    handleKeydown: ctx.handleKeydown,
    handleContentKeydown: ctx.handleContentKeydown,
    setTriggerEl: ctx.setTriggerEl,
    setSuppressFocusRing: ctx.setSuppressFocusRing,
    setContentEl: ctx.setContentEl,
    getContentEl: ctx.getContentEl,
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

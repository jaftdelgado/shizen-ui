import type { Snippet } from "svelte";
import type { HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";
import type { Key } from "../../../shared/collections/item-registry.svelte.js";
import type { SelectionMode, Selection } from "../../../shared/collections/selection.svelte.js";
import type { OverlayPlacement } from "../../../shared/overlays/position.svelte.js";
import type { Strategy } from "@floating-ui/dom";

export type { Key, SelectionMode, Selection };

export type SelectVariant = "default" | "danger";
export type CloseReason = "escape" | "other" | "tab" | "click-outside";

export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  selectionMode?: SelectionMode;
  selectedKeys?: Selection;
  disabledKeys?: Iterable<Key>;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  placement?: OverlayPlacement;
  strategy?: Strategy;
  offset?: number;
  onOpenChange?: (val: boolean) => void;
  onaction?: (key: Key) => void;
  children?: Snippet;
}

export interface SelectTriggerProps extends Omit<HTMLButtonAttributes, "children"> {
  children?: Snippet;
}

export interface SelectValueProps {
  class?: string;
  children?: Snippet<[{ selectedKeys: Selection; hasValue: boolean }]>;
}

export interface SelectIndicatorProps {
  class?: string;
  children?: Snippet<[{ isOpen: boolean }]>;
}

export interface SelectPopoverProps {
  class?: string;
  children?: Snippet;
}

export interface SelectContentProps {
  class?: string;
  children?: Snippet;
}

export interface SelectItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  id: Key;
  textValue?: string;
  disabled?: boolean;
  variant?: SelectVariant;
  children?: Snippet;
}

export interface SelectItemIndicatorProps {
  class?: string;
  children?: Snippet<[{ isSelected: boolean }]>;
}

export interface SelectGroupProps {
  class?: string;
  children?: Snippet;
}

export interface SelectGroupHeaderProps {
  class?: string;
  children?: Snippet;
}

export interface SelectContextValue {
  readonly isOpen: boolean;
  readonly isMounted: boolean;
  readonly placement: OverlayPlacement;
  readonly selectedKeys: Selection;
  readonly disabledKeys: Set<Key>;
  readonly selectionMode: SelectionMode;
  readonly placeholder: string | undefined;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly focusedKey: Key | null;
  readonly transformOrigin: string;
  readonly openedByKeyboard: boolean;
  isSelected: (key: Key) => boolean;
  isDisabled: (key: Key) => boolean;
  getFirstSelectableKey: () => Key | null;
  getTextValue: (key: Key) => string | undefined;
  handleTypeahead: (char: string) => Key | null;
  selectKey: (key: Key) => void;
  triggerAction: (key: Key) => void;
  registerItem: (key: Key, textValue: string) => void;
  unregisterItem: (key: Key) => void;
  setFocusedKey: (key: Key | null) => void;
  open: () => void;
  toggle: () => void;
  setOpenedByKeyboard: (val: boolean) => void;
  close: (reason?: CloseReason) => void;
  handleKeydown: (e: KeyboardEvent) => void;
  handleContentKeydown: (e: KeyboardEvent) => void;
  setTriggerEl: (el: HTMLElement | null) => void;
  setSuppressFocusRing: (fn: (() => void) | null) => void;
  setContentEl: (el: HTMLElement | null) => void;
  getContentEl: () => HTMLElement | null;
  updatePosition: () => Promise<void>;
}

export interface SelectContextResult extends SelectContextValue {
  readonly exists: boolean;
}

export interface SelectItemContextValue {
  readonly id: Key;
  readonly isSelected: boolean;
  readonly isDisabled: boolean;
  readonly isFocused: boolean;
  readonly isPressed: boolean;
  readonly variant: SelectVariant;
}

export interface SelectItemContextResult extends SelectItemContextValue {
  readonly exists: boolean;
}

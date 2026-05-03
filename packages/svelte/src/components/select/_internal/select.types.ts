import type { Snippet } from "svelte";
import type { HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";
import type {
  ItemRegistryBehavior,
  Key
} from "../../../shared/collections/item-registry.svelte.js";
import type { SelectionMode, Selection } from "../../../shared/collections/selection.svelte.js";
import type { OverlayPlacement } from "../../../shared/overlays/position.svelte.js";

export type { Key, SelectionMode, Selection };

export type SelectVariant = "default" | "danger";

export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  selectionMode?: SelectionMode;
  selectedKeys?: Selection;
  disabledKeys?: Iterable<Key>;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
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
  readonly registry: ItemRegistryBehavior<Key>;
  readonly focusedKey: Key | null;
  readonly transformOrigin: string;
  isSelected: (key: Key) => boolean;
  isDisabled: (key: Key) => boolean;
  selectKey: (key: Key) => void;
  activateKey: (key: Key) => void;
  registerItem: (key: Key, textValue: string) => void;
  unregisterItem: (key: Key) => void;
  setFocusedKey: (key: Key | null) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  handleKeydown: (e: KeyboardEvent) => void;
  setTriggerEl: (el: HTMLElement | null) => void;
  setContentEl: (el: HTMLElement | null) => void;
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

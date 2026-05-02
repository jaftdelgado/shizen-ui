import type { Snippet } from "svelte";
import type { HTMLAttributes, HTMLLiAttributes } from "svelte/elements";
import type {
  ItemRegistryBehavior,
  Key
} from "../../../shared/collections/item-registry.svelte.js";
import type { SelectionMode, Selection } from "../../../shared/collections/selection.svelte.js";

export type { Key } from "../../../shared/collections/item-registry.svelte.js";
export type { SelectionMode, Selection } from "../../../shared/collections/selection.svelte.js";

export type ListBoxVariant = "default" | "danger";
export type FocusStrategy = "roving" | "activedescendant";

export interface ListBoxProps extends Omit<HTMLAttributes<HTMLUListElement>, "children"> {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  selectionMode?: SelectionMode;
  selectedKeys?: Selection;
  disabledKeys?: Iterable<Key>;
  variant?: ListBoxVariant;
  focusStrategy?: FocusStrategy;
  onaction?: (key: Key) => void;
  children?: Snippet;
}

export interface ListBoxItemProps extends Omit<HTMLLiAttributes, "id" | "children"> {
  id: Key;
  textValue?: string;
  disabled?: boolean;
  variant?: ListBoxVariant;
  children?: Snippet;
}

export interface ListBoxItemIndicatorProps {
  class?: string;
  children?: Snippet<[{ isSelected: boolean }]>;
}

export interface ListBoxSectionProps {
  class?: string;
  children?: Snippet;
}

export interface ListBoxContextValue {
  readonly variant: ListBoxVariant;
  readonly focusStrategy: FocusStrategy;
  readonly focusedKey: Key | null;
  readonly registry: ItemRegistryBehavior<Key>;
  readonly selectionMode: SelectionMode;
  readonly selectedKeys: Selection;
  readonly disabledKeys: Set<Key>;
  isSelected: (key: Key) => boolean;
  isDisabled: (key: Key) => boolean;
  selectKey: (key: Key) => void;
  activateKey: (key: Key) => void;
  registerItem: (key: Key, textValue: string) => void;
  unregisterItem: (key: Key) => void;
  setFocusedKey: (key: Key | null) => void;
}

export interface ListBoxContextResult extends ListBoxContextValue {
  readonly exists: boolean;
}

export interface ListBoxItemContextValue {
  readonly id: Key;
  readonly isSelected: boolean;
  readonly isDisabled: boolean;
  readonly isFocused: boolean;
  readonly isPressed: boolean;
  readonly variant: ListBoxVariant;
}

export interface ListBoxItemContextResult extends ListBoxItemContextValue {
  readonly exists: boolean;
}

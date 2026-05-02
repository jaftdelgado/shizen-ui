import type { Snippet } from "svelte";
import type { HTMLAttributes, HTMLLiAttributes } from "svelte/elements";

export type Key = string | number;

export type SelectionMode = "none" | "single" | "multiple";

export type Selection = Set<Key> | "all";

export type ListBoxVariant = "default" | "danger";

// ─── ListBox (root) ───────────────────────────────────────────────────────────

export interface ListBoxProps extends Omit<HTMLAttributes<HTMLUListElement>, "children"> {
  "aria-label"?: string;
  "aria-labelledby"?: string;

  selectionMode?: SelectionMode;

  /** Controlled selected keys */
  selectedKeys?: Selection;

  disabledKeys?: Iterable<Key>;

  variant?: ListBoxVariant;

  /** Called when an item is activated (clicked / Enter) in selectionMode="none" */
  onaction?: (key: Key) => void;

  children?: Snippet;
}

// ─── Item ─────────────────────────────────────────────────────────────────────

export interface ListBoxItemProps extends Omit<HTMLLiAttributes, "id" | "children"> {
  id: Key;

  /** Plain-text value used for typeahead search and accessibility */
  textValue?: string;

  disabled?: boolean;

  variant?: ListBoxVariant;

  children?: Snippet;
}

// ─── ItemIndicator ────────────────────────────────────────────────────────────

export interface ListBoxItemIndicatorProps {
  class?: string;
  /** Custom render: receives isSelected, returns Snippet result */
  children?: Snippet<[{ isSelected: boolean }]>;
}

// ─── Section ─────────────────────────────────────────────────────────────────

export interface ListBoxSectionProps {
  class?: string;
  children?: Snippet;
}

// ─── Context shapes ───────────────────────────────────────────────────────────

export interface ListBoxContextValue {
  readonly selectionMode: SelectionMode;
  readonly selectedKeys: Selection;
  readonly disabledKeys: Set<Key>;
  readonly variant: ListBoxVariant;
  isSelected: (key: Key) => boolean;
  isDisabled: (key: Key) => boolean;
  selectKey: (key: Key) => void;
  activateKey: (key: Key) => void;
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

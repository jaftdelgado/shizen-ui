import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { TagVariants } from "@shizen-ui/styles";
import type { SelectionMode } from "../../tag/_internal/tag.types.js";

export interface TagGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: Snippet;
  variant?: TagVariants["variant"];
  size?: TagVariants["size"];
  selectionMode?: SelectionMode;
  selectedValues?: string[];
  onSelectedValuesChange?: (values: string[]) => void;
  disabled?: boolean;
}

export interface TagGroupStateProps {
  readonly variant?: TagVariants["variant"];
  readonly size?: TagVariants["size"];
  readonly selectionMode: SelectionMode;
  readonly selectedValues: string[];
  readonly onSelectedValuesChange?: (values: string[]) => void;
  readonly disabled: boolean;
}

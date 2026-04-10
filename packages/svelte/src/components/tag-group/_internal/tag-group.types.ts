import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { TagVariants } from "@shizen-ui/styles";
import type { TagSelectionMode } from "../../../contexts/internal/index.js";

export interface TagGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: Snippet;
  variant?: TagVariants["variant"];
  size?: TagVariants["size"];
  selectionMode?: TagSelectionMode;
  selectedValues?: string[];
  onSelectedValuesChange?: (values: string[]) => void;
  disabled?: boolean;
}

export interface TagGroupStateProps {
  readonly variant: TagVariants["variant"] | undefined;
  readonly size: TagVariants["size"] | undefined;
  readonly selectionMode: TagSelectionMode;
  readonly selectedValues: string[];
  readonly onSelectedValuesChange: ((values: string[]) => void) | undefined;
  readonly disabled: boolean;
}

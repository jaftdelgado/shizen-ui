import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { TagVariants } from "@shizen-ui/styles";

export type IconContent = Snippet<[]> | string;
export type SelectionMode = "none" | "single" | "multiple";

export interface TagProps extends HTMLAttributes<HTMLDivElement> {
  variant?: TagVariants["variant"];
  size?: TagVariants["size"];
  value?: string;
  children?: Snippet;
  startContent?: IconContent;
  endContent?: IconContent;
  selectionMode?: SelectionMode;
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  onClose?: () => void;
}

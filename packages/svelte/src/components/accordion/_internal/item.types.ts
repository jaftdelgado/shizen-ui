import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  disabled?: boolean;
  children?: Snippet;
}

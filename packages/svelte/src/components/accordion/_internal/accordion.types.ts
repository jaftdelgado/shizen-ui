import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export type AccordionValue = string | string[];

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  expandeMode?: "single" | "multiple";
  disabled?: boolean;
  value?: AccordionValue;
  onValueChange?: (value: AccordionValue) => void;
  children?: Snippet;
}

import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { KbdVariants } from "@shizen-ui/styles";

export interface KbdProps extends HTMLAttributes<HTMLElement>, KbdVariants {
  class?: string;
  children?: Snippet;
}

export interface KbdAbbrProps extends HTMLAttributes<HTMLElement> {
  class?: string;
  title: string;
  children?: Snippet;
}

export interface KbdContentProps extends HTMLAttributes<HTMLSpanElement> {
  class?: string;
  children?: Snippet;
}

import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { CardVariants } from "@shizen-ui/styles";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariants["variant"];
  children: Snippet;
}

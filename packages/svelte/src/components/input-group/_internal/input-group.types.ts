import type { Snippet } from "svelte";
import type { InputGroupVariants } from "@shizen-ui/styles";

export interface InputGroupProps {
  children: Snippet;
  class?: string;
  size?: InputGroupVariants["size"];
  variant?: InputGroupVariants["variant"];
  disabled?: boolean;
  fullWidth?: boolean;
  invalid?: boolean;
}

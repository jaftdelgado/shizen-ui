<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import {
    buttonGroupStyles,
    type ButtonGroupVariants,
    type ButtonVariants
  } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { setButtonGroupContext } from "../../contexts/internal/index.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children: Snippet;
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    orientation?: ButtonGroupVariants["orientation"];
    hideSeparator?: boolean;
    disabled?: boolean;
  }

  let {
    children,
    class: className,
    variant = "primary",
    size = "md",
    orientation = "horizontal",
    hideSeparator = false,
    disabled = false,
    ...rest
  }: Props = $props();

  setButtonGroupContext({
    get variant() {
      return variant;
    },
    get size() {
      return size;
    },
    get disabled() {
      return disabled;
    }
  });
</script>

<div
  role="group"
  {...rest}
  aria-disabled={disabled}
  class={cn(
    buttonGroupStyles({
      variant,
      size,
      orientation,
      hideSeparator
    }),
    className
  )}
>
  {@render children()}
</div>

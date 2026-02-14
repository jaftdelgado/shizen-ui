<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { buttonGroupStyles, type ButtonGroupVariants } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { setContext } from "svelte";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children: Snippet;
    variant?: ButtonGroupVariants["variant"];
    size?: ButtonGroupVariants["size"];
    orientation?: ButtonGroupVariants["orientation"];
    showSeparators?: boolean;
    disabled?: boolean;
  }

  let {
    children,
    class: className,
    variant = "primary",
    size = "md",
    orientation = "horizontal",
    showSeparators = true,
    disabled = false,
    ...rest
  }: Props = $props();

  const BUTTON_GROUP_CTX_KEY = "button-group";

  setContext(BUTTON_GROUP_CTX_KEY, {
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
      showSeparators
    }),
    className
  )}
>
  {@render children()}
</div>

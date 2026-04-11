<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { inputGroupStyles } from "@shizen-ui/styles";
  import { InputGroupState } from "./input-group.svelte.js";
  import type { InputGroupProps } from "./input-group.svelte.js";

  let {
    children,
    class: className,
    size = "md",
    variant = undefined,
    fullWidth = false,
    disabled = false,
    invalid = false,
    ...rest
  }: InputGroupProps = $props();

  const state = new InputGroupState(() => ({
    children,
    size,
    variant,
    fullWidth,
    disabled,
    invalid
  }));
</script>

<div
  class={cn(inputGroupStyles({ size, variant: state.finalVariant, fullWidth }), className)}
  data-invalid={state.finalInvalid}
  data-disabled={state.finalDisabled}
  {...rest}
>
  {@render children()}
</div>

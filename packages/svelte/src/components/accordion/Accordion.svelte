<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { accordionStyles } from "@shizen-ui/styles";
  import type { AccordionProps } from "./accordion.svelte.js";
  import { AccordionState } from "./accordion.svelte.js";

  let {
    class: className,
    expandeMode = "single",
    disabled = false,
    value: controlledValue,
    onValueChange,
    children,
    ...rest
  }: AccordionProps = $props();

  new AccordionState({
    expandeMode: () => expandeMode,
    disabled: () => disabled,
    controlledValue: () => controlledValue,
    onValueChange: () => onValueChange
  });
</script>

<div class={cn(accordionStyles(), className)} {...rest}>
  {@render children?.()}
</div>

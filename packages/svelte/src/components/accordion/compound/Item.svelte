<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { accordionItemStyles } from "@shizen-ui/styles";
  import type { AccordionItemProps } from "../_internal/item.types.js";
  import { AccordionItemState } from "../_internal/item.state.svelte.js";

  let {
    class: className,
    value,
    disabled = false,
    children,
    ...rest
  }: AccordionItemProps = $props();

  const state = new AccordionItemState({
    value: () => value,
    disabled: () => disabled
  });
</script>

<div
  class={cn(accordionItemStyles(), className)}
  data-open={state.isOpen}
  data-disabled={state.isDisabled}
  {...rest}
>
  {@render children?.()}
</div>

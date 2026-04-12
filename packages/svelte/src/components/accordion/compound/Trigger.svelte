<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { accordionTriggerStyles } from "@shizen-ui/styles";
  import { useAccordionItemContext } from "../../../contexts/internal/index.js";
  import type { HTMLButtonAttributes } from "svelte/elements";

  interface Props extends HTMLButtonAttributes {}

  let { class: className, onclick, children, ...rest }: Props = $props();

  const itemContext = useAccordionItemContext();

  function handleClick(event: MouseEvent & { currentTarget: HTMLButtonElement }): void {
    itemContext.toggle();
    onclick?.(event);
  }
</script>

<button
  type="button"
  id={`accordion-trigger-${itemContext.itemId}`}
  class={cn(accordionTriggerStyles(), className)}
  onclick={handleClick}
  disabled={itemContext.isDisabled}
  aria-expanded={itemContext.isOpen}
  aria-controls={`accordion-panel-${itemContext.itemId}`}
  data-open={itemContext.isOpen}
  data-disabled={itemContext.isDisabled}
  {...rest}
>
  {@render children?.()}
</button>

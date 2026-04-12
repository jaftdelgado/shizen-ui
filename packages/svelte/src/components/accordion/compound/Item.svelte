<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { accordionItemStyles } from "@shizen-ui/styles";
  import {
    useAccordionContext,
    setAccordionItemContext
  } from "../../../contexts/internal/index.js";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    value?: string;
    disabled?: boolean;
  }

  let { class: className, value, disabled = false, children, ...rest }: Props = $props();

  const accordionContext = useAccordionContext();

  const itemId = $derived(value ?? crypto.randomUUID());

  const isOpen = $derived(accordionContext.openItems.has(itemId));
  const isDisabled = $derived(accordionContext.disabled || disabled);

  function toggle(): void {
    if (!isDisabled) {
      accordionContext.toggleItem(itemId);
    }
  }

  setAccordionItemContext({
    get itemId() {
      return itemId;
    },
    get isOpen() {
      return isOpen;
    },
    get isDisabled() {
      return isDisabled;
    },
    get toggle() {
      return toggle;
    }
  });
</script>

<div
  class={cn(accordionItemStyles(), className)}
  data-open={isOpen}
  data-disabled={isDisabled}
  {...rest}
>
  {@render children?.()}
</div>

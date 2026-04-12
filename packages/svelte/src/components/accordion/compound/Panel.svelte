<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { accordionPanelStyles } from "@shizen-ui/styles";
  import { useAccordionItemContext } from "../../../contexts/internal/index.js";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLDivElement> {}

  let { class: className, children, ...rest }: Props = $props();

  const itemContext = useAccordionItemContext();
</script>

<div
  id={`accordion-panel-${itemContext.itemId}`}
  role="region"
  class={cn(accordionPanelStyles(), className)}
  data-open={itemContext.isOpen}
  aria-labelledby={`accordion-trigger-${itemContext.itemId}`}
  {...rest}
>
  {@render children?.()}
</div>

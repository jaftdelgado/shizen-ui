<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { accordionIndicatorStyles } from "@shizen-ui/styles";
  import { useAccordionItemContext } from "../../../contexts/internal/index.js";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLSpanElement> {}

  let { class: className, children, ...rest }: Props = $props();

  const itemContext = useAccordionItemContext();
</script>

<span
  class={cn(accordionIndicatorStyles(), className)}
  aria-hidden="true"
  data-open={itemContext.isOpen}
  {...rest}
>
  {@render children?.()}
</span>

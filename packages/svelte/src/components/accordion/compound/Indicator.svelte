<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { accordionIndicatorStyles } from "@shizen-ui/styles";
  import { useAccordionItemContext } from "../../../contexts/internal/index.js";
  import type { HTMLAttributes } from "svelte/elements";

  import CaretDownIcon from "../../../shared/icons/CaretDownIcon.svelte";

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
  {#if children}
    {@render children()}
  {:else}
    <CaretDownIcon class="size-4" />
  {/if}
</span>

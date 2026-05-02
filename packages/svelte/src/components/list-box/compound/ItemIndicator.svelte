<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { listBoxStyles } from "@shizen-ui/styles";
  import { useListBoxItemContext } from "../_internal/index.js";
  import type { ListBoxItemIndicatorProps } from "../_internal/index.js";

  let { class: className, children }: ListBoxItemIndicatorProps = $props();

  const ctx = useListBoxItemContext();
  const styles = $derived(listBoxStyles({ variant: ctx.variant }));

  const isCustom = $derived(!!children);
</script>

<span
  class={cn(styles.itemIndicator(), className)}
  data-visible={ctx.isSelected ? "" : undefined}
  data-custom={isCustom ? "" : undefined}
  aria-hidden="true"
>
  {#if children}
    {@render children({ isSelected: ctx.isSelected })}
  {:else if ctx.isSelected}
    <!-- Default checkmark icon (inline SVG, no external dependency) -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="size-4"
      aria-hidden="true"
    >
      <polyline points="2.5 8 6.5 12 13.5 4" />
    </svg>
  {/if}
</span>

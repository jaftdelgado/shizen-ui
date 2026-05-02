<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { useSelectItemContext } from "../_internal/index.js";
  import type { SelectItemIndicatorProps } from "../_internal/index.js";

  let { class: className, children }: SelectItemIndicatorProps = $props();

  const ctx = useSelectItemContext();
</script>

<span
  class={cn("select__item__indicator", className)}
  data-visible={ctx.isSelected ? "" : undefined}
  aria-hidden="true"
>
  {#if children}
    {@render children({ isSelected: ctx.isSelected })}
  {:else if ctx.isSelected}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="size-4"
    >
      <polyline points="2.5 8 6.5 12 13.5 4" />
    </svg>
  {/if}
</span>

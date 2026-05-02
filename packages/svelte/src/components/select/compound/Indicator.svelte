<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { useSelectContext } from "../_internal/index.js";
  import type { SelectIndicatorProps } from "../_internal/index.js";

  let { class: className, children }: SelectIndicatorProps = $props();

  const ctx = useSelectContext();
</script>

<span
  class={cn("select__indicator", className)}
  data-open={ctx.isOpen ? "" : undefined}
  aria-hidden="true"
>
  {#if children}
    {@render children({ isOpen: ctx.isOpen })}
  {:else}
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
      <polyline points="4 6 8 10 12 6" />
    </svg>
  {/if}
</span>

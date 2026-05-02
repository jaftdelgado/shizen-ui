<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { listBoxStyles } from "@shizen-ui/styles";
  import { useListBoxItemContext } from "../_internal/index.js";
  import type { ListBoxItemIndicatorProps } from "../_internal/index.js";

  import CheckIcon from "../../../shared/icons/CheckIcon.svelte";

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
    <CheckIcon size={16} />
  {/if}
</span>

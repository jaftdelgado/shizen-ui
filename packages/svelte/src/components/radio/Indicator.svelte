<script lang="ts">
  import { getContext, type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { radioStyles } from "@shizen-ui/styles";

  let { children, class: className }: { children?: Snippet; class?: string } = $props();

  const ctx = getContext<any>("radio-context");
  const styles = $derived(radioStyles({}));

  const isCustom = $derived(!!children);
</script>

{#if ctx.checked}
  <span
    class={cn(!isCustom && styles.indicator(), className)}
    data-checked={ctx.checked}
    data-custom={isCustom}
  >
    {#if children}
      {@render children()}
    {/if}
  </span>
{/if}

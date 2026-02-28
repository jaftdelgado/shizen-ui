<script lang="ts">
  import { getContext, type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { radioStyles } from "@shizen-ui/styles";
  import Indicator from "./Indicator.svelte";

  let { children, class: className }: { children?: Snippet; class?: string } = $props();

  const ctx = getContext<any>("radio-context");
  const styles = $derived(radioStyles({ size: ctx.size, variant: ctx.variant }));
</script>

<div
  class={cn(styles.control(), className)}
  data-checked={ctx.checked}
  data-disabled={ctx.disabled}
  data-invalid={ctx.invalid}
>
  {#if children}
    {@render children()}
  {:else}
    <Indicator />
  {/if}
</div>

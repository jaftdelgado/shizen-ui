<script lang="ts">
  import { getContext, type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { radioStyles } from "@shizen-ui/styles";
  import { RADIO_CONTEXT_KEY } from "../radio.context";
  import type { RadioContextValue } from "../radio.types";

  let { children, class: className }: { children?: Snippet; class?: string } = $props();

  const ctx = getContext<RadioContextValue>(RADIO_CONTEXT_KEY);
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

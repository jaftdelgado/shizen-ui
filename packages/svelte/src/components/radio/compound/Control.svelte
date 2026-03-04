<script lang="ts">
  import { getContext, type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { radioStyles } from "@shizen-ui/styles";
  import Indicator from "./Indicator.svelte";
  import { RADIO_CONTEXT_KEY } from "../radio.context";
  import type { RadioContextValue } from "../radio.types";

  let { children, class: className }: { children?: Snippet; class?: string } = $props();

  const ctx = getContext<RadioContextValue>(RADIO_CONTEXT_KEY);
  const styles = $derived(radioStyles({}));
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

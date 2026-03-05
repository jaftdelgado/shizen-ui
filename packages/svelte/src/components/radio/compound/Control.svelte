<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { radioStyles } from "@shizen-ui/styles";
  import Indicator from "./Indicator.svelte";
  import { useRadioContext } from "../radio.context";

  let { children, class: className }: { children?: Snippet; class?: string } = $props();

  const ctx = useRadioContext();
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

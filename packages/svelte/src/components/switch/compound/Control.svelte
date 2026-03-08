<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { switchStyles } from "@shizen-ui/styles";
  import Thumb from "./Thumb.svelte";
  import { useSwitchContext } from "../../../contexts/internal/index.js";

  let { children, class: className }: { children?: Snippet; class?: string } = $props();

  const ctx = useSwitchContext();
  const styles = $derived(switchStyles());
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
    <Thumb />
  {/if}
</div>

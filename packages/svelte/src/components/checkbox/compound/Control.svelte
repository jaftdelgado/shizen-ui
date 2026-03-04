<script lang="ts">
  import { getContext, type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { checkboxStyles } from "@shizen-ui/styles";
  import Indicator from "./Indicator.svelte";
  import { CHECKBOX_CONTEXT_KEY, type CheckboxContextValue } from "../checkbox.context";

  let { children, class: className }: { children?: Snippet; class?: string } = $props();

  const ctx = getContext<CheckboxContextValue>(CHECKBOX_CONTEXT_KEY);
  const styles = $derived(checkboxStyles({}));
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

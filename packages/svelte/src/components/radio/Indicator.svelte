<script lang="ts">
  import { getContext } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { radioStyles } from "@shizen-ui/styles";

  let { class: className }: { class?: string } = $props();

  const ctx = getContext<any>("radio-context");
  const styles = $derived(radioStyles({ size: ctx.size, variant: ctx.variant }));
</script>

<span class={cn(styles.indicator(), className)} data-checked={ctx.checked}></span>

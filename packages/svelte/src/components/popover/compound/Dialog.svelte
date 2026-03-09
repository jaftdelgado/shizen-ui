<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { popoverStyles } from "@shizen-ui/styles";

  let { children, class: className }: { children: Snippet; class?: string } = $props();

  const styles = $derived(popoverStyles());
</script>

<div class={cn(styles.dialog(), className)}>
  {@render children()}
</div>

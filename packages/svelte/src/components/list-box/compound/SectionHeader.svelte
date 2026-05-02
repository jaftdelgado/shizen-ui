<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import type { Snippet } from "svelte";

  let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<span class={cn("list-box-section__header", className)}>
  {@render children()}
</span>

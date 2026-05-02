<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import type { Snippet } from "svelte";

  let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<span class={cn("list-box-item__label", className)}>
  {@render children()}
</span>

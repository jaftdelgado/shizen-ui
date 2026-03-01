<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";

  let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<div class={cn("radio__content flex flex-col", className)}>
  {@render children()}
</div>

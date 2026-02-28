<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";

  let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<div class={cn("radio__content flex flex-col gap-1", className)}>
  {@render children()}
</div>

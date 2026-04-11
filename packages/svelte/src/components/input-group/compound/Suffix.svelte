<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    class?: string;
  }

  let { children, class: className }: Props = $props();
</script>

<div data-slot="input-group-suffix" class={cn("input-group__suffix", className)}>
  {@render children()}
</div>

<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { surfaceStyles, type SurfaceVariants } from "@shizen-ui/styles";
  import type { Snippet } from "svelte";

  interface Props extends SurfaceVariants {
    children?: Snippet;
    class?: string;
  }

  let { children, class: className = "" }: Props = $props();
</script>

<div class={cn(surfaceStyles(), className)}>
  {#if children}
    {@render children()}
  {/if}
</div>

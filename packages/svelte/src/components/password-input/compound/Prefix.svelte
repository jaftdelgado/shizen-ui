<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    class?: string;
  }

  let { children, class: className }: Props = $props();
</script>

<div data-slot="password-input-prefix" class={cn("password-input__prefix", className)}>
  {@render children()}
</div>

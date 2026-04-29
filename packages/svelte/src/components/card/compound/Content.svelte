<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { cardStyles } from "@shizen-ui/styles";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    class: className,
    children,
    ...rest
  }: HTMLAttributes<HTMLDivElement> & { children: Snippet } = $props();

  const styles = cardStyles();
</script>

<div class={cn(styles.content(), className)} {...rest}>
  {@render children()}
</div>

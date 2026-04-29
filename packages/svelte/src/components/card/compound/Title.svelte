<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { cardStyles } from "@shizen-ui/styles";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    class: className,
    children,
    ...rest
  }: HTMLAttributes<HTMLHeadingElement> & { children: Snippet } = $props();

  const styles = cardStyles();
</script>

<h3 class={cn(styles.title(), className)} {...rest}>
  {@render children()}
</h3>

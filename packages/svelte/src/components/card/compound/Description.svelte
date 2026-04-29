<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { cardStyles } from "@shizen-ui/styles";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    class: className,
    children,
    ...rest
  }: HTMLAttributes<HTMLParagraphElement> & { children: Snippet } = $props();

  const styles = cardStyles();
</script>

<p class={cn(styles.description(), className)} {...rest}>
  {@render children()}
</p>

<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { tagGroupStyles } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children: Snippet;
  }

  let { children, class: className, ...rest }: Props = $props();

  const styles = tagGroupStyles();
</script>

<div class={cn(styles.list(), className)} {...rest}>
  {@render children()}
</div>

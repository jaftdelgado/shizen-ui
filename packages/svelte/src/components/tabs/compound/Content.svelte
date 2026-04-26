<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import { tabsStyles } from "@shizen-ui/styles";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children: Snippet;
  }

  let { children, class: className, ...rest }: Props = $props();

  const styles = tabsStyles();
</script>

<div class={cn(styles.content(), className)} {...rest}>
  {@render children()}
</div>

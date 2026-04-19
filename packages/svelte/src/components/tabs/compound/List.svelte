<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import { tabsStyles } from "@shizen-ui/styles";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children: Snippet;
    "aria-label"?: string;
  }

  let { children, class: className, "aria-label": ariaLabel, ...rest }: Props = $props();

  const styles = tabsStyles();
</script>

<div role="tablist" aria-label={ariaLabel} class={cn(styles.list(), className)} {...rest}>
  {@render children()}
</div>

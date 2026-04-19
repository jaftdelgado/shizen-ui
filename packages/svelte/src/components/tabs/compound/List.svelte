<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import { tabsStyles } from "@shizen-ui/styles";
  import { setTabsListContext } from "../../../contexts/internal/index.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children: Snippet;
    "aria-label"?: string;
    iconOnly?: boolean;
  }

  let {
    children,
    class: className,
    "aria-label": ariaLabel,
    iconOnly = false,
    ...rest
  }: Props = $props();

  setTabsListContext({
    get iconOnly() {
      return iconOnly;
    }
  });

  const styles = tabsStyles();
</script>

<div
  role="tablist"
  aria-label={ariaLabel}
  class={cn(styles.list(), !iconOnly && "w-full", className)}
  {...rest}
>
  {@render children()}
</div>

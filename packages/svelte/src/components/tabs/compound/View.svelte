<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import { tabsStyles } from "@shizen-ui/styles";
  import { useTabsContext } from "../_internal/index.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children: Snippet;
    value: string;
  }

  let { children, class: className, value, ...rest }: Props = $props();

  const tabsCtx = useTabsContext();

  const isActive = $derived(tabsCtx.activeTab === value);
  const isExiting = $derived(tabsCtx.previousTab === value && !isActive);

  const exitDirection = $derived(
    isExiting ? (tabsCtx.direction === "forward" ? "backward" : "forward") : undefined
  );

  const enterDirection = $derived(isActive ? tabsCtx.direction : undefined);
  const styles = tabsStyles();
</script>

<div
  role="tabpanel"
  aria-hidden={!isActive}
  data-hidden={!isActive}
  data-active={isActive || undefined}
  data-enter={enterDirection}
  data-exit={exitDirection}
  tabindex={isActive ? 0 : -1}
  class={cn(styles.view(), className)}
  {...rest}
>
  {@render children()}
</div>

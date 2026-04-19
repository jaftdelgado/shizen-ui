<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import { tabsStyles } from "@shizen-ui/styles";
  import { useTabsContext } from "../../../contexts/internal/index.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children: Snippet;
    value: string;
  }

  let { children, class: className, value, ...rest }: Props = $props();

  const tabsCtx = useTabsContext();

  const isActive = $derived(tabsCtx.activeTab === value);

  const styles = tabsStyles();
</script>

<div
  role="tabpanel"
  aria-hidden={!isActive}
  data-hidden={!isActive}
  tabindex={isActive ? 0 : -1}
  class={cn(styles.panel(), className)}
  {...rest}
>
  {#if isActive}
    {@render children()}
  {/if}
</div>

<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { tabsStyles } from "@shizen-ui/styles";
  import { TabsListState, setTabsListContext } from "../_internal/index.js";
  import type { TabsListProps } from "../_internal/index.js";

  let {
    children,
    class: className,
    "aria-label": ariaLabel,
    iconOnly = false,
    ...rest
  }: TabsListProps = $props();

  const state = new TabsListState();

  setTabsListContext({
    get iconOnly() {
      return iconOnly;
    }
  });

  const styles = tabsStyles();

  function handleResize() {
    if (state.listEl && state.indicatorEl) {
      state.calculateRects(
        state.listEl.querySelector("[aria-selected='true']") as HTMLElement,
        true
      );
    }
  }
</script>

<svelte:window onresize={handleResize} />

<div
  role="tablist"
  aria-label={ariaLabel}
  class={cn(styles.list(), !iconOnly && "w-full", className)}
  bind:this={state.listEl}
  data-ready={state.listReady ? "true" : undefined}
  {...rest}
>
  {@render children()}

  <span
    aria-hidden="true"
    bind:this={state.indicatorEl}
    class={state.indicatorClass}
    style={state.indicatorStyles}
  ></span>
</div>

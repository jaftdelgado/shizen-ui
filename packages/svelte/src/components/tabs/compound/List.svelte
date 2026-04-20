<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import { tabsStyles } from "@shizen-ui/styles";
  import { useTabsContext, setTabsListContext } from "../../../contexts/internal/index.js";

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

  const tabsCtx = useTabsContext();

  setTabsListContext({
    get iconOnly() {
      return iconOnly;
    }
  });

  let listReady = $state(false);
  let indicatorEl: HTMLSpanElement | undefined;
  let listEl: HTMLElement | undefined;

  function applyStyle(list: HTMLElement, indicator: HTMLSpanElement, immediate = false) {
    const activeEl = list.querySelector<HTMLElement>('[data-active="true"]');
    if (!activeEl) return;

    const listRect = list.getBoundingClientRect();
    const tabRect = activeEl.getBoundingClientRect();

    if (immediate) {
      indicator.style.transition = "none";
    }

    indicator.style.translate = `${tabRect.left - listRect.left}px ${tabRect.top - listRect.top}px`;
    indicator.style.width = `${tabRect.width}px`;
    indicator.style.height = `${tabRect.height}px`;

    if (immediate) {
      void indicator.offsetHeight;
    }
  }

  function initIndicator(node: HTMLSpanElement) {
    indicatorEl = node;
    listEl = node.parentElement as HTMLElement;

    applyStyle(listEl, node, true);

    requestAnimationFrame(() => {
      node.style.transition = "";
      // Mark list as ready — CSS will hide ::before and show real indicator
      listEl!.dataset.ready = "true";
      listReady = true;
    });

    return { destroy() {} };
  }

  $effect(() => {
    const _ = tabsCtx.activeTab;
    if (!listReady || !listEl || !indicatorEl) return;
    applyStyle(listEl, indicatorEl);
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

  <span
    aria-hidden="true"
    use:initIndicator
    class={cn(styles.indicator(), !listReady ? "opacity-0 transition-none" : "opacity-100")}
  ></span>
</div>

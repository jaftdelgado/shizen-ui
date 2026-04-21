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

  const styles = tabsStyles();

  let listReady = $state(false);
  let indicatorEl: HTMLSpanElement | undefined;
  let listEl: HTMLElement | undefined;

  const activeTabEl = $derived(
    tabsCtx.activeTab ? tabsCtx.getTabElement(tabsCtx.activeTab) : undefined
  );

  const indicatorClass = $derived(
    cn(styles.indicator(), !listReady ? "opacity-0 transition-none" : "opacity-100")
  );

  function applyStyle(activeTab: HTMLElement, immediate = false) {
    const listRect = listEl!.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();

    if (immediate) {
      indicatorEl!.style.transition = "none";
    }

    indicatorEl!.style.translate = `${tabRect.left - listRect.left}px ${tabRect.top - listRect.top}px`;
    indicatorEl!.style.width = `${tabRect.width}px`;
    indicatorEl!.style.height = `${tabRect.height}px`;

    if (immediate) {
      void indicatorEl!.offsetHeight;
    }
  }

  function initIndicator(node: HTMLSpanElement) {
    indicatorEl = node;
    listEl = node.parentElement as HTMLElement;

    if (activeTabEl) {
      applyStyle(activeTabEl, true);
    }

    requestAnimationFrame(() => {
      node.style.transition = "";
      listEl!.dataset.ready = "true";
      listReady = true;
    });

    return { destroy() {} };
  }

  $effect(() => {
    if (!listReady || !listEl || !indicatorEl || !activeTabEl) return;
    applyStyle(activeTabEl);
  });
</script>

<div
  role="tablist"
  aria-label={ariaLabel}
  class={cn(styles.list(), !iconOnly && "w-full", className)}
  {...rest}
>
  {@render children()}

  <span aria-hidden="true" use:initIndicator class={indicatorClass}></span>
</div>

<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { tabsStyles } from "@shizen-ui/styles";
  import {
    useTabsContext,
    useTabsListContext,
    setTabContext
  } from "../../../contexts/internal/index.js";

  type IconContent = Snippet<[]> | string;

  interface BaseProps extends Omit<HTMLButtonAttributes, "role" | "children"> {
    value: string;
    disabled?: boolean;
  }

  interface NormalProps extends BaseProps {
    iconOnly?: false;
    children?: Snippet;
    startContent?: IconContent;
    endContent?: IconContent;
  }

  interface IconOnlyProps extends BaseProps {
    iconOnly: true;
    children: Snippet;
    startContent?: never;
    endContent?: never;
  }

  type Props = NormalProps | IconOnlyProps;

  let {
    children,
    class: className,
    value,
    disabled = false,
    iconOnly: localIconOnly = false,
    startContent,
    endContent,
    ...rest
  }: Props = $props();

  const tabsCtx = useTabsContext();
  const listCtx = useTabsListContext();

  const isActive = $derived(tabsCtx.activeTab === value);
  const iconOnly = $derived(listCtx.iconOnly || localIconOnly);

  setTabContext({
    get tabId() {
      return value;
    },
    get isActive() {
      return isActive;
    }
  });

  // Action — runs synchronously when the node is attached to the DOM,
  // before any $effect, guaranteeing the element is registered before
  // List.svelte tries to calculate the indicator position.
  function registerTab(node: HTMLElement) {
    tabsCtx.registerTabElement(value, node);
    return {
      destroy() {
        // cleanup if needed in the future
      }
    };
  }

  function handleClick() {
    if (!disabled) {
      tabsCtx.setActiveTab(value);
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  }

  const styles = $derived(tabsStyles({ iconOnly }));
</script>

{#snippet renderIcon(content: IconContent | undefined)}
  {#if typeof content === "string"}
    <i class={content}></i>
  {:else if content}
    <span class="tabs__tab-icon">
      {@render content()}
    </span>
  {/if}
{/snippet}

<button
  role="tab"
  aria-selected={isActive}
  aria-disabled={disabled}
  data-active={isActive}
  data-disabled={disabled}
  tabindex={isActive ? 0 : -1}
  class={cn(styles.tab(), className)}
  use:registerTab
  onclick={handleClick}
  onkeydown={handleKeydown}
  {...rest}
>
  {#if iconOnly}
    {@render children?.()}
  {:else}
    {@render renderIcon(startContent)}

    {#if children}
      <span class="tabs__tab-label">
        {@render children()}
      </span>
    {/if}

    {@render renderIcon(endContent)}
  {/if}
</button>

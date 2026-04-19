<script lang="ts">
  import { type Snippet, onMount } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { tabsStyles } from "@shizen-ui/styles";
  import { useTabsContext, setTabContext } from "../../../contexts/internal/index.js";

  interface Props extends Omit<HTMLButtonAttributes, "role"> {
    children: Snippet;
    value: string;
    disabled?: boolean;
  }

  let { children, class: className, value, disabled = false, ...rest }: Props = $props();

  const tabsCtx = useTabsContext();

  const isActive = $derived(tabsCtx.activeTab === value);

  setTabContext({
    get tabId() {
      return value;
    },
    get isActive() {
      return isActive;
    }
  });

  onMount(() => {
    tabsCtx.registerTab(value);
  });

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

  const styles = tabsStyles();
</script>

<button
  role="tab"
  aria-selected={isActive}
  aria-disabled={disabled}
  data-active={isActive}
  data-disabled={disabled}
  tabindex={isActive ? 0 : -1}
  class={cn(styles.tab(), className)}
  onclick={handleClick}
  onkeydown={handleKeydown}
  {...rest}
>
  {@render children()}
</button>

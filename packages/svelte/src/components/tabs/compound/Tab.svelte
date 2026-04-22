<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { tabsStyles } from "@shizen-ui/styles";
  import { TabState } from "../_internal/index.js";
  import type { TabProps, IconContent } from "../_internal/index.js";

  let {
    children,
    class: className,
    value,
    disabled = false,
    iconOnly: localIconOnly = false,
    startContent,
    endContent,
    ...rest
  }: TabProps = $props();

  const state = new TabState(
    () => value,
    () => disabled,
    () => (localIconOnly as boolean) ?? false
  );

  const styles = $derived(tabsStyles({ iconOnly: state.iconOnly }));
</script>

{#snippet renderIcon(content: IconContent | undefined)}
  {#if typeof content === "string"}
    <i class={content}></i>
  {:else if content}
    <span class="tabs__tab-icon">
      {@render (content as Snippet)()}
    </span>
  {/if}
{/snippet}

<button
  role="tab"
  aria-selected={state.isActive}
  aria-disabled={state.isDisabled || undefined}
  data-active={state.isActive || undefined}
  data-disabled={state.isDisabled || undefined}
  tabindex={state.isActive ? 0 : -1}
  class={cn(styles.tab(), className)}
  use:state.register
  onclick={state.onclick}
  onkeydown={state.onkeydown}
  {...rest}
>
  {#if state.iconOnly}
    {@render (children as Snippet)?.()}
  {:else}
    {@render renderIcon(startContent as IconContent | undefined)}

    {#if children}
      <span class="tabs__tab-label">
        {@render (children as Snippet)()}
      </span>
    {/if}

    {@render renderIcon(endContent as IconContent | undefined)}
  {/if}
</button>

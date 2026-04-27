<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { tagStyles } from "@shizen-ui/styles";
  import type { TagProps, IconContent } from "./_internal/index.js";
  import { TagState, createTagHandlers } from "./_internal/index.js";
  import type { Snippet } from "svelte";

  let {
    children,
    startContent,
    endContent,
    class: className,
    variant = "secondary",
    size = "md",
    value,
    selectionMode = "single",
    selected = $bindable(false),
    onSelectedChange,
    onClose,
    onclick,
    ...rest
  }: TagProps = $props();

  const state = new TagState({
    variant: () => variant,
    size: () => size,
    value: () => value,
    selectionMode: () => selectionMode,
    selected: () => selected,
    onClose: () => onClose
  });

  const handlers = createTagHandlers(
    state,
    () => selected,
    (val) => {
      selected = val;
    },
    (val) => onSelectedChange?.(val),
    (event) =>
      (
        onclick as
          | ((e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) => void)
          | undefined
      )?.(event)
  );

  state.initContext({
    onRemoveButtonClick: handlers.handleRemoveButtonClick,
    onRemoveButtonKeyDown: handlers.handleRemoveButtonKeyDown
  });

  function mountAction(el: HTMLElement) {
    return state.mountTag(el);
  }
</script>

{#snippet renderIcon(content: IconContent | undefined)}
  {#if typeof content === "string"}
    <i class={cn("tag__icon", content)}></i>
  {:else if content}
    <span class="tag__icon">
      {@render content()}
    </span>
  {/if}
{/snippet}

{#snippet tagContent()}
  <span class="tag__content">
    {@render renderIcon(startContent)}

    {#if children}
      <span class="tag__label">
        {@render children()}
      </span>
    {/if}

    {@render renderIcon(endContent)}

    {#if state.removeButtonSnippet}
      {@render (state.removeButtonSnippet as Snippet)()}
    {/if}
  </span>
{/snippet}

<div
  {...rest}
  class={cn(
    tagStyles({
      variant: state.resolvedVariant,
      size: state.resolvedSize,
      interactive: state.isInteractive,
      selected: state.isSelected,
      disabled: state.isDisabled
    }),
    className
  )}
  {...state.isInteractive
    ? {
        role: "checkbox",
        "aria-checked": state.isSelected,
        "aria-disabled": state.isDisabled ? true : undefined,
        tabindex: state.tabIndex
      }
    : {}}
  onclick={state.isInteractive ? handlers.handleClick : undefined}
  onkeydown={state.isInteractive ? handlers.handleKey : undefined}
  onkeyup={state.isInteractive ? handlers.handleKey : undefined}
  use:mountAction
>
  {@render tagContent()}
</div>

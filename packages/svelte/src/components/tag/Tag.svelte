<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { tagStyles } from "@shizen-ui/styles";
  import type { TagProps, IconContent } from "./tag.svelte.js";
  import { createTagState, createTagHandlers } from "./tag.svelte.js";
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

  const state = createTagState({
    get variant() {
      return variant;
    },
    get size() {
      return size;
    },
    get value() {
      return value;
    },
    get selectionMode() {
      return selectionMode;
    },
    get selected() {
      return selected;
    },
    get onSelectedChange() {
      return onSelectedChange;
    },
    get onClose() {
      return onClose;
    }
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

{#if state.isInteractive}
  <div
    {...rest}
    class={cn(
      tagStyles({ variant: state.resolvedVariant, size: state.resolvedSize }),
      "tag--interactive",
      state.isSelected && "tag--selected",
      state.isDisabled && "tag--disabled",
      className
    )}
    role="checkbox"
    aria-checked={state.isSelected}
    aria-disabled={state.isDisabled ? true : undefined}
    tabindex={state.tabIndex}
    onclick={handlers.handleClick}
    onkeydown={handlers.handleKeyDown}
    use:mountAction
  >
    {@render tagContent()}
  </div>
{:else}
  <div
    {...rest}
    class={cn(
      tagStyles({ variant: state.resolvedVariant, size: state.resolvedSize }),
      state.isSelected && "tag--selected",
      state.isDisabled && "tag--disabled",
      className
    )}
    use:mountAction
  >
    {@render tagContent()}
  </div>
{/if}

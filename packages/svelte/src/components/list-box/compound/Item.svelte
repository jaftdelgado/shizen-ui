<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { untrack } from "svelte";
  import { createFocusVisible } from "../../../shared/focus-visible.svelte.js";
  import { ListBoxItemState, createListBoxItemHandlers } from "../_internal/index.js";
  import type { ListBoxItemProps } from "../_internal/index.js";

  let {
    class: className,
    id,
    textValue,
    disabled = false,
    variant,
    children,
    ...rest
  }: ListBoxItemProps = $props();

  const state = new ListBoxItemState({
    id: () => id,
    disabled: () => disabled,
    variant: () => variant
  });

  const handlers = createListBoxItemHandlers(state);
  const focus = createFocusVisible();

  $effect(() => {
    const currentId = id;
    const currentTextValue = textValue ?? String(id);
    untrack(() => state.listBoxCtx.registerItem(currentId, currentTextValue));
    return () => untrack(() => state.listBoxCtx.unregisterItem(currentId));
  });
</script>

<li
  role="option"
  data-key={id}
  aria-selected={state.isSelected}
  aria-disabled={state.isDisabled || undefined}
  tabindex={state.listBoxCtx.focusStrategy === "activedescendant"
    ? undefined
    : state.isDisabled
      ? -1
      : 0}
  class={cn(state.styles.item(), className)}
  data-selected={state.isSelected ? "" : undefined}
  data-disabled={state.isDisabled ? "" : undefined}
  data-pressed={state.isPressed ? "" : undefined}
  data-focus-visible={focus.isFocusVisible ? "" : undefined}
  data-variant={state.resolvedVariant}
  data-textvalue={textValue}
  onclick={handlers.handleClick}
  onpointerdown={handlers.handlePointerDown}
  onpointerup={handlers.handlePointerUp}
  onpointerleave={handlers.handlePointerLeave}
  onfocus={() => {
    handlers.handleFocus();
    focus.onFocus();
  }}
  onblur={() => {
    handlers.handleBlur();
    focus.onBlur();
  }}
  onkeydown={handlers.handleKeyDown}
  onkeyup={handlers.handleKeyUp}
  onmousedown={focus.onWrapperMouseDown}
  {...rest}
>
  {#if children}
    {@render children()}
  {/if}
</li>

<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { untrack } from "svelte";
  import { createFocusVisible } from "../../../shared/focus-visible.svelte.js";
  import { SelectItemState, createSelectItemHandlers } from "../_internal/index.js";
  import type { SelectItemProps } from "../_internal/index.js";

  let {
    class: className,
    id,
    textValue,
    disabled = false,
    variant,
    children,
    ...rest
  }: SelectItemProps = $props();

  const state = new SelectItemState({
    id: () => id,
    disabled: () => disabled,
    variant: () => variant
  });

  const handlers = createSelectItemHandlers(state);
  const focus = createFocusVisible();

  $effect(() => {
    const currentId = id;
    const currentTextValue = textValue ?? String(id);
    untrack(() => state.selectCtx.registerItem(currentId, currentTextValue));
    return () => untrack(() => state.selectCtx.unregisterItem(currentId));
  });
</script>

<div
  role="option"
  data-key={id}
  aria-selected={state.isSelected}
  aria-disabled={state.isDisabled || undefined}
  tabindex={state.isDisabled ? -1 : 0}
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
</div>

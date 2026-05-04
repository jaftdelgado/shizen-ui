<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { createFocusVisible } from "../../../shared/focus-visible.svelte.js";
  import { useSelectContext, createSelectTriggerHandlers } from "../_internal/index.js";
  import type { SelectTriggerProps } from "../_internal/index.js";

  let { class: className, children, ...rest }: SelectTriggerProps = $props();

  const ctx = useSelectContext();
  const focus = createFocusVisible();
  const handlers = createSelectTriggerHandlers(ctx);

  let el = $state<HTMLButtonElement | undefined>();

  $effect(() => {
    ctx.setTriggerEl(el ?? null);
    return () => ctx.setTriggerEl(null);
  });

  $effect(() => {
    ctx.isOpen;
    ctx.setOnClose(() => {
      const shouldFocus =
        ctx.closeReason === "escape" || (ctx.closeReason === "other" && !ctx.openedByKeyboard);
      if (shouldFocus) {
        focus.onWrapperMouseDown();
        el?.focus({ preventScroll: true });
      }
    });
  });
</script>

<button
  bind:this={el}
  type="button"
  role="combobox"
  aria-expanded={ctx.isOpen}
  aria-haspopup="listbox"
  disabled={ctx.disabled || undefined}
  data-open={ctx.isOpen ? "" : undefined}
  data-disabled={ctx.disabled ? "" : undefined}
  data-invalid={ctx.invalid ? "" : undefined}
  data-focus-visible={focus.isFocusVisible ? "" : undefined}
  class={cn("select__trigger", className)}
  onclick={handlers.handleClick}
  onkeydown={handlers.handleKeyDown}
  onblur={(e) => {
    focus.onBlur();
    handlers.handleBlur(e);
  }}
  onmousedown={focus.onWrapperMouseDown}
  onfocus={focus.onFocus}
  {...rest}
>
  {#if children}
    {@render children()}
  {/if}
</button>

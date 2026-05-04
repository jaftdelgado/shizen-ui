<script lang="ts">
  import { cn, portal } from "@shizen-ui/styles";
  import { SELECT_NAV_KEYS, useSelectContext } from "../_internal/index.js";
  import type { SelectPopoverProps } from "../_internal/index.js";

  let { class: className, children }: SelectPopoverProps = $props();

  const ctx = useSelectContext();

  let el = $state<HTMLDivElement | undefined>();

  $effect(() => {
    ctx.setContentEl(el ?? null);
    return () => ctx.setContentEl(null);
  });

  $effect(() => {
    if (!ctx.isMounted || !ctx.isOpen || !el) return;
    const wasOpenedByKeyboard = ctx.openedByKeyboard;
    if (wasOpenedByKeyboard) return;
    el.focus({ preventScroll: true });
  });
</script>

{#if ctx.isMounted}
  <div
    use:portal
    bind:this={el}
    role="dialog"
    aria-modal="false"
    tabindex="-1"
    class={cn("select__popover", className)}
    data-state={ctx.isOpen ? "open" : "closed"}
    data-placement={ctx.placement}
    style:transform-origin={ctx.transformOrigin}
    onkeydown={(e) => {
      if (SELECT_NAV_KEYS.includes(e.key as (typeof SELECT_NAV_KEYS)[number])) {
        e.preventDefault();
        ctx.handleContentKeydown(e);
      } else {
        ctx.handleKeydown(e);
      }
    }}
  >
    {#if children}
      {@render children()}
    {/if}
  </div>
{/if}

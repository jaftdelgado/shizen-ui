<script lang="ts">
  import { cn, portal } from "@shizen-ui/styles";
  import { useSelectContext } from "../_internal/index.js";
  import type { SelectPopoverProps } from "../_internal/index.js";

  let { class: className, children }: SelectPopoverProps = $props();

  const ctx = useSelectContext();

  let el = $state<HTMLDivElement | undefined>();

  $effect(() => {
    ctx.setContentEl(el ?? null);
    return () => ctx.setContentEl(null);
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
    onkeydown={(e) => ctx.handleKeydown(e)}
  >
    {#if children}
      {@render children()}
    {/if}
  </div>
{/if}

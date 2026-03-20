<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn, portal } from "@shizen-ui/styles";
  import { tooltipStyles } from "@shizen-ui/styles";
  import { useTooltipContext } from "../../../contexts/internal/tooltip.context.js";
  import { OverlayContent } from "../../../shared/overlay-content.svelte.js";

  let { children, class: className }: { children: Snippet; class?: string } = $props();

  const ctx = useTooltipContext();
  const styles = $derived(tooltipStyles());

  const overlayContent = new OverlayContent({
    get isOpen() {
      return ctx.isOpen;
    },
    get close() {
      return ctx.handleClose;
    },
    get referenceEl() {
      return ctx.overlay.referenceEl;
    },
    get floatingEl() {
      return ctx.overlay.floatingEl;
    },
    get updatePosition() {
      return async () => {};
    },
    exitDurationVar: "--tooltip-exit-duration",
    modal: false
  });

  $effect(() => {
    if (overlayContent.el) {
      ctx.setFloatingEl(overlayContent.el);
    }
  });
</script>

{#if overlayContent.isVisible}
  <div
    id="tooltip-content"
    role="tooltip"
    use:portal
    bind:this={overlayContent.el}
    class={cn(styles.content(), className)}
    data-state={ctx.isOpen ? "open" : "closed"}
    style:transform-origin={ctx.overlay.transformOrigin}
    onmouseenter={ctx.handleOpen}
    onmouseleave={ctx.handleClose}
  >
    {@render children()}
  </div>
{/if}

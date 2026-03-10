<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn, portal } from "@shizen-ui/styles";
  import { popoverStyles } from "@shizen-ui/styles";
  import { usePopoverContext } from "../../../contexts/internal/popover.context.ts";
  import { OverlayContent } from "../../../shared/overlay-content.svelte.ts";

  let { children, class: className }: { children: Snippet; class?: string } = $props();

  const ctx = usePopoverContext();
  const styles = $derived(popoverStyles());

  const overlayContent = new OverlayContent({
    get isOpen() {
      return ctx.isOpen;
    },
    get close() {
      return ctx.close;
    },
    get referenceEl() {
      return ctx.overlay.referenceEl;
    },
    get floatingEl() {
      return ctx.overlay.floatingEl;
    },
    get updatePosition() {
      return ctx.updatePosition;
    },
    exitDurationVar: "--popover-exit-duration",
    modal: true
  });

  $effect(() => {
    if (!overlayContent.el) return;
    ctx.setFloatingEl(overlayContent.el);
    if (ctx.isOpen) ctx.updatePosition();
  });
</script>

{#if overlayContent.isVisible}
  <div
    use:portal
    bind:this={overlayContent.backdropEl}
    class="fixed inset-0 z-40"
    aria-hidden="true"
  ></div>

  <div
    id="popover-content"
    role="dialog"
    aria-modal="true"
    use:portal
    bind:this={overlayContent.el}
    class={cn(styles.content(), className)}
    data-state={ctx.isOpen ? "open" : "closed"}
    style:transform-origin={ctx.overlay.transformOrigin}
  >
    {@render children()}
  </div>
{/if}

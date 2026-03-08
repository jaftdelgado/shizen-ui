<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn, portal } from "@shizen-ui/styles";
  import { tooltipStyles } from "@shizen-ui/styles";
  import { useTooltipContext } from "../../../contexts/internal/tooltip.context.ts";

  let { children, class: className }: { children: Snippet; class?: string } = $props();

  const ctx = useTooltipContext();
  const styles = $derived(tooltipStyles());

  let el = $state<HTMLElement | null>(null);
  let isMounted = $state(false);
  let closeTimer: ReturnType<typeof setTimeout>;

  const ANIMATION_DURATION = 150;

  const isVisible = $derived(ctx.isOpen || isMounted);

  $effect(() => {
    if (ctx.isOpen) {
      clearTimeout(closeTimer);
      isMounted = true;
    } else {
      closeTimer = setTimeout(() => {
        isMounted = false;
      }, ANIMATION_DURATION);
    }

    return () => clearTimeout(closeTimer);
  });

  $effect(() => {
    if (el) {
      ctx.setFloatingEl(el);
    }
  });
</script>

{#if isVisible}
  <div
    id="tooltip-content"
    role="tooltip"
    use:portal
    bind:this={el}
    class={cn(styles.content(), className)}
    data-state={ctx.isOpen ? "open" : "closed"}
    style:transform-origin={ctx.overlay.transformOrigin}
    onmouseenter={ctx.handleOpen}
    onmouseleave={ctx.handleClose}
  >
    {@render children()}
  </div>
{/if}

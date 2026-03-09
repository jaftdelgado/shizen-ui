<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn, portal } from "@shizen-ui/styles";
  import { popoverStyles } from "@shizen-ui/styles";
  import { usePopoverContext } from "../../../contexts/internal/popover.context.ts";

  let { children, class: className }: { children: Snippet; class?: string } = $props();

  const ctx = usePopoverContext();
  const styles = $derived(popoverStyles());

  let el = $state<HTMLElement | null>(null);
  let isMounted = $state(false);
  let closeTimer: ReturnType<typeof setTimeout>;

  const ANIMATION_DURATION = 200;

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

  $effect(() => {
    if (!ctx.isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      ctx.overlay.handleClickOutside(e);
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
</script>

{#if isVisible}
  <div
    id="popover-content"
    role="dialog"
    aria-modal="false"
    use:portal
    bind:this={el}
    class={cn(styles.content(), className)}
    data-state={ctx.isOpen ? "open" : "closed"}
    style:transform-origin={ctx.overlay.transformOrigin}
  >
    {@render children()}
  </div>
{/if}

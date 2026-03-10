<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn, portal } from "@shizen-ui/styles";
  import { popoverStyles } from "@shizen-ui/styles";
  import { usePopoverContext } from "../../../contexts/internal/popover.context.ts";
  import { createFocusTrap } from "focus-trap";
  import type { FocusTrap } from "focus-trap";

  let { children, class: className }: { children: Snippet; class?: string } = $props();

  const ctx = usePopoverContext();
  const styles = $derived(popoverStyles());

  let el = $state<HTMLElement | null>(null);
  let backdropEl = $state<HTMLElement | null>(null);
  let isMounted = $state(false);
  let closeTimer: ReturnType<typeof setTimeout>;
  let trap: FocusTrap | null = null;

  const isVisible = $derived(ctx.isOpen || isMounted);

  function getExitDuration(element: HTMLElement): number {
    const raw = getComputedStyle(element).getPropertyValue("--popover-exit-duration").trim();
    if (raw.endsWith("ms")) return parseFloat(raw);
    if (raw.endsWith("s")) return parseFloat(raw) * 1000;
    return 200;
  }

  $effect(() => {
    if (ctx.isOpen) {
      clearTimeout(closeTimer);
      isMounted = true;
    } else if (el) {
      const duration = getExitDuration(el);
      closeTimer = setTimeout(() => {
        isMounted = false;
      }, duration);
    } else {
      isMounted = false;
    }

    return () => clearTimeout(closeTimer);
  });

  $effect(() => {
    if (!el) return;
    ctx.setFloatingEl(el);
    if (ctx.isOpen) {
      ctx.updatePosition();
    }
  });

  $effect(() => {
    if (!el || !ctx.isOpen) return;

    el.setAttribute("tabindex", "-1");

    trap = createFocusTrap(el, {
      escapeDeactivates: false,
      returnFocusOnDeactivate: true,
      allowOutsideClick: true,
      fallbackFocus: el
    });

    trap.activate();

    const inertTargets: Element[] = [];

    Array.from(document.body.children).forEach((child) => {
      if (child !== el && child !== backdropEl && !(child as HTMLElement).hasAttribute("inert")) {
        (child as HTMLElement).setAttribute("inert", "");
        inertTargets.push(child);
      }
    });

    function handleMouseDown(e: MouseEvent) {
      const target = e.target as Node;
      const referenceEl = ctx.overlay.referenceEl;

      if (referenceEl && !referenceEl.contains(target) && el && !el.contains(target)) {
        ctx.close();
      }
    }

    document.addEventListener("mousedown", handleMouseDown, true);

    return () => {
      trap?.deactivate();
      trap = null;
      el?.removeAttribute("tabindex");
      inertTargets.forEach((child) => {
        (child as HTMLElement).removeAttribute("inert");
      });
      document.removeEventListener("mousedown", handleMouseDown, true);
    };
  });
</script>

{#if isVisible}
  <div use:portal bind:this={backdropEl} class="fixed inset-0 z-40" aria-hidden="true"></div>

  <div
    id="popover-content"
    role="dialog"
    aria-modal="true"
    use:portal
    bind:this={el}
    class={cn(styles.content(), className)}
    data-state={ctx.isOpen ? "open" : "closed"}
    style:transform-origin={ctx.overlay.transformOrigin}
  >
    {@render children()}
  </div>
{/if}

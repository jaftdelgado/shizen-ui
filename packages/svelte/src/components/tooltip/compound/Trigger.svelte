<script lang="ts">
  import type { Snippet } from "svelte";
  import { useTooltipContext } from "../../../contexts/internal/tooltip.context.js";

  let { children }: { children: Snippet } = $props();

  const ctx = useTooltipContext();

  let el = $state<HTMLElement | null>(null);

  $effect(() => {
    if (!el) return;

    const target = (el.firstElementChild as HTMLElement) ?? el;
    ctx.setReferenceEl(target);

    let isTouch = false;

    function onTouchStart() {
      isTouch = true;
    }

    function onMouseEnter() {
      if (isTouch) {
        isTouch = false;
        return;
      }
      ctx.handleOpen();
    }

    function onMouseLeave() {
      if (isTouch) return;
      ctx.handleClose();
    }

    function onFocus(e: FocusEvent) {
      if (
        (e as FocusEvent & { sourceCapabilities?: { firesTouchEvents: boolean } })
          .sourceCapabilities?.firesTouchEvents
      )
        return;
      ctx.handleOpen();
    }

    function onBlur() {
      ctx.handleClose();
    }

    target.addEventListener("touchstart", onTouchStart, { passive: true });
    target.addEventListener("mouseenter", onMouseEnter);
    target.addEventListener("mouseleave", onMouseLeave);
    target.addEventListener("focus", onFocus, true);
    target.addEventListener("blur", onBlur, true);

    return () => {
      target.removeEventListener("touchstart", onTouchStart);
      target.removeEventListener("mouseenter", onMouseEnter);
      target.removeEventListener("mouseleave", onMouseLeave);
      target.removeEventListener("focus", onFocus, true);
      target.removeEventListener("blur", onBlur, true);
    };
  });

  $effect(() => {
    if (!el) return;
    const target = (el.firstElementChild as HTMLElement) ?? el;
    if (ctx.isOpen) {
      target.setAttribute("aria-describedby", "tooltip-content");
    } else {
      target.removeAttribute("aria-describedby");
    }
  });
</script>

<div bind:this={el} style="display: contents">
  {@render children()}
</div>

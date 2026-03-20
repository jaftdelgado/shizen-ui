<script lang="ts">
  import type { Snippet } from "svelte";
  import { usePopoverContext } from "../../../contexts/internal/popover.context.js";

  let { children }: { children: Snippet } = $props();

  const ctx = usePopoverContext();

  let el = $state<HTMLElement | null>(null);

  $effect(() => {
    if (!el) return;

    const target = (el.firstElementChild as HTMLElement) ?? el;
    ctx.setReferenceEl(target);

    function onClick() {
      ctx.toggle();
    }

    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        ctx.toggle();
      }
    }

    target.addEventListener("click", onClick);
    target.addEventListener("keydown", onKeydown);

    return () => {
      target.removeEventListener("click", onClick);
      target.removeEventListener("keydown", onKeydown);
    };
  });

  $effect(() => {
    if (!el) return;
    const target = (el.firstElementChild as HTMLElement) ?? el;
    target.setAttribute("aria-expanded", String(ctx.isOpen));
    target.setAttribute("aria-haspopup", "dialog");
    if (ctx.isOpen) {
      target.setAttribute("aria-controls", "popover-content");
    } else {
      target.removeAttribute("aria-controls");
    }
  });
</script>

<div bind:this={el} style="display: contents">
  {@render children()}
</div>

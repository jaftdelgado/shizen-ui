<script lang="ts">
  import { type Snippet } from "svelte";
  import type { Placement } from "@floating-ui/dom";
  import { computePosition, flip, shift, offset as offsetMiddleware } from "@floating-ui/dom";
  import { setTooltipContext } from "../../contexts/internal/index.js";

  interface Props {
    children: Snippet;
    placement?: Placement;
    offset?: number;
    delay?: number;
    closeDelay?: number;
    open?: boolean;
  }

  let {
    children,
    placement = "top",
    offset = 8,
    delay = 700,
    closeDelay = 0,
    open: controlledOpen = $bindable<boolean | undefined>(undefined)
  }: Props = $props();

  const id = Math.random().toString(36).slice(2, 9);
  const triggerId = `tooltip-trigger-${id}`;
  const contentId = `tooltip-content-${id}`;

  let triggerEl = $state<HTMLElement | null>(null);
  let contentEl = $state<HTMLElement | null>(null);
  let internalOpen = $state(false);
  let showTimeout = $state<ReturnType<typeof setTimeout> | null>(null);
  let hideTimeout = $state<ReturnType<typeof setTimeout> | null>(null);

  const isOpen = $derived(controlledOpen !== undefined ? controlledOpen : internalOpen);

  async function updatePosition() {
    if (!triggerEl || !contentEl) return;

    const {
      x,
      y,
      placement: finalPlacement
    } = await computePosition(triggerEl, contentEl, {
      placement,
      middleware: [flip(), shift({ padding: 8 }), offsetMiddleware(offset)]
    });

    Object.assign(contentEl.style, {
      left: `${x}px`,
      top: `${y}px`
    });

    contentEl.setAttribute("data-placement", finalPlacement);
  }

  function show() {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }

    if (controlledOpen !== undefined) return;

    showTimeout = setTimeout(() => {
      internalOpen = true;
    }, delay);
  }

  function hide() {
    if (showTimeout) {
      clearTimeout(showTimeout);
      showTimeout = null;
    }

    if (controlledOpen !== undefined) return;

    hideTimeout = setTimeout(() => {
      internalOpen = false;
    }, closeDelay);
  }

  $effect(() => {
    if (isOpen) {
      Promise.resolve().then(updatePosition);
    }
  });

  setTooltipContext({
    get triggerId() {
      return triggerId;
    },
    get contentId() {
      return contentId;
    },
    get open() {
      return isOpen;
    },
    get placement() {
      return placement;
    },
    registerTrigger(el: HTMLElement) {
      triggerEl = el;
    },
    registerContent(el: HTMLElement) {
      contentEl = el;
    },
    show,
    hide
  });
</script>

{@render children()}

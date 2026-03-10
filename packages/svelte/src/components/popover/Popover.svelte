<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Strategy } from "@floating-ui/dom";
  import { OverlayState } from "../../shared/overlay.svelte.ts";
  import { setPopoverContext } from "../../contexts/internal/popover.context.ts";

  interface Props {
    children: Snippet;
    placement?: "top" | "right" | "bottom" | "left";
    strategy?: Strategy;
    offset?: number;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  }

  let {
    children,
    placement = "bottom",
    strategy = "absolute",
    offset: offsetVal = 8,
    isOpen = $bindable(false),
    onOpenChange
  }: Props = $props();

  const overlay = new OverlayState({
    get placement() {
      return placement;
    },
    get strategy() {
      return strategy;
    },
    get offsetVal() {
      return offsetVal;
    },
    get closeOnScroll() {
      return false;
    },
    get isOpen() {
      return isOpen;
    },
    set isOpen(value) {
      isOpen = value;
      onOpenChange?.(value);
    },
    get onOpenChange() {
      return onOpenChange;
    }
  });

  function open() {
    isOpen = true;
    onOpenChange?.(true);
  }

  function close() {
    isOpen = false;
    onOpenChange?.(false);
  }

  function toggle() {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }

  setPopoverContext({
    get isOpen() {
      return isOpen;
    },
    get placement() {
      return placement;
    },
    get strategy() {
      return strategy;
    },
    get offsetVal() {
      return offsetVal;
    },
    open,
    close,
    toggle,
    updatePosition: () => overlay.updatePosition(),
    get overlay() {
      return {
        get referenceEl() {
          return overlay.referenceEl;
        },
        get floatingEl() {
          return overlay.floatingEl;
        },
        get transformOrigin() {
          return overlay.transformOrigin;
        },
        handleClickOutside: overlay.handleClickOutside,
        handleKeydown: overlay.handleKeydown
      };
    },
    setReferenceEl(el) {
      overlay.referenceEl = el;
    },
    setFloatingEl(el) {
      overlay.floatingEl = el;
    }
  });
</script>

<svelte:window onkeydown={overlay.handleKeydown} />

{@render children()}

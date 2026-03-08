<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Strategy } from "@floating-ui/dom";
  import { OverlayState, type PopoverPlacement } from "../../shared/overlay.svelte.ts";
  import { setTooltipContext } from "../../contexts/internal/tooltip.context.ts";

  interface Props {
    children: Snippet;
    placement?: PopoverPlacement;
    strategy?: Strategy;
    offset?: number;
    delay?: number;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  }

  let {
    children,
    placement = "top",
    strategy = "absolute",
    offset: offsetVal = 8,
    delay = 200,
    isOpen = $bindable(false),
    onOpenChange
  }: Props = $props();

  let timer: ReturnType<typeof setTimeout>;

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
      return true;
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

  function handleOpen() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      isOpen = true;
    }, delay);
  }

  function handleClose() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      isOpen = false;
    }, 100);
  }

  setTooltipContext({
    get isOpen() {
      return isOpen;
    },
    get delay() {
      return delay;
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
    handleOpen,
    handleClose,
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
        handleScroll: overlay.handleScroll
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

<svelte:window onscrollcapture={overlay.handleScroll} />

{@render children()}

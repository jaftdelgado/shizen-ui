<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Strategy } from "@floating-ui/dom";
  import { OverlayState } from "../../shared/overlay.svelte.ts";
  import { setTooltipContext } from "../../contexts/internal/tooltip.context.ts";
  import { tooltipGroup } from "../../shared/tooltip-group.svelte.ts";

  interface Props {
    children: Snippet;
    placement?: "top" | "right" | "bottom" | "left";
    strategy?: Strategy;
    offset?: number;
    delayDuration?: number;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  }

  let {
    children,
    placement = "top",
    strategy = "absolute",
    offset: offsetVal = 8,
    delayDuration = 200,
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

  function close() {
    clearTimeout(timer);
    isOpen = false;
    onOpenChange?.(false);
  }

  function handleOpen() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      tooltipGroup.open(close);
      isOpen = true;
    }, delayDuration);
  }

  function handleClose() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      tooltipGroup.close(close);
      isOpen = false;
    }, 100);
  }

  setTooltipContext({
    get isOpen() {
      return isOpen;
    },
    get delayDuration() {
      return delayDuration;
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

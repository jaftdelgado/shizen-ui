<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import { onMount } from "svelte";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    orientation?: "vertical" | "horizontal";
    hideScrollBar?: boolean;
    size?: number;
    offset?: number;
    isEnabled?: boolean;
  }

  let {
    class: className,
    children,
    orientation = "vertical",
    hideScrollBar = false,
    size = 40,
    offset = 0,
    isEnabled = true,
    ...rest
  }: Props = $props();

  let viewportRef = $state<HTMLDivElement>();
  let scrollState = $state<"none" | "start" | "end" | "both">("none");

  function checkScroll() {
    if (!viewportRef || !isEnabled) return;

    const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } =
      viewportRef;

    const isVertical = orientation === "vertical";
    const currentScroll = isVertical ? scrollTop : scrollLeft;
    const maxScroll = isVertical ? scrollHeight - clientHeight : scrollWidth - clientWidth;

    const isAtStart = currentScroll <= offset;
    const isAtEnd = currentScroll >= maxScroll - offset;

    if (maxScroll <= 1) {
      scrollState = "none";
    } else if (isAtStart && isAtEnd) {
      scrollState = "none";
    } else if (isAtStart) {
      scrollState = "start";
    } else if (isAtEnd) {
      scrollState = "end";
    } else {
      scrollState = "both";
    }
  }

  onMount(() => {
    checkScroll();
    if (!viewportRef) return;

    const resizeObserver = new ResizeObserver(() => checkScroll());
    resizeObserver.observe(viewportRef);

    return () => resizeObserver.disconnect();
  });
</script>

<div class={cn("scroll-area", className)} {...rest}>
  <div
    bind:this={viewportRef}
    class={cn("scroll-area__viewport", hideScrollBar && "scroll-area__viewport--hide-scrollbar")}
    data-orientation={orientation}
    data-scroll={scrollState}
    style:--scroll-shadow-size="{size}px"
    style:--scrollbar-size={hideScrollBar ? "0px" : undefined}
    onscroll={checkScroll}
  >
    <div class="scroll-area__content">
      {@render children?.()}
    </div>
  </div>
</div>

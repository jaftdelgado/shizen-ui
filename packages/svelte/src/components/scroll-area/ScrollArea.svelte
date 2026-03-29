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

  const isVertical = $derived(orientation === "vertical");

  const SCROLLBAR_PADDING = 2;

  const viewportId = `scroll-area-viewport-${Math.random().toString(36).slice(2, 9)}`;

  let rootRef = $state<HTMLDivElement>();
  let viewportRef = $state<HTMLDivElement>();
  let thumbRef = $state<HTMLDivElement>();

  let scrollState = $state<"none" | "start" | "end" | "both">("none");
  let thumbSize = $state(0);
  let thumbOffset = $state(0);
  let scrollPercent = $state(0);
  let isDragging = $state(false);
  let isHovered = $state(false);
  let hideTimeout: ReturnType<typeof setTimeout>;

  const isScrollbarVisible = $derived(isHovered || isDragging);

  // --- Hover logic ---
  function onMouseEnter() {
    clearTimeout(hideTimeout);
    isHovered = true;
  }

  function onMouseLeave() {
    hideTimeout = setTimeout(() => {
      isHovered = false;
    }, 600);
  }

  // --- Scroll shadow logic ---
  function updateScrollState() {
    if (!viewportRef || !isEnabled) return;

    const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } =
      viewportRef;

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

  function updateThumb() {
    if (!viewportRef || !rootRef) return;

    const trackSize =
      (isVertical ? rootRef.clientHeight : rootRef.clientWidth) - SCROLLBAR_PADDING * 2;
    const viewportSize = isVertical ? viewportRef.clientHeight : viewportRef.clientWidth;
    const contentSize = isVertical ? viewportRef.scrollHeight : viewportRef.scrollWidth;
    const currentScroll = isVertical ? viewportRef.scrollTop : viewportRef.scrollLeft;
    const maxScroll = contentSize - viewportSize;

    if (maxScroll <= 0) {
      thumbSize = 0;
      thumbOffset = 0;
      scrollPercent = 0;
      return;
    }

    const ratio = viewportSize / contentSize;
    const clampedThumbSize = Math.max(trackSize * ratio, 18);
    const usableTrack = trackSize - clampedThumbSize;

    const rawOffset = SCROLLBAR_PADDING + (currentScroll / maxScroll) * usableTrack;
    const minOffset = SCROLLBAR_PADDING;
    const maxOffset = SCROLLBAR_PADDING + usableTrack;

    thumbSize = clampedThumbSize;
    thumbOffset = Math.max(minOffset, Math.min(rawOffset, maxOffset));
    scrollPercent = Math.round(Math.max(0, Math.min((currentScroll / maxScroll) * 100, 100)));
  }

  function handleScroll() {
    updateScrollState();
    updateThumb();
  }

  let dragStartPointer = 0;
  let dragStartScroll = 0;

  function onThumbPointerDown(e: PointerEvent) {
    e.preventDefault();
    isDragging = true;
    dragStartPointer = isVertical ? e.clientY : e.clientX;
    dragStartScroll = isVertical ? (viewportRef?.scrollTop ?? 0) : (viewportRef?.scrollLeft ?? 0);

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  }

  function onPointerMove(e: PointerEvent) {
    if (!viewportRef || !rootRef) return;

    const pointerDelta = (isVertical ? e.clientY : e.clientX) - dragStartPointer;
    const trackSize =
      (isVertical ? rootRef.clientHeight : rootRef.clientWidth) - SCROLLBAR_PADDING * 2;
    const contentSize = isVertical ? viewportRef.scrollHeight : viewportRef.scrollWidth;
    const viewportSize = isVertical ? viewportRef.clientHeight : viewportRef.clientWidth;
    const usableTrack = trackSize - thumbSize;
    const maxScroll = contentSize - viewportSize;

    const scrollDelta = (pointerDelta / usableTrack) * maxScroll;

    if (isVertical) {
      viewportRef.scrollTop = dragStartScroll + scrollDelta;
    } else {
      viewportRef.scrollLeft = dragStartScroll + scrollDelta;
    }
  }

  function onPointerUp() {
    isDragging = false;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    if (!isHovered) {
      hideTimeout = setTimeout(() => {
        isHovered = false;
      }, 600);
    }
  }

  // --- Click en track ---
  function onTrackPointerDown(e: PointerEvent) {
    if (e.target === thumbRef) return;
    if (!viewportRef || !rootRef) return;

    const rect = rootRef.getBoundingClientRect();
    const trackSize =
      (isVertical ? rootRef.clientHeight : rootRef.clientWidth) - SCROLLBAR_PADDING * 2;
    const clickPos =
      (isVertical ? e.clientY - rect.top : e.clientX - rect.left) - SCROLLBAR_PADDING;
    const contentSize = isVertical ? viewportRef.scrollHeight : viewportRef.scrollWidth;
    const viewportSize = isVertical ? viewportRef.clientHeight : viewportRef.clientWidth;
    const maxScroll = contentSize - viewportSize;

    const targetScroll = (clickPos / trackSize) * maxScroll;

    if (isVertical) {
      viewportRef.scrollTo({ top: targetScroll, behavior: "smooth" });
    } else {
      viewportRef.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  }

  onMount(() => {
    handleScroll();
    if (!viewportRef || !rootRef) return;

    const resizeObserver = new ResizeObserver(() => handleScroll());
    resizeObserver.observe(viewportRef);
    resizeObserver.observe(rootRef);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(hideTimeout);
    };
  });
</script>

<div
  bind:this={rootRef}
  class={cn("scroll-area", className)}
  style:--scrollbar-padding="{SCROLLBAR_PADDING}px"
  onmouseenter={onMouseEnter}
  onmouseleave={onMouseLeave}
  {...rest}
>
  <div
    id={viewportId}
    bind:this={viewportRef}
    class="scroll-area__viewport"
    data-orientation={orientation}
    data-scroll={scrollState}
    style:--scroll-shadow-size="{size}px"
    onscroll={handleScroll}
  >
    <div class="scroll-area__content">
      {@render children?.()}
    </div>
  </div>

  {#if !hideScrollBar && thumbSize > 0}
    <div
      class="scroll-area__scrollbar"
      data-orientation={orientation}
      data-dragging={isDragging}
      data-visible={isScrollbarVisible}
      onpointerdown={onTrackPointerDown}
      role="scrollbar"
      aria-controls={viewportId}
      aria-orientation={orientation}
      aria-valuenow={scrollPercent}
      aria-valuemin={0}
      aria-valuemax={100}
      tabindex={-1}
    >
      <div
        bind:this={thumbRef}
        class="scroll-area__thumb"
        data-dragging={isDragging}
        style:transform={isVertical
          ? `translateY(${thumbOffset}px)`
          : `translateX(${thumbOffset}px)`}
        style:height={isVertical ? `${thumbSize}px` : undefined}
        style:width={!isVertical ? `${thumbSize}px` : undefined}
        onpointerdown={onThumbPointerDown}
        role="presentation"
      ></div>
    </div>
  {/if}
</div>

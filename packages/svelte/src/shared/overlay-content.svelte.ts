import { createFocusTrap } from "focus-trap";
import type { FocusTrap } from "focus-trap";

//TO DO: refactorizar, separar responsabilidades

export interface OverlayContentConfig {
  get isOpen(): boolean;
  get close(): () => void;
  get referenceEl(): HTMLElement | null;
  get floatingEl(): HTMLElement | null;
  get updatePosition(): () => Promise<void>;
  readonly exitDurationVar?: string;
  readonly modal?: boolean;
}

export class OverlayContent {
  #config: OverlayContentConfig;

  el = $state<HTMLElement | null>(null);
  backdropEl = $state<HTMLElement | null>(null);
  #isMounted = $state(false);
  #closeTimer: ReturnType<typeof setTimeout> | undefined;
  #trap: FocusTrap | null = null;

  get isVisible(): boolean {
    return this.#config.isOpen || this.#isMounted;
  }

  constructor(config: OverlayContentConfig) {
    this.#config = config;

    // Mount/unmount with exit animation duration read from CSS
    $effect(() => {
      if (this.#config.isOpen) {
        clearTimeout(this.#closeTimer);
        this.#isMounted = true;
      } else if (this.el) {
        const duration = this.#getExitDuration(this.el);
        this.#closeTimer = setTimeout(() => {
          this.#isMounted = false;
        }, duration);
      } else {
        this.#isMounted = false;
      }

      return () => clearTimeout(this.#closeTimer);
    });

    // Register floatingEl and trigger position when el mounts
    $effect(() => {
      if (!this.el) return;
      this.#config.updatePosition();
    });

    // Modal behavior: focus trap + inert + click outside + scroll lock
    $effect(() => {
      if (!this.el || !this.#config.isOpen || !this.#config.modal) return;

      const el = this.el;

      // ── Focus trap ──────────────────────────────────────────────
      el.setAttribute("tabindex", "-1");

      this.#trap = createFocusTrap(el, {
        escapeDeactivates: false,
        returnFocusOnDeactivate: true,
        allowOutsideClick: true,
        fallbackFocus: el
      });

      this.#trap.activate();

      // ── Inert ────────────────────────────────────────────────────
      const inertTargets: Element[] = [];

      Array.from(document.body.children).forEach((child) => {
        if (
          child !== el &&
          child !== this.backdropEl &&
          !(child as HTMLElement).hasAttribute("inert")
        ) {
          (child as HTMLElement).setAttribute("inert", "");
          inertTargets.push(child);
        }
      });

      // ── Click outside ────────────────────────────────────────────
      function handleMouseDown(e: MouseEvent) {
        const target = e.target as Node;
        const referenceEl = config.referenceEl;

        if (referenceEl && !referenceEl.contains(target) && !el.contains(target)) {
          config.close();
        }
      }

      document.addEventListener("mousedown", handleMouseDown, true);

      // ── Scroll lock ──────────────────────────────────────────────
      // Detect the real scroll container from the reference element upward
      const scrollContainer = this.#getScrollContainer(
        config.referenceEl ?? document.documentElement
      );

      const prevOverflow = scrollContainer.style.overflowY;
      scrollContainer.style.overflowY = "hidden";

      // iOS Safari: overflow:hidden alone doesn't stop momentum scroll.
      // We intercept touchmove and only block touches OUTSIDE the popover.
      // Touches inside are left completely free — this preserves:
      //   - text selection / copy via swipe
      //   - scroll inside scrollable children
      //   - pinch-to-zoom
      //   - horizontal swipe gestures
      function handleTouchMove(e: TouchEvent) {
        // Always allow multi-touch (pinch-to-zoom, etc.)
        if (e.touches.length > 1) return;

        const touch = e.touches[0];
        if (!touch) return;

        const target = e.target as Element;

        // Touches inside the popover are unrestricted
        if (el.contains(target)) return;

        // Block all touches outside the popover
        e.preventDefault();
      }

      document.addEventListener("touchmove", handleTouchMove, { passive: false });

      return () => {
        // Focus trap
        this.#trap?.deactivate();
        this.#trap = null;
        el.removeAttribute("tabindex");

        // Inert
        inertTargets.forEach((child) => {
          (child as HTMLElement).removeAttribute("inert");
        });

        // Click outside
        document.removeEventListener("mousedown", handleMouseDown, true);

        // Scroll lock
        scrollContainer.style.overflowY = prevOverflow;
        document.removeEventListener("touchmove", handleTouchMove);
      };
    });
  }

  // Walk up the DOM from the given element to find the real scroll container
  #getScrollContainer(el: HTMLElement): HTMLElement {
    let node: HTMLElement | null = el.parentElement;
    while (node && node !== document.body) {
      const { overflowY } = getComputedStyle(node);
      if (
        ["auto", "scroll", "overlay"].includes(overflowY) &&
        node.scrollHeight > node.clientHeight
      ) {
        return node;
      }
      node = node.parentElement;
    }
    // Default to html — safer than body across all layouts
    return document.documentElement;
  }

  #getExitDuration(element: HTMLElement): number {
    const varName = this.#config.exitDurationVar ?? "--overlay-exit-duration";
    const raw = getComputedStyle(element).getPropertyValue(varName).trim();
    if (raw.endsWith("ms")) return parseFloat(raw);
    if (raw.endsWith("s")) return parseFloat(raw) * 1000;
    return 200;
  }
}

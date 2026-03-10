import { createFocusTrap } from "focus-trap";
import type { FocusTrap } from "focus-trap";

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

    $effect(() => {
      if (!this.el) return;
      this.#config.updatePosition();
    });

    // Modal behavior: focus trap + inert + click outside
    $effect(() => {
      if (!this.el || !this.#config.isOpen || !this.#config.modal) return;

      const el = this.el;

      el.setAttribute("tabindex", "-1");

      this.#trap = createFocusTrap(el, {
        escapeDeactivates: false,
        returnFocusOnDeactivate: true,
        allowOutsideClick: true,
        fallbackFocus: el
      });

      this.#trap.activate();

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

      function handleMouseDown(e: MouseEvent) {
        const target = e.target as Node;
        const referenceEl = config.referenceEl;

        if (referenceEl && !referenceEl.contains(target) && !el.contains(target)) {
          config.close();
        }
      }

      document.addEventListener("mousedown", handleMouseDown, true);

      return () => {
        this.#trap?.deactivate();
        this.#trap = null;
        el.removeAttribute("tabindex");
        inertTargets.forEach((child) => {
          (child as HTMLElement).removeAttribute("inert");
        });
        document.removeEventListener("mousedown", handleMouseDown, true);
      };
    });
  }

  #getExitDuration(element: HTMLElement): number {
    const varName = this.#config.exitDurationVar ?? "--overlay-exit-duration";
    const raw = getComputedStyle(element).getPropertyValue(varName).trim();
    if (raw.endsWith("ms")) return parseFloat(raw);
    if (raw.endsWith("s")) return parseFloat(raw) * 1000;
    return 200;
  }
}

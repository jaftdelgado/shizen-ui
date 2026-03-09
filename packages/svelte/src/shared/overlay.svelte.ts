import { computePosition, flip, shift, offset, type Strategy } from "@floating-ui/dom";

export type OverlayPlacement = "top" | "bottom" | "left" | "right";

interface OverlayConfig {
  get placement(): OverlayPlacement;
  get strategy(): Strategy;
  get offsetVal(): number;
  get closeOnScroll(): boolean;
  get isOpen(): boolean;
  set isOpen(value: boolean);
  get onOpenChange(): ((open: boolean) => void) | undefined;
}

export class OverlayState {
  #config: OverlayConfig;
  referenceEl = $state<HTMLElement | null>(null);
  floatingEl = $state<HTMLElement | null>(null);
  transformOrigin = $state<string>("center");

  constructor(config: OverlayConfig) {
    this.#config = config;

    $effect(() => {
      if (this.#config.isOpen && this.referenceEl && this.floatingEl) {
        this.updatePosition();
      }
    });

    $effect(() => {
      if (this.#config.isOpen) {
        this.#config.offsetVal;
        this.#config.placement;
        this.updatePosition();
      }
    });
  }

  async updatePosition() {
    if (!this.referenceEl || !this.floatingEl) return;

    const { x, y, placement } = await computePosition(this.referenceEl, this.floatingEl, {
      placement: this.#config.placement,
      strategy: this.#config.strategy,
      middleware: [
        offset(this.#config.offsetVal),
        flip({
          fallbackPlacements: ["top", "bottom", "left", "right"],
          boundary: document.body
        }),
        shift({ padding: 5 })
      ]
    });

    const side = placement.split("-")[0] as OverlayPlacement;

    const origins: Record<OverlayPlacement, string> = {
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    };

    this.transformOrigin = origins[side] ?? "center";

    if (this.floatingEl) {
      Object.assign(this.floatingEl.style, {
        left: `${x}px`,
        top: `${y}px`,
        position: this.#config.strategy
      });
    }
  }

  close = () => {
    if (this.#config.isOpen) {
      this.#config.isOpen = false;
      this.#config.onOpenChange?.(false);
    }
  };

  toggle = () => {
    const nextState = !this.#config.isOpen;
    this.#config.isOpen = nextState;
    this.#config.onOpenChange?.(nextState);
  };

  handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      this.close();
    }
  };

  handleScroll = () => {
    if (this.#config.closeOnScroll) {
      this.close();
    }
  };

  handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (
      this.#config.isOpen &&
      this.referenceEl &&
      !this.referenceEl.contains(target) &&
      this.floatingEl &&
      !this.floatingEl.contains(target)
    ) {
      this.close();
    }
  };
}

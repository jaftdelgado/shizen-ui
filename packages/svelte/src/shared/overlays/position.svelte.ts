import { computePosition, flip, shift, offset, type Strategy } from "@floating-ui/dom";

export type OverlayPlacement = "top" | "bottom" | "left" | "right";

export interface PositionProps {
  getIsOpen: () => boolean;
  getReferenceEl: () => HTMLElement | null;
  getFloatingEl: () => HTMLElement | null;
  getPlacement: () => OverlayPlacement;
  getStrategy: () => Strategy;
  getOffset: () => number;
}

export class PositionBehavior {
  readonly #props: PositionProps;
  transformOrigin = $state<string>("center");
  resolvedPlacement = $state<OverlayPlacement>("bottom");

  constructor(props: PositionProps) {
    this.#props = props;

    $effect(() => {
      const isOpen = this.#props.getIsOpen();
      const referenceEl = this.#props.getReferenceEl();
      const floatingEl = this.#props.getFloatingEl();

      if (isOpen && referenceEl && floatingEl) {
        this.updatePosition();
      }
    });
  }

  async updatePosition(): Promise<void> {
    const referenceEl = this.#props.getReferenceEl();
    const floatingEl = this.#props.getFloatingEl();

    if (!referenceEl || !floatingEl) return;

    const { x, y, placement } = await computePosition(referenceEl, floatingEl, {
      placement: this.#props.getPlacement(),
      strategy: this.#props.getStrategy(),
      middleware: [
        offset(this.#props.getOffset()),
        flip({
          fallbackPlacements: ["top", "bottom", "left", "right"],
          boundary: document.body
        }),
        shift({ padding: 5 })
      ]
    });

    const side = placement.split("-")[0] as OverlayPlacement;

    const origins: Record<OverlayPlacement, string> = {
      top: "bottom center",
      bottom: "top center",
      left: "right center",
      right: "left center"
    };

    this.transformOrigin = origins[side] ?? "center";
    this.resolvedPlacement = side;

    Object.assign(floatingEl.style, {
      left: `${x}px`,
      top: `${y}px`,
      position: this.#props.getStrategy()
    });
  }
}

export interface ScrollCloseProps {
  getEnabled: () => boolean;
  onClose: () => void;
}

export interface ScrollLockProps {
  getEnabled: () => boolean;
  getReferenceEl: () => HTMLElement | null;
}

export class ScrollCloseBehavior {
  readonly #props: ScrollCloseProps;

  constructor(props: ScrollCloseProps) {
    this.#props = props;

    $effect(() => {
      if (!this.#props.getEnabled()) return;

      const handleScroll = () => {
        this.#props.onClose();
      };

      window.addEventListener("scroll", handleScroll, { passive: true, capture: true });

      return () => {
        window.removeEventListener("scroll", handleScroll, { capture: true });
      };
    });
  }
}

export class ScrollLockBehavior {
  readonly #props: ScrollLockProps;

  constructor(props: ScrollLockProps) {
    this.#props = props;

    $effect(() => {
      if (!this.#props.getEnabled()) return;

      const scrollContainer = this.#getScrollContainer(
        this.#props.getReferenceEl() ?? document.documentElement
      );

      const prevOverflow = scrollContainer.style.overflowY;
      scrollContainer.style.overflowY = "hidden";

      const handleTouchMove = (event: TouchEvent) => {
        if (event.touches.length > 1) return;
        const touch = event.touches[0];
        if (!touch) return;
        event.preventDefault();
      };

      document.addEventListener("touchmove", handleTouchMove, { passive: false });

      return () => {
        scrollContainer.style.overflowY = prevOverflow;
        document.removeEventListener("touchmove", handleTouchMove);
      };
    });
  }

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
    return document.documentElement;
  }
}

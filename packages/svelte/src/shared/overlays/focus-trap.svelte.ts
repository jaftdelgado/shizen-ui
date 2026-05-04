export interface FocusTrapProps {
  getEnabled: () => boolean;
  getContainerEl: () => HTMLElement | null;
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  'details > summary'
].join(", ");

export class FocusTrapBehavior {
  readonly #props: FocusTrapProps;

  constructor(props: FocusTrapProps) {
    this.#props = props;

    $effect(() => {
      if (!this.#props.getEnabled()) return;

      const handleKeyDown = (event: KeyboardEvent): void => {
        if (event.key !== "Tab") return;

        const container = this.#props.getContainerEl();
        if (!container) return;

        const focusable = this.#getFocusableElements(container);
        if (focusable.length === 0) return;

        const activeElement = document.activeElement;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey) {
          if (activeElement === first || activeElement === container) {
            event.preventDefault();
            last.focus({ preventScroll: true });
          }
          return;
        }

        if (activeElement === last || activeElement === container) {
          event.preventDefault();
          first.focus({ preventScroll: true });
        }
      };

      document.addEventListener("keydown", handleKeyDown, true);

      return () => {
        document.removeEventListener("keydown", handleKeyDown, true);
      };
    });
  }

  #getFocusableElements(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
      (element) => !element.hasAttribute("disabled") && element.tabIndex >= 0
    );
  }
}

export interface FocusManagerProps {
  getEnabled: () => boolean;
  shouldRestoreFocus: (reason: string) => boolean;
  suppressFocusRing?: () => void;
}

export class FocusManagerBehavior {
  readonly #props: FocusManagerProps;
  #returnTarget = $state<HTMLElement | null>(null);
  #wasKeyboard = $state(false);
  #wasEnabled = false;

  get returnTarget(): HTMLElement | null {
    return this.#returnTarget;
  }

  constructor(props: FocusManagerProps) {
    this.#props = props;

    $effect(() => {
      const enabled = this.#props.getEnabled();

      // Capture the current active element only when the overlay transitions from closed to open.
      if (enabled && !this.#wasEnabled) {
        this.#captureReturnTarget();
      }

      this.#wasEnabled = enabled;
    });
  }

  restoreFocus(reason: string): void {
    const returnTarget = this.#returnTarget;
    if (!returnTarget || !this.#props.shouldRestoreFocus(reason)) return;

    if (!this.#wasKeyboard) {
      this.#props.suppressFocusRing?.();
    }

    returnTarget.focus({ preventScroll: true });
  }

  #captureReturnTarget(): void {
    const activeElement = document.activeElement;
    if (!(activeElement instanceof HTMLElement)) {
      this.#returnTarget = null;
      this.#wasKeyboard = false;
      return;
    }

    this.#returnTarget = activeElement;
    this.#wasKeyboard =
      activeElement.hasAttribute("data-focus-visible") || activeElement.matches(":focus-visible");
  }
}

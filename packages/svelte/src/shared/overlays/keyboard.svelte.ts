export interface KeyboardProps {
  onEscape?: () => void;
  extraKeys?: Record<string, () => void>;
}

export class KeyboardBehavior {
  readonly #props: KeyboardProps;

  constructor(props: KeyboardProps) {
    this.#props = props;
  }

  handleKeydown(event: KeyboardEvent): boolean {
    if (event.key === "Escape") {
      this.#props.onEscape?.();
      return true;
    }

    const handler = this.#props.extraKeys?.[event.key];
    if (handler) {
      handler();
      return true;
    }

    return false;
  }
}

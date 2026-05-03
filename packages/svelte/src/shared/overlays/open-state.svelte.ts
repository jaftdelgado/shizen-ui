export interface OpenStateProps {
  getIsOpen: () => boolean;
  setIsOpen: (value: boolean) => void;
  onOpenChange?: (open: boolean) => void;
}

export class OpenStateBehavior {
  readonly #props: OpenStateProps;

  constructor(props: OpenStateProps) {
    this.#props = props;
  }

  get isOpen(): boolean {
    return this.#props.getIsOpen();
  }

  close(): void {
    if (!this.#props.getIsOpen()) return;
    this.#props.setIsOpen(false);
    this.#props.onOpenChange?.(false);
  }

  open(): void {
    if (this.#props.getIsOpen()) return;
    this.#props.setIsOpen(true);
    this.#props.onOpenChange?.(true);
  }

  toggle(): void {
    const next = !this.#props.getIsOpen();
    this.#props.setIsOpen(next);
    this.#props.onOpenChange?.(next);
  }
}

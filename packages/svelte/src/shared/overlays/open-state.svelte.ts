export type OpenTrigger = "keyboard" | "pointer";

export interface OpenStateProps {
  getIsOpen: () => boolean;
  setIsOpen: (value: boolean) => void;
  onOpenChange?: (open: boolean) => void;
}

export class OpenStateBehavior {
  readonly #props: OpenStateProps;
  #openedByKeyboard = $state(false);

  constructor(props: OpenStateProps) {
    this.#props = props;
  }

  get isOpen(): boolean {
    return this.#props.getIsOpen();
  }

  get openedByKeyboard(): boolean {
    return this.#openedByKeyboard;
  }

  close(): void {
    if (!this.#props.getIsOpen()) return;
    this.#props.setIsOpen(false);
    this.#props.onOpenChange?.(false);
    this.#openedByKeyboard = false;
  }

  open(): void {
    if (this.#props.getIsOpen()) return;
    this.#props.setIsOpen(true);
    this.#props.onOpenChange?.(true);
  }

  toggle(): void {
    const next = !this.#props.getIsOpen();
    if (!next) this.#openedByKeyboard = false;
    this.#props.setIsOpen(next);
    this.#props.onOpenChange?.(next);
  }

  setOpenedByKeyboard(val: boolean): void {
    this.#openedByKeyboard = val;
  }
}

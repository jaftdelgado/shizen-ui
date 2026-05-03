export interface MountProps {
  getIsOpen: () => boolean;
  getEl: () => HTMLElement | null;
  exitDurationVar?: string;
}

export class MountBehavior {
  readonly #props: MountProps;
  #isMounted = $state(false);
  #timer: ReturnType<typeof setTimeout> | undefined;

  get isMounted(): boolean {
    return this.#isMounted;
  }

  constructor(props: MountProps) {
    this.#props = props;

    $effect(() => {
      if (this.#props.getIsOpen()) {
        clearTimeout(this.#timer);
        this.#isMounted = true;
      } else if (this.#isMounted) {
        const el = this.#props.getEl();
        const duration = el ? this.#getExitDuration(el) : 0;
        this.#timer = setTimeout(() => {
          this.#isMounted = false;
        }, duration);
      }

      return () => clearTimeout(this.#timer);
    });
  }

  #getExitDuration(el: HTMLElement): number {
    const varName = this.#props.exitDurationVar ?? "--overlay-exit-duration";
    const raw = getComputedStyle(el).getPropertyValue(varName).trim();
    if (raw.endsWith("ms")) return parseFloat(raw);
    if (raw.endsWith("s")) return parseFloat(raw) * 1000;
    return 200;
  }
}

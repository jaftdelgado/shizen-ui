export interface ClickOutsideProps {
  getEnabled: () => boolean;
  getReferenceEl: () => HTMLElement | null;
  getFloatingEl: () => HTMLElement | null;
  onClickOutside: () => void;
}

export class ClickOutsideBehavior {
  readonly #props: ClickOutsideProps;

  constructor(props: ClickOutsideProps) {
    this.#props = props;

    $effect(() => {
      if (!this.#props.getEnabled()) return;

      const handleMouseDown = (event: MouseEvent) => {
        const target = event.target as Node;
        const referenceEl = this.#props.getReferenceEl();
        const floatingEl = this.#props.getFloatingEl();

        const insideReference = referenceEl?.contains(target) ?? false;
        const insideFloating = floatingEl?.contains(target) ?? false;

        if (!insideReference && !insideFloating) {
          this.#props.onClickOutside();
        }
      };

      document.addEventListener("mousedown", handleMouseDown, true);

      return () => {
        document.removeEventListener("mousedown", handleMouseDown, true);
      };
    });
  }
}

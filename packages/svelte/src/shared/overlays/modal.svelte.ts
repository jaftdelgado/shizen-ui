import { createFocusTrap, type FocusTrap } from "focus-trap";

export interface ModalProps {
  getEnabled: () => boolean;
  getEl: () => HTMLElement | null;
  getBackdropEl?: () => HTMLElement | null;
}

export class ModalBehavior {
  readonly #props: ModalProps;
  #trap: FocusTrap | null = null;

  constructor(props: ModalProps) {
    this.#props = props;

    $effect(() => {
      const enabled = this.#props.getEnabled();
      const el = this.#props.getEl();

      if (!enabled || !el) return;

      el.setAttribute("tabindex", "-1");

      this.#trap = createFocusTrap(el, {
        escapeDeactivates: false,
        returnFocusOnDeactivate: true,
        allowOutsideClick: true,
        fallbackFocus: el
      });

      this.#trap.activate();

      const inertTargets: Element[] = [];
      const backdropEl = this.#props.getBackdropEl?.() ?? null;

      Array.from(document.body.children).forEach((child) => {
        if (child !== el && child !== backdropEl && !(child as HTMLElement).hasAttribute("inert")) {
          (child as HTMLElement).setAttribute("inert", "");
          inertTargets.push(child);
        }
      });

      return () => {
        this.#trap?.deactivate();
        this.#trap = null;
        el.removeAttribute("tabindex");

        inertTargets.forEach((child) => {
          (child as HTMLElement).removeAttribute("inert");
        });
      };
    });
  }
}

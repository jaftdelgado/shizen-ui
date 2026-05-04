import { useSelectContext, setSelectItemContext } from "../select.context.svelte.js";
import type { Key, SelectVariant } from "../select.types.js";

export class SelectItemState {
  #id: () => Key;
  #disabled: () => boolean;
  #variant: () => SelectVariant | undefined;
  #isPressed = $state(false);

  readonly selectCtx: ReturnType<typeof useSelectContext>;

  get id(): Key {
    return this.#id();
  }

  get isDisabled(): boolean {
    return this.#disabled() || this.selectCtx.isDisabled(this.#id());
  }

  get isSelected(): boolean {
    return this.selectCtx.isSelected(this.#id());
  }

  get isFocused(): boolean {
    return this.selectCtx.focusedKey === this.#id();
  }

  get resolvedVariant(): SelectVariant {
    return this.#variant() ?? "default";
  }

  get isPressed(): boolean {
    return this.#isPressed;
  }

  press(): void {
    this.#isPressed = true;
  }

  release(): void {
    this.#isPressed = false;
  }

  register(textValue: string): void {
    this.selectCtx.registerItem(this.id, textValue);
  }

  unregister(): void {
    this.selectCtx.unregisterItem(this.id);
  }

  constructor(props: {
    id: () => Key;
    disabled: () => boolean;
    variant: () => SelectVariant | undefined;
  }) {
    this.#id = props.id;
    this.#disabled = props.disabled;
    this.#variant = props.variant;

    this.selectCtx = useSelectContext();

    const self = this;

    setSelectItemContext({
      get id() {
        return self.id;
      },
      get isSelected() {
        return self.isSelected;
      },
      get isDisabled() {
        return self.isDisabled;
      },
      get isFocused() {
        return self.isFocused;
      },
      get isPressed() {
        return self.isPressed;
      },
      get variant() {
        return self.resolvedVariant;
      }
    });
  }
}

export type SelectItemStateInstance = InstanceType<typeof SelectItemState>;

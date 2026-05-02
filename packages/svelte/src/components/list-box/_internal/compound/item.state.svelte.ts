import { listBoxStyles } from "@shizen-ui/styles";
import { useListBoxContext, setListBoxItemContext } from "../list-box.context.svelte.js";
import type { Key, ListBoxVariant } from "../list-box.types.js";

export class ListBoxItemState {
  #id: () => Key;
  #disabled: () => boolean;
  #variant: () => ListBoxVariant | undefined;

  isFocused = $state(false);
  isPressed = $state(false);

  readonly listBoxCtx: ReturnType<typeof useListBoxContext>;

  get id(): Key {
    return this.#id();
  }

  get isDisabled(): boolean {
    return this.#disabled() || this.listBoxCtx.isDisabled(this.#id());
  }

  get isSelected(): boolean {
    return this.listBoxCtx.isSelected(this.#id());
  }

  /** Item-level variant takes priority, otherwise inherit from ListBox */
  get resolvedVariant(): ListBoxVariant {
    return this.#variant() ?? this.listBoxCtx.variant;
  }

  get styles() {
    return listBoxStyles({ variant: this.resolvedVariant });
  }

  constructor(props: {
    id: () => Key;
    disabled: () => boolean;
    variant: () => ListBoxVariant | undefined;
  }) {
    this.#id = props.id;
    this.#disabled = props.disabled;
    this.#variant = props.variant;

    this.listBoxCtx = useListBoxContext();

    const self = this;

    setListBoxItemContext({
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

export type ListBoxItemStateInstance = InstanceType<typeof ListBoxItemState>;

import { useFieldStateContext, useSurfaceContext } from "../../../contexts/index.js";
import { setInputGroupContext } from "../../../contexts/internal/index.js";
import type { InputGroupProps } from "./input-group.types.js";

export class InputGroupState {
  readonly #getProps: () => InputGroupProps;
  readonly #fieldContext: ReturnType<typeof useFieldStateContext>;
  readonly #surfaceContext: ReturnType<typeof useSurfaceContext>;

  finalVariant = $derived.by(
    () => this.#getProps().variant ?? (this.#surfaceContext.exists ? "secondary" : "default")
  );

  finalInvalid = $derived.by(() =>
    this.#fieldContext.exists ? this.#fieldContext.invalid : (this.#getProps().invalid ?? false)
  );

  finalDisabled = $derived.by(() =>
    this.#fieldContext.exists
      ? this.#fieldContext.disabled || (this.#getProps().disabled ?? false)
      : (this.#getProps().disabled ?? false)
  );

  constructor(getProps: () => InputGroupProps) {
    this.#getProps = getProps;
    this.#fieldContext = useFieldStateContext();
    this.#surfaceContext = useSurfaceContext();

    const state = this;

    setInputGroupContext({
      get size() {
        return state.#getProps().size ?? "md";
      },
      get inGroup() {
        return true;
      },
      get disabled() {
        return state.finalDisabled;
      },
      get invalid() {
        return state.finalInvalid;
      }
    });
  }
}

import { useFieldStateContext, useSurfaceContext } from "../../../contexts/index.js";
import { useInputGroupContext } from "../../../contexts/internal/index.js";
import type { PropsGetters } from "./time-input.types.js";

export function useDerivedState(
  props: PropsGetters,
  fieldContext: ReturnType<typeof useFieldStateContext>,
  groupContext: ReturnType<typeof useInputGroupContext>,
  surfaceContext: ReturnType<typeof useSurfaceContext>
) {
  const finalVariant = $derived(props.variant ?? (surfaceContext.exists ? "secondary" : "default"));

  const finalInvalid = $derived(
    fieldContext.exists
      ? fieldContext.invalid
      : groupContext.exists
        ? groupContext.invalid || props.invalid
        : props.invalid
  );

  const finalDisabled = $derived(
    fieldContext.exists
      ? fieldContext.disabled
      : groupContext.exists
        ? groupContext.disabled || props.disabled
        : props.disabled
  );

  const finalId = $derived(props.id ?? (fieldContext.exists ? fieldContext.id : undefined));

  const activeSize = $derived(groupContext.exists ? groupContext.size : props.size);

  const descriptionId = $derived(
    fieldContext.exists && fieldContext.id ? `${fieldContext.id}-description` : undefined
  );

  const errorId = $derived(
    fieldContext.exists && fieldContext.id ? `${fieldContext.id}-error` : undefined
  );

  return {
    get finalVariant() {
      return finalVariant;
    },
    get finalInvalid() {
      return finalInvalid;
    },
    get finalDisabled() {
      return finalDisabled;
    },
    get finalId() {
      return finalId;
    },
    get activeSize() {
      return activeSize;
    },
    get descriptionId() {
      return descriptionId;
    },
    get errorId() {
      return errorId;
    }
  };
}

import { checkboxStyles } from "@shizen-ui/styles";
import { setCheckboxContext } from "../../../contexts/internal/index.js";
import { useCheckboxGroupContext } from "../../../contexts/internal/index.js";
import { setFieldStateContext, useFieldStateContext } from "../../../contexts/index.js";
import type { CheckboxCheckedState } from "./checkbox.types.js";

export interface CheckboxStateProps {
  readonly value: string | undefined;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly name: string | undefined;
  readonly id: string;
  readonly checked: CheckboxCheckedState;
}

export function createCheckboxState(props: CheckboxStateProps) {
  const groupCtx = useCheckboxGroupContext();
  const parentFieldContext = useFieldStateContext();

  let inputElement = $state<HTMLInputElement | null>(null);

  const finalDisabled = $derived(
    parentFieldContext.exists
      ? parentFieldContext.disabled
      : groupCtx.exists
        ? groupCtx.disabled
        : props.disabled
  );

  const finalInvalid = $derived(
    parentFieldContext.exists
      ? parentFieldContext.invalid
      : groupCtx.exists
        ? groupCtx.invalid
        : props.invalid
  );

  const activeName = $derived(groupCtx.exists ? groupCtx.name : props.name);

  const isChecked = $derived.by<CheckboxCheckedState>(() => {
    if (groupCtx.exists && props.value !== undefined) {
      return groupCtx.value.includes(props.value);
    }
    return props.checked;
  });

  const styles = $derived(checkboxStyles());

  setCheckboxContext({
    get checked() {
      return isChecked;
    },
    get disabled() {
      return finalDisabled;
    },
    get invalid() {
      return finalInvalid;
    },
    get id() {
      return props.id;
    }
  });

  setFieldStateContext({
    get invalid() {
      return finalInvalid;
    },
    get disabled() {
      return finalDisabled;
    },
    get required() {
      return false;
    },
    get id() {
      return props.id;
    },
    get keepDescription() {
      return true;
    }
  });

  $effect(() => {
    if (inputElement) {
      inputElement.indeterminate = isChecked === "mixed";
    }
  });

  return {
    get inputElement() {
      return inputElement;
    },
    set inputElement(el: HTMLInputElement | null) {
      inputElement = el;
    },
    get finalDisabled() {
      return finalDisabled;
    },
    get finalInvalid() {
      return finalInvalid;
    },
    get activeName() {
      return activeName;
    },
    get isChecked() {
      return isChecked;
    },
    get styles() {
      return styles;
    },
    get groupCtx() {
      return groupCtx;
    },
    get value() {
      return props.value;
    },
    get id() {
      return props.id;
    }
  };
}

export type CheckboxStateInstance = ReturnType<typeof createCheckboxState>;

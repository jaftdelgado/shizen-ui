import { radioStyles } from "@shizen-ui/styles";
import { setRadioContext } from "../../../contexts/internal/index.js";
import { useRadioGroupContext } from "../../../contexts/internal/index.js";
import { setFieldStateContext, useFieldStateContext } from "../../../contexts/index.js";
import type { RadioStateProps } from "./radio.types.js";

export function createRadioState(props: RadioStateProps) {
  const groupCtx = useRadioGroupContext();
  const parentFieldContext = useFieldStateContext();

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

  const isChecked = $derived(groupCtx.exists ? groupCtx.value === props.value : props.checked);

  const styles = $derived(radioStyles());

  setRadioContext({
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

  return {
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

export type RadioStateInstance = ReturnType<typeof createRadioState>;

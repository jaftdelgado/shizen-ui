import CheckboxRoot from "./Checkbox.svelte";
import Control from "./compound/Control.svelte";
import Indicator from "./compound/Indicator.svelte";
import Content from "./compound/Content.svelte";

export type {
  CheckboxProps,
  CheckboxCheckedState,
  CheckboxContext,
  FieldStateContext
} from "./checkbox.svelte.js";
export { createCheckboxState, createCheckboxHandlers } from "./checkbox.svelte.js";

export const Checkbox = Object.assign(CheckboxRoot, {
  Control,
  Indicator,
  Content
});

export { CheckboxRoot };

export default {
  Checkbox
};

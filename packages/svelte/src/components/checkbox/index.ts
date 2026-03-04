import CheckboxRoot from "./Checkbox.svelte";
import CheckboxGroupRoot from "./CheckboxGroup.svelte";
import Control from "./compound/Control.svelte";
import Indicator from "./compound/Indicator.svelte";
import Content from "./compound/Content.svelte";
import Items from "./compound/Items.svelte";

export type { CheckboxOrientation } from "./checkbox.context";

export const Checkbox = Object.assign(CheckboxRoot, {
  Control,
  Indicator,
  Content
});

export const CheckboxGroup = Object.assign(CheckboxGroupRoot, {
  Items,
  Item: CheckboxRoot,
  Checkbox: CheckboxRoot
});

export { CheckboxRoot, CheckboxGroupRoot };

export default {
  Checkbox,
  CheckboxGroup
};

import CheckboxGroupRoot from "./CheckboxGroup.svelte";
import Items from "./compound/Items.svelte";
import CheckboxRoot from "../checkbox/Checkbox.svelte";

export type { CheckboxOrientation } from "./checkbox-group.context";

export const CheckboxGroup = Object.assign(CheckboxGroupRoot, {
  Items,
  Item: CheckboxRoot,
  Checkbox: CheckboxRoot
});

export { CheckboxGroupRoot };

export default CheckboxGroup;

import CheckboxRoot from "./Checkbox.svelte";
import Control from "./Control.svelte";
import Indicator from "./Indicator.svelte";
import Content from "./Content.svelte";

export const Checkbox = Object.assign(CheckboxRoot, {
  Control,
  Indicator,
  Content
});

export default Checkbox;

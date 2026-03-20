import CheckboxRoot from "./Checkbox.svelte";
import Control from "./compound/Control.svelte";
import Indicator from "./compound/Indicator.svelte";
import Content from "./compound/Content.svelte";
import type { Component } from "svelte";

export type { CheckboxCheckedState } from "../../contexts/internal/index.js";

export const Checkbox = Object.assign(CheckboxRoot as Component, {
  Control,
  Indicator,
  Content
});

export { CheckboxRoot };

export default { Checkbox };

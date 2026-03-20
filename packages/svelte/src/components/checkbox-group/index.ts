import CheckboxGroupRoot from "./CheckboxGroup.svelte";
import Items from "./compound/Items.svelte";
import CheckboxRoot from "../checkbox/Checkbox.svelte";
import type { Component } from "svelte";

export type { CheckboxOrientation } from "../../contexts/internal/index.js";

export const CheckboxGroup = Object.assign(CheckboxGroupRoot as Component, {
  Items: Items as Component,
  Item: CheckboxRoot as Component,
  Checkbox: CheckboxRoot as Component
});

export { CheckboxGroupRoot };

export default CheckboxGroup;

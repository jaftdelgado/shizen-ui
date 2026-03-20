import RadioGroupRoot from "./RadioGroup.svelte";
import Items from "./compound/Items.svelte";
import type { Component } from "svelte";

export type { RadioOrientation } from "../../contexts/internal/index.js";

export const RadioGroup = Object.assign(RadioGroupRoot as Component, {
  Items: Items as Component
});

export { RadioGroupRoot };

export default RadioGroup;

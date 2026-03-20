import SwitchGroupRoot from "./SwitchGroup.svelte";
import Items from "./compound/Items.svelte";
import type { Component } from "svelte";

export type { SwitchGroupOrientation } from "../../contexts/internal/index.js";

export const SwitchGroup = Object.assign(SwitchGroupRoot as Component, {
  Items: Items as Component
});

export { SwitchGroupRoot };

export default SwitchGroup;

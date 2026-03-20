import TooltipRoot from "./Tooltip.svelte";
import Content from "./compound/Content.svelte";
import Trigger from "./compound/Trigger.svelte";
import type { Component } from "svelte";

export const Tooltip = Object.assign(TooltipRoot as Component, {
  Trigger,
  Content
});

export { TooltipRoot };

export default { Tooltip };

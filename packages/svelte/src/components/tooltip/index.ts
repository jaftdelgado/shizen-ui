import TooltipRoot from "./Tooltip.svelte";
import Content from "./compound/Content.svelte";
import Trigger from "./compound/Trigger.svelte";

export const Tooltip = Object.assign(TooltipRoot, {
  Trigger,
  Content
});

export { TooltipRoot };

export default {
  Tooltip
};

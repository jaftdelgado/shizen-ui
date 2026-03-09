import PopoverRoot from "./Popover.svelte";
import Content from "./compound/Content.svelte";
import Trigger from "./compound/Trigger.svelte";
import Dialog from "./compound/Dialog.svelte";
import Heading from "./compound/Heading.svelte";

export const Popover = Object.assign(PopoverRoot, {
  Trigger,
  Content,
  Dialog,
  Heading
});

export { PopoverRoot };

export default {
  Popover
};

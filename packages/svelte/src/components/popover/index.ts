import PopoverRoot from "./Popover.svelte";
import Content from "./compound/Content.svelte";
import Trigger from "./compound/Trigger.svelte";
import Dialog from "./compound/Dialog.svelte";
import Heading from "./compound/Heading.svelte";
import type { Component } from "svelte";

export const Popover = Object.assign(PopoverRoot as Component, {
  Trigger,
  Content,
  Dialog,
  Heading
});

export { PopoverRoot };

export default { Popover };

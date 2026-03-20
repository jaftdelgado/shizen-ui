import Root from "./Switch.svelte";
import Control from "./compound/Control.svelte";
import Thumb from "./compound/Thumb.svelte";
import Content from "./compound/Content.svelte";
import type { Component } from "svelte";

export const Switch = Object.assign(Root as Component, {
  Control,
  Thumb,
  Content
});

export default { Switch };

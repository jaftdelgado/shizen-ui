import RadioRoot from "./Radio.svelte";
import Control from "./compound/Control.svelte";
import Indicator from "./compound/Indicator.svelte";
import Content from "./compound/Content.svelte";
import type { Component } from "svelte";

export const Radio = Object.assign(RadioRoot as Component, {
  Control,
  Indicator,
  Content
});

export { RadioRoot };

export default { Radio };

import Root from "./Switch.svelte";
import Control from "./compound/Control.svelte";
import Thumb from "./compound/Thumb.svelte";
import Content from "./compound/Content.svelte";

export const Switch = Object.assign(Root, {
  Control,
  Thumb,
  Content
});

export { type SwitchContextValue, SWITCH_CONTEXT_KEY, useSwitchContext } from "./switch.context";

export default {
  Switch
};

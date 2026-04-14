import Root from "./Switch.svelte";
import Control from "./compound/Control.svelte";
import Thumb from "./compound/Thumb.svelte";
import Content from "./compound/Content.svelte";

export type { SwitchProps } from "./switch.svelte.js";
export { type SwitchContextValue, useSwitchContext } from "../../contexts/internal/index.js";

export const Switch = Object.assign(Root, {
  Control,
  Thumb,
  Content
});

export default {
  Switch
};

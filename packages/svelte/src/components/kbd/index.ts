import KbdRoot from "./Kbd.svelte";
import Abbr from "./compound/Abbr.svelte";
import Content from "./compound/Content.svelte";

export type { KbdProps, KbdAbbrProps, KbdContentProps } from "./_internal/kbd.types.js";

export const Kbd = Object.assign(KbdRoot, {
  Abbr,
  Content
});

export { KbdRoot };

export default {
  Kbd
};

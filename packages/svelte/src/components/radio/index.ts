import RadioRoot from "./Radio.svelte";
import RadioGroupRoot from "./RadioGroup.svelte";
import Items from "./compound/Items.svelte";
import Control from "./compound/Control.svelte";
import Indicator from "./compound/Indicator.svelte";
import Content from "./compound/Content.svelte";

export type { RadioContextValue, RadioGroupContextValue, RadioOrientation } from "./radio.types";

export const Radio = Object.assign(RadioRoot, {
  Control,
  Indicator,
  Content
});

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Items
});

export default {
  Radio,
  RadioGroup
};

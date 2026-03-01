import RadioRoot from "./Radio.svelte";
import RadioGroupRoot from "./RadioGroup.svelte";
import Items from "./Items.svelte";
import Control from "./Control.svelte";
import Indicator from "./Indicator.svelte";
import Content from "./Content.svelte";

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

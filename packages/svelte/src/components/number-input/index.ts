import NumberInputRoot from "./NumberInput.svelte";
import Input from "./compound/Input.svelte";
import IncrementButton from "./compound/IncrementButton.svelte";
import DecrementButton from "./compound/DecrementButton.svelte";

export const NumberInput = Object.assign(NumberInputRoot, {
  Input,
  IncrementButton,
  DecrementButton
});

export { NumberInputRoot };

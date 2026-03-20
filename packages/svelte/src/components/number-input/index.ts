import NumberInputRoot from "./NumberInput.svelte";
import Input from "./compound/Input.svelte";
import IncrementButton from "./compound/IncrementButton.svelte";
import DecrementButton from "./compound/DecrementButton.svelte";
import type { Component } from "svelte";

export const NumberInput = Object.assign(NumberInputRoot as Component, {
  Input: Input as Component,
  IncrementButton: IncrementButton as Component,
  DecrementButton: DecrementButton as Component
});

export { NumberInputRoot };

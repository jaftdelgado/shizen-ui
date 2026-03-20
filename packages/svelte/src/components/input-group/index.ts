import Root from "./InputGroup.svelte";
import Prefix from "./compound/Prefix.svelte";
import Suffix from "./compound/Suffix.svelte";
import Input from "../input/Input.svelte";
import TextArea from "../text-area/TextArea.svelte";
import type { Component } from "svelte";

export const InputGroup = Object.assign(Root as Component, {
  Input: Input as Component,
  TextArea: TextArea as Component,
  Prefix: Prefix as Component,
  Suffix: Suffix as Component
});

export default InputGroup;

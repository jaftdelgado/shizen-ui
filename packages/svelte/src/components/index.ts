// index.ts
import Root from "./InputGroup.svelte";
import { Prefix, Suffix } from "./InputGroup.svelte";
import Input from "../input/Input.svelte";
import TextArea from "../text-area/TextArea.svelte";

export const InputGroup = Object.assign(Root, {
  Input: Input,
  TextArea: TextArea,
  Prefix: Prefix,
  Suffix: Suffix
});

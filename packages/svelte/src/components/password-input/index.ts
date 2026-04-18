import Root from "./PasswordInput.svelte";
import Toggle from "./compound/Toggle.svelte";
import Prefix from "./compound/Prefix.svelte";
import Suffix from "./compound/Suffix.svelte";

export const PasswordInput = Object.assign(Root, {
  Toggle,
  Prefix,
  Suffix
});

export default PasswordInput;

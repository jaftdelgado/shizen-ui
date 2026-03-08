import Root from "./InputGroup.svelte";
import Prefix from "./compound/Prefix.svelte";
import Suffix from "./compound/Suffix.svelte";
import Input from "../input/Input.svelte";
import TextArea from "../text-area/TextArea.svelte";

export const InputGroup = Object.assign(Root, {
  Input,
  TextArea,
  Prefix,
  Suffix
});

export {
  type InputGroupContextValue,
  useInputGroupContext
} from "../../contexts/internal/index.js";

export default InputGroup;

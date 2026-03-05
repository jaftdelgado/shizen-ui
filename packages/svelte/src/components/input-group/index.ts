import Root from "./InputGroup.svelte";
import Prefix from "./Prefix.svelte";
import Suffix from "./Suffix.svelte";
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
  INPUT_GROUP_CONTEXT_KEY,
  useInputGroupContext
} from "./input-group.context";

export default InputGroup;
